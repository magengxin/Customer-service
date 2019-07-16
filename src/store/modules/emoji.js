import { listEmoji } from "@/api/customer";
const emoji = {
  state: {
    qq: [
      { title: '微笑', class: '0' }
      , { title: '撇嘴', class: '1' }
      , { title: '色', class: '2' }
      , { title: '发呆', class: '3' }
      , { title: '得意', class: '4' }
      , { title: '流泪', class: '5' }
      , { title: '害羞', class: '6' }
      , { title: '闭嘴', class: '7' }
      , { title: '睡', class: '8' }
      , { title: '大哭', class: '9' }
      , { title: '尴尬', class: '10' }
      , { title: '发怒', class: '11' }
      , { title: '调皮', class: '12' }
      , { title: '呲牙', class: '13' }
      , { title: '惊讶', class: '14' }
      , { title: '难过', class: '15' }
      , { title: '酷', class: '16' }
      , { title: '冷汗', class: '17' }
      , { title: '抓狂', class: '18' }
      , { title: '吐', class: '19' }
      , { title: '偷笑', class: '20' }
      , { title: '愉快', class: '21' }
      , { title: '白眼', class: '22' }
      , { title: '傲慢', class: '23' }
      , { title: '饥饿', class: '24' }
      , { title: '困', class: '25' }
      , { title: '惊恐', class: '26' }
      , { title: '流汗', class: '27' }
      , { title: '憨笑', class: '28' }
      , { title: '悠闲', class: '29' }
      , { title: '奋斗', class: '30' }
      , { title: '咒骂', class: '31' }
      , { title: '疑问', class: '32' }
      , { title: '嘘', class: '33' }
      , { title: '晕', class: '34' }
      , { title: '疯了', class: '35' }
      , { title: '衰', class: '36' }
      , { title: '骷髅', class: '37' }
      , { title: '敲打', class: '38' }
      , { title: '再见', class: '39' }
      , { title: '擦汗', class: '40' }
      , { title: '抠鼻', class: '41' }
      , { title: '鼓掌', class: '42' }
      , { title: '糗大了', class: '43' }
      , { title: '坏笑', class: '44' }
      , { title: '左哼哼', class: '45' }
      , { title: '右哼哼', class: '46' }
      , { title: '哈欠', class: '47' }
      , { title: '鄙视', class: '48' }
      , { title: '委屈', class: '49' }
      , { title: '快哭了', class: '50' }
      , { title: '阴险', class: '51' }
      , { title: '亲亲', class: '52' }
      , { title: '吓', class: '53' }
      , { title: '可怜', class: '54' }
      , { title: '菜刀', class: '55' }
      , { title: '西瓜', class: '56' }
      , { title: '啤酒', class: '57' }
      , { title: '篮球', class: '58' }
      , { title: '乒乓', class: '59' }
      , { title: '咖啡', class: '60' }
      , { title: '饭', class: '61' }
      , { title: '猪头', class: '62' }
      , { title: '玫瑰', class: '63' }
      , { title: '凋谢', class: '64' }
      , { title: '嘴唇', class: '65' }
      , { title: '爱心', class: '66' }
      , { title: '心碎', class: '67' }
      , { title: '蛋糕', class: '68' }
      , { title: '闪电', class: '69' }
      , { title: '炸弹', class: '70' }
      , { title: '刀', class: '71' }
      , { title: '足球', class: '72' }
      , { title: '瓢虫', class: '73' }
      , { title: '便便', class: '74' }
      , { title: '月亮', class: '75' }
      , { title: '太阳', class: '76' }
      , { title: '礼物', class: '77' }
      , { title: '拥抱', class: '78' }
      , { title: '强', class: '79' }
      , { title: '弱', class: '80' }
      , { title: '握手', class: '81' }
      , { title: '胜利', class: '82' }
      , { title: '抱拳', class: '83' }
      , { title: '勾引', class: '84' }
      , { title: '拳头', class: '85' }
      , { title: '差劲', class: '86' }
      , { title: '爱你', class: '87' }
      , { title: 'NO', class: '88' }
      , { title: 'OK', class: '89' }
      , { title: '爱情', class: '90' }
      , { title: '飞吻', class: '91' }
      , { title: '跳跳', class: '92' }
      , { title: '发抖', class: '93' }
      , { title: '怄火', class: '94' }
      , { title: '转圈', class: '95' }
      , { title: '磕头', class: '96' }
      , { title: '回头', class: '97' }
      , { title: '跳绳', class: '98' }
      , { title: '投降', class: '99' }
      , { title: '激动', class: '100' }
      , { title: '乱舞', class: '101' }
      , { title: '献吻', class: '102' }
      , { title: '左太极', class: '103' }
      , { title: '右太极', class: '104' }
    ],
    emoji: [],
    // 自定义表情《图片》
    customizeList: []
  },
  mutations: {
    setCustomizeList: (state, list) => {
      state.customizeList = list
    },
    addCustomizeList: (state, para) => {
      state.customizeList.push(para)
    },
    removeCustomizeList: (state, uid) => {
      const index = state.customizeList.findIndex(e => e.uid === uid)
      if (index != -1) {
        state.customizeList.splice(index, 1)
      }
    }
  },

  actions: {
    emojiOnAgentId({ commit }, agentId) {
      listEmoji(agentId).then(res => {
        let fileList = [];
        res.data.contents.forEach(element => {
          fileList.push({
            uid: element.id,
            name: element.id + '',
            status: "done",
            url: element.img
          });
        });
        commit('setCustomizeList', fileList)
      })
    },
    removeEmoji({ commit }, uid) {
      commit('removeCustomizeList', uid)
    },
    addEmoji({ commit }, para) {
      para.status = "done"
      para.name = para.name + ''
      commit('addCustomizeList', para)
    }
  }
}

export default emoji