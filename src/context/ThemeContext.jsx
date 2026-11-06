import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { getItem, removeItem, setItem } from '../services/storage'

const ThemeContext = createContext(null)
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => getItem('pp_theme', 'dark'))
  const skipPersist = useRef(false)
  useEffect(() => {
    if (skipPersist.current) {
      skipPersist.current = false
    } else {
      setItem('pp_theme', theme)
    }
    document.documentElement.className = theme
  }, [theme])
  const clearTheme = () => {
    skipPersist.current = true
    removeItem('pp_theme')
    setTheme('dark')
  }
  return <ThemeContext.Provider value={{ theme, setTheme, clearTheme }}>{children}</ThemeContext.Provider>
}
export const useTheme = () => useContext(ThemeContext)
