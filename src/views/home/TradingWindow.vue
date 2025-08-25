<template>
  <div class="w-full md:w-[30.25rem] shadow-[0_4px_20px_0px_rgba(0,0,0,0.1)]">
    <div class="flex">
      <button
        class="relative font-[700] w-1/2 md:w-[15.125rem] h-[3.75rem] md:h-[5rem] rounded-t-[1.25rem] text-[1.25rem] md:text-[1.75rem]"
        :class="isSellingMode ? 'text-black bg-white' : 'text-white bg-[#FF7545]'" @click="toggleMode(false)">
        Buy
      </button>
      <button
        class="relative font-[700] w-1/2 md:w-[15.125rem] h-[3.75rem] md:h-[5rem] rounded-t-[1.25rem] text-[1.25rem] md:text-[1.75rem]"
        :class="!isSellingMode ? 'text-black bg-white' : 'text-white bg-[#FF7545]'" @click="toggleMode(true)">
        Sell
      </button>
    </div>
    <div class="w-full bg-[#FF7545] px-[1.25rem] md:px-[2.625rem] py-[1.25rem] md:py-[1.75rem]">
      <form @submit.prevent>
        <p class="mb-[1rem] font-[500] text-white text-[1rem] md:text-[1.125rem]">
          {{ isSellingMode ? 'I want to Sell' : 'I want to Buy' }}
        </p>

        <div ref="showFromDropdownRef"
          class="h-[3rem] md:h-[3.75rem] border rounded-[0.75rem] md:rounded-[1.25rem] bg-white flex items-center justify-between px-[1rem] md:px-[1.25rem] mb-[1rem] md:mb-[1.75rem] relative">
          <input type="number" v-model="fromAmount" placeholder="10-1000000"
            class="w-1/2 text-[0.875rem] md:text-base outline-none" @input="debounceCalculate" />
          <div class="flex items-center cursor-pointer" @click="toggleFromDropdown">
            <img :src="getCurrencyIcon(fromCurrency)" alt="" class="w-[1rem] md:w-[1.25rem] h-[1rem] md:h-[1.25rem]">
            <div class="text-[0.75rem] text-[#A1A1AA] ml-[0.5rem] mr-[0.5rem] md:mr-[1.125rem]">{{ fromCurrency }}</div>
            <img src="@/assets/icons/arrow.svg" alt="" class="w-[0.5rem] md:w-[0.56rem] h-[0.375rem]">
          </div>
          <div v-if="showFromDropdown"
            class="absolute bg-white top-full right-0 py-[0.375rem] shadow-2xl z-50 w-full md:w-auto">
            <div v-for="currency in availableFromCurrencies" :key="currency"
              class="flex items-center hover:bg-[#F4F4F5] text-[#202326] cursor-pointer py-[0.375rem] px-[1rem] md:px-[1.25rem]"
              @click="selectFromCurrency(currency)">
              <img :src="getCurrencyIcon(currency)" alt="" class="w-[1rem] md:w-[1.25rem] h-[1rem] md:h-[1.25rem]">
              <div class="text-[0.75rem] text-[#A1A1AA] ml-[0.5rem] mr-[0.5rem] md:mr-[1.125rem]">{{ currency }}</div>
            </div>
          </div>
        </div>

        <p class="mb-[1rem] font-[500] text-white text-[1rem] md:text-[1.125rem]">{{ isSellingMode ? 'I will receive' :
          'I will pay' }}</p>
        <div ref="showToDropdownRef"
          class="h-[3rem] md:h-[3.75rem] border rounded-[0.75rem] md:rounded-[1.25rem] bg-white flex items-center justify-between px-[1rem] md:px-[1.25rem] mb-[1rem] md:mb-[1.75rem] relative">
          <input type="number" v-model="toAmount" placeholder="10-1000000"
            class="w-1/2 text-[0.875rem] md:text-base outline-none" readonly />
          <div class="flex items-center cursor-pointer" @click="toggleToDropdown">
            <img :src="getCurrencyIcon(toCurrency)" alt="" class="w-[1rem] md:w-[1.25rem] h-[1rem] md:h-[1.25rem]">
            <div class="text-[0.75rem] text-[#A1A1AA] ml-[0.5rem] mr-[0.5rem] md:mr-[1.125rem]">{{ toCurrency }}</div>
            <img src="@/assets/icons/arrow.svg" alt="" class="w-[0.5rem] md:w-[0.56rem] h-[0.375rem]">
          </div>
          <div v-if="showToDropdown"
            class="absolute bg-white top-full right-0 py-[0.375rem] shadow-2xl z-50 w-full md:w-auto">
            <div v-for="currency in availableToCurrencies" :key="currency"
              class="flex items-center hover:bg-[#F4F4F5] text-[#202326] cursor-pointer py-[0.375rem] px-[1rem] md:px-[1.25rem]"
              @click="selectToCurrency(currency)">
              <img :src="getCurrencyIcon(currency)" alt="" class="w-[1rem] md:w-[1.25rem] h-[1rem] md:h-[1.25rem]">
              <div class="text-[0.75rem] text-[#A1A1AA] ml-[0.5rem] mr-[0.5rem] md:mr-[1.125rem]">{{ currency }}</div>
            </div>
          </div>
        </div>

        <div class="mt-[1.5rem] md:mt-[2.8rem] mb-[0.75rem] text-white text-[0.75rem] md:text-[0.8rem] font-[500]">
          Expected price：{{ exchangeRateDisplay }}
        </div>

        <button type="button"
          class="w-full text-white bg-black rounded-[0.75rem] md:rounded-[1rem] h-[3rem] md:h-[3.75rem] text-[0.875rem] md:text-base"
          @click="showStepOneFunc">
          Confirm
        </button>
      </form>
    </div>
  </div>

  <SellStepOne v-if="showStepOne" @close="showStepOne = false" @confirm="handleStepOneConfirm"
    :spend-amount="isSellingMode ? fromAmount : toAmount" :spend-currency="isSellingMode ? fromCurrency : toCurrency"
    :receive-amount="isSellingMode ? toAmount : fromAmount"
    :receive-currency="isSellingMode ? toCurrency : fromCurrency" :exchange-rate="exchangeRate"
    :expire-time="expireTime" />
  <SellStepTwo v-if="showStepTwo" @confirm="handleStepTwoConfirm" />
  <SellStepThree v-if="showStepThree" @confirm="handleStepThreeConfirm" />
  <SellStepFour v-if="showStepFour" @confirm="handleStepFourConfirm"
    :data="[
    {
      // Date: '2025-08-23',
      Type: isSellingMode ? 'Sell' : 'Buy',
      orderId: 'ORDER_123',
      amount: isSellingMode ? fromAmount+fromCurrency : toAmount+toCurrency,
      wantamount: isSellingMode ? toAmount+toCurrency : fromAmount+fromCurrency,
      state: orderState
    }
  ]"
  />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import * as apiAuth from '@/api/auth.js';
import * as apiMarket from '@/api/market.js';
import { useUserStore } from '@/stores/user'
import SellStepOne from './components/SellStepOne.vue';
import SellStepTwo from './components/SellStepTwo.vue';
import SellStepThree from './components/SellStepThree.vue';
import SellStepFour from './components/SellStepFour.vue';

// 导入所有需要的图标
import UsdIcon from '@/assets/icons/usd.svg';
import AedIcon from '@/assets/icons/AED.svg';
import UsdtIcon from '@/assets/icons/usdt.svg';
import UsdcIcon from '@/assets/icons/usdc.svg';

const userStore = useUserStore()

const isSellingMode = ref(false);
const fromAmount = ref('');
const toAmount = ref('');
const fromCurrency = ref('USDT');
const toCurrency = ref('USD');
const exchangeRate = ref(null);
const showFromDropdown = ref(false);
const showToDropdown = ref(false);
const showFromDropdownRef = ref(null);
const showToDropdownRef = ref(null);
const expireTime = ref(null);

const showStepOne = ref(false);
const showStepTwo = ref(false);
const showStepThree = ref(false);
const showStepFour = ref(false);
const orderState = ref(null)

const fiatCurrencies = ['USD', 'AED'];
const cryptoCurrencies = ['USDT', 'USDC'];

// 无论买入还是卖出，from都是虚拟货币，to都是法币
const availableFromCurrencies = computed(() => {
  return cryptoCurrencies;
});

const availableToCurrencies = computed(() => {
  return fiatCurrencies;
});

const exchangeRateDisplay = computed(() => {
  if (exchangeRate.value && fromCurrency.value && toCurrency.value) {
    return `1 ${fromCurrency.value} = ${exchangeRate.value.toFixed(3)} ${toCurrency.value}`;
  }
  return 'Expected price';
});

const toggleMode = (isSelling) => {
  isSellingMode.value = isSelling;
  fromAmount.value = '';
  toAmount.value = '';
  showFromDropdown.value = false;
  showToDropdown.value = false;
  exchangeRate.value = null;
  updateDefaultCurrencies();
};

const updateDefaultCurrencies = () => {
  // 无论买入还是卖出，都将from设置为第一个虚拟币，to设置为第一个法币
  fromCurrency.value = cryptoCurrencies[0];
  toCurrency.value = fiatCurrencies[0];
  calculateExchange();
};

const toggleFromDropdown = () => {
  showFromDropdown.value = !showFromDropdown.value;
  showToDropdown.value = false;
};

const toggleToDropdown = () => {
  showToDropdown.value = !showToDropdown.value;
  showFromDropdown.value = false;
};

const selectFromCurrency = (currency) => {
  fromCurrency.value = currency;
  showFromDropdown.value = false;
  calculateExchange();
};

const selectToCurrency = (currency) => {
  toCurrency.value = currency;
  showToDropdown.value = false;
  calculateExchange();
};

const getCurrencyIcon = (currency) => {
  switch (currency.toLowerCase()) {
    case 'usd':
      return UsdIcon;
    case 'aed':
      return AedIcon;
    case 'usdt':
      return UsdtIcon;
    case 'usdc':
      return UsdcIcon;
    default:
      return UsdIcon;
  }
};

let debounceTimer = null;
const debounceCalculate = () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    calculateExchange();
  }, 500); // 500ms debounce
};

const calculateExchange = async () => {
  const apiAmount = fromAmount.value ? parseFloat(fromAmount.value) : 1;

  if (isNaN(parseFloat(fromAmount.value)) && fromAmount.value !== null && fromAmount.value !== '') {
    toAmount.value = '';
    exchangeRate.value = null;
    return;
  }

  const crypto = fromCurrency.value;
  const fiat = toCurrency.value;

  try {
    let response;
    if (isSellingMode.value) {
      // 卖出模式：from是虚拟币，to是法币，数量是虚拟币
      response = await apiMarket.quotesSellApi({ cryptoCurrency: crypto, amount: apiAmount, fiatCurrency: fiat });
      if (response.code === 0 && response.data) {
        exchangeRate.value = response.data.exchangeRate;
        expireTime.value = response.data.expireTime;
        if (fromAmount.value) {
          // 根据虚拟币数量计算应收的法币
          toAmount.value = (parseFloat(fromAmount.value) * exchangeRate.value).toFixed(2);
        } else {
          toAmount.value = '';
        }
      }
    } else {
      // 买入模式：from是虚拟币，to是法币，数量是虚拟币
      // 接口需要的是法币数量来计算虚拟币数量，所以我们需要反向计算
      response = await apiMarket.quotesBuyApi({ cryptoCurrency: crypto, amount: apiAmount, fiatCurrency: fiat });
      if (response.code === 0 && response.data) {
        // buy 接口的 exchangeRate 是 1 法币 = x 虚拟币
        exchangeRate.value = response.data.exchangeRate;
        expireTime.value = response.data.expireTime;
        if (fromAmount.value) {
          // 根据虚拟币数量反向计算需要支付的法币
          toAmount.value = (parseFloat(fromAmount.value) / exchangeRate.value).toFixed(2);
        } else {
          toAmount.value = '';
        }
      }
    }

    // 统一处理错误情况
    if (response.code !== 0 || !response.data) {
      toAmount.value = '';
      exchangeRate.value = null;
      console.error(response.msg || 'Failed to get exchange rate.');
    }
  } catch (error) {
    toAmount.value = '';
    exchangeRate.value = null;
    console.error('API call failed:', error);
  }
};

const showStepOneFunc = () => {
  if (!fromAmount.value || !toAmount.value) {
    window.showAlert('Please enter a valid amount.');
    return;
  }
  showStepOne.value = true;
};

const handleStepOneConfirm = () => {
  showStepOne.value = false;
  showStepTwo.value = true;
};

const handleStepTwoConfirm = async () => {
  showStepTwo.value = false;
  showStepThree.value = true;
};

const handleStepThreeConfirm = async (code) => {
  let apiSend = apiMarket.orderSellApi
  let params = {
    'cryptoCurrency': fromCurrency.value,
    'amount': isSellingMode.value ? fromAmount.value : toAmount.value,
    'wantAmount': isSellingMode.value ? toAmount.value : fromAmount.value,
    'fiatCurrency': toCurrency.value,
    'cryptoAccountId': 1,
    'fiatAccountId': 1,
    'mailVerifyCode': code,
  }

  if (!isSellingMode.value) {
    apiSend = apiMarket.orderBuyApi
  }
  try {
    const result = await apiSend(params);
    console.log(result);
    
    if (result.code == 0) {
      orderState.value = result.data.statusName
      showStepThree.value = false;
      showStepFour.value = true;
    }
  } catch (error) {
    console.log(error);
    
    window.showAlert("Failed. Please try again.", error);
  }
};

const handleStepFourConfirm = () => {
  showStepFour.value = false;
};

onMounted(() => {
  updateDefaultCurrencies();
  document.addEventListener('click', (e) => {
    if (showFromDropdownRef.value && !showFromDropdownRef.value.contains(e.target)) {
      showFromDropdown.value = false;
    }
    if (showToDropdownRef.value && !showToDropdownRef.value.contains(e.target)) {
      showToDropdown.value = false;
    }
  });
});
</script>