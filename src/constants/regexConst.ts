const regexConst = {
  EMAIL_REGEX: /^[a-zA-Z0-9!#$%&'*+-/=?^_`{|}~.]+@[a-zA-Z0-9-]+.[a-zA-Z]{2,}$/,
  PASSWORD_REGEX:
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  USERNAME_REGEX: /^(?:[가-힣]{2,}|[a-zA-Z]{3,})$/,
  PHONE_NUMBER_REGEX: /^(0[1-9][0-9]?)([-\s]?)(\d{3,4})([-\s]?)(\d{4})$/,
};

export default regexConst;
