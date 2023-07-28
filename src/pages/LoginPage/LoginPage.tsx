import { useState } from "react";
import "./LoginPage.scss";
import users from "./signup.json";
import { useNavigate } from "react-router-dom";
import { login } from "../../Components/apis/login";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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

  // 약식 (// 로그인 처리 api)
  // const onClickBtn = () => {
  //   const user = users.find((user) => user.email === email);
  //   if (user) {
  //     if (user.password === password) {
  //       alert("로그인 성공");
  //       navigate("/main");
  //     } else {
  //       alert("비밀번호 틀림");
  //     }
  //   } else {
  //     alert("해당 이메일로 가입된 계정이 없음");
  //     navigate("/signup");
  //   }
  // };

  // 로그인 처리 api
  const onClickLogin = async () => {
    try {
      const result = await login(email, password);
      const { accessToken, refreshToken } = result;
      console.log(accessToken, refreshToken);
      if (result && result.accessToken && result.refreshToken) {
        localStorage.setItem("access", accessToken);
        localStorage.setItem("refresh", refreshToken);
        navigate("/main");
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="loginPage">
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
        <button className="login-btn" onClick={onClickLogin}>
          로그인
        </button>
      </div>
    </div>
  );
}
