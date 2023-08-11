import { RecoilRoot } from 'recoil';
import AuthSignUpBox from '@/components/auth/sign-up/AuthSignUpBox';
import AuthSignUpTitle from '@/components/auth/sign-up/AuthSignUpTitle';

export default function SignUp() {
  return (
    <RecoilRoot>
      <div className="mx-auto sm:w-[500px] sm:my-[90px]">
        <AuthSignUpTitle />
        <AuthSignUpBox />
      </div>
    </RecoilRoot>
  );
}
