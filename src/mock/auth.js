// /mock/trade.ts
import pkg from 'mockjs';
const { Random } = pkg;

export default [
    // 登录
    {
        url: '/dev-api/app-api/member/auth/login',
        method: 'post',
        timeout: 1000,
        response: ({ body }) => {
            // 从请求体中获取 email 和 password
            const { email, password } = body;

            // 模拟正确的邮箱和密码
            const correctEmail = 'test@example.com';
            const correctPassword = '123456';

            if (email === correctEmail && password === correctPassword) {
                return {
                    code: 0,
                    data: {
                        token: 'mock_jwt_token_' + Math.random().toString(36).substring(2), // 模拟 JWT token
                        refreshToken: 'mock_refresh_token_' + Math.random().toString(36).substring(2), // 模拟 Refresh token
                        // 可以根据需要添加其他用户数据
                        userId: 'user_' + Math.floor(Math.random() * 100000),
                        email: 'test@example.com',
                        phoneNumber: 'TestUser'
                    },
                    msg: '登录成功'
                };
            } else {
                return {
                    code: 401, // 未授权状态码
                    data: null,
                    msg: '邮箱或密码错误'
                };
            }
        }
    },
    {
        url: '/dev-api/app-api/member/auth/refresh-token',
        method: 'post',
        timeout: 1000,
        response: ({ body }) => {
            // 从请求体中获取 refreshToken
            const { refreshToken } = body;

            // 模拟验证：如果 refreshToken 存在且非空，则视为有效
            if (refreshToken) {
                return {
                    code: 0,
                    data: {
                        // 模拟返回新的 token 和 refreshToken
                        token: 'mock_new_jwt_token_' + Math.random().toString(36).substring(2),
                        refreshToken: 'mock_new_refresh_token_' + Math.random().toString(36).substring(2),
                    },
                    msg: 'Token 刷新成功'
                };
            } else {
                return {
                    code: 401, // 未授权状态码
                    data: null,
                    msg: '无效的刷新 Token'
                };
            }
        }
    },
]