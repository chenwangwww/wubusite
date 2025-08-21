<template>
  <div class="radio-button-container">
    <label class="radio-label" @click="handleClick">
      <input
        type="radio"
        :checked="modelValue === true"
        class="hidden-radio"
      />
      <span class="custom-radio"></span>
      <span class="radio-title">{{ label }}</span>
    </label>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

// 处理点击事件，切换选中状态
const handleClick = () => {
  // 阻止默认行为，防止与原生 input 的行为冲突
  event.preventDefault(); 
  // 切换 modelValue 的布尔值
  emit('update:modelValue', !props.modelValue);
};
</script>

<style scoped>
.radio-button-container {
  display: inline-block;
  user-select: none;
}

.radio-label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.hidden-radio {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.custom-radio {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #a0a0a0;
  border-radius: 50%;
  position: relative;
  transition: border-color 0.2s ease-in-out;
}

.hidden-radio:checked + .custom-radio {
  border-color: #007bff;
}

.hidden-radio:checked + .custom-radio::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  background-color: #007bff;
  border-radius: 50%;
}

.radio-title {
  font-size: 14px;
  color: #333;
  margin-left: 8px;
}

.hidden-radio:focus + .custom-radio {
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}
</style>