import { useState } from 'react';
import { useRouter } from 'next/router';
import Input from '@/components/common/Input';
import { rEmail } from '@/constants/constants';
import Button from '@/components/common/Button';
import { requestFindPw } from '@/api/auth/findPw';
import Loading from '@/components/common/Loading';

export default function AuthFindPwInput() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      const response = await requestFindPw({
        email: email
      });

      if (response) {
        // 응답 code가 success true일 때
        if (response.data.success) {
          alert(response.data.message);
          setIsLoading(false);
          router.push('/sent-email');
        } else {
          alert(response.data.message);
          setIsLoading(false);
        }
      }
      // 존재하지 않는 이메일 전송 시
    } catch (error: any) {
      alert(error.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
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
        </div>
      )}
    </>
  );
}
