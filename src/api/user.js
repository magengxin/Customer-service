import { axios } from '@/utils/request'

const api = {
  session: '/sessionId',
}

export default api

/**
 * 获取Session
 */
export function getSessionId() {
  return axios({
    url: api.session,
    method: 'get'
  })
}