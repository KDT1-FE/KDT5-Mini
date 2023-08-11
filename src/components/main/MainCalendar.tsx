import { useState, useEffect } from 'react'
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
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { HOLIDAYS, VOTEDAY, THANKSGIVING, SUBTITLE, BUDDADAY, NEWYEAR  } from "@/constants/holidays";
import { useRecoilState } from 'recoil';
import { dayOffState } from '@/recoil/main'

export default function Calendar(){

  //현재 달 state에 저장!
  const [currentDate, setCurrentDate] = useState(new Date())
  const currentYear = moment(currentDate).format ('YYYY')
  const currentMonth = moment(currentDate).format('MM')
  const currentDayForm = moment(new Date()).format('YYYY.MM.DD')
  const [dayOffs, setDayOffs] = useRecoilState(dayOffState)

  //버튼 클릭시 월 바뀌는 로직
  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }
  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }

  const dayOffStartDate = dayOffs.map(x => moment(x['startDate']).format('YYYYMMDD'))
  const dayOffEndDate = dayOffs.map(x => moment(x['endDate']).format('YYYYMMDD'))

  const getDateRange = () => {
    const daysInRange = []

    for(let i=0; i<dayOffStartDate.length; i++){
      const start = moment(dayOffStartDate[i])
      const end = moment(dayOffEndDate[i])

      while(start < end){
        start.add(1,'days')
        daysInRange.push(start.format('YYYYMMDD'))
      }
      const filteredDaysInRange = (daysInRange as string[]).filter(date => date !== end.format('YYYYMMDD'));

      return filteredDaysInRange
    }
  }

  const dateRangeArray = getDateRange()

  useEffect(()=>{
    getDateRange()
  },[setDayOffs])

  console.log(dateRangeArray)
  console.log(dayOffStartDate)
  //일주일 표시
  const Weeks = () => {
    const days = []
    const date = ['일','월','화','수','목','금','토']

    //0부터 해당되는 인덱스의 요일을 days에 입력
    for(let i=0; i<7; i++){
      days.push(
        <div className="grow border-r-2 last:border-0 bg-mainGray pl-1.5" key={i}>
          {date[i]}
        </div>
      )
    }
    return(
      <div className="flex">{days}</div>
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
        let holidayForm = moment(day).format('MMDD')
        let lunaDayForm = moment(day).format('YYYYMMDD')
        
        let a = HOLIDAYS.filter(x=> x === holidayForm)
        let b = THANKSGIVING.filter(x=> x === lunaDayForm)
        let c = VOTEDAY.filter(x=> x === lunaDayForm)
        let d = BUDDADAY.filter(x => x === lunaDayForm)
        let e = NEWYEAR.filter(x => x === lunaDayForm)
        let f = SUBTITLE.filter(x => x === lunaDayForm)

        let checkDayOffS = dayOffStartDate.filter(x => x === lunaDayForm)
        let checkDayOffE = dayOffEndDate.filter(x => x === lunaDayForm)
        //let rangeDayOff = (getDateRange() as string[]).filter(x => x === lunaDayForm)
        
        days.push(
          (i === 0 || a.length>0 || b.length>0 || c.length>0 || d.length>0 || e.length>0 || f.length>0 ? 
            <div
              className={`h-[7.5rem] grow border box-border last:border-r-0
              ${today ? `bg-primary text-white` : null}
              hover:bg-primaryHover hover:text-white`}
              key={formattedDate}>
              { checkedMonth === currentMonth ?
                <div className="w-6 h-6 pt-1.5 pl-1.5 text-red-700">
                  {formattedDate}
                </div>
              :
                <div className="w-6 h-6 pt-1.5 pl-1.5 text-mainGray">
                  {formattedDate}
                </div>
              }
            </div>
          :
            <div
              className={`h-[7.5rem] grow border box-border last:border-r-0
              ${today ? `bg-primary text-white` : null}
              hover:bg-primaryHover hover:text-white`}
              key={formattedDate}>
                { checkedMonth === currentMonth ?
                  <div className="w-6 h-6 pt-1.5 pl-1.5">
                    {formattedDate}
                  </div>
                :
                  <div className="w-6 h-6 pt-1.5 pl-1.5 text-mainGray">
                    {formattedDate}
                  </div>
                }
                {checkDayOffS.length > 0 && checkDayOffE.length === 0 ?
                  <div className='w-full h-5 mt-3 bg-blue-500'>
                    
                  </div>
                : null}
                {checkDayOffE.length > 0 && checkDayOffS.length === 0 ?
                  <div className='w-full h-5 mt-3 bg-blue-500'>
                    
                  </div>
                : null}
                {checkDayOffE.length > 0 && checkDayOffS.length > 0?
                  <div className='w-full h-5 mt-3 bg-blue-500'>
                    
                  </div>
                : null}
            </div>
          )
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
      <div className="border">
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
        <div className="flex h-20 text-3xl">
          <ChevronLeftIcon
            className="w-10 h-10 top-0 bottom-0 m-auto cursor-pointer text-primary pl-1.5"
            onClick={prevMonth} />
          <div className="text-center grow top-0 bottom-0 m-auto">{currentYear}.{currentMonth}</div>
          <ChevronRightIcon
            className="w-10 h-10 top-0 bottom-0 m-auto cursor-pointer text-primary pr-1.5"
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