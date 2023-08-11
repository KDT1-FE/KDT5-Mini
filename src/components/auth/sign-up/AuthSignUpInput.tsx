import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { signUpState } from '@/recoil/signUp';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { IAuthSignUpInput } from '@/types/IAuth';
import { requestEmailCheck } from '@/api/auth/signUp';
import AuthValidCheck from '@/components/auth/sign-up/AuthValidCheck';
import { rEmail, rNumber, rPassword, rPhone } from '@/constants/constants';

export default function AuthSignUpInput({ ...props }: IAuthSignUpInput) {
  // 회원가입 정보 atom state 구독
  const [signUpInfo, setSignUpInfo] = useRecoilState(signUpState);
  // 휴대폰 번호를 저장하는 state
  const [phoneNumber, setPhoneNumber] = useState('');

  // input 입력 값 atom state 업데이트
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignUpInfo(prevInformation => ({
      ...prevInformation,
      [name]: value
    }));
  };

  // ** 이메일 중복 체크 API 호출 함수
  const handleEmailCheck = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await requestEmailCheck({
        email: signUpInfo.email
      });
      if (response.data.success) {
        alert(response.data.message);
      }
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  // 버튼 & 비밀번호 확인 조건부 렌더링
  const renderButton = () => {
    // button props가 있을 때
    if (props.button) {
      // 중복확인 버튼일 경우
      if (props.button === '중복확인')
        return (
          <form onSubmit={handleEmailCheck}>
            <Button contents={props.button} secondary submit />
          </form>
        );
    } else return;
  };

  // 이메일 형식 유효성 체크
  const emailCheck = () => {
    if (signUpInfo.email.trim() === '') {
      return true;
    }
    return rEmail.test(signUpInfo.email);
  };

  // 비밀번호 형식 유효성 체크
  const passwordCheck = () => {
    if (signUpInfo.password.trim() === '') {
      return true;
    }

    return rPassword.test(signUpInfo.password);
  };

  // 비밀번호 확인 유효성 체크
  const confirmPasswordCheck = () => {
    if (signUpInfo.confirmPassword.trim() === '') {
      return true;
    }
    return signUpInfo.password === signUpInfo.confirmPassword;
  };

  // 이메일 또는 비밀번호에 유효성 검사 렌더링
  const renderValid = () => {
    if (props.name === 'email') return emailCheck();
    else if (props.name === 'password') return passwordCheck();
    else if (props.name === 'confirmPassword') return confirmPasswordCheck();
    else return true;
  };

  // 유형에 따른 조건부 렌더링
  const renderRegex = () => {
    if (props.name === 'email') {
      return <AuthValidCheck valid={emailCheck()} name={props.name} />;
    } else if (props.name === 'password') {
      return <AuthValidCheck valid={passwordCheck()} name={props.name} />;
    } else {
      return (
        <AuthValidCheck valid={confirmPasswordCheck()} name={props.name} />
      );
    }
  };

  // 휴대폰 번호 입력 핸들러
  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const hyphenNumber = value
      .replace(rNumber, '')
      .substring(0, 11)
      .replace(rPhone, `$1-$2-$3`);

    setPhoneNumber(hyphenNumber);
    setSignUpInfo(prevInformation => ({
      ...prevInformation,
      [name]: hyphenNumber
    }));
  };

  return (
    <div className="sm:mb-4 mb-2">
      <div className="flex">
        <Input
          label={`${props.label}`}
          name={props.name}
          onChange={
            props.name === 'phone' ? handlePhoneChange : handleInputChange
          }
          placeholder={props.placeholder}
          value={props.name === 'phone' ? phoneNumber : signUpInfo[props.name]}
          valid={renderValid()}
          type={props.type}
        />
        <div className="flex sm:min-w-[5rem] min-w-[4rem] items-end justify-center ml-4">
          {renderButton()}
        </div>
      </div>
      {renderRegex()}
    </div>
  );
}
