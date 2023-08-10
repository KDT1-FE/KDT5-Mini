/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./MainCalendar.scss";
import AddEventModal from "./AddEventModal";
import { useNavigate } from "react-router-dom";
import EventModal from "./EventModal";
import Logout from "@/Components/Logout/Logout";
import { getMainPage, getSilentAxios, getAccessToken } from "@/Api/apis";

const MainCalendar = () => {
  const [selectedCategories, setSelectedCategories] = useState([
    "연차",
    "당직",
  ]);

  const [events, setEvents] = useState([]); // 빈 배열로 초기화
  const [userInfoVisible, setUserInfoVisible] = useState(false);
  const [isAllEventsChecked, setIsAllEventsChecked] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [processedEvents, setProcessedEvents] = useState([]);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchMainInfo = async () => {
      try {
        const ACCESSTOKEN = getAccessToken();
        const mainInfo = await getMainPage(ACCESSTOKEN ?? "");

        if (mainInfo?.data.annuals && Array.isArray(mainInfo.data.annuals)) {
          const processedEvents = mainInfo.data.annuals.map((annuals: any) => {
            const { startDate, endDate, ...rest } = annuals;
            return {
              ...rest,
              start: startDate,
              end: endDate,
              color: annuals.category === "연차" ? "#FEEFEC" : "#EEF6F1",
              textColor: annuals.category === "연차" ? "#EA613C" : "#3ACAB9",
              title: `• ${annuals.name}`,
              detail: annuals.title,
            };
          });

          setEvents(mainInfo.data.annuals);
          setProcessedEvents(processedEvents);
          setUserName(mainInfo.data.username);
          const ROLE = localStorage.getItem("role");
          setRole(ROLE);
        }
      } catch (error) {
        console.error("메인페이지 컴포넌트 에러: ", error);
        const ACCESSTOKEN = getAccessToken();
        const silentAxios = getSilentAxios(ACCESSTOKEN);
        const result = await silentAxios.get("/main");
        return result.data;
      }
    };
    fetchMainInfo();
  }, []);

  // 당직, 연차 값을 조건에 따라 색상 변경
  const toggleUserInfo = () => {
    setUserInfoVisible(!userInfoVisible);
  };

  const handleMyPageClick = () => {
    // 마이페이지 버튼을 클릭한 후에 이동할 경로를 지정
    if (role === "관리자") {
      navigate("/admin");
    } else {
      navigate("/mypage");
    }
  };


  useEffect(() => {
    if (isAllEventsChecked) {
      setSelectedCategories([ "연차", "당직"]);
    } else {
      setSelectedCategories([]);
    }
  }, [isAllEventsChecked]);

  // 카테고리 선택 버튼 클릭 시
  const handleCategoryChange = (category: string) => {
    if (category !== "all") {
      const updatedCategories = selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories, category];
      
      setSelectedCategories(updatedCategories);
      console.log('Selected Categories:', updatedCategories);
    }
  };

  // 선택된 카테고리에 따라 이벤트 필터링
  const filteredEvents = selectedCategories.length === 0
  ? processedEvents // 모든 이벤트를 표시
  : processedEvents.filter((event: { category: string }) =>
      selectedCategories.includes(event.category),
    );

    console.log("selectedCategories:", selectedCategories); // 로그 추가
    console.log("isAllEventsChecked:", isAllEventsChecked); // 로그 추가
    console.log("processedEvents:", processedEvents); // 로그 추가
    console.log("filteredEvents:", filteredEvents); // 로그 추가
    
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

  const handleAllEventsToggle = () => {
    setIsAllEventsChecked(!isAllEventsChecked);
  
    if (!isAllEventsChecked) {
      setSelectedCategories([]);
    }
  };
  console.log(isAllEventsChecked);


  return (
    <div className="main_page">
      <div className="main_wrap">
        <div className="info_wrap">
          <ul className={`UserInfo ${userInfoVisible ? "active" : ""}`}>
            반가워요,
            <span className="UserInfo_name">{userName}</span>님!
            <span className="UserInfo_icon" onClick={toggleUserInfo}>
              <i
                className={
                  userInfoVisible
                    ? "fa-solid fa-chevron-left fa-rotate-90"
                    : "fa-solid fa-chevron-left fa-rotate-270"
                }
              ></i>
            </span>
            <div className={`HideInfo ${userInfoVisible ? "visible" : ""}`}>
              {role === "관리자" ? (
                <li className="admin_page" onClick={handleMyPageClick}>
                  회원 관리 페이지
                </li>
              ) : (
                <li className="my_page" onClick={handleMyPageClick}>
                  마이 페이지
                </li>
              )}
              <Logout />
            </div>
          </ul>
          <div className="select_box">
            <div className="select_today">
              {" "}
              {/* 오늘 날짜 렌더링 */}
              <h1 className="sub_title">Today</h1>
              <span className="today_weather">{formattedDate}</span>
            </div>
            <div className="select_calendar">
              <h1 className="sub_title">Calendar</h1>
              <div className="select_calendar_options">
                <label className="select_calendar_option">
                  <input
                    type="checkbox"
                    className="input_checkbox"
                    checked={isAllEventsChecked}
                    onChange={handleAllEventsToggle}
                  />
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
                  <input
                    type="checkbox"
                    className="input_dayoff_checkbox"
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
                    className="input_duty_checkbox"
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
              className="addSchedule_Btn"
              onClick={() => setIsAddModalOpen(true)}
            >
              <span>일정 등록하기</span>
              <i className="fa-sharp fa-solid fa-circle-plus"></i>
            </button>
          </div>
          <AddEventModal
            isOpen={isAddModalOpen}
            closeModal={() => setIsAddModalOpen(false)}
          />
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
    </div>
  );
};
export default MainCalendar;
