import axios from "axios";
import { Cookies } from "react-cookie";
const cookie = new Cookies();
const token = cookie.get("accessToken");

export const ApiHttp = axios.create({
  baseURL: "/mini",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
export const ApiLogin = axios.create({
  baseURL: "/mini"
});


// 리프레시 토큰 요청 => 새로운 엑세스 토큰 반환
export const getNewAccessToken = async () => {
  const cookie = new Cookies();
  const accessToken = cookie.get("accessToken");
  const refreshToken = cookie.get("refreshToken");

  const response = ApiHttp.post(
    "/api/token",
    { refreshToken },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    },
  );
  const newAccessToken = await response;
  return newAccessToken;
};



export const getMyPage = (token: any) => {
  try {
    const response = ApiHttp.get("/api/user", {
      headers: {
        Authorization: `Bearer ${"token"}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
// 어드민 페이지_연차/당직 승인 처리
// /api/admin/apply
export async function permission() {
  try {
    const res = await axios.post("src/Api/data/admin.json");
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


// 로그인 요청
export const login = async (email: string, password: string) => {
  try {
    return await ApiLogin.post("/api/login", { email, password }).then(
      (res) => {
        return res;
      },
    );
  } catch (error) {
    console.error("로그인 에러 : ", error);
  }
};

export async function logOut () {
  try{
    const res =  await ApiHttp.post('/api/logout')
    return res

  } catch (error) {
    console.error("로그아웃이 실패 하였습니다.", error);
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
    const response = await ApiLogin.post("/api/register", {
      email,
      password,
      name,
      join,
    });
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