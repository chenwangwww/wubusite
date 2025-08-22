<template>
  <button
    class="countdown-button"
    :disabled="isCounting"
    @click="handleClick"
  >
    <template v-if="isCounting">
      {{ countdownTitle.replace('{s}', countdown) }}
    </template>
    <template v-else>
      {{ buttonText }}
    </template>
  </button>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  // 按钮的正常状态标题
  buttonText: {
    type: String,
    required: true,
  },
  // 倒计时状态的标题，使用 {s} 作为占位符
  countdownTitle: {
    type: String,
    default: '请等待 {s} 秒',
  },
  // 新增 prop，用于从父组件指定倒计时时长
  seconds: {
    type: Number,
    default: 60,
  }
});

const emit = defineEmits(['click', 'countdown-finished']);

const isCounting = ref(false);
const countdown = ref(0);
let timer = null;

const handleClick = () => {
  // 触发父组件的点击事件，并将一个回调函数作为参数传入
  emit('click', startCountdown);
};

const startCountdown = () => {
  // 如果已经在倒计时，则直接返回
  if (isCounting.value) {
    return;
  }
  
  isCounting.value = true;
  countdown.value = props.seconds;

  timer = setInterval(() => {
    countdown.value--;

    if (countdown.value <= 0) {
      clearInterval(timer);
      isCounting.value = false;
      // 在倒计时结束时触发事件
      emit('countdown-finished');
    }
  }, 1000);
};
</script>

<style scoped>
.countdown-button {
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  border: 1px solid #FF7545;
  background-color: #FF7545;
  color: white;
  transition: background-color 0.3s, opacity 0.3s;
}

.countdown-button:hover:not(:disabled) {
  background-color: #bd4e29;
}

.countdown-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: #6c757d;
  border-color: #6c757d;
}
</style>