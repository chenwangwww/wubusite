<template>
  <Header />
  <div>
    <!-- 返回链接 -->
    <div class="mx-auto 2xl:container flex items-center md:px-[7.5rem] px-[1.5rem] py-[2rem]">
      <img :src="arrowLeftIcon" alt="Back" class="w-[16px] h-[10px]">
      <a class="text-[#FF7545] text-[14px] font-[700] ml-[10px] cursor-pointer" @click="goBack" ref="backLink">
        Back to the previous page
      </a>
    </div>

    <!-- 提款指南内容 -->
    <article class="text-[#202326] mx-auto 2xl:container md:px-[7.5rem] px-[1.5rem] py-[2rem]">
      <h2 class="md:text-[3rem] text-[2rem] md:leading-[4rem] leading-[3rem] font-[700] mb-[1.75rem]">
        How to withdraw funds？
      </h2>

      <div class="md:text-[1.5rem] text-[1rem] md:leading-[1.75rem] leading-[1.25rem]">
        <p>WUBU allows users to withdraw cryptocurrencies in. Let's see how it works.</p>

        <!-- 法币账户提款 -->
        <section>
          <h4 class="font-[700] md:mt-[1.75rem] mt-[1.25rem]">How to withdraw cryptocurrency from WUBU:</h4>

          <h4 class="font-[700] md:mt-[1.75rem] mt-[1.25rem]">Fiat Account</h4>

          <!-- 法币账户步骤1-7 -->
          <div class="flex md:mt-[1.75rem] mt-[1.25rem] gap-x-2">
            <p>1. </p>
            <p>Visit your WUBU account, click [Dashboard]-Step1, and then select Fiat Account [Withdraw]Step-2</p>
          </div>
          <div class="my-8">
            <img :src="w1Image" alt="Fiat Withdraw Step 1" class="w-full" />
          </div>

          <div class="flex md:mt-[1.75rem] mt-[1.25rem] gap-x-2">
            <p>2. </p>
            <p>Step-3: Click Create New Recipient</p>
          </div>
          <div class="my-8">
            <img :src="w2Image" alt="Fiat Withdraw Step 2" class="w-full" />
          </div>

          <div class="flex md:mt-[1.75rem] mt-[1.25rem] gap-x-2">
            <p>3. </p>
            <p>Step-4: Click Submit A Recipient.</p>
          </div>
          <div class="my-8">
            <img :src="w3Image" alt="Fiat Withdraw Step 3" class="w-full" />
          </div>

          <div class="flex md:mt-[1.75rem] mt-[1.25rem] gap-x-2">
            <p>4. </p>
            <p>Step-5: Enter your Bank Account detail, Step-6: Click Submit.</p>
          </div>
          <div class="my-8">
            <img :src="w4Image" alt="Fiat Withdraw Step 4" class="w-full" />
          </div>

          <div class="flex md:mt-[1.75rem] mt-[1.25rem] gap-x-2">
            <p>5. </p>
            <p>Step-7: Go back to Withdraw page After Submit successfully.</p>
          </div>
          <div class="my-8">
            <img :src="w5Image" alt="Fiat Withdraw Step 5" class="w-full" />
          </div>

          <div class="flex md:mt-[1.75rem] mt-[1.25rem] gap-x-2">
            <p>6. </p>
            <div>
              <p>Step-8: Select A Recipient, then Check Make Sure the Bank Information is Correct.</p>
              <p>Step-9: Enter the Withdraw Amount.</p>
              <p>Step-10: Click Submit.</p>
            </div>
          </div>
          <div class="my-8">
            <img :src="w6Image" alt="Fiat Withdraw Step 6" class="w-full" />
          </div>

          <div class="flex md:mt-[1.75rem] mt-[1.25rem] gap-x-2">
            <p>7. </p>
            <p>Step-11: Click Confirm Order submitted successfully, You will Receive the Withdraw in 3 working days,
              if you have any questions, please contact online customer service.</p>
          </div>
          <div class="my-8">
            <img :src="w7Image" alt="Fiat Withdraw Step 7" class="w-full" />
          </div>
        </section>

        <!-- 加密货币账户提款 -->
        <section>
          <h4 class="font-[700] md:mt-[6rem] mt-[4rem]">Crypto Account</h4>

          <!-- 加密货币账户步骤1-7 -->
          <div class="flex md:mt-[1.75rem] mt-[1.25rem] gap-x-2">
            <p>1. </p>
            <p>Visit your WUBU account, click [Dashboard]-Step1, and then select Crypto Account [Deposit]Step-2.</p>
          </div>
          <div class="my-8">
            <img :src="w8Image" alt="Crypto Withdraw Step 1" class="w-full" />
          </div>

          <div class="flex md:mt-[1.75rem] mt-[1.25rem] gap-x-2">
            <p>2. </p>
            <p>Step-3: Click Create New Wallet</p>
          </div>
          <div class="my-8">
            <img :src="w9Image" alt="Crypto Withdraw Step 2" class="w-full" />
          </div>

          <div class="flex md:mt-[1.75rem] mt-[1.25rem] gap-x-2">
            <p>3. </p>
            <p>Step-4: Click Create New Wallet.</p>
          </div>
          <div class="my-8">
            <img :src="w10Image" alt="Crypto Withdraw Step 3" class="w-full" />
          </div>

          <div class="flex md:mt-[1.75rem] mt-[1.25rem] gap-x-2">
            <p>4. </p>
            <p>Step-5: Enter your Wallet detail, Step-6: Click Submit.</p>
          </div>
          <div class="my-8">
            <img :src="w11Image" alt="Crypto Withdraw Step 4" class="w-full" />
          </div>

          <div class="flex md:mt-[1.75rem] mt-[1.25rem] gap-x-2">
            <p>5. </p>
            <p>Step-7: Go back to Withdraw page After Submit successfully.</p>
          </div>
          <div class="my-8">
            <img :src="w12Image" alt="Crypto Withdraw Step 5" class="w-full" />
          </div>

          <div class="flex md:mt-[1.75rem] mt-[1.25rem] gap-x-2">
            <p>6. </p>
            <div>
              <p>Step-8: Select A Recipient, then Check Make Sure your Wallet Information is Correct.</p>
              <p>Step-9: Enter the Withdraw Amount.</p>
              <p>Step-10: Click Submit.</p>
            </div>
          </div>
          <div class="my-8">
            <img :src="w13Image" alt="Crypto Withdraw Step 6" class="w-full" />
          </div>

          <div class="flex md:mt-[1.75rem] mt-[1.25rem] gap-x-2">
            <p>7. </p>
            <p>Step-11: Click Confirm Order submitted successfully, You will Receive the Withdraw in 3 working days,
              if you have any questions, please contact online customer service.</p>
          </div>
          <div class="my-8">
            <img :src="w14Image" alt="Crypto Withdraw Step 7" class="w-full" />
          </div>
        </section>
      </div>
    </article>
  </div>
  <Footer />
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import arrowLeftIcon from '@/assets/icons/arrowLeft.svg';
import w1Image from '@/assets/images/learn/W-1.png';
import w2Image from '@/assets/images/learn/W-2.png';
import w3Image from '@/assets/images/learn/W-3.png';
import w4Image from '@/assets/images/learn/W-4.png';
import w5Image from '@/assets/images/learn/W-5.png';
import w6Image from '@/assets/images/learn/W-6.png';
import w7Image from '@/assets/images/learn/W-7.png';
import w8Image from '@/assets/images/learn/W-8.png';
import w9Image from '@/assets/images/learn/W-9.png';
import w10Image from '@/assets/images/learn/W-10.png';
import w11Image from '@/assets/images/learn/W-11.png';
import w12Image from '@/assets/images/learn/W-12.png';
import w13Image from '@/assets/images/learn/W-13.png';
import w14Image from '@/assets/images/learn/W-14.png';
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';

const router = useRouter();
const backLink = ref(null);

// 返回上一页
const goBack = () => {
  router.go(-1);
};
</script>

<style scoped>
/* 可以在这里添加组件特定的样式 */
</style>