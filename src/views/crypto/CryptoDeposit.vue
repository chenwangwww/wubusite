<template>
  <section class="mt-9 md:ml-16 md:mr-8 mx-4 px-16 bg-white">
    <RouterBack title="Deposit" />
    <div class="w-full bg-[#FFFCEF] py-4 px-8 mb-8">
      <span class="text-[#FF9500] text-base">ATTENTION: Cryptocurrency deposits are processed on the same day,
        contingent upon the successful completion of AML/CFT checks.</span>
    </div>

    <div class="flex flex-col gap-y-6 justify-center">
      <SelectInput :options="accountOptions" selectId="receivingAccount-selector" label="Select a recipient"
        placeholder="please select" v-model="receivingAccount" @update:modelValue="handleAccountSelected" />

      <TextInput inputId="amount-input" label="*deposit amount" placeholder="Enter deposit amount" v-model="amount">
        <template #suffix v-if="currency">
          <span style="font-size: 14px;">{{ currency }}</span>
        </template>
      </TextInput>

    </div>
    <div class="w-full text-center">
      <p class="font-bold text-xl my-8">Deposit Address</p>
      <div ref="imgContainer" class="flex justify-center items-center"></div>

      <div class="my-8 flex justify-center gap-x-6 items-center">
        <p class="font-semibold text-lg">TQZe4T9nudAesTaHYDhmhZFbeNSuUzx5Au</p>
        <img src="../../assets/icons/dashboard/copy.svg" @click="copy('hello cw')" />
      </div>
    </div>

    <div class="flex gap-[2.5rem] w-full my-4">
      <div class="flex-1 bg-black rounded-[2.5rem] h-[2.75rem] flex items-center justify-center cursor-pointer">
        <div class="text-white font-lato text-base font-semibold leading-[3.875rem] whitespace-nowrap">Submit</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import SelectInput from '../../components/SelectInput.vue';
import UnitInput from '../../components/UnitInput.vue';
import TextInput from '../../components/TextInput.vue';
import QRCode from 'qrcodejs2-fix';
import Clipboard from 'vue-clipboard3';
import RouterBack from '../../components/RouterBack.vue';
import * as apiWallet from '@/api/cryptoWallet.js';

const imgContainer = ref(null);
const receivingAccount = ref(null)
const accountOptions = ref([])
const accounts = ref([])
const amount = ref('');
const currency = ref(null);
const selectAccount = ref(null)

const handleAccountSelected = (id) => {
  selectAccount.value = accounts.value.filter((item) => item.id == id)[0]
  currency.value = selectAccount.value.symbol
}

const generateCode = () => {
  if (imgContainer.value) {
    imgContainer.value.innerHTML = "";
    new QRCode(imgContainer.value, {
      text: "http:test.com",
      width: 200,
      height: 200,
      correctLevel: 3,
    });
  }
};

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
  generateCode();
});
</script>