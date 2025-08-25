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

// 启用OTP验证码
export function enableOTPApi(data) {
  return request({
    url: `/member/user/otp/enable`,
    method: 'post',
    data
  })
}

// 禁用OTP验证码
export function disableOTPApi(data) {
  return request({
    url: `/member/user/otp/disable`,
    method: 'post',
    data
  })
}

// 获取OTP设置信息
export function getOTPSetupApi(params) {
  return request({
    url: `/member/user/otp/setup`,
    method: 'get',
    params
  })
}

// 验证验证码
export function sendCodeVeriApi({scene}) {
  return request({
    url: `/member/user/send-code/` + scene,
    method: 'get',
  })
}