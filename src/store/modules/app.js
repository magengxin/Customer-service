// APP
const app={
  state:{
    sessionId:null,
    // eslint-disable-next-line no-undef
    config:config
  },
  mutations:{
    setSessionId: (state, sessionId) => {
      state.sessionId = sessionId
    }
  }
}

export default app