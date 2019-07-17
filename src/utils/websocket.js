import store from '@/store'
import notification from 'ant-design-vue/es/notification'

const service = {
  url: null,
  socket: null,
  /**
   * 重连控制
   */
  isRunReconnection: false,
  timer: -1,
  heartbeat: -1,
  //重连
  reconnection: () => {
    if (service.isRunReconnection) {
      return;
    }
    service.isRunReconnection = true
    service.timer = setInterval(() => {
      connection({ msg: '连接失败，发起重连' })
    }, 5000)
  },
  //清理重连
  clearReconnection: () => {
    if (service.timer != -1) {
      clearInterval(service.timer);
    }
    service.timer = -1
  },
  startHeartbeat() {
    service.heartbeat = setInterval(() => {
      store.dispatch('requestHeartbeat')
    }, 10000)
  },
  endHeartbeat() {
    clearInterval(service.heartbeat);
  }
}

function connectionSocket({ url }) {
  return new Promise((resolve, reject) => {
    if (url) service.url = url

    service.socket = new WebSocket(service.url)
    service.socket.onopen = () => {
      store.commit('syncSocketState', true)
      notification.open({
        message: '提示',
        description: '连接服务器成功'
      })
      service.clearReconnection()
      store.dispatch('requestConnect',{ force : false })
      service.startHeartbeat()
      resolve(event)
    };
    service.socket.onmessage = (event) => {
      store.dispatch('responseMsg', JSON.parse(event.data))
    };
    service.socket.onclose = () => {
      store.commit('syncSocketState', false)
      service.reconnection()
      service.endHeartbeat()
    };
    service.socket.onerror = () => {
      service.reconnection()
      reject('error')
    };
  }).catch(() => {
    service.reconnection()
  })
}

/**
 * 发送消息
 * @param {JSON} msg 
 */
export function connection({ url, title, msg }) {
  notification.open({
    message: title ? title : '提示',
    description: msg ? msg : '连接服务器...'
  })
  return connectionSocket({ url })
}

/**
 * 关闭消息
 */
export function close() {
  return new Promise((resolve, reject) => {
    try {
      service.clearReconnection()
      resolve()
    } catch (e) {
      reject(e)
    }
  }).catch((e) => {
    notification.error({
      message: '异常',
      description: e
    })
  })
}

/**
 * 发送消息
 * @param {JSON} msg 
 */
export function sendMsg(json) {
  if (service.socket.readyState == WebSocket.OPEN)
    service.socket.send(JSON.stringify(json))
}