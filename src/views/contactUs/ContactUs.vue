<template>
  <Header />
  <div class="bg-[#FFFBF8]">
    <!-- 顶部帮助区域 -->
    <section class="flex flex-col md:flex-row justify-center items-center gap-x-[1.5rem] p-[1.5rem] pb-0">
      <div class="text-[#202326] md:w-[34rem] w-full">
        <h4 class="md:text-[3rem] text-[1.75rem] font-[700] mb-[1.75rem]">
          We're here to help 24/7
        </h4>
        <div class="text-[1rem] leading-[2rem]">
          Every WUBU customer service representative is trained and happy to work
          with you. Whether you need help resetting your password or consulting on a trading order, you can contact us
          at any time.
        </div>
      </div>
      <img 
        src="@/assets/images/contact.png" 
        alt="Contact support" 
        class="md:w-[30rem] w-full" 
      />
    </section>

    <!-- 联系信息卡片 -->
    <div class="md:mx-[7.5rem] mx-[2rem]">
      <section
        class="bg-[#FFFBF8] mx-auto 2xl:container md:my-[4.5rem] my-[2.5rem] flex justify-center items-center shadow-[0_4px_20px_0px_rgba(0,0,0,0.1)]"
      >
        <div
          class="md:px-[4rem] md:py-[4.5rem] p-[1rem] flex flex-col md:flex-row justify-center items-center md:gap-[5rem] gap-[2rem]"
        >
          <!-- 左侧logo和信息 -->
          <div class="px-[4rem] py-[4.5rem]">
            <img 
              src="@/assets/images/logo.png" 
              alt="WUBU logo" 
              class="md:w-[19.5rem] w-full mb-[3rem]" 
            />
            <div class="text-[#202326] md:text-[1.5rem] text-[1rem]">Contact Us 24/7</div>
            <div class="mt-[2rem] text-[#202326] md:text-[1.5rem] text-[1rem]">Global Directory Online Support</div>
          </div>

          <!-- 分隔线 -->
          <div class="w-[1px] h-[18rem] bg-[#FF865C] hidden md:block"></div>
          <div class="w-full h-[1px] bg-[#FF865C] md:hidden block"></div>

          <!-- 右侧联系信息 -->
          <div>
            <h3 class="mb-[2rem] md:text-[3rem] text-[2rem] font-[700]">Chat Now</h3>
            <div class="text-[#202326] md:text-[1.5rem] text-[1rem] mb-[2rem]">
              For inquiries or assistance regarding product issues, account matters, order status, or related
              concerns, you are encouraged to reach out to us for prompt and professional support.
            </div>
            <div class="text-[#FF7545] md:text-[1.5rem] text-[1rem] mb-[2rem]">
              <a href="mailto:Service@wubu.com">Service@wubu.com</a>
            </div>
            <div class="text-[#202326] md:text-[1.5rem] text-[1rem]">English: 24/7 Chat support</div>
          </div>
        </div>
      </section>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
// 不需要额外的逻辑时可以省略script部分
// 这里保留setup标签以保持组件结构清晰
</script>

<style scoped>
/* 可以添加组件特定的样式 */
/* 原HTML中的样式已通过Tailwind类实现，这里不需要额外添加 */
</style>