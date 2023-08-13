import React from 'react';
import MemberBoard from '@/components/member/MemberBoard';
import MyPageList from '@/components/member/MyPageList';
import MemberSideBar from '@/components/member/MemberSideBar';
import MemberLayout from '@/components/member/MemberLayout';
import { RecoilRoot } from 'recoil';

export default function memberList() {
  return (
    <RecoilRoot>
      <MemberLayout>
        <div className="flex my-24 px-16">
          <div className="pb-10 mr-16">
            <MemberBoard />
            <MemberSideBar />
          </div>
          <MyPageList />
        </div>
      </MemberLayout>
    </RecoilRoot>
  );
}
