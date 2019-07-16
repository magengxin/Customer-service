const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'xl': '0.86',
          /* color */
          'primary-color': '#0096d6',
          'link-color': '#0096d6',
          'success-color': '008424',
          'warning-color': '#faad14',
          'error-color': '#d7410b',
          // 大多数组件的基本背景色
          'font-family': 'HPSimplified',
          'code-family': 'HPSimplified',
          'font-size-lg': '@font-size-base + (2px * @xl)',
          'font-size-sm': '12px * @xl',
          'line-height-base': '1.5 * @xl',
          'border-radius-base': '4px * @xl',
          'border-radius-sm': '2px * @xl',
          /* 文字大小 */
          'font-size-base ': '14px * @xl',
          'border-color-base': '#cccccc',
          'list-item-padding': '8px 0',
          'item-active-bg': '#f3f3f3',
          /* 垂直填充 */
          'padding-lg': '24px * @xl',
          'padding-md': '16px * @xl',
          'padding-sm': '12px * @xl',
          'padding-xs': '8px * @xl',
          /* 按钮 */
          'btn-font-weight': '400 * @xl',
          'btn-padding-base': '0 @padding-md - 1px * @xl',
          'btn-height-base': '32px * @xl',
          'btn-height-lg': '40px * @xl',
          'btn-height-sm': '24px * @xl',
          /* 复选框 */
          'checkbox-size': '16px * @xl',
          /* 单选框 */
          'radio-size': '16px * @xl',
          /* from 表单 */
          'form-item-margin-bottom': '24px * @xl',
          'form-vertical-label-padding': '0 0 8px*@xl',
          /* Input 输入框 */
          'input-height-base': '32px * @xl',
          'input-height-lg': '40px * @xl',
          'input-height-sm': '24px * @xl',
          'input-padding-vertical-base': '4px * @xl',
          'input-padding-vertical-sm': '1px * @xl',
          'input-padding-vertical-lg': '6px * @xl',
          /* Tooltip 工具提示框 */
          'tooltip-max-width': '250px * @xl',
          'tooltip-arrow-width': '5px * @xl',
          'tooltip-distance': '@tooltip-arrow-width + 3px * @xl',
          /* Popove */
          'popover-min-width': '177px * @xl',
          'popover-arrow-width': '6px * @xl',
          'popover-distance': '@popover-arrow-width + 4px * @xl',
          /* Menu */
          'menu-inline-toplevel-item-height': '40px * @xl',
          'menu-item-height': '40px * @xl',
          'menu-collapsed-width': '80px * @xl',
          /* Spin */
          'spin-dot-size-sm': '14px * @xl',
          'spin-dot-size': '20px * @xl',
          'spin-dot-size-lg': '32px * @xl',
          /* Table -表格行高 */
          'table-padding-vertical': '6px',
          'table-padding-horizontal': '8px',
          /* TimePicker-时间选择器 */
          'time-picker-panel-column-width': '56px * @xl',
          /* Carousel 旋转 */
          'carousel-dot-width': '16px * @xl',
          'carousel-dot-height': '3px * @xl',
          'carousel-dot-active-width': '24px * @xl',
          /* Badge- 徽章 */
          'badge-height': '20px * @xl',
          'badge-dot-size': '6px * @xl',
          'badge-status-size': '6px * @xl',
          /* Card */
          'card-head-padding': '16px * @xl',
          'card-inner-head-padding': '12px * @xl',
          'card-padding-base': '24px * @xl',
          'card-padding-wider': '32px * @xl',
          /* Comment-议论;评论;解释 */
          'comment-padding-base': '16px*@xl 0',
          'comment-nest-indent': '44px * @xl',
          /* Tabs -选项卡 */
          'tabs-card-height': '40px * @xl',
          'tabs-bar-margin': '0 0 16px*@xl 0',
          'tabs-horizontal-margin': '0 32px*@xl 0 0',
          'tabs-horizontal-padding': '12px*@xl 16px*@xl',
          'tabs-horizontal-padding-lg': '16px*@xl',
          'tabs-horizontal-padding-sm': '8px*@xl 16px*@xl ',
          'tabs-vertical-padding': '8px*@xl 24px*@xl ',
          'tabs-vertical-margin': '0 0 16px*@xl  0',
          'tabs-scrolling-size': '32px*@xl',
          /* Avatar */
          'avatar-size-base': '32px * @xl',
          'avatar-size-lg': '40px * @xl',
          'avatar-size-sm': '24px * @xl',
          'avatar-font-size-base': '18px * @xl',
          'avatar-font-size-lg': '24px * @xl',
          'avatar-font-size-sm': '14px * @xl',
          /* Switch-开关 */
          'switch-height': '22px * @xl',
          'switch-sm-height': '16px * @xl',
          /* Pagination-分页 */
          'pagination-item-size': '32px * @xl',
          'pagination-item-size-sm': '24px * @xl',
          'pagination-font-weight-active': '500 * @xl',
          /* Slider */
          'slider-margin': '14px*@xl 6px*@xl 10px*@xl',
          /* Tree-树 */
          'tree-title-height': '24px * @xl',
          'tree-child-padding': '18px * @xl',
          /* Collapse-折叠 */
          'collapse-header-padding': '12px*@xl 0 12px*@xl 40px*@xl',
          /* Message-消息 */
          'message-notice-content-padding': '10px*@xl 16px*@xl',
          /* Motion-运动.移动; */
          'wave-animation-width': '6px * @xl',
          'layout-sider-background': '#fff'
        },
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    // development server port 8000
    port: 8090,
    proxy: {
      '/rest/pm': {
        target: 'http://pngit-cn-v0010.cn.hpicorp.net:7300/mock/5ce4bcdcf583341aee8b8a15/css-apj-admin-pm',
        ws: false,
        changeOrigin: true,
      },
      '/rest/cm': {
        target: 'http://pngit-cn-v0010.cn.hpicorp.net:7300/mock/5cde831bf583341aee8b89fb/css-apj-cm',
        ws: false,
        changeOrigin: true,
        /**
        * 转发特殊处理，ITG与生产环境存在 /rest/cm
        */
        pathRewrite: { '^/rest/cm': '/' }
      },
      '/rest/cs': {
        target: ' http://pngit-cn-v0010.cn.hpicorp.net:7300/mock/5cde82f9f583341aee8b89f9/css-apj-customer-service',
        ws: false,
        changeOrigin: true
      },
      '/rest': {
        target: ' http://pngit-cn-v0010.cn.hpicorp.net:7300/mock/5cde36fdf583341aee8b8830/css-apj-support',
        ws: false,
        changeOrigin: true
      }
    }
  },
  lintOnSave: false,
  chainWebpack: config => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@comp', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@layout', resolve('src/layout'))
      .set('@static', resolve('src/static'))
  },
  // disable source map in production
  productionSourceMap: false,

  // babel-loader no-ignore node_modules/*
  transpileDependencies: []
}
