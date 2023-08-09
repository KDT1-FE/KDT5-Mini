import { Outlet } from 'react-router-dom'
import SideBar from '@/components/sidebar/SideBar'

const AdminLayout = () => {
  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <SideBar />
      <div style={{ width: '100%' }}>
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout
