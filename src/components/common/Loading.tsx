import React from 'react';
import Image from 'next/image';

//로딩컴포넌트
export default function Loading() {
  return (
    <div className="flex items-center justify-center mt-[8rem]">
      <div className="relative w-[180px] h-[180px]">
        <Image src={'/logo.png'} layout="fill" objectFit="contain" alt="logo" />
        <div className="absolute -inset-4 border-t-8 border-primary border-solid rounded-full animate-spin "></div>
      </div>
    </div>
  );
}
