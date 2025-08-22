<template>
  <section class="mt-9 md:ml-16 md:mr-8 mx-4 px-16 bg-white">
    <div class="py-8 flex gap-x-8 items-center">
      <img src="../../assets//icons/dashboard/arrow-left.svg" class="w-8" />
      <span class=" font-bold text-2xl">Add Bank Account</span>
    </div>
    <div class="w-full my-4 mx-6">
      <div class="text-lg">If you would like to add new bank account information, please fill in the following details.
      </div>
    </div>
    <div class="flex mx-6 flex-col gap-y-4">
      <TextInput inputId="account-input" label="*Account name" placeholder="Enter Account Name" v-model="accountname" />
      <TextInput inputId="wallet-input" label="*Wallet Address" placeholder="Enter Wallet Address" v-model="walletaddr" />
      <SelectInput :options="cryptoOptions" selectId="crypto-selector"
        label="*Choose the currency to view detailed deposit information" placeholder="please select currency"
        v-model="selectedCrypto" />
    </div>

    <div class="flex gap-[2.5rem] w-full my-4 mt-6">
      <div class="flex-1 bg-black rounded-[2.5rem] h-[2.75rem] md:h-[3.5rem] flex items-center justify-center cursor-pointer" @click="handleCreateBankAccount">
        <div class="text-white font-lato text-base font-semibold leading-[3.875rem] whitespace-nowrap">Submit</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import TextInput from '../../components/TextInput.vue';
import SelectInput from '../../components/SelectInput.vue';
import { useRouter } from 'vue-router';

const accountname = ref(null);
const walletaddr = ref(null);
const selectedCrypto = ref(null)

const cryptoOptions = ref([
  { value: 'USDT', text: 'USDT' },
  { value: 'USDC', text: 'USDC' },
]);

const router = useRouter()

const handleCreateBankAccount = () => {
  router.push('/usercenter/walletsuccess')
}
</script>