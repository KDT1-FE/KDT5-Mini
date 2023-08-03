import axios from "axios";
export const ApiHttp = axios.create({
  baseURL: "https://miniproject-team9.p-e.kr/api",
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
// 로그인 요청
export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post("https://miniproject-team9.p-e.kr/api/login", {
      email,
      password,
    });
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
    const response = await axios.post("https://miniproject-team9.p-e.kr/api/register", {
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