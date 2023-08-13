import axios from 'axios';
import { clientInstance } from '@/api/axios';
import { Cookies } from 'react-cookie';

const cookie = new Cookies();
const accessToken = cookie.get('accessToken');

export default async function modifyRes(data: FormData) {
  try {
    const response = await axios.put(
      `${clientInstance.defaults.baseURL}/api/admin/employee`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('MODIFY_FAILURE', error);
    throw error;
  }
}
//직원상세정보 수정페이지 수정요청
