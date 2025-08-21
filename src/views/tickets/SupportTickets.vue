<template>
  <section class="mt-9 md:ml-16 md:mr-8 mx-4 md:px-16 px-3 bg-white">
    <div class="py-8 flex gap-x-8 items-center w-full">
      <img src="../../assets//icons/dashboard/arrow-left.svg" class="w-8" />
      <span class=" font-bold text-2xl">Deposit</span>
      <div
        class="ml-auto bg-[#FF7545] px-6 rounded-[2.5rem] h-[2.75rem] md:h-[3.5rem] flex items-center justify-center cursor-pointer" @click="gotoCreateTicket">
        <div class="text-white font-lato text-base font-semibold leading-[3.875rem]">Submit a ticket</div>
      </div>
    </div>
    <div class="text-xl font-semibold my-4">Audit History</div>
    <div>
      <DynamicTable :columns="tableColumns" :data="orderHistory">

        <template #state="{ item }">
          <span class="px-3 py-1 rounded-full text-xs font-medium"
            :class="item.state === 'Completed' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'">
            {{ item.state }}
          </span>
        </template>
        <template #image="{ item }">
          <div class="flex justify-end">
            <img :src="item.image" alt="User Avatar" class="md:w-10 md:h-10 w-6 rounded-full mx-auto object-cover" />
          </div>
    </template>
      </DynamicTable>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import DynamicTable from '../../components/DynamicTable.vue';


const router = useRouter()
const orderHistory = ref(
  Array.from({ length: 50 }, (_, i) => ({
    date: `2024-01-${(i % 30) + 1}`,
    type: i % 2 === 0 ? 'Buy' : 'Sell',
    total: `$${(1250 + i * 10).toFixed(2)}`,
    image: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
    price: `$${(25000 + i * 100).toFixed(2)}`,
    state: i % 3 === 0 ? 'Completed' : i % 3 === 1 ? 'Pending' : 'Failed',
  }))
);

const tableColumns = ref([
  { label: 'Submit time', key: 'date' },
  { label: 'Order', key: 'total' },
  { label: 'Upload the relevant credentials', key: 'image' },
  { label: 'state', key: 'state' },
]);
const gotoCreateTicket  = () => {
  router.push('/usercenter/addticket')
}

</script>