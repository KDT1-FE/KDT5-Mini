import { Route, Routes } from 'react-router-dom'

//loadble
import loadable from '@loadable/component'
//spinner
import { Spin } from 'antd'

import { UserPrivateRoute } from '@/utils/UserPrivateRoute'
import AdminPrivateRouteWrapper from '@/layout/AdminPrivateRouteWrapper'

const MainLayout = loadable(() => import('@/layout/MainLayout'), {
  fallback: (
    <div className="spin">
      <Spin size="large" />
    </div>
  )
})
const Main = loadable(() => import('@/pages/main/Main'), {
  fallback: (
    <div className="spin">
      <Spin size="large" />
    </div>
  )
})
const MyPage = loadable(() => import('@/pages/mypage/Mypage'), {
  fallback: (
    <div className="spin">
      <Spin size="large" />
    </div>
  )
})
const AdminEmployee = loadable(() => import('@/pages/admin/AdminEmployee'), {
  fallback: (
    <div className="spin">
      <Spin size="large" />
    </div>
  )
})
const AdminDuty = loadable(() => import('@/pages/admin/AdminDuty'), {
  fallback: (
    <div className="spin">
      <Spin size="large" />
    </div>
  )
})
const AdminAnnual = loadable(() => import('@/pages/admin/AdminAnnual'), {
  fallback: (
    <div className="spin">
      <Spin size="large" />
    </div>
  )
})
const AdminLayout = loadable(() => import('@/layout/AdminLayout'), {
  fallback: (
    <div className="spin">
      <Spin size="large" />
    </div>
  )
})
const LogIn = loadable(() => import('@/pages/login/LogIn'), {
  fallback: (
    <div className="spin">
      <Spin size="large" />
    </div>
  )
})
const SignUp = loadable(() => import('@/pages/login/SignUp'), {
  fallback: (
    <div className="spin">
      <Spin size="large" style={{ fontSize: '64px' }} />
    </div>
  )
})

function App() {
  return (
    <>
      <Routes>
        {/* 일반 유저 페이지 */}
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<UserPrivateRoute />}>
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<Main />} />
            <Route path="/mypage/*" element={<MyPage />} />
          </Route>
        </Route>
        {/* 관리자 페이지  */}
        <Route element={<AdminPrivateRouteWrapper />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="/admin/employee" element={<AdminEmployee />} />
            <Route path="/admin/duty" element={<AdminDuty />} />
            <Route path="/admin/annual" element={<AdminAnnual />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
