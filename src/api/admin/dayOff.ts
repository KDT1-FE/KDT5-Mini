import axios from 'axios';
import { clientInstance } from '@/api/axios';
import { Cookies } from 'react-cookie';

const cookie = new Cookies();
const accessToken = cookie.get('accessToken');

export default async function dayOffList() {
  try {
    const response = await axios.get(
      `${clientInstance.defaults.baseURL}/api/admin/day-offs`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    return response.data;
  } catch (error) {}
}
//연차요청관리페이지
