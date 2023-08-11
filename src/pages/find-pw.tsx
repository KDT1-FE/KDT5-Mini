import AuthLayout from '@/components/auth/AuthLayout';
import AuthFindPwBox from '@/components/auth/find-pw/AuthFindPwBox';

export default function findPw() {
  return (
    <AuthLayout>
      <AuthFindPwBox />
    </AuthLayout>
  );
}
