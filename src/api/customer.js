import { axios } from '@/utils/request'

const api = {
  //客户
  customer: '/{domain}/customer',
  // 表情
  emoji: '/ice/{domain}/private-emoji',
  emojiList: '/ice/{domain}/query-page/private-emoji'
}

export default api

/**
 * 3.7.	API – 获取客户信息
 */
export function getCustomer(id) {
  return axios({
    url: api.customer + `/${id}`,
    method: 'get'
  })
}

/**
 * 创建自定义表情
 */
export function addEmoji(body) {
  return axios({
    url: api.emoji,
    method: 'post',
    data: body
  })
}
/**
 * 删除自定义表情
 */
export function removeEmoji(id) {
  return axios({
    url: api.emoji + `/${id}`,
    method: 'delete'
  })
}
/**
 * 查询自定义表情
 */
export function listEmoji(agentId) {
  return axios({
    url: api.emojiList,
    method: 'post',
    data: {
      agentId: agentId
    }
  })
}

