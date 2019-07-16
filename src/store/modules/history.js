const history = {
  state: {
    // 页面状态
    spinning: false,
    // 客户详情信息
    customerInfo: {},
    // case信息
    caseInfo: {},
    // case列表
    caselist: [],
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
  },

  actions: {

  }
};

export default history
