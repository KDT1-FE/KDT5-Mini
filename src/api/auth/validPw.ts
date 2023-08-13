import axios from 'axios';
import { Cookies } from 'react-cookie';
import { clientInstance } from '@/api/axios';
import { IAuthValidPw } from '@/types/IAuth';

const cookie = new Cookies();
const employeeId = cookie.get('employeeId');
const accessToken = cookie.get('accessToken');

// * [POST] 입력한 비밀번호가 DB와 일치하는지 검사를 위한 작업
export async function requestValidPw(passwordData: IAuthValidPw) {
  const response = await axios.post(
    `${clientInstance.defaults.baseURL}/api/auth/users/${employeeId}/check-password`,
    passwordData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );
  return response;
}
