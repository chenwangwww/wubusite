import { request } from '@/api/request'

// 更新个人信息
export function updateUserApi(data) {
  return request({
    url: `/member/user/update`,
    method: 'put',
    data
  })
}

// 修改用户密码密码
export function updatePwdApi(data) {
  return request({
    url: `/member/user/update-password`,
    method: 'put',
    data
  })
}

// 重置密码
export function resetPwdApi(data) {
  return request({
    url: `/member/user/reset-password`,
    method: 'put',
    data
  })
}

// 获取个人信息
export function getUserApi(params) {
  return request({
    url: `/member/user/get`,
    method: 'get',
    params
  })
}