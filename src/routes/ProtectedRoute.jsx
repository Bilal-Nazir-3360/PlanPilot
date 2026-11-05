import { Navigate, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'

function Protected({ children }) {
  const { user, loading } = useApp()
  const location = useLocation()
  if (loading) return <div className="route-fallback" role="status" aria-live="polite">Checking your session…</div>
  return user ? children : <Navigate to="/login" state={{ from: location }} replace />
}

export { Protected }
export default Protected
