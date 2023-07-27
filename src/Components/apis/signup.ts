// 회원가입
import axios from "axios";

export const signUp = async (email, password, name, join) => {
  try {
    const result = await axios.post(`${url}`, {
      email,
      password,
      name,
      join,
    });
    return result.data;
  } catch (error) {
    // API 호출 중 오류 발생 처리
    if (error.response) {
      // 서버에서 응답한 에러인 경우
      console.log("API 응답 에러:", error.response.data);
      throw new Error("회원가입 실패: 서버 오류");
    } else if (error.request) {
      // 요청을 보낸 후 응답을 받지 못한 경우 (네트워크 문제 등)
      console.log("API 요청 에러:", error.request);
      throw new Error("회원가입 실패: 네트워크 오류");
    } else {
      // 기타 오류 처리
      console.log("기타 에러:", error.message);
      throw new Error("회원가입 실패: 기타 오류");
    }
  }
};
