import axios from "axios";
import React, { useState } from "react";

const TestSignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [join, setJoin] = useState<string>("");

  const handleSignUp = async () => {
    try {
      const response = await axios.post("https://miniproject-team9.p-e.kr/api/register", {
        email,
        password,
        name,
        join,
      }, {
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:5173",
        },
      });

      console.log("Sign up response:", response.data);
      // 테스트용으로 회원가입 요청을 보내고 응답 데이터를 콘솔에 출력합니다.
    } catch (error) {
      console.error("Sign up error:", error);
    }
  };

  return (
    <div>
      <h1>Test Sign Up Page</h1>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Join Date"
        value={join}
        onChange={(e) => setJoin(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};

export default TestSignUp;
