import axios from 'axios';
import { clientInstance } from '@/api/axios';
import { IModifyDetailProps } from '@/types/IAdmin';
import { Cookies } from 'react-cookie';

const cookie = new Cookies();
const accessToken = cookie.get('accessToken');

export default async function modifyDetail(
  employeeId: number
): Promise<IModifyDetailProps> {
  try {
    const response = await axios.get<IModifyDetailProps>(
      `${clientInstance.defaults.baseURL}/api/admin/employee/${employeeId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('MODIFYDETAIL_FAILURE', error);
    throw error;
  }
}
//수정페이지 직원상세정보보기
