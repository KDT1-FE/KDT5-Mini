import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { adminAuthApi } from '@/api/user'
import { getCookie } from '@/utils/cookie'

const AdminPrivateRouteWrapper = () => {
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const checkAdmin = async () => {
      const token = getCookie('token')
      const user = JSON.parse(localStorage.getItem('user') || '{}')

      if (!token && !user) {
        alert('로그인이 필요합니다.')
        setIsAdmin(false)
      } else {
        await adminAuthApi(token).then((res) => {
          if (res && res.status === 200) {
            alert(res.data.data)
            setIsAdmin(true)
          } else if (res && (res.status === 401 || res.status === 403)) {
            alert(res.data)
            setIsAdmin(false)
          } else {
            alert('관리자 권한이 필요합니다.')
            setIsAdmin(false)
          }
        })
      }
      setLoading(false)
    }
    checkAdmin()
  }, [])

  if (loading) return null
  return isAdmin ? <Outlet /> : <Navigate to="/" />
}

export default AdminPrivateRouteWrapper
