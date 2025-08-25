<template>
  <section class="mt-9 md:ml-16 md:mr-8 mx-4 md:px-16 px-3 bg-white">
    <div class="py-8 flex gap-x-8 items-center w-full">
      <img src="../../assets//icons/dashboard/arrow-left.svg" class="w-8" />
      <span class=" font-bold text-2xl">Withdraw</span>
    </div>
    <div class="flex justify-between items-center w-full mb-3">
      <div class="text-xl font-bold">Payee Information</div>
      <div class="bg-[#FF7545] text-xl font-semibold px-4 text-white md:py-4 py-2 text-center rounded-lg">
        <router-link to="/usercenter/wallet">create a New Payee</router-link>
      </div>
    </div>

    <div>
      <SelectInput :options="accountOptions" selectId="receivingAccount-selector" label="Select a recipient"
        placeholder="please select" v-model="receivingAccount" @update:modelValue="handleAccountSelected" />
    </div>
    <div>
      <div class="text-xl font-bold my-4">Wallet Information</div>
      <div class="bg-[#F8F8F8] border-[#8D8D8D] px-3 py-4">
        <div>
          <h3 class="text-lg text-[#8D8D8D] font-semibold mb-2">Account name</h3>
          <p class="text-xl font-semibold text-black mb-2" v-if="selectAccount">{{ selectAccount.label }}</p>
          <hr />
        </div>
        <div class="mt-3">
          <h3 class="text-lg text-[#8D8D8D] font-semibold mb-2">wallet address</h3>
          <div class="flex justify-between items-center mb-2">
            <p class="text-xl font-semibold text-black" v-if="selectAccount">{{ selectAccount.walletAddress }}</p>
          </div>
          <hr />
        </div>
        <div class="mt-3">
          <h3 class="text-lg text-[#8D8D8D] font-semibold mb-2">Network</h3>
          <div class="flex justify-between items-center mb-2">
            <p class="text-xl font-semibold text-black" v-if="selectAccount">{{ selectAccount.network }}</p>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="text-xl font-bold mt-6 mb-2">Withdrawal Information</div>
      <TextInput inputId="amount-withdraw" label="*withdraw amount" placeholder="Enter withdraw amount"
        v-model="amount">
        <template #suffix v-if="selectedCurrency">
          <span style="font-size: 14px;">{{ selectedCurrency }}</span>
        </template>
      </TextInput>
    </div>
    <div class="my-3">
      <div class="font-semibold text-base">Amount Currently Available for Withdrawal: <span
          class="text-[#00BD32]">20,000.00</span> USDT</div>
      take
      1–3 business days.
    </div>
    <div class="w-full flex justify-center my-3">
      <div @click="gotosubmit"
        class="w-1/2 bg-black rounded-[2.5rem] h-[2.75rem] flex items-center justify-center cursor-pointer">
        <div class="text-white font-lato text-base font-semibold leading-[3.875rem] whitespace-nowrap">Submit</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import SelectInput from '../../components/SelectInput.vue';
import TextInput from '../../components/TextInput.vue';
import UnitInput from '../../components/UnitInput.vue';
import { useRouter } from 'vue-router';
import * as apiWallet from '@/api/cryptoWallet.js';
import * as apiFunding from '@/api/funding.js';

const receivingAccount = ref(null)
const amount = ref(null)
const selectedCurrency = ref(null)
const accountOptions = ref([])
const accounts = ref([])
const router = useRouter()
const selectAccount = ref(null)

const gotosubmit = async() => {
  const result =  await apiFunding.withdrawActionApi({
    amount: amount.value,
    currency: selectedCurrency.value,
    currencyType: 2,
    userAccountId: selectAccount.value.id
  })
  if (result.code == 0) {
    router.push('/usercenter/withdrawcurrencysuccess')
  }
}

const handleAccountSelected = (id) => {
  selectAccount.value = accounts.value.filter((item) => item.id == id)[0]
  selectedCurrency.value = selectAccount.value.symbol
}

const fetchData = async () => {
  try {
    const result = await apiWallet.getWalletListApi({
      type: 'USER'
    });
    if (result.code === 0) {
      // 获取所有数据并赋值给 allWalletData
      accounts.value = result.data || [];
      for (let index = 0; index < accounts.value.length; index++) {
        const element = accounts.value[index];
        accountOptions.value.push({
          value: element.id + '',
          text: element.label
        })
      }
    }
  } catch (error) {
    console.error('Failed to fetch wallet data:', error);
  }
};

onMounted(() => {
  fetchData()
})
</script>