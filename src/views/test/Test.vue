<template>
  <div>test</div>
  <div ref="imgContainer"></div>
  <div class="mt-4 ml-4 rounded-lg bg-pink-200 py-2 px-4 inline-block" @click="copy('hello cw')">Copy</div>
</template>

<script setup>
import QRCode from 'qrcodejs2-fix';
import { ref, onMounted } from 'vue';
import Clipboard from 'vue-clipboard3';

// 声明 ref
const imgContainer = ref(null);

const generateCode = () => {
  if (imgContainer.value) {
    imgContainer.value.innerHTML = "";
    new QRCode(imgContainer.value, {
      text: "http:test.com",
      width: 108,
      height: 108,
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