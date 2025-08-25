import pkg from 'mockjs';
const { Random } = pkg;

export default [
{
    url: '/dev-api/app-api/member/user/cryptowallet/list',
    method: 'get',
    timeout: 1000,
    response: ({ query }) => {
        const success = Math.random() > 0.1; // 10% 的概率失败

        if (success) {
            const data = [];
            for (let i = 1; i <= 23; i++) {
                const isSystem = i % 3 === 0;
                const network = isSystem ? 'ETH' : (i % 2 === 0 ? 'BTC' : 'TRON');
                const symbol = network === 'ETH' ? 'USDT' : (network === 'BTC' ? 'BTC' : 'TRX');
                const status = i % 5 === 0 ? 0 : 1; // 模拟一些禁用状态
                
                data.push({
                    "id": 1000 + i,
                    "type": isSystem ? "system" : "user",
                    "label": `钱包 ${i}`,
                    "walletAddress": `0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b${i % 10}`,
                    "network": network,
                    "symbol": symbol,
                    "status": status,
                    "remark": `这是第 ${i} 个钱包`,
                    "createTime": new Date(Date.now() - i * 3600 * 1000).toISOString()
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
                "msg": "获取钱包列表失败"
            };
        }
    }
},

{
    url: '/dev-api/app-api/member/user/cryptowallet/delete',
    method: 'delete',
    timeout: 1000,
    response: ({ query }) => {
        // 假设 id 参数通过 URL query 传递
        const { id } = query;

        // 模拟验证：检查 id 是否存在
        if (id) {
            // 模拟删除成功
            return {
                code: 0,
                data: true,
                msg: "删除成功"
            };
        } else {
            // 模拟删除失败
            return {
                code: 1073741824,
                data: false,
                msg: "钱包ID不能为空"
            };
        }
    }
},

{
    url: '/dev-api/app-api/member/user/cryptowallet/create',
    method: 'post',
    timeout: 1000,
    response: ({ body }) => {
        const { label, walletAddress, network, currency, remark } = body;

        // 模拟验证：检查所有必填字段是否存在且有效
        if (label && walletAddress && network && currency) {
            // 模拟创建成功
            return {
                code: 0,
                data: true,
                msg: "钱包创建成功"
            };
        } else {
            // 模拟创建失败，通常是因为缺少参数
            return {
                code: 1073741824,
                data: false,
                msg: "必填参数不完整"
            };
        }
    }
}
]