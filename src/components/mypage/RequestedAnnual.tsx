import { useEffect, useState } from 'react'
import { annuals } from '@/types/MypageTypes'
import styles from './RequestedAnnual.module.scss'

// RequestedAnnual에서 사용할 props 타입 정의
interface RequestedAnnualProps {
  filteredAnnualData: annuals[]
  onCancelClick: (annualId: number, status: string) => void
}

// 신청한 연차 목록을 출력할 RequestedAnnual component
const RequestedAnnual: React.FC<RequestedAnnualProps> = ({ filteredAnnualData, onCancelClick }) => {
  // 신청한 연차 목록 상태 관리
  const [, setAnnualList] = useState<annuals[]>([])

  // 오늘 날짜 확인
  const currentDate = new Date()

  // 메인 캘린더에서 신청한 연차 중 아직 승인되지 않은 연차 목록 Filtering
  const requestedAnnualData = filteredAnnualData.filter((annual) => annual.status === 'UNAPPROVED')

  // 최근 신청한 내용이 상단으로 오도록 최신 순 정렬
  const sortedByDate = requestedAnnualData.sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateB.getTime() - dateA.getTime()
  })

  // 취소 버튼 클릭 시 '신청한 연차 취소' 기능을 수행하는 함수
  const handleCancelClick = async (annualId: number) => {
    const isConfirmed = window.confirm(
      '확인 버튼을 누르면 즉시 신청이 취소됩니다.\n정말 연차 신청을 취소 하시겠습니까?'
    )
    if (isConfirmed) {
      onCancelClick(annualId, 'UNAPPROVED')
    }
  }

  // 선택한 년도와 월에 해당하는 연차 데이터가 변경될 때마다 재렌더링
  useEffect(() => {
    setAnnualList(filteredAnnualData)
  }, [filteredAnnualData])

  return (
    <section className={styles.list__container}>
      <h2>신청한 연차</h2>
      <div className={styles.list__body}>
        <div className={styles.list__headline}>
          <p>신청 날짜</p>
          <p>진행 상태</p>
          <p>신청 취소</p>
        </div>
        {sortedByDate.length === 0 ? (
          <p className={styles.list__none}>해당 기간에 신청한 연차가 없습니다.</p>
        ) : (
          <ul>
            {sortedByDate.map((annual) => {
              // 연차 목록 중 날짜가 지난 경우 신청 취소 불가능(당일까지는 가능)
              // button 스타일링도 disabled 처리
              const itemDate = new Date(annual.date)
              const isPastDate = itemDate <= currentDate

              return (
                <li key={annual.annualId} className={styles.list__item}>
                  <span>{annual.date}</span>
                  <span>{annual.status === 'UNAPPROVED' ? '승인 처리 중' : ''}</span>
                  <button
                    disabled={isPastDate}
                    title={isPastDate ? '날짜가 지난 경우 취소할 수 없습니다.' : ''}
                    onClick={() => handleCancelClick(annual.annualId)}
                  >
                    취소
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </section>
  )
}

export default RequestedAnnual
