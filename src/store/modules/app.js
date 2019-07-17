import Vue from 'vue'
import { loadLanguageAsync } from '@/lang'
// APP
const app = {
  state: {
    sessionId: null,
    // eslint-disable-next-line no-undef
    config: config,
    //发送消息快捷键 Ctrl+Enter,false:Enter发送消息
    isSendCtrlEnter: true,
    //开启联想
    isRelevance: true,
    //语言
    lang:'zh-CN'
  },
  mutations: {
    setSessionId: (state, sessionId) => {
      state.sessionId = sessionId
    },
    setSendCtrlEnter: (state, is) => {
      state.isSendCtrlEnter = is
    },
    setRelevance: (state, is) => {
      state.isRelevance = is
    },
    SET_LANG: (state, lang) => {
      state.lang = lang
    },
  },
  actions: {
    setSendCtrlEnter({ commit }, is) {
      commit('setSendCtrlEnter', is)
      Vue.ls.set('setSendCtrlEnter', is)
    },
    setRelevance({ commit }, is) {
      commit('setRelevance', is)
      Vue.ls.set('setRelevance', is)
    },
    SetLang ({ commit }, lang) {
      return new Promise(resolve => {
        commit('SET_LANG', lang)
        loadLanguageAsync(lang)
        resolve()
      })
    }
  }
}

export default app