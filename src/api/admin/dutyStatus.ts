import axios from 'axios';
import { clientInstance } from '@/api/axios';
import { IModifyProps, IDutyReqProps } from '@/types/IAdmin';
import { Cookies } from 'react-cookie';

const cookie = new Cookies();
const accessToken = cookie.get('accessToken');

// 근무 상태 변경 요청 함수
export default async function dutyRes(
  requestBody: IDutyReqProps
): Promise<IModifyProps> {
  try {
    const response = await axios.put<IModifyProps>(
      `${clientInstance.defaults.baseURL}/api/admin/duties`,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('DUTYRES_FAILURE', error);
    throw error;
  }
}
