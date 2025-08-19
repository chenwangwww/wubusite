import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
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
    },
    {
        path: '/security',
        name: 'security',
        component: () => import('../views/security/Security.vue') // 懒加载
    },
    {
        path: '/learn',
        name: 'learn',
        component: () => import('../views/learn/Learn.vue'), // 懒加载
    },
    {
        path: '/learn/newbie1',
        name: 'newbie1',
        component: () => import('../views/learn/newbie1.vue'),
    },
    {
        path: '/learn/newbie2',
        name: 'newbie2',
        component: () => import('../views/learn/newbie2.vue'),
    },
    {
        path: '/learn/newbie3',
        name: 'newbie3',
        component: () => import('../views/learn/newbie3.vue'),
    },
    {
        path: '/learn/newbie4',
        name: 'newbie4',
        component: () => import('../views/learn/newbie4.vue'),
    },
    {
        path: '/info',
        name: 'info',
        component: () => import('../views/info/Info.vue'),
    },
    {
        path: '/executeteam',
        name: 'executeteam',
        component: () => import('../views/executiveTeam/ExecutiveTeam.vue'),
    },
    {
        path: '/contactus',
        name: 'contactus',
        component: () => import('../views/contactUs/ContactUs.vue'),
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/auth/Register.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/auth/Login.vue'),
    },
    {
        path: '/forget',
        name: 'forget',
        component: () => import('../views/auth/Forget.vue'),
    },
    {
        path: '/tests',
        name: 'tests',
        component: () => import('../views/test/Test.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to) => {
  const userStore = useUserStore()
  
  // 需要认证但未登录
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    return '/login'
  }
  
  // 已登录但访问登录页
  if (to.path === '/login' && userStore.isLoggedIn) {
    return '/home'
  }
})

export default router