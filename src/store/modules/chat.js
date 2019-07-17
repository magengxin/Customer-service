import Vue from 'vue'
import notification from 'ant-design-vue/es/notification'
import Modal from 'ant-design-vue/es/modal'
import { filterHTMLTag } from '@/utils/string'
import { sendMsg } from '@/utils/websocket'
import moment from 'moment'
import { DOMAIN } from '@/store/mutation-types'

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
    },
    h: null
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
    }
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
     * 2.	Connect To Server
     */
    requestHeartbeat() {
      const json = {
        "timestamp": getTimestamp(),
        "cmd": "Heartbeat"
      }
      sendMsg(json)
    },
    /**
     * 3.	Client To Server
     */
    //3.1.	接入
    /* eslint-disable no-empty-pattern */ 
    requestConnect({}, { force = false }) {
      const json = {
        "timestamp": getTimestamp(),
        "cmd": "Login",
        "data": {
          "force": force
        }
      }
      sendMsg(json)
    },
    //3.2.	给客户的消息
    requestSend({ state, commit }, { sessionId, msgType = "Text", message }) {
      const id = moment().format('YYYY-MM-DD H:mm:ss')
      const obj = {
        msgType: msgType,
        msgContent: message,
        sendName: state.agent.nickname,
        sendFullName: state.agent.nickname,
        sendType: "Agent",
        sendTs: id,
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
        "timestamp": getTimestamp(),
        "cmd": "SendToCustomer",
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
        "timestamp": getTimestamp(),
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
        "timestamp": getTimestamp(),
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
    requestCreateSession: ({ sessionId }) => {

      const json = {
        "timestamp": getTimestamp(),
        "cmd": "CreateSession",
        "data": {
          "sessionId": sessionId,
        }
      }

      sendMsg(json)
    },
    /**
     *  * 3.6.	通知 - 客服切换接入状态
    * Open  开启
    * Close  关闭
     */
    requestOnline: ({ commit }, isOnline) => {
      commit('setLoading', { online: true })

      const json = {
        "timestamp": getTimestamp(),
        "cmd": "SwitchServeStatus",
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
    Login({ commit, dispatch }, json) {
      if (json.code === 0) {
        commit('setAgent', json.data.agent)
        //触发 客户初始化
        dispatch('emojiOnAgentId', json.data.agent.agentId)
        dispatch('iceOnAgentId', json.data.agent.agentId)
        commit('setPinCode', json.data.agent.pincode)
        //DOMAIN
        dispatch('setDomain', 'CN')
        Vue.ls.set(DOMAIN, 'CN')

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
        Modal.confirm({
          title: '异常',
          content: json.code === 420101 ? '客服在别处登录，被踢下线,确认重新登陆吗?' : '客服已经在别处登录,确认重新登陆吗?',
          onOk() {
            dispatch('requestConnect', { force: true })
          }
        });
      }
    },
    //4.2.	响应 - 给客户的消息
    SendToCustomer({ commit }, json) {
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
    //4.6.	响应 - 客服切换服务状态
    SwitchServeStatus: ({ commit }, json) => {
      commit('setLoading', { online: false })
      commit('setOnline', json.data.switchTo === 'Open')
    },
    //4.7.	通知 - 给客服的消息
    SendToAgent: ({ state, commit }, json) => {
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
    //4.8.	通知 - 会话已创建
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

function getTimestamp() {
  return moment().format('YYYY-MM-DD HH:mm:ss.SSS')
}