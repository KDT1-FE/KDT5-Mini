import { atom } from 'recoil';

export type ModalType = {
  isOpen: boolean;
  title: string;
  content: JSX.Element | string;
};

export const modalState = atom<ModalType>({
  key: 'modalState',
  default: {
    isOpen: false,
    title: '',
    content: '',
  },
});
