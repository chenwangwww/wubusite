<template>
  <section class="mt-9 md:ml-16 md:mr-8 mx-4 md:px-16 px-3 bg-white">
    <div class="py-8 flex gap-x-8 items-center">
      <img src="../../assets//icons/dashboard/arrow-left.svg" class="w-8" />
      <span class=" font-bold text-2xl">Deposit</span>
    </div>
    <div class="bg-[#FFFCEF] py-3 md:px-6 px-2 my-4 text-[#FF9500]">
      <div>ATTENTION:</div>
      <div>
        (1)Please select the appropriate currency and enter the corresponding reference code below.(2) After the
        transfer is completed, please provide a copy or screenshot of the transfer slip to assist us with account
        reconciliation. You may email it to service@wubu.com.(3) Fiat deposits will take 1–3 business days to be
        processed. However, actual processing times may vary depending on the remitting and receiving banks. WUBU will
        make every effort to expedite the process whenever possible.Disclaimer:Any fiat currency deposit made through
        WUBU shall be deemed to be for the purpose of OTC (Over-the-Counter) virtual asset transaction services, unless
        you instruct otherwise in writing through WUBU.</div>
    </div>
    <div class="md:px-9 px-2 my-4 flex flex-col gap-y-5">
      <SelectInput @update:modelValue="handleAccountSelected" :options="currencyOptions" selectId="receivingAccount-selector"
        label="*Choose the currency to view detailed deposit information" placeholder="please select currency"
        v-model="receivingAccount" />
      <TextInput inputId="amount-input" label="*deposit amount" placeholder="Enter deposit amount" v-model="amount">
        <template #suffix v-if="selectedCurrency">
          <span style="font-size: 14px;">{{ selectedCurrency }}</span>
        </template>
      </TextInput>
    </div>
    <div>
      <div class="text-xl font-bold my-4">Beneficiary Bank Information</div>
      <div class="bg-[#F8F8F8] border-[#8D8D8D] px-3 py-4">
        <div>
          <h3 class="text-lg text-[#8D8D8D] font-semibold mb-2">Account name</h3>
          <p class="text-xl font-semibold text-black mb-2" v-if="selectAccount">{{ selectAccount.accountName }}</p>
          <hr />
        </div>
        <div class="mt-3">
          <h3 class="text-lg text-[#8D8D8D] font-semibold mb-2">account number</h3>
          <div class="flex justify-between items-center mb-2">
            <p class="text-xl font-semibold text-black" v-if="selectAccount">{{ selectAccount.accountNumber }}</p>
            <img src="../../assets/icons/dashboard/copy.svg" @click="copy('hello cw')" />
          </div>
          <hr />
        </div>
        <div class="mt-3">
          <h3 class="text-lg text-[#8D8D8D] font-semibold mb-2">IBAN</h3>
          <div class="flex justify-between items-center mb-2">
            <p class="text-xl font-semibold text-black" v-if="selectAccount">{{ selectAccount.iban }}</p>
            <img src="../../assets/icons/dashboard/copy.svg" @click="copy('hello cw')" />
          </div>
          <hr />
        </div>
        <div class="mt-3">
          <h3 class="text-lg text-[#8D8D8D] font-semibold mb-2">swift code</h3>
          <div class="flex justify-between items-center mb-2">
            <p class="text-xl font-semibold text-black" v-if="selectAccount">{{ selectAccount.swiftCode }}</p>
            <img src="../../assets/icons/dashboard/copy.svg" @click="copy('hello cw')" />
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
    <div class="flex gap-[2.5rem] w-full my-4">
      <div
        class="flex-1 bg-black rounded-[2.5rem] h-[2.75rem] md:h-[3.5rem] flex items-center justify-center cursor-pointer" @click="gotofinish">
        <div class="text-white font-lato text-base font-semibold leading-[3.875rem] whitespace-nowrap">Submit</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import SelectInput from '../../components/SelectInput.vue';
import TextInput from '../../components/TextInput.vue';
import Clipboard from 'vue-clipboard3';
import { useRouter } from 'vue-router';
import * as apiMarket from '@/api/market.js';
import * as apiFunding from '@/api/funding.js';


const currencyOptions = ref([])
const receivingAccount = ref(null)
const selectAccount = ref(null)
const amount = ref(null)
const accounts = ref([])
const selectedCurrency = ref(null)

const router = useRouter()

const handleAccountSelected = (id) => {
  selectAccount.value = accounts.value.filter((item) => item.id == id)[0]
  selectedCurrency.value = selectAccount.value.fiatType
}

const copy = async (info) => {
  const { toClipboard } = Clipboard()
  try {
    await toClipboard(info);
    console.log("copy successful");

  } catch (e) {
    console.log("copy failed");
  }
}

const fetchData = async () => {
  try {
    const result = await apiMarket.getwubuBankAccountsApi();
    if (result.code === 0) {
      // 获取所有数据并赋值给 allWalletData
      accounts.value = result.data || [];
      for (let index = 0; index < accounts.value.length; index++) {
        const element = accounts.value[index];
        currencyOptions.value.push({
          value: element.id + '',
          text: element.accountName
        })
      }
    }
  } catch (error) {
    console.error('Failed to fetch wallet data:', error);
  }
};

const gotofinish = async() => {
  const result = await apiFunding.depositActionApi({
    amount: amount.value,
    currency: selectedCurrency.value,
    currencyType: 1,
  })
  console.log("qssss", result);
  if (result.code == 0) {
    console.log("qqw");
    
    router.push('/usercenter/depositcurrencyFinish')
  }
}

onMounted(()=>{
  fetchData()
})
</script>