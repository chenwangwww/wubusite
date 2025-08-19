<template>
  <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 z-50">
    <div class="bg-white rounded-[1.25rem] flex flex-col items-center relative px-3 md:px-12 py-6 mx-2">
      <div class="flex flex-col items-center gap-[1.0625rem] w-full">
        <div class="w-[4.375rem] h-[3.6875rem] relative">
          <img class="absolute top-0 left-0 w-[4.375rem] h-[3.625rem]" src="@/assets/icons/trade/verification.svg"
            alt="Vector" />
        </div>
        <p class="text-black font-lato text-xl font-bold text-center w-full">Payment security Verify
        </p>
        <p class="text-black font-lato text-xl font-bold text-center w-full">Please enter the 4-digit code we sent to
          your email.</p>
      </div>
      <div class="w-full my-8">
        <VerificationCodeInput @change="handleCodeChange" @complete="handleCodeComplete" class="justify-center" />

        <p class="text-sm text-gray-500 text-center mt-4">
          已输入: {{ currentCode }}
        </p>
      </div>
      <p class="text-[#e60000] font-lato text-sm underline text-center w-full">Verification code not received？ Resend
      </p>
      <div class="flex gap-[2.5rem] w-full mt-10">
        <div @click="$emit('confirm')"
          class="flex-1 bg-black rounded-[2.5rem] h-[2.75rem] flex items-center justify-center cursor-pointer">
          <div class="text-white font-lato text-base font-semibold leading-[3.875rem] whitespace-nowrap">Confirm</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import VerificationCodeInput from '@/components/VerificationCodeInput.vue'
import { ref } from 'vue'


const currentCode = ref('')

const handleCodeChange = (code) => {
  currentCode.value = code
  console.log('验证码变化:', code)
}

const handleCodeComplete = (code) => {
  console.log('验证码输入完成:', code)
  // 这里可以处理验证逻辑
  // alert(`验证码 ${code} 已输入完成`)
}

const clearCode = () => {
  // 通过ref调用组件的方法
  verificationCodeInput.value?.clear()
}
const focusCode = () => {
  verificationCodeInput.value?.focus()
}

const verificationCodeInput = ref(null)
// 添加emit定义
defineEmits(['confirm']);
</script>