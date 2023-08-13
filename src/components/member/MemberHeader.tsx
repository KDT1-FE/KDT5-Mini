import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { clientInstance } from '@/api/axios';
import memberInfo from '@/api/member/memberInfo';
import { memberInfoState } from '@/recoil/memberInfo';

export default function MemberHeader() {
  const [memberState, setMemberState] = useRecoilState(memberInfoState);

  // 추후 리팩토링을 통해 react-query를 통해 API 중복 호출을 관리할 필요
  useEffect(() => {
    async function getInfo() {
      const response = await memberInfo();
      if (response.success && response.data) {
        setMemberState(response.data);
      }
      setTimeout(
        () =>
          setMemberState(prevMemberState => ({
            ...prevMemberState,
            isLoading: false // Ensure isLoading is set to false after 500ms
          })),
        500
      );
    }

    getInfo();
  }, [setMemberState]);

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
          <Link href="main">
            <Image src="/logo.png" alt="logo" width={200} height={20} />
          </Link>
        </div>
        <div className="flex top-0 bottom-0 my-auto">
          {memberState.profilePath ? (
            <div className="w-12 h-12 rounded-full border-2 mr-6 overflow-hidden flex justify-center items-center">
              <Image
                src={`${clientInstance.defaults.baseURL}${memberState.profilePath}`}
                className="rounded-xl"
                alt="profileImg"
                width={48}
                height={48}
              />
            </div>
          ) : (
            <div></div>
          )}
          <div className="relative">
            <div className="flex justify-between absolute top-0 left-0">
              <div className="font-bold mr-6">{memberState.name}</div>
            </div>
            <div className="w-48 pt-6">{memberState.email}</div>
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
