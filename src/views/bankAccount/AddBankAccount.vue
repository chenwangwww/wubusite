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
      <TextInput inputId="bankname-input" label="*Bank name" placeholder="Enter Bank Name" v-model="bankname" />
      <TextInput inputId="iban-input" label="* IBAN/ Account" placeholder="Enter IBAN/ Account" v-model="iban" />
      <TextInput inputId="account-input" label="*Account Name" placeholder="Enter Account Name" v-model="account" />
      <TextInput inputId="company-input" label="Company Name（Options）" placeholder="Enter Company Name"
        v-model="company" />
      <TextInput inputId="swiftcode-input" label="*Swift Code" placeholder="Enter Swift Code" v-model="swiftcode" />
      <TextInput inputId="countrycode-input" label="*Country Code" placeholder="Enter Country Code"
        v-model="countrycode" />
    </div>

    <div class="flex gap-[2.5rem] w-full my-4">
      <div class="flex-1 bg-black rounded-[2.5rem] h-[2.75rem] md:h-[3.5rem] flex items-center justify-center cursor-pointer" @click="handleCreateBankAccount">
        <div class="text-white font-lato text-base font-semibold leading-[3.875rem] whitespace-nowrap">Submit</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import TextInput from '../../components/TextInput.vue';
import { useRouter } from 'vue-router';

const bankname = ref(null);
const iban = ref(null);
const account = ref(null);
const company = ref(null);
const swiftcode = ref(null);
const countrycode = ref(null);

const router = useRouter()

const handleCreateBankAccount = () => {
  router.push('/usercenter/bankaccountcreated')
}
</script>