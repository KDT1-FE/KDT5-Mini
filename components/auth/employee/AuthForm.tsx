import Input from "@components/common/Input";
import Link from "next/link";
import styled from "styled-components";
import { MdEmail, MdLock, MdVerifiedUser, MdPerson } from "react-icons/md";
import { BsFillPersonBadgeFill } from "react-icons/bs";
import { IAuthFormProps, ITextMap } from "@lib/interface/Auth";
import { FormEvent, useCallback, useState } from "react";
import { login, register } from "@lib/api/authAPI";
import { useRouter } from "next/router";
import Loading from "@components/common/Loading";

// Constant / Variation
const textMap: ITextMap = {
  login: "로그인",
  register: "회원가입",
};

// Component
function AuthForm({ type }: IAuthFormProps) {
  // 컴포넌트 타입에 따른 이름
  const text = textMap[type];

  // Hooks
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [empName, setEmpName] = useState("");
  const [nameMessage, setNameMessage] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [position, setPosition] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onLoginChange = useCallback((event: FormEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }, []);

  const onRegisterChange = useCallback(
    (event: FormEvent) => {
      const { name, value } = event.target as HTMLInputElement;
      if (name === "email") {
        const rEmail =
          /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if (!rEmail.test(value)) {
          setEmailMessage("이메일 형식으로 적어주세요.");
        } else {
          setEmailMessage("");
          setEmail(value);
        }
      } else if (name === "password") {
        const rPassword =
          /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        if (!rPassword.test(value)) {
          setPasswordMessage(
            "숫자 + 영문 + 특수문자 조합으로 8자리 이상 입력해주세요.",
          );
        } else {
          setPasswordMessage("");
          setPassword(value);
        }
      } else if (name === "name") {
        if (value === "") {
          setNameMessage("이름을 입력하세요.");
        } else {
          setEmpName(value);
        }
      } else if (name === "passwordConfirm") {
        if (password === value) {
          setPasswordConfirm(value);
          setPasswordConfirmMessage("비밀번호가 일치합니다.");
          setIsPasswordConfirm(true);
        } else {
          setPasswordConfirmMessage("비밀번호가 일치하지 않습니다.");
          setIsPasswordConfirm(false);
        }
      } else if (name === "rank") {
        setPosition(value);
      }
    },
    [password],
  );

  const onLogin = useCallback(
    async (event: FormEvent) => {
      try {
        event.preventDefault();
        await login({ email, password })?.then((res) => {
          localStorage.setItem("Token", res.data.response.accessToken);
          localStorage.setItem("empName", res.data.response.empName);
          router.push({
            pathname: "/employee",
          });
        });
      } catch (e) {
        console.error(e, "로그인 오류!");
      }
    },
    [email, password, router],
  );

  const onRegister = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      if (
        email === "" ||
        password === "" ||
        passwordConfirm === "" ||
        empName === ""
      ) {
        setRegisterMessage("필수 입력 사항입니다.");
      } else {
        setLoading(true);
        await register({ email, password, empName, position }).then((res) => {
          if (typeof res === "string") {
            setRegisterMessage("이미 계정이 있습니다!");
            console.log(res);
          } else {
          }
        });
        router.push("/login");
      }
    },
    [email, password, empName, position, passwordConfirm, router],
  );

  // Render
  return (
    <>
      {loading && <Loading />}
      <AuthFormBlock>
        <h3>{text}</h3>
        <Link href="/">
          <a>홈</a>
        </Link>
        <form onSubmit={type === "login" ? onLogin : onRegister}>
          {type === "login" && (
            <>
              <InputWrapper>
                <EmailIcon />
                <Input
                  autoComplete="email"
                  name="email"
                  placeholder="이메일"
                  auth="true"
                  onChange={onLoginChange}
                />
              </InputWrapper>
              <InputWrapper>
                <PasswordIcon />
                <Input
                  type="password"
                  autoComplete="password"
                  name="password"
                  placeholder="패스워드"
                  auth="true"
                  onChange={onLoginChange}
                />
              </InputWrapper>
            </>
          )}
          {type === "register" && (
            <>
              <InputWrapper>
                <IconWrapper>
                  <EmailIcon />
                </IconWrapper>
                <Input
                  autoComplete="email"
                  name="email"
                  placeholder="이메일"
                  auth="true"
                  onChange={onRegisterChange}
                />
              </InputWrapper>
              <InputWrapper>
                <IconWrapper>
                  <PersonIcon />
                </IconWrapper>
                <Input
                  autoComplete="name"
                  name="name"
                  placeholder="이름"
                  auth="true"
                  onChange={onRegisterChange}
                />
              </InputWrapper>
              <InputWrapper>
                <IconWrapper>
                  <PasswordIcon />
                </IconWrapper>
                <Input
                  type="password"
                  autoComplete="password"
                  name="password"
                  placeholder="패스워드"
                  auth="true"
                  onChange={onRegisterChange}
                />
              </InputWrapper>
              <InputWrapper>
                <IconWrapper>
                  <PasswordConfirmIcon />
                </IconWrapper>
                <Input
                  type="password"
                  autoComplete="new-password"
                  name="passwordConfirm"
                  placeholder="패스워드 확인"
                  auth="true"
                  onChange={onRegisterChange}
                />
              </InputWrapper>
              <InputWrapper>
                <RankIconWrapper>
                  <RankIcon />
                </RankIconWrapper>
                <Input
                  autoComplete="rank"
                  name="rank"
                  placeholder="직급"
                  auth="true"
                  onChange={onRegisterChange}
                />
              </InputWrapper>
            </>
          )}
          <ButtonBlock>
            <StyledButton type="submit">{text}</StyledButton>
          </ButtonBlock>
          <span>
            {registerMessage ||
              emailMessage ||
              passwordMessage ||
              (isPasswordConfirm && passwordConfirmMessage) ||
              nameMessage}
          </span>
        </form>
        <Footer>
          {type === "login" ? (
            <Link href="/register">회원가입</Link>
          ) : (
            <Link href="/login">로그인</Link>
          )}
        </Footer>
      </AuthFormBlock>
    </>
  );
}

// Style
const AuthFormBlock = styled.div`
  padding: 0 20px;
  h3 {
    margin: 0;
    color: #707070;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 1rem;
    text-align: center;
    margin-bottom: 40px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  input {
    flex: 1;
  }
  & + & {
    margin-top: 2rem;
  }
`;

const IconWrapper = styled.div`
  &::before {
    content: "*";
    margin: 0 8px;
    color: #f00;
    font-size: 18px;
  }
`;

const RankIconWrapper = styled.div`
  &::before {
    content: "";
    margin: 0 12px;
  }
`;

const EmailIcon = styled(MdEmail)`
  font-size: 24px;
`;

const PersonIcon = styled(MdPerson)`
  font-size: 24px;
`;

const PasswordIcon = styled(MdLock)`
  font-size: 24px;
`;

const PasswordConfirmIcon = styled(MdVerifiedUser)`
  font-size: 24px;
`;

const RankIcon = styled(BsFillPersonBadgeFill)`
  font-size: 24px;
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
`;

const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: #bbb;
    text-decoration: underline;
    &:hover {
      color: #707070;
    }
  }
`;

export default AuthForm;
