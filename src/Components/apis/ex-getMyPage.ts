import axios from "axios";
import { getNewRefreshToken } from "./getNewRefreshToken";
import { getAuthAxios } from "./authAxios";

export const getMyPage = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const authAxios = getAuthAxios(accessToken);
  const result = await authAxios.get(`${url}`);
  return result.data;
};

// export const getMyPage = async () => {
//   const accessToken = localStorage.getItem("accessToken");
//   try {
//     const result = await axios.get($`{url}`, {
//       headers: {
//         Authorization: accessToken,
//       },
//     });
//     return result.data;
//   } catch (error) {
//     if (error.response.status === 401) {
//       // 인증 만료(유효하지 않은 인증)
//       const { accessToken, refreshToken } = await getNewRefreshToken();
//       error.config.headers.Authorization = accessToken;
//       sessionStorage.setItem("accessToken", accessToken);
//       sessionStorage.setItem("refreshToken", refreshToken);
//       return axios.get(error.config.url, error.config).data;
//     }
//   }
// };
