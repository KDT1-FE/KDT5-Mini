import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './MainCalendar.scss';
import AddEventModal from './AddEventModal';
import EventModal from './EventModal';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
// import { Cookies } from "react-cookie";
import { Cookies } from "react-cookie";
const cookie = new Cookies;
const coo = cookie.get('accessToken')
export const ApiHttp = axios.create({
  baseURL: "/mini",
  headers:{
    Authorization: `Bearer ${coo}`
  }
});
console.log(coo);
const MainCalendar = () => {
  const [selectedCategories, setSelectedCategories] = useState(['연차', '당직']);
  const [view, setView] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [userInfoVisible, setUserInfoVisible] = useState(false);
  const navigate = useNavigate();
  const [events, setEvents] = useState([]); // 빈 배열로 초기화
  // const cookie = new Cookies();
  // const RF_TOKEN = cookie.get("RF_TOKEN");
  // // API 요청을 보낼 때 "Authorization" 헤더에 토큰을 넣어주세요. RF_Token을 보내고 잇습니다
  // axios.defaults.headers.common["Authorization"] = `Bearer ${RF_TOKEN}`;
  const toggleUserInfo = () => {
    setUserInfoVisible(!userInfoVisible);
  };
  const handleMyPageClick = () => {
    // 마이페이지 버튼을 클릭한 후에 이동할 경로를 지정
    navigate('/mypage');
  };
  useEffect(() => {
    // API 호출
    ApiHttp
      .get("/api/main")
      .then((response) => {
        // API에서 받아온 데이터를 state에 설정
        console.log(response);
        setEvents(response.data);
        console.log("Fetched events:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행
  // 당직, 연차 값을 조건에 따라 색상 변경
  const processedEvents = events.map((event) => {
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
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayOfWeek = daysOfWeek[today.getDay()]; // 요일 (0 ~ 6)
  const formattedDate = `${year}. ${month}. ${day}. ${dayOfWeek}`;
    // headerToolbar 커스터마이즈
    const headerToolbarOptions = {
      left: 'prev',
      center: 'title',
      right: 'next',
    };
    const handleEventClick = (eventInfo) => {
      const { reason, title, start, end, category } = eventInfo.event;
      console.log('Clicked event - Reason:', reason);
      console.log('Clicked event - Title:', title);
      console.log('Clicked event - Start:', start);
      console.log('Clicked event - End:', end);
      console.log('Clicked event - Category:', category);
    };
    function handleAddEvent(newEvent: NewEvent): void {
      // Send the new event data to the server
      axios.post('https://miniproject-team9.p-e.kr/api/annual', newEvent)
        .then(response => {
          console.log('Event successfully submitted:', response.data);
          // 서버로부터의 응답을 처리할 수 있음
          // 새 이벤트가 등록되었다는 알림을 사용자에게 표시하거나
          // 새로운 이벤트를 state에 추가하는 등의 작업을 수행할 수 있습니다.
        })
        .catch(error => {
          console.error('Error submitting event:', error);
          // 에러 처리를 위한 로직 추가
        });
      // Close the modal
      setIsAddModalOpen(false);
    }
  return (
    <div className='mainWrap'>
      <div className='selectWrap'>
      <ul className={`UserInfo ${userInfoVisible ? 'active' : ''}`}
        onClick={toggleUserInfo}>
        반가워요, <span className='UserNameInfo'>테스트{userName}</span>님!
        <div className={`HideInfo ${userInfoVisible ? 'visible' : ''}`}>
          <li onClick={handleMyPageClick}>마이 페이지</li>
          <li>로그아웃</li>
        </div>
      </ul>
      <div className='Today'>     {/* 오늘 날짜 렌더링 */}
        <h1>Today</h1>
        <span>{formattedDate}</span>
      </div>
      <div className='SelectCanlendar'>      {/* 일정 선택 박스 */}
        <h1>Calendar</h1>
        <div className='SelectSchedule'>
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
        <div className="SelectCategories">
          <h1>Categories</h1>
          <div>
            <label>
              {" "}
              {/* 연차 카테고리 선택 박스   */}
              <input
                type="checkbox"
                checked={selectedCategories.includes("연차")}
                onChange={() => handleCategoryChange("연차")}
              />
              연차
              <span className="LeaveBox">{selectedAnnualLeave}</span>
              {/* 연차 리스트 카운트 */}
            </label>
          </div>
          <div>
            <label>
              {" "}
              {/* 당직 카테고리 선택 박스   */}
              <input
                type="checkbox"
                checked={selectedCategories.includes("당직")}
                onChange={() => handleCategoryChange("당직")}
              />
              당직
              <span className="dutyBox">{selectedDuty}</span>
              {/* 당직 리스트 카운트 */}
            </label>
          </div>
        </div>
        <button
          className="addScheduleBtn"
          onClick={() => setIsAddModalOpen(true)}
        >
          <span>일정 등록하기</span>
        </button>
        <AddEventModal
          isOpen={isAddModalOpen}
          closeModal={() => setIsAddModalOpen(false)}
          handleAddEvent={handleAddEvent}
        />
      </div>
      <button
      className='addScheduleBtn'
      onClick={() => setIsAddModalOpen(true)}
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
      />    {/* 캘린더 렌더링 */}
      </div>
    </div>
  );
};
export default MainCalendar;