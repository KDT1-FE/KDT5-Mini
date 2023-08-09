import { Outlet } from 'react-router-dom'
import MainHeader from '@/components/common/MainHeader'
import style from './MainLayout.module.scss'

const MainLayout = () => {
  return (
    <div className={style.mainLayout}>
      <MainHeader />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
export default MainLayout
