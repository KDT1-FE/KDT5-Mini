import { Link, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import Btn from '@/components/Buttons/Btn';
import SignUpValidation from '@/lib/Validation/validation';
import { useForm } from 'react-hook-form';
import { FiAlertCircle } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { LoginState } from '@/states/stateLogin';
import { useRecoilState } from 'recoil';
import { login } from '@/lib/api';
import { LoginBody } from '@/lib/types';
import backgroundLogo from '/backgroundlogo.png';
import logowhithtext from '/logowithtext.png';

const Login = () => {
  const [loginError, setLoginError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
  const navigate = useNavigate();

  const saveTokenToLocalstorage = (token: string) => {
    localStorage.setItem('authToken', token);
  };

  useEffect(() => {
    isLoggedIn && navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginBody>();

  const onSubmit = async (data: LoginBody) => {
    const validationErrors = SignUpValidation(data);

    if (Object.keys(validationErrors).length > 0) {
      Object.entries(validationErrors).forEach(([field, message]) => {
        if (field === 'email' || field === 'password') {
          setError(field, { type: 'manual', message });
        }
      });
    } else {
      try {
        const response = await login({ email: data.email, password: data.password });
        if (response && response.data.success) {
          setLoginError('');
          const token = response.headers.authorization;
          saveTokenToLocalstorage(token);
          setIsLoggedIn(true);
          navigate('/');
        } else {
          setLoginError('로그인에 실패하셨습니다.');
          console.error('로그인 실패');
        }
      } catch (error) {
        setLoginError('로그인에 실패하셨습니다.');
        console.error('로그인 실패', error);
      }
    }
  };

  return (
    <Container>
      <ImgContainer1 />
      <Textwrap>
        <span>대학병원 의사들을 위한</span>
        <span>쉽고 빠른 연차 당직 관리 서비스</span>
      </Textwrap>
      <ImgContainer2 />
      <Wrap>
        <h1>어서오세요!</h1>
        <FormWrap onSubmit={handleSubmit(onSubmit)} name="loginForm">
          <InputContainer>
            <div className="inputTitle">email</div>
            <input type="email" placeholder="이메일을 입력해주세요." {...register('email')} />
            {errors.email && (
              <InfoBox>
                <FiAlertCircle />
                <span className="info-text">{errors.email.message}</span>
              </InfoBox>
            )}
          </InputContainer>
          <InputContainer>
            <div className="inputTitle">password</div>
            <input type="password" placeholder="비밀번호를 입력해주세요." {...register('password')} />
            {errors.password && (
              <InfoBox>
                <FiAlertCircle />
                <span className="info-text">{errors.password.message}</span>
              </InfoBox>
            )}
            {loginError && (
              <InfoBox>
                <FiAlertCircle />
                <span className="info-text">{loginError}</span>
              </InfoBox>
            )}
          </InputContainer>
          <InputContainer>
            <Btn content={'로그인'} />
          </InputContainer>
        </FormWrap>
        <SignUpLink>
          <span>아직 계정이 없으신가요? </span>
          <Link to="/signup" className="linkto">
            회원가입
          </Link>
        </SignUpLink>
      </Wrap>
    </Container>
  );
};

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: right;
  align-items: center;
  height: 100%;
  padding: 60px;
`;
const ImgContainer1 = styled.div`
  width: 1050px;
  height: 400px;
  padding: 0 20px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${backgroundLogo});
  position: absolute;
  top: unset;
  bottom: 0;
  left: 0;
`;
const ImgContainer2 = styled.div`
  width: 300px;
  height: 400px;
  padding: 0 20px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${logowhithtext});
  position: absolute;
  top: unset;
  bottom: 580px;
  left: 100px;
`;
const Textwrap = styled.div`
  color: ${props => props.theme.white};
  font-size: 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: absolute;
  top: unset;
  bottom: 650px;
  left: 100px;
`;
const Wrap = styled.div`
  z-index: 9;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  width: 600px;
  height: 100%;
  border-radius: 8px;
  background-color: ${props => props.theme.white};
  h1 {
    font-weight: 700;
    font-size: 32px;
    margin-bottom: 32px;
  }
  .linkto {
    font-weight: 700;
    color: ${props => props.theme.primary};
  }
`;

const FormWrap = styled.form`
  height: fit-content;
`;

const InputContainer = styled.div`
  .inputTitle {
    font-size: 14px;
    font-family: 'ABeeZee', sans-serif;
    margin-bottom: 8px;
  }
  button {
    margin-top: 62px;
  }
  &:first-child {
    margin-bottom: 16px;
  }
`;

const InfoBox = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  color: red;
  font-size: 12px;
  .info-text {
    margin-left: 8px;
  }
`;
const SignUpLink = styled.div`
  font-size: 14px;
`;

export default Login;
