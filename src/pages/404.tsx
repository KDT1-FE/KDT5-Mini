import Link from 'next/link';
import { Cookies } from 'react-cookie';

const cookie = new Cookies();
const employeeId = cookie.get('employeeId');

export default function NotFound() {
  return (
    <div className="flex h-screen mx-auto sm:w-[580px] sm:py-16 flex-col justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="sm:w-36 sm:h-36 w-24 mx-auto text-primary">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
        />
      </svg>

      <div className="flex justify-center text-xl mt-16 sm:text-[3rem] sm:mt-8 text-mainBlack">
        페이지를 찾을 수 없습니다.
      </div>
      <div className="flex justify-center text-xl mt-4 mb-8 sm:text-3xl sm:mt-16 sm:mb-24 text-mainBlack cursor-pointer;">
        {employeeId ? (
          <Link
            className="transition ease-in-out hover:scale-110"
            href={'/main'}>
            정심재로 돌아가기
          </Link>
        ) : (
          <Link className="transition ease-in-out hover:scale-110" href={'/'}>
            정심재로 돌아가기
          </Link>
        )}
      </div>
    </div>
  );
}
