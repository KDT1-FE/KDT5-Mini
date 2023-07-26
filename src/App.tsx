import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import { Route, Routes } from "react-router-dom";
// import Main from "./pages/Main/main.tsx";
// import ProtectedRoute from "./Components/ProtectedRoute.tsx";
// import Admin from "./pages/Admin/admin.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      {/*<Route path="/admin" */}
      {/*       element={<ProtectedRoute adminRequired={true} element={<Admin />}*/}
    </Routes>
  );
}

export default App;
