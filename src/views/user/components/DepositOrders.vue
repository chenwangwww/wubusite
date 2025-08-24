<template>
  <div class="bg-white rounded-[1.25rem] flex flex-col items-center relative md:px-12 py-6 mx-2">
    <section class="w-full bg-white rounded-lg overflow-hidden shadow-sm">
      <div class="hidden md:block">
        <div class="grid grid-cols-7 gap-4 px-6 py-4 bg-[#FFF7F2] text-black font-semibold">
          <div class="text-center">Order No.</div>
          <div class="text-center">Currency Type</div>
          <div class="text-center">Currency Name</div>
          <div class="text-center">Amount</div>
          <div class="text-center">Status</div>
          <div class="text-center">Creation Time</div>
          <div class="text-center">Action</div>
        </div>
        <div v-for="(item, index) in paginatedData" :key="index"
          class="grid grid-cols-7 gap-4 px-6 py-4 border-b border-gray-100 hover:bg-gray-50">
          <div class="text-center text-black">{{ item.orderNo }}</div>
          <div class="text-center text-black">{{ item.currencyType }}</div>
          <div class="text-center text-black">{{ item.currencyName }}</div>
          <div class="text-center text-black">{{ item.amount }}</div>
          <div class="text-center">
            <span :class="getStateClass(item.orderStatus)" class="px-3 py-1 rounded-full text-xs font-medium">
              {{ getOrderStatus(item.orderStatus) }}
            </span>
          </div>
          <div class="text-center text-black">{{ item.createTime }}</div>
          <div class="text-center text-white bg-[#0ECB81] rounded-lg py-2 h-[fit-content]" @click="handleShowDetail(item)">Details</div>
        </div>
        <div class="flex justify-center items-center mt-4 space-x-2">
          <button @click="getDataPrevious" :disabled="currentPage <= 1" class="px-4 py-2 border rounded-md"
            :class="{ 'opacity-50 cursor-not-allowed': currentPage <= 1 }">
            Previous
          </button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button @click="getDataNext" :disabled="currentPage >= totalPages" class="px-4 py-2 border rounded-md"
            :class="{ 'opacity-50 cursor-not-allowed': currentPage >= totalPages }">
            Next
          </button>
        </div>
      </div>

      <div class="md:hidden max-h-[500px] overflow-y-auto" ref="mobileContainer">
        <div v-for="(item, index) in data" :key="index" class="border-b border-gray-100 py-4">
          <div class="grid grid-cols-[2fr_3fr] gap-0">
            <div class="space-y-0 text-left px-3">
              <div class="py-2 rounded-lg text-xs text-gray-600 font-medium">Order No.</div>
              <div class="py-2 rounded-lg text-xs text-gray-600 font-medium">Currency Type</div>
              <div class="py-2 rounded-lg text-xs text-gray-600 font-medium">Currency Name</div>
              <div class="py-2 rounded-lg text-xs text-gray-600 font-medium">Amount</div>
              <div class="py-2 rounded-lg text-xs text-gray-600 font-medium">Status</div>
              <div class="py-2 rounded-lg text-xs text-gray-600 font-medium">Creation Time</div>
              <div class="py-2 rounded-lg text-xs text-gray-600 font-medium">Action</div>
            </div>
            <div class="space-y-0 text-right px-3">
              <div class="py-2 text-black text-xs font-medium">{{ item.orderNo }}</div>
              <div class="py-2 text-black text-xs font-medium">{{ item.currencyType }}</div>
              <div class="py-2 text-black text-xs font-medium">{{ item.currencyName }}</div>
              <div class="py-2 text-black text-xs font-medium">{{ item.amount }}</div>
              <div class="py-2 text-xs" :class="getStateClass(item.orderStatus)">
                {{ getOrderStatus(item.orderStatus) }}
              </div>
              <div class="py-2 text-black text-xs font-medium">{{ item.createTime }}</div>
              <div class="text-white bg-[#0ECB81] rounded-lg py-2 px-4 text-xs font-medium inline-block"
                @click="handleShowDetail(item)">Details</div>
            </div>
          </div>
        </div>
        <div v-if="loading" class="text-center py-4">Loading...</div>
      </div>
    </section>
  </div>
  <DetailPop :data="orderData" @confirm="handleConfirm" v-if="showDetail" />
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import * as apiFunding from '@/api/funding.js';
import DetailPop from './DetailPop.vue';
import Bus from '@/utils/eventBus'

const data = ref([]);
const orderData = ref(null);

const currentPage = ref(1);
const itemsPerPage = 10;
const total = ref(0);
const totalPages = computed(() => Math.ceil(total.value / itemsPerPage));
const paginatedData = ref([]);

const showDetail = ref(false);

const mobileContainer = ref(null);
const loading = ref(false);

const getData = async (params = {}) => {
  let pa = {
    pageNo: currentPage.value,
    pageSize: itemsPerPage,
    ...params
  }
  const result = await apiFunding.depositPageApi(pa);
  if (result.code == 0) {
    data.value = [...data.value, ...result.data.list];
    paginatedData.value = result.data.list;
    total.value = Number(result.data.total);
  }
};

const getD = (params) => {
  currentPage.value = 1
  getData(params)
}

const handleShowDetail = (item) => {
  orderData.value = item;
  showDetail.value = true;
};
const handleConfirm = () => {
  console.log('Confirmed!');
  showDetail.value = false;
};

const handleScroll = async () => {
  if (mobileContainer.value) {
    const { scrollTop, scrollHeight, clientHeight } = mobileContainer.value;

    if (scrollTop + clientHeight >= scrollHeight - 50 && !loading.value) {
      if (data.value.length < total.value) {
        loading.value = true;
        currentPage.value++;
        await getData();
        loading.value = false;
      }
    }
  }
};

const getDataPrevious = () => {
  currentPage.value--;
  getData();
};
const getDataNext = () => {
  currentPage.value++;
  getData();
};

onMounted(() => {
  Bus.on("search-order", getD)

  getData();
  if (mobileContainer.value) {
    mobileContainer.value.addEventListener('scroll', handleScroll);
  }
});

onUnmounted(() => {
  Bus.off("search-order", getD)

  if (mobileContainer.value) {
    mobileContainer.value.removeEventListener('scroll', handleScroll);
  }
});

const getOrderStatus = (status) => {
  switch (status) {
    case 1:
      return 'Pending';
    case 2:
      return 'Completed';
    case 3:
      return 'Failed';
    default:
      return 'Unknown';
  }
};

const getStateClass = (status) => {
  switch (status) {
    case 1:
      return 'text-yellow-800';
    case 2:
      return 'text-green-800';
    case 3:
      return 'text-red-800';
    default:
      return 'text-gray-800';
  }
};

</script>