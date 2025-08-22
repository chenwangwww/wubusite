import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    email: '',
    phoneNumber: '',
    token: '',
    refreshToken: '',
  }),
  
  getters: {
    // 获取用户基本信息
    userInfo: (state) => ({
      email: state.email,
      phone: state.phoneNumber,
      isLoggedIn: state.isLoggedIn
    }),
    
    // 获取认证头
    authHeader: (state) => ({
      Authorization: `Bearer ${state.token}`
    }),

    // 获取刷新认证头
    getRefreshToken: (state) => state.refreshToken,
    
    // 检查token是否有效（简单示例）
    isTokenValid: (state) => {
      return state.token && state.token.length > 0
    }
  },
  
  actions: {
    // 用户登录成功
    loginSuccess(payload) {
      this.isLoggedIn = true
      // this.email = payload.email
      // this.phoneNumber = payload.phoneNumber
      this.token = payload.token
      this.refreshToken = payload.refreshToken || ''
      
      // 可选的本地存储持久化
      localStorage.setItem('userToken', this.token)
    },
    
    // 用户登出
    logout() {
      this.$reset() // 重置所有状态
      localStorage.removeItem('userToken')
    },
    
    // 更新token
    updateToken(newToken) {
      this.token = newToken
      localStorage.setItem('userToken', newToken)
    },

    // 更新刷新token
    setRefreshToken(newToken) {
      this.refreshToken = newToken
      localStorage.setItem('userRefreshToken', newToken)
    },
    
    // 从存储初始化（例如页面刷新后）
    initializeFromStorage() {
      const token = localStorage.getItem('userToken')
      if (token) {
        this.token = token
        this.isLoggedIn = true
        // 这里可以添加API调用来获取完整的用户信息
      }
    },
    
    // 更新用户信息
    updateUserInfo(payload) {
      if (payload.email) this.email = payload.email
      if (payload.phoneNumber) this.phoneNumber = payload.phoneNumber
    }
  }
})