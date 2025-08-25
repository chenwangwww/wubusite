<template>
  <!-- <section class="mt-9 md:ml-16 md:mr-8 mx-4 md:px-16 px-3 bg-white shadow-[0_4px_20px_0px_rgba(0,0,0,0.1)]">
    <div class="py-8 flex gap-x-8 items-center w-full">
      <span class=" font-bold md:text-2xl text-lg">Verification - Email</span>
      <div class="ml-auto border-[#FF7545] text-[#FF7545] rounded-xl px-4 py-2 text-base font-semibold border-2">
        {{ confirmStatus }}
      </div>
    </div>
    <div>
      <TextInput inputId="email-input" label="Email" placeholder="Enter Email Address" v-model="email" />
    </div>
    <div class="my-4 pb-4">
      <CountdownButton class="w-full" buttonText="send verification - Email"
        countdownTitle="resend verification - Email ( {s} )" @click="sendVerificationCode"
        @countdown-finished="handleCountdownFinished" />
      <div v-show="showTip" class="mt-3 text-base text-[#FF7545] text-center">The verification link has been sent to
        your email. Please check your Email.</div>
    </div>
  </section> -->


  <section class="mt-9 md:ml-16 md:mr-8 mx-4 md:px-16 px-3 bg-white shadow-[0_4px_20px_0px_rgba(0,0,0,0.1)] pb-4">
    <div class="pt-8 pb-4 flex gap-x-8 items-center w-full">
      <span class=" font-bold md:text-2xl text-lg">Verification - Identify</span>
    </div>
    <!-- <div class="md:text-lg text-base">
      Some of the exchange directions may require you to confirm your identity or prove that the account you are paying
      is yours. Please attach the files below to submit to
      our review system.
    </div> -->
    <!-- <div class="pt-8 pb-4 flex gap-x-8 items-center w-full">
      <span class=" font-bold md:text-2xl text-lg">Upload Documents</span>
    </div> -->
    <!-- <div>
      <div class="grid grid-cols-2 gap-x-3 mb-4">
        <SelectInput :options="typeOptions" selectId="selectedType-selector" label="Document Type"
          placeholder="please select" v-model="selectedType" />
        <TextInput inputId="documentNumber-input" label="document number" placeholder="please input"
          v-model="documentNumber" />
      </div>
      <TextInput class="mb-4" inputId="addInfo-input" label="Additional information"
        placeholder="enter Additional information" v-model="addInfo" />
      <ImageUploader inputId="profile-file" label="Select file" @file-selected="handleImageSelected" />
      <p class="text-base text-[#5c5c5c]">Allowed file types: PNG, JPG, PDF | Max file size: 10 MB</p>
    </div> -->
    <!-- <div class="flex gap-[2.5rem] w-full my-4">
      <div
        class="flex-1 bg-[#FF7545] rounded-lg h-[2.75rem] md:h-[3.5rem] flex items-center justify-center cursor-pointer"
        @click="openPop">
        <div class="text-white font-lato text-base font-semibold leading-[3.875rem] whitespace-nowrap">Submit</div>
      </div>
    </div> -->
    <div>
      <div class="pt-8 pb-4 flex gap-x-8 items-center w-full">
        <span class=" font-bold md:text-2xl text-lg">Documents</span>
      </div>
      <DocumentList :documents="myDocuments" />
    </div>
  </section>
  <RegularPop
    v-if="showPop"
    title="Documents Submitted!"
    body-text="Your document has been successfully submitted and is awaiting review."
    confirm-text="Confirm"
    @confirm="handleConfirm"
  >
  </RegularPop>
</template>

<script setup>
import { ref } from 'vue';
import TextInput from '../../components/TextInput.vue';
import SelectInput from '../../components/SelectInput.vue';
import CountdownButton from '../../components/CountdownButton.vue';
import ImageUploader from '../../components/ImageUploader.vue';
import DocumentList from '../../components/DocumentList.vue';
import RegularPop from '../../components/RegularPop.vue';

const selectedType = ref(null)
const documentNumber = ref(null)
const addInfo = ref(null)
const typeOptions = ref([
  { value: '1', text: 'ID card(front)' },
  { value: '2', text: 'ID Card(Back)' },
  { value: '3', text: 'Passport' },
  { value: '4', text: 'Account Ownership' },
]);
const showPop = ref(false)

const myDocuments = ref([
  {
    'Document Type': '身份证',
    'Document Number': '1234567890',
    'Additional information': '无',
    'File': 'id_card.pdf',
    'Status': 'Verified',
    'Comment from Reviewer': '信息完整'
  },
  {
    'Document Type': '驾驶证',
    'Document Number': '9876543210',
    'Additional information': '需要更新',
    'File': 'driver_license.jpg',
    'Status': 'Under Review',
    'Comment from Reviewer': '等待审核'
  },
  {
    'Document Type': '护照',
    'Document Number': '4567891230',
    'Additional information': '紧急处理',
    'File': 'passport.png',
    'Status': 'Verification failed',
    'Comment from Reviewer': '照片模糊'
  },
  {
    'Document Type': '学生证',
    'Document Number': '1122334455',
    'Additional information': '无',
    'File': 'student_card.pdf',
    'Status': 'Verified',
    'Comment from Reviewer': '通过'
  },
]);

const email = ref(null)
const confirmStatus = ref('Unconfirmed')
const showTip = ref(false)

const openPop = () => {
  showPop.value = true
};

const handleConfirm = () => {
  showPop.value = false
};

const handleImageSelected = (file) => {
  console.log('选择的文件:', file);
  // 这里可以处理文件上传逻辑，例如使用 FormData
};

const sendVerificationCode = (startCountdownCallback) => {
  console.log('正在发送验证码...');

  // 模拟发送验证码的异步请求
  setTimeout(() => {
    console.log('验证码发送成功！');

    // 调用回调函数，使按钮进入倒计时状态
    startCountdownCallback();
    showTip.value = true
  }, 2000); // 模拟2秒的网络延迟
};

const handleCountdownFinished = () => {
  showTip.value = false
  console.log('倒计时结束，可以再次获取验证码了！');
};
</script>