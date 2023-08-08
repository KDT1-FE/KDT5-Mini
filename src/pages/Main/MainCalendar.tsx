import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./MainCalendar.scss";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import EventModal from "./EventModal";
import { getNewAccessToken, getMyPage, ApiHttp } from "@/Api/apis";
import AddEventModal from "./AddEventModal";


const MainCalendar = () => {
  const [selectedCategories, setSelectedCategories] = useState([
    "연차",
    "당직",
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [events, setEvents] = useState([]); // 빈 배열로 초기화
  const [userInfoVisible, setUserInfoVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();
  const [userName, setUserName] = useState(""); // 사용자 이름 상태

  useEffect(() => {
    // API 호출
    const getMainInfo = getMyPage();
    getMainInfo
      .then((res) => {
        console.log("getMainInfo.then(res): ", res);
        const processedEvents = res.annualHistories.map((event: any) => {
          const { startDate, endDate, ...rest } = event;
          return {
            ...rest,
            start: startDate,
            end: endDate,
            color: event.category === "연차" ? "#FEEFEC" : "#EEF6F1",
            textColor: event.category === "연차" ? "#EA613C" : "#3ACAB9",
            title: `• ${event.name}`,
            category: event.category,
            reason: event.reason,
          };
        });
        setEvents(processedEvents);
        setUserName(res.name);
        console.log(res.name); // 사용자 이름 설정
      })
      .catch((error) => {
    if (error.response && error.response.status === 401) {
      const newAccessToken = getNewAccessToken();
      new Cookies().set("accessToken", newAccessToken, { path: "/" });
      // 새로운 accessToken으로 재시도
      const config = error.config;
      config.headers.Authorization = newAccessToken;
      ApiHttp.get(config.url, config)
        .then((res) => {
          if (res.data) { // API 응답 데이터가 있는지 확인
            const processedEvents = res.data.map((event: any) => {
              // ...
            });
            setEvents(processedEvents);
          }
        })
        .catch((error) => {
          console.error("Error while retrying API call:", error);
        });
    } else {
      console.error("API call error:", error);
    }
  });
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  // 당직, 연차 값을 조건에 따라 색상 변경
  const toggleUserInfo = () => {
    setUserInfoVisible(!userInfoVisible);
  };
  const handleMyPageClick = () => {
    // 마이페이지 버튼을 클릭한 후에 이동할 경로를 지정
    navigate("/mypage");
  };
  // const processedEvents = events.map((event: any) => {
  //   const { startDate, endDate, ...rest } = event;
  //   return {
  //     ...rest,
  //     start: startDate,
  //     end: endDate,
  //     color: event.category === "연차" ? "#FEEFEC" : "#EEF6F1",
  //     textColor: event.category === "연차" ? "#EA613C" : "#3ACAB9",
  //     title: `• ${event.name}`,
  //     category: event.category,
  //     reason: event.reason,
  //   };
  // });

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
    ? events
    : events.filter((event: { category: string }) =>
        selectedCategories.includes(event.category),
      );
  // 연차 리스트 개수
  const selectedAnnualLeave = events.filter(
    (event: any) => event.category === "연차",
  ).length;
  // 당직 리스트 개수
  const selectedDuty = events.filter(
    (event: any) => event.category === "당직",
  ).length;
  // 유저 이름 표시

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

  const handleEventClick = (eventInfo: any) => {
    setSelectedEvent(eventInfo.event); // 수정된 부분
  };
  // function handleAddEvent(newEvent: NewEvent): void {
  // // Send the new event data to the server
  //   axios
  //     .post("/api/annual", newEvent)
  //     .then((response) => {
  //       console.log("Event successfully submitted:", response.data);
  //       // 서버로부터의 응답을 처리할 수 있음
  //       // 새 이벤트가 등록되었다는 알림을 사용자에게 표시하거나
  //       // 새로운 이벤트를 state에 추가하는 등의 작업을 수행할 수 있습니다.
  //     })
  //     .catch((error) => {
  //       console.error("Error submitting event:", error);
  //       // 에러 처리를 위한 로직 추가
  //     });
  //   // Close the modal
  //   setIsAddModalOpen(false);
  // }

  return (
    <div className="main_wrap">
      <div className="select_wrap">
        <ul
          className={`UserInfo ${userInfoVisible ? "active" : ""}`}
          onClick={toggleUserInfo}
        >
          반가워요,
          <span className="UserNameInfo">{userName}</span>님!
          <div className={`HideInfo ${userInfoVisible ? "visible" : ""}`}>
            <li onClick={handleMyPageClick}>마이 페이지</li>
            <li>로그아웃</li>
          </div>
        </ul>
        <div className="select_today">
          {" "}
          {/* 오늘 날짜 렌더링 */}
          <h1 className="sub_title">Today</h1>
          <span className="today_weather">{formattedDate}</span>
        </div>
        <div className="select_calendar">
          {" "}
          {/* 일정 선택 박스 */}
          <h1 className="sub_title">Calendar</h1>
          <div className="select_calendar_options">
            <label className="select_calendar_option">
              <input type="checkbox" className="input_checkbox" />
              전체 일정
            </label>
            <label className="select_calendar_option">
              <input type="checkbox" className="input_checkbox" />내 일정
            </label>
          </div>
        </div>
        <div className="select_categories">
          <h1 className="sub_title">Categories</h1>
          <div className="select_category_options">
            <label className="select_category_option">
              {" "}
              {/* 연차 카테고리 선택 박스   */}
              <input
                type="checkbox"
                className="input_checkbox"
                checked={selectedCategories.includes("연차")}
                onChange={() => handleCategoryChange("연차")}
              />
              연차
              <span className="LeaveBox">{selectedAnnualLeave}</span>
              {/* 연차 리스트 카운트 */}
            </label>
            <label className="select_category_option">
              {" "}
              {/* 당직 카테고리 선택 박스   */}
              <input
                type="checkbox"
                className="input_checkbox"
                checked={selectedCategories.includes("당직")}
                onChange={() => handleCategoryChange("당직")}
              />
              당직
              <span className="dutyBox">{selectedDuty}</span>
              {/* 당직 리스트 카운트 */}
            </label>
          </div>
        </div>
      </div>
      <div className="calendar_wrap">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          height={760}
          events={filteredEvents}
          headerToolbar={headerToolbarOptions}
          eventClick={handleEventClick}
        />
        {selectedEvent && (
          <EventModal
            isOpen={true} // 여기서 모달을 열려면 true로 설정하거나, 필요한 조건에 따라서 설정해주어야 합니다.
            closeModal={() => setSelectedEvent(null)} // 모달 닫기 함수
            event={selectedEvent} // 이벤트 정보 전달
          />
        )}
      </div>
    </div>
  );
};
export default MainCalendar;
