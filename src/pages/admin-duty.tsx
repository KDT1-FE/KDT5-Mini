import React from 'react';
import Main from '@/components/admin/AdminMain';
import { RecoilRoot } from 'recoil';

export default function adminDuty() {
  return (
    <RecoilRoot>
      <div className="w-full h-screen bg-mainGray flex items-center mx-auto">
        <Main page="admin-duty" />
      </div>
    </RecoilRoot>
  );
}
