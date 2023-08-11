import Image from 'next/image';
import { clientInstance } from '@/api/axios';
import { useRecoilValue } from 'recoil';
import { memberInfoState } from '@/recoil/memberInfo';

export default function MemberHeader() {
  const memberData = useRecoilValue(memberInfoState);

  const LogOut = () => {
    document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    document.cookie = 'employeeId=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    document.cookie = 'expires=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    location.replace('/sign-in');
  };

  return (
    <div className="w-full px-16 shadow-md">
      <div className="h-24 flex justify-between ">
        <div className="top-0 bottom-0 my-auto  text-3xl font-bold">
          <Image src="/logo.png" alt="logo" width={200} height={20} />
        </div>
        <div className="flex top-0 bottom-0 my-auto">
          <div className="w-12 h-12 rounded-full border-2 mr-6 overflow-hidden flex justify-center items-center">
            <Image
              src={`${clientInstance.defaults.baseURL}${memberData.profilePath}`}
              className="rounded-xl w-[320px] h-[320px] "
              alt="profileImg"
              width={48}
              height={48}
            />
          </div>
          <div className="relative">
            <div className="flex justify-between absolute top-0 left-0">
              <div className="font-bold mr-6">{memberData.name}</div>
            </div>
            <div className="w-48 pt-6">{memberData.email}</div>
          </div>
          <div
            className="ml-4 top-0 bottom-0 my-auto font-bold cursor-pointer"
            onClick={() => LogOut()}>
            로그아웃
          </div>
        </div>
      </div>
    </div>
  );
}
