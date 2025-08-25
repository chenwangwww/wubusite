<template>
  <section class="mt-9 md:ml-16 md:mr-8 mx-4 md:px-16 px-3 bg-white">
    <div class="py-8 flex gap-x-8 items-center">
      <img src="../../assets//icons/dashboard/arrow-left.svg" class="w-8" />
      <span class=" font-bold text-2xl">Deposit</span>
    </div>
    <div class="w-full mb-8 flex justify-center items-center">
      <div class="bg-[#FF7545] text-xl font-semibold w-[42rem] text-white py-4 text-center rounded-lg">
        <router-link to="/usercenter/walletadd">Add new Wallet</router-link>
      </div>
    </div>
    <div class="text-xl font-semibold my-4">Wallet Account</div>
    <div>
      <DynamicTable :showPages="false" :columns="tableColumns" :data="allWalletData" :currentPage="currentPage"
        :totalPages="totalPages" :loading="loading" @previous="handlePreviousPage" @next="handleNextPage"
        @load-more="handleLoadMore">
        <template #action="{ item }">
          <div class="flex gap-x-3 justify-end">
            <button class="text-white bg-[#0ECB81] rounded-lg py-2 px-4 text-xs font-medium"
              @click="handleDetail(item)">
              Detail
            </button>
            <button class="text-white bg-[#8d8d8d] rounded-lg py-2 px-4 text-xs font-medium"
              @click="handleDelete(item)">
              Delete
            </button>
          </div>
        </template>
      </DynamicTable>
    </div>
  </section>
  <DetailPop :data="detailData" @confirm="handleConfirm" v-if="showDetail" />
  <RegularPop v-if="showPop" title="Wallet" body-text="Are You sure you want to delete your wallet?" confirm-text="Yes"
    :showCancelButton="true" cancelText="No" @confirm="handleConfirmD" @cancel="showPop=false">
  </RegularPop>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import DynamicTable from '../../components/DynamicTable.vue';
import * as apiWallet from '@/api/cryptoWallet.js';
import DetailPop from '../user/components/DetailPop.vue';
import RegularPop from '../../components/RegularPop.vue';


const allWalletData = ref([]);
const loading = ref(false);
const showPop = ref(false)

const currentPage = ref(1);
const itemsPerPage = 10;
const detailData = ref(null);
const showDetail = ref(false)
let deleteId = null

const tableColumns = ref([
  { label: 'Account Name', key: 'label' },
  // { label: 'Wallet Address', key: 'walletAddress' },
  { label: 'Network', key: 'network' },
  { label: 'Remark', key: 'remark' },
  { label: 'Create Time', key: 'createTime' },
  { label: 'Action', key: 'action' },
]);

// 计算总页数
const totalPages = computed(() => {
  return Math.ceil(allWalletData.value.length / itemsPerPage);
});

const handleConfirm = () => {
  console.log('Confirmed!');
  showDetail.value = false;
};

const fetchData = async () => {
  loading.value = true;
  try {
    const result = await apiWallet.getWalletListApi({
      type: 'USER'
    });
    if (result.code === 0) {
      // 获取所有数据并赋值给 allWalletData
      allWalletData.value = result.data || [];
    }
  } catch (error) {
    console.error('Failed to fetch wallet data:', error);
  } finally {
    loading.value = false;
  }
};

const handlePreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const handleNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

// 在移动端，DynamicTable 内部会处理无限加载，
// 所以这个事件处理器现在可以被简化
const handleLoadMore = () => {
  console.log('Load more event triggered, DynamicTable handles it internally.');
};

const handleDetail = (item) => {
  console.log('Detail:', item);
  detailData.value = item;
  showDetail.value = true;
};

const handleDelete =  (item) => {
  deleteId = item.id
  showPop.value = true
};
const handleConfirmD = async () => {
  const result = await apiWallet.getWalletListApi({
    id: deleteId
  });
  if (result.code === 0) {
    showPop.value = false
    window.showAlert("delete Successful")
    fetchData();
  }
};

onMounted(() => {
  fetchData();
});
</script>