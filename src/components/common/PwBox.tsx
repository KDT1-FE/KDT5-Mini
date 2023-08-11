import { ILayout } from '@/types/ICommon';

export default function PwBox({ children, ...props }: ILayout) {
  return (
    <div {...props} className="sm:mt-4">
      {children}
    </div>
  );
}
