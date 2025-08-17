<template>
  <Header />
  <!-- 第一部分：可信的加密货币经纪服务 -->
  <section
    class="2xl:container mx-auto flex flex-col-reverse md:flex-row justify-center items-center gap-x-[2.5rem] p-[1.5rem] md:px-[7.5rem]">
    <img :src="secure1Image" alt="Trusted cryptocurrency service" class="md:w-[30rem] w-full" />
    <div class="text-[#202326] md:w-[34rem] w-full">
      <h4 class="md:text-[3rem] text-[1.75rem] font-[700] mb-[1.75rem]">A trusted cryptocurrency brokerage service.</h4>
      <div class="md:text-[1.5rem] text-[1rem] leading-[2rem]">
        We are the go-to platform for individuals and businesses to securely
        buy, sell, and manage cryptocurrencies.
      </div>
    </div>
  </section>

  <!-- 第二部分：专业的加密货币经纪商 -->
  <div class="bg-[#FFFBF8]">
    <section
      class="2xl:container mx-auto flex flex-col md:flex-row justify-center items-center gap-x-[2.5rem] p-[1.5rem] md:px-[7.5rem]">
      <div class="text-[#202326] md:w-[34rem] w-full">
        <h4 class="md:text-[3rem] text-[1.75rem] font-[700] mb-[1.75rem]">We stand apart as a specialized cryptocurrency
          broker.</h4>
        <div class="md:text-[1.5rem] text-[1rem] leading-[2rem]">
          As the cryptocurrency company, WUBU proudly
          sets the standard for transparency, strong risk management, and top-level security measures for all users.
        </div>
      </div>
      <img :src="secure2Image" alt="Specialized cryptocurrency broker" class="md:w-[30rem] w-full" />
    </section>
  </div>

  <!-- 第三部分：与社区合作 -->
  <section ref="securitySection"
    class="2xl:container mx-auto flex flex-col-reverse md:flex-row justify-center items-center gap-x-[2.5rem] p-[1.5rem] md:px-[7.5rem]">
    <img :src="secure3Image" alt="Community collaboration" class="md:w-[30rem] w-full" />
    <div class="text-[#202326] w-[34rem] w-full">
      <h4 class="md:text-[3rem] text-[1.75rem] font-[700] mb-[1.75rem]">
        We collaborate with the community to continuously make progress.
      </h4>
      <div class="md:text-[1.5rem] text-[1rem] leading-[2rem]">
        We recognize the critical role of security research in protecting our
        community. That's why we offer rewards through our Bug Bounty program for the responsible reporting of
        security vulnerabilities.
      </div>
    </div>
  </section>
  <Footer />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import secure1Image from '@/assets/images/secure1.png';
import secure2Image from '@/assets/images/secure2.png';
import secure3Image from '@/assets/images/secure3.png';

// 使用 ref 引用需要动画处理的元素
const securitySection = ref(null);

// 动画处理函数
const setupAnimation = () => {
  if (!securitySection.value) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate__animated', 'animate__fadeInUp');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(securitySection.value);
};

onMounted(() => {
  // 初始化动画
  setupAnimation();

});
</script>

<style scoped>
/* 可以在这里添加组件特定的样式 */
</style>