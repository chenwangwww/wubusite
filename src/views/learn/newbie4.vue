<template>
  <Header />
  <div>
    <div class="mx-auto 2xl:container flex items-center md:px-[7.5rem] px-[1.5rem] py-[2rem]">
      <img :src="arrowLeftIcon" alt="" class="w-[16px] h-[10px]">
      <a class="text-[#FF7545] text-[14px] font-[700] ml-[10px] cursor-pointer" ref="backLink" @click="goBack">
        Back to the previous page
      </a>
    </div>

    <article class="text-[#202326] mx-auto 2xl:container md:px-[7.5rem] px-[1.5rem] py-[2rem]">
      <h2 class="md:text-[3rem] text-[2rem] md:leading-[4rem] leading-[3rem] font-[700] mb-[1.75rem]">
        How to buy crypto？
      </h2>

      <div class="md:text-[1.5rem] text-[1rem] md:leading-[1.75rem] leading-[1.25rem]">
        <h4 class="font-[700]">How to buy cryptocurrency with cash on WUBU:</h4>
        <p class="mt-[1.75rem] md:mt-[1.75rem] mt-[1.25rem]">
          1. Access your WUBU account, click [Top Up], and then select [Buy Cryptocurrency].
        </p>
        <p class="mt-[1.75rem] md:mt-[1.75rem] mt-[1.25rem]">
          2. Determine the cryptocurrency you want to buy, the currency you want to use for the purchase, and the amount
          you want to spend.
        </p>
        <p class="mt-[1.75rem] md:mt-[1.75rem] mt-[1.25rem]">
          3. Choose from a variety of payment options, such as credit/debit cards or third-party payment providers.
        </p>
        <p class="mt-[1.75rem] md:mt-[1.75rem] mt-[1.25rem]">
          4. if you wish to deposit using a credit/debit card, you must add your card details by clicking [Add New Card]
          and filling in the required information.
        </p>
        <p class="mt-[1.75rem] md:mt-[1.75rem] mt-[1.25rem]">
          5. Then, follow the instructions to complete the transaction. The purchased cryptocurrency will be added to
          your WUBU wallet.
        </p>
      </div>
    </article>
  </div>
  <Footer />
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import arrowLeftIcon from '@/assets/icons/arrowLeft.svg';

const backLink = ref(null);
const router = useRouter();

const goBack = () => {
  router.go(-1);
};
</script>

<style scoped>
/* Your component-specific styles can go here if needed */
</style>