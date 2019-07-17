import { axios } from '@/utils/request'

const api = {
  //客户
  customer: '/ice/{domain}/customer',
  //个人快捷回复
  quickReply:'/ice/{domain}/fast-reply-private',
  //3.53.	API – 查询个人快捷回复树
  quickReplyTree: '/ice/{domain}/query-tree/fast-reply-private',
  //3.59.	API – 收藏快捷回复
  collection: '/ice/{domain}/collect/fast-reply',
  //3.60.	API – 取消收藏快捷回复树
  uncollection: '/ice/{domain}/cancelCollect/fast-reply',
  // 表情
  emoji: '/ice/{domain}/private-emoji',
  emojiList: '/ice/{domain}/query-list/private-emoji'
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

/**
 * 3.7.	API – 获取客户信息
 */
export function collection(body) {
  return axios({
    url: api.collection,
    method: 'put',
    data: body
  })
}

/**
 * 3.60.	API – 取消收藏快捷回复树
 */
export function uncollection(body) {
  return axios({
    url: api.uncollection,
    method: 'put',
    data: body
  })
}
/**
 * 3.53.	API – 查询个人快捷回复树
 */
export function treeQuickReply(agentId) {
  return axios({
    url: api.quickReplyTree,
    method: 'post',
    data: {
      agentId: agentId
    }
  })
}

/**
 * 3.54.	API – 创建个人快捷回复
 */
export function saveQuickReply(body) {
  return axios({
    url: api.quickReply,
    method: 'post',
    data: body
  })
}

/**
 * 3.55.	API – 更新个人快捷回复
 */
export function updateQuickReply(id,body) {
  return axios({
    url: api.quickReply+`/${id}`,
    method: 'put',
    data: body
  })
}

/**
 * 3.56.	API – 刪除个人快捷回复
 */
export function deleteQuickReply(id) {
  return axios({
    url: api.quickReply+`/${id}`,
    method: 'delete'
  })
}

/**
 * 3.57.	API – 更新个人快捷回复排序
 */
export function sortQuickReply(id,body) {
  return axios({
    url: `/ice/{domain}/sort/fast-reply-private/${id}`,
    method: 'put',
    data: body
  })
}

