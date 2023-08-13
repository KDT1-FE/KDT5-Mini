import axios from 'axios';
import { clientInstance } from '@/api/axios';
import { IApplyDayOff, IChangeDayOff, ICancelDayOff } from '@/types/IDayOff';
import { Cookies } from 'react-cookie';

const cookie = new Cookies();
const accessToken = cookie.get('accessToken');

export async function requestDayOff(requestData: IApplyDayOff) {
  try {
    const response = await axios.post(
      `${clientInstance.defaults.baseURL}/api/schedules/day-off`,
      requestData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    alert('신청이 완료되었습니다.');
    return response;
  } catch (error) {
    console.error('Request_Fail', error);
    throw error;
  }
}

export async function changeDayOff(requestChange: IChangeDayOff) {
  try {
    const response = await axios.put(
      `${clientInstance.defaults.baseURL}/api/schedules/day-off/${requestChange.dayOffId}`,
      requestChange,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    return response
  } catch (error) {
    console.error('Request_Fail', error);
    throw error;
  }
}

export async function cancelDayOff(requestChange: ICancelDayOff) {
  try {
    const response = await axios.put(
      `${clientInstance.defaults.baseURL}/api/schedules/day-off/{${requestChange.dayOffId}}/${requestChange.status}`,
      requestChange,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    return response
  } catch (error) {
    console.error('Request_Fail', error);
    throw error;
  }
}
