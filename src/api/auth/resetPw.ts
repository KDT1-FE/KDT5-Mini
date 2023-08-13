import axios from 'axios';
import { clientInstance } from '@/api/axios';
import { IAuthResetPw } from '@/types/IAuth';

// * [POST] 비로그인 시 비밀번호 재설정
export async function requestResetPw(resetPwData: IAuthResetPw) {
  try {
    const response = await axios.post(
      `${clientInstance.defaults.baseURL}/api/auth/users/password/reset`,
      resetPwData
    );
    return response;
  } catch (error) {
    console.error('INVALID_PASSWORD', error);
  }
}
