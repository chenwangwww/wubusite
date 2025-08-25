<template>
  <section class="mt-9 md:ml-16 md:mr-8 mx-4 md:px-16 px-3 bg-white">
    <div class="py-8 flex gap-x-8 items-center w-full">
      <img src="../../assets//icons/dashboard/arrow-left.svg" class="w-8" />
      <span class=" font-bold text-2xl">Withdraw</span>
    </div>
    <div class="flex justify-between items-center w-full mb-3">
      <div class="text-xl font-bold">Payee Information</div>
      <div class="bg-[#FF7545] text-xl font-semibold px-4 text-white md:py-4 py-2 text-center rounded-lg">
        <router-link to="/usercenter/bankaccount">Confirm Recipient</router-link>
      </div>
    </div>

    <div>
      <SelectInput @update:modelValue="handleAccountSelected" :options="accountOptions" selectId="receivingAccount-selector" label="Select the receiving account"
        placeholder="please select receiving account" v-model="receivingAccount" />
    </div>
    <div>
      <div class="text-xl font-bold my-4">Bank Information</div>
      <div class="bg-[#F8F8F8] border-[#8D8D8D] px-3 py-4">
        <div>
          <h3 class="text-lg text-[#8D8D8D] font-semibold mb-2">Account name</h3>
          <p class="text-xl font-semibold text-black mb-2" v-if="selectAccount">{{ selectAccount.label }}</p>
          <hr />
        </div>
        <div class="mt-3">
          <h3 class="text-lg text-[#8D8D8D] font-semibold mb-2">account number</h3>
          <div class="flex justify-between items-center mb-2">
            <p class="text-xl font-semibold text-black" v-if="selectAccount">{{ selectAccount.bankAccount }}</p>
          </div>
          <hr />
        </div>
        <div class="mt-3">
          <h3 class="text-lg text-[#8D8D8D] font-semibold mb-2">IBAN</h3>
          <div class="flex justify-between items-center mb-2">
            <p class="text-xl font-semibold text-black" v-if="selectAccount">{{ selectAccount.iban }}</p>
          </div>
          <hr />
        </div>
        <div class="mt-3">
          <h3 class="text-lg text-[#8D8D8D] font-semibold mb-2">swift code</h3>
          <div class="flex justify-between items-center mb-2">
            <p class="text-xl font-semibold text-black" v-if="selectAccount">{{ selectAccount.swiftCode }}</p>
          </div>
          <hr />
        </div>
        <div class="mt-3">
          <h3 class="text-lg text-[#8D8D8D] font-semibold mb-2">bank name</h3>
          <p class="text-xl font-semibold text-black mb-2" v-if="selectAccount">{{ selectAccount.bankName }}</p>
          <hr />
        </div>
        <div class="mt-3">
          <h3 class="text-lg text-[#8D8D8D] font-semibold mb-2">bank address</h3>
          <p class="text-xl font-semibold text-black mb-2" v-if="selectAccount">{{ selectAccount.bankAddress }}</p>
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
          class="text-[#00BD32]">20,000.00</span> USD</div>
      <div class="text-[#FF7545] font-semibold text-base">The processing time depends on the bank and is expected to
        take
        1–3 business days.</div>
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
import { useRouter } from 'vue-router';
import UnitInput from '../../components/UnitInput.vue';
import * as apiFunding from '@/api/funding.js';
import * as apiBankAccount from '@/api/bankaccount'


const receivingAccount = ref(null)
const selectAccount = ref(null)
const amount = ref(null)
const selectedCurrency = ref(null)
const accountOptions = ref([])
const accounts = ref([])

const handleAccountSelected = (id) => {
  selectAccount.value = accounts.value.filter((item) => item.id == id)[0]
  selectedCurrency.value = selectAccount.value.fiatType
}

const router = useRouter()

const gotosubmit = async() => {
  const result =  await apiFunding.withdrawActionApi({
    amount: amount.value,
    currency: selectedCurrency.value,
    currencyType: 1,
    userAccountId: selectAccount.value.id
  })
  if (result.code == 0) {
    router.push('/usercenter/withdrawcurrencysuccess')
  }
}

const fetchData = async () => {
  try {
    const result = await apiBankAccount.getAccountListApi();
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

onMounted(()=>{
fetchData()
})
</script>