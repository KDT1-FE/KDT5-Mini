import { manageState } from '@/recoil/common/modal';
import { useRecoilState } from 'recoil';
import { useEffect, useRef } from 'react';
import { dayOffState, dutiesState } from '@/recoil/main';
import { IDayOffFormatted } from '@/types/IDayOff';
import { IDutiesFormatted } from '@/types/IDuty';
import { changeDayOff, cancelDayOff } from '@/api/main/dayoff';
import { changeDuty, cancelDuty } from '@/api/main/duty';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid';
import { Cookies } from 'react-cookie';

interface IModalProps {
  type?: string;
  date?: string;
  value?: string;
}

const cookie = new Cookies();

export default function ManageModal(props: IModalProps) {
  const [isManageShow, setIsManageShow] = useRecoilState(manageState);
  const [dayOffs, setDayOffs] = useRecoilState(dayOffState)
  const [duties, setDuties] = useRecoilState(dutiesState)

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


  // dayOffs를 원하는 형식으로 변환
  const dayOffsFormatted = dayOffs?.map((item:IDayOffFormatted)=>({
    dayOffId: item.dayOffId,
    type: item.type,
    startDate: item.startDate,
    endDate: item.endDate,
    status: item.status,
    date: null
  }))


  const dutiesFormatted = duties?.map((item:IDutiesFormatted)=> ({
    dayOffId: item.dutyId,
    type: item.type,
    date: item.date,
    status: item.status,
    startDate: null,
    endDate: null
  }));

  const filteredDayOffs = dayOffsFormatted?.filter(item => item.status !== '승인됨');
  const filteredDuties = dutiesFormatted?.filter(item => item.status !== '승인됨');

  const manageFormatted = [...(filteredDayOffs || []), ...(filteredDuties || [])];

  const employeeId = Number(cookie.get('employeeId'));

  const dayOffEditClick = (index:number) => {
    try{
      const clickedItem = manageFormatted[index];

      const itemType = clickedItem.type;
      const start = clickedItem.startDate;
      const end = clickedItem.endDate;
      const status = clickedItem.status;
      const dayOffId = clickedItem.dayOffId;
  
      const a ={
        startDate: start,
        endDate: end,
        type: itemType,
        status: status,
        reason: '수정요망',
        employeeId: employeeId,
        dayOffId: dayOffId
      }

      changeDayOff(a)
    }catch(error){
      console.log(`error: ${error}`);
    }
  };

  const dayOffDeleteClick = (index:number) => {
    try{
      const clickedItem = manageFormatted[index];

      const dayOffId = clickedItem.dayOffId;
  
      const b ={
        employeeId: employeeId,
        dayOffId: dayOffId,
        status: '취소'
      }
      cancelDayOff(b)
    }catch(error){
      console.log(`error: ${error}`);
    }
  };

  return (
    <>
      <div className="w-screen h-screen bg-black/40 fixed top-0 left-0 z-10">
        <div
          className="w-1/3 h-80 bg-white absolute top-0 left-0 bottom-0 right-0 m-auto"
          ref={modalRef}>
          <div className="h-[50px] flex border-2 ">
            <div className="w-[1.8rem] bg-primary"></div>
            <div className="text-l flex items-center ml-4">일정관리</div>
          </div>
          <div className="h-4/5 flex">
            <div className=" m-auto h-4/5 w-4/5 border-2 border-primary rounded-lg  flex-wrap ">
              <div className="flex  h-1/5  bg-primary w-full border-b-2 border-white">
                <div className="w-1/5 flex items-center justify-center border-white  border-r-2 text-white  ">
                  내용
                </div>
                <div className="w-3/5 flex  items-center justify-center text-white">
                  기간
                </div>
                <div className="w-1/5 flex  items-center justify-center text-white  border-l-2">
                  수정/삭제
                </div>
              </div>

              {manageFormatted.map((props, index) => (
                <div key={index} className="flex h-1/5 w-full bg-primaryHover border-b-2 border-white overflow">
                  <div className="w-1/5 flex items-center justify-center border-white border-r-2 text-white">
                    {props.type}
                  </div>
                  <div className="w-3/5 flex items-center justify-center text-white">
                    { props.date === null ?
                    props.startDate
                    : props.date }
                    {props.date === null ?
                    ' - '
                    : null} 
                    { props.date === null ?
                    props.endDate
                    : null}
                  </div>
                  <div className="w-1/5 flex items-center justify-center border-white border-l-2 text-white">
                    {props.status === '대기중' ?
                      <div className='flex justify-between'>
                        <PencilSquareIcon
                          className="w-6 h-6 cursor-pointer text-white pr-1.5"
                          onClick={() => dayOffEditClick(index)}/>
                        <TrashIcon
                          className="w-6 h-6 cursor-pointer text-white pl-1.5"
                          onClick={() => dayOffDeleteClick(index)}/>
                      </div>
                    : props.status}
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
