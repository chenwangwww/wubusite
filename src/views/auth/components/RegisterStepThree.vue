<template>
  <section
    class="mx-auto 2xl:container mt-[3.3125rem] w-full h-[48.75rem] px-4 sm:px-[7.5rem] flex md:justify-between justify-center items-end pb-[5.0rem]"
  >
    <!-- 左侧内容 (保持不变) -->
    <div class="md:flex hidden flex-col w-full h-full justify-center items-center">
      <h4 class="text-[#FF7545] text-[2.25rem] font-[800] mb-[0.75rem]">Trade with confidence</h4>
      <p class="text-[1.25rem] text-[#202326] w-[24.375rem] mb-[2.6875rem]">
        Your funds are always backed 1:1 on WUBU with our regularly published audits
        on our Proof of Reserves
      </p>
      <img src="@/assets/images/registerFlag.png" alt="Trade with confidence" class="w-[30.4375rem]">
    </div>

    <!-- 服务类型选择表单 -->
    <div 
      class="py-[2.0625rem] px-[1.625rem] rounded-[1.25rem] shadow-[0_4px_20px_0px_rgba(0,0,0,0.1)] h-[43.75rem] md:w-[64rem]"
    >
      <h2 class="text-[#202326] md:text-[2.5rem] text-[1.375rem] font-[800] mb-[2.5rem]">Type of Service</h2>
      
      <!-- 选项组容器 -->
      <div class="space-y-[1.875rem]">
        <!-- 个人选项 -->
        <div 
          class="flex items-center justify-between p-[1.25rem] border rounded-[1.25rem] cursor-pointer hover:border-[#FF7545] transition-colors"
          :class="{'border-[#FF7545]': form.serviceType === 'individual'}"
          @click="form.serviceType = 'individual'"
        >
          <div class="flex items-center">
            <!-- 个人图标 -->
            <svg class="w-[2.5rem] h-[2.5rem] mr-[1.25rem]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="#FF7545"/>
              <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="#FF7545"/>
            </svg>
            <div>
              <h3 class="md:text-[1.25rem] text-md font-[600]">As an Individual</h3>
            </div>
          </div>
          <!-- 单选按钮 -->
          <div class="w-[1.5rem] h-[1.5rem] rounded-full border-2 border-[#D1D1D1] flex items-center justify-center">
            <div 
              class="w-[0.875rem] h-[0.875rem] rounded-full bg-[#FF7545]"
              v-if="form.serviceType === 'individual'"
            ></div>
          </div>
        </div>

        <!-- 机构选项 -->
        <div 
          class="flex items-center justify-between p-[1.25rem] border rounded-[1.25rem] cursor-pointer hover:border-[#FF7545] transition-colors"
          :class="{'border-[#FF7545]': form.serviceType === 'institutional'}"
          @click="form.serviceType = 'institutional'"
        >
          <div class="flex items-center">
            <!-- 机构图标 -->
            <svg class="w-[2.5rem] h-[2.5rem] mr-[1.25rem]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="#FF7545" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9 9H15V15H9V9Z" stroke="#FF7545" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M3 9H5" stroke="#FF7545" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M19 9H21" stroke="#FF7545" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M3 15H5" stroke="#FF7545" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M19 15H21" stroke="#FF7545" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9 3V5" stroke="#FF7545" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M15 3V5" stroke="#FF7545" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9 19V21" stroke="#FF7545" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M15 19V21" stroke="#FF7545" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div>
              <h3 class="md:text-[1.25rem] text-md font-[600] max-md:w-[10rem]">As a Trust, Investment Fund, etc.</h3>
            </div>
          </div>
          <!-- 单选按钮 -->
          <div class="w-[1.5rem] h-[1.5rem] rounded-full border-2 border-[#D1D1D1] flex items-center justify-center">
            <div 
              class="w-[0.875rem] h-[0.875rem] rounded-full bg-[#FF7545]"
              v-if="form.serviceType === 'institutional'"
            ></div>
          </div>
        </div>
      </div>

      <!-- 提交按钮 -->
      <button 
        @click="handleSubmit"
        class="text-white bg-[#FF7545] w-full h-[3.75rem] rounded-[2.5rem] mt-[3.125rem] text-[1.25rem] font-[600]"
      >
        Register
      </button>
    </div>
  </section>
</template>

<script setup>
defineProps({
  form: Object,
  errors: Object,
  submitSuccess: Boolean
});

const emit = defineEmits(['update', 'submit']);

const handleSelect = (type) => {
  emit('update', 'serviceType', type);
};

const handleSubmit = () => {
  emit('submit');
};
</script>

<style scoped>
/* 选中状态的过渡动画 */
.border {
  transition: border-color 0.3s ease;
}
</style>