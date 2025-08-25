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
      <TextInput inputId="accountname-input" label="*Account name" placeholder="Enter Account Name"
        v-model="accountname" />
      <TextInput inputId="bankAccount-input" label="*Bank Account" placeholder="Enter Bank Account"
        v-model="bankAccount" />
      <TextInput inputId="bankname-input" label="*Bank name" placeholder="Enter Bank Name" v-model="bankname" />
      <TextInput inputId="bankaddr-input" label="*Bank Address" placeholder="Enter Bank Address" v-model="bankaddr" />
      <TextInput inputId="swiftcode-input" label="*Swift Code" placeholder="Enter Swift Code" v-model="swiftcode" />
      <TextInput inputId="iban-input" label="* IBAN/ Account" placeholder="Enter IBAN/ Account" v-model="iban" />
      <TextInput inputId="routingNumber-input" label="* routingNumber" placeholder="Enter routingNumber"
        v-model="routingNumber" />
      <SelectInput :options="cryptoOptions" selectId="fiatType-selector" label="*Choose the fiatType"
        placeholder="please select" v-model="fiatType" />
      <TextInput inputId="remark-input" label="Remark" placeholder="please Enter" v-model="remark" />
    </div>

    <div class="flex gap-[2.5rem] w-full my-4">
      <div
        class="flex-1 bg-black rounded-[2.5rem] h-[2.75rem] md:h-[3.5rem] flex items-center justify-center cursor-pointer"
        @click="handleCreateBankAccount">
        <div class="text-white font-lato text-base font-semibold leading-[3.875rem] whitespace-nowrap">Submit</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import TextInput from '../../components/TextInput.vue';
import { useRouter } from 'vue-router';
import SelectInput from '../../components/SelectInput.vue';
import * as apiBankAccount from '@/api/bankaccount'

const accountname = ref(null);
const bankname = ref(null);
const bankaddr = ref(null);
const bankAccount = ref(null);
const swiftcode = ref(null);
const iban = ref(null);
const fiatType = ref(null);
const remark = ref(null);
const routingNumber = ref(null);


const router = useRouter()
const cryptoOptions = ref([
  { value: 'USDT', text: 'USDT' },
  { value: 'USDC', text: 'USDC' },
]);

const handleCreateBankAccount = async () => {
  const result = await apiBankAccount.createAccountApi({
    label: accountname.value,
    swiftCode: swiftcode.value,
    bankName: bankname.value,
    bankAddress: bankaddr.value,
    routingNumber: routingNumber.value,
    fiatType: fiatType.value,
    isDefault: 1,
    remark: remark.value,
    iban: iban.value
  })

  if (result.code == 0) {
    router.push('/usercenter/bankaccountcreated')
  }
}
</script>