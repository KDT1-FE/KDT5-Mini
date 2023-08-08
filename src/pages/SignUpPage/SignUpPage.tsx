import { ChangeEvent, FormEvent, useState } from "react";
// import { useNavigate } from "react-router-dom";

import "./SignUpPage.scss";
import { useNavigate } from "react-router-dom";
import { signUp } from "@/Api/apis.ts";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [isNameValid, setIsNameValid] = useState<boolean>(false);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<string>("");
  const currentYear = new Date().getFullYear();
  const [showPassword, setShowPassword] = useState(false);
  const months = Array.from({ length: 12 }, (_, index) => index + 1); // index가 0부터 시작이니까 +1
  const days = Array.from({ length: 31 }, (_, index) => index + 1);
  // const navigate = useNavigate();
  const koreanRegex = /^[가-힣ㄱ-ㅎㅏ-ㅣ]*$/; // 자음, 모음, 한글
  const emailRegex = // @ . 포함
    /^(([^<>()\\[\].,;:\s@"]+(\.[^<>()\\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

  const passwordRegex = // 영문, 숫자, 특수문자 포함 8자 이상
    /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        setIsNameValid(koreanRegex.test(value));
        break;
      case "email":
        setEmail(value);
        setIsEmailValid(emailRegex.test(value));
        break;
      case "password":
        setPassword(value);
        setIsPasswordValid(passwordRegex.test(value));
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "year":
        setSelectedYear(value);
        break;
      case "month":
        setSelectedMonth(value);
        break;
      case "day":
        setSelectedDay(value);
        break;
      default:
        break;
    }
  };

  const checkEmptyForm = () => {
    return (
      email.trim() !== "" &&
      password.trim() !== "" &&
      confirmPassword.trim() !== "" &&
      name.trim() !== "" &&
      selectedYear !== "" &&
      selectedMonth !== "" &&
      selectedDay !== ""
    );
  };

  const onSignupSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!checkEmptyForm()) {
      alert("입력사항을 모두 채워주세요.");
      return;
    }
    const join = `${selectedYear}-${selectedMonth
      .toString()
      .padStart(2, "0")}-${selectedDay.toString().padStart(2, "0")}`;
    try {
      const response = await signUp(email, password, name, join);
      console.log(response.data);
      if (response) {
        // navigate("/main");
        alert("로그인 성공");
      } else {
        alert("로그인 실패");
      }
    } catch (error) {
      console.log("signUpPageError: ", error);
    }
  };

  // 패스워드 가시화 토글
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="signup_page">
      <form className="signup_box" onSubmit={onSignupSubmit}>
        <div className="signup_title">회원가입</div>
        <div className="content_wrap">
          <div className="input_title">계정 정보</div>
          <div className="content_box">
            <div className="input_box">
              <input
                className="input"
                name="name" // name 속성 추가
                value={name}
                type="text"
                placeholder="이름"
                onChange={handleInputChange} // onChange 이벤트 핸들러 연결
              />
            </div>
            {!isNameValid && name.length > 0 && (
              <div className="error_message">이름은 한글로 작성해주세요.</div>
            )}
          </div>
          <div className="content_box">
            <div className="input_box">
              <input
                className="input"
                name="email" // name 속성 추가
                value={email}
                type="text"
                placeholder="이메일 @email.com"
                onChange={handleInputChange} // onChange 이벤트 핸들러 연결
              />
            </div>
            {!isEmailValid && email.length > 0 && (
              <div className="error_message">
                이메일 형식이 올바르지 않습니다.
              </div>
            )}
          </div>
          <div className="content_box">
            <div className="input_box">
              <input
                className="input"
                name="password"
                value={password}
                type={showPassword ? "text" : "password"} // Toggle 비밀번호 보이기/가리기
                placeholder="비밀번호 입력"
                onChange={handleInputChange} // onChange 이벤트 핸들러 연결
              />
              {showPassword ? (
                <i
                  className="fa-solid fa-eye"
                  onClick={handleTogglePassword}
                ></i>
              ) : (
                <i
                  className="fa-solid fa-eye-slash"
                  onClick={handleTogglePassword}
                ></i>
              )}
            </div>
            {!isPasswordValid && password.length > 0 && (
              <div className="error_message">
                영문, 숫자, 특수문자 포함 8자 이상 정규식 (추후 조건 따라 변경
                필요)
              </div>
            )}
          </div>
          <div className="content_box">
            <div className="input_box">
              <input
                className="input"
                name="confirmPassword"
                value={confirmPassword}
                type={showPassword ? "text" : "password"} // Toggle 비밀번호 보이기/가리기
                placeholder="비밀번호 재입력"
                onChange={handleInputChange} // onChange 이벤트 핸들러 연결
              />
              {showPassword ? (
                <i
                  className="fa-solid fa-eye"
                  onClick={handleTogglePassword}
                ></i>
              ) : (
                <i
                  className="fa-solid fa-eye-slash"
                  onClick={handleTogglePassword}
                ></i>
              )}
            </div>
            {password !== confirmPassword ? (
              <div className="error_message">비밀번호가 일치하지 않습니다.</div>
            ) : (
              ""
            )}
          </div>
          <div className="input_title">입사일</div>
          <div className="select_date">
            <select
              className="select-long"
              name="year"
              value={selectedYear}
              onChange={handleSelectChange}
            >
              <option value="year">연도</option>
              {Array.from(
                { length: 10 },
                (_, index) => currentYear - 10 + index,
              ).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
              <option value={currentYear}>{currentYear}</option>
            </select>
            <select
              className="select-short"
              name="month"
              value={selectedMonth}
              onChange={handleSelectChange}
            >
              <option value="month">월</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <select
              className="select-short"
              name="day"
              value={selectedDay}
              onChange={handleSelectChange}
            >
              <option value="day">일</option>
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="btn_wrap">
          <button className="signup_btn" type="submit">
            가입하기
          </button>
          <div>
            이미 회원이신가요?
            <button className="login_btn" onClick={() => navigate("/")}>
              로그인하러 가기
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
