import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  HiOutlineUsers,
  HiOutlineHome,
  HiOutlineBuildingOffice2,
  HiOutlinePaperAirplane
} from 'react-icons/hi2';

export default function SideBar() {
  const router = useRouter();
  return (
    <div className="w-[5rem] h-[48.25rem] bg-primary rounded-bl-2xl ">
      <Link href="/admin-manage" as="/admin-manage">
        <button
          className={`text-white w-[5rem] h-[5rem] ${
            router.asPath === '/admin-manage' ? 'active bg-primaryHover  ' : ''
          }`}>
          <div className="flex flex-col items-center">
            <HiOutlineHome className="w-[36px] h-[36px]" />
            <span>관리</span>
          </div>
        </button>
      </Link>

      <Link href="/admin-leave" as="/admin-leave">
        <button
          className={`text-white w-[5rem] h-[5rem] ${
            router.asPath === '/admin-leave' ? 'active bg-primaryHover ' : ''
          }`}>
          <div className="flex flex-col items-center">
            <HiOutlinePaperAirplane className="w-[36px] h-[36px]" />
            <span>휴가</span>
          </div>
        </button>
      </Link>

      <Link href="/admin-duty" as="/admin-duty">
        <button
          className={`text-white w-[5rem] h-[5rem] ${
            router.asPath === '/admin-duty' ? 'active bg-primaryHover ' : ''
          }`}>
          <div className="flex flex-col items-center">
            <HiOutlineBuildingOffice2 className="w-[36px] h-[36px]" />
            <span>당직</span>
          </div>
        </button>
      </Link>

      <Link href="/admin-modify" as="/admin-modify">
        <button
          className={`text-white w-[5rem] h-[5rem] ${
            router.asPath === '/admin-modify' ? 'active bg-primaryHover  ' : ''
          }`}>
          <div className="flex flex-col items-center">
            <HiOutlineUsers className="w-[36px] h-[36px]" />
            <span>수정</span>
          </div>
        </button>
      </Link>
    </div>
  );
}
