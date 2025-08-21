<template>
  <section class="mt-9 md:ml-16 md:mr-8 mx-4 md:px-12 px-4 bg-white">
    <div class="py-8 flex gap-x-8 items-center">
      <span class=" font-bold text-2xl">Orders</span>
    </div>
    <div>
      <div class="grid grid-cols-2 gap-4">
        <TextInput inputId="firstName" label="First Name" placeholder="please input" v-model="firstname" />
        <TextInput inputId="lastName" label="Last Name" placeholder="please input" v-model="lastname" />

      </div>
      <div class="grid md:grid-cols-2 grid-cols-1 gap-4 items-end my-6">

        <TextInput inputId="mobileid" label="Phone Number " placeholder="please input" v-model="mobile"><template
            #prefix>
            <div class="flex justify-center items-center gap-x-2">
              <img src="../../assets/icons/dubai.svg" class="md:w-8 w-5" />
              <span>+971</span>
            </div>
          </template></TextInput>
        <TextInput inputId="companyname" label="Company Name (Optional)" placeholder="please input"
          v-model="companyName" />

      </div>
      <div class="grid md:grid-cols-2 grid-cols-1 gap-4 items-end my-6">

        <TextInput inputId="emailid" label="Email" placeholder="please input" v-model="email" />
        <div class="flex gap-[2.5rem] w-full">
          <div class="flex-1 bg-black rounded-xl h-[2.75rem] md:h-[3.5rem] flex items-center justify-center cursor-pointer">
            <div class="text-white font-lato text-base font-semibold leading-[3.875rem] whitespace-nowrap">Submit</div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import SelectInput from '../../components/SelectInput.vue';
import TextInput from '../../components/TextInput.vue';
import { ref } from 'vue';

const firstname = ref(null)
const lastname = ref(null)
const companyName = ref(null)
const mobile = ref(null)
const email = ref(null)

</script>