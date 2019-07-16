import Vue from 'vue'
import App from './App.vue'
import store from './store/'
import router from './router'
import i18n from './lang'

import './core/use'
import bootstrap from './core/bootstrap'
// Mock
import websocket from '@/mock/websocket'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  i18n,
  created() {
    bootstrap()
    websocket()
  },
  render: h => h(App)
}).$mount('#app')


