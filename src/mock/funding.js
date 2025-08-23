// /mock/trade.ts
import pkg from 'mockjs';
const { Random } = pkg;

export default [
    {
        url: '/dev-api/app-api/member/user/funding/deposit/page',
        method: 'get',
        response: ({ query }) => {
            const pageNo = parseInt(query.pageNo) || 1;
            const pageSize = parseInt(query.pageSize) || 10;
            const currencyType = parseInt(query.currencyType);
            const orderStatus = parseInt(query.orderStatus);

            // 生成50条模拟数据
            const allDeposits = Array.from({ length: 32 }, (_, index) => {
                const id = index + 1;
                const itemCurrencyType = (id % 3) + 1; // 1: USDT, 2: BTC, 3: ETH
                const itemOrderStatus = (id % 3) + 1; // 1: Pending, 2: Completed, 3: Failed
                const currencyNameMap = { 1: "USDT", 2: "BTC", 3: "ETH" };

                return {
                    "orderNo": `DEP_${1000000 + id}`,
                    "currencyType": itemCurrencyType,
                    "currencyName": currencyNameMap[itemCurrencyType],
                    "orderStatus": itemOrderStatus,
                    "amount": (500 + id * 15),
                    "createTime": `2025-08-23 11:30:${String(id).padStart(2, '0')}`,
                    "updateTime": `2025-08-23 11:35:${String(id).padStart(2, '0')}`
                };
            });

            // 根据请求参数进行数据筛选
            const filteredDeposits = allDeposits.filter(item => {
                const isCurrencyMatch = isNaN(currencyType) || item.currencyType === currencyType;
                const isStatusMatch = isNaN(orderStatus) || item.orderStatus === orderStatus;
                return isCurrencyMatch && isStatusMatch;
            });

            const totalItems = filteredDeposits.length;

            // 根据页码和每页大小进行数据切片
            const startIndex = (pageNo - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            const paginatedList = filteredDeposits.slice(startIndex, endIndex);

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
        url: '/dev-api/app-api/member/user/funding/withdraw/page',
        method: 'get',
        response: ({ query }) => {
            const pageNo = parseInt(query.pageNo) || 1;
            const pageSize = parseInt(query.pageSize) || 10;
            const currencyType = parseInt(query.currencyType);
            const orderStatus = parseInt(query.orderStatus);

            // 生成50条模拟数据
            const allWithdrawals = Array.from({ length: 32 }, (_, index) => {
                const id = index + 1;
                const itemCurrencyType = (id % 3) + 1; // 1: USDT, 2: BTC, 3: ETH
                const itemOrderStatus = (id % 3) + 1; // 1: Pending, 2: Completed, 3: Failed
                const currencyNameMap = { 1: "USDT", 2: "BTC", 3: "ETH" };

                return {
                    "orderNo": `WTD_${2000000 + id}`,
                    "currencyType": itemCurrencyType,
                    "currencyName": currencyNameMap[itemCurrencyType],
                    "orderStatus": itemOrderStatus,
                    "amount": (500 + id * 15),
                    "createTime": `2025-08-23 11:40:${String(id).padStart(2, '0')}`,
                    "updateTime": `2025-08-23 11:45:${String(id).padStart(2, '0')}`
                };
            });

            // 根据请求参数进行数据筛选
            const filteredWithdrawals = allWithdrawals.filter(item => {
                const isCurrencyMatch = isNaN(currencyType) || item.currencyType === currencyType;
                const isStatusMatch = isNaN(orderStatus) || item.orderStatus === orderStatus;
                return isCurrencyMatch && isStatusMatch;
            });

            const totalItems = filteredWithdrawals.length;

            // 根据页码和每页大小进行数据切片
            const startIndex = (pageNo - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            const paginatedList = filteredWithdrawals.slice(startIndex, endIndex);

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
]