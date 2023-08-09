import { NavLink } from 'react-router-dom'
import styles from './MenuTab.module.scss'

// MenuTab에서 사용할 props 타입 정의
interface MenuTabProps {
  activeTab: 'annual' | 'duty' | 'info'
  handleTabClick: (tab: 'annual' | 'duty' | 'info') => void
}

// MyPage 상단에 출력될 MenuTab Component
const MenuTab: React.FC<MenuTabProps> = ({ activeTab, handleTabClick }) => {
  return (
    <nav className={styles.menu__container}>
      <ul className={styles.menu__tab}>
        <li>
          <NavLink
            to="/mypage/annual"
            onClick={() => handleTabClick('annual')}
            className={`${styles.tab__item} ${activeTab === 'annual' ? styles.tab__active : ''}`}
          >
            연차 조회
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/mypage/duty"
            onClick={() => handleTabClick('duty')}
            className={`${styles.tab__item} ${activeTab === 'duty' ? styles.tab__active : ''}`}
          >
            당직 조회
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/mypage/info"
            onClick={() => handleTabClick('info')}
            className={`${styles.tab__item} ${activeTab === 'info' ? styles.tab__active : ''}`}
          >
            비밀번호 수정
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default MenuTab
