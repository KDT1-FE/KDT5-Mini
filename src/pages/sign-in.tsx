import Image from 'next/image';
import { RecoilRoot } from 'recoil';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthSignInBox from '@/components/auth/sign-in/AuthSignInBox';

export default function signin() {
  return (
    <RecoilRoot>
      <AuthLayout>
        <AuthSignInBox />
      </AuthLayout>
    </RecoilRoot>
  );
}
