import React, { useEffect, useState } from 'react';
import memberList from '@/api/member/memberList';

export default function MemberBoard() {
  const [dayOffRemains, setDayOffRemains] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await memberList();
      const dayOffRemainsValue = response.data?.dayOffRemains;
      setDayOffRemains(dayOffRemainsValue);
    };

    fetchData();
  }, []);

  return (
    <div className="w-[12rem] h-[14rem] flex justify-center items-center">
      <div>
        <div className="flex mt-4">
          <div className="font-bold mb-8 text-mainBlack">총 연차:</div>
          <div className="text-center font-bold text-mainBlack ml-2">15일</div>
        </div>
        <div className="flex">
          <div className="font-bold text-mainBlack mb-8">사용일수:</div>
          <div className="text-cente font-bold ml-2 text-mainBlack">
            {15 - dayOffRemains}일
          </div>
        </div>
        <div className="flex">
          <div className="font-bold  text-mainBlack mb-8">잔여 연차:</div>
          <div className="text-center font-bold text-mainBlack ml-2">
            {dayOffRemains}일
          </div>
        </div>
      </div>
    </div>
  );
}
