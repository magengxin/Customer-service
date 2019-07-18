const getters = {
  lang:state=>state.app.lang,
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
  emptyForm: state => state.history.emptyForm,
  caseInfoIndex: state => state.history.caseInfoIndex,
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
  QQFaceList:state=>state.emoji.QQFaceList,
  //表情表情
  EmojiList:state=>state.emoji.EmojiList,
  QQFaceMap:state=>state.emoji.QQFaceMap,
  EmojiCodeMap:state=>state.emoji.EmojiCodeMap,
  isSendCtrlEnter:state=>state.app.isSendCtrlEnter,
  isRelevance:state=>state.app.isRelevance,
  root:state=>state.app.root,
  quickReplyTab:state=>state.app.quickReplyTab
};

export default getters