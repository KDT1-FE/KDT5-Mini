import { useNavigate } from "react-router-dom";
import "./AccessRestrictionPage.scss";

const AccessRestrictionPage = () => {
  const navigate = useNavigate();
  return (
    <div className="page">
      <div className="guideWrap">
        <div className="main-guide">로그인이 필요한 서비스입니다.</div>
        <div className="sub-guide">
          아래의 버튼을 클릭하시면 로그인 페이지로 이동합니다.
        </div>
        <button className="naviate-btn" onClick={() => navigate("/")}>
          <span>로그인 페이지</span>로 이동 ▶️
        </button>
      </div>
      <div className="half-circle">
        <div className="bear-face">
          <div className="bear-eyes"></div>
          <div
            className="bear-eyes"
            style={{
              right: "50%",
            }}
          ></div>
          <div className="bear-mouth"></div>
        </div>
      </div>
    </div>
  );
};

export default AccessRestrictionPage;
