import axios from 'axios';
import { clientInstance } from '@/api/axios';
import { IDutyDetailProps } from '@/types/IAdmin';
import { Cookies } from 'react-cookie';

const cookie = new Cookies();
const accessToken = cookie.get('accessToken');

export default async function detailDuty(
  employeeId: number
): Promise<IDutyDetailProps> {
  try {
    const response = await axios.get<IDutyDetailProps>(
      `${clientInstance.defaults.baseURL}/api/admin/employees/${employeeId}/duties`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('DETAILDUTY_FAILURE', error);
    throw error;
  }
}
//승인된 당직
