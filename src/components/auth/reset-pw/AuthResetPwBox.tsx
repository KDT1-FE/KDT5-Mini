import AuthBox from '@/components/auth/AuthBox';
import AuthResetPwInput from '@/components/auth/reset-pw/AuthResetPwInput';

export default function AuthResetPwBox() {
  return (
    <AuthBox>
      <div className="sm:mb-8 sm:text-3xl mb-4 text-sm">
        순양 계정의
        <br /> 비밀번호를 재설정합니다.
      </div>
      <div className="text-subTextAndBorder text-lg mb-8">
        재설정할 비밀번호를 <br /> 입력해주세요.
      </div>
      <AuthResetPwInput />
    </AuthBox>
  );
}
