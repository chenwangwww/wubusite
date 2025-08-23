<template>
  <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 z-50">
    <div class="bg-white rounded-[1.25rem] flex flex-col items-center relative px-3 md:px-12 py-6 mx-2">
      <div class="flex flex-col items-center gap-[1.0625rem] w-full">
        <div class="w-[4.375rem] h-[3.6875rem] relative">
          <img class="absolute top-0 left-0 w-[4.375rem] h-[3.625rem]" src="@/assets/icons/trade/bank.svg"
            alt="Vector" />
        </div>
        <p class="text-black font-lato text-xl font-bold text-center w-full">Are you sure you want to trade?</p>
      </div>

      <div class="flex flex-col gap-[1.5rem] w-full mt-[2.125rem]">
        <div class="flex flex-col gap-[0.5rem] w-full">
          <div class="flex justify-around w-full">
            <div class="text-[#7a7a7a]  text-lg font-medium leading-[3.875rem]">Spend</div>
            <div class="text-[#7a7a7a]  text-lg font-medium leading-[3.875rem]">Receive</div>
          </div>
          <div
            class="bg-[#fff4ec] rounded-[1.25rem] h-[4.25rem] w-full relative flex items-center justify-between px-4">
            <p class="text-black  text-xl font-medium">
              <span class="tracking-[-0.06px]">{{ spendAmount }}</span>
              <span class="text-xs tracking-[-0.03px]">{{ spendCurrency }}</span>
            </p>
            <div class="w-[3.125rem] h-[3.125rem] flex items-center justify-center">
              <img class="w-[1.625rem] h-[1.5625rem]" src="@/assets/icons/trade/exchangeBlack.svg" alt="Vector" />
            </div>
            <p class="text-black  text-xl font-medium">
              <span class="tracking-[-0.06px]">{{ receiveAmount }}</span>
              <span class="text-xs tracking-[-0.03px]">{{ receiveCurrency }}</span>
            </p>
          </div>
        </div>

        <div class="md:flex block md:justify-between md:items-center md:gap-x-12 w-full">
          <div class="flex items-center gap-x-1">
            <p class="text-[#5e5e5e] font-medium text-center">
              Exchange Rate: 1 {{ spendCurrency }}</p>
            <img class="w-4 h-4" src="@/assets/icons/trade/exchangePink.svg" alt="Vector" />
            <p class="text-[#5e5e5e] font-medium text-center">
              {{ exchangeRate }} {{ receiveCurrency }}</p>
          </div>
          <div class="text-[#00ac42]  text-sm font-medium">
            Valid Until {{ expireTime }}</div>
        </div>
      </div>

      <div class="flex gap-[2.5rem] w-full mt-10">
        <div @click="$emit('close')"
          class="flex-1 border border-black rounded-[2.5rem] h-[2.75rem] flex items-center justify-center cursor-pointer">
          <div class="text-black font-lato text-base font-semibold leading-[3.875rem] whitespace-nowrap">Cancel</div>
        </div>
        <div @click="$emit('confirm')"
          class="flex-1 bg-[#ff7445] rounded-[2.5rem] h-[2.75rem] flex items-center justify-center cursor-pointer">
          <div class="text-white font-lato text-base font-semibold leading-[3.875rem] whitespace-nowrap">Confirm</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  spendAmount: {
    type: [Number, String],
    required: true
  },
  spendCurrency: {
    type: String,
    required: true
  },
  receiveAmount: {
    type: [Number, String],
    required: true
  },
  receiveCurrency: {
    type: String,
    required: true
  },
  exchangeRate: {
    type: [Number, String],
    required: true
  },
  expireTime: {
    type: String,
    required: true
  }
});

defineEmits(['close', 'confirm']);
</script>