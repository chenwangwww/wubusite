<template>
  <Header />
  <div class="bg-[#FFFBF8]">
    <section
      class="2xl:container mx-auto grid md:grid-cols-3 grid-cols-1 md:py-[7.5rem] py-[2.5rem] md:px-[7.5rem] px-[1.5rem] text-center md:gap-y-[6rem] gap-y-[4rem]"
      ref="wubuabout4">
      <h2 class="font-bold md:text-[2.5rem] text-[1.5rem] md:leading-[3rem] leading-[2rem] md:col-span-3">
        BOARD OF DIRECTORS
      </h2>

      <TeamMember name="TARIQ ABU RAGHEB" position="CEO" />
      <TeamMember name="YOUCUN CHEN" position="CFO" />
      <TeamMember name="JINCUN CHEN" position="NON-EXECUTIVE DIRECTOR" :smaller="true" />

      <h2 class="font-bold md:text-[2.5rem] text-[1.5rem] md:leading-[3rem] leading-[2rem] md:col-span-3">
        SENIOR MANAGEMENT TEAM
      </h2>

      <TeamMember name="XIAO WU" position="CRO" />
      <TeamMember name="MOATAZ MUSTAFA" position="CO/MLRO" />
      <TeamMember name="XINYAO SUN" position="CISO" />
      <TeamMember name="SHUYI ZHANG" position="DPO" full-width />
    </section>
  </div>
  <Footer />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import TeamMember from './TeamMember.vue';
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';

const wubuabout4 = ref(null);

onMounted(() => {
  // 假设 bindAnimate 函数在 main.js 中已全局定义
  if (window.bindAnimate) {
    window.bindAnimate('wubuabout4', 'wubuabout4', 'animate__rotateIn');
  }
});
</script>

<style scoped>

</style>