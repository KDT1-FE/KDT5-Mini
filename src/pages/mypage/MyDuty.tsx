import { useEffect, useState } from 'react'
import { works } from '@/types/MypageTypes'
import { getUserWorkApi } from '@/api/mypage'
import { getCookie } from '@/utils/cookie'
import PlannedDutyList from '@/components/mypage/PlannedDutyList'
import CompletedDutyList from '@/components/mypage/CompletedDutyList'
import MonthRange from '@/components/mypage/MonthRange'
import styles from './MyDuty.module.scss'

// 당직 조회 탭을 출력하는 MyDuty component
const MyDuty: React.FC = () => {
  // 오늘, 내일 날짜 조회
  const currentDate = new Date()
  const tomorrowDate = new Date(currentDate)

  // MonthRange에서 선택한 년도와 월을 상태 관리
  const [selectedYear, setSelectedYear] = useState<number>(currentDate.getFullYear())
  const [selectedMonth, setSelectedMonth] = useState<number>(currentDate.getMonth() + 1)

  // 선택한 년도와 월을 당직 조회 api에 재요청하여 데이터를 상태 관리
  const [filteredDutyData, setFilteredDutyData] = useState<works[]>([])

  // 선택한 년도와 월을 업데이트하는 함수
  const handleMonthChange = (year: number, month: number) => {
    setSelectedYear(year)
    setSelectedMonth(month)
  }

  // 오늘, 내일 날짜 시작 시간 설정
  // Response Data에 시간 속성이 없기 때문에 시작 시간을 설정하여
  // 컴포넌트 내에서 '예정' or '완료' 유무를 판별함
  currentDate.setHours(0, 0, 0, 0) // 오늘
  tomorrowDate.setDate(tomorrowDate.getDate() + 1) // 내일

  // 예정된 당직 일정, 완료된 당직 일정 분리
  const plannedDuties = filteredDutyData.filter((duty) => {
    // 현재 날짜보다 이후인 경우 '예정된 당직 일정'
    const dutyDate = new Date(duty.date)
    // 오늘 날짜까지는 '예정된 당직 일정'으로 분리
    return dutyDate >= currentDate
  })

  const completedDuties = filteredDutyData.filter((duty) => {
    // 현재 날짜보다 이전인 경우 '완료된 당직 일정'
    const dutyDate = new Date(duty.date)
    return dutyDate < currentDate
  })

  useEffect(() => {
    const fetchDutyData = async () => {
      try {
        // 선택한 년도가 바뀌면 당직 조회 api에 재요청하여 당직 데이터 가져오기
        const token = getCookie('token')
        const reqDutyData = await getUserWorkApi(token, selectedYear, selectedMonth)
        setFilteredDutyData(reqDutyData || [])
      } catch (error) {
        console.log('당직 재조회 오류:', error)
      }
    }
    fetchDutyData()
  }, [selectedYear, selectedMonth])

  return (
    <section className={styles.board__container}>
      <MonthRange selectedYear={selectedYear} selectedMonth={selectedMonth} onMonthChange={handleMonthChange} />
      <PlannedDutyList dutyData={plannedDuties} selectedYear={selectedYear} selectedMonth={selectedMonth} />
      <div style={{ height: '30px' }} />
      <CompletedDutyList dutyData={completedDuties} selectedYear={selectedYear} selectedMonth={selectedMonth} />
    </section>
  )
}

export default MyDuty
