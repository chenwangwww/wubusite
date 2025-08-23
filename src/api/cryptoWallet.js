import { request } from '@/api/request'

// 创建会员虚拟币钱包
export function createWalletApi(data) {
    return request({
        url: `/member/user/cryptowallet/create`,
        method: 'post',
        data
    })
}

// 获得虚拟币钱包列表
export function getWalletListApi(data) {
    return request({
        url: `/member/user/cryptowallet/list`,
        method: 'get',
        data
    })
}

// 获得虚拟币钱包
export function getWalletApi(data) {
    return request({
        url: `/member/user/cryptowallet/get`,
        method: 'get',
        data
    })
}

// 删除虚拟币钱包
export function deleteWalletApi(data) {
    return request({
        url: `/member/user/cryptowallet/delete`,
        method: 'delete',
        data
    })
}
