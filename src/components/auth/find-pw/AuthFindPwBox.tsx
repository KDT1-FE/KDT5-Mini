import AuthBox from '@/components/auth/AuthBox';
import AuthFindPwInput from '@/components/auth/find-pw/AuthFindPwInput';

export default function AuthFindPwBox() {
  return (
    <AuthBox>
      <div className="mb-8 text-3xl">
        <p>순양 계정의</p>
        <p>비밀번호를 재설정 합니다.</p>
      </div>
      <div className="text-subTextAndBorder mb-8 text-base">
        <p>비밀번호를 재설정할</p>
        <p>계정의 이메일을 입력해주세요.</p>
      </div>
      <AuthFindPwInput />
    </AuthBox>
  );
}
