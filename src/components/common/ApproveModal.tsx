import { IModalProps } from '@/types/IModal';
import { useState, useEffect, useRef } from 'react';
import { dutyState, modalState } from '@/recoil/common/modal';
import { useRecoilState } from 'recoil';
import DatePicker from 'react-datepicker';
import {requestDayOff} from '@/api/main/dayoff';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import {requestDuty} from '@/api/main/duty';
import { Cookies } from 'react-cookie';

const cookie = new Cookies();

export default function ApproveModal(modalProps: IModalProps) {
  const [isModalShow, setIsModalShow] = useRecoilState(modalState);
  const [isDutyShow, setIsDutyShow] = useRecoilState(dutyState);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [onClickValue, setOnClickValue] = useState<string>('');
  const [checkReason, setCheckReason] = useState<string>('');

  const startDateMSec = startDate.getTime();
  const endDateMSec = endDate.getTime();
  const startDateMonth = startDate.getMonth();
  const endDateMonth = endDate.getMonth();

  //잔여 연차보다 데이트피커로 선택한 날이 더 많을 경우
  useEffect(() => {
    const elapsedMSec = endDateMSec - startDateMSec;
    const elapsedDays = Math.abs(elapsedMSec / (1000 * 60 * 60 * 24)) + 1;
    const sameMonth = startDateMonth - endDateMonth;

    // 시작월 = 마지막월, 연차 > 15
    if (sameMonth === 0 && elapsedDays > 15) {
      alert('선택일이 잔여 연차를 초과했습니다.');
      //시작일 기준 ~ +15일
      const adjustDate = new Date(endDate.setDate(startDate.getDate() + 14));
      setEndDate(adjustDate);
    } else if (sameMonth < 0 && elapsedDays > 15) {
      alert('선택일이 잔여 연차를 초과했습니다.');
      setEndDate(startDate);
    } else if (sameMonth > 0 && elapsedDays > 15) {
      alert('선택일이 잔여 연차를 초과했습니다.');
      setEndDate(startDate);
    }
  }, [
    endDate,
    endDateMSec,
    endDateMonth,
    startDate,
    startDateMSec,
    startDateMonth
  ]);

  useEffect(() => {
    const elapsedMSec = endDateMSec - startDateMSec;
    const elapsedDays = Math.abs(elapsedMSec / (1000 * 60 * 60 * 24)) + 1;
    const sameMonth = startDateMonth - endDateMonth;

    // 시작월 = 마지막월, 연차 > 15
    if (sameMonth === 0 && elapsedDays > 15) {
      alert('선택일이 잔여 연차를 초과했습니다.');
      //시작일 기준 ~ +15일
      const adjustDate = new Date(endDate.setDate(startDate.getDate() + 14));
      setEndDate(adjustDate);
    } else if (sameMonth < 0 && elapsedDays > 15) {
      alert('선택일이 잔여 연차를 초과했습니다.');
      setStartDate(endDate);
    }
  }, [
    endDate,
    endDateMSec,
    endDateMonth,
    startDate,
    startDateMSec,
    startDateMonth
  ]);

  // 모달 외부 클릭시 모달창 닫히게 하는 로직
  const modalRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    function handleOutside(e: Event) {
      // current.contains(e.target) : 컴포넌트 특정 영역 외 클릭 감지를 위해 사용
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsModalShow(false);
        setIsDutyShow(false);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
    };
  }, [modalRef, setIsDutyShow, setIsModalShow]);

  //체크박스
  const MakeCheckBox = () => {
    const box = [];
    const checkBoxContents = ['오전 반차', '오후 반차', '연차', '특별 휴가'];
    const checkboxes = document.getElementsByTagName('input');

    //체크 박스 하나만 클릭 가능하게
    const checkItem = (checkThis: HTMLInputElement) => {
      for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i] !== checkThis) {
          checkboxes[i].checked = false;
        }
      }
    };

    for (let i = 0; i < 4; i++) {
      box.push(
        <div key={i} className="px-3">
          <input
            type="checkbox"
            onClick={e => {
              checkItem(e.target as HTMLInputElement);
              setOnClickValue((e.target as HTMLInputElement).value);
            }}
            value={checkBoxContents[i]}
          />
          {checkBoxContents[i]}
        </div>
      );
    }

    return <div className="flex">{box}</div>;
  };
 
  const employeeId = Number(cookie.get('employeeId'));
  const startDateForm = moment(startDate).format('YYYY-MM-DD');
  const endDateForm = moment(endDate).format('YYYY-MM-DD');

  const dayOffData = {
    employeeId: employeeId,
    startDate: `${startDateForm}`,
    endDate: `${endDateForm}`,
    type: `${onClickValue}`,
    reason: `${checkReason}`
  };

  const submitDayOff = () => {
    //event?.preventDefault()
    requestDayOff(dayOffData);
  };

  const dutyData = {
    employeeId: employeeId,
    date: `${startDateForm}`
  };

  const submitDuty = () => {
    requestDuty(dutyData);
  };

  return (
    <>
      <div className="w-screen h-screen bg-black/40 fixed top-0 left-0 z-10">
        <div ref={modalRef}>
          <form
            className="w-1/3 h-80 bg-white absolute top-0 left-0 bottom-0 right-0 m-auto"
            onSubmit={modalProps.IsDutyModal ? submitDuty : submitDayOff}>
            <div
              className="before:content-[''] before:block before:w-4 before:h-10 before:bg-primary before:absolute before:top-0 before:left-0
              relative py-2 pl-6 shadow-md">
              {modalProps.title}
            </div>
            <div>
              <div>
                <div className="flex justify-center items-center pt-4 pb-2">
                  {modalProps.IsCheckBoxShow ? <MakeCheckBox /> : null}
                </div>
                {!modalProps.IsDutyModal ? (
                  <div className="flex justify-between items-center w-[75%] mx-auto py-3">
                    <DatePicker
                      dateFormat={'yyyy/MM/dd'}
                      selected={startDate}
                      onChange={(date: Date) => setStartDate(date)}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                    />
                    <span>-</span>
                    <DatePicker
                      dateFormat={'yyyy/MM/dd'}
                      selected={endDate}
                      onChange={(date: Date) => setEndDate(date)}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate}
                    />
                  </div>
                ) : (
                  <div className="flex justify-center items-center w-[75%] mx-auto py-3">
                    <DatePicker
                      dateFormat={'yyyy/MM/dd'}
                      selected={startDate}
                      onChange={(date: Date) => setStartDate(date)}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      className="text-center"
                    />
                  </div>
                )}
                <div className="flex justify-center items-center py-3">
                  {modalProps.IsTextBoxShow ? (
                    <textarea
                      placeholder="사유"
                      cols={60}
                      rows={3}
                      className="w-[75%] border rounded-md border-modalBorder pt-2 pl-2 outline-none"
                      onChange={e => setCheckReason(e.target.value)}></textarea>
                  ) : null}
                </div>
                <div className="flex justify-center items-center pt-2">
                  <input
                    type="submit"
                    value={modalProps.submit}
                    className="border cursor-pointer w-[75%] h-9 bg-primary text-white rounded-md"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
