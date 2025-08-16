import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/aboutus',
    name: 'aboutus',
    component: () => import('../views/aboutus/AboutUs.vue') // 懒加载
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router