import { defineStore } from 'pinia';

type SignupStepState = {
  step: number;
};

export const useSignUpStore = defineStore('signup', {
  state: (): SignupStepState => {
    return {
      step: 1,
    };
  },
  actions: {
    updateStep(step: number) {
      this.step = step;
    },
  },
});
