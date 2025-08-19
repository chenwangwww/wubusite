<template>
  <div class="login-form">
    <h2 class="text-[#202326] md:text-[2.5rem] text-[1.375rem] font-[800] mb-[0.75rem]">Login</h2>
    
    <div v-if="apiError" class="mb-[1.25rem] text-[0.875rem] text-red-500">
      {{ apiError }}
    </div>

    <form @submit.prevent="$emit('submit', form)">
      <!-- 邮箱输入 -->
      <label class="text-[1.25rem] font-[600]">Email Address</label><br>
      <div class="mt-[0.5rem]"></div>
      <input 
        required 
        v-model="form.email" 
        type="email" 
        @input="$emit('clear-error', 'email')"
        class="wuBuTip md:w-[33.0rem] border rounded-2xl py-[0.75rem] px-[1.5rem] text-[1.25rem] block"
      >
      <div v-if="errors.email" class="mb-[1.25rem] text-[0.625rem] text-red-400">
        {{ errors.email }}
      </div>

      <!-- 密码输入 -->
      <div class="mt-[1rem]"></div>
      <label class="text-[1.25rem] font-[600]">
        Password<span class="text-[1.0rem] text-[#8D8D8D]"> (At least 6 characters)</span>
      </label><br>
      <div class="mt-[0.5rem]"></div>
      <input 
        required 
        v-model="form.password" 
        type="password" 
        @input="$emit('clear-error', 'password')"
        class="wuBuTip md:w-[33.0rem] border rounded-2xl py-[0.75rem] px-[1.5rem] text-[1.25rem] block"
      >
      <div v-if="errors.password" class="mb-[1.25rem] text-[0.625rem] text-red-400">
        {{ errors.password }}
      </div>

      <!-- 忘记密码链接 -->
      <div class="text-[#FF7545] text-[1.0rem] font-[700] mt-[0.75rem] mb-[1.875rem] text-right">
        <router-link to="/forget">forgot password?</router-link>
      </div>

      <!-- 登录按钮 -->
      <button 
        type="submit"
        class="text-[1.5rem] font-[700] text-white bg-[#FF7545] md:w-[33.4375rem] w-full h-[3.75rem] rounded-[2.5rem] mt-[1.875rem]"
      >
        Login
      </button>
    </form>

    <!-- 注册链接 -->
    <div class="my-[1.875rem] text-[1.0rem] font-[700] text-center">
      Don't have an account? 
      <router-link to="/register" class="text-[#FF7545]">register now</router-link>
    </div>
  </div>
</template>

<script setup>
defineProps({
  form: {
    type: Object,
    required: true
  },
  errors: {
    type: Object,
    required: true
  },
  apiError: {
    type: String,
    default: ''
  }
});

defineEmits(['submit', 'clear-error']);
</script>