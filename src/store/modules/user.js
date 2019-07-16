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
    setDomain({ commit }, domain) {
      commit('SET_DOMAIN', domain)
    }
  }
}

export default user