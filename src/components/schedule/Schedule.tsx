import styled from 'styled-components'
import FullCalendar from "@fullcalendar/react"; 
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from '@fullcalendar/interaction'; 
import { useEffect, useState, useRef } from 'react';
import { MyAnnualList, MyDutyList } from 'api/index';
import { getMyTitleWithStatus} from '../custom/index';

export const Schedule =  () => {

  const [CalDate, setCalDate] = useState<number>(2023);
  const calendarRef = useRef<FullCalendar | null>(null);
  const [viewDrow, setViewDrow] = useState([{
    title:""
    ,start: ""
    ,end: ""
    ,status:""
    ,type : ""
  }]);

  useEffect(() => {
    MyAnnualList(CalDate.toString())
      .then((data) => {
        const returnDatalist = data.data.response;
        const modifiedReturnDatalist = returnDatalist.map((item) => ({
          title: getMyTitleWithStatus(item),
          start: new Date(item.startDate).toISOString(),
          end: new Date(item.endDate).toISOString(),
          type: "ANNUAL"
        }));
        console.log(data)
        setViewDrow(modifiedReturnDatalist);
        return MyDutyList(CalDate.toString()); // MyDutyList 호출을 return 합니다.
      })
      .then((data) => {
        const returnDatalist = data.data.response;
        const modifiedReturnDatalist = returnDatalist.map(item => ({
          ...item,
          title: getMyTitleWithStatus(item),
          date: new Date(item.dutyDate),
          type: "DUTY"
        }));
        setViewDrow(prevViewDrow => [...prevViewDrow ,...modifiedReturnDatalist]); // 이전의 viewDrow state를 활용하여 업데이트합니다.
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  
  },[CalDate]);

  const eventContent = ({ event }) => {
    
    return ( 
      <CustomEvent title={event._def.extendedProps.type}>
        {event.title}
      </CustomEvent>
    );
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

  return(
    <Outermost>
      <Rectangle>
      <BarBox>
        <ScheduleBarone><p>연차</p></ScheduleBarone>
        <ScheduleBartwo><p>당직</p></ScheduleBartwo>
      </BarBox>
      <CalendarContainer>
      <CalendarBox>  
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView='dayGridMonth'
          events={viewDrow as unknown as EventInit[]}
          timeZone="Asia/Seoul"
          eventContent={eventContent}
          datesSet={handleDatesSet}
          ref={calendarRef}
          dayMaxEvents= {true}
          locale={"ko"} 
        />
      </CalendarBox>
      </CalendarContainer>
      </Rectangle>
    </Outermost>
  )
}

const Rectangle = styled.div`
  width: 1060px;
  height: 600px;
  border-radius: 10px;
  margin: 24px 0;
`
const CalendarContainer = styled.div`
  width: 100%;
  padding-bottom: 40px;
  background-color: #ffff;
  position: relative;
  margin: auto;
  top: 10px;
  border: 2px solid #696ea6;
  box-shadow: #50515985 1px 2px 7px 1px;
  border-radius: 10px;
`
const BarBox = styled.div`
  width: 210px;
  position: relative;
  margin-left: 800px;
  margin-top: 12px;
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
const CalendarBox = styled.div`
  width: 90%;
  position: relative;
  margin: 0 auto;
  height: 80%;
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
    color: #0815a6;
    max-width: 30%;
    left: 40%;
    top: 20px;
  }

  .fc-event-title fc-sticky {
    padding: 2px;
  }

  .fc .fc-button-primary {
    border: none;
    background-color:#1C3879;
    position: relative;
    top: 15px;
    margin-right: 18px;
  }

  .fc-button-group {
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
    color: #0815a6;
    margin-right: 15px;
  }

  .fc-col-header-cell-cushion {
    color: #0815a6;
    width: 90%;
    height: 50px;
    font-size: 18px;
    padding: 10px;
    font-weight: bold;
  }

  table .fc-scrollgrid-sync-table {
    width: 538px;
    height: 700px;
  }

  /* border값 초기화 */
  .fc-theme-standard th,.fc-theme-standard td {
    border: 0px;
  }

  .fc .fc-daygrid-day-top {
    position: relative;
    right: 60px;
  }
  
 
  .fc-event-time {
    display: none;
  }
`

const CustomEvent = styled.div`
  border: none;
  font-size: 15px;
  overflow: hidden;
  width: 100%;
  height: 20px;
  padding: 4px;
  margin-top: 2px;
  margin: auto;
  border-radius: 3px;
  color:#ffff;
  border: none;
  background-color: ${({ title}) => ( title === 'ANNUAL' ? '#4a42e4d4' : '#8696FE')};
`;


const Outermost = styled.div`
  display: flex;
  flex-direction: column;
`

