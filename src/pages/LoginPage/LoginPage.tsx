import { FormEvent, useState } from "react";
import "./LoginPage.scss";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { login } from "@/Api/apis.ts";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cookies, setCookie] = useCookies(["accessToken"]);
  console.log(cookies);

  // input 유효성 검사

  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [passwordValid, setPasswordValid] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const regex =
      /^(([^<>()\\[\].,;:\s@"]+(\.[^<>()\\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    setEmailValid(regex.test(e.target.value));
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    setPasswordValid(regex.test(e.target.value));
  };

  const onClickLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      console.log(response);

      // 쿠키에 저장 리프레쉬 토큰
      const accessToken = response?.data;
      if (response) {
        setCookie("accessToken", accessToken );
        alert("로그인 성공");
      }
    } catch (error) {
      alert("로그인 실패");
      console.log("LoginPageError: ", error);
      // console.log(email, password);
    }
  };

  return (
    <div className="login_page">
      <form className="login_box" onSubmit={onClickLogin}>
        <div className="title_Wrap">로그인</div>
        <div className="content_Wrap">
          <div className="content_box">
            <div className="inputWrap">
              <input
                className="input"
                placeholder="이메일"
                value={email}
                onChange={handleEmail}
              />
            </div>
            <div className="inputErrorMessage">
              {!emailValid && email.length > 0 && (
                <div>올바른 이메일 형식을 입력해주세요.</div>
              )}
            </div>
          </div>
          <div className="content_box">
            <div className="inputWrap">
              <input
                className="input"
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={handlePassword}
              />
            </div>
            <div className="inputErrorMessage">
              {!passwordValid && password.length > 0 && (
                <div>
                  영문, 숫자, 특수문자 포함 8자 이상 정규식 (추후 조건 따라 변경 필요)
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="btn_Wrap">
          <button className="login_btn" onClick={onClickLogin}>
            로그인
          </button>
          <div className="signup_btn" onClick={() => navigate("/signup")}>
            회원가입
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
