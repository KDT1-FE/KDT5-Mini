import AuthBox from '@/components/auth/AuthBox';
import Button from '@/components/common/Button';
import AdminSignInInput from '@/components/admin/AdminSignInInput';

export default function AdminSignInBox() {
  return (
    <AuthBox>
      <AdminSignInInput />
      <Button contents={'로그인'} />
      <div className="flex justify-between sm:mt-2"></div>
    </AuthBox>
  );
}
3;
