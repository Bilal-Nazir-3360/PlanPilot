import { Navigate, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'

function Protected({children}){const {user}=useApp();const location=useLocation();return user?children:<Navigate to="/login" state={{from: location}} replace/>}

export { Protected }
export default Protected
