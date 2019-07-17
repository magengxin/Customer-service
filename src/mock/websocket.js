import { close } from '@/utils/websocket'
import store from '@/store'
import Mock from 'mockjs'

export default function Initializer() {
  // 判断环境不是 prod 或者 preview 是 true 时，加载 mock 服务
  if (process.env.NODE_ENV !== 'production' || process.env.VUE_APP_PREVIEW === 'true') {
    // 延后执行
    setTimeout(() => {
      close()

      //更改连接状态
      store.commit('syncSocketState', true)

      //模拟数据
      store.dispatch('responseMsg', Mock.mock({
        "timestamp": 117832473999,
        "cmd": "Login",
        "code": 0,
        "msg": "success",
        "data": {
          "agent": {
            "agentId": 10000001,
            "nickname": "小慧01",
            "email": "xxx@hp.com",
            "headPic": "xxx@hp.com",
            "maxServeCount": 5,
            "pincode": "010101",
            "orgId": "1000001",
            "clientConfig": {}
          },
          "sessions|2-6": [{
            "sessionId": "@integer(1, 9999)",
            "customerId": "@integer(1, 9999)",
            "nickname": "客户1",
            "headUrl": "",
            "channelCode": "0001",
            "channelName": "惠普服务公众号",
            "accessCode": "0001",
            "accessData": {
              "productCategory": 1000,
              "productCategoryName": "笔记本"
            },
            "unread": "@integer(0, 666)",
            "messages|2-20": [{
              "sender": 128,
              "sendType": "Customer",
              "sendName": "@cname",
              "sendFullName": "@cname",
              "msgContent": "@csentence",
              "msgId": "@id",
              "offlineMsg": 0,
              "msgType": "Text",
              "sendTs": "@datetime"
            }]
          }]
        }
      }))
    }, 5 * 1000);
  }

}
