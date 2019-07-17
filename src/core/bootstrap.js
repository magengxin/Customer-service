// 初始化
import Vue from 'vue'
import store from '@/store/'
import { connection } from "@/utils/websocket"

function parseURL(url) {
  var a = document.createElement('a');
  a.href = url;
  // var a = new URL(url);
  return {
    source: url,
    protocol: a.protocol.replace(':', ''),
    host: a.hostname,
    port: a.port,
    query: a.search,
    params: (function () {
      var params = {},
        seg = a.search.replace(/^\?/, '').split('&'),
        len = seg.length,
        p;
      for (var i = 0; i < len; i++) {
        if (seg[i]) {
          p = seg[i].split('=');
          params[p[0]] = p[1];
        }
      }
      return params;
    })(),
    hash: a.hash.replace('#', ''),
    path: a.pathname.replace(/^([^\\/])/, '/$1')
  };
}

export default function Initializer() {
  /**
   * App
   */
  store.commit('setSendCtrlEnter', Vue.ls.get('setSendCtrlEnter', true))
  store.commit('setRelevance', Vue.ls.get('setRelevance', true))

  /**
   * 业务数据
   */
  let ws ='ws://127.0.0.1:80/ws/ice'
  if (process.env.NODE_ENV == 'production') {
    let u = parseURL(location.href)
    ws =(u.protocol === 'https' ? 'wss:/' : 'ws:/') + u.host + (u.port != 80 ? ':' + u.port : '') + u.path.substring(0, u.path.indexOf('/', 1)) + '/ws/ice'
  }
  //发起连接
  connection({ url: ws })

  //最后一条消息时间与当前时间的间隔 10秒
  setInterval(() => {
    store.dispatch('batchFormatLastTime')
  }, 10 * 1000)
}