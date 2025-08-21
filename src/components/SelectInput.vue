<template>
  <div class="custom-select-container">
    <label v-if="label" :for="selectId" class="select-label">{{ label }}</label>
    
    <div
      :id="selectId"
      class="select-box"
      @click="toggleDropdown"
      ref="selectBoxRef"
    >
      <span class="selected-text" :class="{ 'placeholder-text': !selectedValue }">
        {{ selectedValue ? getSelectedText(selectedValue) : placeholder }}
      </span>
      
      <span class="select-arrow" :class="{ 'is-open': isOpen }"></span>
    </div>
    
    <ul
      v-if="isOpen"
      class="options-list"
      :style="{ width: selectBoxWidth + 'px' }"
    >
      <li
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option)"
        class="option-item"
      >
        {{ option.text }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: '选项',
  },
  selectId: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  placeholder: {
    type: String,
    default: '请选择',
  },
  // 新增：接收父组件传来的 v-model 绑定值
  modelValue: {
    type: String,
    default: ''
  }
});

// 新增：定义要触发的事件
const emit = defineEmits(['update:modelValue']);

// 使用 ref 来管理内部状态
const selectedValue = ref(props.modelValue);

// 当 prop 变化时，同步到内部状态
watch(() => props.modelValue, (newValue) => {
  selectedValue.value = newValue;
});

// 当内部状态变化时，通过 emit 通知父组件
watch(selectedValue, (newValue) => {
  emit('update:modelValue', newValue);
});

const isOpen = ref(false);
const selectBoxRef = ref(null);
const selectBoxWidth = ref(0);

const getSelectedText = (value) => {
  const selectedOption = props.options.find(opt => opt.value === value);
  return selectedOption ? selectedOption.text : '';
};

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    updateDropdownWidth();
  }
};

const selectOption = (option) => {
  selectedValue.value = option.value;
  isOpen.value = false;
};

const updateDropdownWidth = () => {
  if (selectBoxRef.value) {
    selectBoxWidth.value = selectBoxRef.value.offsetWidth;
  }
};

const handleClickOutside = (event) => {
  if (selectBoxRef.value && !selectBoxRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  updateDropdownWidth();
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>


<style scoped>
.custom-select-container {
  position: relative;
  display: inline-block;
  width: 100%;
}

.select-label {
  font-size: 14px;
  color: #555;
  margin-bottom: 4px;
  display: block;
}

.select-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  position: relative;
  height: 38px; /* 统一高度，更美观 */
}

.select-box:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.selected-text {
  color: #333;
  user-select: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.placeholder-text {
  color: #999;
}

.select-arrow {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-right: 2px solid #555;
  border-bottom: 2px solid #555;
  transform: rotate(45deg);
  transition: transform 0.3s;
  margin-left: 8px;
}

.select-arrow.is-open {
  transform: rotate(225deg);
}

.options-list {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 4px;
  list-style: none;
  padding: 0;
  margin: 4px 0 0 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  z-index: 10;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  max-height: 200px;
  overflow-y: auto;
}

.option-item {
  padding: 8px 12px;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.option-item:hover {
  background-color: #f0f0f0;
}
</style>