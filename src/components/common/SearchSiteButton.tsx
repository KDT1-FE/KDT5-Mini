import { IButtonProps } from '@/types/ICommon';

export default function SearchSiteButton({
  contents,
  onClick,
  submit,
  site,
  disabled
}: IButtonProps) {
  let buttonStyles = '';

  if (site === 'naver') {
    buttonStyles =
      'bg-white text-naver border-naver hover:bg-naver hover:text-white';
  } else if (site === 'google') {
    buttonStyles =
      'bg-white text-google border-google hover:bg-google hover:text-white';
  } else if (site === 'kakao') {
    buttonStyles =
      'bg-white text-kakao border-kakao hover:bg-kakao hover:text-white';
  }
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={submit ? 'submit' : 'button'}
      className={`${buttonStyles}  block h-10 w-full rounded-md border-2  px-3 sm:py-2 font-bold ring-subTextAndBorder ring-offset-2 transition hover:opacity-80 text-base focus:ring-2 active:scale-95 disabled:pointer-events-none disabled:opacity-30 sm:h-12 sm:text-base`}>
      {contents}
    </button>
  );
}
