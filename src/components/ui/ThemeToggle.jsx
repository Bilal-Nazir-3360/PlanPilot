import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useApp } from '../../context/AppContext'

function ThemeToggle() {
  const { theme, setTheme } = useApp()
  const next = theme === 'dark' ? 'light' : 'dark'
  const reducedMotion = useReducedMotion()
  return <button className="theme-toggle top-theme-toggle" onClick={() => setTheme(next)} aria-label={`Switch to ${next} mode`} title={`Switch to ${next} mode`}>
    <AnimatePresence mode="wait" initial={false}>
      <motion.span key={theme} initial={reducedMotion ? false : { opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={reducedMotion ? undefined : { opacity: 0, rotate: 90 }} transition={{ duration: reducedMotion ? 0 : .2 }}><span className="sr-only">{theme === 'dark' ? 'Sun' : 'Moon'}</span>{theme === 'dark' ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}</motion.span>
    </AnimatePresence>
  </button>
}

export { ThemeToggle }
export default ThemeToggle
