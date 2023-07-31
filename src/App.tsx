import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import Mypage from "./pages/Mypage/mypage.tsx";
import Admin from "./pages/Admin/admin.tsx";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main/main.tsx";
import SignUpPage from "./pages/SignUpPage/SignUpPage.tsx";
import "./App.css";
// import ProtectedRoute from "./Components/ProtectedRoute.tsx";

function App() {
  return (
  <Routes>
    <Route path={'/'} element={<LoginPage />} />
    <Route path="/main" element={<Main />} />
    <Route path={'/mypage'} element={<Mypage />} />
      {/* <Route path={"/admin"} element={<ProtectedRoute adminRequired={true} element={<Admin />}} /> */}
  </Routes>
  )
}

export default App;
