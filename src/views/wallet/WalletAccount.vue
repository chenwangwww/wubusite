<template>
  <section class="mt-9 md:ml-16 md:mr-8 mx-4 px-16 bg-white">
    <div class="py-8 flex gap-x-8 items-center">
      <img src="../../assets//icons/dashboard/arrow-left.svg" class="w-8" />
      <span class=" font-bold text-2xl">Deposit</span>
    </div>
    <div class="w-full mb-8 flex justify-center items-center">
      <div class="bg-[#FF7545] text-xl font-semibold w-[42rem] text-white py-4 text-center rounded-lg">
        <router-link to="/usercenter/walletadd">Add new Wallet</router-link>
      </div>
    </div>
    <div class="text-xl font-semibold my-4">Bank Account</div>
    <div>
      <DynamicTable :columns="tableColumns" :data="orderHistory">
        <template #action="{ item }">
          <div class="flex gap-x-3 justify-end">
            <button class="text-white bg-[#0ECB81] rounded-lg py-2 px-4 text-xs font-medium"
              @click="handleEdit(item)">
              Edit
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
</template>

<script setup>
import { ref } from 'vue';
import DynamicTable from '../../components/DynamicTable.vue';

const orderHistory = ref(
  Array.from({ length: 50 }, (_, i) => ({
    date: `2024-01-${(i % 30) + 1}`,
    type: i % 2 === 0 ? 'Buy' : 'Sell',
    total: `$${(1250 + i * 10).toFixed(2)}`,
    quantity: `${(0.5 + i * 0.01).toFixed(2)} BTC`,
    price: `$${(25000 + i * 100).toFixed(2)}`,
    state: i % 3 === 0 ? 'Completed' : i % 3 === 1 ? 'Pending' : 'Failed',
  }))
);

const tableColumns = ref([
  { label: ' Account Name', key: 'total' },
  { label: 'Wallet Address', key: 'quantity' },
  { label: 'Network', key: 'price' },
  { label: 'Action', key: 'action' },
]);

const handleEdit = (item) => {
  console.log('Edit:', item);
};

const handleDelete = (item) => {
  console.log('Delete:', item);
};
</script>