import axios from "axios";
import { Cookies } from "react-cookie";
const cookie = new Cookies;
const token = cookie.get("accessToken");

export const ApiHttp = axios.create({
  baseURL: "/mini",
  headers: {
    Authorization: `Bearer ${token}`
  }
});

export const ApiLogin = axios.create({
  baseURL: "/mini"
});


export async function getMyPage() {
  try{
    const res = await ApiHttp.get('/api/user')
    return res.data
  } catch (error) {
    console.error('마이페이지를 읽어 오지 못햇습니다.',error)
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
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("유저 data를 받아 오는데 실패 하였습니다.");
    throw error;
  }
}

// 로그인 요청
export const login = async (email: string, password: string) => {
  try {
    return await ApiLogin.post(
      "/api/login",
      { email, password }
    ).then(res => {
      return res
    })
  } catch (error) {
    console.error("로그인 에러 : ", error);
  }
};

export async function logOut () {
  try{
    const res =  await ApiHttp.post('/api/logout')
    return res
  } catch (error) {
    console.error('로그아웃이 실패 하였습니다.',error)
  }
}

// 회원가입 요청
export const signUp = async (
  email: string,
  password: string,
  name: string,
  join: string
) => {
  try {
    const response = await ApiLogin.post(
      "/api/register",
      { email, password, name, join }
    );
    return response.data;
  } catch (error) {
    console.log("signupAPI호출 :", error);
  }
};

// 메인페이지 캘린더
export async function getMain() {
  try {
    const res = await ApiHttp.get("/api/main");
    return res.data;
  } catch (error) {
    console.error("메인 캘린더 로드에 실패하였습니다.");
  }
}

export async function postMain(data: NewEvent) {
  try {
    await ApiHttp.post("/api/annual", {data})
      .then((res) => {
        console.log("새로운 등록 완료", res.data);
        return res.data;
      });
  } catch (error) {
    console.error("Error submitting event:", error);
  }
}