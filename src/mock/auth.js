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
    // 刷新令牌
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

    // 注册
    {
        url: '/dev-api/app-api/member/auth/signup',
        method: 'post',
        timeout: 1000,
        response: ({ body }) => {
            // 从请求体中获取 email 和 password
            const { email, password } = body;

            // 模拟验证：如果 email 和 password 都存在且非空，则视为有效
            if (email && password) {
                return {
                    code: 0, // 假设注册成功时 code 为 0
                    data: {
                        userId: Random.integer(1000, 9999), // 模拟生成的 userId
                        accessToken: 'mock_access_token_' + Math.random().toString(36).substring(2),
                        refreshToken: 'mock_refresh_token_' + Math.random().toString(36).substring(2),
                        expiresTime: new Date(Date.now() + 3600 * 1000).toISOString(), // 模拟一个小时后过期
                        openid: 'mock_openid_' + Math.random().toString(36).substring(2)
                    },
                    msg: '注册成功'
                };
            } else {
                return {
                    code: 1073741824, // 模拟一个错误码
                    data: null,
                    msg: '邮箱和密码不能为空'
                };
            }
        }
    },

    // 发送验证码
    {
        url: '/dev-api/app-api/member/auth/send-code',
        method: 'post',
        timeout: 1000,
        response: ({ body }) => {
            // 从请求体中获取 email 和 password
            const { email } = body;

            // 模拟验证：如果 email 和 password 都存在且非空，则视为有效
            if (email) {
                return {
                    code: 0, // 假设注册成功时 code 为 0
                    data: true,
                    msg: '注册成功'
                };
            } else {
                return {
                    code: 1073741824, // 模拟一个错误码
                    data: null,
                    msg: '邮箱和密码不能为空'
                };
            }
        }
    },

    // 登出
    {
        url: '/dev-api/app-api/member/auth/logout',
        method: 'post',
        timeout: 1000,
        response: () => {
            return {
                code: 0, // 假设登出成功时 code 为 0
                data: true,
                msg: '登出成功'
            };
        }
    }
]