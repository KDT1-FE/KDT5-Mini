import Main from "./pages/Main/main.tsx";
import Mypage from "./pages/Mypage/mypage.tsx";
import Admin from "./pages/Admin/admin.tsx";
import { Route, Routes } from "react-router-dom";
// import ProtectedRoute from "./Components/ProtectedRoute.tsx";

function App() {
  return (
  <Routes>
    <Route path="/" element={<Main />} />
    <Route path={'/mypage'} element={<Mypage />} />
      {/* <Route path={"/admin"} element={<ProtectedRoute adminRequired={true} element={<Admin />}} /> */}
  </Routes>
  )
}

export default App;
