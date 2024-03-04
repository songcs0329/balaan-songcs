<template>
  <div class="form-container">
    <h3 class="form-title">
      {{ signupInfo.username }}님, 회원가입이 완료되었습니다.
    </h3>
    <section class="signup-wrapper">
      <div class="signup-info">
        <strong>이메일 : </strong>
        <span>{{ signupInfo.email }}</span>
      </div>
      <div class="signup-info">
        <strong>주소 : </strong>
        <span>{{ signupInfo.address }}</span>
      </div>
      <div class="signup-info">
        <strong>연락처 : </strong>
        <span>{{ dashPhoneNumber }}</span>
      </div>
    </section>
    <div class="form-button-wrapper">
      <button class="form-button next" @click="completeSignUp">홈으로</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useSignUpStore } from '@/stores/signUp';
import numberUtil from '@/utils/numberUtil';
import sessionUtil from '@/utils/sessionUtil';
import sessionConst from '@/constants/sessionConst';

const router = useRouter();

const signUp = useSignUpStore();

const signupInfo = reactive({
  username: '',
  email: '',
  address: '',
  phone: '',
});

const dashPhoneNumber = computed(() => {
  return numberUtil.addHyphenPhoneNumber(signupInfo.phone);
});

const completeSignUp = () => {
  sessionUtil.removeSession(sessionConst.SIGNUP);
  signUp.updateStep(1);

  router.replace({
    name: 'SignUp',
  });
};

watchEffect(() => {
  const signupSession: TypeSignup.SignupSession = sessionUtil.getSeesion(
    sessionConst.SIGNUP,
  );

  if (signupSession) {
    signupInfo.username = signupSession.username ?? '';
    signupInfo.email = signupSession.email ?? '';
    signupInfo.address = `${signupSession.address ?? ''} ${signupSession.addressDetail}`;
    signupInfo.phone = signupSession.phone ?? '';
  } else {
    router.replace({
      name: 'SignUp',
    });
  }
});
</script>
