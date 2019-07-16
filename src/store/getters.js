const getters = {
  sessionId: state => state.app.sessionId,
  //Socket地址
  socketUrl: state => state.app.config.socketUrl,
  //开启接入状态
  online: state => state.chat.online,
  //应对Socket异步返回数据控制加载状态
  loading: state => state.chat.loading,
  domain: state => state.user.domain,
  customerId: state => state.chat.customerId,
  customerInfo: state => state.history.customerInfo,
  caseInfo: state => state.history.caseInfo,
  caselist: state => state.history.caselist,
  spinning: state => state.history.spinning,
  serviceObjects: state => state.chat.serviceObjects,
  sessionList: state => state.chat.sessionList,
  quickReplyTree: state => state.ice.quickReplyTree,
  privateQuickReplyTree: state => state.ice.privateQuickReplyTree,
  queue: state => state.chat.queue,
  isSocketRun: state => state.chat.socket.isRun,
  pinCode: state => state.chat.pinCode,
  //自定义表情
  customizeList: state => state.emoji.customizeList,
  //客服信息
  agent: state => state.chat.agent,
  //QQ表情
  qq: state => state.emoji.qq
};

export default getters