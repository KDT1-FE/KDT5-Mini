import axios from 'axios';
import { Cookies } from 'react-cookie';
import { clientInstance } from '@/api/axios';

const cookie = new Cookies();
const accessToken = cookie.get('accessToken');
const employeeId = cookie.get('employeeId');

// 개인 정보 조회
export default async function memberInfo() {
  try {
    const response = await axios.get(
      `${clientInstance.defaults.baseURL}/api/personal-info/${employeeId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    return response.data;
  } catch (error: any) {
    return error;
  }
}
