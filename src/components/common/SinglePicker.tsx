import { useState } from 'react';
import { format } from 'date-fns';
import ko from 'date-fns/locale/ko'; // 한국어 locale import
import DatePicker from 'react-datepicker';
import { useSetRecoilState } from 'recoil';
import { signUpState } from '@/recoil/signUp';
import 'react-datepicker/dist/react-datepicker.css';

export default function SinglePicker({ ...props }) {
  // 회원가입 정보 atom state 구독
  const setSignUpInfo = useSetRecoilState(signUpState);

  const [selected, setSelected] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelected(date);
    setSignUpInfo(prevInformation => ({
      ...prevInformation,
      [props.name]: date ? format(date, 'yyyy-MM-dd') : ''
    }));
  };

  return (
    <DatePicker
      selected={selected}
      startDate={props.value}
      onChange={handleDateChange}
      dateFormat="yyyy-MM-dd"
      className="w-[185px] h-[2.5rem]"
      placeholderText="입사일을 선택해주세요."
      locale={ko}
    />
  );
}
