import { createContext, useContext, useEffect, useState } from 'react'
import { getItem, setItem } from '../services/storage'

const ThemeContext = createContext(null)
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => getItem('pp_theme', 'dark'))
  useEffect(() => {
    setItem('pp_theme', theme)
    document.documentElement.className = theme
  }, [theme])
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}
export const useTheme = () => useContext(ThemeContext)
