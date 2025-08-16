<template>
  <div>
    <!-- 引入 Header 组件 -->
    <Header />
    
    <!-- 主要内容 -->
    <div class="bg-[#FFFBF8]">
      <!-- 第一部分：交易说明 -->
      <section class="mx-auto 2xl:container w-full bg-[#FFFBF8] px-[1.25rem] md:px-[7.5rem] py-[2rem] md:py-0 md:h-[37.2rem] flex flex-col md:flex-row md:justify-between md:items-end">
        <div class="mb-[2rem] md:mb-[2.2rem] md:w-[37.5rem]">
          <h2 class="text-[#202326] font-[700] text-[1.75rem] md:text-[3rem] mb-[1.5rem] md:mb-[1.875rem] leading-[2.25rem] md:leading-[3.875rem]">
            Only a Few Steps, Convenient and Flexible Purchase
          </h2>
          <p class="flex items-center gap-x-[0.625rem] md:gap-x-[0.82rem] mb-[1rem] md:mb-0">
            <img src="@/assets/icons/circle.svg" alt="" class="w-[0.625rem] md:w-[0.75rem] h-[0.625rem] md:h-[0.75rem]">
            <span class="text-[1rem] md:text-[1.125rem]">Support multiple payment methods, flexible choice</span>
          </p>
          <p class="flex items-center gap-x-[0.625rem] md:gap-x-[0.82rem] mb-[1rem] md:mb-0">
            <img src="@/assets/icons/circle.svg" alt="" class="w-[0.625rem] md:w-[0.75rem] h-[0.625rem] md:h-[0.75rem]">
            <span class="text-[1rem] md:text-[1.125rem]">Easy to purchase various encrypted assets directly, simple and hassle-free</span>
          </p>
          <p class="flex items-center gap-x-[0.625rem] md:gap-x-[0.82rem] mb-[2rem] md:mb-[5rem]">
            <img src="@/assets/icons/circle.svg" alt="" class="w-[0.625rem] md:w-[0.75rem] h-[0.625rem] md:h-[0.75rem]">
            <span class="text-[1rem] md:text-[1.125rem]">Quick and easy to pay</span>
          </p>
          <p class="text-[0.875rem] md:text-[1rem] mb-[0.5rem] md:mb-[0.625rem]">Support the following payment methods</p>
          <img src="@/assets/images/bankCard.png" alt="" class="w-[8rem] md:w-[10rem]" />
        </div>

        <!-- 交易窗口组件 -->
        <TradingWindow />
      </section>
    </div>

    <!-- 第二部分：未来金融体验 -->
    <section class="mx-auto 2xl:container h-[47rem] md:flex justify-center items-center gap-x-[1.875rem] px-[7.5rem] hidden">
      <img src="@/assets/images/home1.png" alt="" class="w-[38.8rem]" />
      <div class="">
        <p class="text-[3.125rem] font-[700] text-black mb-[1.875rem]">Experience the Future of Finance With Us</p>
        <p class="text-[1.5rem]">As the most reliable platform for individuals and businesses, we empower you to confidently buy, sell, and manage cryptocurrencies.</p>
      </div>
    </section>

    <!-- 移动版未来金融体验 -->
    <section class="grid grid-cols-1 justify-center items-center gap-y-[2.6875rem] mt-[4rem] mb-[1.85rem] px-[1.25rem] md:hidden">
      <div class="">
        <p class="text-[1.825rem] font-[700] text-black mb-[1.25rem]">Experience the Future of Finance With Us</p>
        <p class="text-[1rem]">As the most reliable platform for individuals and businesses, we empower you to confidently buy, sell, and manage cryptocurrencies.</p>
      </div>
      <img src="@/assets/images/home1.png" alt="" class="w-[38.8rem]" />
    </section>

    <!-- 第三部分：24/7交易 -->
    <div class="bg-[#FFFBF8]">
      <section class="mx-auto 2xl:container h-[39.875rem] md:flex justify-center items-center gap-x-[1.875rem] px-[7.5rem] hidden">
        <div class="">
          <p class="text-[3.125rem] font-[700] text-black mb-[1.875rem]">Trade Anytime, Anywhere with 24/7 Flexibility.</p>
          <p class="text-[1.5rem]">Take charge of your finances—begin building your portfolio today and explore the world of cryptocurrency.</p>
        </div>
        <img src="@/assets/images/home2.png" alt="" class="w-[38.8125rem]" />
      </section>
    </div>

    <!-- 移动版24/7交易 -->
    <section class="grid grid-cols-1 justify-center items-center gap-y-[2.6875rem] px-[1.5rem] bg-[#FFFBF8] md:hidden pt-[4rem]">
      <div class="">
        <p class="text-[1.825rem] font-[700] text-black mb-[1.875rem]">Trade Anytime, Anywhere with 24/7 Flexibility.</p>
        <p class="text-[1rem]">Take charge of your finances—begin building your portfolio today and explore the world of cryptocurrency.</p>
      </div>
      <img src="@/assets/images/home2.png" alt="" class="w-[38.8125rem]" />
    </section>

    <!-- 第四部分：统计数据 -->
    <div class="bg-[#FF7545]">
      <section class="mx-auto 2xl:container h-[38.3125rem] text-white px-[7.5rem] md:flex flex-col justify-center hidden">
        <div class="text-[2.875rem] font-[600] mb-[3.625rem] text-center px-[7.5rem]">A secure and reliable platform for cryptocurrency brokerage services.</div>
        <div class="flex justify-between items-center">
          <div class="text-center">
            <div class="text-[4rem] font-[700] mb-[0.625rem]">3 Million+ </div>
            <div class="text-[1.625rem] font-[500]">Users</div>
          </div>
          <div class="text-center">
            <div class="text-[4rem] font-[700] mb-[0.625rem]">100 Million+</div>
            <div class="text-[1.625rem] font-[500]">Trading Volume per month ($)</div>
          </div>
          <div class="text-center">
            <div class="text-[4rem] font-[700] mb-[0.625rem]">100+</div>
            <div class="text-[1.625rem] font-[500]">Countries covered globally</div>
          </div>
        </div>
      </section>
    </div>

    <!-- 移动版统计数据 -->
    <section class="bg-[#FF7545] text-white px-[1.5rem] flex flex-col justify-center md:hidden py-[4rem]">
      <div class="text-[1.875rem] font-[600] mb-[3.625rem] text-center px-[1.5rem]">A secure and reliable platform for cryptocurrency brokerage services</div>
      <div class="grid grid-cols-1 items-center gap-y-[2.6875rem]">
        <div class="text-center">
          <div class="text-[4rem] font-[700] mb-[0.625rem]">3 Million+ </div>
          <div class="text-[1.625rem] font-[500]">Users</div>
        </div>
        <div class="text-center">
          <div class="text-[4rem] font-[700] mb-[0.625rem]">100 Million+</div>
          <div class="text-[1.625rem] font-[500]">Trading Volume per month ($)</div>
        </div>
        <div class="text-center">
          <div class="text-[4rem] font-[700] mb-[0.625rem]">100+</div>
          <div class="text-[1.625rem] font-[500]">Countries covered globally</div>
        </div>
      </div>
    </section>

    <!-- 第五部分：注册引导 -->
    <div class="bg-[#FFFBF8]">
      <section class="mx-auto 2xl:container h-[47rem] md:flex justify-center items-center gap-x-[1.875rem] px-[7.5rem] hidden">
        <img src="@/assets/images/register.png" alt="" class="w-[34rem]" />
        <div class="">
          <p class="text-[3.125rem] font-[700] text-black mb-[1.875rem]">Begin Building Your Investment Portfolio Today.</p>
          <p class="text-[1.5rem] mb-[1.875rem]">Register for a WUBU account today and see what the world of decentralized finance can do for you.</p>
          <div class="text-white bg-[#FF7545] py-[0.5rem] px-[1.875rem] rounded-[6.25rem] w-[13.625rem] text-center cursor-pointer">
            <router-link to="/register">REGISTER</router-link>
          </div>
        </div>
      </section>
    </div>

    <!-- 移动版注册引导 -->
    <section class="grid grid-cols-1 justify-center items-center gap-y-[1.875rem] px-[1.5rem] bg-[#FFFBF8] md:hidden pt-[4rem]">
      <div class="">
        <p class="text-[1.875rem] font-[700] text-black mb-[1.875rem]">Begin Building Your Investment Portfolio Today.</p>
        <p class="text-[1rem] mb-[1.875rem]">Register for a WUBU account today and see what the world of decentralized finance can do for you.</p>
        <div class="text-white bg-[#FF7545] py-[0.5rem] px-[1.875rem] rounded-[6.25rem] w-[13.625rem] text-center cursor-pointer">
          <router-link to="/register">REGISTER</router-link>
        </div>
      </div>
      <img src="@/assets/images/register.png" alt="" class="w-full" />
    </section>

    <Footer />

    <!-- 警告消息弹窗 -->
    <AlertMessage v-if="showAlert" @close="showAlert = false" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import TradingWindow from './TradingWindow.vue';
import AlertMessage from './AlertMessage.vue';

const showAlert = ref(false);
</script>