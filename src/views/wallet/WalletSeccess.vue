<template>
  <SubmissionSuccess
      title="Add WALLET ACCOUNT"
      heading="Submit successfully."
      body="The account has been submitted, please wait patiently for review。"
      @confirm="handleCustomConfirm"
    />
</template>

<script setup>
import { ref } from 'vue';
import SubmissionSuccess from '../auth/components/SubmissionSuccess.vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const handleCustomConfirm = () => {
  router.push('/usercenter/wallet')
}
</script>