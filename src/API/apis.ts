import axios from "axios";
import { Cookies, useCookies } from "react-cookie";

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

// 재요청 인스턴스
// export const getSilentAxios = (token) => {
//   const silentAxios = axios.create({
//     baseURL: "/mini",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   silentAxios.interceptors.response.use(
//     (res) => res,
//     (error) => {
//       if (error.response.status === 403 || error.response.status === 401) {
//         getNewAccessToken().then((NEW_ACCESSTOKEN) => {
//           const config = error.config;
//           config.headers.Authorization = NEW_ACCESSTOKEN;
//           document.cookie = `accessToken=${NEW_ACCESSTOKEN}; path=/; `;
//           axios
//             .get(config.url, config)
//             .then((res) => {
//               return res.data;
//             })
//             .catch((error) => {
//               console.log("재요청에러: ", error);
//             });
//         });
//       }
//     },
//   );
//   return silentAxios;
// };
export const getSilentAxios = (token) => {
  const silentAxios = axios.create({
    baseURL: "/mini",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  silentAxios.interceptors.response.use(
    async (res) => res,
    async (error) => {
      if (error.response.status === 403 || error.response.status === 401) {
        try {
          const NEW_ACCESSTOKEN = await getNewAccessToken();
          const config = error.config;
          config.headers.Authorization = `Bearer ${NEW_ACCESSTOKEN}`;
          document.cookie = `accessToken=${NEW_ACCESSTOKEN}; path=/; `;
          const response = await axios.get(config.url, config);
          return response.data;
        } catch (error) {
          console.log("재요청에러: ", error);
        }
      }
      throw error;
    },
  );
  return silentAxios;
};

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
    const newAccessToken = response.data.accessToken;
    return newAccessToken;
  } catch (error) {
    console.error("getNewAccessTokenAPI에러: ", error);
    throw error;
  }
};

// ADMIN_PAGE
export const getListAll = async () => {
  try {
    const res = await ApiHttp.get("/api/admin", {
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

// GET_MY_PAGE
export const getMyPage = async () => {
  try {
    const response = await ApiHttp.get("/api/user");
    return response.data;
  } catch (error) {
    console.error("getMyPage API에러: ", error);
    if (error.response.status === 403 || error.response.status === 401) {
      console.log("새 토큰 보내고 정보 받아오는 중");
      const ACCESSTOKEN = getAccessToken();
      const silentAxios = getSilentAxios(ACCESSTOKEN);
      const result = await silentAxios.get("/mypage");
      return result.data;
    }
  }
};

// export const getMyPage = async () => {
//   const ACCESSTOKEN = getAccessToken();
//   const silentAxios = getSilentAxios(ACCESSTOKEN);
//   const result = await silentAxios.get("/mypage");
//   return result.data;
// };

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
export const getMainPage = () => {
  try {
    const response = ApiHttp.get("/api/main", {
      headers: {
        Authorization: `Bearer ${ACCESSTOKEN}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const postMain = async (
  title: string,
  category: string,
  endDate: string,
  reason: string,
  startDate: string,
) => {
  try {
    const response = await ApiHttp.post("/api/annual", {
      title,
      category,
      endDate,
      reason,
      startDate,
    });
    return response.data;
  } catch (error) {
    console.log("signupAPI호출 :", error);
  }
};
