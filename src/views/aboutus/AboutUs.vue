<template>
  <Header />
  <!-- 第一部分：关于WUBU -->
  <section class="2xl:container mx-auto flex flex-col-reverse md:flex-row justify-center items-center gap-x-[2.5rem] p-[1.5rem]">
    <img :src="about1Image" alt="About WUBU" class="md:w-[30rem] w-full" />
    <div class="text-[#202326] md:w-[34rem] w-full md:pl-[4rem]">
      <h4 class="md:text-[3rem] text-[1.75rem] font-[700] mb-[1.75rem]">About WUBU</h4>
      <div class="text-justify md:text-[1rem] text-[0.75rem] md:leading-[2rem] leading-[1.5rem]">
        WUBU is dedicated to fostering economic freedom by enabling fair
        participation in the financial system. Our mission is to enhance economic freedom for over 1 billion
        individuals. We are modernizing the traditional financial system by offering a reliable platform that
        simplifies engagement with crypto assets for both individuals and institutions. This includes features
        such as trading, safekeeping, spending, and providing rapid, no-cost global transfers.
        Additionally, we supply essential infrastructure for on-chain activities and support creators who align
        with our belief that on-chain is the future of online interactions. Together with the crypto community,
        we advocate for responsible regulations that ensure the benefits of cryptocurrency
        are accessible globally.
      </div>
    </div>
  </section>

  <!-- 第二部分：WUBU驱动加密经济 -->
  <div ref="about2Section" class="bg-[#FFFBF8]">
    <section class="2xl:container mx-auto flex flex-col md:flex-row justify-center items-center gap-x-[2.5rem] gap-y-[2.5rem] pt-[1.5rem] md:pb-[1.5rem] px-[1.5rem]">
      <div class="text-[#202326] md:w-[34rem] w-full">
        <h4 class="md:text-[3rem] text-[1.75rem] font-[700] mb-[1.75rem] md:leading-[3.5rem] leading-[2.5rem]">WUBU Drives The Cryptoeconomy.</h4>
        <div class="text-justify md:text-[1rem] text-[0.75rem] md:leading-[2rem] leading-[1.5rem]">
          People worldwide embark on their crypto journeys
          with WUBU.
          With the trust of 245,000 ecosystem partners across
          more than 100 countries, WUBU empowers users
          to invest, spend, save, earn, and utilize crypto
          securely and effortlessly.
        </div>
      </div>
      <img :src="about2Image" alt="WUBU Cryptoeconomy" class="md:w-[30rem] w-full" />
    </section>
  </div>

  <!-- 第三部分：WUBU优势 -->
  <div ref="about3Section" class="bg-[#FF7545]">
    <section class="2xl:container mx-auto grid md:grid-cols-2 grid-cols-1 gap-y-[6rem] text-center py-[1.5rem]">
      <div class="text-white">
        <div class="md:text-[1.2rem] text-[1.05rem] font-[700]">Global Market Leader</div>
        <div class="md:text-[1rem] text-[0.875rem] font-[500]">Trusted by millions worldwide for seamless trading solutions.</div>
      </div>
      <div class="text-white">
        <div class="md:text-[1.2rem] text-[1.05rem] font-[700]">⁠Unmatched Trading Volume</div>
        <div class="md:text-[1rem] text-[0.875rem] font-[500]">Empowering users with billions in quarterly transactions.</div>
      </div>
      <div class="text-white">
        <div class="md:text-[1.2rem] text-[1.05rem] font-[700]">Secure & Reliable Platform</div>
        <div class="md:text-[1rem] text-[0.875rem] font-[500]">Advanced security and compliance for peace of mind.</div>
      </div>
      <div class="text-white">
        <div class="md:text-[1.2rem] text-[1.05rem] font-[700]">⁠Innovation at Your Fingertips</div>
        <div class="md:text-[1rem] text-[0.875rem] font-[500]">Cutting-edge tools and analytics for smarter trading.</div>
      </div>
    </section>
  </div>

  <!-- 第四部分：免责声明和许可证 -->
  <div ref="about5Section" class="bg-[#FFFBF8]">
    <section class="2xl:container mx-auto grid grid-cols-1 text-center md:p-[7.5rem] p-[1.5rem] gap-y-[3rem]">
      <div class="text-black text-[1rem] text-justify">
        By accessing and utilizing this website (hereinafter referred to as the "Site"), you expressly acknowledge and
        agree to comply with WUBU's Terms of Service, branding guidelines, and all applicable rules and policies, as may
        be amended or updated periodically. All company names, product names, and service names appearing on this Site
        are provided solely for identification purposes and shall not be construed as endorsements of any kind.
        <br /><br />
        You further acknowledge that WUBU retains exclusive ownership of all trademarks, service marks, and related
        intellectual property associated with WUBU. Accordingly, you hereby agree not to reproduce, distribute, display,
        or otherwise use any content from this Site, including but not limited to WUBU's trademarks, for personal or
        commercial purposes without obtaining prior written authorization from WUBU.
        <br /><br />
        WUBU reserves the right, at its sole discretion, to review, monitor, and evaluate any use of its branding
        materials at any time. WUBU further retains the authority to terminate, restrict, or modify such use without
        prior notice and without incurring any liability.
      </div>
      <div>
        <h4 class="text-[#202326] md:text-[1.75rem] text-[1.5rem] font-bold mb-[2rem]">Virtual Assets License</h4>
        <div class="flex md:flex-row flex-col md:justify-between gap-y-[1.5rem] items-center text-[#202326] md:text-[1.5rem] text-[1rem] font-semibold">
          <p></p>
          <p>License from Virtual Assets Regulatory Authority (VARA) is currently under process.</p>
          <p></p>
        </div>
      </div>
    </section>
  </div>

  <Footer />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import about1Image from '@/assets/images/about1.png';
import about2Image from '@/assets/images/about2.png';
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';

// 使用 ref 替代原来的 ID
const about2Section = ref(null);
const about3Section = ref(null);
const about5Section = ref(null);

// 动画处理函数
const bindAnimate = (elementRef, animationClass) => {
  if (!elementRef.value) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate__animated', animationClass);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(elementRef.value);
};

onMounted(() => {
  // 初始化动画
  bindAnimate(about2Section, 'animate__flipInX');
  bindAnimate(about3Section, 'animate__zoomIn');
  bindAnimate(about5Section, 'animate__rollIn');
});
</script>

<style>
/* 响应式 padding-left */
@media (min-width: 768px) {
  .md\:pl-\[4rem\] {
    padding-left: 4rem;
  }
}
</style>