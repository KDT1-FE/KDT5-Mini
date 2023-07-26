import  { useState } from 'react';
import { DateRange, Range } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

export default function MyDateRangePicker() {
  const [state, setState] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: undefined,
      key: 'selection'
    }
  ]);

  // 선택한 날짜 범위를 받아 옵니다. 확인용 콘솔입니다.
  console.log(state[0].startDate);
  console.log(state[0].endDate);

  const handleSelect = (ranges: { [key: string]: Range }) => {
    setState([ranges['selection']]);
  }

  return (
    <DateRange
      editableDateInputs={true}
      onChange={handleSelect}
      moveRangeOnFirstSelection={false}
      months={2}
      ranges={state}
    />
  );
}

