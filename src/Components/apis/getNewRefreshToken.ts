// refreshToken 가져오기
import axios from "axios";

export const getNewRefreshToken = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const result = await axios.post(
    `${url}/refresh`,
    {
      refreshToken,
    },
    {
      headers: {
        Authorization: accessToken,
      },
    },
  );
  return result.data;
};
