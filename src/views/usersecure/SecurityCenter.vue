<template>
  <section class="mt-9 md:ml-16 md:mr-8 mx-4 md:px-16 px-3 pb-8 bg-white shadow-[0_4px_20px_0px_rgba(0,0,0,0.1)] ">
    <div class="py-8 flex gap-x-8 items-center">
      <span class=" font-bold text-2xl">Change Password</span>
    </div>
    <div class="flex mx-6 flex-col gap-y-4">
      <TextInput inputId="password-input" label="Current Password" placeholder="Enter current password"
        v-model="password" />
      <TextInput inputId="newPassword-input" label="New Password" placeholder="Enter New password"
        v-model="newPassword" />
      <TextInput inputId="ConfirmPwd-input" label="Confirm New Password" placeholder="confirm new password"
        v-model="ConfirmPwd" />
      <div class="grid grid-cols-3 gap-x-3">
        <div class="col-span-2">
          <TextInput inputId="codecto-input" label="Email Code" placeholder="confirm code" v-model="code" />
        </div>
        <div class="col-span-1 flex items-end">
          <CountdownButton class="md:!py-3 !py-2" button-text="Send" countdown-title="{s}s" :seconds="60"
            @click="sendCode" />
        </div>
      </div>
    </div>

    <div
      class="bg-[#FF7545] rounded-lg h-[2.75rem] md:h-[3.5rem] flex items-center justify-center cursor-pointer my-4 mx-4"
      @click="handlePwd">
      <div class="text-white text-base font-semibold ">Submit</div>
    </div>
  </section>
  <section class="mt-9 md:ml-16 md:mr-8 mx-4 md:px-16 px-3 pb-8 bg-white shadow-[0_4px_20px_0px_rgba(0,0,0,0.1)] ">
    <div class="py-8 flex gap-x-8 items-center">
      <span class=" font-bold text-2xl">Two-Factor Authorization</span>
    </div>
    <div class="flex gap-x-8 items-center mb-4">
      <span class=" text-lg">If our 2FA is enabled, we will require from you every time when login to confirm
        a code which we will send to your email address.</span>
    </div>
    <RadioButton v-model="isAgreed" label="Enable Two-Factor Authorization" class="font-semibold text-base"
      @update:modelValue="handleChange" />
    <div ref="imgContainer" class="my-2 flex justify-center items-center"></div>

    <div
      class="bg-[#FF7545] rounded-lg h-[2.75rem] md:h-[3.5rem] flex items-center justify-center cursor-pointer my-4 mx-4">
      <div class="text-white text-base font-semibold ">Save settings</div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import TextInput from '../../components/TextInput.vue';
import RadioButton from '../../components/RadioButton.vue';
import { useRouter } from 'vue-router';
import CountdownButton from '../../components/CountdownButton.vue'; // Make sure the path is correct
import { useUserStore } from '@/stores/user'
import * as apiAuth from '@/api/auth.js'
import * as apiMember from '@/api/member.js'
import QRCode from 'qrcodejs2-fix';

const password = ref(null);
const newPassword = ref(null);
const ConfirmPwd = ref(null);
const code = ref(null);
const userStore = useUserStore()

const isAgreed = ref(false);
const imgContainer = ref(null);

const router = useRouter()

const generateCode = (url) => {
  if (imgContainer.value) {
    imgContainer.value.innerHTML = "";
    new QRCode(imgContainer.value, {
      text: url,
      width: 200,
      height: 200,
      correctLevel: 3,
    });
  }
};

const handleChange = async (newVal) => {
  console.log('选中状态变化:', newVal)
  if (newVal) {
    const result = await apiMember.enableOTPApi()
    if (result.code == 0) {
      window.showAlert('enable Two-Factor Authorization')
      const result2 = await apiMember.getOTPSetupApi()
      if (result2.code == 0) {
        generateCode(result2.data.qrCodeUrl)
      }
    }
  } else {
    const result = await apiMember.disableOTPApi()
    if (result.code == 0) {
      window.showAlert('disable Two-Factor Authorization')
      imgContainer.value.innerHTML = "";

    }
  }
}

const handlePwd = async () => {
  if (newPassword.value !== ConfirmPwd.value) {
    window.showAlert('Password confirmation does not match');
    return
  }
  try {
    const result = await apiMember.updatePwdApi({
      'code': code.value,
      'password': newPassword.value, // Pass the new password
    });

    if (result.code == 0) {
      window.showAlert('Password updated.');
    } else {
      window.showAlert(result.msg || 'Password reset failed.');
    }
  } catch (error) {
    window.showAlert("Failed to update password. Please try again.");
  }
}

const sendCode = async (startCountdownCallback) => {

  try {
    const result = await apiAuth.sendCodeApi({ 'email': userStore.email });
    if (result.code == 0) {
      startCountdownCallback();
      window.showAlert('send email successful!');
    }
  } catch (error) {
    window.showAlert("Failed to send email. Please try again.");
  }
};
</script>