import React, { useState, useEffect } from 'react';
import { clientInstance } from '@/api/axios';
import Image from 'next/image';
import memberInfo from '@/api/member/memberInfo';
import Loading from '@/components/common/Loading';
import { useRecoilState } from 'recoil';
import { memberInfoState } from '@/recoil/memberInfo';

export default function MemberDetail() {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [memberState, setMemberState] = useRecoilState(memberInfoState);

  useEffect(() => {
    async function getInfo() {
      setIsLoading(true);
      const response = await memberInfo();
      if (response.success && response.data) {
        setMemberState(response.data);
      }
      {
        setTimeout(() => setIsLoading(false), 500);
      }
    }

    getInfo();
  }, []);

  const hireDate = new Date(memberState.hireDate);
  const currentDate = new Date();

  const dateDifference = currentDate.getTime() - hireDate.getTime();

  const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25;
  const years = Math.floor(dateDifference / millisecondsPerYear);
  const remainingMilliseconds = dateDifference - years * millisecondsPerYear;

  const millisecondsPerMonth = 1000 * 60 * 60 * 24 * 30.44;
  const months = Math.floor(remainingMilliseconds / millisecondsPerMonth);

  const List = {
    이름: memberState.name,
    계열사: memberState.department,
    고용일: memberState.hireDate
  };

  const More = {
    직급: memberState.position,
    사원번호: memberState.employeeId,
    근무기간: `${years}년 ${months}개월`
  };

  return (
    <div className="w-[70rem] flex h-[35rem]">
      <div className="w-[40rem]  mr-8  border-[1px] rounded shadow">
        <div className="relative  w-[15rem]  rounded-md font-bold sm:text-2xl sm:pb-8 h-9 ">
          <div className="bg-primary absolute   top-0 left-0 w-4 h-12 z-0"></div>
          <div className="relative z-10 pl-4 ml-2 pt-2">사용자 정보</div>
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="flex mt-8">
            <div className="">
              {Object.entries(List).map(([key, value]) => (
                <div className="m-6 ml-12" key={key}>
                  <div className="text-md mt-14">{key}</div>
                  <div className="w-[14rem] text-lg font-semibold border-b-2 border-gray-200 pt-2 outline-none rounded-sm focus:border-primary text-md">
                    {value}
                  </div>
                </div>
              ))}
            </div>
            <div className="">
              {Object.entries(More).map(([key, value]) => (
                <div className="m-6 ml-12" key={key}>
                  <div className="text-md mt-14">{key}</div>
                  <div className="w-[14rem] text-lg font-semibold border-b-2 border-gray-200 pt-2 outline-none rounded-sm focus:border-primary text-md">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex w-[25rem] border-[1px] rounded-md shadow ml-2 ">
        <div className="w-full h-full">
          <div className=" flex  justify-center h-[200px] rounded-full  ">
            {previewImage ? (
              <Image
                src={previewImage}
                alt="미리보기 이미지"
                width={320}
                height={320}
                className="rounded-xl w-[240px] h-[240px] "
              />
            ) : memberState.profilePath ? (
              <Image
                src={`${clientInstance.defaults.baseURL}${memberState.profilePath}`}
                width={320}
                height={320}
                alt="프로필 이미지"
                className="rounded-xl w-[320px] h-[320px]  mt-8 "
              />
            ) : (
              <div className="flex items-center justify-center font-semibold ">
                이미지 없음
              </div>
            )}
          </div>
          <div className="flex justify-center mt-[15rem] font-bold text-xl ">
            {memberState.name}님, 반갑습니다.
          </div>
        </div>
      </div>
    </div>
  );
}
