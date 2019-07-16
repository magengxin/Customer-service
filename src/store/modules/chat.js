import notification from 'ant-design-vue/es/notification'
import { filterHTMLTag } from '@/utils/string'
import { sendMsg } from '@/utils/websocket'
import moment from 'moment'

const chat = {
  state: {
    socket: {
      isRun: false,
      //-1闲置 0连接失败 1连接成功 2链接中
      state: -1,
      //连接失败重试次数
      tryTimes: 0,
      errorMsg: []
    },
    //服务对象，客户ID
    customerId: null,
    //渠道列表
    channelList: [],
    //服务对象，会话列表中的某一个
    serviceObjects: {},
    //客服信息
    agent: {},
    // 会话列表  Agent客服、Customer客户、System系统
    // isSendSuccess:发送中-1 失败0 成功1
    sessionList: [],
    // 客服发出消息缓存
    // key:tempMsgId value:sessionList[m].messages[n]
    stackMsg: new Map(),
    //客服接入状态
    online: false,
    //排队人数
    queue: {
      Workgroup: 0,
      Agent: 0
    },
    //PINCODE
    pinCode: '',
    //加载状态
    loading: {
      //聊天页面
      online: false
    }
  },

  mutations: {
    //同步socket状态
    syncSocketState: (state, isRun) => {
      state.socket.isRun = isRun
    },
    // 切换聊天客户
    setServiceObjects: (state, obj) => {
      state.serviceObjects = obj
      state.customerId = obj.customerId
    },
    //加载状态更新
    setLoading: (state, obj) => {
      for (let key in obj) {
        state.loading[key] = obj[key]
      }
    },
    //添加 消息缓存
    addStackMsg: (state, { key, message }) => {
      state.stackMsg.set(key, message)
    },
    removeStackMsg: (state, { key, isSendSuccess, errormsg }) => {
      const cache = state.stackMsg.get(key)
      cache.isSendSuccess = isSendSuccess
      cache.errormsg = errormsg
      state.stackMsg.delete(key)
    },
    //设置客服
    setAgent: (state, agent) => {
      state.agent = agent
    },
    //未读消息数量
    setUnread: (state, { sessionId, unread }) => {
      const session = state.sessionList.find(e => e.sessionId === sessionId)
      session.unread = unread
    },
    //最后一条消息的内容
    setLastChat: (state, { sessionId, lastChat }) => {
      const session = state.sessionList.find(e => e.sessionId === sessionId)
      session.lastChat = lastChat
    },
    //最后一条消息的时间
    setLastTime: (state, { sessionId, lastTime, formatLastTime }) => {
      const session = state.sessionList.find(e => e.sessionId === sessionId)
      session.lastTime = lastTime
      session.formatLastTime = formatLastTime
    },
    //批量更新 最后一条消息的时间
    batchFormatLastTime: (state) => {
      state.sessionList.forEach(e => {
        if (e.lastTime) {
          e.formatLastTime = formatTimeInterval(e.lastTime)
        }
      })
    },
    //添加消息内容
    addMessage: (state, { sessionId, message }) => {
      const session = state.sessionList.find(e => e.sessionId === sessionId)
      session.messages.push(message)
    },
    //设置列表
    setSession: (state, list) => {
      state.sessionList = list
      state.serviceObjects = {}
      state.customerId = null
    },
    //添加会话
    addSession: (state, param) => {
      state.sessionList.unshift(param)
    },
    //删除会话
    removeSession: (state, sessionId) => {
      const index = state.sessionList.findIndex(e => e.sessionId === sessionId)
      state.sessionList.splice(index, 1)
      if (sessionId == state.serviceObjects.sessionId) {
        state.serviceObjects = {}
      }
    },
    //设置会话状态
    setSessionLoading: (state, { sessionId, loading }) => {
      const session = state.sessionList.find(e => e.sessionId === sessionId)
      session.loading = loading
    },
    //是否在线
    setOnline: (state, isStatue) => {
      state.online = isStatue
    },
    // 排队数
    setQueue: (state, param) => {
      state.queue[param.queueName] = param.queueCount
    },
    //Pin Code
    setPinCode: (state, pinCode) => {
      state.pinCode = pinCode
    },
  },

  actions: {
    /**
     * 切换服务对象
     */
    setServiceObjects({ commit }, obj) {
      commit('setServiceObjects', obj)
    },
    /**
     * 最后一条消息时间与当前时间的间隔, 定时任务调用
     */
    batchFormatLastTime({ commit }) {
      commit('batchFormatLastTime')
    },
    /**
     * 3.	Client To Server
     */
    //3.1.	接入
    requestConnect({ force = false }) {
      const json = {
        "timestamp": moment().format('x'),
        "cmd": "Connect",
        "data": {
          "force": force
        }
      }
      sendMsg(json)
    },
    //3.2.	给客户的消息
    requestSend({ state, commit }, { sessionId, msgType = "Text", message }) {
      const id = moment().format('x')
      const obj = {
        msgType: msgType,
        msgContent: message,
        sendName: state.agent.nickname,
        sendFullName: state.agent.nickname,
        sendType: "Agent",
        sendTs: moment().format('YYYY-MM-DD H:mm:ss'),
        sessionId: sessionId,
        isSendSuccess: -1
      }
      // 更新 最后一条消息时间与当前时间的间隔
      commit('setLastTime', { sessionId: sessionId, lastTime: id, formatLastTime: formatTimeInterval(id) })
      // 更新 最后一条消息的内容
      if (msgType === "Text") {
        commit('setLastChat', { sessionId: sessionId, lastChat: filterHTMLTag(message) })
      }
      // 添加 聊天信息
      commit('addMessage', { sessionId: sessionId, message: obj })
      // 消息缓存
      commit('addStackMsg', { key: id, message: obj })

      // Socket
      const json = {
        "timestamp": moment().format('x'),
        "cmd": "SendToCustomerMsg",
        "data": {
          "tempMsgId": id,
          "sessionId": sessionId,
          "msgType": msgType,
          "msgContent": message
        }
      }

      sendMsg(json)
    },
    //3.3.	客服关闭会话
    requestCloseSession: ({ commit }, { sessionId, loading }) => {
      commit('setSessionLoading', { sessionId, loading })

      const json = {
        "timestamp": moment().format('x'),
        "cmd": "CloseSession",
        "data": {
          "sessionId": sessionId
        }
      }

      sendMsg(json)
    },
    //3.4.	客服转接会话
    requestTransferSession: ({ commit }, { sessionId, transferType, transferId, transferRemark }) => {
      commit('setSessionLoading', { sessionId, loading: true })

      const json = {
        "timestamp": moment().format('x'),
        "cmd": "TransferSession",
        "data": {
          "sessionId": sessionId,
          "transferType": transferType,
          "transferId": transferId,
          "transferRemark": transferRemark,
        }
      }

      sendMsg(json)
    },
    //3.5.	客服发起会话
    /**
     *  * 3.6.	通知 - 客服切换接入状态
    * Open  开启
    * Close  关闭
     */
    requestOnline: ({ commit }, isOnline) => {
      commit('setLoading', { online: true })

      const json = {
        "timestamp": 117832473999,
        "cmd": "SwitchAccessStatus",
        "data": {
          "switchTo": isOnline ? "Open" : "Close"
        }
      }
      sendMsg(json)
    },
    /**
     * 4.	Server To Client
     * 相应数据处理
     */
    //响应 分发
    responseMsg({ dispatch }, json) {
      dispatch(json.cmd, json)
    },
    //4.1.	响应 – 接入
    Connect({ commit, dispatch }, json) {
      if (json.code === 0) {
        commit('setAgent', json.data.agent)
        //触发 客户初始化
        dispatch('emojiOnAgentId', json.data.agent.agentId)
        dispatch('iceOnAgentId', json.data.agent.agentId)

        json.data.sessions.forEach(e => {
          //加载状态
          e.loading = false
          //最新聊天记录
          if (e.messages && e.messages.length > 0)
            e.lastChat = filterHTMLTag(e.messages[e.messages.length - 1].msgContent)
          //未读信息
          if (!e.hasOwnProperty('unread')) {
            e.unread = 0
          }
        })
        commit('setSession', json.data.sessions)
      } else {
        notification.error({
          message: '会话',
          description: json.msg
        })
      }
    },
    //4.2.	响应 - 给客户的消息
    SendToCustomerMsg({ commit }, json) {
      commit('removeStackMsg', { key: json.data.tempMsgId, isSendSuccess: json.code, errormsg: json.msg })
    },
    //4.3.	响应 – 客服关闭会话
    CloseSession: ({ commit }, json) => {
      if (json.code === 0) {
        //成功，删除会话
        commit('removeSession', json.data.sessionId)
      } else {
        //转接失败
        commit('setSessionLoading', { sessionId: json.data.sessionId, loading: false })
        notification.error({
          message: '关闭会话',
          description: json.msg
        })
      }
    },
    //4.4.	响应 – 客服转接会话
    TransferSession: ({ commit }, json) => {
      if (json.code === 0) {
        //转接成功，删除会话
        commit('removeSession', json.data.sessionId)
      } else {
        //转接失败
        commit('setSessionLoading', { sessionId: json.data.sessionId, loading: false })
        notification.error({
          message: '转义会话',
          description: json.msg
        })
      }
    },
    //4.5.	响应 – 客服发起会话
    CreateSession: () => {
      // 可忽略
    },
    //4.6.	通知 - 给客服的消息
    SendToAgentMsg: ({ state, commit }, json) => {
      const session = state.sessionList.find(e => e.sessionId === json.data.sessionId)
      // 更新 未读数量
      if (state.serviceObjects.sessionId != json.data.sessionId) {
        commit('setUnread', { sessionId: json.data.sessionId, unread: session.unread + 1 })
      }
      // 更新 最后一条消息时间与当前时间的间隔
      commit('setLastTime', { sessionId: json.data.sessionId, lastTime: json.timestamp, formatLastTime: formatTimeInterval(json.timestamp) })
      // 更新 最后一条消息的内容
      commit('setLastChat', { sessionId: json.data.sessionId, lastChat: filterHTMLTag(json.data.msgContent) })
      // 添加 聊天信息
      commit('addMessage', { sessionId: json.data.sessionId, message: json.data })
    },
    //4.7.	通知 - 会话已创建
    SessionCreated: ({ state, commit }, json) => {
      //判断会话是否已经存在
      const index = state.sessionList.findIndex(e => e.sessionId === json.data.sessionId)
      if (index != -1) {
        return
      }
      if (!json.data.messages) {
        json.data.messages = []
      }
      json.data.loading = false
      json.data.unread = 0
      json.data.lastTime = json.timestamp
      json.data.formatLastTime = formatTimeInterval(json.timestamp)
      commit('addSession', json.data)
    },
    //4.8.	通知 - 客服接入状态更新
    AccessStatusChanged: ({ commit }, json) => {
      commit('setLoading', { online: false })
      commit('setOnline', json.data.accessStatus === 'Open')
    },
    //4.9.	通知 - 排队人数更新
    QueueUpdated: ({ commit }, json) => {
      commit('setQueue', json.data)
    },
    //4.10.	通知 - PINCODE更新
    PincodeUpdated: ({ commit }, json) => {
      commit('setPinCode', json.data.pincode)
    }
  }
}

export default chat

/**
“最后一条消息时间与当前时间的间隔”：
间隔 <60秒	30s
60秒 <= 间隔 < 60 小时	13m 5s
45m 12s
60小时 <= 间隔 < 1天	2h 13m
1天 <= 间隔 <100天	1d 3h
100天 <= 间隔	131d
间隔时间>=30分钟时，字体该为红色。
 */
function formatTimeInterval(time) {
  let m = moment(time, 'x')
  return m.fromNow()
}