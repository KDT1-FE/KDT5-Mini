import axios from 'axios';
import { clientInstance } from '@/api/axios';
import { ILeaveProps } from '@/types/IAdmin';
import { Cookies } from 'react-cookie';

const cookie = new Cookies();
const accessToken = cookie.get('accessToken');

export default async function dayOffList(): Promise<ILeaveProps> {
  try {
    const response = await axios.get<ILeaveProps>(
      `${clientInstance.defaults.baseURL}/api/admin/day-offs`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('DAYOFF_FAILURE', error);
    throw error;
  }
}
//연차요청관리페이지
