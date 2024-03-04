import { defineStore } from 'pinia';

interface PersonalState {
  email: String;
  password: String;
  checkPassword: String;
}

interface AddressState {
  name: string;
  tel: string;
  address: string;
  addressDetail: string;
}

interface CardNumberState {
  card1: string;
  card2: string;
  card3: string;
  card4: string;
}

type SignUpState = PersonalState &
  AddressState &
  CardNumberState & {
    step: number;
  };

export const useSignUpStore = defineStore('signup', {
  state: (): SignUpState => {
    return {
      step: 1,
      email: '',
      password: '',
      checkPassword: '',
      name: 'songcs',
      tel: '',
      address: '',
      addressDetail: '',
      card1: '',
      card2: '',
      card3: '',
      card4: '',
    };
  },
});
