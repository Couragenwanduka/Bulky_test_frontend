// ProtectedRoute.tsx
import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../redux/store'

interface ProtectedRouteProps {
  children: ReactNode
  role?: 'ADMIN' | 'USER'
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth)

  if (!isLoggedIn) {
    // Not logged in
    return <Navigate to="/login" replace />
  }

  if (role && user?.role !== role) {
    // Logged in but not authorized
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
