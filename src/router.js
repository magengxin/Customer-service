import Vue from 'vue'
import Router from 'vue-router'
import { BasicLayout } from '@/layouts'

Vue.use(Router)

export default new Router({
  //mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: '首页',
      component: BasicLayout,
      redirect: '/work',
      children: [
        {
          path: '/work',
          name: 'work',
          component: () => import('@/layouts/workLayout'),
          meta: { title: '聊天窗口', keepAlive: false }
        },
        {
          path: '/history',
          name: 'history',
          component: () => import('@/layouts/historyLayout'),
          meta: { title: '聊天记录', keepAlive: false }
        }
      ]
    }
  ]
})
