import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import style from './AdminDuty.module.scss'
import { useState, useEffect, useRef } from 'react'
import { workInfo, DateClickInfo } from '@/types/MainTypes'
import AdminWork from '@/components/adminwork/AdminWork'
import { getWorkApi } from '@/api/main'
import { getUserListApi, deleteWorkApi } from '@/api/admin'
import { userListData } from '@/types/AdminTypes'
import { getCookie } from '@/utils/cookie'
import { FaTrash } from 'react-icons/fa'

interface EventObject {
  workId: number
  title: string
  date: string
  isAnnual: boolean
  backgroundColor?: string
  borderColor?: string
}

const AdminDuty = () => {
  const date = new Date()
  const initialYear = date.getFullYear()
  const initialMonth = date.getMonth() + 1
  const [currentEvents, setCurrentEvents] = useState<EventObject[]>([])
  // 캘린더 이전, 다음달 변경 시 년/월 정보
  const [year, setYear] = useState(initialYear)
  const [month, setMonth] = useState(initialMonth)
  // 캘린더 정보
  const calendarRef = useRef<FullCalendar>(null)
  // 캘린더 헤더 툴바 버튼
  const [selectText] = useState<string>('전체 연차/당직')
  // 당직 신청 팝업 열기
  const [showAdminWork, setShowAdminWork] = useState(false)
  const [dateClickInfo, setDateClickInfo] = useState<DateClickInfo | null>(null)
  // 사원 정보
  const [data] = useState<workInfo>({
    workId: 0,
    name: '',
    employeeNumber: '',
    date: ''
  })
  const [employees, setEmployees] = useState<userListData>([])
  const [workAssigned, setWorkAssigned] = useState(false)

  // 당직 등록시 렌더링
  useEffect(() => {
    fetchData()
  }, [workAssigned])

  // 사원 전체 목록 조회
  useEffect(() => {
    async function fetchData() {
      const token = getCookie('token')
      const userList = await getUserListApi(token)
      if (userList) {
        setEmployees(userList.data)
      } 
    }

    fetchData()
  }, [])

  // 지정된 날짜에 따라 이벤트 가져오기
  useEffect(() => {
    if (selectText === '전체 연차/당직') {
      fetchData()
    } else {
      fetchData().then(() => {
        const filteredEvents = currentEvents.filter((event) =>
          event.title.includes(`${data.name}${data.employeeNumber.slice(0, 5)}`)
        )
        setCurrentEvents(filteredEvents)
      })
    }
  }, [selectText, year, month])

  // 당직 목록 가져오기
const fetchData = async () => {
  const workData = await getWorkApi(year, month);

  if (workData) {
    const workEvents: EventObject[] = [];

    workData.forEach((item: any) => {
      const truncatedName = item.name.length > 7 ? item.name.slice(0, 7) : item.name; 
      workEvents.push({
        workId: item.workId,
        title: truncatedName + item.employeeNumber.slice(0, 5),
        date: item.date,
        isAnnual: false,
        backgroundColor: "#795c34",
        borderColor: "#795c34",
      });
    });
    setCurrentEvents([...workEvents]);
  }
};


  // 달력 클릭시 모달창
  const handleDateClick = (info: DateClickInfo) => {
    const current = new Date();
    const currentDate = new Date(current.getFullYear(), current.getMonth(), current.getDate());
    const selectedDate = new Date(info.date.getFullYear(), info.date.getMonth(), info.date.getDate());
  
    if (currentDate > selectedDate) {
      alert('오늘 이전 날짜는 선택할 수 없습니다.');
      return;
    }
    setShowAdminWork(true);
    setDateClickInfo(info);
  }
  

  // 당직 삭제
  const handleEventClick = async (info: any) => {
    const { workId } = info.event.extendedProps

    if (window.confirm('당직을 삭제하시겠습니까?')) {
      const token = getCookie('token')
      await deleteWorkApi(token, workId)
      fetchData()
    }
  }

  // 달력에 정보 표시
  const renderEventContent = (eventInfo: any) => {
    const { isAnnual } = eventInfo.event.extendedProps

    return (
      <div style={{ display: 'flex', padding: '3px' }}>
        <span style={{ paddingTop: '2px' }}>{eventInfo.event.title}</span>
        {!isAnnual && <FaTrash style={{ marginLeft: 'auto', cursor: 'pointer' }} />}
      </div>
    )
  }

  return (
    <div className={style.container}>
      {/* 달력 */}
      <div className={style.calendarWrapper}>
        <FullCalendar
          ref={calendarRef}
          initialView="dayGridMonth"
          plugins={[dayGridPlugin, interactionPlugin]}
          headerToolbar={{
            start: '',
            center: 'title',
            end: 'prev next'
          }}
          editable={false}
          selectable={true}
          dateClick={handleDateClick}
          dragScroll={false}
          events={currentEvents}
          eventDurationEditable={false}
          locale="ko"
          customButtons={{
            prev: {
              icon: 'chevron-left',
              click: () => {
                if (calendarRef.current?.getApi()) {
                  calendarRef.current.getApi().prev()
                  const calendarMonth: string = calendarRef.current.getApi().view.title
                  setYear(Number(calendarMonth.split('년')[0]))
                  setMonth(Number(calendarMonth.split('년')[1].split('월')[0]))
                }
              }
            },
            next: {
              icon: 'chevron-right',
              click: () => {
                if (calendarRef.current?.getApi()) {
                  calendarRef.current.getApi().next()
                  const calendarMonth: string = calendarRef.current.getApi().view.title
                  setYear(Number(calendarMonth.split('년')[0]))
                  setMonth(Number(calendarMonth.split('년')[1].split('월')[0]))
                }
              }
            }
          }}
          eventOrder={(a: any, b: any) => {
            if (a.extendedProps.isAnnual && !b.extendedProps.isAnnual) {
              return -1
            } else if (!a.extendedProps?.isAnnual && b.extendedProps.isAnnual) {
              return 1
            } else {
              return 0
            }
          }}
          height="inherit"
          dayMaxEvents={true}
          eventClick={handleEventClick}
          eventContent={renderEventContent}
        />
        {/* 클릭시 나오는 모달창 */}
        {showAdminWork && (
          <AdminWork
            dateInfo={dateClickInfo as DateClickInfo}
            employees={employees}
            setShowAdminWork={setShowAdminWork}
            onWorkAssigned={() => setWorkAssigned(!workAssigned)}
          />
        )}
      </div>
    </div>
  )
}

export default AdminDuty
