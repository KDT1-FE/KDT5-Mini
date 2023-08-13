import { atom } from 'recoil';

export const modalState = atom<boolean>({
  key: 'isModalShow',
  default: false
});

export const dutyState = atom<boolean>({
  key: 'isDutyShow',
  default: false
});

export const manageState = atom<boolean>({
  key: 'isManageShow',
  default: false
});

export const adminState = atom<boolean>({
  key: 'isAdminShow',
  default: false
});
