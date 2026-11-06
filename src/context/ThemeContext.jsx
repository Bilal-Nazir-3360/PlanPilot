import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { getItem, removeItem, setItem } from '../services/storage'

const ThemeContext = createContext(null)
const getInitialTheme = () => {
  const saved = getItem('pp_theme', null)
  if (saved === 'light' || saved === 'dark') return saved
  return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)
  const skipPersist = useRef(false)
  useEffect(() => {
    if (skipPersist.current) {
      skipPersist.current = false
    } else {
      setItem('pp_theme', theme)
    }
    document.documentElement.className = theme
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.style.colorScheme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#F7F4EE' : '#0D0E11')
  }, [theme])
  const clearTheme = () => {
    skipPersist.current = true
    removeItem('pp_theme')
    setTheme('dark')
  }
  return <ThemeContext.Provider value={{ theme, setTheme, clearTheme }}>{children}</ThemeContext.Provider>
}
export const useTheme = () => useContext(ThemeContext)
