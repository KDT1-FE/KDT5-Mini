import style from './Main.module.scss'
import CalendarForm from '@/components/main/CalendarForm'
// import { signupApi, loginApi, logoutApi } from '@/api/user'
const Main = () => {
  return (
    <div className={style.main}>
      <div className={style.content}>
        <div className={style.title}>전체 연차/당직 일정</div>
        <CalendarForm />
      </div>
    </div>
  )
}

export default Main
