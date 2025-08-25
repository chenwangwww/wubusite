<template>
  <div class="py-8 flex gap-x-8 items-center">
    <img @click="goBack" src="@/assets//icons/dashboard/arrow-left.svg" class="w-8" />
    <span class=" font-bold text-2xl">{{ title }}</span>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const props = defineProps({
  title: {
    default: '',
    type: String,
  }
})

const router = useRouter()
const goBack = () => {
  router.back()
}
</script>