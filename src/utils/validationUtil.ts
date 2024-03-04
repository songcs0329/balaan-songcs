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
};

export default validationUtil;
