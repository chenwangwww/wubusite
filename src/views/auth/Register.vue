<template>
  <Header />
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
      v-if="!registerSuccess"
      class="py-[2.0625rem] px-[1.625rem] rounded-[1.25rem] shadow-[0_4px_20px_0px_rgba(0,0,0,0.1)] h-[43.75rem]"
    >
      <h2 class="text-[#202326] md:text-[2.5rem] text-[1.375rem] font-[800] mb-[0.75rem]">Create Account</h2>
      <form @submit.prevent="handleSubmit">
        <!-- 邮箱输入 -->
        <label class="text-[1.25rem] font-[600]">Email Address</label><br>
        <div class="mt-[0.5rem]"></div>
        <input 
          required 
          v-model="form.email" 
          type="email" 
          id="mail"
          @input="clearError('email')"
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
          v-model="form.password" 
          type="password" 
          id="pwd"
          @input="clearError('password')"
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
          v-model="form.confirmPassword" 
          type="password" 
          id="qpwd"
          class="wuBuTip md:w-[33.0rem] border rounded-2xl py-[0.75rem] px-[1.5rem] text-[1.25rem] mb-[1.25rem]"
        >

        <!-- 条款同意 -->
        <div class="flex items-center relative wuBucheckbox">
          <input 
            required 
            type="checkbox" 
            id="checkboxReg" 
            v-model="form.agreeTerms"
            class="w-[1.25rem] h-[1.25rem] border rounded-2xl py-[0.75rem] px-[1.5rem] text-[1.25rem] font-[600] mr-[0.625rem]"
          >
          <label for="checkboxReg" class="text-[1.0rem] text-[#8D8D8D]">
            I have read and agree to the 
            <span class="text-[#FF7545] cursor-pointer" @click="showTerms">terms of use</span>
          </label>
        </div>

        <!-- 提交按钮 -->
        <button 
          type="submit"
          class="text-white bg-[#FF7545] md:w-[33.4375rem] w-full h-[3.75rem] rounded-[2.5rem] mt-[1.875rem]"
        >
          Register
        </button>
      </form>

      <div class="my-[1.875rem] text-[1.0rem] font-[700] text-center">
        Already have an account? 
        <router-link to="/login" class="text-[#FF7545]">login</router-link>
      </div>
    </div>

    <!-- 注册成功 -->
    <div 
      v-else
      class="py-[2.0625rem] px-[7.625rem] rounded-[1.25rem] shadow-[0_4px_20px_0px_rgba(0,0,0,0.1)]"
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

    <!-- 条款弹窗 -->
    <div 
      v-if="showTermsPopup" 
      class="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)] z-[999]"
      @click.self="hideTerms"
    >
      <div 
        class="absolute w-3/4 h-3/4 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-[1.875rem] rounded-[1.25rem] shadow-[0_4px_20px_0px_rgba(0,0,0,0.1)]"
      >
        <div class="h-full">
          <div class="flex items-center justify-center" style="height: calc(100% - 3.875rem);">
            <iframe 
              src="/html/TermsOfUse.html" 
              width="100%" 
              height="100%"
              frameborder="0"
            ></iframe>
          </div>
          <div class="flex justify-center">
            <button 
              @click="hideTerms"
              class="text-white bg-[#FF7545] md:w-[33.4375rem] w-full h-[2rem] rounded-2xl mt-[1.875rem]"
            >
              Sure
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  <Footer />
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';

const router = useRouter();

// 表单数据
const form = ref({
  email: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false
});

// 错误信息
const errors = ref({
  email: '',
  password: ''
});

// 控制显示
const registerSuccess = ref(false);
const showTermsPopup = ref(false);

// 清除错误
const clearError = (field) => {
  errors.value[field] = '';
};

// 显示条款
const showTerms = (e) => {
  e.preventDefault();
  showTermsPopup.value = true;
};

// 隐藏条款
const hideTerms = () => {
  showTermsPopup.value = false;
};

// 表单提交
const handleSubmit = () => {
  // 验证表单
  let isValid = true;

  // 验证邮箱
  if (!form.value.email) {
    errors.value.email = "You need to enter an email address.";
    isValid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(form.value.email)) {
    errors.value.email = "Entered value needs to be an email address.";
    isValid = false;
  }

  // 验证密码
  if (!form.value.password) {
    errors.value.password = "The Password Is Incorrect, Check Again";
    isValid = false;
  } else if (form.value.password.length < 6) {
    errors.value.password = "Password must be at least 6 characters";
    isValid = false;
  } else if (form.value.password !== form.value.confirmPassword) {
    errors.value.password = "You Input Two Different Passwords";
    isValid = false;
  }

  if (!isValid) return;

  // 这里应该是实际的注册API调用
  // 模拟成功注册
  registerSuccess.value = true;
};
</script>

<style scoped>
/* 可以添加组件特定的样式 */
</style>