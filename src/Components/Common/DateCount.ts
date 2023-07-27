import dayjs from 'dayjs';
// 시작일과 마지막날을 입력되면 총 기간이 출력된다.
export function DateCount({ startDate, endDate }: { startDate: string, endDate: string }) {
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  if (!start.isValid() || !end.isValid()) {
    console.error('Invalid input: startDate and endDate must represent valid dates.');
    return 'Invalid input';
  }

  const diffInDays = end.diff(start, 'day');
  // const calDays = totalAnnual - diffInDays
  // console.log(diffInDays);
  return diffInDays+1
}
