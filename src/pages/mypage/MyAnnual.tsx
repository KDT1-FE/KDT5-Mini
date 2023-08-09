import { useEffect, useState } from 'react'
import { annuals } from '@/types/MypageTypes'
import { getUserAnnualApi, cancelAnnualApi } from '@/api/mypage'
import { getCookie } from '@/utils/cookie'
import RequestedAnnual from '@/components/mypage/RequestedAnnual'
import ApprovedAnnual from '@/components/mypage/ApprovedAnnual'
import MonthRange from '@/components/mypage/MonthRange'
import RemainingAnnual from '@/components/mypage/RemainingAnnual'
import styles from './MyAnnual.module.scss'

// MyAnnual에서 사용할 props 타입 정의
interface MyAnnualProps {
  selectedYear: number
  selectedMonth: number
}

// 연차 조회 탭을 출력하는 MyAnnual component
const MyAnnual: React.FC<MyAnnualProps> = ({ selectedYear: initialYear, selectedMonth: initialMonth }) => {
  // MonthRange에서 선택한 년도와 월을 상태 관리
  const [selectedYear, setSelectedYear] = useState<number>(initialYear)
  const [selectedMonth, setSelectedMonth] = useState<number>(initialMonth)

  // 선택한 년도를 연차 조회 api에 재요청하여 연차 데이터를 상태 관리
  const [fetchedAnnualData, setFetchedAnnualData] = useState<annuals[]>([])

  // MonthRange에서 선택한 년도와 월을 업데이트하는 함수
  const handleMonthChange = (year: number, month: number) => {
    setSelectedYear(year)
    setSelectedMonth(month)
  }

  // 선택한 년도와 월에 해당하는 연차 데이터 Filtering
  const filteredAnnualData = fetchedAnnualData.filter(
    (annual) =>
      new Date(annual.date).getFullYear() === selectedYear && new Date(annual.date).getMonth() + 1 === selectedMonth
  )

  // 연차 리스트에서 취소 버튼 클릭 시 '연차 신청 취소 / 취소 신청' 기능을 수행하는 함수
  const handleCancelClick = async (annualId: number, status: string) => {
    try {
      const token = getCookie('token')
      await cancelAnnualApi(token, annualId)
      const updatedAnnualData = fetchedAnnualData.filter((annual) => annual.annualId !== annualId)
      setFetchedAnnualData(updatedAnnualData)

      if (status === 'UNAPPROVED') {
        alert('연차 신청 취소가 완료되었습니다.')
      } else {
        alert('연차 취소 신청이 완료되었습니다.')
      }
    } catch (error) {
      console.log('연차 취소 오류:', error)
      alert('연차 취소에 실패했습니다.\n관리자에게 문의해주세요.')
    }
  }

  useEffect(() => {
    const fetchAnnualData = async () => {
      try {
        // 선택한 년도가 바뀌면 연차 조회 api에 재요청하여 연차 데이터 가져오기
        const token = getCookie('token')
        const updatedAnnualData = await getUserAnnualApi(token, selectedYear)
        setFetchedAnnualData(updatedAnnualData || [])
      } catch (error) {
        console.log('연차 재조회 오류:', error)
      }
    }
    fetchAnnualData()
  }, [selectedYear])

  return (
    <section className={styles.board__container}>
      <div>
        <MonthRange selectedYear={selectedYear} selectedMonth={selectedMonth} onMonthChange={handleMonthChange} />
        <RemainingAnnual fetchedAnnualData={fetchedAnnualData} />
      </div>
      <RequestedAnnual filteredAnnualData={filteredAnnualData} onCancelClick={handleCancelClick} />
      <div style={{ height: '30px' }} />
      <ApprovedAnnual filteredAnnualData={filteredAnnualData} onCancelClick={handleCancelClick} />
    </section>
  )
}

export default MyAnnual
