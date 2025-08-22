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
        placeholder="please select" v-model="receivingAccount" />
    </div>
    <div>
      <div class="text-xl font-bold my-4">Wallet Information</div>
      <div class="bg-[#F8F8F8] border-[#8D8D8D] px-3 py-4">
        <div>
          <h3 class="text-lg text-[#8D8D8D] font-semibold mb-2">Account name</h3>
          <p class="text-xl font-semibold text-black mb-2">WUBU FZCO</p>
          <hr />
        </div>
        <div class="mt-3">
          <h3 class="text-lg text-[#8D8D8D] font-semibold mb-2">wallet address</h3>
          <div class="flex justify-between items-center mb-2">
            <p class="text-xl font-semibold text-black">1000763010000002</p>
          </div>
          <hr />
        </div>
        <div class="mt-3">
          <h3 class="text-lg text-[#8D8D8D] font-semibold mb-2">Network</h3>
          <div class="flex justify-between items-center mb-2">
            <p class="text-xl font-semibold text-black">1000763010000002</p>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="text-xl font-bold mt-6 mb-2">Withdrawal Information</div>
      <UnitInput inputId="amount-amount" label="withdraw amount" placeholder="Enter withdraw amount" v-model="amount"
        v-model:unitValue="selectedCurrency" :available-units="['USDT', 'USDC']" />
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
import { ref } from 'vue';
import SelectInput from '../../components/SelectInput.vue';
import TextInput from '../../components/TextInput.vue';
import UnitInput from '../../components/UnitInput.vue';
import { useRouter } from 'vue-router';

const receivingAccount = ref(null)
const amount = ref(null)
const selectedCurrency = ref(null)
const accountOptions = ref([
  { value: 'USD', text: 'USD' },
  { value: 'AED', text: 'AED' },
])
const router = useRouter()
const gotosubmit = () => {
  router.push('/usercenter/withdrawcurrencysuccess')
}
</script>