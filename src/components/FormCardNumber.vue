<template>
  <div class="form-container">
    <h3 class="form-title">결제정보 입력</h3>
    <div class="form-wrapper">
      <div class="form-desc">
        <label class="form-lbl"><strong>카드번호</strong></label>
        <ol class="card-number-list">
          <li>
            <input
              class="form-input"
              type="text"
              maxlength="4"
              onkeyup="this.value=this.value.replace(/[^0-9]/g,'')"
              v-model="cardNumber.first"
            />
          </li>
          <li>
            <input
              class="form-input"
              type="text"
              maxlength="4"
              onkeyup="this.value=this.value.replace(/[^0-9]/g,'')"
              v-model="cardNumber.second"
            />
          </li>
          <li>
            <input
              class="form-input"
              type="text"
              maxlength="4"
              onkeyup="this.value=this.value.replace(/[^0-9]/g,'')"
              v-model="cardNumber.third"
            />
          </li>
          <li>
            <input
              class="form-input"
              type="text"
              maxlength="4"
              onkeyup="this.value=this.value.replace(/[^0-9]/g,'')"
              v-model="cardNumber.fourth"
            />
          </li>
        </ol>

        <span v-if="errorMessage.cardNumberMsg" class="form-alert">{{
          errorMessage.cardNumberMsg
        }}</span>
      </div>
    </div>
    <div class="form-button-wrapper">
      <button class="form-button prev" @click="goToPrevStep">이전</button>
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
import { reactive, ref, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useSignUpStore } from '@/stores/signUp';
import validationUtil from '@/utils/validationUtil';

const router = useRouter();

const signUp = useSignUpStore();

const cardNumber = reactive({
  first: '',
  second: '',
  third: '',
  fourth: '',
});
const errorMessage = reactive({
  cardNumberMsg: '',
});
const isNextStep = ref(true);

const goToPrevStep = () => {
  signUp.updateStep(signUp.step - 1);
};

const goToNextStep = () => {
  signUp.updateStep(signUp.step + 1);

  const signupSession: TypeSignup.SignupSession = JSON.parse(
    sessionStorage.getItem('signup') as string,
  );
  const payload: TypeSignup.SignupSession = {
    ...signupSession,
    step: signUp.step,
    cardFirst: cardNumber.first,
    cardSecond: cardNumber.second,
    cardThird: cardNumber.third,
    cardFourth: cardNumber.fourth,
  };

  handleChangeCardNumberSate(payload);
};

const handleChangeCardNumberSate = (payload: TypeSignup.SignupSession) => {
  sessionStorage.setItem('signup', JSON.stringify(payload));

  router.replace({
    name: 'SignUpEnd',
  });
};

watch(cardNumber, (cardNumber) => {
  const { first, second, third, fourth } = cardNumber;
  const combineCardNumber = first + second + third + fourth;

  // cardNumber
  if (!validationUtil.isValidCardNumber(combineCardNumber)) {
    errorMessage.cardNumberMsg = '카드번호를 확인해주세요.';
  } else {
    errorMessage.cardNumberMsg = '';
  }

  // isNextStep
  if (validationUtil.isValidCardNumber(combineCardNumber)) {
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
    cardNumber.first = signupSession.cardFirst ?? '';
    cardNumber.second = signupSession.cardSecond ?? '';
    cardNumber.third = signupSession.cardThird ?? '';
    cardNumber.fourth = signupSession.cardFourth ?? '';
  }
});
</script>
