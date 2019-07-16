// 应用数据
const ice = {
  state: {
    //快捷回复
    quickReplyTree: [],
    //个人快捷回复
    privateQuickReplyTree: []
  },

  mutations: {
    SET_QUICK_REPLY_TREE: (state, tree) => {
      state.quickReplyTree = tree
    },
    SET_PRIVATE_QUICK_REPLY_TREE: (state, tree) => {
      state.privateQuickReplyTree = tree
    }
  },

  actions: {
    // eslint-disable-next-line no-unused-vars
    iceOnAgentId({ commit }, agentId){
    },
    setQuickReplyTree({ commit }, tree) {
      commit('SET_QUICK_REPLY_TREE', tree)
    },
    setPrivateQuickReplyTree({ commit }, tree) {
      commit('SET_PRIVATE_QUICK_REPLY_TREE', tree)
    }
  }
}

export default ice