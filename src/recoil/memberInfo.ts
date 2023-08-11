import { atom } from 'recoil';
import { IMember } from '@/types/IPersonal';

export const memberInfoState = atom<IMember>({
  key: 'memberInfoState',
  default: {
    employeeId: 0,
    department: '',
    name: '',
    email: '',
    phone: '',
    hireDate: '',
    profilePath: '',
    position: ''
  }
});
