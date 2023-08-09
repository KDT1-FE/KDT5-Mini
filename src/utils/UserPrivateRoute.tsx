import { Outlet, Navigate } from 'react-router-dom'
import { getCookie } from '@/utils/cookie'

export const UserPrivateRoute = () => {
  const token = getCookie('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  if (token && user.role) {
    // 일반 유저
    return <Outlet />
  }
  alert('로그인이 필요합니다.')
  return <Navigate to="/login" />
}
