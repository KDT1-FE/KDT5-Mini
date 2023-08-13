import { atom } from 'recoil';

export const remainDaysState = atom<number>({
  key: 'remainDays',
  default: 15
});

export const dayOffState = atom({
  key: 'dayOffs',
  default: []
});

export const dutiesState = atom({
  key: 'duties',
  default: []
});

export const nameState = atom({
  key: 'userName',
  default: ''
});

export const emailState = atom({
  key: 'userEmail',
  default: ''
});

export const typeState = atom({
  key: 'dayOffType',
  default: ''
});