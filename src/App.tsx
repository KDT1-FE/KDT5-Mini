import Main from "./pages/Main/main.tsx";
import { Route, Routes } from "react-router-dom";
import Mypage from "./pages/Mypage/mypage.tsx";
// import ProtectedRoute from "./Components/ProtectedRoute.tsx";
// import Admin from "./pages/Admin/admin.tsx";


function App() {
  return (
  <Routes>
    <Route path="/" element={<Main />} />
    <Route path={'/mypage'} element={<Mypage />} />
    {/*<Route path="/admin" */}
    {/*       element={<ProtectedRoute adminRequired={true} element={<Admin />}*/}
  </Routes>
  )
}

export default App
