import React from 'react';
import MainHeader from '@/components/main/MainHeader';
import MemberBoard from '@/components/member/MemberBoard';
import MemberSideBar from '@/components/member/MemberSideBar';

import MemberInfoEdit from '@/components/member/MemberInfoEdit';
import { RecoilRoot } from 'recoil';

export default function memberEdit() {
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
        <div className="">
          <MemberInfoEdit />
        </div>
      </div>
    </RecoilRoot>
    </>
  );
}
