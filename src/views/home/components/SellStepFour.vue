<template>
  <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 z-50">
    <div class="bg-white rounded-[1.25rem] flex flex-col items-center relative px-3 md:px-12 py-6 mx-2">
      <div class="flex flex-col items-center gap-[1.0625rem] w-full">
        <div class="w-[4.375rem] h-[3.6875rem] relative">
          <img class="absolute top-0 left-0 w-[4.375rem] h-[3.625rem]" src="@/assets/icons/down.svg" alt="Vector" />
        </div>
        <p class="text-black font-lato text-xl font-bold text-center w-full">Transfer Submitted!
        </p>
        <p class="text-black font-lato text-base text-center w-full">Your transfer is being verified. Please confirm
          again in 5 minutes.</p>
      </div>
      <section class="w-full bg-white rounded-lg overflow-hidden shadow-sm">
        <!-- 桌面端表格视图 -->
        <div class="hidden md:block">
          <!-- 表头 -->
          <div class="grid grid-cols-6 gap-4 px-6 py-4 bg-[#FFF7F2] text-black font-semibold">
            <div class="text-center">Date</div>
            <div class="text-center">Type</div>
            <div class="text-center">Total</div>
            <div class="text-center">Quantity</div>
            <div class="text-center">Price</div>
            <div class="text-center">State</div>
          </div>

          <!-- 数据行 -->
          <div v-for="(item, index) in data" :key="index"
            class="grid grid-cols-6 gap-4 px-6 py-4 border-b border-gray-100 hover:bg-gray-50">
            <div class="text-center text-black">{{ item.date }}</div>
            <div class="text-center text-black">{{ item.type }}</div>
            <div class="text-center text-black">{{ item.total }}</div>
            <div class="text-center text-black">{{ item.quantity }}</div>
            <div class="text-center text-black">{{ item.price }}</div>
            <div class="text-center">
              <span :class="getStateClass(item.state)" class="px-3 py-1 rounded-full text-xs font-medium">
                {{ item.state }}
              </span>
            </div>
          </div>
        </div>

        <!-- 移动端两列布局 -->
        <div class="md:hidden">
          <div v-for="(item, index) in data" :key="index" class="border-b border-gray-100 py-4">
            <!-- 两列布局：标题 + 数据 -->
            <div class="grid grid-cols-[2fr_3fr] gap-0">
              <!-- 标题列 -->
              <div class="space-y-0">
                <div class="bg-[#FFF7F2] px-3 py-2 rounded-lg text-xs text-gray-600 font-medium">Date</div>
                <div class="bg-[#FFF7F2] px-3 py-2 rounded-lg text-xs text-gray-600 font-medium">Type</div>
                <div class="bg-[#FFF7F2] px-3 py-2 rounded-lg text-xs text-gray-600 font-medium">Total</div>
                <div class="bg-[#FFF7F2] px-3 py-2 rounded-lg text-xs text-gray-600 font-medium">Quantity</div>
                <div class="bg-[#FFF7F2] px-3 py-2 rounded-lg text-xs text-gray-600 font-medium">Price</div>
                <div class="bg-[#FFF7F2] px-3 py-2 rounded-lg text-xs text-gray-600 font-medium">State</div>
              </div>

              <!-- 数据列 -->
              <div class="space-y-0">
                <div class="px-3 bg-[#F6F6F6] py-2 text-black text-xs font-medium">{{ item.date }}</div>
                <div class="px-3 bg-[#F6F6F6] py-2 text-black text-xs font-medium">{{ item.type }}</div>
                <div class="px-3 bg-[#F6F6F6] py-2 text-black text-xs font-medium">{{ item.total }}</div>
                <div class="px-3 bg-[#F6F6F6] py-2 text-black text-xs font-medium">{{ item.quantity }}</div>
                <div class="px-3 bg-[#F6F6F6] py-2 text-black text-xs font-medium">{{ item.price }}</div>
                <div class="px-3 py-2 text-xs" :class="getStateClass(item.state)">
                  {{ item.state }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div class="w-full mt-6 flex justify-center">
        <div @click="$emit('confirm')"
          class="w-2/3 bg-black rounded-[2.5rem] h-[2.75rem] flex items-center justify-center cursor-pointer">
          <div class="text-white font-lato text-base font-semibold leading-[3.875rem] whitespace-nowrap">Confirm</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const data = ref([
  {
    date: '2024-01-15',
    type: 'Buy',
    total: '$1,250.00',
    quantity: '0.5 BTC',
    price: '$25,000.00',
    state: 'Completed'
  },
])

const getStateClass = (state) => {
  switch (state.toLowerCase()) {
    case 'completed':
      return 'bg-green-100 text-green-800'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'failed':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
// 添加emit定义
defineEmits(['confirm']);
</script>