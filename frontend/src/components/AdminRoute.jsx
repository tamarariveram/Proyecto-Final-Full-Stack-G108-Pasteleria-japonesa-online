import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const AdminRoute = ({ children }) => {
  const { usuario, esAdmin } = useAuth()

  if (!usuario) {
    return <Navigate to="/login" />
  }

  if (!esAdmin) {
    return <Navigate to="/" />
  }

  return children
}

export default AdminRoute
