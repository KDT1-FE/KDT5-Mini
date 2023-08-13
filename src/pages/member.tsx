import { RecoilRoot } from 'recoil';
import MemberBoard from '@/components/member/MemberBoard';
import MemberDetail from '@/components/member/MemberDetail';
import MemberLayout from '@/components/member/MemberLayout';
import MemberSideBar from '@/components/member/MemberSideBar';

export default function Member() {
  return (
    <RecoilRoot>
      <MemberLayout>
        <div className="flex justify-between my-24 px-16">
          <div className="pb-10 mr-16">
            <MemberBoard />
            <MemberSideBar />
          </div>
          <MemberDetail />
        </div>
      </MemberLayout>
    </RecoilRoot>
  );
}
