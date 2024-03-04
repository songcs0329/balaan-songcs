import regexConst from '@/constants/regexConst';

const validationUtil = {
  isValidPassword: (password: string) => {
    return regexConst.PASSWORD_REGEX.test(password);
  },
  isValidEmail: (email: string) => {
    return regexConst.EMAIL_REGEX.test(email);
  },
  isValidUsername: (username: string) => {
    return regexConst.USERNAME_REGEX.test(username);
  },
  isValidPhoneNumber: (phoneNumber: string) => {
    return regexConst.PHONE_NUMBER_REGEX.test(phoneNumber);
  },
  isValidCardNumber: (cardNumber: string) => {
    if (cardNumber.length !== 16) {
      return false;
    }

    let sum = 0;
    for (let i = 0; i < 16; i++) {
      let digit = parseInt(cardNumber[15 - i], 10);
      // 가장 오른쪽 숫자부터 시작해서 짝수번째에 해당하는 자릿수에 2를 곱한다.
      if ((i + 1) % 2 === 0) {
        digit *= 2;
        // 곱한 수가 9 이상일 경우 각 자리수를 더한다.
        if (digit >= 10) {
          digit = Math.floor(digit / 10) + (digit % 10);
        }
      }
      sum += digit;
    }

    return sum % 10 === 0;
  },
};

export default validationUtil;
