import axios from "axios";
import { getNewRefreshToken } from "./getNewRefreshToken";

// 인스턴스화
export const getAuthAxios = (token:string) => {
  const { accessToken } = token;
  const authAxios = axios.create({
    baseURL: `${url}`,
    headers: {
      Authorization: accessToken,
    },
  });
  authAxios.interceptors.response.use((res => res), async (error) => {
    if (error.response.status === 401) {
      const { accessToken, refreshToken } = await getNewRefreshToken();
      error.config.headers.Authorization = accessToken;
      sessionStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      return (await axios.get(error.config.url, error.config)).data;
    }
  });
  return authAxios;
};
