<script setup>
import { useUserStore } from '@/stores/user'
import { onBeforeMount } from 'vue';

const userStore = useUserStore()
onBeforeMount(() => {
  userStore.initializeFromStorage()
})
</script>

<template>
  <router-view />
</template>

<style scoped>
</style>
