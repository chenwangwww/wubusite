import { request } from '@/api/request'

// 查询卖出
export function quotesSellApi(data) {
    return request({
        url: `/market/quotes/sell`,
        method: 'post',
        data
    })
}

// 查询买入
export function quotesBuyApi(data) {
    return request({
        url: `/market/quotes/buy`,
        method: 'post',
        data
    })
}

// 提交卖出订单
export function orderSellApi(data) {
    return request({
        url: `/market/order/sell`,
        method: 'post',
        data
    })
}

// 提交买入订单
export function orderBuyApi(data) {
    return request({
        url: `/market/order/buy`,
        method: 'post',
        data
    })
}

// 获取订单列表
export function getOrdersApi(params) {
    return request({
        url: `/market/order/list`,
        method: 'get',
        params
    })
}