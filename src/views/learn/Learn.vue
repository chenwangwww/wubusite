<template>
  <Header />
  <section 
    class="mx-auto 2xl:container w-full grid md:grid-cols-2 grid-cols-1 justify-between items-center md:px-[7.5rem] px-[1.5rem] mt-[1.5rem] gap-x-[1.5rem] gap-y-[2rem]"
    ref="learnSection"
  >
    <!-- 学习卡片1: 注册WUBU -->
    <div 
      class="rounded-[2rem] px-[1rem] py-[1.75rem] flex items-center gap-x-[1.5rem] shadow-[0_4px_10px_0px_rgba(0,0,0,0.1)]"
      v-for="(card, index) in learnCards" 
      :key="index"
    >
      <img 
        :src="card.image" 
        :alt="card.title"
        class="md:w-[12rem] md:h-[12rem] md:rounded-[2rem] w-[6rem] h-[6rem] rounded-[1rem]" 
      />
      <div>
        <h4 class="md:text-[1.75rem] text-[1rem] font-[700] md:leading-[2.25rem] leading-[1.2rem] mb-[1.75rem] text-[#202326]">
          {{ card.title }}
        </h4>
        <router-link :to="card.link">
          <div class="md:text-[1.5rem] text-[1rem] text-white bg-[#FF7545] rounded-[6rem] md:w-[11.5rem] md:h-[3rem] w-[7.5rem] h-[2rem] leading-[2rem] text-center md:leading-[3rem]">
            learn
          </div>
        </router-link>
      </div>
    </div>
  </section>
  <Footer />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import learn1Image from '@/assets/images/learn/learn1.png';
import learn2Image from '@/assets/images/learn/learn2.png';
import learn3Image from '@/assets/images/learn/learn3.png';
import learn4Image from '@/assets/images/learn/learn4.png';

// 使用 ref 引用学习部分
const learnSection = ref(null);

// 学习卡片数据
const learnCards = ref([
  {
    title: 'How do I register to use WUBU?',
    image: learn1Image,
    link: '/learn/newbie1'
  },
  {
    title: 'How to deposit funds?',
    image: learn2Image,
    link: '/learn/newbie2'
  },
  {
    title: 'How to buy crypto?',
    image: learn3Image,
    link: '/learn/newbie4'
  },
  {
    title: 'How to withdraw funds?',
    image: learn4Image,
    link: '/learn/newbie3'
  }
]);


onMounted(() => {
  
});
</script>

<style scoped>
/* 可以在这里添加组件特定的样式 */
</style>