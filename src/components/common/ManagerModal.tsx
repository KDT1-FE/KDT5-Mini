import { manageState } from '@/recoil/common/modal';
import { useRecoilState } from 'recoil';
import { useEffect, useRef } from 'react';

interface IModalProps {
  type?: string;
  label?: string;
  date?: string;
  value?: string;
}

export default function ManageModal(props: IModalProps) {
  const [isManageShow, setIsManageShow] = useRecoilState(manageState);

  const modalRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    function handleOutside(e: Event) {
      // current.contains(e.target) : 컴포넌트 특정 영역 외 클릭 감지를 위해 사용
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsManageShow(false);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
    };
  }, [modalRef, setIsManageShow]);

  return (
    <>
      <div className="w-screen h-screen bg-black/40 fixed top-0 left-0 z-10">
        <div
          className="w-1/3 h-80 bg-white absolute top-0 left-0 bottom-0 right-0 m-auto"
          ref={modalRef}>
          <div className="h-1/5 flex border-2 ">
            <div className="w-[1.8rem] bg-primary"></div>
            <div className="text-xl flex items-center ml-4">일정관리</div>
          </div>
          <div className="h-4/5 flex  ">
            <div className=" m-auto h-4/5 w-4/5 border-2 border-primary rounded-lg  flex-wrap ">
              <div className="flex  h-1/5  bg-primary w-full border-b-2 border-white">
                <div className="w-1/5 flex items-center justify-center border-white  border-r-2 text-white  ">
                  내용
                </div>
                <div className="w-3/5 flex  items-center justify-center text-white">
                  기간
                </div>
                <div className="w-1/5 flex  items-center justify-center text-white  border-l-2">
                  {props.label}
                </div>
              </div>

              <div className="flex  h-1/5 w-full bg-primaryHover  border-b-2 border-white overflow  ">
                <div className="w-1/5 flex items-center justify-center border-white border-r-2">
                  {props.type}
                </div>
                <div className="w-3/5  flex items-center justify-center ">
                  {props.date}
                </div>
                <div className="w-1/5  flex items-center justify-center border-white border-l-2">
                  {props.value}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
