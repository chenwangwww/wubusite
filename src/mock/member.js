// /mock/trade.ts
import pkg from 'mockjs';
const { Random } = pkg;

export default [
    // 更新个人信息
    {
        url: '/dev-api/app-api/member/user/update',
        method: 'put',
        timeout: 1000,
        response: ({ body }) => {
            // 从请求体中获取参数
            const { firstname, lastname, mobile, company } = body;

            // 模拟验证：如果任一关键字段为空，则返回错误
            if (!firstname || !lastname || !mobile || !company) {
                return {
                    code: 1073741824, // 模拟一个错误码
                    data: false,
                    msg: '缺少必要的个人信息字段'
                };
            } else {
                return {
                    code: 0, // 假设更新成功时 code 为 0
                    data: true,
                    msg: '个人信息更新成功'
                };
            }
        }
    },

    // 修改密码
    {
        url: '/dev-api/app-api/member/user/update-password',
        method: 'put',
        timeout: 1000,
        response: ({ body }) => {
            // 从请求体中获取参数
            const { password, code } = body;

            // 模拟一个正确的验证码
            const correctCode = '1024';

            // 模拟验证：如果任一关键字段为空，或验证码不正确，则返回错误
            if (!password || !code) {
                return {
                    code: 1073741824, // 模拟一个错误码
                    data: false,
                    msg: '缺少必要的字段'
                };
            } else if (code !== correctCode) {
                return {
                    code: 1073741825, // 不同的错误码，表示验证码错误
                    data: false,
                    msg: '验证码错误'
                };
            } else {
                return {
                    code: 0, // 假设更新成功时 code 为 0
                    data: true,
                    msg: '密码重置成功'
                };
            }
        }
    },
    // 重置密码
    {
        url: '/dev-api/app-api/member/user/reset-password',
        method: 'put',
        timeout: 1000,
        response: ({ body }) => {
            // 从请求体中获取参数
            const { password, code, email } = body;

            // 模拟一个正确的验证码
            const correctCode = '1024';

            // 模拟验证：如果任一关键字段为空，或验证码不正确，则返回错误
            if (!email || !password || !code) {
                return {
                    code: 1073741824, // 模拟一个错误码
                    data: false,
                    msg: '缺少必要的字段'
                };
            } else if (code !== correctCode) {
                return {
                    code: 1073741825, // 不同的错误码，表示验证码错误
                    data: false,
                    msg: '验证码错误'
                };
            } else {
                return {
                    code: 0, // 假设更新成功时 code 为 0
                    data: true,
                    msg: '密码重置成功'
                };
            }
        }
    },

    {
        url: '/dev-api/app-api/member/user/get',
        method: 'get',
        timeout: 1000,
        response: () => {
            return {
                code: 0,
                data: {
                    "id": 1,
                    "firstname": "芋艿",
                    "lastname": "ct",
                    "mobile": "15601691300",
                    "usdtBalance": 100,
                    "usdcBalance": 10000,
                    "usdBalance": 1003,
                    "aedBalance": 3000,
                    "company": "wubu",
                    "email": "test@example.com"
                },
                msg: "string"
            };
        }
    },
    {
        url: '/dev-api/app-api/market/order/list',
        method: 'get',
        response: () => {
            return {
                "code": 0,
                "data": {
                    "list": [
                        {
                            "id": 1,
                            "orderType": 1,
                            "orderStatus": 1,
                            "transactionId": "1",
                            "transactionTime": "2021-01-01 12:00:00",
                            "transactionType": 1,
                            "fromCurrency": "1",
                            "toCurrency": "1",
                            "transactionAmount": 100,
                            "transactionQuantity": 100,
                            "transactionPrice": 100,
                            "updateTime": "2021-01-01 12:00:00",
                            "createTime": "2021-01-01 12:00:00"
                        }
                    ],
                    "total": 9007199
                },
                "msg": "string"
            };
        }
    },
]