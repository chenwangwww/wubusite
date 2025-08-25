import { request } from '@/api/request'

// 创建银行账号
export function createAccountApi(data) {
    return request({
        url: `/member/user/bankaccount/create`,
        method: 'post',
        data
    })
}

// 获得银行账号列表
export function getAccountListApi(data) {
    return request({
        url: `/member/user/bankaccount/list`,
        method: 'get',
        data
    })
}

// 获得银行账号
export function getAccountApi(data) {
    return request({
        url: `/member/user/bankaccount/get`,
        method: 'get',
        data
    })
}

// 删除银行账号
export function deleteAccountApi(data) {
    return request({
        url: `/member/user/bankaccount/delete`,
        method: 'delete',
        data
    })
}
