import styled from 'styled-components'
import FullCalendar from "@fullcalendar/react"; 
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from '@fullcalendar/interaction';
import { AnnualModal, DuttyModal} from './index';
import { useEffect, useState, useRef } from 'react';
import { getTitleWithStatus} from '../custom/index';
import { allAnnualList, allDutyList, UserInfoList } from 'api/index';

interface DataItem {
  filter(arg0: (item: any) => any):any;
  title: string;
  start: any;
  end: any;
  type: string;
  username:string;
  date:  any;
}



export const Apply =  () => {
  
  const ApplyTexts = {
    Apply:'연차/당직 신청',
    ApplyAnnual:'연차 신청',
    ApplyDuty:'당직 신청'
  }

  const calendarRef = useRef<FullCalendar | null>(null);
  const [selectedButton, setSelectedButton] = useState('ANNUAL');
  const [selectedModal, setSelectedModal] = useState<'ANNUAL_MODAL' | 'DUTY_MODAL' | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [CalDate, setCalDate] = useState<number>(2023);
  const [username, SetUserName] = useState("");
  const [data, setData] = useState<DataItem[]>([]);
  const [viewDrow, setViewDrow] = useState([{
    email:""
    ,title:""
    ,start: ""
    ,end: ""
    ,username : ""
    , status:""
  }]);

  // 유저 정보 api 
  useEffect(() => {
    searchInfoUser()
  },[]);

  const searchInfoUser = () => {
    UserInfoList()
    .then((data) => {
      const userData = data.data.response;
      SetUserName(userData.username);
    })
  }

  const eventContent = ({ event }) => {
  
    return (
      <CustomEvent title={selectedButton}>
        {event.title}
      </CustomEvent>
    );
  };

  const handleButtonClick = (button: 'ANNUAL' | 'DUTY') => {
    setSelectedButton(button);
  };

  const handleModalClick = (info:any) => {
    let dateSelect = new Date(info.date);
    if (dateSelect.getDay() === 0 || dateSelect.getDay() === 6) {
      alert("토요일 또는 일요일은 선택할 수 없습니다.");
      return;
    }

    dateSelect.setHours(9, 0, 0, 0);
  
    const dupuleData = data.filter((item:DataItem) => {
    console.log(item);

    if(item.type === "ANNUAL"){
      const startDay = item.start;
      const endDay = item.end;
      startDay.setHours(9,0,0,0)
      endDay.setHours(9,0,0,0)
      if (
        dateSelect >= startDay && dateSelect <= endDay
        && item.username === username
      ) {
        return item;
      }
    } else{
      const dutyDate = item.date;
      dutyDate.setHours(9,0,0,0)
      if (
        dateSelect === dutyDate
        && item.username === username
      ) {
        console.log("c");
        return item;
      }
    }
    return
  });

  console.log(dupuleData)
  if (dupuleData.length > 0) {
    alert("이미 해당 날짜에 신청한 연차가 존재합니다.");
    return false;
  }

    const today = new Date();
    today.setHours(0,0,0,0);//시간 분 초 초기화



    if (dateSelect < today ) {
      alert("오늘 날짜 이전은 선택할 수 없습니다.");
      return;
    }
    viewDrow.find((item) => {
      const start = new Date(item.start);
      const end = new Date(item.end);
      if (!start || !end) {
        return false;
      }
      const inRange = dateSelect.getTime() >= start.getTime() && dateSelect.getTime() <= end.getTime();
      return inRange;
    });
    setSelectedModal(selectedButton === 'ANNUAL' ? 'ANNUAL_MODAL' : 'DUTY_MODAL');
    setSelectedDate(dateSelect);
    
    return
  };

  const CloseModal = () => {
    setSelectedModal(null);
  };

  const handleDatesSet = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      const date = calendarApi.getDate();
      const year = date.getFullYear();
      if (year !== CalDate) {
        setCalDate(year);
      }
    }
  };

  const searchData = () => {
    if (calendarRef.current) {
      if (selectedButton === 'ANNUAL') {
        allAnnualList(CalDate.toString())
          .then((data) => {
            const returnDatalist = data.data.response;
            const modifiedReturnDatalist = returnDatalist.map((item) => ({
              title: getTitleWithStatus(item),
              username: item.username,
              start: new Date(item.startDate),
              end: new Date(item.endDate),
              type: "ANNUAL",
            }));
            setViewDrow(modifiedReturnDatalist);
            setData(modifiedReturnDatalist)
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      } else {
        allDutyList(CalDate.toString())
          .then((data) => {
            const returnDatalist = data.data.response;
            const modifiedReturnDatalist = returnDatalist.map((item) => ({
              ...item,
              title: getTitleWithStatus(item),
              username: item.username,
              date: new Date(item.dutyDate),
              type: "DUTY",

            }));
            setViewDrow(modifiedReturnDatalist);
            setData(modifiedReturnDatalist)
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }
    } else {
      console.log('Not Found Year');
    }
  };

  useEffect(() => {
    searchData();
  }, [selectedButton, CalDate]);

  return(
    <ApplyWrapper>
    <ApplyTitle>

    </ApplyTitle>
    <Rectangle>
    <ApplyContainer>
    <BarBox>
      <ScheduleBarone><p>연차</p></ScheduleBarone>
      <ScheduleBartwo><p>당직</p></ScheduleBartwo>
    </BarBox>
      <ButtonContainer>
        <AnnualButton onClick={() => handleButtonClick('ANNUAL')} data-select="ANNUAL">{ApplyTexts.ApplyAnnual}</AnnualButton>
        <DutyButton onClick={() => handleButtonClick('DUTY')} data-select="DUTY">{ApplyTexts.ApplyDuty}</DutyButton>
      </ButtonContainer>

      <CalendarContainer>
        <CalendarBox>  
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            dateClick={(info) => handleModalClick(info)}
            eventContent={eventContent}
            datesSet={handleDatesSet}
            ref={calendarRef}
            timeZone="Asia/Seoul"
            events={viewDrow as unknown as EventInit[]}
            dayMaxEvents= {true}
            locale={"ko"}
          />
        </CalendarBox> 
      </CalendarContainer>
      {selectedModal === 'ANNUAL_MODAL' && (
        <AnnualModal
        close={CloseModal} 
        selectedDate={selectedDate} 
        setSelectedDate={setSelectedDate} 
        searchData={searchData}
        data={data}
        username={username}
       />
      )}
      {selectedModal === 'DUTY_MODAL' && (
        <DuttyModal 
        close={CloseModal} 
        selectedDate={selectedDate} 
        setSelectedDate={setSelectedDate}
        searchData={searchData} 
        data={data}
        username={username}
        />
      )}
    </ApplyContainer>
    </Rectangle>
    </ApplyWrapper>
  )
}

const ApplyWrapper = styled.div`
  width: 1200px;
`

const Rectangle = styled.div`
  width: 1300px;
  padding-bottom: 40px;
  border-radius: 10px;
`
const ApplyTitle = styled.div`
  margin-top: 40px;
  padding-left: 20px;
  color: ${props => props.theme.colors.listTitle};
  font-size: 20px;
  font-weight: 700;
`

const ApplyContainer = styled.div`
  width: 1309px;
  position: relative;
  margin: auto;
  top: 50px;
  padding-bottom: 1000px;
`
const BarBox = styled.div`
  width: 140px;
  margin-left: 700px;
  position: relative;
  margin-bottom: 10px;
`
const ScheduleBarone = styled.div`
  width: 100px;
  height: 15px;
  border-radius: 30px;
  background-color: #4a42e4d4;
  position: relative;

  p {
    width: 50px;
    margin-left: 110px;
  }
`
const ScheduleBartwo = styled(ScheduleBarone)`
  background-color: #8696FE;
  margin-top: 10px;
`

const ButtonContainer = styled.div`
  width: 250px;
  bottom: 50px;
  position: relative;
  display: flex;
  gap: 30px;
  float: right;
  margin-right: 200px;
`
const AnnualButton = styled.button`
  width: 125px;
  background-color: #1a3ba5e2;
  color: #ffff;
  border-radius: 10px;
  padding: 10px;
  font-weight: 800;
  border: none;
  cursor: pointer;
`

const DutyButton = styled(AnnualButton)``

const CalendarContainer = styled.div`
  width: 86%;
  padding-bottom: 40px;
  background-color: #fff;
  position: absolute;
  border: 2px solid #696ea6;
  box-shadow: #50515985 1px 2px 7px 1px;
  border-radius: 10px;
`

const CalendarBox = styled.div`
  width: 1100px;
  position: relative;
  margin: 0 auto;
  top: 20px;
  border-radius: 10px;
  font-family: 'LINESeedKR-Bd';

  .fc-theme-standard .fc-scrollgrid {
    width: 100%;
    border-radius: 10px;
    border: none;
  }
  
  .fc-header-toolbar {
    width: 100%;
    position: relative;
    border-radius: 10px 10px 0px 0px;
    padding-bottom: 10px;
  }

  .fc .fc-toolbar-title {
    position: absolute;
    margin: auto;
    color:#374984;
    max-width: 30%;
    left: 40%;
    top: 20px;
  }

  .fc-event-title fc-sticky{
    padding: 2px;
  }

  .fc-h-event{
    border: none;
    background-color: #fff;
  }

  .fc .fc-button-primary{
    border: none;
    background-color:#1C3879;
    position: relative;
    top: 15px;
    margin-right: 18px;
  }

  .fc-button-group{
    position: absolute;
    border: 0;
    outline: 0;
    width: 5rem;
    left: 10%;
  }

  .fc .fc-daygrid-day-number {
    position: relative;
    right: 20px;
    font-size: 17px;
    font-weight: bold;
    color:#374984;
    margin-right: 10px;
  }

  .fc-col-header-cell-cushion{
    color:#374984;
    width: 90%;
    height: 55px;
    font-size: 18px;
    padding: 10px;
    font-weight: bold;
  }

  /* 요일 행 */
  .fc .fc-scrollgrid-section table {
    height: 11px;
  }

  table .fc-scrollgrid-sync-table {
    width: 538px;
    height: 700px;
  }

/* border값 초기화 */
  .fc-theme-standard th, .fc-theme-standard td {
    border: none;
  }

  .fc .fc-daygrid-day-top {
    position: relative;
    right: 90px;
    top: 10px;
  }

  .fc .fc-daygrid-day-frame {
    height: 120px;
  }

  .fc-event-time{
    display: none;
  }
`
const CustomEvent = styled.div` 
  border: none;
  font-size: 15px;
  margin-top: 10px;
  width: 100%;
  padding: 3px;
  border-radius: 3px;
  color:#ffff;
  background-color: ${({ title}) => ( title === 'ANNUAL' ? '#4a42e4d4' : '#8696FE')};
`;
