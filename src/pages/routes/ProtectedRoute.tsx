
import { Navigate } from 'react-router-dom'

export default function ProtectedRouter({children?, isAdmin?}) {
  // 인증처리//

  if(!user || (isAdmin && !user.isAdmin)) {
    return <Navigate to="/" replace />
  }
  return children
}
