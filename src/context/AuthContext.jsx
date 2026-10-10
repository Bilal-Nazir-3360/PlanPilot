import { createContext, useContext, useState } from 'react'
import { getUser, login as createUser, logout as clearUser, saveUser } from '../services/authService'

const AuthContext = createContext(null)
export function AuthProvider({ children }) {
  const [user, setUserState] = useState(getUser)
  const setUser = (nextUser) => {
    setUserState(nextUser)
    if (nextUser) saveUser(nextUser)
    else clearUser()
  }
  const login = (email) => setUser(createUser(email))
  return <AuthContext.Provider value={{ user, setUser, login, logout: () => setUser(null) }}>{children}</AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext)
