<template>
  <section class="mt-9 md:ml-16 md:mr-8 mx-4 md:px-16 px-3 bg-white">
    <div class="py-8 flex gap-x-8 items-center">
      <img src="../../assets//icons/dashboard/arrow-left.svg" class="w-8" />
      <span class=" font-bold text-2xl">Deposit</span>
    </div>
    <div class="w-full mb-8 flex justify-center items-center">
      <div class="bg-[#FF7545] text-xl font-semibold w-[42rem] text-white py-4 text-center rounded-lg">
        <router-link to="/usercenter/addbankaccount">Confirm Recipient</router-link>
      </div>
    </div>
    <div class="text-xl font-semibold my-4">Bank Account</div>
    <div>
      <DynamicTable
        :showPages="false"
        :columns="tableColumns"
        :data="orderHistory"
        :loading="loading"
        :currentPage="currentPage"
        :totalPages="totalPages"
        @previous="handlePreviousPage"
        @next="handleNextPage"
        @load-more="handleLoadMore"
      >
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

        <template #state="{ item }">
          <span class="px-3 py-1 rounded-full text-xs font-medium"
            :class="item.state === 'Completed' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'">
            {{ item.state }}
          </span>
        </template>
      </DynamicTable>
    </div>
  </section>
  <DetailPop :data="detailData" @confirm="handleConfirm" v-if="showDetail" />
  <RegularPop v-if="showPop" title="Bank Account" body-text="Are You sure you want to delete your Bank Account?" confirm-text="Yes"
    :showCancelButton="true" cancelText="No" @confirm="handleConfirmD" @cancel="showPop=false">
  </RegularPop>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import DynamicTable from '../../components/DynamicTable.vue';
import * as apiBankAccount from '@/api/bankaccount'
import DetailPop from '../user/components/DetailPop.vue';
import RegularPop from '../../components/RegularPop.vue';

const orderHistory = ref([]);
const loading = ref(false);
const currentPage = ref(1);
const totalPages = ref(1);
const itemsPerPage = 10;
const detailData = ref(null);
const showDetail = ref(false)
const showPop = ref(false)
let deleteId = null


const tableColumns = ref([
  { label: 'Bank Name', key: 'bankName' },
  { label: 'bank Account', key: 'bankAccount' },
  { label: 'IBAN/Account', key: 'iban' },
  { label: 'Account Name', key: 'label' },
  { label: 'Created On', key: 'createTime' },
  { label: 'Action', key: 'action' },
]);

const handleDetail = (item) => {
  console.log('Edit:', item);
  detailData.value = item;
  showDetail.value = true;
};

const handleConfirm = () => {
  console.log('Confirmed!');
  showDetail.value = false;
};

const handleConfirmD = async () => {
  const result = await apiBankAccount.deleteAccountApi({
    id: deleteId
  });
  if (result.code === 0) {
    showPop.value = false
    window.showAlert("delete Successful")
    fetchData();
  }
};

const handleDelete = (item) => {
  deleteId = item.id
  showPop.value = true
};

const fetchData = async () => {
  loading.value = true;
  try {
    const result = await apiBankAccount.getAccountListApi();
    if (result.code === 0) {
      orderHistory.value = result.data || [];
      totalPages.value = Math.ceil(orderHistory.value.length / itemsPerPage);
    }
  } catch (error) {
    console.error('Failed to fetch bank account data:', error);
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

const handleLoadMore = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

onMounted(() => {
  fetchData();
});
</script>