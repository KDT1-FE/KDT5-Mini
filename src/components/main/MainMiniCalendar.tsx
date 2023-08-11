import { useState } from 'react'
import moment from 'moment'
import{
addMonths,
subMonths,
startOfMonth,
endOfMonth,
startOfWeek,
endOfWeek,
addDays
} from 'date-fns'
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/24/solid'

export default function MiniCalendar(){

  //현재 달 state에 저장!
  const [currentDate, setCurrentDate] = useState(new Date())
  const currentYear = moment(currentDate).format ('YYYY')
  const currentMonth = moment(currentDate).format('MM')
  const currentDayForm = moment(new Date()).format('YYYY.MM.DD')

  //버튼 클릭시 월 바뀌는 로직
  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }
  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }

  //일주일 표시
  const Weeks = () => {
    const days = []
    const date = ['일','월','화','수','목','금','토']

    //0부터 해당되는 인덱스의 요일을 days에 입력
    for(let i=0; i<7; i++){
      days.push(
        <div className="grow text-xs text-center" key={i}>
          {date[i]}
        </div>
      )
    }
    return(
      <div className="flex pb-4">{days}</div>
    )
  }

  const RenderDays = () => {
    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(currentDate)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)

    const rows = []
    let days = []
    let day = startDate;
    let formattedDate = ''

    while(day<=endDate){
      for(let i=0; i<7; i++){
        formattedDate = moment(day).format('D')
        let checkedMonth = moment(day).format('MM')
        let today = moment(day).format('YYYY.MM.DD') === currentDayForm
        days.push(
          <div
            className={`h-8 grow text-xs flex justify-center items-center rounded-full leading-6 text-center
            ${today ? `bg-primary text-white` : null}
            hover:bg-primaryHover hover:text-white`}
            key={formattedDate}>
            { checkedMonth === currentMonth ?
              (
                <div className="h-6 w-6">
                  {formattedDate}
                </div>
              )
            :
              (
                <div className="h-6 w-6 text-mainGray">
                {formattedDate}
              </div>
              )
            }

          </div>
        )
        day = addDays(day, 1)
      }
      rows.push(
        <div
          className="flex"
          key={formattedDate}>
          {days}
        </div>
      )
      days = [];
    }

    return (
      <div>
        <div>
          {rows}
        </div>
      </div>
    )
  }

  return(
    <>
      <div>
        {/* 헤더(년.월 형식 + 월 변경 버튼) */}
        <div className="h-9 flex text-3xl pb-4">
          <ArrowLeftCircleIcon
            className="h-7 w-7 top-0 bottom-0 m-auto cursor-pointer text-primary pl-2"
            onClick={prevMonth} />
          <div className="text-center grow top-0 bottom-0 m-auto text-xs">{currentYear}.{currentMonth}</div>
          <ArrowRightCircleIcon
            className="h-7 w-7 top-0 bottom-0 m-auto cursor-pointer text-primary pr-2"
            onClick={nextMonth} />
        </div>
        {/* 요일부분 */}
        <div><Weeks/></div>
        <div>
          <RenderDays/>
        </div>
      </div>
    </>
  )

}