<template>
  <!-- 条款弹窗 -->
  <div class="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)] z-[999]"
    @click.self="$emit('close')">
    <div
      class="absolute w-3/4 h-3/4 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-[1.875rem] rounded-[1.25rem] shadow-[0_4px_20px_0px_rgba(0,0,0,0.1)]">
      <div class="h-full">
        <div class="flex items-center justify-center" style="height: calc(100% - 3.875rem);">
          <iframe src="/html/TermsOfUse.html" width="100%" height="100%" frameborder="0"></iframe>
        </div>
        <div class="flex justify-center">
          <button @click="$emit('close')"
            class="text-white bg-[#FF7545] md:w-[33.4375rem] w-full h-[2rem] rounded-2xl mt-[1.875rem]">
            Sure
          </button>
        </div>
      </div>
    </div>
  </div>
</template>