<template>
  <div class="currency-input-container">
    <label v-if="label" :for="inputId" class="input-label">{{ label }}</label>

    <div class="input-wrapper" ref="inputWrapperRef">
      <input
        :id="inputId"
        type="number"
        :placeholder="placeholder"
        class="input-box"
        :value="modelValue"
        @input="updateAmount"
      />

      <div class="unit-display" @click="toggleDropdown">
        <span class="unit-text">{{ selectedUnit }}</span>
        <span class="unit-arrow" :class="{ 'is-open': isOpen }"></span>
      </div>
    </div>

    <ul v-if="isOpen" class="unit-list" :style="{ width: inputWrapperWidth + 'px' }">
      <li
        v-for="unit in availableUnits"
        :key="unit"
        @click="selectUnit(unit)"
        class="unit-item"
      >
        {{ unit }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: '金额',
  },
  inputId: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '请输入金额',
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  unitValue: {
    type: String,
    default: 'USD',
  },
});

const emit = defineEmits(['update:modelValue', 'update:unitValue']);

const availableUnits = ['USD', 'AED'];
const selectedUnit = ref(props.unitValue);
const isOpen = ref(false);
const inputWrapperRef = ref(null);
const inputWrapperWidth = ref(0);

watch(
  () => props.unitValue,
  (newValue) => {
    selectedUnit.value = newValue;
  }
);

const updateAmount = (event) => {
  emit('update:modelValue', event.target.value);
};

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectUnit = (unit) => {
  selectedUnit.value = unit;
  emit('update:unitValue', unit);
  isOpen.value = false;
};

const updateWidth = () => {
  if (inputWrapperRef.value) {
    inputWrapperWidth.value = inputWrapperRef.value.offsetWidth;
  }
};

const handleClickOutside = (event) => {
  if (inputWrapperRef.value && !inputWrapperRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  updateWidth();
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.currency-input-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
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
  position: relative;
  height: 40px;
}

.input-wrapper:focus-within {
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.input-box {
  flex-grow: 1;
  padding: 8px 12px;
  border: none;
  outline: none;
  font-size: 16px;
}

.unit-display {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  border-left: 1px solid #ccc;
  background-color: #f0f0f0;
  cursor: pointer;
}

.unit-text {
  font-size: 14px;
  user-select: none;
}

.unit-arrow {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-right: 2px solid #555;
  border-bottom: 2px solid #555;
  transform: rotate(45deg);
  transition: transform 0.3s;
  margin-left: 4px;
}

.unit-arrow.is-open {
  transform: rotate(225deg);
}

.unit-list {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 4px;
  list-style: none;
  padding: 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  z-index: 10;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.unit-item {
  padding: 8px 12px;
  cursor: pointer;
  white-space: nowrap;
}

.unit-item:hover {
  background-color: #f0f0f0;
}
</style>