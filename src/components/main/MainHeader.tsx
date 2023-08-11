import Image from 'next/image';
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { emailState, remainDaysState, nameState } from '@/recoil/main';

export default function MainHeader() {
  const [userName, setUserName] = useRecoilState(nameState)
  const [userEmail, setUserEmail] = useRecoilState(emailState)
  const [userProfile, setUserProfile] = useState('')
  const [remainDays, setRemainDays] = useRecoilState(remainDaysState)

  const LogOut = () => {
    document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    document.cookie = 'employeeId=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    document.cookie = 'expires=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    location.replace('/sign-in');
  };

  return (
    <div className="h-24 flex justify-between px-16">
      <div className="top-0 bottom-0 my-auto pl-7 text-3xl font-bold">
        <Image src="/logo.png" alt="logo" width={200} height={20} priority/>
      </div>
      <div className="flex top-0 bottom-0 my-auto pr-7">
        <div className="w-12 h-12 rounded-full border-2 mr-6 overflow-hidden flex justify-center items-center">
          <Image src={userProfile ? userProfile : '/logo.png'} alt='profileImg' width={48} height={48} priority/>
        </div>
        <div className="relative">
          <div className='flex justify-between absolute top-0 left-0'>
            <div className="font-bold mr-6">{userName}</div>
            <div className="text-primary font-bold">
              잔여연차:{remainDays}
            </div>
          </div>
          <div className="w-48 pt-6">{userEmail}</div>
        </div>
        <div
          className="ml-4 top-0 bottom-0 my-auto font-bold cursor-pointer"
          onClick={() => LogOut()}>
          로그아웃
        </div>
      </div>
    </div>
  );
}
