import pkg from 'mockjs';
const { Random } = pkg;

export default [
    {
        url: '/dev-api/app-api/member/user/ticket/page',
        method: 'get',
        response: ({ query }) => {
            const pageNo = parseInt(query.pageNo) || 1;
            const pageSize = parseInt(query.pageSize) || 10;

            // 生成32条模拟数据
            const allTickets = Array.from({ length: 32 }, (_, index) => {
                const id = index + 1;
                const orderType = (id % 3) + 1; // 1: 充值, 2: 提现, 3: 其他
                const credential = 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png';

                return {
                    id: id,
                    subject: `工单主题_${id}`,
                    orderType: orderType,
                    credential: credential,
                    createTime: `2025-08-23 11:${String(10 + id).padStart(2, '0')}`
                };
            });

            // 这里示例没有传查询参数，所以直接使用 allTickets
            const totalItems = allTickets.length;

            // 根据页码和每页大小进行数据切片
            const startIndex = (pageNo - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            const paginatedList = allTickets.slice(startIndex, endIndex);

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
        url: '/dev-api/app-api/member/user/ticket/create',
        method: 'post',
        timeout: 1000,
        response: ({ body }) => {
            // 从请求体中获取 subject、orderType、credential
            const { subject, orderType, credential } = body;

            // 模拟验证：subject、orderType 必须存在，credential 模拟为上传文件
            if (subject && orderType && credential) {
                // 模拟文件上传返回 URL
                const fileUrl = `https://mock-server.com/uploads/${Date.now()}_${credential}`;

                return {
                    code: 0, // 假设创建成功时 code 为 0
                    data: {
                        ticketId: Math.floor(Math.random() * 9000 + 1000), // 模拟工单 ID
                        subject,
                        orderType,
                        credentialUrl: fileUrl,
                        createTime: new Date().toISOString()
                    },
                    msg: '工单创建成功'
                };
            } else {
                return {
                    code: 400, // 模拟一个错误码
                    data: null,
                    msg: 'subject、orderType 和 credential 不能为空'
                };
            }
        }
    },

]