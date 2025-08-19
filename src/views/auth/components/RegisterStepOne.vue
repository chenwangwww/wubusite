<template>
  <section
    class="mx-auto 2xl:container mt-[3.3125rem] w-full h-[48.75rem] px-[7.5rem] flex md:justify-between justify-center items-end pb-[5.0rem]"
  >
    <!-- 左侧内容 -->
    <div class="md:flex hidden flex-col w-full h-full justify-center items-center">
      <h4 class="text-[#FF7545] text-[2.25rem] font-[800] mb-[0.75rem]">Trade with confidence</h4>
      <p class="text-[1.25rem] text-[#202326] w-[24.375rem] mb-[2.6875rem]">
        Your funds are always backed 1:1 on WUBU with our regularly published audits
        on our Proof of Reserves
      </p>
      <img src="@/assets/images/registerFlag.png" alt="Trade with confidence" class="w-[30.4375rem]">
    </div>

    <!-- 注册表单 -->
    <div 
      class="py-[2.0625rem] px-[1.625rem] rounded-[1.25rem] shadow-[0_4px_20px_0px_rgba(0,0,0,0.1)] h-[43.75rem]"
    >
      <h2 class="text-[#202326] md:text-[2.5rem] text-[1.375rem] font-[800] mb-[0.75rem]">Create Account</h2>
      <form @submit.prevent="$emit('submit')">
        <!-- 邮箱输入 -->
        <label class="text-[1.25rem] font-[600]">Email Address</label><br>
        <div class="mt-[0.5rem]"></div>
        <input 
          required 
          :value="form.email" 
          @input="$emit('update', 'email', $event.target.value); $emit('clear-error', 'email')"
          type="email" 
          class="wuBuTip md:w-[33.0rem] border rounded-2xl py-[0.75rem] px-[1.5rem] text-[1.25rem] block"
        >
        <div v-if="errors.email" class="mb-[1.25rem] text-[0.625rem] text-red-400">
          {{ errors.email }}
        </div>

        <div class="mt-[1rem]"></div>
        <!-- 密码输入 -->
        <label class="text-[1.25rem] font-[600]">
          Password<span class="text-[1.0rem] text-[#8D8D8D]"> (At least 6 characters)</span>
        </label><br>
        <div class="mt-[0.5rem]"></div>
        <input 
          required 
          :value="form.password" 
          @input="$emit('update', 'password', $event.target.value); $emit('clear-error', 'password')"
          type="password" 
          class="wuBuTip md:w-[33.0rem] border rounded-2xl py-[0.75rem] px-[1.5rem] text-[1.25rem] block"
        >
        <div v-if="errors.password" class="mb-[1.25rem] text-[0.625rem] text-red-400">
          {{ errors.password }}
        </div>

        <div class="mt-[1rem]"></div>
        <!-- 确认密码 -->
        <label class="text-[1.25rem] font-[600]">
          Confirm Password<span class="text-[1.0rem] text-[#8D8D8D]"> (At least 6 characters)</span>
        </label><br>
        <div class="mt-[0.5rem]"></div>
        <input 
          required 
          :value="form.confirmPassword" 
          @input="$emit('update', 'confirmPassword', $event.target.value)"
          type="password" 
          class="wuBuTip md:w-[33.0rem] border rounded-2xl py-[0.75rem] px-[1.5rem] text-[1.25rem] mb-[1.25rem]"
        >

        <!-- 条款同意 -->
        <div class="flex items-center relative wuBucheckbox">
          <input 
            required 
            type="checkbox" 
            :checked="form.agreeTerms"
            @change="$emit('update', 'agreeTerms', $event.target.checked)"
            class="w-[1.25rem] h-[1.25rem] border rounded-2xl py-[0.75rem] px-[1.5rem] text-[1.25rem] font-[600] mr-[0.625rem]"
          >
          <label for="checkboxReg" class="text-[1.0rem] text-[#8D8D8D]">
            I have read and agree to the 
            <span class="text-[#FF7545] cursor-pointer" @click="$emit('show-terms')">terms of use</span>
          </label>
        </div>

        <!-- 提交按钮 -->
        <button 
          type="submit"
          class="text-white bg-[#FF7545] md:w-[33.4375rem] w-full h-[3.75rem] rounded-[2.5rem] mt-[1.875rem]"
        >
          Next
        </button>
      </form>
    </div>

  </section>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      required: true
    },
    errors: {
      type: Object,
      required: true
    },
    registerSuccess: {
      type: Boolean,
      default: false
    },
    showTermsPopup: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'update',
    'submit',
    'clear-error',
    'show-terms',
    'hide-terms'
  ]
}
</script>

<style scoped>
/* 可以添加组件特定的样式 */
</style>