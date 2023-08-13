import AuthLayout from '@/components/auth/AuthLayout';
import AuthChangePwBox from '@/components/auth/change-pw/AuthChangePwBox';

export default function changePw() {
  return (
    <>
      <AuthLayout>
        <AuthChangePwBox />
      </AuthLayout>
    </>
  );
}
