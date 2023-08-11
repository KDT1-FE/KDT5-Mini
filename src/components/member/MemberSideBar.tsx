import Link from 'next/link';
import { useRouter } from 'next/router';

export default function MemberSideBar() {
  const router = useRouter(); // useRouter()를 통해 현재 pathname을 변수 router에 저장

  const sideList = {
    마이페이지: '/member',
    개인정보수정: '/member-edit',
    '연차/반차 신청 리스트': '/member-list',
    비밀번호수정: '/change-pw'
  };
  return (
    <div className="sm:mt-8">
      {Object.entries(sideList).map(([key, link]) => (
        <div
          key={key}
          className={`before:content-[''] before:block before:w-1.5 before:h-6 before:bg-mainBlack before:absolute before:top-3.5 before:left-[10px] before:hover:bg-primary
        py-3.5 relative text-mainBlack pl-8 font-semibold cursor-pointer ml-8
        hover:text-primary ${
          link === router.pathname
            ? 'text-primary before:bg-primary'
            : 'text-mainBlack hover:text-primary'
        }`}>
          <Link href={link}>{key}</Link>
        </div>
      ))}
    </div>
  );
}
