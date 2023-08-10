import { logOut } from "@/Api/apis";
import { Cookies, useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const [, , removeCookies] = useCookies();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // 먼저 페이지 이동
      navigate("/");

      // 페이지 이동 후에 토큰 제거
      const res = await logOut();
      if (res) {
        console.log(res);
        localStorage.removeItem("role");
        removeCookies("accessToken");

        alert("로그아웃 되셨습니다.");

        // 페이지 새로고침
        window.location.reload();
      }
    } catch (error) {
      console.error("로그아웃이 실패 하였습니다.", error);
    }
  };

  return <li onClick={handleLogout}>로그아웃</li>;
};

export default Logout;
