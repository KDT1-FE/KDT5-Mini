import { ILayout } from '@/types/ICommon';

export default function AuthBox({ children, ...props }: ILayout) {
  return (
    <div {...props} className="sm:mt-4">
      {children}
    </div>
  );
}
