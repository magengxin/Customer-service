// 初始化
import store from '@/store/'
import { treeQuickReply } from "@/api/ice"
import { getSessionId } from "@/api/user"
import { connection } from "@/utils/websocket"

export default function Initializer() {
  /**
   * App
   */
  //...

  /**
   * 业务数据
   */
  getSessionId().then(res =>{
    if (res.code === 0) {
      store.commit('setSessionId', res.data)
      //发起连接
      // connection({ url: store.getters.socketUrl+res.data })
    }
  })
  //快捷回复(公共)
  treeQuickReply().then(res => {
    if (res.code == 0) {
      store.dispatch('setQuickReplyTree', res.data)
    }
  })

  //最后一条消息时间与当前时间的间隔 10秒
  setInterval(()=>{
    store.dispatch('batchFormatLastTime')
  }, 10*1000)
}