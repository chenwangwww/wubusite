import axios from 'axios';
import { useUserStore } from "@/stores/user.js"
import * as apiAuth from '@/api/auth.js'

// 设置接口超时时间
axios.defaults.timeout = 60000;
axios.defaults.baseURL = import.meta.env.VITE_APP_API; // 自定义接口地址  VITE_USER_NODE_ENV

//请求拦截
axios.interceptors.request.use(
    (config) => {
        const tokenStore = useUserStore()
        config.headers["Authorization"] = tokenStore.authHeader.Authorization
        config.headers["tenant-id"] = '1'
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// 记录是否正在刷新 token
let isRefreshing = false
let refreshSubscribers = []

// 添加订阅者（等待刷新完成后执行）
function subscribeTokenRefresh(cb) {
    refreshSubscribers.push(cb)
}

function onRefreshed(token) {
    refreshSubscribers.forEach(cb => cb(token))
    refreshSubscribers = []
}

// 获取新 token 的方法（返回 Promise）
function refreshTokenMethod() {
    const tokenStore = useUserStore()
    const refreshToken = tokenStore.getRefreshToken
    return apiAuth.refreshTokenApi(refreshToken)
}

// 响应拦截
axios.interceptors.response.use(
    (response) => {
        if (response.data.code > 401 || response.data.code === 400) {
            window.showAlert(response.data.msg)
            return
        }

        // 判断业务码是否是401，表示令牌失效
        if (response.data.code === 401) {
            const originalRequest = response.config
            const tokenStore = useUserStore()

            if (!originalRequest._retry) {
                if (!isRefreshing) {
                    isRefreshing = true

                    return refreshTokenMethod()
                        .then((res) => {
                            let newToken = res.data.accessToken
                            tokenStore.setToken(res.data.accessToken)
                            tokenStore.setRefreshToken(res.data.refreshToken)
                            tokenStore.setUserId(res.data.userId)
                            onRefreshed(newToken)
                            isRefreshing = false

                            originalRequest._retry = true
                            originalRequest.headers.Authorization = `Bearer ${newToken}`
                            return axios(originalRequest)
                        })
                        .catch(err => {
                            // isRefreshing = false
                            tokenStore.setToken('')
                            tokenStore.setRefreshToken('')
                            tokenStore.setUserId('')

                            return Promise.reject(err)
                        })
                }

                return new Promise(resolve => {
                    subscribeTokenRefresh((token) => {
                        originalRequest._retry = true
                        originalRequest.headers.Authorization = `Bearer ${token}`
                        resolve(axios(originalRequest))
                    })
                })
            }
        }
        return response;
    },
    (error) => {
        window.showAlert("服务端错误，请联系管理员")
        return Promise.reject(error);
    },
);

// 封装 请求并导出
export function request(data) {
    return new Promise((resolve, reject) => {
        const promise = axios(data);
        //处理返回
        promise
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

