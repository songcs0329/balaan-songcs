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
import sessionUtil from '@/utils/sessionUtil';
import sessionConst from '@/constants/sessionConst';

const signUp = useSignUpStore();

watchEffect(() => {
  const signupSession: TypeSignup.SignupSession = sessionUtil.getSeesion(
    sessionConst.SIGNUP,
  );

  if (signupSession && signupSession.step) {
    if (signupSession.step > 3) {
      sessionUtil.removeSession(sessionConst.SIGNUP);
      signUp.updateStep(1);
    } else {
      signUp.updateStep(signupSession.step ?? 1);
    }
  }
});
</script>
