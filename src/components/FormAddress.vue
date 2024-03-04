<template>
  <div class="form-container">
    <h3 class="form-title">배송지정보입력</h3>
    <div class="form-wrapper">
      <div class="form-desc">
        <label class="form-lbl"><strong>이름</strong></label>
        <input class="form-input" type="text" v-model="username" />
        <span v-if="errorMessage.usernameMsg" class="form-alert">{{
          errorMessage.usernameMsg
        }}</span>
      </div>
      <div class="form-desc">
        <label class="form-lbl"><strong>연락처</strong></label>
        <input class="form-input" type="tel" v-model="phone" />
        <span v-if="errorMessage.phoneMsg" class="form-alert">{{
          errorMessage.phoneMsg
        }}</span>
      </div>
      <div class="form-desc">
        <label class="form-lbl">
          <strong>주소</strong>
          <button class="search-address-button" @click="openDaumPostcode">
            우편번호 검색
          </button>
        </label>
        <input
          class="form-input"
          type="text"
          readonly
          :value="address"
          @click="openDaumPostcode"
          placeholder="우편번호를 검색해주세요."
        />
        <input class="form-input" type="text" v-model="addressDetail" />
        <span v-if="errorMessage.addressMsg" class="form-alert">{{
          errorMessage.addressMsg
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
import { ref, reactive, watch, watchEffect } from 'vue';
import { useSignUpStore } from '@/stores/signUp';
import validationUtil from '@/utils/validationUtil';

const signUp = useSignUpStore();

const username = ref('');
const phone = ref('');
const address = ref('');
const addressDetail = ref('');
const errorMessage = reactive({
  usernameMsg: '',
  phoneMsg: '',
  addressMsg: '',
});
const isNextStep = ref(true);

const goToPrevStep = () => {
  signUp.updateStep(signUp.step - 1);
};

const goToNextStep = () => {
  signUp.updateStep(signUp.step + 1);

  const signupSession = JSON.parse(sessionStorage.getItem('signup'));
  const payload = {
    ...signupSession,
    step: signUp.step,
    username: username.value,
    phone: phone.value,
    address: address.value,
    addressDetail: addressDetail.value,
  };
  handleChangeAddressSate(payload);
};

const handleChangeAddressSate = (payload) => {
  sessionStorage.setItem('signup', JSON.stringify(payload));
};

const openDaumPostcode = () => {
  new window.daum.Postcode({
    oncomplete: (data) => {
      address.value = data.address;
    },
  }).open();
};

watch(
  [username, phone, address, addressDetail],
  ([username, phone, address, addressDetail]) => {
    // username
    if (username.length > 0) {
      if (!validationUtil.isValidUsername(username)) {
        errorMessage.usernameMsg = '이름을 확인해주세요.';
      } else {
        errorMessage.usernameMsg = '';
      }
    } else {
      errorMessage.usernameMsg = '';
    }

    // phone
    if (phone.length > 0) {
      if (!validationUtil.isValidPhoneNumber(phone)) {
        errorMessage.phoneMsg = '전화번호를 확인해주세요.';
      } else {
        errorMessage.phoneMsg = '';
      }
    } else {
      errorMessage.phoneMsg = '';
    }

    // address
    if (address !== '') {
      if (addressDetail.length > 0) {
        errorMessage.addressMsg = '';
      } else {
        errorMessage.addressMsg = '상세주소를 입력해주세요.';
      }
    } else {
      errorMessage.addressMsg = '';
    }

    // isNextStep
    if (
      validationUtil.isValidUsername(username) &&
      validationUtil.isValidPhoneNumber(phone) &&
      address.length > 0 &&
      addressDetail.length > 0
    ) {
      isNextStep.value = false;
    } else {
      isNextStep.value = true;
    }
  },
);

watchEffect(() => {
  const signupSession = JSON.parse(sessionStorage.getItem('signup'));

  if (signupSession) {
    username.value = signupSession.username ?? '';
    phone.value = signupSession.phone ?? '';
    address.value = signupSession.address ?? '';
    addressDetail.value = signupSession.addressDetail ?? '';
  }
});
</script>
