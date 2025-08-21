<template>
  <aside class="w-full">
    <div
      v-if="isDropdownOpen"
      class="fixed inset-0 bg-black/20 z-40"
      @click="isDropdownOpen = false"
    ></div>

    <div
      class="relative z-50"
      @click="toggleDropdown"
    >
      <div
        class="flex items-center gap-4 px-5 py-3 cursor-pointer border"
        :class="[
          'bg-[#fffbf8] border-l-[5px] border-[#ff7445] text-[#ff7445]',
          isDropdownOpen ? 'rounded-b-none' : ''
        ]"
      >
        <img :src="activeItemIcon" alt="icon" class="h-5 w-5" />
        <span class="text-base">{{ activeItemLabel }}</span>
        <img src="../../../assets/icons/dashboard/arrowDownBlack.svg" alt="icon" class="h-5 w-5 absolute right-4" />
      </div>

      <transition name="slide-fade">
        <div v-if="isDropdownOpen" class="absolute top-full left-0 w-full z-10 bg-white shadow-lg border-t-0 rounded-b-lg">
          <nav class="flex flex-col">
            <div
              v-for="item in dashboardItems"
              :key="item.name"
              @click.stop="setActiveAndClose(item)"
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

            <div class="px-5 py-3 text-gray-400 text-sm font-semibold">Settings</div>
            <div
              v-for="item in settingItems"
              :key="item.name"
              @click.stop="setActiveAndClose(item)"
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

            <div class="px-5 py-3 text-gray-400 text-sm font-semibold">Terminate Account</div>
            <div
              v-for="item in accountItems"
              :key="item.name"
              @click.stop="setActiveAndClose(item)"
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
        </div>
      </transition>
    </div>
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
import { ref, computed } from "vue";
import Dashboardsvg from "@/assets/icons/dashboard/dashboard.svg";
import Orderssvg from "@/assets/icons/dashboard/orders.svg";
import Ticketsvg from "@/assets/icons/dashboard/tickets.svg";
import Profilesvg from "@/assets/icons/dashboard/profile.svg";
import Securesvg from "@/assets/icons/dashboard/security.svg";
import Verisvg from "@/assets/icons/dashboard/verify.svg";
import Accountsvg from "@/assets/icons/dashboard/account.svg";
import { useRouter } from "vue-router";
import RegularPop from "../../../components/RegularPop.vue";

const activeItem = ref("dashboard");
const isDropdownOpen = ref(false);
const showCloseAccount = ref(false)

const router = useRouter()
const dashboardItems = [
  { name: "dashboard", label: "Dashboard", icon: Dashboardsvg },
  { name: "Orders", label: "Orders", icon: Orderssvg },
  { name: "Support Tickets", label: "Support Tickets", icon: Ticketsvg },
];
const settingItems = [
  { name: "Profile", label: "Profile", icon: Profilesvg },
  { name: "Security", label: "Security", icon: Securesvg },
  { name: "Verification", label: "Verification", icon: Verisvg },
];
const accountItems = [
  { name: "Close account", label: "Close account", icon: Accountsvg },
];

const allItems = [...dashboardItems, ...settingItems, ...accountItems];

const activeItemData = computed(() => {
  return allItems.find(item => item.name === activeItem.value) || {};
});
const activeItemLabel = computed(() => activeItemData.value.label);
const activeItemIcon = computed(() => activeItemData.value.icon);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const setActiveAndClose = (item) => {
  activeItem.value = item.name;
  isDropdownOpen.value = false;
  let name = item.name
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
  }
};
const handleConfirm = () => {
  showCloseAccount.value = false
};
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease-in-out;
  transform-origin: top;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: scaleY(0);
  opacity: 0;
}
</style>