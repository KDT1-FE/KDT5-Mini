import { atom } from 'recoil';
import { ISignInRequestBody } from '@/types/ILogIn';

export const signInState = atom<ISignInRequestBody>({
  key: 'signInState',
  default: {
    email: '',
    password: ''
  }
});
