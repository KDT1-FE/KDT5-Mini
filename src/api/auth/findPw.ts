import axios from 'axios';
import { IAuthFindPw } from '@/types/IAuth';
import { clientInstance } from '@/api/axios';

// * [POST] 비밀번호 변경을 위한 이메일 전송
export async function requestFindPw(findPwData: IAuthFindPw) {
  try {
    const response = await axios.post(
      `${clientInstance.defaults.baseURL}/api/auth/users/send-password-reset-email`,
      findPwData
    );
    return response;
  } catch (error) {
    console.error('INVALID_EMAIL', error);
    throw error;
  }
}
