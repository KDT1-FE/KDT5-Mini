import { logOut } from "@/Api/apis";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

// LOG_OUT
const Logout = () => {
  const [, , removeCookie] = useCookies(["accessToken"]);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // const ACCESSTOKEN = getAccessToken();
      const res = await logOut();
      if (res) {
        console.log(res);
        localStorage.removeItem("role");
        removeCookie("accessToken");
        navigate("/");
      }
    } catch (error) {
      console.error("로그아웃이 실패 하였습니다.", error);
    }
  };

  return <li onClick={handleLogout}>로그아웃</li>;
};
export default Logout;
