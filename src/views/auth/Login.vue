<template>
  <Header />
  <section
    class="mx-auto 2xl:container mt-[3.3125rem] w-full h-[48.75rem] md:px-[7.5rem] px-[1.5rem] flex md:justify-between justify-center items-end pb-[5.0rem]"
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

    <!-- 登录表单 -->
    <div class="py-[2.0625rem] px-[1.625rem] rounded-[1.25rem] shadow-[0_4px_20px_0px_rgba(0,0,0,0.1)] h-[43.75rem]">
      <h2 class="text-[#202326] md:text-[2.5rem] text-[1.375rem] font-[800] mb-[0.75rem]">Login</h2>
      
      <!-- 错误提示 -->
      <div v-if="apiError" class="mb-[1.25rem] text-[0.875rem] text-red-500">
        {{ apiError }}
      </div>

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

        <!-- 忘记密码链接 -->
        <div class="text-[#FF7545] text-[1.0rem] font-[700] mt-[0.75rem] mb-[1.875rem] text-right">
          <router-link to="/password/reset">forgot password?</router-link>
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
});

// 错误信息
const errors = ref({
  email: '',
  password: ''
});

// API错误信息
const apiError = ref('');

// 清除错误
const clearError = (field) => {
  errors.value[field] = '';
  apiError.value = '';
};

// 表单提交
const handleSubmit = async () => {
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
  }

  if (!isValid) return;

  try {
    // 这里应该是实际的登录API调用
    // const response = await authService.login(form.value);
    
    // 模拟成功登录
    // if (response.success) {
      router.push('/home'); // 登录成功后跳转到仪表盘
    // } else {
    //   apiError.value = response.message || "Login failed";
    // }
  } catch (error) {
    apiError.value = "An error occurred during login. Please try again.";
    console.error("Login error:", error);
  }
};

</script>

<style scoped>
/* 可以添加组件特定的样式 */
.wuBuTip {
  border-color: #e5e7eb;
}

.wuBuTip:focus {
  outline: none;
  border-color: #FF7545;
  box-shadow: 0 0 0 2px rgba(255, 117, 69, 0.2);
}
</style>