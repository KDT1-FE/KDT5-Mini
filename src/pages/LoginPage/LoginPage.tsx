import { FormEvent, useState } from "react";
import "./LoginPage.scss";
import { useCookies } from "react-cookie";
import { login } from "../../API/apis";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cookies, setCookie] = useCookies(["AC_TOKEN", "RF_TOKEN"]);

  // input 유효성 검사
  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [passwordValid, setPasswordValid] = useState<boolean>(false);

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const regex =
      /^(([^<>()\\[\].,;:\s@"]+(\.[^<>()\\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (regex.test(e.target.value)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    // 영문, 숫자, 특수문자 포함 8자 이상 정규식 (추후 조건 따라 변경 필요)
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(e.target.value)) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };

  // 로그인 처리 api
  const onClickLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const result = await login(email, password);
      const { AC_TOKEN, RF_TOKEN } = result;
      if (result) {
        setCookie("AC_TOKEN", AC_TOKEN, { path: "/" });
        setCookie("RF_TOKEN", RF_TOKEN, { path: "/" });
        alert("로그인 성공");
        // navigate("/main");
      }
    } catch (error) {
      alert("로그인 실패");
      console.log("LoginPageError: ", error);
      console.log(email, password);
    }
  };

  return (
    <form className="loginPage" onSubmit={onClickLogin}>
      <div className="titleWrap">로그인</div>
      <div className="contentWrap">
        <div className="inputTitle-email">이메일 주소</div>
        <div className="inputWrap">
          <input
            className="input"
            placeholder="이메일 @email.com"
            value={email}
            onChange={handleEmail}
          />
        </div>
        <div className="inputErrorMessage">
          {!emailValid && email.length > 0 && (
            <div>올바른 이메일 형식을 입력해주세요.</div>
          )}
        </div>
        <div className="inputTitle-password">비밀번호</div>
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
              영문, 숫자, 특수문자 포함 8자 이상 정규식 (추후 조건 따라 변경
              필요)
            </div>
          )}
        </div>
      </div>
      <div>
        <button className="login-btn">로그인</button>
      </div>
    </form>
  );
};

export default LoginPage;
