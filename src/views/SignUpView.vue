<template>
  <FormPersonal v-if="signUp.step === 1" />
  <FormAddress v-if="signUp.step === 2" />
  <FormCardNumber v-if="signUp.step === 3" />
</template>

<script setup lang="ts">
import { watchEffect } from 'vue';
import { useSignUpStore } from '@/stores/signUp';
import FormPersonal from '@/components/FormPersonal.vue';
import FormAddress from '@/components/FormAddress.vue';
import FormCardNumber from '@/components/FormCardNumber.vue';

const signUp = useSignUpStore();

watchEffect(() => {
  const signupSession = JSON.parse(sessionStorage.getItem('signup'));

  if (signupSession) {
    signUp.updateStep(signupSession.step);
  }
});
</script>
