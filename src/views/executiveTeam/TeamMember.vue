<template>
  <div :class="['text-center', { 'md:col-span-3 justify-self-center': fullWidth }]">
    <h4 class="text-[#202326] md:text-[1.5rem] text-[1rem] font-semibold">
      {{ name }}
    </h4>
    <p :class="['font-bold', positionSize]">
      {{ position }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  smaller: {
    type: Boolean,
    default: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  }
});


const positionSize = computed(() => {
  return props.smaller 
    ? 'md:text-[1.25rem] text-[1.0rem]' 
    : 'md:text-[2rem] text-[1.25rem]';
});
</script>