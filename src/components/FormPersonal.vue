<template>
  <div class="form-container">
    <h3 class="form-title">개인정보 입력</h3>
    <div class="form-wrapper">
      <div class="form-desc">
        <label class="form-lbl"><strong>이메일</strong></label>
        <input class="form-input" type="email" v-model="email" />
        <span v-if="errorMessage.emailMsg" class="form-alert">{{
          errorMessage.emailMsg
        }}</span>
      </div>
      <div class="form-desc">
        <label class="form-lbl"><strong>비밀번호</strong></label>
        <input class="form-input" type="password" v-model="password" />
        <span v-if="errorMessage.passwordMsg" class="form-alert">{{
          errorMessage.passwordMsg
        }}</span>
      </div>
      <div class="form-desc">
        <label class="form-lbl"><strong>비밀번호 확인</strong></label>
        <input class="form-input" type="password" v-model="verify" />
        <span v-if="errorMessage.verifyMsg" class="form-alert">{{
          errorMessage.verifyMsg
        }}</span>
      </div>
    </div>
    <div class="form-button-wrapper">
      <button
        class="form-button next"
        :disabled="isNextStep"
        @click="goToNextStep"
      >
        다음
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, watchEffect } from 'vue';
import { useSignUpStore } from '@/stores/signUp';
import validationUtil from '@/utils/validationUtil';

const signUp = useSignUpStore();

const email = ref('');
const password = ref('');
const verify = ref('');
const errorMessage = reactive({
  emailMsg: '',
  passwordMsg: '',
  verifyMsg: '',
});
const isNextStep = ref(true);

const goToNextStep = () => {
  signUp.updateStep(signUp.step + 1);

  const signupSession: TypeSignup.SignupSession = JSON.parse(
    sessionStorage.getItem('signup') as string,
  );
  const payload: TypeSignup.SignupSession = {
    ...signupSession,
    step: signUp.step,
    email: email.value,
    password: password.value,
    verify: verify.value,
  };

  handleChangePersonalSate(payload);
};

const handleChangePersonalSate = (payload: TypeSignup.SignupSession) => {
  sessionStorage.setItem('signup', JSON.stringify(payload));
};

watch([email, password, verify], ([email, password, verify]) => {
  // email
  if (email.length > 0) {
    if (!validationUtil.isValidEmail(email)) {
      errorMessage.emailMsg = '이메일 주소를 확인해주세요.';
    } else {
      errorMessage.emailMsg = '';
    }
  } else {
    errorMessage.emailMsg = '';
  }

  // password
  if (password.length > 0) {
    if (!validationUtil.isValidPassword(password)) {
      errorMessage.passwordMsg =
        '비밀번호는 영문 대문자, 소문자, 숫자, 특수문자를 포함한 8자리 이상의 문자열이여야 합니다.';
    } else {
      errorMessage.passwordMsg = '';
    }
  } else {
    errorMessage.passwordMsg = '';
  }

  // verify
  if (verify.length > 0) {
    if (!validationUtil.isValidPassword(verify)) {
      errorMessage.verifyMsg =
        '비밀번호는 영문 대문자, 소문자, 숫자, 특수문자를 포함한 8자리 이상의 문자열이여야 합니다.';
    } else if (verify !== password) {
      errorMessage.verifyMsg = '비밀번호와 같은 지 확인해주세요.';
    } else {
      errorMessage.verifyMsg = '';
    }
  } else {
    errorMessage.verifyMsg = '';
  }

  // isNextStep
  if (
    validationUtil.isValidEmail(email) &&
    validationUtil.isValidPassword(password) &&
    validationUtil.isValidPassword(verify) &&
    verify === password
  ) {
    isNextStep.value = false;
  } else {
    isNextStep.value = true;
  }
});

watchEffect(() => {
  const signupSession: TypeSignup.SignupSession = JSON.parse(
    sessionStorage.getItem('signup') as string,
  );

  if (signupSession) {
    email.value = signupSession.email ?? '';
    password.value = signupSession.password ?? '';
    verify.value = signupSession.verify ?? '';
  }
});
</script>
