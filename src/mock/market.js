// /mock/trade.ts
import pkg from 'mockjs';
const { Random } = pkg;

export default [
    {
        url: '/dev-api/app-api/market/quotes/sell',
        method: 'post',
        timeout: 1000,
        response: ({ body }) => {
            const { cryptoCurrency, amount, fiatCurrency } = body;

            // Simulate validation: Check if all required fields are present
            if (!cryptoCurrency || !amount || !fiatCurrency) {
                return {
                    code: 1073741824, // A mock error code
                    data: null,
                    msg: 'Missing required request parameters: cryptoCurrency, amount, or fiatCurrency'
                };
            }

            // Simulate a successful response
            const mockExchangeRate = 0.01;
            const mockFiatAmount = amount * (1 / mockExchangeRate); // Calculate fiat amount

            // Mock expire time (e.g., 60 seconds from now)
            const expireTime = new Date(Date.now() + 60000).toISOString();

            return {
                code: 0, // Success code
                data: {
                    fiatAmount: mockFiatAmount,
                    exchangeRate: mockExchangeRate,
                    expireTime: expireTime
                },
                msg: 'Sell quote generated successfully'
            };
        }
    },
    {
        url: '/dev-api/app-api/market/quotes/buy',
        method: 'post',
        timeout: 1000,
        response: ({ body }) => {
            const { cryptoCurrency, amount, fiatCurrency } = body;

            // Simulate validation: Check if all required fields are present
            if (!cryptoCurrency || !amount || !fiatCurrency) {
                return {
                    code: 1073741824, // A mock error code
                    data: null,
                    msg: 'Missing required request parameters: cryptoCurrency, amount, or fiatCurrency'
                };
            }

            // Simulate a successful response
            const mockExchangeRate = 0.01;
            const mockFiatAmount = amount * (1 / mockExchangeRate); // Calculate fiat amount

            // Mock expire time (e.g., 60 seconds from now)
            const expireTime = new Date(Date.now() + 60000).toISOString();

            return {
                code: 0, // Success code
                data: {
                    fiatAmount: mockFiatAmount,
                    exchangeRate: mockExchangeRate,
                    expireTime: expireTime
                },
                msg: 'Sell quote generated successfully'
            };
        }
    },

    {
        url: '/dev-api/app-api/market/order/sell',
        method: 'post',
        timeout: 1000,
        response: ({ body }) => {
            // 从请求体中获取所有必要的参数
            const { cryptoCurrency, amount, fiatCurrency, wantAmount, cryptoAccountId, mailVerifyCode } = body;

            // 模拟验证：如果任一关键字段为空，则返回错误
            if (!cryptoCurrency || !amount || !fiatCurrency || !wantAmount || !cryptoAccountId || !mailVerifyCode) {
                return {
                    code: 1073741824, // 模拟一个错误码
                    data: null,
                    msg: '缺少必要的字段'
                };
            } else {
                return {
                    code: 0, // 模拟成功时的返回
                    data: {
                        "orderId": "ORDER_1234567890_123",
                        "status": 1,
                        "statusName": "待审核"
                    },
                    msg: "订单创建成功"
                };
            }
        }
    },
    {
        url: '/dev-api/app-api/market/order/list',
        method: 'get',
        response: ({ query }) => {
            const pageNo = parseInt(query.pageNo) || 1;
            const pageSize = parseInt(query.pageSize) || 10;
            const orderType = parseInt(query.orderType); // 获取并解析 orderType

            // 生成46条模拟数据
            const allOrders = Array.from({ length: 46 }, (_, index) => {
                const id = index + 1;
                const itemOrderType = id % 2 === 0 ? 2 : 1; // 1: Buy, 2: Sell
                const status = id % 3 === 0 ? 2 : 1;    // 模拟不同状态
                return {
                    "id": id,
                    "orderType": itemOrderType,
                    "orderStatus": status,
                    "transactionId": `TXN_${1000 + id}`,
                    "transactionTime": `2025-08-23 10:${String(id).padStart(2, '0')}:${String(id).padStart(2, '0')}`,
                    "transactionType": itemOrderType,
                    "fromCurrency": itemOrderType === 1 ? "USD" : "USDT",
                    "toCurrency": itemOrderType === 1 ? "USDT" : "USD",
                    "transactionAmount": (100 + id * 5),
                    "transactionQuantity": (99 + id * 5),
                    "transactionPrice": (0.99),
                    "updateTime": `2025-08-23 10:23:${String(id).padStart(2, '0')}`,
                    "createTime": `2025-08-23 10:20:${String(id).padStart(2, '0')}`
                };
            });

            // 根据 orderType 进行数据筛选
            const filteredOrders = isNaN(orderType) ? allOrders : allOrders.filter(item => item.orderType === orderType);

            const totalItems = filteredOrders.length;

            // 根据页码和每页大小进行数据切片
            const startIndex = (pageNo - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            const paginatedList = filteredOrders.slice(startIndex, endIndex);

            return {
                "code": 0,
                "data": {
                    "list": paginatedList,
                    "total": totalItems
                },
                "msg": "success"
            };
        }
    },
    {
        url: '/dev-api/app-api/market/wubu-bankaccount/list',
        method: 'get',
        timeout: 1000,
        response: ({ query }) => {
            const success = Math.random() > 0.1; // 10% 的概率失败

            if (success) {
                const data = [];
                const bankNames = ["中国银行", "工商银行", "农业银行", "建设银行", "招商银行", "交通银行", "浦发银行"];
                const names = ["张三", "李四", "王五", "赵六", "钱七"];

                for (let i = 0; i < 13; i++) {
                    const randomBankName = bankNames[Math.floor(Math.random() * bankNames.length)];
                    const randomName = names[Math.floor(Math.random() * names.length)];
                    const fiatType = i % 2 === 0 ? 'USD' : 'AED';

                    data.push({
                        id: i,
                        "accountName": randomName,
                        "accountNumber": `62220200000000${100 + i}`,
                        "iban": `IBAN${Math.floor(Math.random() * 1000000000)}`,
                        "swiftCode": `SWIFT${Math.floor(Math.random() * 1000)}`,
                        "bankName": randomBankName,
                        "fiatType": fiatType,
                        "bankAddress": `中国北京市海淀区 ${i + 1} 号`
                    });
                }

                return {
                    code: 0,
                    data: data,
                    msg: "获取成功"
                };
            } else {
                return {
                    "code": 1073741824,
                    "data": [],
                    "msg": "获取银行账户列表失败"
                };
            }
        }
    }
]