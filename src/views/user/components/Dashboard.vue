<template>
  <div class="pl-8 pr-7 pt-9 w-full">
    <div
      class="bg-white rounded-xl shadow-[0_4px_20px_0_rgba(0,0,0,0.1)] w-full px-9 py-6 flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center gap-y-4">
      <div>
        <div class="font-semibold text-xl">Fiat account</div>
        <div class="font-bold text-3xl flex items-center gap-x-4 relative">
          <div>
            0.00
            <span class="text-xl">{{ selectedFiatCurrency }}</span>
          </div>
          <img class="w-6" src="../../../assets/icons/dashboard/arrowDown.svg" @click.stop="showmoreFiat" />
          <div v-show="showMoreFiat" v-click-outside="HideMoreFiat"
            class="absolute top-full right-0 bg-white shadow-[0_4px_20px_0_rgba(0,0,0,0.1)] text-sm px-4 py-2 z-10">
            <div @click="selectFiatCurrency('USD')">USD</div>
            <div class="mt-3" @click="selectFiatCurrency('AED')">AED</div>
          </div>
        </div>
      </div>
      <div>
        <button class="bg-[#FF7545] md:px-9 px-6 py-2 rounded-3xl md:mr-6 mr-3"><RouterLink to="/usercenter/bankaccount">Deposit</RouterLink></button>
        <button class="bg-black md:px-9 px-6 py-2 rounded-3xl text-white"><RouterLink to="/usercenter/withdrawcurrency">Withdraw</RouterLink></button>
      </div>
    </div>

    <div
      class="my-5 bg-white rounded-xl shadow-[0_4px_20px_0_rgba(0,0,0,0.1)] w-full px-9 py-6 flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center gap-y-4">
      <div>
        <div class="font-semibold text-xl">crypto currency</div>
        <div class="font-bold text-3xl flex items-center gap-x-4 relative">
          <div>
            0.00
            <span class="text-xl">{{ selectedCryptoCurrency }}</span>
          </div>
          <img class="w-6" src="../../../assets/icons/dashboard/arrowDown.svg" @click.stop="showmore" />
          <div v-show="showMoreCrypto" v-click-outside="HideMoreCrypto"
            class="absolute top-full right-0 bg-white shadow-[0_4px_20px_0_rgba(0,0,0,0.1)] text-sm px-4 py-2">
            <div @click="selectCryptoCurrency('USDT')">USDT</div>
            <div class="mt-3" @click="selectCryptoCurrency('USDC')">USDC</div>
          </div>
        </div>
      </div>
      <div>
        <button class="bg-[#FF7545] md:px-9 px-6 py-2 rounded-3xl md:mr-6 mr-3"><RouterLink to="/usercenter/cryptodeposit">Deposit</RouterLink></button>
        <button class="bg-black md:px-9 px-6 py-2 rounded-3xl text-white"><RouterLink to="/usercenter/withdrawcrypto">Withdraw</RouterLink></button>
      </div>
    </div>

    <div
      class="mb-5 bg-[#ff7445] rounded-xl shadow-[0_4px_20px_0_rgba(0,0,0,0.1)] w-full sm:px-9 px-4 py-6 flex justify-between items-center">
      <div class="text-white md:text-3xl text-2xl font-extrabold">
        Trade
      </div>
      <div
        class="flex items-center bg-white rounded-[2.5rem] gap-[0.625rem] h-[3.125rem] justify-center px-[0.75rem] py-0  w-[12.5rem]">
        <div class="text-[#ff7445] md:text-xl text-lg font-extrabold text-center whitespace-nowrap w-[4.75rem]">
          Order
        </div>
        <img class="h-[1rem] w-[1.5625rem]" alt="" :src="arrowRight" />
      </div>
    </div>
  </div>

  <BottomOrders />
</template>

<script setup>
import BottomOrders from './BottomOrders.vue';
import arrowRight from '../../../assets/icons/dashboard/arrowLeft.svg'
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const showMoreCrypto = ref(false)
const showMoreFiat = ref(false)
const selectedFiatCurrency = ref('USD')
const selectedCryptoCurrency = ref('USDT')

const router = useRouter()

const HideMoreCrypto = () => {
  showMoreCrypto.value = false;
};

const showmore = () => {
  showMoreCrypto.value = true;
};

const HideMoreFiat = () => {
  showMoreFiat.value = false;
};

const showmoreFiat = () => {
  showMoreFiat.value = true;
};

const selectFiatCurrency = (currency) => {
  selectedFiatCurrency.value = currency;
  HideMoreFiat();
};

const selectCryptoCurrency = (currency) => {
  selectedCryptoCurrency.value = currency;
  HideMoreCrypto();
};
</script>