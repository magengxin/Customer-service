import { axios } from '@/utils/request'

const api = {
  quickReplyTree: '/{domain}/query-tree/fast-reply',
  uploadFile: '/cm/{domain}/file',
  workgroup: '/{domain}/query-tree/workgroup'
}

export default api

/**
 * 3.46.	API – 查询快速回复树
 */
export function treeQuickReply() {
  return axios({
    url: api.quickReplyTree,
    method: 'post'
  })
}

/**
 * 文件上传
 */
export function uploadFile(file) {
  return axios({
    url: api.uploadFile,
    method: 'post',
    data: {
      name: file.name,
      contentType: 'file',
      data: file,
      "isPublic": true
    }
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

