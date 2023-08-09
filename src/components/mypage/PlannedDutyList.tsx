import { works } from '@/types/MypageTypes'
import styles from './PlannedDutyList.module.scss'

// DutyList에서 사용할 props 타입 정의
interface MyDutyProps {
  dutyData: works[]
  selectedYear: number
  selectedMonth: number
}

// 예정된 당직 일정을 출력할 PlannedDutyList component
const PlannedDutyList: React.FC<MyDutyProps> = ({ dutyData, selectedYear, selectedMonth }) => {
  // MonthRange에서 선택한 년도와 월에 해당하는 당직 데이터 Filtering
  const filteredDutyData = dutyData.filter((duty) => {
    const dutyDate = new Date(duty.date)
    return dutyDate.getFullYear() === selectedYear && dutyDate.getMonth() + 1 === selectedMonth
  })

  // 근무 날짜가 최신일수록 상단으로 오도록 최신 순 정렬
  const sortedByDate = filteredDutyData.sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateB.getTime() - dateA.getTime()
  })

  return (
    <section className={styles.list__container}>
      <h2>예정된 당직 일정</h2>
      <div className={styles.list__body}>
        {sortedByDate.length === 0 ? (
          <p className={styles.list__none}>해당 기간에 예정된 당직 일정이 없습니다. 관리자에게 문의하세요.</p>
        ) : (
          <ul>
            {sortedByDate.map((duty) => (
              <li key={duty.dutyId} className={styles.list__item}>
                <span>{duty.date}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export default PlannedDutyList
