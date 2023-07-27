import Main from "./pages/Main/main.tsx";
import Admin from "./pages/Adminpage/adminpage.tsx";
import { Route, Routes } from "react-router-dom";
// import ProtectedRoute from "./Components/ProtectedRoute.tsx";
// import Admin from "./pages/Admin/admin.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/admin" element={<Admin />} />
      {/*       element={<ProtectedRoute adminRequired={true} element={<Admin />}*/}
    </Routes>
  );
}

export default App;
