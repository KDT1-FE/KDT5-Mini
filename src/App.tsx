import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import SignUpPage from "./pages/SignUpPage/SignUpPage.tsx";
import Main from "./pages/Main/main.tsx";
import Mypage from "./pages/Mypage/mypage.tsx";
import Admin from "./pages/Admin/admin.tsx";
import { Route, Routes, Navigate } from "react-router-dom";
import Modal from "react-modal";
import { CookiesProvider, useCookies } from "react-cookie";
import React, { useEffect, useState } from "react";
import PrivateRoute from "./utils/PrivateRoute.tsx";
import AccessRestrictionPage from "./pages/AccessRestrictionPage/AccessRestrictionPage.tsx";

Modal.setAppElement("#root");

function App() {
  const [cookies, setCookie] = useCookies(["accessToken"]);
  const [isLogined, setIsLogined] = useState(!!cookies.accessToken);

  useEffect(() => {
    setIsLogined(!!cookies.accessToken);
  }, [cookies.accessToken]);
  
  return (
    <CookiesProvider>
      <Routes>
        <Route path="/" element={<LoginPage setIsLogined={setIsLogined} />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forbidden" element={<AccessRestrictionPage />} />
        <Route
          path="/main"
          element={
            <PrivateRoute
              isLogined={isLogined}
              element={<Main />}
              fallbackPath="/forbidden"
            />
          }
        />
        <Route
          path="/mypage"
          element={
            <PrivateRoute
              isLogined={isLogined}
              element={<Mypage />}
              fallbackPath="/forbidden"
            />
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute
              isLogined={isLogined}
              element={<Admin />}
              fallbackPath="/forbidden"
            />
          }
        />
      </Routes>
    </CookiesProvider>
  );
}
export default App;
