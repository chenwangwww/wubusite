<template>
  <Header />
  <section class="bg-[#FFFCFB] flex flex-col md:flex-row md:justify-between justify-center md:gap-x-10">
    <div class="pt-8 px-8 bg-white shadow-[0_4px_20px_0_rgba(0,0,0,0.1)] md:inline-block hidden">
      <LeftSide />
    </div>
    <div class="block md:hidden py-3 pl-8 pr-7 bg-white shadow-[0_4px_20px_0_rgba(0,0,0,0.1)]">
      <MobileSidebar />
    </div>
    <main class="w-full">
      <RouterView />
    </main>
  </section>
  <!-- <Footer /> -->
</template>

<script setup>
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import LeftSide from './components/LeftSide.vue';
import MobileSidebar from './components/MobileSidebar.vue';
</script>