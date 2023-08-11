import axios from 'axios';
import { clientInstance } from '@/api/axios';
import { Cookies } from 'react-cookie';

const cookie = new Cookies();
const accessToken = cookie.get('accessToken');

export default async function memberModify(data: FormData) {
  try {
    const response = await axios.put(
      `${clientInstance.defaults.baseURL}/api/personal-info`,
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
    console.error('MEMBERMODIFY_FAILURE', error);
    throw error;
  }
}
