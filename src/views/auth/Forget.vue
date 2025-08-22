<template>
  <Header />
  <section
    class="mx-auto 2xl:container mt-[3.3125rem] w-full h-[48.75rem] md:px-[7.5rem] px-[1.5rem] flex md:justify-between justify-center items-end pb-[5.0rem]">
    <div class="md:flex hidden flex-col w-full h-full justify-center items-center">
      <h4 class="text-[#FF7545] text-[2.25rem] font-[800] mb-[0.75rem]">Trade with confidence</h4>
      <p class="text-[1.25rem] text-[#202326] w-[24.375rem] mb-[2.6875rem]">
        Your funds are always backed 1:1 on WUBU with our regularly published audits on our Proof of Reserves
      </p>
      <img src="@/assets/images/registerFlag.png" alt="Trade confidence illustration" class="w-[30.4375rem]" />
    </div>

    <div class="py-[2.0625rem] px-[1.625rem] rounded-[1.25rem] shadow-[0_4px_20px_0px_rgba(0,0,0,0.1)] h-[43.75rem]">
      <h2 class="text-[#202326] md:text-[2.5rem] text-[1.375rem] font-[800] mb-[0.75rem]">Reset Password</h2>

      <form @submit.prevent="handleSubmit">
        <label class="text-[1.25rem] font-[600]">Email Address</label><br />
        <div class="mt-[0.5rem]"></div>
        <input ref="emailInput" required type="email" v-model="email" @input="validateEmail"
          class="wuBuTip md:w-[33.0rem] border rounded-2xl py-[0.75rem] px-[1.5rem] text-[1.25rem]" />
        <div class="mb-[1.25rem] text-[0.625rem] text-red-400">{{ emailError }}</div>

        <label class="text-[1.25rem] font-[600]">Verification Code</label><br />
        <div class="mt-[0.5rem]"></div>
        <div class="relative flex items-center gap-x-2">
          <input required type="text" v-model="verificationCode"
            class="w-full border rounded-2xl py-[0.75rem] px-[1.5rem] text-[1.25rem]" />
          <CountdownButton class="md:!py-2 !py-3" button-text="Send" countdown-title="{s}s" :seconds="60"
            @click="sendCode" />
        </div>
        
        <label class="text-[1.25rem] font-[600] mt-[1.25rem] block">New Password</label><br />
        <div class="mt-[0.5rem]"></div>
        <input required type="password" v-model="password"
          class="wuBuTip md:w-[33.0rem] border rounded-2xl py-[0.75rem] px-[1.5rem] text-[1.25rem]" />
        
        <label class="text-[1.25rem] font-[600] mt-[1.25rem] block">Confirm Password</label><br />
        <div class="mt-[0.5rem]"></div>
        <input required type="password" v-model="confirmPassword" @input="validatePasswordMatch"
          class="wuBuTip md:w-[33.0rem] border rounded-2xl py-[0.75rem] px-[1.5rem] text-[1.25rem]" />
        <div class="mb-[1.25rem] text-[0.625rem] text-red-400">{{ passwordError }}</div>

        <div class="text-[#FF7545] text-[1.0rem] font-[700] mt-[0.75rem] mb-[1.875rem] text-right">
          <router-link to="/login">Already have access?</router-link>
        </div>

        <button type="submit"
          class="text-white bg-[#FF7545] md:w-[33.4375rem] w-full h-[3.75rem] rounded-[2.5rem] mt-[1.875rem]">
          Reset
        </button>
      </form>

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
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import CountdownButton from '../../components/CountdownButton.vue'; // Make sure the path is correct
import * as apiAuth from '@/api/auth.js'
import * as apiMember from '@/api/member.js'
import { useRouter } from 'vue-router';

const email = ref('');
const emailError = ref('');
const verificationCode = ref('');
const password = ref('');
const confirmPassword = ref('');
const passwordError = ref('');
const router = useRouter()
const emailInput = ref(null);

const validateEmail = () => {
  if (!emailInput.value) return;

  if (emailInput.value.validity.valueMissing) {
    emailError.value = "请输入邮箱地址";
  } else if (emailInput.value.validity.typeMismatch) {
    emailError.value = "请输入有效的邮箱地址";
  } else {
    emailError.value = "";
  }
};

const validatePasswordMatch = () => {
  if (password.value !== confirmPassword.value) {
    passwordError.value = "两次输入的密码不一致";
  } else {
    passwordError.value = "";
  }
};

const sendCode = async (startCountdownCallback) => {
  validateEmail();

  if (emailError.value) {
    console.error("Please enter a valid email address first.");
    return;
  }

  try {
    const result = await apiAuth.sendCodeApi({ 'email': email.value });
    if (result.code == 0) {
      startCountdownCallback();
      window.showAlert('send email successful!');
    }
  } catch (error) {
    window.showAlert("Failed to send email. Please try again.");
  }
};

const handleSubmit = async (event) => {
  validateEmail();
  validatePasswordMatch();

  // Prevent form submission if there are validation errors
  if (emailError.value || passwordError.value) {
    return;
  }

  try {
    const result = await apiMember.resetPwdApi({
      'email': email.value,
      'code': verificationCode.value,
      'password': password.value, // Pass the new password
    });
console.log(result);

    if (result.code == 0) {
      // window.showAlert('Password reset successful!');
      // You can redirect to the login page here
      router.push('/login');
    } else {
      window.showAlert(result.msg || 'Password reset failed.');
    }
  } catch (error) {
    window.showAlert("Failed to reset password. Please try again.");
  }
};
</script>

<style scoped>
/* You can add styles here if needed to adjust the layout */
</style>