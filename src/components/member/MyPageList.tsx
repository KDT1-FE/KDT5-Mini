import React, { useEffect, useState } from 'react';
import { IMemberDayOffProps, IMemberDutyProps } from '@/types/IMyPages';
import memberList from '@/api/member/memberList';

export default function MyPageList() {
  const [dayOffEmployees, setDayOffEmployees] = useState<IMemberDayOffProps[]>(
    []
  );
  const [dutyEmployees, setDutyEmployees] = useState<IMemberDutyProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await memberList();
      const resList = response.data || {};

      if (resList.duties) {
        setDutyEmployees(resList.duties);
      }
      if (resList.dayOffs) {
        setDayOffEmployees(resList.dayOffs);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-[64rem] h-[36.67rem]">
      <div className="relative  w-[9rem] rounded-sm font-bold sm:text-2xl sm:pb-8 h-9">
        <span className="bg-primary absolute  top-0 left-0 w-4 h-9 z-0"></span>
        <span className="relative z-10 pl-4 ml-2">연차 리스트</span>
      </div>
      <div className="flex justify-between border-y-2 border-solid mt-6 text-1.5xl font-semibold py-3 text-center">
        <div className="w-[13.33rem] ">요청</div>
        <div className="w-[16.67rem]">사용날짜</div>
        <div className="w-[16.67rem]">사유</div>
        <div className="w-[13.33rem]">처리결과</div>
      </div>
      <div className="w-[64rem] h-[11.67rem] overflow-y-auto ">
        {dayOffEmployees.map(dayoffs => (
          <div
            key={dayoffs.dayOffId}
            className="h-[3.33rem] flex justify-between border-b-2 border-solid text-1.5xl py-3  text-center ">
            <div className="w-[13.33rem] font-semibold">
              {dayoffs.type}({dayoffs.amount}일)
            </div>
            <div className="w-[16.67rem] text-gray-500">{`${dayoffs.startDate} ~ ${dayoffs.endDate}`}</div>
            <div className="w-[16.67rem] text-gray-500">{dayoffs.reason}</div>
            <div
              className={`w-[13.33rem] font-semibold ${
                dayoffs.status === '대기중'
                  ? 'text-mainOrange'
                  : dayoffs.status === '거절됨'
                  ? 'text-secondary'
                  : dayoffs.status === '취소'
                  ? 'text-primary'
                  : 'text-mainBlue'
              }`}>
              {dayoffs.status}
            </div>
          </div>
        ))}
      </div>
      <div className="relative  w-[9rem] rounded-sm font-bold sm:text-2xl sm:pb-8 h-9 mt-10">
        <span className="bg-primary absolute top-0 left-0 w-4 h-9 z-0"></span>
        <span className="relative z-10 pl-4 ml-2">당직 리스트</span>
      </div>
      <div>
        <div className="flex justify-between border-y-2 border-solid mt-6 text-1.5xl font-semibold py-3 text-center">
          <div className="w-[13.33rem]">요청</div>
          <div className="w-[33.33rem] ">사용날짜</div>
          <div className="w-[13.33rem]"> 처리결과</div>
        </div>

        <div className="w-[64rem] h-[11.67rem] overflow-y-auto">
          <div className="w-[64rem] h-[11.67rem] overflow-y-auto">
            {dutyEmployees.map(duties => (
              <div
                key={duties.dutyId}
                className="flex justify-between border-b-2 border-solid text-1.5xl py-3  overflow-y-auto text-center">
                <div className="w-[13.33rem] font-semibold">{duties.type}</div>
                <div className="w-[33.33rem] text-gray-500">{duties.date}</div>
                <div
                  className={`w-[13.33rem] font-semibold ${
                    duties.status === '대기중'
                      ? 'text-mainOrange'
                      : duties.status === '거절됨'
                      ? 'text-secondary'
                      : duties.status === '취소'
                      ? 'text-primary'
                      : 'text-mainBlue'
                  }`}>
                  {duties.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
