<template>
  <div class="flex gap-3 relative">
    <div
      v-for="(digit, index) in digits"
      :key="index"
      class="w-20 h-24 bg-gray-100 border-2 rounded-xl flex items-center justify-center text-3xl font-bold transition-all duration-200 cursor-text"
      :class="{
        'border-orange-500 ring-2 ring-orange-200': activeIndex === index,
        'border-gray-300': activeIndex !== index && !digit,
        'border-green-500': digit && activeIndex !== index
      }"
      @click="focusInput(index)"
    >
      {{ digit }}
      <!-- 光标指示器 -->
      <div 
        v-if="activeIndex === index && !digit"
        class="w-1 h-8 bg-orange-500 animate-pulse ml-1"
      ></div>
    </div>
    
    <!-- 隐藏的输入框 -->
    <input
      ref="hiddenInput"
      type="text"
      class="absolute opacity-0 w-0 h-0"
      v-model="inputValue"
      @input="handleInput"
      @keydown="handleKeyDown"
      @blur="activeIndex = -1"
      maxlength="6"
      inputmode="numeric"
      pattern="[0-9]*"
    />
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted } from 'vue'

const digits = ref(['', '', '', '', '', ''])
const activeIndex = ref(0)
const hiddenInput = ref(null)
const inputValue = ref('')

// 聚焦到指定索引的输入框
const focusInput = (index) => {
  activeIndex.value = index
  nextTick(() => {
    hiddenInput.value?.focus()
    // 设置光标位置到末尾
    hiddenInput.value.selectionStart = hiddenInput.value.selectionEnd = inputValue.value.length
  })
}

// 处理输入
const handleInput = (event) => {
  // 只允许数字输入
  const newValue = event.target.value.replace(/[^0-9]/g, '')
  
  // 如果输入长度超过4，截断
  if (newValue.length > 6) {
    inputValue.value = newValue.slice(0, 6)
    return
  }
  
  inputValue.value = newValue
  
  // 更新digits数组
  for (let i = 0; i < 6; i++) {
    digits.value[i] = newValue[i] || ''
  }
  
  // 自动前进到下一个输入框
  if (newValue.length < 6 && newValue.length > activeIndex.value) {
    activeIndex.value = newValue.length
  }
  
  // 如果输入完成，触发完成事件
  if (newValue.length === 6) {
    emit('complete', newValue)
  }
  
  emit('change', newValue)
}

// 处理键盘事件
const handleKeyDown = (event) => {
  if (event.key === 'Backspace') {
    // 如果当前有内容，删除当前内容
    if (inputValue.value.length > 0) {
      const newValue = inputValue.value.slice(0, -1)
      inputValue.value = newValue
      
      // 更新digits数组
      for (let i = 0; i < 6; i++) {
        digits.value[i] = newValue[i] || ''
      }
      
      // 回退到上一个输入框
      if (activeIndex.value > 0) {
        activeIndex.value = Math.max(0, newValue.length)
      }
      
      emit('change', newValue)
      event.preventDefault()
    }
  } else if (event.key === 'ArrowLeft') {
    if (activeIndex.value > 0) {
      activeIndex.value--
      event.preventDefault()
    }
  } else if (event.key === 'ArrowRight') {
    if (activeIndex.value < 3 && activeIndex.value < inputValue.value.length) {
      activeIndex.value++
      event.preventDefault()
    }
  } else if (event.key === 'Delete') {
    // 处理Delete键
    if (inputValue.value.length > activeIndex.value) {
      const newValue = inputValue.value.slice(0, activeIndex.value) + inputValue.value.slice(activeIndex.value + 1)
      inputValue.value = newValue
      
      for (let i = 0; i < 6; i++) {
        digits.value[i] = newValue[i] || ''
      }
      
      emit('change', newValue)
      event.preventDefault()
    }
  }
}

// 监听activeIndex变化，自动聚焦
watch(activeIndex, (newIndex) => {
  if (newIndex >= 0) {
    nextTick(() => {
      hiddenInput.value?.focus()
      hiddenInput.value.selectionStart = hiddenInput.value.selectionEnd = inputValue.value.length
    })
  }
})

// 自动聚焦到第一个输入框
onMounted(() => {
  focusInput(0)
})

// 定义emit事件
const emit = defineEmits(['change', 'complete'])

// 暴露方法供父组件调用
defineExpose({
  clear: () => {
    digits.value = ['', '', '', '']
    inputValue.value = ''
    activeIndex.value = 0
    focusInput(0)
  },
  focus: () => {
    focusInput(0)
  },
  getValue: () => {
    return inputValue.value
  }
})
</script>

<style scoped>
/* 确保隐藏输入框不会影响布局 */
input {
  position: absolute;
  left: -9999px;
}
</style>