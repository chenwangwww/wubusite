<template>
  <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 z-50">
    <div class="bg-white rounded-[1.25rem] w-[21.25rem] md:w-[31.25rem] px-[1.25rem] py-[2.5rem] text-center">
      <p class="text-[1rem] md:text-[1.25rem] mb-[2.5rem]">
        We regret to inform you that our website is currently under review and is temporarily unavailable to provide services.
      </p>
      <button 
        type="button"
        class="text-white bg-[#FF7545] rounded-[0.625rem] h-[3.125rem] w-[11.25rem]"
        @click="$emit('close')"
      >
        OK
      </button>
    </div>
  </div>
</template>

<script setup>
</script>