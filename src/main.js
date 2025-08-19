import { createApp } from 'vue'
import './assets/main.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import clickOutside from './directives/clickOutside.js'

const app = createApp(App)
app.directive('click-outside', clickOutside)
app.use(createPinia())
app.use(router) // 使用路由
app.mount('#app')
