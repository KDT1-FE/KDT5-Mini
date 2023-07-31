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

// login 호출
export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post("/back-end-api/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log("loginApi: ", error);
  }
};

