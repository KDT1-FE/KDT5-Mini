// CustomPicker.js 파일
import React from 'react';
import { useRecoilState } from 'recoil';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import {
  selectedStartDateState,
  selectedEndDateState
} from '@/recoil/common/datePicker';

export default function CustomPicker() {
  const [selectedStartDate, setSelectedStartDate] = useRecoilState(
    selectedStartDateState
  );
  const [selectedEndDate, setSelectedEndDate] =
    useRecoilState(selectedEndDateState);

  const handleStartDateChange = (date: Date | null) => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setSelectedEndDate(date);
  };

  return (
    <div className="flex items-center">
      <div className="relative">
        <div className="absolute flex items-center pointer-events-none"></div>
        <DatePicker
          selected={selectedStartDate}
          onChange={handleStartDateChange}
          selectsStart
          startDate={selectedStartDate}
          endDate={selectedEndDate}
          maxDate={selectedEndDate}
          dateFormat="yyyy-MM-dd"
          className="w-[185px] h-[2.5rem] text-3xl"
          placeholderText="시작일"
          locale={ko}
        />
      </div>
      <span className="mr-4">~</span>
      <div className="relative">
        <DatePicker
          selected={selectedEndDate}
          onChange={handleEndDateChange}
          selectsEnd
          startDate={selectedStartDate}
          endDate={selectedEndDate}
          minDate={selectedStartDate}
          dateFormat="yyyy-MM-dd"
          className="w-[185px] h-[2.5rem] text-3xl"
          placeholderText="종료일"
          locale={ko}
        />
      </div>
    </div>
  );
}
