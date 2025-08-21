<template>
  <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 z-50">
    <div class="bg-white rounded-2xl flex flex-col items-center relative md:px-12 px-8 py-6 md:w-[45rem]">

      <div class="flex flex-col items-center gap-[1.0625rem] w-full">
        <p class="text-black font-lato text-xl font-bold text-center w-full">{{ title }}</p>
        <p class="text-black font-lato text-base text-center w-full">{{ bodyText }}</p>
      </div>

      <section class="w-full bg-white rounded-lg overflow-hidden shadow-sm">
        <slot></slot>
      </section>

      <div class="w-full md:w-2/3 mt-6 flex justify-center space-x-4">
        <div 
          v-if="showCancelButton"
          @click="$emit('cancel')"
          :class="{ 'w-1/2': showCancelButton }"
          class="border border-black rounded-[2.5rem] h-[2.75rem] flex items-center justify-center cursor-pointer"
        >
          <div class="text-black font-lato text-base font-semibold leading-[3.875rem] whitespace-nowrap">{{ cancelText }}</div>
        </div>
        <div
          @click="$emit('confirm')"
          :class="{ 'w-1/2': showCancelButton, 'w-2/3': !showCancelButton }"
          class="bg-black rounded-[2.5rem] h-[2.75rem] flex items-center justify-center cursor-pointer"
        >
          <div class="text-white font-lato text-base font-semibold leading-[3.875rem] whitespace-nowrap">{{ confirmText }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  // 弹窗标题
  title: {
    type: String,
    default: 'Details'
  },
  // 弹窗正文
  bodyText: {
    type: String,
    default: 'Please find the below details.'
  },
  // 确定按钮的文本
  confirmText: {
    type: String,
    default: 'Confirm'
  },
  // 控制取消按钮的显示
  showCancelButton: {
    type: Boolean,
    default: false
  },
  // 取消按钮的文本
  cancelText: {
    type: String,
    default: 'Cancel'
  }
});

defineEmits(['confirm', 'cancel']);
</script>