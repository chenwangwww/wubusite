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
