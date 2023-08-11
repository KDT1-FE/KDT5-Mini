import React from 'react';
import Main from '@/components/admin/AdminMain';
import { RecoilRoot } from 'recoil';

export default function adminLeave() {
  return (
    <div className="w-full h-screen bg-mainGray flex items-center mx-auto ">
      <Main page="admin-leave" />
    </div>
  );
}
