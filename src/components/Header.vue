<template>
  <div>
    <!-- 桌面版头部 -->
    <header
      class="mx-auto 2xl:container h-[4.375rem] border-b border-[#DFDFDF] px-[7.5rem] py-[1rem] md:flex justify-between items-center hidden">
      <input id="wurl" value="[@url]" type="hidden">
      <div class="text-[#2F2F2F] font-[700] text-[1rem] flex gap-x-[1.875rem] items-center">
        <RouterLink to="/"><img src="@/assets/images/logo.png" alt="" class="w-[9.25rem]"></RouterLink>
        <div><RouterLink to="/">HOME</RouterLink></div>
        <div><RouterLink to="/aboutus">ABOUT US</RouterLink></div>
        <div><a>SECURITY</a></div>
        <div><a>LEARN</a></div>
      </div>
      <div class="font-[700] text-[1.125rem] flex gap-x-[1.875rem] items-center relative">
        <div><a>LOGIN</a></div>
        <div class="text-white bg-[#FF7545] py-[0.5rem] px-[1.875rem] rounded-[6.25rem]"><a>REGISTER</a></div>
        <img src="@/assets/icons/globals.svg" alt="" class="w-[1.375rem] h-[1.375rem]" @click="toggleLangMenu">
        <div class="absolute bg-white top-full right-0 py-[0.375rem] shadow-2xl" v-show="showLangMenu">
          <div class="flex items-center px-[1rem] gap-x-[1rem] hover:bg-[#F4F4F5] text-[#202326] cursor-pointer"
            @click="selectEnglish">
            <img src="@/assets/icons/America.svg" alt="" class="w-[1.375rem] h-[1.375rem]">
            <div>English</div>
          </div>
        </div>
      </div>
    </header>

    <!-- 移动版头部 -->
    <header
      class="h-[4.375rem] border border-[#DFDFDF] px-[1.5rem] py-[1rem] flex justify-between items-center md:hidden relative">
      <div class="text-[#2F2F2F] font-[700] text-[1rem] flex gap-x-[1.875rem] items-center">
        <a> <img src="@/assets/images/logo.png" alt="" class="w-[9.25rem]" v-show="showLogo"></a>
      </div>
      <div class="font-[700] text-[1rem] flex gap-x-[1rem] items-center relative">
        <div v-show="showLogin"><a>LOGIN</a></div>
        <div class="text-white bg-[#FF7545] py-[0.5rem] px-[1.25rem] rounded-[6.25rem]"><a>REGISTER</a></div>
        <img src="@/assets/icons/menu.svg" alt="" class="w-[1.5rem] h-[1.5rem]" @click="toggleMobileMenu">
      </div>
      <div v-show="showMobileMenu"
        class="absolute top-full left-0 w-full bg-white py-[2rem] px-[1.5rem] text-[#2F2F2F] font-[700] text-[1rem]">
        <div class="mb-[1.5rem]"><a>HOME</a></div>
        <div class="mb-[1.5rem]"><a>ABOUT US</a></div>
        <div class="mb-[1.5rem]"><a>SECURITY</a></div>
        <div class="mb-[1.5rem]"><a>LEARN</a></div>

        <div class="flex items-center justify-between mb-[1.5rem]" @click="toggleMobileLangs">
          <div>Language</div>
          <img src="@/assets/icons/arrow.svg" alt="" class="w-[1rem] h-[1rem]">
        </div>
        <div v-show="showMobileLangs"
          class="shadow-[0_4px_20px_0px_rgba(0,0,0,0.1)] mb-[1.5rem] px-[1.5rem] py-[1.5rem]">
          <div class="flex items-center justify-between hover:bg-[#F4F4F5] cursor-pointer" @click="hideMobileLangs">
            <img src="@/assets/icons/America.svg" alt="" class="w-[1.375rem] h-[1.375rem]">
            <div>English</div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 语言菜单状态
const showLangMenu = ref(false);

// 移动菜单状态
const showMobileMenu = ref(false);
const showMobileLangs = ref(false);
const showLogo = ref(true);
const showLogin = ref(false);

// 切换语言菜单显示
const toggleLangMenu = () => {
  showLangMenu.value = !showLangMenu.value;
};

// 选择英语
const selectEnglish = () => {
  showLangMenu.value = false;
};

// 切换移动菜单显示
const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
  showLogo.value = !showMobileMenu.value;
  showLogin.value = showMobileMenu.value;
};

// 切换移动语言菜单显示
const toggleMobileLangs = () => {
  showMobileLangs.value = !showMobileLangs.value;
};

// 隐藏移动语言菜单
const hideMobileLangs = () => {
  showMobileLangs.value = false;
};
</script>