import { request } from '@/api/request'

// 创建工单
export function createTicketApi(data) {
  return request({
    url: `/member/user/ticket/create`,
    method: 'post',
    data
  })
}

// 工单列表
export function ticketListApi(params) {
  return request({
    url: `/member/user/ticket/page`,
    method: 'get',
    params
  })
}