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

  return (
    <div className="signUpPage">
      <div className="titleWrap">회원가입</div>
      <section className="section-form">
        <form onSubmit={onSignupSubmit}>
          <div className="input-title">가입 정보</div>
          <div className="inputWrap">
            <input
              name="name" // name 속성 추가
              value={name}
              type="text"
              placeholder="이름"
              onChange={handleInputChange} // onChange 이벤트 핸들러 연결
            />
          </div>{" "}
          {!isNameValid && name.length > 0 && (
            <div className="inputErrorMessage" style={{ color: "red" }}>
              이름은 한글로 작성해주세요.
            </div>
          )}
          <div className="inputWrap">
            <input
              name="email" // name 속성 추가
              value={email}
              type="text"
              placeholder="이메일 @email.com"
              onChange={handleInputChange} // onChange 이벤트 핸들러 연결
            />
          </div>
          {!isEmailValid && email.length > 0 && (
            <div className="inputErrorMessage" style={{ color: "red" }}>
              이메일 형식이 올바르지 않습니다.
            </div>
          )}
          <div className="inputWrap">
            <input
              name="password"
              value={password}
              type="password"
              placeholder="비밀번호 입력"
              onChange={handleInputChange} // onChange 이벤트 핸들러 연결
            />
          </div>
          {!isPasswordValid && password.length > 0 && (
            <div className="inputErrorMessage" style={{ color: "red" }}>
              영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.
            </div>
          )}
          <div className="inputWrap">
            <input
              name="confirmPassword"
              value={confirmPassword}
              type="password"
              placeholder="비밀번호 재입력"
              onChange={handleInputChange} // onChange 이벤트 핸들러 연결
            />
          </div>
          {password !== confirmPassword ? (
            <div className="inputErrorMessage" style={{ color: "red" }}>
              비밀번호가 일치하지 않습니다.
            </div>
          ) : (
            ""
          )}
          <section className="section-date-pick">
            <div className="input-title">입사일</div>
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
          </section>
          <div className="btn_Wrap">
            <div className="cancel_btn">
              <button onClick={() => navigate("/")}>취소하기</button>
            </div>
            <div className="signup_btn">
              <button type="submit">가입하기</button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
