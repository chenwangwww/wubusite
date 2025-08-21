<template>
  <div class="bg-white rounded-[1.25rem] flex flex-col items-center relative pb-6">
    <div v-if="!data || data.length === 0" class="flex items-center justify-center w-full h-64">
      <div class="flex flex-col gap-y-2 justify-center">
        <img src="../assets/icons/dashboard/noData.svg" alt="No data available" />
        <p class="text-gray-500 text-sm">No data available</p>
      </div>
    </div>

    <section v-else class="w-full bg-white rounded-lg overflow-hidden shadow-sm">
      <div class="hidden md:block">
        <div :class="gridColsClass" class="gap-4 px-6 py-4 bg-[#FFF7F2] text-black font-semibold">
          <div v-for="col in columns" :key="col.key" class="text-center">{{ col.label }}</div>
        </div>

        <div v-for="(item, index) in paginatedData" :key="index"
          :class="gridColsClass" class="gap-4 px-6 py-4 border-b border-gray-100 hover:bg-gray-50">
          <div v-for="col in columns" :key="col.key" class="text-center text-black flex items-center justify-center">
            <template v-if="col.key === 'state'">
              <slot name="state" :item="item">
                <span :class="getStateClass(item.state)" class="px-3 py-1 rounded-full text-xs font-medium">
                  {{ item.state }}
                </span>
              </slot>
            </template>
            <template v-else-if="col.key === 'action'">
              <div class="text-right">
                <slot name="action" :item="item"></slot>
              </div>
            </template>
            <template v-else-if="col.key === 'image'">
              <slot name="image" :item="item">
                <img :src="item.image" alt="Item Image" class="w-10 h-10 rounded-full object-cover mx-auto" />
              </slot>
            </template>
            <template v-else>
              {{ item[col.key] }}
            </template>
          </div>
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
              <div v-for="col in columns" :key="col.key" class="py-2 text-xs text-gray-600 font-medium">
                {{ col.label }}
              </div>
            </div>
            <div class="space-y-0 text-right px-3">
              <div v-for="col in columns" :key="col.key" class="py-2 text-black text-xs font-medium flex items-center justify-end">
                <template v-if="col.key === 'state'">
                  <slot name="state" :item="item">
                    <span :class="getStateClass(item.state)" class="px-3 py-1 rounded-full text-xs font-medium">
                      {{ item.state }}
                    </span>
                  </slot>
                </template>
                <template v-else-if="col.key === 'action'">
                  <slot name="action" :item="item"></slot>
                </template>
                <template v-else-if="col.key === 'image'">
                  <slot name="image" :item="item">
                    <img :src="item.image" alt="Item Image" class="w-10 h-10 rounded-full object-cover ml-auto" />
                  </slot>
                </template>
                <template v-else>
                  {{ item[col.key] }}
                </template>
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
import { ref, computed, onMounted, onUnmounted, defineProps } from 'vue';

const props = defineProps({
  columns: {
    type: Array,
    required: true
  },
  data: {
    type: Array,
    required: true
  }
});

// 桌面端分页逻辑
const currentPage = ref(1);
const itemsPerPage = 10;
const totalPages = computed(() => Math.ceil(props.data.length / itemsPerPage));
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return props.data.slice(start, end);
});

// 移动端无限加载逻辑
const visibleDataCount = ref(10);
const mobileContainer = ref(null);
const loading = ref(false);

const visibleData = computed(() => props.data.slice(0, visibleDataCount.value));

const handleScroll = () => {
  if (mobileContainer.value) {
    const { scrollTop, scrollHeight, clientHeight } = mobileContainer.value;
    if (scrollTop + clientHeight >= scrollHeight - 50 && !loading.value) {
      if (visibleDataCount.value < props.data.length) {
        loading.value = true;
        setTimeout(() => {
          visibleDataCount.value += 10;
          loading.value = false;
        }, 500);
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
  switch (state ? state.toLowerCase() : '') {
    case 'completed':
      return 'text-green-800 bg-green-100';
    case 'pending':
      return 'text-yellow-800 bg-yellow-100';
    case 'failed':
      return 'text-red-800 bg-red-100';
    default:
      return 'text-gray-800 bg-gray-100';
  }
};

const gridColsClass = computed(() => {
  const numColumns = props.columns.length;
  return `grid grid-cols-${numColumns}`;
});
</script>

<style scoped>
/* 你的 Tailwind CSS 样式，可以在这里添加自定义样式或覆盖 */
</style>