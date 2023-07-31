import axios from "axios";

export const ApiHttp = axios.create({
  baseURL: "@/Api/data/",
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
    const response = await axios.post("/back-end-api/login", {
      email,
      password,
    });
    return response.data;
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
    const response = await axios.post("/back-end-api/signup", {
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
