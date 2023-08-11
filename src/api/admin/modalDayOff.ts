import axios from 'axios';
import { clientInstance } from '@/api/axios';
import { IDayOffDetailProps } from '@/types/IAdmin';
import { Cookies } from 'react-cookie';

const cookie = new Cookies();
const accessToken = cookie.get('accessToken');

export default async function detailDayOff(
  employeeId: number
): Promise<IDayOffDetailProps> {
  try {
    const response = await axios.get<IDayOffDetailProps>(
      `${clientInstance.defaults.baseURL}/api/admin/employees/${employeeId}/day-offs`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('DETAILDAYOFF_FAILURE', error);
    throw error;
  }
}
//승인된 연차
