<template>
  <aside class="w-64 flex flex-col min-h-[calc(100vh-6.5rem)]">
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

const activeItem = ref("dashboard")

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
}
</script>
