import axios from "axios";
import { Cookies } from "react-cookie";
const cookie = new Cookies;
const coo = cookie.get('accessToken')
export const ApiHttp = axios.create({
  baseURL: "/mini",
  headers:{
    Authorization: `Bearer ${coo}`
  }
});

// local storage, session control api 추가 필요


export async function getMyPage() {
  try {
    const res = await ApiHttp.get('my.json')
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getUser() {
  try{
    const res = await ApiHttp.get('user.json')
    return res.data;
  } catch (error) {
    console.error('유저 data를 받아 오는데 실패 하였습니다.')
  }
}

// 로그인 api
export async function postLogin(data:LoginType) {
  try{
    const res = await ApiHttp.post('login',data)
    return res.data;
  } catch (error) {
    console.error('로그인에 실패 하였습니다.')
  }
}

// 회원등록 api
export async function postRegister(data:User) {
  try{
    const res = await ApiHttp.post('/register',data)
    return res.data;
  } catch (error) {
    console.error('등록에 실패 하였습니다.')
  }
}

export async function getMainCalendar() {
  try{
    const res = await ApiHttp.get('/api/main')
    return res.data;
  } catch (error) {
    console.error('data를 가져오는데 실패 하였습니다.')
  }
}

export async function postAnnual(data:AnnualType|DutyType) {
  try{
    const res = await ApiHttp.post('/annual',data)
    return res.data;
  } catch (error){
    console.log('연차/당직 등록에 실패하였습니다.')
  }
}

