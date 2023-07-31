import axios from "axios";

export const ApiHttp = axios.create({
  baseURL: "src/Api/data/"
});

// local storage, session control api 추가 필요


export async function getMyPage() {
  try {
    const res = await ApiHttp.get('my.json')
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUser() {
  try{
    const res = await ApiHttp.get('user.json')
    return res.data;
  } catch (error) {
    console.error('유저 data를 받아 오는데 실패 하였습니다.')
    throw error;
  }
}