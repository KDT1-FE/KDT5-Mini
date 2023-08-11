import Button from '@/components/common/Button';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

export const getServerSideProps: GetServerSideProps = async context => {
  return {
    redirect: {
      destination: '/sign-in', // 리다이렉션할 페이지 경로
      permanent: true // 301 리다이렉션 설정
    }
  };
};

export default function Home() {
  return (
    <div>
      <Link href="/signin">Go to Sign-In</Link>
      <Link href="/main">Go to Main</Link>
      <Button contents={'확인'} secondary></Button>
      <br />
      <Button contents={'확인'} disabled></Button>
      <br />
      <Button contents={'확인'} submit></Button>
      <br />
      <Button contents={'확인'}></Button>
    </div>
  );
}
