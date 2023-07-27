import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import SignUpPage from "./pages/SignUpPage/SignUpPage.tsx";
import Main from "./pages/Main/main.tsx";
import Mypage from "./pages/Mypage/mypage.tsx";
import Admin from "./pages/Admin/admin.tsx";
import { Route, Routes } from "react-router-dom";
// import ProtectedRoute from "@/routes/ProtectedRoute";


function App() {
  return (
    <Routes>
      {/* 로그인 */}
      <Route path="/" element={<LoginPage />} />
      {/* 회원가입 */}
      <Route path="/signup" element={<SignUpPage />} />
      {/* 스케쥴 캘린더  */}
      <Route path={"/main"} element={<Main />} />
      {/* 마이 페이지 */}
      <Route path={"/mypage"} element={<Mypage />} />
      {/* 어드민 페이지 */}
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
