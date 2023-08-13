import React from 'react';
import Main from '@/components/admin/AdminMain';

export default function adminManage() {
  return (
    <div className="w-full h-screen bg-mainGray flex items-center mx-auto ">
      <Main page="admin-manage" />
    </div>
  );
}
