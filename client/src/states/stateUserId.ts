import { atom } from 'recoil';

export type IdType = {
  id: number;
};

export const UserIdState = atom<IdType>({
  key: 'UserIdState',
  default: {
    id: 0,
  },
});

export const HospitalIdState = atom<number>({
  key: 'HospitalIdState',
  default: 0,
});
