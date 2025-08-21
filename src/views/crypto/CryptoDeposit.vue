<template>
  <section class="mt-9 md:ml-16 md:mr-8 mx-4 px-16 bg-white">
    <div class="py-8 flex gap-x-8 items-center">
      <img src="../../assets//icons/dashboard/arrow-left.svg" class="w-8" />
      <span class=" font-bold text-2xl">Deposit</span>
    </div>
    <div class="w-full bg-[#FFFCEF] py-4 px-8 mb-8">
      <span class="text-[#FF9500] text-base">ATTENTION: Cryptocurrency deposits are processed on the same day,
        contingent upon the successful completion of AML/CFT checks.</span>
    </div>

    <div class="flex flex-col gap-y-6 justify-center">
      <SelectInput :options="cryptoOptions" selectId="crypto-selector"
        label="*Choose the currency to view detailed deposit information" placeholder="please select currency"
        v-model="selectedCrypto" />
      <SelectInput :options="netOptions" selectId="network-selector"
        label="*Choose the currency to view detailed deposit information" placeholder="please select currency"
        v-model="selectedNet" />

      <TextInput inputId="amount-input" label="*deposit amount"
        placeholder="Enter deposit amount" v-model="amount" >
        <template #suffix>
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
      <div @click="$emit('confirm')"
        class="flex-1 bg-black rounded-[2.5rem] h-[2.75rem] flex items-center justify-center cursor-pointer">
        <div class="text-white font-lato text-base font-semibold leading-[3.875rem] whitespace-nowrap">Submit</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import SelectInput from '../../components/SelectInput.vue';
import UnitInput from '../../components/UnitInput.vue';
import TextInput from '../../components/TextInput.vue';
import QRCode from 'qrcodejs2-fix';
import Clipboard from 'vue-clipboard3';

const imgContainer = ref(null);

const selectedCrypto = ref(null)
const selectedNet = ref(null)
const amount = ref('');
const currency = ref('USD');

const cryptoOptions = ref([
  { value: 'USDT', text: 'USDT' },
  { value: 'USDC', text: 'USDC' },
]);
const netOptions = ref([
  { value: 'net1', text: 'net1' },
  { value: 'net2', text: 'net2' },
]);

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

onMounted(() => {
  generateCode();
});
</script>