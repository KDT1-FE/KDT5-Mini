import { useState } from 'react';
import { useRouter } from 'next/router';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { rPassword } from '@/constants/constants';
import { requestValidPw } from '@/api/auth/validPw';
import { requestChangePw } from '@/api/auth/changePw';
import { isValidPwField } from '@/components/common/isValidField';
import AuthValidCheck from '@/components/auth/sign-up/AuthValidCheck';

export default function AuthChangePwInput() {
  // next router 선언
  const router = useRouter();

  // input state
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setComfirmPassword] = useState('');

  // 현재 비밀번호
  const handleCurrentPw = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(event?.target.value);
  };

  // 새로운 비밀번호
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event?.target.value);
  };

  // 새로운 비밀번호 확인
  const handleConfirmPw = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComfirmPassword(event?.target.value);
  };

  // 현재 비밀번호 유효성 체크
  const currentPwCheck = isValidPwField({
    value: currentPassword,
    regex: rPassword
  });

  // 비밀번호 형식 유효성 체크
  const pwCheck = isValidPwField({
    value: password,
    regex: rPassword
  });

  // 비밀번호 확인 유효성 체크
  const confirmPwCheck = password === confirmPassword;

  // 비밀번호 변경 버튼 활성화 여부
  const isDisabled =
    currentPwCheck &&
    pwCheck &&
    confirmPwCheck &&
    currentPassword.length > 0 &&
    password.length > 0 &&
    confirmPassword.length > 0;

  // 유효성 검사
  const renderCheck = (inputType: string) => {
    if (inputType === 'currentPassword') {
      return <AuthValidCheck valid={currentPwCheck} name={'currentPassword'} />;
    } else if (inputType === 'password') {
      return <AuthValidCheck valid={pwCheck} name={'password'} />;
    } else {
      return <AuthValidCheck valid={confirmPwCheck} name={'confirmPassword'} />;
    }
  };

  const handleChangePw = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // * 입력한 변경 전 비밀번호와 DB간 일치 검사
      const isCurrentPwValid = await requestValidPw({
        password: currentPassword
      });

      // 변경 전 비밀번호가 DB와 일치할 경우
      if (isCurrentPwValid.data.success) {
        // * 로그인 상태에서 비밀번호 변경 API 호출
        const response = await requestChangePw({
          currentPassword: currentPassword,
          password: password,
          confirmPassword: confirmPassword
        });

        if (response) {
          if (response.data.success) {
            // 비밀번호 변경 성공
            alert(response.data.message);
            router.push('/sign-in');
          } else {
            alert(response.data.message);
          }
        }
        //
      } else return;
    } catch (error: any) {
      alert('입력하신 현재 비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <>
      <form onSubmit={handleChangePw}>
        <div className="sm:mb-8 mb-8">
          <Input
            label={'현재 비밀번호'}
            name={'password'}
            onChange={handleCurrentPw}
            placeholder={'영문+숫자, 8자리 이상 16자리 이하'}
            type="password"
            valid={currentPwCheck}
          />
        </div>
        <div className="sm:mb-8 mb-8">
          <Input
            label={'새로운 비밀번호'}
            name={'password'}
            onChange={handlePassword}
            placeholder={'영문+숫자, 8자리 이상 16자리 이하'}
            type="password"
            valid={pwCheck}
          />
          {renderCheck('password')}
        </div>
        <div className="sm:mb-8 mb-8">
          <Input
            label={'비밀번호 확인'}
            name={'password'}
            onChange={handleConfirmPw}
            placeholder={'비밀번호를 한번 더 입력해주세요.'}
            type="password"
            valid={confirmPwCheck}
          />
          {renderCheck('confirmPasswordCheck')}
        </div>
        <Button contents={'변경하기'} disabled={!isDisabled} submit />
      </form>
    </>
  );
}
