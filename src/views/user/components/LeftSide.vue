<template>
  <aside class="w-64 min-h-[calc(100vh-6.5rem)]">
    <!-- 标题 -->
    <div class="pb-4">
      <h2 class="text-xl font-semibold text-gray-700">My Profile</h2>
    </div>

    <!-- 菜单项 -->
    <nav class="flex-1 flex flex-col gap-2 px-2 py-4">
      <div
        v-for="item in dashboardItems"
        :key="item.name"
        @click="setActive(item.name)"
        class="flex items-center gap-4 px-5 py-3 cursor-pointer transition-all duration-200"
        :class="[
          activeItem === item.name
            ? 'bg-[#fffbf8] border-l-[5px] border-[#ff7445] text-[#ff7445]'
            : 'text-gray-600 hover:bg-gray-100 border-l-[5px] border-white'
        ]"
      >
        <img :src="item.icon" alt="icon" class="h-5 w-5" />
        <span class="text-base">{{ item.label }}</span>
      </div>
    </nav>

     <!-- 标题 -->
    <div class="py-4">
      <h2 class="text-xl font-semibold text-gray-700">Settings</h2>
    </div>

    <!-- 菜单项 -->
    <nav class="flex-1 flex flex-col gap-2 px-2 py-4">
      <div
        v-for="item in settingItems"
        :key="item.name"
        @click="setActive(item.name)"
        class="flex items-center gap-4 px-5 py-3 cursor-pointer transition-all duration-200"
        :class="[
          activeItem === item.name
            ? 'bg-[#fffbf8] border-l-[5px] border-[#ff7445] text-[#ff7445]'
            : 'text-gray-600 hover:bg-gray-100 border-l-[5px] border-white'
        ]"
      >
        <img :src="item.icon" alt="icon" class="h-5 w-5" />
        <span class="text-base">{{ item.label }}</span>
      </div>
    </nav>

     <!-- 标题 -->
    <div class="py-4">
      <h2 class="text-xl font-semibold text-gray-700">Terminate Account</h2>
    </div>

    <!-- 菜单项 -->
    <nav class="flex-1 flex flex-col gap-2 px-2 py-4">
      <div
        v-for="item in accountItems"
        :key="item.name"
        @click="setActive(item.name)"
        class="flex items-center gap-4 px-5 py-3 cursor-pointer transition-all duration-200"
        :class="[
          activeItem === item.name
            ? 'bg-[#fffbf8] border-l-[5px] border-[#ff7445] text-[#ff7445]'
            : 'text-gray-600 hover:bg-gray-100 border-l-[5px] border-white'
        ]"
      >
        <img :src="item.icon" alt="icon" class="h-5 w-5" />
        <span class="text-base">{{ item.label }}</span>
      </div>
    </nav>
  </aside>
  <RegularPop
    v-if="showCloseAccount"
    title="Close account"
    body-text="Are You sure you want to close your account?"
    confirm-text="Yes"
    :showCancelButton="true"
    cancelText="No"
    @confirm="handleConfirm"
    @cancel="handleConfirm"
  >
  </RegularPop>
</template>

<script setup lang="ts">
import { ref } from "vue"
import Dashboardsvg from '../../../assets/icons/dashboard/dashboard.svg'
import Orderssvg from '../../../assets/icons/dashboard/orders.svg'
import Ticketsvg from '../../../assets/icons/dashboard/tickets.svg'
import Profilesvg from '../../../assets/icons/dashboard/profile.svg'
import Securesvg from '../../../assets/icons/dashboard/security.svg'
import Verisvg from '../../../assets/icons/dashboard/verify.svg'
import Accountsvg from '../../../assets/icons/dashboard/account.svg'
import { useRouter } from "vue-router"
import RegularPop from "../../../components/RegularPop.vue"
import * as apiAuth from '@/api/auth.js'
import { useUserStore } from '@/stores/user'

const activeItem = ref("dashboard")
const userStore = useUserStore()

const router = useRouter()
const showCloseAccount = ref(false)
const dashboardItems = [
  { name: "dashboard", label: "Dashboard", icon: Dashboardsvg },
  { name: "Orders", label: "Orders", icon: Orderssvg },
  { name: "Support Tickets", label: "Support Tickets", icon: Ticketsvg },
]
const settingItems = [
  { name: "Profile", label: "Profile", icon: Profilesvg },
  { name: "Security", label: "Security", icon: Securesvg },
  { name: "Verification", label: "Verification", icon: Verisvg },
]
const accountItems = [
  { name: "Close account", label: "Close account", icon: Accountsvg },
]

const setActive = (name: string) => {
  activeItem.value = name
  if (name === 'dashboard') {
    router.push('/usercenter/dashboard')
  } else if (name === 'Orders') {
    router.push('/usercenter/orders')
  } else if (name === 'Profile') {
    router.push('/usercenter/profile')
  } else if (name === 'Support Tickets') {
    router.push('/usercenter/ticket')
  } else if (name === 'Security') {
    router.push('/usercenter/usersecurity')
  } else if (name === 'Close account') {
    showCloseAccount.value = true
  } else if (name === 'Verification') {
    router.push('/usercenter/verification')
  }
}

const handleConfirm = async() => {
  try {
      const result = await apiAuth.logoutApi()
      
      if (result.code == 0) {
        showCloseAccount.value = false
        userStore.logout()
        router.push('/login');
      }
    } catch (error) {
      apiError.value = "An error occurred";
    }

};
</script>
