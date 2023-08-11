import PwBox from '@/components/common/PwBox';
import AuthFindPwInput from '@/components/auth/find-pw/AuthFindPwInput';

export default function AuthFindPwBox() {
  return (
    <PwBox>
      <div className="mb-8 text-3xl">
        순양 계정의
        <br /> 비밀번호를 재설정 합니다.
      </div>
      <div className="text-subTextAndBorder mb-8 text-base">
        비밀번호를 재설정할 <br />
        계정의 이메일을 입력해주세요.
      </div>
      <AuthFindPwInput />
    </PwBox>
  );
}
