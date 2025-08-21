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
    <RadioButton v-model="isAgreed" label="Enable Two-Factor Authorization" class="font-semibold text-base" />
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

const password = ref(null);
const newPassword = ref(null);
const ConfirmPwd = ref(null);

const isAgreed = ref(false);

const router = useRouter()

const handlePwd = () => {
}
</script>