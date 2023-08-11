import axios from 'axios';
import { Cookies } from 'react-cookie';
import { clientInstance } from '@/api/axios';
import { IAuthResetPw } from '@/types/IAuth';

const cookie = new Cookies();
const accessToken = cookie.get('accessToken');

// * [POST] 비로그인 시 비밀번호 재설정
export async function requestResetPw(resetPwData: IAuthResetPw) {
  try {
    const response = await axios.post(
      `${clientInstance.defaults.baseURL}/api/auth/users/password/reset`,
      resetPwData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    return response;
  } catch (error) {
    console.error('INVALID_PASSWORD', error);
    throw error;
  }
}
