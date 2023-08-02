import axios from "axios";

export const ApiHttp = axios.create({
  baseURL: "http://52.78.200.157/api",
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
    const response = await axios.post(
      "http://52.78.200.157/api/login",
      {
        email,
        password,
      },
      { withCredentials: true },
    );

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
    const response = await axios.post("http://52.78.200.157/api/register", {
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
