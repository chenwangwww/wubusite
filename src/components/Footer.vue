<template>
  <!-- 桌面版 Footer -->
  <section class="mx-auto 2xl:container h-[37.5rem] px-[7.5rem] py-[4.5rem] relative hidden md:block">
    <div class="grid grid-cols-3 gap-x-[6.25rem]">
      <!-- Logo 和免责声明 -->
      <div>
        <img :src="logoImage" class="w-[13.375rem] mb-[1rem]" />
        <div class="text-[0.875rem] font-[500] text-[#8D8D8D]">
          <b>Disclaimer</b><br>
          The information and services provided on this website
          are for informational purposes only and do not constitute financial or investment
          advice. Trading in virtual assets involves inherent risks, including potential losses due to market
          fluctuations. Users are advised to thoroughly assess these risks and make decisions based on their individual
          circumstances. By accessing or using this website, you acknowledge and agree to be bound by the applicable
          terms and conditions.
        </div>
      </div>

      <!-- 公司链接 -->
      <div>
        <div class="text-[#8D8D8D] text-[1.5rem] mb-[0.75rem]">COMPANY</div>
        <div class="text-[1.125rem]"><router-link to="/aboutus">About Us</router-link></div>
        <div class="text-[1.125rem]"><router-link to="/executeteam">Executive Team</router-link></div>
        <div class="text-[1.125rem] cursor-pointer" @click="showFooterPopup('TermsOfUse')">Terms of Use</div>
        <div class="text-[1.125rem] cursor-pointer" @click="showFooterPopup('PrivacyPolicy')">Privacy Policy</div>
        <div class="text-[1.125rem]"><router-link to="/security">Security</router-link></div>
        <div class="text-[1.125rem]"><router-link to="/contactus">Contact Us</router-link></div>
      </div>

      <!-- 法律文档 -->
      <div>
        <div class="text-[#8D8D8D] text-[1.5rem] mb-[0.75rem]">Legal Documents</div>
        <div class="text-[1.125rem] cursor-pointer" @click="showFooterPopup('WhistleblowerPolicy')">
          <a>Whistleblower Policy</a>
        </div>
        <div class="text-[1.125rem] cursor-pointer" @click="showFooterPopup('PublicDisclosures')">
          <a>Public Disclosures</a>
        </div>
        <div class="text-[1.125rem] cursor-pointer" @click="showFooterPopup('RiskDisclosureStatement')">
          <a>Risk Disclosure Statement</a>
        </div>
        <div class="text-[1.125rem] cursor-pointer" @click="showFooterPopup('VaStandards')">
          <a>VA Standards</a>
        </div>
        <div class="text-[1.125rem] cursor-pointer" @click="showFooterPopup('ComplaintsHandlingPolicy')">
          <a>Complaints Handling Policy</a>
        </div>
      </div>
    </div>
    <hr class="my-[1.25rem]" />
    <div class="w-full text-white px-[1.5rem] py-[1.6875rem] flex justify-center gap-x-2 items-center">
      <img :src="logoImage" class="w-[13.375rem]" />
      <div class="text-[0.8rem] font-[500] text-center text-black">COPYRIGHT © 2025 WUBU. ALL RIGHTS RESERVED</div>
    </div>
  </section>

  <!-- 移动版 Footer -->
  <section class="pt-[4.5rem] md:hidden">
    <div class="grid grid-cols-1 gap-y-[4rem] px-[1.5rem]">
      <!-- Logo 和免责声明 -->
      <div>
        <img :src="logoImage" class="w-[13.375rem] mb-[1rem]" />
        <div class="text-[0.875rem] font-[500] text-[#8D8D8D]">
          <b>Disclaimer</b><br>
          The information and services provided on this website
          are for informational purposes only and do not constitute financial or investment
          advice. Trading in virtual assets involves inherent risks, including potential losses due to market
          fluctuations. Users are advised to thoroughly assess these risks and make decisions based on their individual
          circumstances. By accessing or using this website, you acknowledge and agree to be bound by the applicable
          terms and conditions.
        </div>
      </div>

      <!-- 公司链接 -->
      <div>
        <div class="text-[#8D8D8D] text-[1.5rem] mb-[0.75rem]">COMPANY</div>
        <div class="text-[1.125rem]"><router-link to="/aboutus">About Us</router-link></div>
        <div class="text-[1.125rem]"><router-link to="/executeteam">Executive Team</router-link></div>
        <div class="text-[1.125rem]" @click="showFooterPopup('TermsOfUse')">Terms of Use</div>
        <div class="text-[1.125rem]" @click="showFooterPopup('PrivacyPolicy')">Privacy Policy</div>
        <div class="text-[1.125rem]"><router-link to="/security">Security</router-link></div>
        <div class="text-[1.125rem]"><router-link to="/contactus">Contact Us</router-link></div>
      </div>

      <!-- 法律文档 -->
      <div>
        <div class="text-[#8D8D8D] text-[1.5rem] mb-[0.75rem]">Legal Documents</div>
        <div class="text-[1.125rem] cursor-pointer" @click="showFooterPopup('WhistleblowerPolicy')">
          <a>Whistleblower Policy</a>
        </div>
        <div class="text-[1.125rem] cursor-pointer" @click="showFooterPopup('PublicDisclosures')">
          <a>Public Disclosures</a>
        </div>
        <div class="text-[1.125rem] cursor-pointer" @click="showFooterPopup('RiskDisclosureStatement')">
          <a>Risk Disclosure Statement</a>
        </div>
        <div class="text-[1.125rem] cursor-pointer" @click="showFooterPopup('VaStandards')">
          <a>VA Standards</a>
        </div>
        <div class="text-[1.125rem] cursor-pointer" @click="showFooterPopup('ComplaintsHandlingPolicy')">
          <a>Complaints Handling Policy</a>
        </div>
      </div>
    </div>
    <hr class="my-[1.85rem]" />
    <div class="w-full text-white px-[1.5rem] py-[1.6875rem] flex flex-col justify-center gap-y-2 items-center">
      <img :src="logoImage" class="w-[13.375rem]" />
      <div class="text-[0.8rem] font-[500] text-center text-black">COPYRIGHT @ 2025 WUBU. ALL RIGHTS RESERVED</div>
    </div>
  </section>

  <!-- Footer 条款弹窗 -->
  <div v-if="showPopup" class="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)] z-[999]">
    <div ref="popupContent"
      class="absolute w-3/4 h-3/4 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-[1.875rem] rounded-[1.25rem] shadow-[0_4px_20px_0px_rgba(0,0,0,0.1)]">
      <div class="h-full">
        <div class="flex items-center justify-center" style="height: calc(100% - 3.875rem);">
          <iframe :src="currentPopupUrl" width="100%" height="100%" frameborder="0"></iframe>
        </div>
        <div class="flex justify-center">
          <button @click="hideFooterPopup"
            class="text-white bg-[#FF7545] md:w-[33.4375rem] w-full h-[2rem] rounded-2xl mt-[1.875rem]">
            Sure
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import logoImage from '@/assets/images/logo.png';
import { useRouter } from 'vue-router';

const showPopup = ref(false);
const currentPopupUrl = ref('');
const popupContent = ref(null);
const router = useRouter()

const showFooterPopup = (file) => {
  // currentPopupUrl.value = `/html/${file}.html`;
  // showPopup.value = true;
  router.replace({
    path: '/info',
    query: {
      name: file
    }
  })
};

const hideFooterPopup = () => {
  showPopup.value = false;
  currentPopupUrl.value = '';
};
</script>