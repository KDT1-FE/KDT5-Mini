import axios from 'axios';
import { clientInstance } from '@/api/axios';
import { IApplyDuty, IChangeDuty, ICancelDuty } from '@/types/IDuty';
import { Cookies } from 'react-cookie';

const cookie = new Cookies();
const accessToken = cookie.get('accessToken');

export async function requestDuty(requestData: IApplyDuty) {
  try {
    const response = await axios.post(
      `${clientInstance.defaults.baseURL}/api/schedules/duty`,
      requestData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    if (response.data.code === 'OVERLAPPED_DUTY_DATE') {
      alert('이미 신청한 날짜입니다.');
    } else if (response.data.code === 'PAST_DATE') {
      alert(`${response.data.message}`);
    }
    return console.log(response.data);
  } catch (error) {
    console.error('Request_Fail', error);
    throw error;
  }
}

export async function changeDuty(requestChange: IChangeDuty) {
  try {
    const response = await axios.put(
      `${clientInstance.defaults.baseURL}/api/schedules/duty/`,
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

export async function cancelDuty(requestChange: ICancelDuty) {
  try {
    const response = await axios.put(
      `${clientInstance.defaults.baseURL}/api/schedules/day-off/status`,
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
