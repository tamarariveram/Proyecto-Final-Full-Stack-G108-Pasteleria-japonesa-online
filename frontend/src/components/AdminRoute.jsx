import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const AdminRoute = () => {
  const { usuario, esAdmin } = useAuth()
  const location = useLocation()

  if (!usuario) {
    return <Navigate to="/login" replace state={{ desde: location.pathname }} />
  }

  if (!esAdmin) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default AdminRoute
