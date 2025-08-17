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

    <!-- 注册指南内容 -->
    <article class="text-[#202326] mx-auto 2xl:container md:px-[7.5rem] px-[1.5rem] py-[2rem]">
      <h2 class="md:text-[3rem] text-[2rem] md:leading-[4rem] leading-[3rem] font-[700] mb-[1.75rem]">
        How do I register to use WUBU?
      </h2>

      <div class="md:text-[1.5rem] text-[1rem] md:leading-[1.75rem] leading-[1.25rem]">
        <!-- 注册注意事项 -->
        <section>
          <h4 class="font-[700]">WUBU Registration Precautions</h4>
          <p class="md:mt-[1.75rem] mt-[1.25rem]">
            WUBU supports the use of e-mail to register, but please pay attention to the
            following points when registering:
          </p>
          <p class="md:mt-[1.75rem] mt-[1.25rem]">
            1.Email Selection: Support emails such as Outlook and Gmail, if you don't
            receive the verification code, please check whether your email address is correct.
          </p>
          <p class="md:mt-[1.75rem] mt-[1.25rem]">
            Regional restrictions: US and Singapore IPs cannot register WUBU accounts,
            so avoid using IPs from these regions.
          </p>
        </section>

        <!-- 注册流程 -->
        <section>
          <h4 class="font-[700] md:mt-[1.75rem] mt-[1.25rem]">WUBU Registration Process</h4>
          <p class="md:mt-[1.75rem] mt-[1.25rem]">
            The registration process of WUBU is very simple, you can click the following
            link to start registration:
          </p>
          <p class="md:mt-[1.75rem] mt-[1.25rem]">
            Registration link: <router-link to="/register" class="text-[#FF7545]">Click to register WUBU</router-link>
          </p>
          <p class="md:mt-[1.75rem] mt-[1.25rem]">
            Note: If your Apple device displays a "Deceptive Website Warning", please go
            to "Settings" > "Safari Browser" and turn off the "Deceptive Website Warning" to clear the "Deceptive
            Website
            Warning". Web Warning", clear the app cache and reopen it.
          </p>
        </section>

        <!-- 新手注册详细教程 -->
        <section>
          <h4 class="font-[700] md:mt-[1.75rem] mt-[1.25rem]">Newbie registration detailed tutorial</h4>
          <p class="mt-[1.75rem] md:mt-[1.75rem] mt-[1.25rem]">
            1.Enter the registration page: open the WUBU registration
            address, choose cell phone or email to register.
          </p>
          <p class="mt-[1.75rem] md:mt-[1.75rem] mt-[1.25rem]">
            2.Fill in the basic information: enter your email address and
            click next.
          </p>
          <p class="mt-[1.75rem] md:mt-[1.75rem] mt-[1.25rem]">
            3.Get verification code: WUBU will send the verification code
            to your email address. The validity period of the verification code is 30 minutes, please fill it in time.
          </p>
          <p class="mt-[1.75rem] md:mt-[1.75rem] mt-[1.25rem]">
            4.Set password: After entering the verification code, click the
            Submit button to enter the password setting page. The password requires at least 8 characters, including
            capital
            letters and numbers.
          </p>
          <p class="mt-[1.75rem] md:mt-[1.75rem] mt-[1.25rem]">
            5.Install WUBUAPP: After registration, download and install
            WUBUAPP. Android devices can download and install it directly; Apple devices need to use an overseas Apple
            ID to
            install CoinApp.
          </p>
          <p class="mt-[1.75rem] md:mt-[1.75rem] mt-[1.25rem]">
            Through the above steps, you can successfully register and
            start trading on WUBU.
          </p>
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
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';

const router = useRouter();
const backLink = ref(null);

// 返回上一页
const goBack = () => {
  router.go(-1);
};

// 如果需要添加其他交互逻辑，可以在这里添加
</script>

<style scoped>
/* 可以在这里添加组件特定的样式 */
</style>