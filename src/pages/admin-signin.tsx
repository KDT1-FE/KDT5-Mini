import AdminSignInBox from '@/components/admin/AdminSignInBox';

export default function adminSignin() {
  return (
    <div className="mx-auto sm:w-[500px] sm:my-[90px]">
      {' '}
      <div className="flex justify-center text-2xl sm:text-3xl bg-white sm:my-8 my-4">
        <div>회사명</div>
      </div>
      <div className="flex justify-center text-xl sm:text-2xl bg-white sm:mb-8 mb-4">
        <div>관리자 로그인</div>
      </div>
      <AdminSignInBox />
    </div>
  );
}
