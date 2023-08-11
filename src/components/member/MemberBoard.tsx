import React, { useEffect, useState } from 'react';
import memberList from '@/api/member/memberList';

export default function MemberBoard() {
  const [dayOffRemains, setDayOffRemains] = useState<number>(0);

  return (
    <div className="w-[12rem] h-[14rem] flex  items-center rounded-sm  ">
      <div>
        <div className="flex mt-4">
          <div className="font-bold mb-8">총 연차:</div>
          <div className="text-center ml-2">15일</div>
        </div>
        <div className="flex">
          <div className="font-bold mb-8">사용일수:</div>
          <div className="text-cente ml-2">{15 - dayOffRemains}일</div>
        </div>
        <div className="flex">
          <div className="font-bold mb-8">잔여 연차:</div>
          <div className="text-center ml-2">{dayOffRemains}일</div>
        </div>
      </div>
    </div>
  );
}
