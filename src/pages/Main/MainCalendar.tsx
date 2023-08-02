import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './MainCalendar.scss';
import eventData from '../../API/dummyAPI/restdayAll.json';
import EventModal from './EventModal';
import AddEventModal from './AddEventModal';


const MainCalendar: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState(['연차', '당직']);
  const [view, setView] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [events, setEvents] = useState(() => {
    if (Array.isArray(eventData.response)) {
      // eventData.response가 주어진 JSON 데이터와 동일한 형태라면 그대로 사용
      return eventData.response;
    } else {
      // 만약 다른 형태로 로드되었다면 여기서 가공하여 events로 설정
      // 예: return eventData.someOtherProperty;
      return [];
    }
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  // 당직, 연차 값을 조건에 따라 색상 변경
  const processedEvents = events.map((event: any) => {
    const { startDate, endDate, ...rest } = event;
    return {
      ...rest,
      start: startDate,
      end: endDate,
      color: event.category === "연차" ? "#FEEFEC" : "#EEF6F1",
      textColor: event.category === "연차" ? "#EA613C" : "#3ACAB9",
      title: `• ${event.name}`,
    };
  });


  // 카테고리 선택 버튼 클릭 시
  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // 선택된 카테고리에 따라 이벤트 필터링
  const filteredEvents = selectedCategories.includes("all")
    ? processedEvents
    : processedEvents.filter((event: { category: string }) =>
        selectedCategories.includes(event.category),
      );

  // 연차 리스트 개수
  const selectedAnnualLeave = events.filter(
    (event: { category: string }) => event.category === "연차",
  ).length;

  // 당직 리스트 개수
  const selectedDuty = events.filter(
    (event: { category: string }) => event.category === "당직",
  ).length;

  // 유저 이름 표시
  const userName = events.map((event: { name: string }) => event.name);

  // 오늘 날짜
  const today = new Date();
  const year = today.getFullYear(); // 년도 (예: 2023)
  const month = today.getMonth() + 1; // 월 (0 ~ 11, 1을 더해서 1 ~ 12로변환)
  const day = today.getDate(); // 오늘 날짜 (1 ~ 31)
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayOfWeek = daysOfWeek[today.getDay()]; // 요일 (0 ~ 6)

  const formattedDate = `${year}. ${month}. ${day}. ${dayOfWeek}`;

  // headerToolbar 커스터마이즈
  const headerToolbarOptions = {
    left: "prev",
    center: "title",
    right: "next",
  };

  const handleAddEvent = () => {
    // 추후에 일정 등록하기 추가
    console.log("일정 등록하기 버튼 클릭");

    const newEvent = {
      id: 3,
      name: "새로운 이벤트",
      category: "연차",
      startDate: "2023-08-10",
      endDate: "2023-08-15",
      reason: "새로운 이벤트 사유",
    };


    const handleEventClick = (eventInfo) => {
      const { reason, title, start, end, category } = eventInfo.event;
      console.log('Clicked event - Reason:', reason);
      console.log('Clicked event - Title:', title);
      console.log('Clicked event - Start:', start);
      console.log('Clicked event - End:', end);
      console.log('Clicked event - Category:', category);
  
      setSelectedEvent(eventInfo.event);
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      // 이 부분이 추가되었습니다.
      setIsModalOpen(false);
    };
  
    const handleAddEvent = (newEvent: any) => {
      setEvents((prevEvents: any) => [...prevEvents, newEvent]);
      // 새로운 이벤트가 추가되었으므로, 모달을 열기 위해 isModalOpen 상태를 true로 설정하고 selectedEvent 상태를 초기화
      setIsModalOpen(true);
      setSelectedEvent(null);
    };

  return (
    <div className='mainWrap'>
      <div className='selectWrap'>
      <ul className='UserInfo'
        onClick={() => {setView(!view)}}> 
        반가워요, {userName} 님!       
        {/* 추후에 {loggedInUser.name} 로 변환할 것  */}
        <li>마이페이지</li>
        <li>로그아웃</li>
      </ul>



      <div className='Today'>     {/* 오늘 날짜 렌더링 */}
        <h1>Today</h1>  
        <span>{formattedDate}</span> 
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
        <div>
          <label>            {/* 연차 카테고리 선택 박스   */}
            <input
              type='checkbox'
              checked={selectedCategories.includes('연차')}
              onChange={() => handleCategoryChange('연차')}
            />
            연차
            <span className='LeaveBox'>{selectedAnnualLeave}</span> 
                        {/* 연차 리스트 카운트 */}
          </label>
          
        </div>
        <div className="SelectCanlendar">
          {" "}
          {/* 일정 선택 박스 */}
          <h1>Calendar</h1>
          <label>
            <input type="checkbox" />
            전체 일정
          </label>
          <label>
            <input type="checkbox" />내 일정
          </label>
        </div>
      </div>
      <button 
        className='addScheduleBtn'
        onClick={handleAddEvent}
      >
        <span>일정 등록하기</span>
      </button>
      <AddEventModal
        isOpen={isAddModalOpen}
        closeModal={() => setIsAddModalOpen(false)}
        handleAddEvent={handleAddEvent}
      />
      </div>
      
      
      <div className='calendarWrap'>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView='dayGridMonth'
          height={636}
          events={filteredEvents}
          headerToolbar={headerToolbarOptions}
          eventClick={handleEventClick}
        />
      </div>
      {/* 이전 코드 생략 */}
      {isModalOpen && selectedEvent && (
        <EventModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          eventInfo={selectedEvent}
        />
      )}
    </div>
  );
};

export default MainCalendar;