import React from 'react';

import MemberBoard from '@/components/member/MemberBoard';
import MemberSideBar from '@/components/member/MemberSideBar';
import MemberLayout from '@/components/member/MemberLayout';
import MemberInfoEdit from '@/components/member/MemberInfoEdit';
import { RecoilRoot } from 'recoil';

export default function memberEdit() {
  return (
    <RecoilRoot>
      <MemberLayout>
        <div className="flex justify-between my-24 px-16">
          <div className="pb-10 mr-16">
            <MemberBoard />
            <MemberSideBar />
          </div>
          <MemberInfoEdit />
        </div>
      </MemberLayout>
    </RecoilRoot>
  );
}
