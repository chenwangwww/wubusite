import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
//   {
//     path: '/about',
//     name: 'about',
//     component: () => import('../views/AboutView.vue') // 懒加载
//   }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router