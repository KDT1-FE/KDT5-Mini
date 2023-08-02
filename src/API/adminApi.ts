import axios from "axios";

export const ApiHttp = axios.create({
  baseURL: "@/Api/data/",
});

//어드민 페이지_연차/당직 리스트업
export async function getListAll() {
  try {
    const res = await axios.get("src/Api/data/adminApi.json");
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
