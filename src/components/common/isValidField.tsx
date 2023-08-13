import { IIsValidPw } from '@/types/IAuth';

export const isValidPwField = ({ value, regex }: IIsValidPw) => {
  if (value.trim() === '') {
    return true;
  }
  return regex.test(value);
};
