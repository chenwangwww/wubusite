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

        <div v-for="(item, index) in data" :key="index" :class="gridColsClass"
          class="gap-4 px-6 py-4 border-b border-gray-100 hover:bg-gray-50">
          <div v-for="col in columns" :key="col.key" class="text-center text-black flex items-center justify-center">
            <slot :name="col.key" :item="item">
              {{ item[col.key] }}
            </slot>
          </div>
        </div>

        <div class="flex justify-center items-center mt-4 space-x-2" v-if="showPages">
          <button @click="$emit('previous')" :disabled="currentPage <= 1" class="px-4 py-2 border rounded-md"
            :class="{ 'opacity-50 cursor-not-allowed': currentPage <= 1 }">
            Previous
          </button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button @click="$emit('next')" :disabled="currentPage >= totalPages" class="px-4 py-2 border rounded-md"
            :class="{ 'opacity-50 cursor-not-allowed': currentPage >= totalPages }">
            Next
          </button>
        </div>
      </div>

      <div class="md:hidden max-h-[500px] overflow-y-auto" ref="mobileContainer">
        <div v-for="(item, index) in data" :key="index" class="border-b border-gray-100 py-4">
          <div class="grid grid-cols-[2fr_3fr] gap-0">
            <div class="space-y-0 text-left px-3">
              <div v-for="col in columns" :key="col.key" class="py-2 text-xs text-gray-600 font-medium">
                {{ col.label }}
              </div>
            </div>
            <div class="space-y-0 text-right px-3">
              <div v-for="col in columns" :key="col.key"
                class="py-2 text-black text-xs font-medium flex items-center justify-end">
                <slot :name="col.key" :item="item">
                  {{ item[col.key] }}
                </slot>
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
import { ref, computed, onMounted, onUnmounted, defineProps, defineEmits } from 'vue';

const props = defineProps({
  columns: {
    type: Array,
    required: true
  },
  data: {
    type: Array,
    required: true
  },
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  showPages: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['previous', 'next', 'load-more']);

const mobileContainer = ref(null);

const handleScroll = () => {
  if (mobileContainer.value) {
    const { scrollTop, scrollHeight, clientHeight } = mobileContainer.value;
    if (scrollTop + clientHeight >= scrollHeight - 50 && !props.loading) {
      if (props.currentPage < props.totalPages) {
        emit('load-more');
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

const gridColsClass = computed(() => {
  const numColumns = props.columns.length;
  return `grid grid-cols-${numColumns}`;
});
</script>