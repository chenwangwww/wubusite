<template>
  <section class="mt-9 md:ml-16 md:mr-8 mx-4 md:px-16 px-3 bg-white">
    <div class="py-8 flex gap-x-8 items-center w-full">
      <img src="../../assets//icons/dashboard/arrow-left.svg" class="w-8" />
      <span class=" font-bold text-2xl">Deposit</span>
      <div
        class="ml-auto bg-[#FF7545] px-6 rounded-[2.5rem] h-[2.75rem] md:h-[3.5rem] flex items-center justify-center cursor-pointer"
        @click="gotoCreateTicket">
        <div class="text-white font-lato text-base font-semibold leading-[3.875rem]">Submit a ticket</div>
      </div>
    </div>
    <div class="text-xl font-semibold my-4">Audit History</div>
    <div>
      <DynamicTable :columns="tableColumns" :data="tableData" :currentPage="currentPage" :totalPages="totalPages"
        :loading="loading" @previous="handlePreviousPage" @next="handleNextPage" @load-more="handleLoadMore">
        <template #credential="{ item }">
          <div class="flex justify-end">
            <img :src="item.credential" alt="User Avatar"
              class="md:w-10 md:h-10 w-6 rounded-full mx-auto object-cover" />
          </div>
        </template>
      </DynamicTable>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import DynamicTable from '../../components/DynamicTable.vue';
import * as apiTicket from '@/api/ticket.js'

const router = useRouter()
const orderHistory = ref([]);

const tableData = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const loading = ref(false);
const itemsPerPage = 10; // 每页显示的条数

const tableColumns = ref([
  { label: 'id', key: 'id' },
  { label: 'subject', key: 'subject' },
  { label: 'orderType', key: 'orderType' },
  { label: 'credentials', key: 'credential' },
  { label: 'createTime', key: 'createTime' },
]);

const fetchData = async () => {
  loading.value = true;
  try {
    const result = await apiTicket.ticketListApi({
      pageNo: currentPage.value,
      pageSize: itemsPerPage,
    });
    if (result.code === 0) {
      tableData.value = result.data.list;
      totalPages.value = Math.ceil(Number(result.data.total) / itemsPerPage);
    }
  } catch (error) {
    console.error('Failed to fetch data:', error);
  } finally {
    loading.value = false;
  }
};

// 事件处理方法
const handlePreviousPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
        fetchData();
    }
};

const handleNextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
        fetchData();
    }
};

const handleLoadMore = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchData();
  }
};

const gotoCreateTicket = () => {
  router.push('/usercenter/addticket')
}

onMounted(()=>{
  fetchData()
})

</script>