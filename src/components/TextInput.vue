<template>
  <div class="input-container">
    <label v-if="label" :for="inputId" class="input-label">{{ label }}</label>

    <div class="input-wrapper">
      <div v-if="$slots.prefix" class="input-prefix">
        <slot name="prefix"></slot>
      </div>

      <input
        :id="inputId"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="text-input-box"
      />

      <div v-if="$slots.suffix" class="input-suffix">
        <slot name="suffix"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, useSlots } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: '输入框',
  },
  inputId: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '请输入...',
  },
  type: {
    type: String,
    default: 'text',
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

// 使用 useSlots() 来获取插槽信息
const $slots = useSlots();
</script>

<style scoped>
.input-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.input-label {
  font-size: 14px;
  color: #555;
  margin-bottom: 2px;
}

.input-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
}

.input-wrapper:focus-within {
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.input-prefix,
.input-suffix {
  padding: 8px 12px;
  color: #888;
  background-color: #f7f7f7;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}

.input-prefix {
  border-right: 1px solid #e0e0e0;
}

.input-suffix {
  border-left: 1px solid #e0e0e0;
}

.text-input-box {
  flex-grow: 1; /* 让输入框占据中间所有剩余空间 */
  padding: 6px 12px;
  border: none;
  outline: none;
  font-size: 16px;
}
</style>