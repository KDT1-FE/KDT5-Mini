import { ILayout } from '@/types/ICommon';

export default function Layout({ children, ...props }: ILayout) {
  return (
    <div {...props} className="sm:w-[75rem] py-0 px-[1.25rem] mt-0 mx-auto">
      {children}
    </div>
  );
}
