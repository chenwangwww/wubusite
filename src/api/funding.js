import { request } from '@/api/request'


// 提现订单列表
export function withdrawPageApi(params) {
    return request({
        url: `/member/user/funding/withdraw/page`,
        method: 'get',
        params
    })
}

// 充值订单列表
export function depositPageApi(params) {
    return request({
        url: `/member/user/funding/deposit/page`,
        method: 'get',
        params
    })
}


// 提现
export function withdrawActionApi(data) {
    return request({
        url: `/member/user/funding/withdraw`,
        method: 'post',
        data
    })
}
// 充值
export function depositActionApi(data) {
    return request({
        url: `/member/user/funding/deposit`,
        method: 'post',
        data
    })
}