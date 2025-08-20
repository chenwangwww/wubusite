<template>
  <div class="bg-white rounded-[1.25rem] flex flex-col items-center relative md:px-12 py-6 mx-2">
    <section class="w-full bg-white rounded-lg overflow-hidden shadow-sm">
      <div class="hidden md:block">
        <div class="grid grid-cols-6 gap-4 px-6 py-4 bg-[#FFF7F2] text-black font-semibold">
          <div class="text-center">Date</div>
          <div class="text-center">Amount</div>
          <div class="text-center">Currency</div>
          <div class="text-center">rate</div>
          <div class="text-center">State</div>
          <div class="text-center">action</div>
        </div>
        <div v-for="(item, index) in paginatedData" :key="index"
          class="grid grid-cols-6 gap-4 px-6 py-4 border-b border-gray-100 hover:bg-gray-50">
          <div class="text-center text-black">{{ item.date }}</div>
          <div class="text-center text-black">{{ item.type }}</div>
          <div class="text-center text-black">{{ item.total }}</div>
          <div class="text-center text-black">{{ item.quantity }}</div>
          <div class="text-center">
            <span :class="getStateClass(item.state)" class="px-3 py-1 rounded-full text-xs font-medium">
              {{ item.state }}
            </span>
          </div>
          <div class="text-center text-white bg-[#0ECB81] rounded-lg py-2">Details</div>
        </div>
        <div class="flex justify-center items-center mt-4 space-x-2">
          <button @click="currentPage--" :disabled="currentPage <= 1" class="px-4 py-2 border rounded-md"
            :class="{ 'opacity-50 cursor-not-allowed': currentPage <= 1 }">
            Previous
          </button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button @click="currentPage++" :disabled="currentPage >= totalPages" class="px-4 py-2 border rounded-md"
            :class="{ 'opacity-50 cursor-not-allowed': currentPage >= totalPages }">
            Next
          </button>
        </div>
      </div>

      <div class="md:hidden max-h-[500px] overflow-y-auto" ref="mobileContainer">
        <div v-for="(item, index) in visibleData" :key="index" class="border-b border-gray-100 py-4">
          <div class="grid grid-cols-[2fr_3fr] gap-0">
            <div class="space-y-0 text-left px-3">
              <div class="py-2 rounded-lg text-xs text-gray-600 font-medium">action</div>
              <div class="py-2 rounded-lg text-xs text-gray-600 font-medium">Date</div>
              <div class="py-2 rounded-lg text-xs text-gray-600 font-medium">Amount</div>
              <div class="py-2 rounded-lg text-xs text-gray-600 font-medium">Currency</div>
              <div class="py-2 rounded-lg text-xs text-gray-600 font-medium">rate</div>
              <div class="py-2 rounded-lg text-xs text-gray-600 font-medium">State</div>
            </div>
            <div class="space-y-0 text-right px-3">
              <div class="text-white bg-[#0ECB81] rounded-lg py-2 px-4 text-xs font-medium inline-block">Details</div>
              <div class="py-2 text-black text-xs font-medium">{{ item.date }}</div>
              <div class="py-2 text-black text-xs font-medium">{{ item.type }}</div>
              <div class="py-2 text-black text-xs font-medium">{{ item.total }}</div>
              <div class="py-2 text-black text-xs font-medium">{{ item.quantity }}</div>
              <div class="py-2 text-xs" :class="getStateClass(item.state)">
                {{ item.state }}
              </div>
            </div>
          </div>
        </div>
        <div v-if="loading" class="text-center py-4">Loading...</div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const data = ref(
  Array.from({ length: 50 }, (_, i) => ({
    date: `2024-01-${(i % 30) + 1}`,
    type: i % 2 === 0 ? 'Buy' : 'Sell',
    total: `$${(1250 + i * 10).toFixed(2)}`,
    quantity: `${(0.5 + i * 0.01).toFixed(2)} BTC`,
    price: `$${(25000 + i * 100).toFixed(2)}`,
    state: i % 3 === 0 ? 'Completed' : i % 3 === 1 ? 'Pending' : 'Failed',
  }))
);

// 桌面端分页逻辑
const currentPage = ref(1);
const itemsPerPage = 10;
const totalPages = computed(() => Math.ceil(data.value.length / itemsPerPage));
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return data.value.slice(start, end);
});

// 移动端无限加载逻辑
const visibleDataCount = ref(10);
const mobileContainer = ref(null);
const loading = ref(false);

const visibleData = computed(() => data.value.slice(0, visibleDataCount.value));

const handleScroll = () => {
  if (mobileContainer.value) {
    const { scrollTop, scrollHeight, clientHeight } = mobileContainer.value;

    // 检查是否滚动到接近底部
    if (scrollTop + clientHeight >= scrollHeight - 50 && !loading.value) {
      if (visibleDataCount.value < data.value.length) {
        loading.value = true;
        setTimeout(() => {
          visibleDataCount.value += 10;
          loading.value = false;
        }, 500); // 模拟数据加载
      }
    }
  }
};

onMounted(() => {
  if (mobileContainer.value) {
    mobileContainer.value.addEventListener('scroll', handleScroll);
  }
});

onUnmounted(() => {
  if (mobileContainer.value) {
    mobileContainer.value.removeEventListener('scroll', handleScroll);
  }
});

const getStateClass = (state) => {
  switch (state.toLowerCase()) {
    case 'completed':
      return 'text-green-800';
    case 'pending':
      return 'text-yellow-800';
    case 'failed':
      return 'text-red-800';
    default:
      return 'text-gray-800';
  }
};
</script>