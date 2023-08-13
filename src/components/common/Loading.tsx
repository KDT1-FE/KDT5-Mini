import React from 'react';
import Image from 'next/image';

// 로딩 컴포넌트
export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm">
      <div className="relative w-[180px] h-[180px]">
        <Image src={'/logo.png'} layout="fill" objectFit="contain" alt="logo" />
        <div className="absolute -inset-4 border-t-8 border-primary border-solid rounded-full animate-spin"></div>
      </div>
    </div>
  );
}
