import axios from "axios";

export const ApiHttp = axios.create({
  baseURL: "@/Api/data/"
});

// local storage, session control api 추가 필요


export async function getMyPage() {
  try {
    const res = await axios.get("src/Api/data/my.json")
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}