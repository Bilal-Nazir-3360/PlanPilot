import { createContext, useContext, useState } from 'react'
import { createAccount, demoLogin as createDemoUser, getUser, login as createUser, logout as clearUser, saveUser } from '../services/authService'

const AuthContext = createContext(null)
export function AuthProvider({ children }) {
  const [user, setUserState] = useState(getUser)
  const setUser = (nextUser) => {
    setUserState(nextUser)
    if (nextUser) saveUser(nextUser)
    else clearUser()
  }
  const login = (email, password) => {
    const nextUser = createUser(email, password)
    setUser(nextUser)
    return nextUser
  }
  const signup = (name, email, password) => {
    const nextUser = createAccount(name, email, password)
    setUser(nextUser)
    return nextUser
  }
  const demoLogin = () => {
    const nextUser = createDemoUser()
    setUser(nextUser)
    return nextUser
  }
  return <AuthContext.Provider value={{ user, setUser, login, signup, demoLogin, logout: () => setUser(null) }}>{children}</AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext)
