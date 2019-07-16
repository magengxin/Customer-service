import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import chat from './modules/chat'
import history from './modules/history'
import ice from './modules/ice'
import emoji from './modules/emoji'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,user, chat, history, ice,emoji
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters
})