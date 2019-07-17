import Vue from 'vue'
import VueStorage from 'vue-ls'

// base library
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'

// ext library 滚动条
import vuescroll from 'vuescroll'
// JavaScript中解析，验证，操作和显示日期和时间
import moment from 'moment'

import "@/components/global.less";
import "@/components/boostrap.less";
import "@/components/emoji.less";

//图片预览
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'

import { clickoutside } from "@/utils/directive";

Vue.use(Antd)
Vue.use(VueStorage)
Vue.use(vuescroll, {
  ops: {
    mode: 'native',
    sizeStrategy: 'percent',
    detectResize: true
  },
  name: 'scroll'
});
Vue.use(Viewer)

Vue.prototype.$moment = moment

Vue.directive('clickoutside', clickoutside)