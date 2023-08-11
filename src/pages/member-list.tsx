import React from 'react';
import MemberBoard from '@/components/member/MemberBoard';
import MyPageList from '@/components/member/MyPageList';
import MemberSideBar from '@/components/member/MemberSideBar';
import MainHeader from '@/components/main/MainHeader';
import { RecoilRoot } from 'recoil';

export default function memberList() {
  return (
    <>
      <RecoilRoot>
        <div className=" w-full shadow-md">
          <MainHeader />
        </div>
        <div className="flex mx-24 my-24">
          <div className="pb-10 mr-20">
            <MemberBoard />
            <div className="mt-16">
              <MemberSideBar />
            </div>
          </div>

          <div className="w-[800px] h-[400px] mr-80 flex ">
            <MyPageList />
          </div>
        </div>
      </RecoilRoot>
    </>
  );
}
