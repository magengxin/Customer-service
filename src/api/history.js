import { axios } from '@/utils/request'

const api = {
  customerList: `/ice/{domain}/query-page/customer`,
  getCustomerInfo: '/ice/{domain}/customer',
  putCustomerInfo: '/ice/{domain}/customer',
  agentList: '/ice/{domain}/query-page/agent',
  getChannelList: '/ice/{domain}/query-list/channel',
  putCustomerProduct: '/ice/{domain}/customer-product',

  // 客户资产信息
  getCustomerProduct: '/cs/{domain}/user-info',
  delCustomerProduct: '/cs/{domain}/user-product',
  csPutCustomerProduct: '/cs/{domain}/user', // 更新客户信息
  csPostCustomerProduct: '/cs/{domain}/user-product', // 新增客户资产

  // case
  postCaselist: '/cm/{domain}/query-list/case',
  postCaseTemplate: '/cm/{domain}/query-list/template', // 查询CASE模板列表
  postCaseTypeList: '/cm/{domain}/query-list/case-type', // 查询CASE类型列表
  getCaseSource: '/ice/{domain}/query-list/channel', // 查询CASE来源
  putCase: '/cm/{domain}/case', // 更新CASE
  postCase: '/cm/{domain}/case', // 新增CASE
  postCaseSymptom: '/cm/{domain}/query-page/symptom', // 分页查询CASE症状代码列表
  postCaseTreeSymptom: '/cm/{domain}/query-tree/symptom', // 查询CASE症状代码树
  postCaseContent: '/cm/{domain}/case-content', // 新增CASE CONTENT(NOTE)

  // 操作系统
  getServiceList: '/pm/{domain}/os', // 查询操作系统列表
};

export default api

// 获取客户列表
export function getCustomerList(data) {
  return axios({
    url: api.customerList,
    method: 'POST',
    data: data
  })
}

// 获取客户详情
export function getCustomerInfo(id) {
  return axios({
    url: api.getCustomerInfo+`/${id}`,
    method: 'GET'
  })
}

// 更新客户详情
export function putCustomerInfo(id, data) {
  return axios({
    url: api.putCustomerInfo+`/${id}`,
    method: 'PUT',
    data: data
  })
}

// 获取客服列表
export function getAgentList(data) {
  return axios({
    url: api.agentList,
    method: 'POST',
    data: data
  })
}

// 获取渠道列表
export function getChannelList() {
  return axios({
    url: api.getChannelList,
    method: 'GET'
  })
}

//  获取客户资产信息
export function getCustomerProduct(id) {
  return axios({
    url: api.getCustomerProduct+`/${id}`,
    method: 'GET'
  })
}

// 更新客户资产信息
export function csPutCustomerProduct(id, data) {
  return axios({
    url: api.csPutCustomerProduct+`/${id}`,
    method: 'PUT',
    data: data
  })
}

// 新增客户资产信息
export function csPostCustomerProduct(data) {
  return axios({
    url: api.csPostCustomerProduct,
    method: 'POST',
    data: data
  })
}

//  删除客户资产信息
export function delCustomerProduct(id) {
  return axios({
    url: api.delCustomerProduct+`/${id}`,
    method: 'DELETE'
  })
}

/**
 * CASE列表
 * @param id
 * @returns {*}
 */

// 查询CASE列表
export function postCaselist(data) {
  return axios({
    url: api.postCaselist,
    method: 'POST',
    data: data
  })
}

// 查询CASE模板列表
export function postCaseTemplate(data) {
  return axios({
    url: api.postCaseTemplate,
    method: 'POST',
    data: data
  })
}

// 查询CASE类型列表
export function postCaseTypeList(data) {
  return axios({
    url: api.postCaseTypeList,
    method: 'POST',
    data: data
  })
}

// 新增CASE
export function postCase(data) {
  return axios({
    url: api.postCase,
    method: 'POST',
    data: data
  })
}

// 分页查询CASE症状代码列表
export function postCaseSymptom(data) {
  return axios({
    url: api.postCaseSymptom,
    method: 'POST',
    data: data
  })
}

// 查询CASE症状代码树
export function postCaseTreeSymptom(data) {
  return axios({
    url: api.postCaseTreeSymptom,
    method: 'POST',
    data: data
  })
}

// 新增CASE CONTENT(NOTE)
export function postCaseContent(data) {
  return axios({
    url: api.postCaseContent,
    method: 'POST',
    data: data
  })
}

// 更新CASE
export function putCase(id, data) {
  return axios({
    url: api.putCase+`/${id}`,
    method: 'PUT',
    data: data
  })
}

// 查询CASE来源
export function getCaseSource() {
  return axios({
    url: api.getCaseSource,
    method: 'GET',
  })
}
// 查询操作系统列表
export function getServiceList() {
  return axios({
    url: api.getServiceList,
    method: 'GET'
  })
}

