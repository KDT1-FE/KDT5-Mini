import AuthLayout from '@/components/auth/AuthLayout';
import AuthResetPwBox from '@/components/auth/reset-pw/AuthResetPwBox';

export default function resetPw() {
  return (
    <>
      <AuthLayout>
        <AuthResetPwBox />
      </AuthLayout>
    </>
  );
}
