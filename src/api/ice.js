import { axios } from '@/utils/request'

const api = {
  //3.58.	API – 多客服查询快捷回复
  quickReplyTree: '/ice/{domain}/query-tree_cs/fast-reply',
  uploadFile: '/ice/{domain}/file',
  workgroup: '/ice/{domain}/query-tree/workgroup'
}

export default api

/**
 * 3.46.	API – 查询快速回复树
 */
export function treeQuickReply(body) {
  return axios({
    url: api.quickReplyTree,
    method: 'post',
    data:body
  })
}

/**
 * 文件上传
 */
export function uploadFile(file) {
  let body = new FormData()
  body.append('file', file)
  body.append('isPublic', true)
  return axios({
    url: api.uploadFile,
    method: 'post',
    data: body
  })
}

/**
 * 3.22.	API – 查询工作组树
 */
export function treeWorkgroup() {
  return axios({
    url: api.workgroup,
    method: 'post'
  })
}

