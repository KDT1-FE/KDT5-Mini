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

export async function getMyPage() {
  try {
    const res = await axios.get("src/Api/data/my.json");
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// 어드민 페이지_연차/당직 리스트업 => adminApi에서 가져온 코드
export async function getListAll() {
  try {
    const res = await axios.get("src/Api/data/adminApi.json");
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// 기존 api에서 가져온 코드
export async function getUser() {
  try {
    const res = await axios.get("src/Api/data/user.json");
    return res.data;
  } catch (error) {
    console.error("유저 data를 받아 오는데 실패 하였습니다.");
    throw error;
  }
}


// 로그인 요청
export const login = async (email: string, password: string) => {
  try {
    const response = await ApiHttp.post(
      "/api/login",
      {
        email,
        password,
      },
      { withCredentials: true },
    );
    console.log(coo);
    return response;
  } catch (error) {
    console.log("loginApi호출 : ", error);
  }
};

// 회원가입 요청
export const signUp = async (
  email: string,
  password: string,
  name: string,
  join: string,
) => {
  try {
    const response = await axios.post(
      "/api/register",
      {
        email,
        password,
        name,
        join,
      },
    );
    return response.data;
  } catch (error) {
    console.log("signupAPI호출 :", error);
  }
};

