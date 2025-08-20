<template>
  <section class="pt-7 px-9 bg-white shadow-[0_4px_20px_0_rgba(0,0,0,0.1)]">
    <div class="text-xl font-bold mb-6">Transaction Order</div>
    <div class="flex items-center gap-[0.625rem]">
      <div v-for="(button, index) in buttons" :key="index" @click="setActive(index)" :class="[
        'flex items-center justify-center overflow-hidden px-4 py-1 relative cursor-pointer rounded-[0.3125rem]',
        { 'bg-[#ff7445]': activeIndex === index, 'bg-white border border-[#7D7A7A]': activeIndex !== index },
      ]">
        <div :class="[
          'text-[0.875rem] font-semibold', { 'text-white' : activeIndex===index, 'text-[#7D7A7A]' : activeIndex !==index
          }, ]">
          {{ button }}
        </div>
      </div>
    </div>
    <DepositOrders />
  </section>
</template>

<script setup>
import { ref } from 'vue';
import DepositOrders from './DepositOrders.vue';

const buttons = ['Deposit Orders', 'Withdraw Orders', 'Buy Order', 'Sell Order'];
const activeIndex = ref(0); // 默认激活第一个按钮

const setActive = (index) => {
  activeIndex.value = index;
};
</script>