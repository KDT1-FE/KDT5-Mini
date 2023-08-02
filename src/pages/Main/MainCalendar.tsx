import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./MainCalendar.scss";
import eventData from "../../API/data/user.json";

const MainCalendar = () => {
  const [selectedCategories, setSelectedCategories] = useState([
    "연차",
    "당직",
  ]);
  const [view, setView] = useState(false);
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

    // 기존 이벤트들과 새 이벤트를 합쳐서 events 상태를 업데이트
    setEvents((prevEvents: any) => [...prevEvents, newEvent]);
  };

  return (
    <div className="mainWrap">
      <div className="selectWrap">
        <ul
          className="UserInfo"
          onClick={() => {
            setView(!view);
          }}
        >
          반가워요, {userName} 님!
          {/* 추후에 {loggedInUser.name} 로 변환할 것  */}
          <li>마이페이지</li>
          <li>로그아웃</li>
        </ul>

        <div className="Today">
          {" "}
          {/* 오늘 날짜 렌더링 */}
          <h1>Today</h1>
          <span>{formattedDate}</span>
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
        <button className="addScheduleBtn" onClick={handleAddEvent}>
          <span>일정 등록하기</span>
        </button>
      </div>

      <div className="calendarWrap">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          height={636}
          events={filteredEvents}
          headerToolbar={headerToolbarOptions}
        />{" "}
        {/* 캘린더 렌더링 */}
      </div>
    </div>
  );
};
export default MainCalendar;
