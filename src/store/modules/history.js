const history = {
  state: {
    // 页面状态
    spinning: false,
    // 客户详情信息
    customerInfo: {},
    // case信息
    caseInfo: {
      accessTs: "2018-10-16 16:17:00",
      agentId: "1000000",
      agentName: "zero0",
      caseId: "10000000000",
      caseType: "技术升级0",
      channelName: "marketing",
      channelSource: "售前",
      contents: [{content: "xxxx", email: "xx@hp.com", createTs: "2018-10-16 16:17:00"}],
      endTs: "2018-10-16 16:26:00",
      spos: 0,
      status: "close",
      symptomQuestion: "问题内容0",
      symptomSpecific: "关于产品或服务规格的投诉0",
      symptomSubCategory: "提供产品意见0",
      symptomTopCategory: "获取客户支持0"
    },
    // case列表
    caselist: [],
    // case table 默认索引
    caseInfoIndex: 0,
    // 清空form
    emptyForm: 1,
  },

  mutations: {
    // 获取客户详情信息
    getCustomerInfo: (state, customerInfo) => {
      state.customerInfo = customerInfo
    },
    // 获取case列表
    getCaseInfo: (state, caseInfo) => {
      state.caseInfo = caseInfo
    },
    // 获取 case 列表
    postCaselist: (state, caselist) => {
      state.caselist = caselist
    },
    // 修改 loading 状态
    changeSpinning: (state, spinning) => {
      state.spinning = spinning
    },
    // 修改 case table 默认索引
    changeCaseInfoIndex: (state, caseInfoIndex) => {
      state.caseInfoIndex = caseInfoIndex
    },
    // 清空form
    setEmptyForm: (state) => {
      state.emptyForm ++
    },
  },

  actions: {

  }
};

export default history
