import { ILayout } from '@/types/ICommon';
import MemberHeader from './MemberHeader';

export default function MemberLayout({ children }: ILayout) {
  return (
    <>
      <MemberHeader />
      <div className="px-16">{children}</div>
    </>
  );
}
