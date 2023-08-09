import { useState } from 'react'
import { annuals, works } from '@/types/MypageTypes'
import MyAnnual from '@/pages/mypage/MyAnnual'
import MyDuty from '@/pages/mypage/MyDuty'
import MyInfo from '@/pages/mypage/MyInfo'
import MenuTab from '@/components/mypage/MenuTab'
import styles from './MyPage.module.scss'

// MyPage Component
const MyPage: React.FC = () => {
  // MyPage 상단의 MenuTab 전환으로 메뉴 이동
  // 마이 페이지 렌더링 시 '연차 조회'탭이 default로 활성화됨
  const [activeTab, setActiveTab] = useState<'annual' | 'duty' | 'info'>('annual')

  // 연차 관련 데이터 저장
  const [annualData] = useState<annuals[]>([])

  // 당직 관련 데이터 저장
  const [dutyData] = useState<works[]>([])

  // MenuTab 클릭 시 Tab 전환
  const handleTabClick = (tab: 'annual' | 'duty' | 'info') => {
    setActiveTab(tab)
  }

  // MyAnnual 컴포넌트에 props로 보내기 위한 선택 년도, 선택 월
  const currentDate = new Date()
  const selectedYear = currentDate.getFullYear()
  const selectedMonth = currentDate.getMonth() + 1

  return (
    <div className={styles.container}>
      {/* 활성화된 Tab에 따라 해당 컴포넌트 렌더링 */}
      <MenuTab activeTab={activeTab} handleTabClick={handleTabClick} />
      {activeTab === 'annual' && annualData && <MyAnnual selectedYear={selectedYear} selectedMonth={selectedMonth} />}
      {activeTab === 'duty' && dutyData && <MyDuty />}
      {activeTab === 'info' && <MyInfo />}
    </div>
  )
}

export default MyPage
