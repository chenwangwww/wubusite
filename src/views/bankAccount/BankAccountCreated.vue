<template>
  <section class="mt-9 md:ml-16 md:mr-8 mx-4 px-16 bg-white">
    <div class="py-8 flex gap-x-8 items-center">
      <img src="../../assets//icons/dashboard/arrow-left.svg" class="w-8" />
      <span class=" font-bold text-2xl">Add Bank Account</span>
    </div>
    <div class="flex flex-col items-center gap-[1.0625rem] w-full">
      <div class="w-[4.375rem] h-[3.6875rem] relative">
        <img class="absolute top-0 left-0 w-[4.375rem] h-[3.625rem]" src="@/assets/icons/down.svg" alt="Vector" />
      </div>
      <p class="text-black font-lato text-xl font-bold text-center w-full">Create Submitted
      </p>
      <p class="text-black font-lato text-base text-center w-full">The account has been submitted, please wait patiently for review。</p>
    </div>
    <div class="flex gap-[2.5rem] w-full my-4 pb-9">
      <div class="flex-1 bg-[#FF7545] rounded-[2.5rem] h-[2.75rem] md:h-[3.5rem] flex items-center justify-center cursor-pointer" @click="handleCreateBankAccount">
        <div class="text-white font-lato text-base font-semibold leading-[3.875rem] whitespace-nowrap">Submit</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router';


const router = useRouter()
const handleCreateBankAccount = () => {
router.push('/usercenter/bankaccount')
}
</script>