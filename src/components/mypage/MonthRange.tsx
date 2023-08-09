import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import styles from './MonthRange.module.scss'

// MonthRange에서 사용할 props 타입 정의
interface MonthRangeProps {
  selectedYear: number
  selectedMonth: number
  onMonthChange: (year: number, month: number) => void
}

// 연차 및 당직 리스트에서 년도와 월을 선택하여 조회할 수 있는 MonthRange component
const MonthRange: React.FC<MonthRangeProps> = ({ selectedYear, selectedMonth, onMonthChange }) => {
  const handleYearChange = (year: number, month: number, direction: 'prev' | 'next') => {
    // HiChevronLeft Icon을 클릭 시 년도와 월을 알맞게 변경
    if (direction === 'prev') {
      if (month === 1) {
        onMonthChange(year - 1, 12)
      } else {
        onMonthChange(year, month - 1)
      }
    } else {
      // HiChevronRight Icon을 클릭 시 년도와 월을 알맞게 변경
      if (month === 12) {
        onMonthChange(year + 1, 1)
      } else {
        onMonthChange(year, month + 1)
      }
    }
  }

  // HiChevronLeft Icon을 클릭 시 수행되는 함수
  const handlePrevMonthClick = () => {
    handleYearChange(selectedYear, selectedMonth, 'prev')
  }

  // HiChevronRight Icon을 클릭 시 수행되는 함수
  const handleNextMonthClick = () => {
    handleYearChange(selectedYear, selectedMonth, 'next')
  }

  return (
    <div className={styles.range__container}>
      <HiChevronLeft onClick={handlePrevMonthClick} className={styles.button__left} />
      <p>{`${selectedYear}년 ${selectedMonth}월`}</p>
      <HiChevronRight onClick={handleNextMonthClick} className={styles.button__right} />
    </div>
  )
}

export default MonthRange
