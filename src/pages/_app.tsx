import '@/pages/index.css';
import type { AppProps } from 'next/app';
import { CookiesProvider } from 'react-cookie';
import Layout from '@/components/common/Layout';

export default function App({ Component, pageProps, router }: AppProps) {
  //여기에 페이지주소 적으면 해당 페이지는 전역레이아웃사용하지않습니다.
  const specificPages = [
    '/main',
    '/admin-duty',
    '/admin-manage',
    '/admin-leave',
    '/member',
    '/admin-modify',
    '/member-list',
    '/member-edit'
  ];
  const isSpecificPage = specificPages.includes(router.pathname);
  if (isSpecificPage) {
    return <Component {...pageProps} />;
  }

  return (
    <CookiesProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CookiesProvider>
  );
}
