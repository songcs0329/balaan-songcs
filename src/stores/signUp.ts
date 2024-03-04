import { defineStore } from 'pinia';

type SignUpState = {
  step: 1 | 2 | 3;
};

export const useSignUpStore = defineStore('signup', {
  state: (): SignUpState => {
    return {
      step: 1,
    };
  },
  actions: {
    updateStep(step: 1 | 2 | 3) {
      this.step = step;
    },
  },
});
