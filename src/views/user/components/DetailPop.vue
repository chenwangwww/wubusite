<template>
  <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 z-50">
    <div class="bg-white rounded-2xl flex flex-col items-center relative md:px-12 px-8 py-6 md:w-[45rem]">
      <div class="flex flex-col items-center gap-[1.0625rem] w-full">
        <p class="text-black font-lato text-xl font-bold text-center w-full">Details</p>
        <p class="text-black font-lato text-base text-center w-full">
          Please find the below details.
        </p>
      </div>
      <section class="w-full bg-white rounded-lg overflow-hidden shadow-sm">
        <div>
          <div class="border-b border-gray-100 py-4">
            <div class="grid grid-cols-[2fr_3fr] gap-0">
              <div class="space-y-0">
                <div v-for="(value, key) in data" :key="key" class="bg-[#FFF7F2] px-3 py-2 rounded-lg text-xs text-gray-600 font-medium">
                  {{ key }}
                </div>
              </div>

              <div class="space-y-0">
                <div v-for="(value, key) in data" :key="key" class="px-3 bg-[#F6F6F6] py-2 text-black text-xs font-medium">
                  {{ value }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div class="w-full mt-6 flex justify-center">
        <div
          @click="$emit('confirm')"
          class="w-2/3 bg-black rounded-[2.5rem] h-[2.75rem] flex items-center justify-center cursor-pointer"
        >
          <div class="text-white font-lato text-base font-semibold leading-[3.875rem] whitespace-nowrap">Confirm</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

// 定义组件接收的 props
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

defineEmits(['confirm']);
</script>