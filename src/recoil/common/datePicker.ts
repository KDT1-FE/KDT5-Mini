import { atom } from 'recoil';

const currentDate = new Date();
const startDate = new Date(currentDate);
startDate.setDate(startDate.getDate() - 15); // 현재날짜 15일 전

const endDate = new Date(currentDate);
endDate.setDate(endDate.getDate() + 15); // 현재날짜 15일 후

export const selectedStartDateState = atom<Date | null>({
  key: 'selectedStartDateState',
  default: startDate
});

export const selectedEndDateState = atom<Date | null>({
  key: 'selectedEndDateState',
  default: endDate
});
