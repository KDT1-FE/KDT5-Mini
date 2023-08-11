import { clientInstance } from '@/api/axios';
import axios from 'axios';
import { Cookies } from 'react-cookie';

const cookie = new Cookies();
const accessToken = cookie.get('accessToken');
const employeeId = cookie.get('employeeId');

export default async function requestPersonal() {
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
  } catch (error) {
    console.error('Request_Fail', error);
    throw error;
  }
}
