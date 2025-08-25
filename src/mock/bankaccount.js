import pkg from 'mockjs';
const { Random } = pkg;

export default [
{
    url: '/dev-api/app-api/member/user/bankaccount/list',
    method: 'get',
    timeout: 1000,
    response: ({ query }) => {
        const success = Math.random() > 0.01; // 1% 的概率失败

        if (success) {
            const data = [];
            for (let i = 1; i <= 23; i++) {
                const isSystem = i % 3 === 0;
                const fiatType = isSystem ? 'USD' : (i % 2 === 0 ? 'EUR' : 'GBP');
                const status = i % 5 === 0 ? 0 : 1; // 模拟一些禁用状态

                data.push({
                    "id": 1000 + i,
                    "label": `银行账户 ${i}`,
                    "bankAccount": `6225${12345678 + i}`,
                    "swiftCode": `SWIFT${i}`,
                    "bankName": `银行名称 ${i}`,
                    "bankAddress": `银行地址 ${i}`,
                    "routingNumber": `ROUTING${i}`,
                    "fiatType": fiatType,
                    "status": status,
                    "remark": `这是第 ${i} 个银行账户`,
                    "createTime": new Date(Date.now() - i * 3600 * 1000).toISOString(),
                    "iban": `IBAN${i}`
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
},

{
    url: '/dev-api/app-api/member/user/bankaccount/delete',
    method: 'delete',
    timeout: 1000,
    response: ({ body }) => {
        // 假设 id 参数通过 URL query 传递
        const { id } = body;

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
    url: '/dev-api/app-api/member/user/bankaccount/create',
    method: 'post',
    timeout: 1000,
    response: ({ body }) => {
        const { label, swiftCode, bankName, bankAddress, routingNumber, fiatType, isDefault, remark, iban } = body;

        // 模拟验证：检查一些关键的必填字段是否存在
        if (label && bankName && fiatType) { // 假设这些是创建银行账户的必填字段
            // 模拟创建成功
            return {
                code: 0,
                data: true,
                msg: "银行账户创建成功"
            };
        } else {
            // 模拟创建失败，通常是因为缺少关键参数
            return {
                code: 1073741824,
                data: false,
                msg: "必填参数不完整，请检查银行名称、账户标签和货币类型"
            };
        }
    }
}
]