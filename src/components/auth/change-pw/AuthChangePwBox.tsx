import { Cookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import AuthBox from '@/components/auth/AuthBox';
import DialogModal from '@/components/common/Dialog';
import AuthChangePwInput from '@/components/auth/change-pw/AuthChangePwInput';

// 비밀번호 변경 페이지 Box
export default function AuthChangePwBox() {
  // 쿠키에 저장된 employeeId를 꺼내와서 employeeId 변수에 저장
  const cookie = new Cookies();
  const employeeId = cookie.get('employeeId');

  // Diaglog Modal 렌더링 조건
  const [renderModal, setRenderModal] = useState(true);

  // 페이지 렌더링 시
  useEffect(() => {
    if (employeeId) setRenderModal(false);
  }, [employeeId]);

  return (
    <AuthBox>
      {renderModal && <DialogModal message={'로그인이 필요합니다.'} />}
      <div className="sm:mb-8 sm:text-3xl mb-4 text-sm">
        <p>순양 계정의</p>
        <p>비밀번호를 변경합니다.</p>
      </div>
      <div className="text-subTextAndBorder text-lg mb-8">
        <p>변경할 비밀번호를</p>
        <p>입력해주세요.</p>
      </div>
      <AuthChangePwInput />
    </AuthBox>
  );
}
