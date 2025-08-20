import { request } from '@/api/request'

// 注册
export function registerApi(data) {
  return request({
    url: `/member/auth/signup`,
    method: 'post',
    data
  })
}

// 登录
export function loginApi(data) {
  return request({
    url: `/member/auth/login`,
    method: 'post',
    data
  })
}

// 刷新令牌
export function refreshTokenApi(data) {
  return request({
    url: `/member/auth/refresh-token`,
    method: 'post',
    data
  })
}