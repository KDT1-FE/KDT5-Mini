import React from 'react';
import { IMainHeaderProps } from '@/types/IAdmin';
import { HiOutlineBars4 } from 'react-icons/hi2';
import Image from 'next/image';
import Link from 'next/link';

export default function MainHeader({ onToggleSidebar }: IMainHeaderProps) {
  const handleToggle = () => {
    onToggleSidebar();
  };

  const LogOut = () => {
    document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    document.cookie = 'employeeId=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    document.cookie = 'expires=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    location.replace('/sign-in');
  };

  return (
    <div className=" h-[4rem] border-solid border-b-2 border-mainGray shadow-lg  flex items-center justify-between">
      <div className="flex">
        <button className="ml-5 mr-[1rem] " onClick={handleToggle}>
          <HiOutlineBars4 className="w-[36px] h-[36px] " />
        </button>
        <div className="flex items-center ml-4">
          <Link href="admin-manage">
            <Image src={'/logo.png'} width={150} height={150} alt="logo" />
          </Link>
        </div>
      </div>
      <div className="flex">
        <div className="mr-[2.5rem] font-semibold">
          진양철 회장님 환영합니다!
        </div>
        <button onClick={() => LogOut()} className="mr-[2.5rem] font-medium">
          로그아웃
        </button>
      </div>
    </div>
  );
}
//
