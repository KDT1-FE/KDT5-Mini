import axios from "axios";
import { Cookies } from "react-cookie";

export const getAccessToken = () => {
  const cookie = new Cookies();
  return cookie.get("accessToken");
};

const ACCESSTOKEN = getAccessToken();

export const ApiHttp = axios.create({
  baseURL: "/mini",
  headers: {
    Authorization: `Bearer ${ACCESSTOKEN}`,
  },
});

export const ApiLogin = axios.create({
  baseURL: "/mini",
});

// NEW_ACCESSTOKEN (리프레시 토큰 요청 => 새로운 엑세스 토큰 반환)
export const getNewAccessToken = async () => {
  try {
    const response = await ApiHttp.post(
      "/api/token",
      {},
      {
        headers: {
          Authorization: `Bearer ${ACCESSTOKEN}`,
        },
        withCredentials: true,
      },
    );
    const newAccessToken = response.data;
    return newAccessToken;
  } catch (error) {
    console.error("getNewAccessTokenAPI에러: ", error);
    throw error;
  }
};

// ADMIN_PAGE
export const getListAll = async () => {
  try {
    const res = await ApiHttp.get("/api/admin/", {
      headers: {
        Authorization: `Bearer ${ACCESSTOKEN}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// ADMIN_연차/당직 승인 처리
export const permission = async () => {
  try {
    const res = await ApiHttp.post("/api/admin/apply", {
      headers: {
        Authorization: `Bearer ${ACCESSTOKEN}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// GETMYPAGE
export const getMyPage = async () => {
  try {
    const response = await ApiHttp.get("/api/user", {
      headers: {
        Authorization: `Bearer ${ACCESSTOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("getMyPageAPI에러: ", error);

    if (error.response.status === 403 || error.response.status === 401) {
      console.log("새 토큰 보내고 정보 받아오는 중");

      getNewAccessToken().then((NEW_ACCESSTOKEN) => {
        const config = error.config;
        config.headers.Authorization = NEW_ACCESSTOKEN;

        document.cookie = `accessToken=${NEW_ACCESSTOKEN}; path=/; `;

        ApiHttp.get(config.url, config)
          .then((res) => {
            return res.data;
          })
          .catch((error) => {
            console.log("재요청에러: ", error);
          });
      });
    }
  }
};

// LOG_IN
export const login = async (email: string, password: string) => {
  try {
    return await ApiLogin.post(
      "/api/login",
      {
        email,
        password,
      },
      { withCredentials: true },
    );
  } catch (error) {
    console.log("loginApi호출 : ", error);
  }
};

// LOG_OUT
export async function logOut() {
  try {
    const res = await ApiHttp.post("/api/logout");
    return res;
  } catch (error) {
    console.error("로그아웃이 실패 하였습니다.", error);
  }
}

// SIGN_UP
export const signUp = async (
  email: string,
  password: string,
  name: string,
  join: string,
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

// GET_MAIN_PAGE
export const getMainPage = (token) => {
  try {
    const response = ApiHttp.get("/api/main", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export async function postMain(data: NewEvent) {
  try {
    await ApiHttp.post("/api/annual", { data }).then((res) => {
      console.log("새로운 등록 완료", res.data);
      return res.data;
    });
  } catch (error) {
    console.error("Error submitting event:", error);
  }
}
