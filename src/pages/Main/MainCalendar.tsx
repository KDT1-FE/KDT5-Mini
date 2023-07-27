import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './MainCalendar.scss';

const MainCalendar = () => {
  const [selectedCategories, setSelectedCategories] = useState(['연차', '당직']);

  const [view, setView] = useState(false); 


  const events = [
    { category: '연차', name: 'asd', start: '2023-07-01', end: '2023-07-05' },
    { category: '당직', name: 'asd', start: '2023-07-10', end: '2023-07-15' },
    { category: '당직', name: 'assd', start: '2023-07-10', end: '2023-07-15' },
    { category: '당직', name: 'asd', start: '2023-07-10', end: '2023-07-15' },
  ];

  // 당직, 연차 값을 조건에 따라 색상 변경
  const processedEvents = events.map((event) => {
    if (event.category === '연차') {
      return {
        ...event,
        color: '#FEEFEC',
        textColor: '#EA613C',
        title: `• ${event.name}`,
      };
    } else if (event.category === '당직') {
      return {
        ...event,
        color: '#EEF6F1',
        textColor: '#3ACAB9',
        title: `• ${event.name}`,
      };
    } else {
      return event;
    }
  });

  // 카테고리 선택 버튼 클릭 시
  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // 선택된 카테고리에 따라 이벤트 필터링
  const filteredEvents =
    selectedCategories.includes('all')
      ? processedEvents
      : processedEvents.filter((event) =>
          selectedCategories.includes(event.category)
        );

  // 연차 리스트 개수
  const selectedAnnualLeave = events.filter((event) => 
  event.category === '연차').length;


  // 당직 리스트 개수
  const selectedDuty = events.filter((event) => 
    event.category === '당직').length;

  // 유저 이름 표시
  const userName = events.map((event) => event.name);   

  // 오늘 날짜 
  const today = new Date();
  const year = today.getFullYear(); // 년도 (예: 2023)
  const month = today.getMonth() + 1; // 월 (0 ~ 11, 1을 더해서 1 ~ 12로변환)
  const day = today.getDate(); // 오늘 날짜 (1 ~ 31)
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayOfWeek = daysOfWeek[today.getDay()]; // 요일 (0 ~ 6)
    
  const formattedDate = `${year}. ${month}. ${day}. ${dayOfWeek}`;
    


  return (
    <div>
      <ul className='UserInfo'
        onClick={() => {setView(!view)}}> 
        반가워요, {userName} 님!       
        {/* 추후에 {loggedInUser.name} 로 변환할 것  */}

        <li>마이페이지</li>
        <li>로그아웃</li>
      </ul>



      <div className='Today'>     {/* 오늘 날짜 렌더링 */}
        <h1>Today</h1>  
        {formattedDate}
      </div>
      <div className='SelectCanlendar'>      {/* 일정 선택 박스 */}
        <h1>Calendar</h1>
        <label>
          <input 
            type='checkbox'
          />전체 일정
        </label>
        <label>
          <input 
            type='checkbox'
          />내 일정
        </label>
      </div>
      <div className='SelectCategories'>
        <h1>Categories</h1>
        <label>            {/* 연차 카테고리 선택 박스   */}
          <input
            type='checkbox'
            checked={selectedCategories.includes('연차')}
            onChange={() => handleCategoryChange('연차')}
          />
          연차
        </label>
        <span>{selectedAnnualLeave}</span>      {/* 연차 리스트 카운트 */}
        <label>           {/* 당직 카테고리 선택 박스   */}
          <input
            type='checkbox'
            checked={selectedCategories.includes('당직')}
            onChange={() => handleCategoryChange('당직')}
          />
          당직
        </label>
        <span>{selectedDuty}</span>          {/* 당직 리스트 카운트 */}
      </div>




      <FullCalendar        
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        height={700}
        events={filteredEvents}
      />    {/* 캘린더 렌더링 */}

    </div>
  );
};
export default MainCalendar;
