<template>
  <div class="date-picker-container" ref="containerRef">
    <label v-if="label" :for="inputId" class="date-picker-label">{{ label }}</label>

    <div class="date-input-wrapper">
      <input
        :id="inputId"
        type="text"
        :placeholder="placeholder"
        :value="formattedDate"
        class="date-input-box"
        @click="isOpen = !isOpen"
        readonly
      />
      <span class="date-icon" @click="isOpen = !isOpen">📅</span>
    </div>

    <div v-if="isOpen" class="calendar-panel">
      <div class="calendar-header">
        <span class="nav-arrow" @click="prevMonth">&lt;</span>
        <span class="month-year">{{ currentYear }} 年 {{ currentMonth + 1 }} 月</span>
        <span class="nav-arrow" @click="nextMonth">&gt;</span>
      </div>

      <div class="week-days">
        <span v-for="day in weekDays" :key="day">{{ day }}</span>
      </div>

      <div class="days-grid">
        <span
          v-for="day in daysInMonth"
          :key="day.date"
          :class="{ 'day-item': true, 'is-selected': day.isSelected, 'is-today': day.isToday }"
          @click="selectDate(day.date)"
        >
          {{ day.day }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted, onUnmounted, computed } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: '日期',
  },
  inputId: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '请选择日期',
  },
  modelValue: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const containerRef = ref(null);
const selectedDate = ref(props.modelValue ? new Date(props.modelValue) : null);
const today = new Date();
const currentMonth = ref(selectedDate.value ? selectedDate.value.getMonth() : today.getMonth());
const currentYear = ref(selectedDate.value ? selectedDate.value.getFullYear() : today.getFullYear());

const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

const formattedDate = computed(() => {
  if (selectedDate.value) {
    const year = selectedDate.value.getFullYear();
    const month = String(selectedDate.value.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.value.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  return '';
});

const daysInMonth = computed(() => {
  const numDays = new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
  const firstDay = new Date(currentYear.value, currentMonth.value, 1).getDay();
  const days = [];

  // 添加上个月的空白天
  for (let i = 0; i < firstDay; i++) {
    days.push({ day: '', date: null });
  }

  // 添加当月的天
  for (let i = 1; i <= numDays; i++) {
    const date = new Date(currentYear.value, currentMonth.value, i);
    days.push({
      day: i,
      date: date.toISOString().split('T')[0],
      isSelected: selectedDate.value && date.toDateString() === selectedDate.value.toDateString(),
      isToday: date.toDateString() === today.toDateString(),
    });
  }

  return days;
});

const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
};

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
};

const selectDate = (date) => {
  if (date) {
    selectedDate.value = new Date(date);
    emit('update:modelValue', date);
    isOpen.value = false;
  }
};

const handleClickOutside = (event) => {
  if (containerRef.value && !containerRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.date-picker-container {
  position: relative;
  display: inline-block;
  font-family: Arial, sans-serif;
}

.date-picker-label {
  font-size: 14px;
  color: #555;
  display: block;
  margin-bottom: 4px;
}

.date-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.date-input-box {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  padding-right: 36px;
  font-size: 16px;
}

.date-icon {
  position: absolute;
  right: 12px;
  cursor: pointer;
  font-size: 20px;
  user-select: none;
}

.calendar-panel {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 5px;
  width: 280px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 100;
  padding: 10px;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.nav-arrow {
  cursor: pointer;
  font-size: 20px;
  user-select: none;
  padding: 0 5px;
}

.month-year {
  font-weight: bold;
}

.week-days,
.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  gap: 5px;
}

.week-days span {
  font-weight: bold;
  color: #888;
}

.day-item {
  padding: 8px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.day-item:hover {
  background-color: #f0f0f0;
}

.day-item.is-today {
  border: 1px solid #007bff;
  background-color: #e6f7ff;
}

.day-item.is-selected {
  background-color: #007bff;
  color: #fff;
}
</style>