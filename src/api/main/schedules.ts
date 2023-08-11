import axios from 'axios';
import { clientInstance } from '@/api/axios';
import { Cookies } from 'react-cookie';

const cookie = new Cookies();
const accessToken = cookie.get('accessToken');
const employeeId = cookie.get('employeeId');

export default async function requestSchedules() {
  try {
    const response = await axios.get(
      `${clientInstance.defaults.baseURL}/api/schedules/${employeeId}`,
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
