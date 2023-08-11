import { useState } from 'react';
import Input from '@/components/common/Input';
import { rEmail } from '@/constants/constants';
import Button from '@/components/common/Button';
import { requestFindPw } from '@/api/auth/findPw';

export default function AuthFindPwInput() {
  const [email, setEmail] = useState('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event?.target.value);
  };

  // 이메일 형식 유효성 체크
  const emailCheck = () => {
    if (email.trim() === '') {
      return false;
    }
    return rEmail.test(email);
  };

  // 비밀번호 변경을 위한 이메일 전송 API 호출 함수
  const handleFindPw = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await requestFindPw({
        email: email
      });

      if (response) {
        if (response.data.success) {
          alert(response.data.message);
        } else {
          alert(response.data.message);
        }
      }
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <div className="mb-16">
        <Input
          label={'이메일'}
          name={'email'}
          onChange={handleEmailChange}
          placeholder={'예: jindojoon@soonyang.com'}
          valid={emailCheck()}
        />
      </div>
      <form onSubmit={handleFindPw}>
        <Button contents={'이메일 전송'} disabled={!emailCheck()} submit />
      </form>
    </>
  );
}
