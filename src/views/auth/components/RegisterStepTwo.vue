<template>
  <section
    class="mx-auto w-full max-w-[100vw] px-4 sm:px-[7.5rem] py-8 flex flex-col md:flex-row justify-between items-center md:items-end min-h-screen md:min-h-[36.75rem]"
  >
    <!-- 左侧内容 - 在小屏幕下隐藏 -->
    <div class="hidden md:flex flex-col w-full h-full justify-center items-center">
      <h4 class="text-[#FF7545] text-2xl md:text-[2.25rem] font-[800] mb-3 md:mb-[0.75rem]">Trade with confidence</h4>
      <p class="text-base md:text-[1.25rem] text-[#202326] w-full md:w-[24.375rem] mb-6 md:mb-[2.6875rem] text-center">
        Your funds are always backed 1:1 on WUBU with our regularly published audits
        on our Proof of Reserves
      </p>
      <img src="@/assets/images/registerFlag.png" alt="Trade with confidence" class="w-full max-w-[30.4375rem]">
    </div>

    <!-- 注册表单 - 宽度调整为100%在小屏幕下 -->
    <div 
      class="w-full max-w-[100vw] md:w-auto py-6 px-4 sm:px-6 md:py-[2.0625rem] md:px-[1.625rem] rounded-xl md:rounded-[1.25rem] shadow-[0_4px_20px_0px_rgba(0,0,0,0.1)] md:min-h-[36.75rem]"
    >
      <h2 class="text-[#202326] text-xl md:text-[2.5rem] font-[800] mb-3 md:mb-[2.75rem]">Contact Details</h2>
      
      <form @submit.prevent="$emit('submit')">
        <!-- 姓名行 - 小屏幕下改为垂直排列 -->
        <div class="flex flex-col md:flex-row gap-4">
          <div class="w-full">
            <label class="text-base md:text-[1.25rem] font-[600]">First Name</label>
            <input 
              required 
              :value="form.firstName" 
              @input="$emit('update', 'firstName', $event.target.value); $emit('clear-error', 'firstName')"
              type="text" 
              id="firstName"
              class="w-full text-sm md:text-[1.25rem] border rounded-xl md:rounded-2xl py-3 md:py-[0.75rem] px-4 md:px-[1.5rem] mt-1 md:mt-[0.5rem]"
            >
            <div v-if="errors.firstName" class="text-xs md:text-[0.625rem] text-red-400 mt-1 md:mb-[1.25rem]">
              {{ errors.firstName }}
            </div>
          </div>
          <div class="w-full">
            <label class="text-base md:text-[1.25rem] font-[600]">Last Name</label>
            <input 
              required 
              :value="form.lastName" 
              @input="$emit('update', 'lastName', $event.target.value); $emit('clear-error', 'lastName')"
              type="text" 
              id="lastName"
              class="w-full text-sm md:text-[1.25rem] border rounded-xl md:rounded-2xl py-3 md:py-[0.75rem] px-4 md:px-[1.5rem] mt-1 md:mt-[0.5rem]"
            >
            <div v-if="errors.lastName" class="text-xs md:text-[0.625rem] text-red-400 mt-1 md:mb-[1.25rem]">
              {{ errors.lastName }}
            </div>
          </div>
        </div>

        <!-- 电话号码 - 调整小屏幕下的样式 -->
        <div class="mt-4 md:mt-[1rem]">
          <label class="text-base md:text-[1.25rem] font-[600]">Phone Number</label>
          <div class="flex items-center border rounded-xl md:rounded-2xl overflow-hidden mt-1 md:mt-[0.5rem]">
            <span class="bg-gray-100 h-full py-3 md:py-[0.75rem] px-3 md:px-[1.5rem] text-sm md:text-[1.25rem]">+971</span>
            <span class="h-4 md:h-[1.5rem] w-px bg-gray-300"></span>
            <input 
              required 
              :value="form.phoneNumber" 
              @input="$emit('update', 'phoneNumber', $event.target.value); $emit('clear-error', 'phoneNumber')"
              type="tel" 
              id="phone"
              class="flex-1 text-sm md:text-[1.25rem] py-3 md:py-[0.75rem] px-3 md:px-[1.5rem]"
              placeholder="501234567"
              inputmode="numeric"
            >
          </div>
          <div v-if="errors.phoneNumber" class="text-xs md:text-[0.625rem] text-red-400 mt-1 md:mb-[1.25rem]">
            {{ errors.phoneNumber }}
          </div>
        </div>

        <!-- 公司名称 -->
        <div class="mt-4 md:mt-[1rem]">
          <label class="text-base md:text-[1.25rem] font-[600]">
            Company Name <span class="text-xs md:text-[1.0rem] text-[#8D8D8D]">(Optional)</span>
          </label>
          <input 
            :value="form.companyName" 
            @input="$emit('update', 'companyName', $event.target.value)"
            type="text" 
            id="company"
            class="w-full md:w-[33.0rem] text-sm md:text-[1.25rem] border rounded-xl md:rounded-2xl py-3 md:py-[0.75rem] px-4 md:px-[1.5rem] mt-1 md:mt-[0.5rem]"
          >
        </div>

        <!-- 提交按钮 - 调整小屏幕下的高度 -->
        <button 
          type="submit"
          class="text-white bg-[#FF7545] w-full h-12 md:h-[3.75rem] rounded-3xl md:rounded-[2.5rem] mt-6 md:mt-[1.875rem] text-base md:text-[1.25rem]"
        >
          Submit
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
      required: true,
      default: () => ({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        companyName: ''
      })
    },
    errors: {
      type: Object,
      required: true,
      default: () => ({
        firstName: '',
        lastName: '',
        phoneNumber: ''
      })
    },
    submitSuccess: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'update',
    'submit',
    'clear-error'
  ]
}
</script>

<style scoped>
/* 针对小屏幕的额外调整 */
@media (max-width: 640px) {
  section {
    padding-top: 2rem;
    padding-bottom: 2rem;
    height: auto;
    min-height: 100vh;
  }
  
  input, button {
    font-size: 16px; /* 确保iOS设备上输入框字体不会缩小 */
  }
}
</style>