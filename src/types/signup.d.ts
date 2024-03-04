declare namespace TypeSignup {
  interface SignupStep {
    step?: number;
  }
  interface SignupPersonal {
    email?: string;
    password?: string;
    verify?: string;
  }

  interface SignupAddress {
    username?: string;
    phone?: string;
    address?: string;
    addressDetail?: string;
  }
  interface SignupCardNumber {
    cardFirst?: string;
    cardSecond?: string;
    cardThird?: string;
    cardFourth?: string;
  }
  type SignupSession = SignupStep &
    SignupPersonal &
    SignupAddress &
    SignupCardNumber;
}
