<template>
  <SubmissionSuccess
      title="Withdraw"
      heading="Withdraw Success"
      body="Your withdrawal order has been submitted for review, if you have any questions please contact online customer service."
      @confirm="handleCustomConfirm"
    />
</template>

<script setup>
import { ref } from 'vue';
import SubmissionSuccess from '../auth/components/SubmissionSuccess.vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const handleCustomConfirm = () => {
  router.back()
}
</script>