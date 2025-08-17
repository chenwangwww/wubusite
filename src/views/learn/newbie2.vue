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

    <!-- 存款指南内容 -->
    <article class="text-[#202326] mx-auto 2xl:container md:px-[7.5rem] px-[1.5rem] py-[2rem]">
      <h2 class="md:text-[3rem] text-[2rem] md:leading-[4rem] leading-[3rem] font-[700] mb-[1.75rem]">
        How to deposit funds？
      </h2>

      <div class="md:text-[1.5rem] text-[1rem] md:leading-[1.75rem] leading-[1.25rem]">
        <!-- 存款注意事项 -->
        <p>Always double check the details entered, such as the network selected for deposits and the bank
          details used for withdrawals, to avoid accidental loss of funds.</p>
        <p class="md:mt-[1.75rem] mt-[1.25rem]">Depositing and withdrawing funds in cryptocurrency can be confusing.
          Many
          users find it difficult to understand the various deposit/withdrawal options and the security measures
          involved,
          and as a result funds are often lost accidentally.</p>
        <p class="md:mt-[1.75rem] mt-[1.25rem]">In this article, we will discuss the deposit available on WUBU. You will
          learn how to make deposits, deposit cryptocurrencies and buy cryptocurrencies with cash through WUBU.</p>

        <!-- 法币账户存款 -->
        <section>
          <h4 class="font-[700] md:mt-[1.75rem] mt-[1.25rem]">How to top up to WUBU?</h4>
          <p class="md:mt-[1.75rem] mt-[1.25rem]">WUBU allows users to deposit funds in two ways [Fiat Account] and
            [Crypto
            Account], so let's see how it works.</p>

          <h4 class="font-[700] md:mt-[1.75rem] mt-[1.25rem]">Fiat Account</h4>

          <!-- 法币账户步骤1 -->
          <div class="flex md:mt-[1.75rem] mt-[1.25rem] gap-x-2">
            <p>1. </p>
            <p>Visit your WUBU account, click [Dashboard]-Step1, and then select Fiat Account [Deposit]Step-2</p>
          </div>
          <div class="my-8">
            <img :src="d1Image" alt="Fiat Account Step 1" class="w-full" />
          </div>

          <!-- 法币账户步骤2 -->
          <div class="flex md:mt-[1.75rem] mt-[1.25rem] gap-x-2">
            <p>2. </p>
            <div>
              <p>Step-3: Select the currency to be deposited and fill in the amount. </p>
              <p>Confirm the official WUBU bank account and Transfer deposit the corresponding amount by your bank
                account APP.</p>
              <p>Step-4: Click Submit</p>
            </div>
          </div>
          <div class="my-8">
            <img :src="d2Image" alt="Fiat Account Step 2" class="w-full" />
          </div>

          <!-- 法币账户步骤3-5 -->
          <div class="flex md:mt-[1.75rem] mt-[1.25rem] gap-x-2">
            <p>3. </p>
            <p>Step-5: Submitted Successfully, After Transfer the Deposit Click Upload now</p>
          </div>
          <div class="my-8">
            <img :src="d3Image" alt="Fiat Account Step 3" class="w-full" />
          </div>

          <div class="flex md:mt-[1.75rem] mt-[1.25rem] gap-x-2">
            <p>4. </p>
            <div>
              <p>Step-6: Enter Subject name For example: Deposit Fait Account</p>
              <p>Select Order type : Fait Account Deposit / Crypto Account Despoit</p>
              <p>Upload the Relevant Credentials</p>
              <p>Step-7: Click Submit.</p>
            </div>
          </div>
          <div class="my-8">
            <img :src="d4Image" alt="Fiat Account Step 4" class="w-full" />
          </div>

          <div class="flex md:mt-[1.75rem] mt-[1.25rem] gap-x-2">
            <p>5. </p>
            <p>Step-8: Order submitted successfully, expected to complete the audit within 3 working days, if you have
              any
              questions, please contact online customer service.</p>
          </div>
          <div class="my-8">
            <img :src="d5Image" alt="Fiat Account Step 5" class="w-full" />
          </div>
        </section>

        <!-- 加密货币账户存款 -->
        <section>
          <h4 class="font-[700] md:mt-[6rem] mt-[4rem]">Crypto Account</h4>

          <!-- 加密货币账户步骤1 -->
          <div class="flex md:mt-[1.75rem] mt-[1.25rem] gap-x-2">
            <p>1. </p>
            <p>Visit your WUBU account, click [Dashboard]-Step1, and then select Crypto Account [Deposit]Step-2.</p>
          </div>
          <div class="my-8">
            <img :src="d6Image" alt="Crypto Account Step 1" class="w-full" />
          </div>

          <!-- 加密货币账户步骤2 -->
          <div class="flex md:mt-[1.75rem] mt-[1.25rem] gap-x-2">
            <p>2. </p>
            <div>
              <p>Step-3: Select the currency to be deposited ,Choose the Network TRC20/XXXX and fill in the amount.</p>
              <p class="text-[0.6rem] md:text-[1rem]">TRC20: TBFTkcpFveeyMAYCsme47YVq6ri5eEEkqR</p>
              <p class="text-[0.6rem] md:text-[1rem]">ERC20:0xC1D4341eA2dFB27C97bC703C3b4a4a5747A66689</p>
              <p>Step-4: Copy the QR address to your wallet finish transfer.</p>
              <p>Step-5: Click Submit</p>
            </div>
          </div>
          <div class="my-8">
            <img :src="d7Image" alt="Crypto Account Step 2" class="w-full" />
          </div>

          <!-- 加密货币账户步骤3-5 -->
          <div class="flex md:mt-[1.75rem] mt-[1.25rem] gap-x-2">
            <p>3. </p>
            <p>Step-5: Submitted Successfully, After Transfer the Deposit Click Upload now</p>
          </div>
          <div class="my-8">
            <img :src="d8Image" alt="Crypto Account Step 3" class="w-full" />
          </div>

          <div class="flex md:mt-[1.75rem] mt-[1.25rem] gap-x-2">
            <p>4. </p>
            <div>
              <p>Step-6: Enter Subject name For example: Deposit Fait Account</p>
              <p>Select Order type : Fait Account Deposit / Crypto Account Despoit</p>
              <p>Upload the Relevant Credentials</p>
              <p>Step-7: Click Submit.</p>
            </div>
          </div>
          <div class="my-8">
            <img :src="d9Image" alt="Crypto Account Step 4" class="w-full" />
          </div>

          <div class="flex md:mt-[1.75rem] mt-[1.25rem] gap-x-2">
            <p>5. </p>
            <p>Step-8: Order submitted successfully, expected to complete the audit within 3 working days, if you have
              any
              questions, please contact online customer service.</p>
          </div>
          <div class="my-8">
            <img :src="d10Image" alt="Crypto Account Step 5" class="w-full" />
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
import d1Image from '@/assets/images/learn/D1.png';
import d2Image from '@/assets/images/learn/D2.png';
import d3Image from '@/assets/images/learn/D3.png';
import d4Image from '@/assets/images/learn/D4.png';
import d5Image from '@/assets/images/learn/D5.png';
import d6Image from '@/assets/images/learn/D6.png';
import d7Image from '@/assets/images/learn/D7.png';
import d8Image from '@/assets/images/learn/D8.png';
import d9Image from '@/assets/images/learn/D9.png';
import d10Image from '@/assets/images/learn/D10.png';
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