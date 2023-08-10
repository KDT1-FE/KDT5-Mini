import { useNavigate } from "react-router-dom";
import "./AccessRestrictionPage.scss";

const AccessRestrictionPage = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="guide_wrap">
        <div className="main_text">접근이 제한된 서비스입니다.</div>
        <div className="sub_text">
          아래의 버튼을 클릭하시면 로그인 페이지로 이동합니다.
        </div>
        <button className="nav_btn" onClick={() => navigate("/")}>
          <span className="text">로그인 페이지</span>로 이동
          <span className="icon"> 👉</span>
        </button>
      </div>
      <div className="bg_circle">
        <span className="bg_text">ㅠ_ㅠ</span>
      </div>
    </div>
  );
};

export default AccessRestrictionPage;
