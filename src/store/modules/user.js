import { treeQuickReply } from "@/api/ice"
// 用户
const user = {
  state: {
    domain: 'CN'
  },

  mutations: {
    SET_DOMAIN: (state, domain) => {
      state.domain = domain
    },
    SET_USER: (state, user) => {
      state.user = user
    }
  },

  actions: {
    setDomain({ getters, commit, dispatch }, domain) {
      commit('SET_DOMAIN', domain)

      /**
       * 初始化数据
       */
      //快捷回复(公共)
      treeQuickReply({
        agentId: getters.agent.agentId,
        orgId: getters.agent.orgId
      }).then(res => {
        if (res.code == 0) {
          dispatch('setQuickReplyTree', res.data)
        }
      })
    }
  }
}

export default user