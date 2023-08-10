const emailValidation = {
  required: '이메일은 필수 입력입니다.',
  pattern: {
    value: /\S+@\S+\.\S+/,
    message: '이메일 형식에 맞지 않습니다.',
  },
};

const PWValidation = {
  required: '비밀번호는 필수 입력입니다.',
  pattern: {
    value: /^[A-za-z0-9]*$/,
    message: '영문과 숫자만 가능합니다.',
  },
  minLength: {
    value: 8,
    message: '비밀번호는 8 ~ 20자입니다.',
  },
};

const nameValidation = {
  required: '이름은 필수 입력입니다.',
  minLength: {
    value: 2,
    message: '이름은 2자 이상입니다.',
  },
};

const hospitalValidation = {
  required: '재직 병원은 필수 입력입니다.',
};

const deptValidation = {
  required: '근무 파트는 필수 입력입니다.',
};

const phoneValidation = {
  required: '연락처는 필수 입력입니다.',
  minLength: {
    value: 10,
    message: '연락처는 10자 이상입니다.',
  },
};

export { emailValidation, PWValidation, nameValidation, hospitalValidation, deptValidation, phoneValidation };
