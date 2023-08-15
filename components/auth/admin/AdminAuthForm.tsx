import { login } from "@lib/api/authAPI";
import { useRouter } from "next/router";
import { FormEvent, useCallback, useState } from "react";
import styled from "styled-components";

// Component
function AdminAuthForm() {
  const router = useRouter();
  // Hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLoginChange = useCallback((event: FormEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }, []);

  const onLogin = async (event: FormEvent) => {
    event.preventDefault();
    await login({ email, password })?.then((res) => {
      localStorage.setItem("Token", res.data.response.accessToken);
      router.push({
        pathname: "/admin",
      });
    });
  };

  // Render
  return (
    <AuthFormBlock>
      <h3>관리자 로그인</h3>
      <form onSubmit={onLogin}>
        <StyledInput
          autoComplete="email"
          name="email"
          placeholder="이메일"
          onChange={onLoginChange}
        />
        <StyledInput
          type="password"
          autoComplete="password"
          name="password"
          placeholder="패스워드"
          onChange={onLoginChange}
        />
        <ButtonBlock>
          <StyledButton type="submit">로그인</StyledButton>
        </ButtonBlock>
      </form>
    </AuthFormBlock>
  );
}

// Style
const AuthFormBlock = styled.div`
  padding: 0 40px;
  h3 {
    margin: 0;
    color: #fff;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 1rem;
    text-align: center;
    margin-bottom: 40px;
  }
`;

const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 2px solid #aaa;
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  background: transparent;
  color: #fff;
  &::placeholder {
    color: #fff;
  }
  &:focus {
    border-bottom: 2px solid #fff;
  }
  &:focus::-webkit-input-placeholder {
    color: transparent;
  }
  & + & {
    margin-top: 2rem;
  }
`;

const ButtonBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled.button`
  margin-top: 2rem;
  width: 180px;
  height: 30px;
  border: none;
  outline: none;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  background: #707070;
  color: #fff;
`;

export default AdminAuthForm;
