import Image from 'next/image';

export default function AuthSignUpTitle() {
  return (
    <>
      <div className="flex justify-center mt-8 sm:mt-0 text-2xl sm:text-3xl">
        <Image src="/logo.png" alt="logo" width={250} height={20} />
      </div>
      <div className="my-4 sm:my-8">
        <hr className="font-bold border-b border-gray-700" />
      </div>
    </>
  );
}
