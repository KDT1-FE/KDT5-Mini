import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import { signUpState } from '@/recoil/signUp';
import Button from '@/components/common/Button';
import { requestSignUp } from '@/api/auth/signUp';
import { TEMP_DEPARTMENT } from '@/constants/options';
import { SIGNUP_INPUT_INFO } from '@/constants/constants';
import AuthDropdown from '@/components/common/AuthDropdown';
import SinglePicker from '@/components/common/SinglePicker';
import AuthSignUpInput from '@/components/auth/sign-up/AuthSignUpInput';

export default function AuthSignUpBox() {
  const signUpData = useRecoilValue(signUpState);
  const router = useRouter();

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await requestSignUp({
        confirmPassword: signUpData.confirmPassword,
        name: signUpData.name,
        email: signUpData.email,
        password: signUpData.password,
        phone: signUpData.phone,
        hireDate: signUpData.hireDate,
        department: signUpData.department
      });
      if (response.data.success) {
        alert(response.data.message);
        // 페이지를 로그인 페이지로 이동시키기
        router.push('/sign-in');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="text-xs sm:text-base font-semibold pl-1 text-mainBlack">
        계열사*
      </div>
      <AuthDropdown options={TEMP_DEPARTMENT} label={'계열사'} admin={false} />
      {SIGNUP_INPUT_INFO.map(value => (
        <AuthSignUpInput
          key={value.label}
          label={value.label}
          button={value.button}
          placeholder={value.placeholder}
          name={value.name}
          type={value.type}
        />
      ))}
      <div className="text-xs sm:text-base font-semibold pl-1 text-mainBlack">
        입사일
      </div>
      <div className="border-b-2 border-gray-200 mb-4 sm:w-full sm:max-w-[calc(100%-6rem)] pl-1">
        <SinglePicker name={'hireDate'} />
      </div>
      <form onSubmit={handleSignUp}>
        <Button contents={'회원가입'} submit />
      </form>
    </div>
  );
}
