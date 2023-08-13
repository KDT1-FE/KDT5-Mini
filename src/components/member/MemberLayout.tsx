import { Cookies } from 'react-cookie';
import { ILayout } from '@/types/ICommon';
import { useEffect, useState } from 'react';
import DialogModal from '@/components/common/Dialog';
import MemberHeader from '@/components/member/MemberHeader';

export default function MemberLayout({ children }: ILayout) {
  // 쿠키에 저장된 employeeId를 꺼내와서 employeeId 변수에 저장
  const cookie = new Cookies();
  const isEmployee = cookie.get('role');

  const [renderModal, setRenderModal] = useState(true); // Diaglog Modal 렌더링 조건

  useEffect(() => {
    if (isEmployee === 'USER') setRenderModal(false);
  }, [isEmployee]);

  return (
    <>
      {renderModal && <DialogModal message={'사원 로그인이 필요합니다.'} />}
      <MemberHeader />
      {children}
    </>
  );
}
