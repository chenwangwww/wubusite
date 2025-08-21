<template>
  <section class="mt-9 md:ml-16 md:mr-8 mx-4 md:px-12 px-4 bg-white">
    <div class="py-8 flex gap-x-8 items-center">
      <span class=" font-bold text-2xl">Orders</span>
    </div>
    <div>
      <div class="grid grid-cols-2 gap-4">
        <DatePicker inputId="event-date" label="Day from" placeholder="please select" v-model="beginDate" />
        <DatePicker inputId="event-date" label="Day To" placeholder="please select" v-model="endDate" />
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 items-end my-6">

        <SelectInput :options="orderStatusOptions" selectId="orderstatus-selector" label="Status"
          placeholder="please select" v-model="selectedStatus" />
        <TextInput inputId="amountid" label="Amount" placeholder="please input" v-model="amount" />

        <div class="flex justify-center items-center">
          <div class="bg-black w-full text-white md:text-xl text-base font-semibold flex justify-center items-center py-3 gap-x-5 px-9 rounded-lg">
            <img src="../../assets//icons//dashboard/search.svg" class="md:w-10 w-6" />
            <span>Search</span>
          </div>
        </div>
      </div>
    </div>
    <BottomOrders />
  </section>
</template>

<script setup>
import DatePicker from '../../components/DatePicker.vue';
import SelectInput from '../../components/SelectInput.vue';
import TextInput from '../../components/TextInput.vue';
import BottomOrders from '../user/components/BottomOrders.vue';
import { ref } from 'vue';

const beginDate = ref(''); // 用于存储选中的日期，格式为 YYYY-MM-DD
const endDate = ref('')
const amount = ref(null)

const selectedStatus = ref(null)
const orderStatusOptions = ref([
  { value: '1', text: 'All' },
  { value: '2', text: 'Completed' },
  { value: '3', text: 'Processing' },
  { value: '4', text: 'Pending' },
  { value: '5', text: 'Awaiting Confirmation(s)' },
  { value: '6', text: 'Canceled' },
  { value: '7', text: 'Expired' },
]);
</script>