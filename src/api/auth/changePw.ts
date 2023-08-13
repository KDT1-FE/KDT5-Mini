import axios from 'axios';
import { clientInstance } from '@/api/axios';
import { IAuthChangePw } from '@/types/IAuth';
import { Cookies } from 'react-cookie';

const cookie = new Cookies();
const employeeId = cookie.get('employeeId');
const accessToken = cookie.get('accessToken');

// * [POST] 로그인 상태 비밀번호 변경
export async function requestChangePw(changePwData: IAuthChangePw) {
  try {
    const response = await axios.post(
      `${clientInstance.defaults.baseURL}/api/auth/users/${employeeId}/password/change`,
      changePwData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    return response;
  } catch (error) {
    console.error('INVALID_PASSWORD', error);
  }
}
