<template>
  <section
    class="mx-auto 2xl:container mt-[1.25rem] sm:mt-[3.3125rem] w-full h-[44rem] sm:h-[48.75rem] px-4 sm:px-[7.5rem] flex md:justify-between justify-center items-center pb-[5.0rem]"
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

    <!-- 注册成功 -->
    <div 
      class="py-[2.0625rem] px-[1.625rem] rounded-[1.25rem] shadow-[0_4px_20px_0px_rgba(0,0,0,0.1)]"
    >
      <h2 class="text-[#202326] md:text-[2.5rem] text-[1.375rem] font-[800] mb-[0.75rem]">Create Account</h2>
      <div class="mt-[5.375rem] mb-[4.125rem]">
        <img src="@/assets/icons/down.svg" class="w-[8.0rem] h-[8.0rem] mx-auto">
        <div class="leading-[3.875rem] text-[1.5rem] font-[700] text-center mt-[3.25rem]">
          Your account is created successfully.
        </div>
      </div>
      <div>
        <router-link 
          to="/login"
          class="text-white bg-[#FF7545] md:w-[33.4375rem] w-full h-[3.75rem] rounded-2xl mt-[1.875rem] flex items-center justify-center"
        >
          Login Now
        </router-link>
      </div>
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