import { useNavigate } from "react-router-dom";
const AccessRestrictionPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>로그인이 필요한 서비스입니다.</h1>
      <h2>아래의 버튼을 클릭하시면 로그인 페이지로 이동합니다.</h2>
      <button onClick={() => navigate("/")}>로그인 페이지 이동</button>
    </div>
  );
};
export default AccessRestrictionPage;
