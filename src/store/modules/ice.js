// 应用数据
import { treeQuickReply } from "@/api/customer";
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
    },
    setCollection: (state, { id, isCollect }) => {
      let nodes = [...state.quickReplyTree]
      while (nodes.length > 0) {
        let node = nodes[0]
        if (node.id === id) {
          node.isCollect = isCollect
          break
        }
        if (node.children && node.children.length > 0) {
          for (let i = 0; i < node.children.length; i++) {
            nodes.push(node.children[i]);
          }
        }
        nodes.splice(0, 1)
      }
    }
  },

  actions: {
    iceOnAgentId({ commit }, agentId) {
      return new Promise((resolve) => {
        treeQuickReply(agentId).then(res => {
          if (res.code === 0) {
            commit('SET_PRIVATE_QUICK_REPLY_TREE', res.data)
          } else {
            commit('SET_PRIVATE_QUICK_REPLY_TREE', [])
          }
          resolve()
        })
      })
    },
    setQuickReplyTree({ commit }, tree) {
      commit('SET_QUICK_REPLY_TREE', tree)
    },
    setPrivateQuickReplyTree({ commit }, tree) {
      commit('SET_PRIVATE_QUICK_REPLY_TREE', tree)
    },
    setCollection({ commit }, { id, isCollect }) {
      commit('setCollection', { id, isCollect })
    },
  }
}

export default ice