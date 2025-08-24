<template>
  <section class="mt-9 md:ml-16 md:mr-8 mx-4 md:px-16 px-3 bg-white">
    <div class="py-8 flex gap-x-8 items-center w-full">
      <img src="../../assets//icons/dashboard/arrow-left.svg" class="w-8" />
      <span class=" font-bold text-2xl">Submit a ticket</span>
    </div>
    <div>
      <TextInput inputId="subjectid" label="*Subject" placeholder="please Enter subject" v-model="subject" />
      <SelectInput :options="orderOptions" selectId="order-selector" label="* Order " placeholder="please select order"
        v-model="orderselected" class="my-4" />
      <div class="p-8">
        <ImageUploader inputId="profile-image" label="*Upload the relevant credentials" @file-selected="handleImageSelected" />
      </div>
    </div>
    <div
        class="flex-1 bg-[#FF7545] rounded-[2.5rem] h-[2.75rem] md:h-[3.5rem] flex items-center justify-center cursor-pointer" @click="gotofinish">
        <div class="text-white font-lato text-base font-semibold leading-[3.875rem] whitespace-nowrap">Submit</div>
      </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import SelectInput from '../../components/SelectInput.vue';
import TextInput from '../../components/TextInput.vue';
import ImageUploader from '../../components/ImageUploader.vue';
import { useRouter } from 'vue-router';
import UploadDefault from "../../assets/icons/dashboard/uploadDefault.svg"
import * as apiTicket from '@/api/ticket.js'

const router = useRouter()
const subject = ref(null)
const orderselected = ref(null)
let fileUp = null
const orderOptions = ref([
  { value: '1', text: 'All' },
  { value: '2', text: 'Completed' },
  { value: '3', text: 'Processing' },
  { value: '4', text: 'Pending' },
  { value: '5', text: 'Awaiting Confirmation(s)' },
  { value: '6', text: 'Canceled' },
  { value: '7', text: 'Expired' },
]);

const handleImageSelected = (file) => {
  console.log('选择的文件:', file);
  // 这里可以处理文件上传逻辑，例如使用 FormData
  fileUp = file;
};

const gotofinish = async() => {
  let d = {
    subject: subject.value,
    orderType: orderselected.value,
    credential: fileUp
  }
  let result = await apiTicket.createTicketApi(d)
  if (result.code == 0) {
    router.push('/usercenter/addticketsuccess')
  }
}
</script>