import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main/main.tsx";
import SignUpPage from "./pages/SignUpPage/SignUpPage.tsx";
import "./App.css";
// import ProtectedRoute from "./Components/ProtectedRoute.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/main" element={<Main />} />
      {/*       element={<ProtectedRoute adminRequired={true} element={<Admin />}*/}
    </Routes>
  );
}

export default App;
