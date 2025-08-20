```
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
        :class="isSellingMode ? 'text-white bg-[#FF7545]' : 'text-black bg-white'" @click="toggleMode(true)">
        Sell
      </button>
    </div>
    <div class="w-full bg-[#FF7545] px-[1.25rem] md:px-[2.625rem] py-[1.25rem] md:py-[1.75rem]">
      <form>
        <p class="mb-[1rem] font-[500] text-white text-[1rem] md:text-[1.125rem]">
          {{ isSellingMode ? 'I want to Sell' : 'I want to Buy' }}
        </p>

        <div ref="showFromDropdownRef"
          class="h-[3rem] md:h-[3.75rem] border rounded-[0.75rem] md:rounded-[1.25rem] bg-white flex items-center justify-between px-[1rem] md:px-[1.25rem] mb-[1rem] md:mb-[1.75rem] relative">
          <input type="number" v-model="fromAmount" placeholder="10-1000000"
            class="w-1/2 text-[0.875rem] md:text-base outline-none" @input="calculateExchange" />
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

        <p class="mb-[1rem] font-[500] text-white text-[1rem] md:text-[1.125rem]">I will receive</p>
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
          Expected price：{{ exchangeRate }}
        </div>

        <button type="button"
          class="w-full text-white bg-black rounded-[0.75rem] md:rounded-[1rem] h-[3rem] md:h-[3.75rem] text-[0.875rem] md:text-base"
          @click="showStepOneFunc">
          Confirm
        </button>
      </form>
    </div>
  </div>

  <SellStepOne v-if="showStepOne" @close="showStepOne = false" @confirm="handleStepOneConfirm" />

  <SellStepTwo v-if="showStepTwo" @confirm="handleStepTwoConfirm" />

  <SellStepThree v-if="showStepThree" @confirm="handleStepThreeConfirm" />
  <SellStepFour v-if="showStepFour" @confirm="handleStepFourConfirm" />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import * as apiAuth from '@/api/auth.js'
import SellStepOne from './components/SellStepOne.vue';
import SellStepTwo from './components/SellStepTwo.vue';
import SellStepThree from './components/SellStepThree.vue';
import SellStepFour from './components/SellStepFour.vue';

// 导入所有需要的图标
import UsdIcon from '@/assets/icons/usd.svg';
import AedIcon from '@/assets/icons/AED.svg';
import UsdtIcon from '@/assets/icons/usdt.svg';
import UsdcIcon from '@/assets/icons/usdc.svg';

const isSellingMode = ref(false); // 默认设置为购买模式，以匹配 Buy/Sell 逻辑
const fromAmount = ref('');
const toAmount = ref('');
const fromCurrency = ref(''); // 初始化为空
const toCurrency = ref(''); // 初始化为空
const showFromDropdown = ref(false);
const showToDropdown = ref(false);
const showFromDropdownRef = ref(null);
const showToDropdownRef = ref(null);

// 新增弹窗状态变量
const showStepOne = ref(false);
const showStepTwo = ref(false);
const showStepThree = ref(false);
const showStepFour = ref(false);

// 购买和卖出模式下的可用货币对
const buyCurrencies = {
  from: ['USDT', 'USDC'],
  to: ['USD', 'AED']
};

const sellCurrencies = {
  from: ['USD', 'AED'],
  to: ['USDT', 'USDC']
};

// 汇率数据（示例）
const exchangeRates = {
  'USDT_USD': 0.999,
  'USDC_USD': 0.999,
  'USDT_AED': 3.67, // 假设 1 USDT = 3.67 AED
  'USDC_AED': 3.67, // 假设 1 USDC = 3.67 AED
  'USD_USDT': 1.001,
  'AED_USDT': 0.272, // 假设 1 AED = 0.272 USDT
  'USD_USDC': 1.001,
  'AED_USDC': 0.272, // 假设 1 AED = 0.272 USDC
};

const availableFromCurrencies = computed(() => {
  return isSellingMode.value ? sellCurrencies.from : buyCurrencies.from;
});

const availableToCurrencies = computed(() => {
  if (isSellingMode.value) {
    return sellCurrencies.to.filter(c => c !== fromCurrency.value);
  } else {
    return buyCurrencies.to.filter(c => c !== fromCurrency.value);
  }
});

const exchangeRate = computed(() => {
  const rate = exchangeRates[`${fromCurrency.value}_${toCurrency.value}`] || 1;
  return fromCurrency.value && toCurrency.value ? `1 ${fromCurrency.value} = ${rate.toFixed(3)} ${toCurrency.value}` : 'Expected price';
});

const toggleMode = (isSelling) => {
  isSellingMode.value = isSelling;
  fromAmount.value = '';
  toAmount.value = '';
  showFromDropdown.value = false;
  showToDropdown.value = false;
  updateDefaultCurrencies();
};

const updateDefaultCurrencies = () => {
  if (isSellingMode.value) {
    fromCurrency.value = sellCurrencies.from[0];
    toCurrency.value = sellCurrencies.to[0];
  } else {
    fromCurrency.value = buyCurrencies.from[0];
    toCurrency.value = buyCurrencies.to[0];
  }
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
  const newToCurrencies = isSellingMode.value ? sellCurrencies.to : buyCurrencies.to;
  // 确保To货币不和From货币相同
  if (toCurrency.value === currency || !newToCurrencies.includes(toCurrency.value)) {
    toCurrency.value = newToCurrencies.find(c => c !== currency);
  }
  calculateExchange();
};

const selectToCurrency = (currency) => {
  toCurrency.value = currency;
  showToDropdown.value = false;
  calculateExchange();
};

// 修改后的图标获取方法
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
      return UsdIcon; // 默认返回USD图标
  }
};

const calculateExchange = () => {
  if (!fromAmount.value || isNaN(parseFloat(fromAmount.value))) {
    toAmount.value = '';
    return;
  }
  const rateKey = `${fromCurrency.value}_${toCurrency.value}`;
  const rate = exchangeRates[rateKey] || 1;
  toAmount.value = (parseFloat(fromAmount.value) * rate).toFixed(2);
};

// 新增弹窗处理方法
const handleStepOneConfirm = () => {
  showStepOne.value = false;
  showStepTwo.value = true;
};

const handleStepTwoConfirm = () => {
  showStepTwo.value = false;
  showStepThree.value = true;
};

const handleStepThreeConfirm = () => {
  showStepThree.value = false;
  showStepFour.value = true;
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
```