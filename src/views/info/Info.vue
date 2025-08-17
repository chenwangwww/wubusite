<template>
  <Header />
  <iframe style="width: calc(100% - 2rem);margin-left: 1rem;margin-right: 1rem;height: calc(100vh - 4.875rem);"
    :src="currentPopupUrl"></iframe>
    <Footer />
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';

const currentPopupUrl = ref('');
const route = useRoute()

watch(
  () => route.query.name,
  (newName, oldName) => {
    console.log('name 变化了:', { old: oldName, new: newName });
    currentPopupUrl.value = `/html/${route.query.name}.html`;
  }
);

onMounted(()=>{
  currentPopupUrl.value = `/html/${route.query.name}.html`;
})
</script>