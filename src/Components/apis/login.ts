// 로그인
import axios from "axios";


export const login = async ({email, password}:LoginType) => {
  try {
    const response = await axios.post(`${url}`, { email, password });
    return response.data; // 데이터 보고 출력 생각
  } catch (error) {
    console.log(error);
  }
};
