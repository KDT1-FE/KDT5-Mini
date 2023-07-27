import axios from "axios";
import { getNewRefreshToken } from "./getNewRefreshToken";

// 인스턴스화
export const getAuthAxios = (token) => {
  const { accessToken } = token;
  const authAxios = axios.create({
    baseURL: `${url}`,
    headers: {
      Authorization: accessToken,
    },
  });
  authAxios.interceptors.response.use((res = res), async (error) => {
    if (error.response.status === 401) {
      const { accessToken, refreshToken } = await getNewRefreshToken();
      error.config.headers.Authorization = accessToken;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      return (await axios.get(error.config.url, error.config)).data;
    }
  });
  return authAxios;
};
