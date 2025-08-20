<template>
  <Header />
  <section
    class="mx-auto 2xl:container mt-[3.3125rem] w-full h-[48.75rem] md:px-[7.5rem] px-[1.5rem] flex md:justify-between justify-center items-center pb-[5.0rem]">
    <!-- 左侧内容 -->
    <div class="md:flex hidden flex-col w-full h-full justify-center items-center">
      <h4 class="text-[#FF7545] text-[2.25rem] font-[800] mb-[0.75rem]">Trade with confidence</h4>
      <p class="text-[1.25rem] text-[#202326] w-[24.375rem] mb-[2.6875rem]">
        Your funds are always backed 1:1 on WUBU with our regularly published audits
        on our Proof of Reserves
      </p>
      <img src="@/assets/images/registerFlag.png" alt="Trade with confidence" class="w-[30.4375rem]">
    </div>

    <!-- 动态表单 -->
    <component :is="authRequired ? AuthenticatorForm : LoginForm" :form="formData" :errors="errors"
      :api-error="apiError" @submit="handleSubmit" @clear-error="clearError"
      class="py-[2.0625rem] px-[1.625rem] rounded-[1.25rem] shadow-[0_4px_20px_0px_rgba(0,0,0,0.1)] h-[43.75rem]" />
  </section>
  <Footer />
</template>

<script setup>
import { ref } from 'vue';
import * as apiAuth from '@/api/auth.js'
import { useRouter } from 'vue-router';
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import LoginForm from './components/LoginForm.vue';
import AuthenticatorForm from './components/AuthenticatorForm.vue';

const router = useRouter();
const authRequired = ref(false); // 根据后端返回的auth值设置

// 表单数据
const formData = ref({
  email: '',
  password: '',
  code: '',
});

// 错误信息
const errors = ref({});
const apiError = ref('');

// 清除错误
const clearError = (field) => {
  errors.value[field] = '';
  apiError.value = '';
};


// 表单提交
const handleSubmit = async (form) => {
  if (authRequired.value) {
    // 验证验证码
    if (!form.code) {
      errors.value.code = "Please enter your authenticator code";
      return;
    } else if (!/^\d{6}$/.test(form.code)) {
      errors.value.code = "Code must be 6 digits";
      return;
    }

    // 调用验证API
    try {
      const datas = { email: "smb@gmail.com", password: "123456" }
      const result = await apiAuth.loginApi(datas)
      if (result.code == 0) {
        console.log("data::", result.data)
        router.push('/home');
      }
    } catch (error) {
      apiError.value = "An error occurred during verification";
    }
  } else {
    // 原始登录逻辑
    let isValid = true;

    if (!form.email) {
      errors.value.email = "Email is required";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      errors.value.email = "Invalid email format";
      isValid = false;
    }

    if (!form.password) {
      errors.value.password = "Password is required";
      isValid = false;
    } else if (form.password.length < 6) {
      errors.value.password = "Password too short";
      isValid = false;
    }

    if (!isValid) return;

    try {
      // 模拟API调用返回需要2FA
      // const response = await authService.login(form);
      // if (response.authRequired) {
      authRequired.value = true;
      formData.value = { ...formData.value, ...form };
      // } else {
      //   router.push('/home');
      // }
    } catch (error) {
      apiError.value = "Login failed. Please try again.";
    }
  }
};
</script>