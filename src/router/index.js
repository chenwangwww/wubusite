import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import HomeView from '../views/home/Home.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        alias: '/home',
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
        path: '/usercenter',
        name: 'usercenter',
        redirect: '/usercenter/dashboard',
        component: () => import('../views/user/Center.vue'),
        meta: {
            requiresAuth: true  // 访问这个路由需要登录
        },
        children: [
            {
                path: 'dashboard',
                component: () => import('../views/user/components/Dashboard.vue'),
            },
            {
                path: 'cryptodeposit',
                component: () => import('../views/crypto/CryptoDeposit.vue'),
            },
            {
                path: 'orders',
                component: () => import('../views/orders/Orders.vue'),
            },
            {
                path: 'profile',
                component: () => import('../views/profile/Profile.vue'),
            },
            {
                path: 'bankaccount',
                component: () => import('../views/bankAccount/BankAccount.vue'),
            },
            {
                path: 'addbankaccount',
                component: () => import('../views/bankAccount/AddBankAccount.vue'),
            },
            {
                path: 'bankaccountcreated',
                component: () => import('../views/bankAccount/BankAccountCreated.vue'),
            },
            {
                path: 'depositcurrency',
                component: () => import('../views/deposit/DepositCurrency.vue'),
            },
            {
                path: 'depositcurrencyFinish',
                component: () => import('../views/deposit/DepositCurrencyFinish.vue'),
            },
            {
                path: 'ticket',
                component: () => import('../views/tickets/SupportTickets.vue'),
            },
            {
                path: 'addticket',
                component: () => import('../views/tickets/AddTicket.vue'),
            },
            {
                path: 'addticketsuccess',
                component: () => import('../views/tickets/AddTicketSuccess.vue'),
            },
            {
                path: 'usersecurity',
                component: () => import('../views/usersecure/SecurityCenter.vue'),
            },
            {
                path: 'withdrawcurrency',
                component: () => import('../views/withdraw/WithdrawCurrency.vue'),
            },
            {
                path: 'withdrawcurrencysuccess',
                component: () => import('../views/withdraw/WithCurrSeccess.vue'),
            },
            {
                path: 'withdrawcrypto',
                component: () => import('../views/withdraw/WithdrawCrypto.vue'),
            },
            {
                path: 'wallet',
                component: () => import('../views/wallet/WalletAccount.vue'),
            },
            {
                path: 'walletadd',
                component: () => import('../views/wallet/AddWallet.vue'),
            },
            {
                path: 'walletsuccess',
                component: () => import('../views/wallet/WalletSeccess.vue'),
            },
            {
                path: 'verification',
                component: () => import('../views/verification/Verification.vue'),
            },
        ],
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
    //   if (to.path === '/login' && userStore.isLoggedIn) {
    //     return '/home'
    //   }
})

export default router