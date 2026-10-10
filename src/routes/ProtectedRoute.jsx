import { Navigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

function Protected({children}){const {user}=useApp();return user?children:<Navigate to="/login" replace/>}

export { Protected }
export default Protected
