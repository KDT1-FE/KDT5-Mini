import { dutyState, manageState, modalState } from '@/recoil/common/modal';
import { useRecoilState } from 'recoil';
import ApproveModal from '@/components/common/ApproveModal';
import ManageModal from '@/components/common/ManagerModal';

export default function MenuBar() {
  const [isModalShow, setIsModalShow] = useRecoilState(modalState);
  const [isManageShow, setIsManageShow] = useRecoilState(manageState);
  const [isDutyShow, setIsDutyShow] = useRecoilState(dutyState);

  return (
    <>
      {isModalShow ? (
        <ApproveModal
          IsDutyModal={false}
          title={'연차/반차 등록'}
          IsCheckBoxShow={true}
          IsTextBoxShow={true}
          submit={'승인 요청'}
        />
      ) : null}
      {isDutyShow ? (
        <ApproveModal
          IsDutyModal={true}
          title={'당직 등록'}
          IsCheckBoxShow={false}
          IsTextBoxShow={false}
          submit={'승인 요청'}
        />
      ) : null}

      {isManageShow ? <ManageModal /> : null}
      <div>
        <div
          className="before:content-[''] before:block before:w-1.5 before:h-6 before:bg-mainBlack before:absolute before:top-3.5 before:left-0 before:hover:bg-primary
          py-3.5 relative text-mainBlack pl-7 font-semibold cursor-pointer hover:text-primary">
          마이페이지
        </div>
        <div
          className="before:content-[''] before:block before:w-1.5 before:h-6 before:bg-mainBlack before:absolute before:top-3.5 before:left-0 before:hover:bg-primary
          py-3.5 relative text-mainBlack pl-7 font-semibold cursor-pointer hover:text-primary"
          onClick={() => setIsModalShow(true)}>
          연차/반차 등록
        </div>
        <div
          className="before:content-[''] before:block before:w-1.5 before:h-6 before:bg-mainBlack before:absolute before:top-3.5 before:left-0 before:hover:bg-primary
          py-3.5 relative text-mainBlack pl-7 font-semibold cursor-pointer hover:text-primary"
          onClick={() => setIsDutyShow(true)}>
          당직 등록
        </div>
        <div
          className="before:content-[''] before:block before:w-1.5 before:h-6 before:bg-mainBlack before:absolute before:top-3.5 before:left-0 before:hover:bg-primary
          py-3.5 relative text-mainBlack pl-7 font-semibold cursor-pointer hover:text-primary"
          onClick={() => setIsManageShow(true)}>
          당직 및 연차 일정 관리
        </div>
      </div>
    </>
  );
}