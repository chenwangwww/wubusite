import { request } from '@/api/request'


// 提现订单列表
export function withdrawPageApi(data) {
    return request({
        url: `/member/user/funding/withdraw/page`,
        method: 'get',
        data
    })
}

// 充值订单列表
export function depositPageApi(data) {
    return request({
        url: `/member/user/funding/deposit/page`,
        method: 'get',
        data
    })
}
