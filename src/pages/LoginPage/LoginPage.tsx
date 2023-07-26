import { useState } from "react";
import "./LoginPage.scss";
import users from "./signup.json";

export default function LoginPage() {
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

  const onClickBtn = () => {
    const user = users.find((user) => user.email === email);
    if (user) {
      if (user.password === password) {
        alert("로그인 성공");
      } else {
        alert("비밀번호 틀림");
      }
    } else {
      alert("해당 이메일로 가입된 계정이 없음");
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

        <div className="inputTitle-password">비밀번호</div>
        <div className="inputWrap">
          <input
            className="input"
            type="password"
            placeholder="패스워드"
            value={password}
            onChange={handlePassword}
          />
        </div>
        <div className="inputErrorMessage">
          {!passwordValid && password.length > 0 && (
            <div>올바른 비밀번호 형식을 입력해주세요.</div>
          )}
        </div>
      </div>

      <div>
        <button className="login-btn" onClick={onClickBtn}>
          로그인
        </button>
      </div>
    </div>
  );
}
