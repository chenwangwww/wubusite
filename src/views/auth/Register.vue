<template>
  <Header />

  <!-- 步骤指示器 -->
  <div class="justify-center gap-4 mb-8 mt-8 md:flex hidden">
    <div v-for="(step, index) in steps" :key="index" @click="currentStep > index && goToStep(index)" :class="{
      'bg-[#FF7545] text-white': currentStep === index,
      'bg-gray-200 cursor-pointer': currentStep > index,
      'bg-gray-100': currentStep < index
    }" class="px-4 py-2 rounded-full flex items-center">
      <span class="w-6 h-6 rounded-full bg-white text-[#FF7545] flex items-center justify-center mr-2"
        v-if="currentStep > index">✓</span>
      <span v-else class="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center mr-2">
        {{ index + 1 }}
      </span>
      {{ step.title }}
    </div>
  </div>

  <!-- 动态表单组件 -->
  <component :is="steps[currentStep].component" :form="formData" :errors="errors"
    :submit-success="submitStatus[currentStep]" @update="handleUpdate" @submit="handleStepSubmit"
    @show-terms="showTermsPopup = true" @hide-terms="showTermsPopup = false" />

  <!-- 条款弹窗 -->
  <TermsPopup v-if="showTermsPopup" @close="showTermsPopup = false" />

  <Footer />
</template>

<script setup>
import { ref, computed } from 'vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import RegisterForm from './components/RegisterStepOne.vue';
import ContactInfoForm from './components/RegisterStepTwo.vue';
import ServiceTypeForm from './components/RegisterStepThree.vue';
import RegisterStepSuccess from './components/RegisterStepSuccess.vue';
import TermsPopup from './components/TermsPopup.vue';
import * as apiAuth from '@/api/auth.js'
import * as apiMember from '@/api/member.js'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

// 步骤配置
const steps = [
  {
    title: 'Account',
    component: RegisterForm,
    fields: ['email', 'password', 'confirmPassword', 'agreeTerms']
  },
  {
    title: 'Contact',
    component: ContactInfoForm,
    fields: ['firstName', 'lastName', 'phoneNumber', 'companyName']
  },
  {
    title: 'Service Type',
    component: ServiceTypeForm,
    fields: ['serviceType']
  },
  {
    title: 'RegisterStepSuccess',
    component: RegisterStepSuccess,
  },
];

// 当前步骤
const currentStep = ref(0);
// 表单数据
const formData = ref({
  // 注册信息
  email: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false,
  verifyCode: '',

  // 服务类型
  serviceType: '',

  // 联系信息
  firstName: '',
  lastName: '',
  phoneNumber: '',
  companyName: ''
});

// 提交状态
const submitStatus = ref(steps.map(() => false));
// 错误信息
const errors = ref({});
// 条款弹窗状态
const showTermsPopup = ref(false);

// 处理字段更新
const handleUpdate = (field, value) => {

  formData.value[field] = value;
  clearError(field);
};

// 清除错误
const clearError = (field) => {
  if (errors.value[field]) {
    delete errors.value[field];
  }
};

// 步骤提交处理
const handleStepSubmit = async () => {
  // 验证当前步骤必填字段
  const currentFields = steps[currentStep.value].fields;

  let isValid = true;

  for (const field of currentFields) {
    if (field === 'agreeTerms') continue;

    if (!formData.value[field]) {
      errors.value[field] = getErrorMessage(field);
      isValid = false;
    } else if (field === 'email' && !/^\S+@\S+\.\S+$/.test(formData.value.email)) {
      errors.value.email = "Please enter a valid email address";
      isValid = false;
    } else if (field === 'password' && formData.value.password.length < 6) {
      errors.value.password = "Password must be at least 6 characters";
      isValid = false;
    } else if (field === 'confirmPassword' && formData.value.password !== formData.value.confirmPassword) {
      errors.value.confirmPassword = "Passwords do not match";
      isValid = false;
    } else if (field === 'phoneNumber' && !/^[0-9]{9}$/.test(formData.value.phoneNumber)) {
      errors.value.phoneNumber = "Please enter a valid UAE phone number (9 digits after +971)";
      isValid = false;
    }
  }
  if (!isValid) return;

  // 标记当前步骤为已完成
  submitStatus.value[currentStep.value] = true;
  console.log("currentStep:", currentStep.value, steps.length);

  // 如果是最后一步，提交所有数据
  if (currentStep.value === steps.length - 2) {
    await submitAllData();
  } else {
    // 否则进入下一步
    currentStep.value++;
  }
};

// 获取字段错误信息
const getErrorMessage = (field) => {
  const messages = {
    email: "Email is required",
    password: "Password is required",
    confirmPassword: "Please confirm your password",
    serviceType: "Please select a service type",
    firstName: "First name is required",
    lastName: "Last name is required",
    phoneNumber: "Phone number is required"
  };
  return messages[field] || "This field is required";
};

// 跳转到指定步骤
const goToStep = (stepIndex) => {
  // 只能跳转到已完成的步骤
  if (submitStatus.value[stepIndex] || stepIndex === 0) {
    currentStep.value = stepIndex;
  }
};

// 提交所有数据
const submitAllData = async () => {
  try {
    // 这里添加实际的API调用
    // await api.submitForm(formData.value);
    const result = await apiAuth.registerApi(formData.value)
    if (result.code == 0) {
      console.log("data::", result.data)
      userStore.loginSuccess(result.data);

      await apiMember.updateUserApi({
        ...formData.value, 
        company: formData.value.companyName, 
        mobile: formData.value.phoneNumber,
        firstname: formData.value.firstName,
        lastname: formData.value.lastName,
      })
      currentStep.value++;

    }
  } catch (error) {
    console.error('Submission error:', error);
    alert('There was an error submitting your data. Please try again.');
  }
};
</script>

<style scoped>
/* 步骤指示器动画 */
.step-indicator {
  transition: all 0.3s ease;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .step-indicator {
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
  }
}
</style>