import { createContext, useContext, useEffect, useState } from 'react'
import { demoPassword } from '../data/site'
import { getCurrentUser, login as loginUser, logout as logoutUser, signup as signupUser } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    getCurrentUser()
      .then((currentUser) => {
        if (active) setUser(currentUser)
      })
      .catch(() => {
        if (active) setUser(null)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  const login = async (email, password) => {
    const nextUser = await loginUser(email, password)
    setUser(nextUser)
    return nextUser
  }

  const signup = async (name, email, password) => {
    const nextUser = await signupUser(name, email, password)
    setUser(nextUser)
    return nextUser
  }

  const logout = async () => {
    await logoutUser()
    setUser(null)
  }

  const demoLogin = async () => {
    try {
      return await login('demo@planpilot.app', demoPassword)
    } catch (error) {
      if (error.status !== 401) throw error
      await signup('Demo User', 'demo@planpilot.app', demoPassword)
      return login('demo@planpilot.app', demoPassword)
    }
  }

  return <AuthContext.Provider value={{ user, loading, signup, login, logout, demoLogin }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
