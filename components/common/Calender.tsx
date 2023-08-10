import React, { useState } from 'react';
import styled from 'styled-components';

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  // 이전 달로 이동하는 함수
  const prevMonth = () => {
    setCurrentDate((prevDate) => {
      const prevMonthDate = new Date(prevDate);
      prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);
      return prevMonthDate;
    });
  };

  // 다음 달로 이동하는 함수
  const nextMonth = () => {
    setCurrentDate((prevDate) => {
      const nextMonthDate = new Date(prevDate);
      nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
      return nextMonthDate;
    });
  };

  const getFirstDay = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return firstDay.getDay();
  };

  const getLastDateOfMonth = (date: string | number | Date) => {
    const nextMonth = new Date(date);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    nextMonth.setDate(0);
    return nextMonth.getDate();
  };

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const today = currentDate.getDate();

  const weeks = [];
  const firstDayIndex = getFirstDay(currentDate);
  const lastDateOfMonth = getLastDateOfMonth(currentDate);

  let week = [];
  for (let i = 0; i < firstDayIndex; i++) {
    week.push(null);
  }

  for (let date = 1; date <= lastDateOfMonth; date++) {
    week.push(date);

    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }

  if (week.length > 0) {
    while (week.length < 7) {
      week.push(null);
    }
    weeks.push(week);
  }

  return (
    <CalendarContainer>
      <CalendarMonth>
        <ArrowButton onClick={prevMonth}>&lt;</ArrowButton>
        <span>{currentYear}년 </span>
        <span>{currentMonth}월</span>
        <ArrowButton onClick={nextMonth}>&gt;</ArrowButton>
      </CalendarMonth>
      <CalendarTable>
        <thead>
          <tr>
            <SundayHeader>일</SundayHeader>
            <th>월</th>
            <th>화</th>
            <th>수</th>
            <th>목</th>
            <th>금</th>
            <SaturdayHeader>토</SaturdayHeader>
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, index) => (
            <tr key={index}>
              {week.map((date, idx) => {
                if (date === null) {
                  return <DateCell key={idx} />;
                }

                const isCurrentDay = date === today;
                const isPast12PM = isCurrentDay && new Date().getHours() >= 12;

                return (
                  <DateCell
                    key={idx}
                    className={isCurrentDay ? (isPast12PM ? "current-day-black" : "current-day") : "other-day"}
                  >
                    {date}
                  </DateCell>
                );
              })}
            </tr>
          ))}
        </tbody>
      </CalendarTable>
    </CalendarContainer>
  );
}

const CalendarContainer = styled.div`
  font-family: Arial, sans-serif;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  padding: 30px;
  cursor: pointer;
`;

const SundayHeader = styled.th`
  font-size: 20px;
  color: red;
`;

const SaturdayHeader = styled.th`
  font-size: 20px;
  color: blue;
`;

const CalendarTable = styled.table`
  border-collapse: collapse;
  width: 750px;
  margin: 0 auto;
  font-size: 20px;
`;

const CalendarMonth = styled.div`
  padding: 45px;
  font-size: 30px;
  text-align: center;
  margin: 0 auto;
`;

const DateCell = styled.td`
  cursor: pointer;
  width: 70px;
  height: 70px;
  text-align: center;
  vertical-align: middle;

  &.current-day {
    background-color: #ccc;
  }

  &.current-day-black {
    color: black;
  }

  &.other-day {
    color: #ccc;
  }
`;

export default Calendar;


