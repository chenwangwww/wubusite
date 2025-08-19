<template>
  <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 z-50">
    <div class="bg-white rounded-[1.25rem] flex flex-col items-center relative px-3 md:px-12 py-6 mx-2">
      <div class="flex flex-col items-center gap-[1.0625rem] w-full">
        <div class="w-[4.375rem] h-[3.6875rem] relative">
          <img class="absolute top-0 left-0 w-[4.375rem] h-[3.625rem]" src="@/assets/icons/trade/verification.svg"
            alt="Vector" />
        </div>
        <p class="text-black font-lato text-xl font-bold text-center w-full">Additional Verifications for Fiat Channels
        </p>
        <p class="text-black font-lato text-lg text-center w-full">Based on local regulator requirements,
          please complete
          the additional verification to access fiat service.</p>
      </div>

        <div @click="$emit('confirm')" class="w-1/2 mt-10 bg-black rounded-[2.5rem] h-[2.75rem] flex items-center justify-center cursor-pointer">
          <div class="text-white font-lato text-base font-semibold leading-[3.875rem] whitespace-nowrap">Confirm</div>
        </div>
    </div>
  </div>
</template>

<script setup>
// 添加emit定义
defineEmits(['confirm']);
</script>