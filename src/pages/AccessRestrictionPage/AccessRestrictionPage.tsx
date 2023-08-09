import { useNavigate } from "react-router-dom";
import "./AccessRestrictionPage.scss";

const AccessRestrictionPage = () => {
  const navigate = useNavigate();
  return (
    <div className="page">
      <div className="guideWrap">
        <div className="main-guide">접근이 제한된 서비스입니다.</div>
        <div className="sub-guide">
          아래의 버튼을 클릭하시면 로그인 페이지로 이동합니다.
        </div>
        <button className="naviate-btn" onClick={() => navigate("/")}>
          <span>로그인 페이지</span>로 이동 <span className="icon">👉</span>
        </button>
      </div>
      <div className="half-circle"></div>
    </div>
  );
};

export default AccessRestrictionPage;
