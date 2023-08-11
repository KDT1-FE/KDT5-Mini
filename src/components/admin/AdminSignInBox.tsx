import PwBox from '@/components/common/PwBox';
import Button from '@/components/common/Button';
import AdminSignInInput from '@/components/admin/AdminSignInInput';

export default function AdminSignInBox() {
  return (
    <PwBox>
      <AdminSignInInput />
      <Button contents={'로그인'} />
      <div className="flex justify-between sm:mt-2"></div>
    </PwBox>
  );
}
3;
