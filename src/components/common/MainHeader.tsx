import style from './MainHeader.module.scss'
import { useEffect, useState } from 'react'
import { User } from '@/types/AccessTypes'
import { useLocation, useNavigate } from 'react-router-dom'
import { AiFillGithub } from 'react-icons/ai'
import { BsFillCalendarWeekFill, BsPersonBadgeFill } from 'react-icons/bs'
import { RiLogoutBoxFill } from 'react-icons/ri'
import handleLogout from '@/utils/handleLogout'

const MainHeader = () => {
  const [user, setUser] = useState<User>({
    email: '',
    name: '',
    employeeNumber: '',
    role: 'ROLE_USER'
  })
  const location = useLocation()
  const navigate = useNavigate()

  //랜딩 시 유저 정보를 가져옵니다.
  useEffect(() => {
    getUserInfo()
  }, [])
  // 유저정보 가져오기
  const getUserInfo = () => {
    setUser(JSON.parse(localStorage.getItem('user') || '{}'))
  }

  const handleLink = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.currentTarget as HTMLElement
    if (target.innerText === '전체 일정 보기') {
      navigate('/')
    } else if (target.innerText === '마이페이지') {
      navigate('/mypage')
    } else {
      navigate('/')
    }
  }

  return (
    <div className={style.container}>
      <div className={style.contents}>
        <div className={style.userInfo}>
          <div className={style.iconWrapper}>
            <img className={style.icon} src="/free-icon-employee-3043585.png" alt="" />
          </div>
          <div className={style.userWrapper}>
            <div className={style.user}>{`${user.name}${user.employeeNumber}`}</div>
            <span className={style.role}>{user.role === 'ROLE_USER' ? '유저' : '관리자'}</span>
          </div>
        </div>
        <div className={style.nav}>
          <div className={`${style.navItem} ${location.pathname === '/' ? style.active : ''}`} onClick={handleLink}>
            <BsFillCalendarWeekFill size="20" />
            <span style={{ marginLeft: '10px' }}>전체 일정 보기</span>
          </div>
          <div
            className={`${style.navItem} ${location.pathname.includes('/mypage') ? style.active : ''}`}
            onClick={handleLink}
          >
            <BsPersonBadgeFill size="20" />
            <span style={{ marginLeft: '10px' }}>마이페이지 </span>
          </div>
          <div
            className={`${style.navItem} ${location.pathname === '/logout' ? style.active : ''}`}
            onClick={() => {
              handleLogout('/login', navigate)
            }}
          >
            <RiLogoutBoxFill size="20" />
            <span style={{ marginLeft: '10px' }}>로그아웃</span>
          </div>
        </div>
        <div className={style.footer}>
          <img className={style.img} src="/logo.png" alt="로고" />
          <div className={style.duration}>2023.07.24 ~ 2023.08.10</div>
          <div className={style.copy}>
            <span>© Icon by</span> <br />
            <a href="https://www.flaticon.com/kr/free-icons/" title="직원 아이콘">
              ultimatearm - Flaticon
            </a>
          </div>
          <a className={style.link} href="https://github.com/FAST-Mini-Project" target="_blank">
            GitHub <AiFillGithub size="24" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default MainHeader
