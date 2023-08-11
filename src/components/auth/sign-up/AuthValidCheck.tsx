import { IRegexCheck } from '@/types/ISignUp';

export default function AuthValidCheck({ valid, name }: IRegexCheck) {
  const validMessage = () => {
    if (!valid && name === 'email') {
      return (
        <div className="text-secondary text-xs ml-1">
          이메일 주소를 정확히 입력해주세요.
        </div>
      );
    }
    if (!valid && name === 'password') {
      return (
        <div className="text-secondary text-xs ml-1">
          영문, 숫자를 조합하여 입력해주세요. (8 - 16자)
        </div>
      );
    }
    if (!valid && name === 'confirmPassword') {
      return (
        <div className="text-secondary text-xs ml-1">
          비밀번호가 일치하지 않습니다.
        </div>
      );
    }
  };
  return <div>{validMessage()}</div>;
}
