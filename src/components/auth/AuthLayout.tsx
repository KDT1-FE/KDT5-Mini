import Link from 'next/link';
import Image from 'next/image';
import { ILayout } from '@/types/ICommon';

export default function AuthLayout({ children }: ILayout) {
  return (
    <div className="flex h-screen mx-auto sm:w-[580px] sm:py-16 flex-col justify-center">
      <div className="flex justify-center mb-16">
        <Link href={'/'}>
          <Image src="/logo.png" alt="logo" width={250} height={20} priority />
        </Link>
      </div>
      <div className="text-2xl sm:text-4xl bg-white sm:pb-16">{children}</div>
    </div>
  );
}
