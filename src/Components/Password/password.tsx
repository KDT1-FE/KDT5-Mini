import { ChangeEvent, useState } from "react";
import { postPassword } from "@/Api/apis.ts";

export default function Password() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleConfirmChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };
  const handleClick = async () => {
    if (password === confirmPassword) {
      try {
        const newPassword = { newPassword: password };
        const response = await postPassword(newPassword);
        setMessage("비밀번호 변경이 완료되었습니다."); // 추가: 성공 메시지 설정
        console.log(response); // 이 부분은 필요에 따라 처리
      } catch (error) {
        console.error("패스워드 변경 실패:", error);
        setMessage("비밀번호 변경에 실패했습니다.");
      }
    } else {
      setMessage("암호가 일치하지 않습니다.");
    }
  };

  return (
    <div className="password">
      <label>Password</label>
      <input
        placeholder={"변경할 암호를 입력하세요"}
        type="password"
        value={password}
        onChange={handleChange}
        style={{ border: "1px solid black" }}
      />
      <input
        placeholder={"암호를 확인 하세요"}
        type="password"
        value={confirmPassword}
        onChange={handleConfirmChange}
        style={{ border: "1px solid black" }}
      />
      <button onClick={handleClick}>변경</button>
      {message && <p>{message}</p>}
    </div>
  );
}

