import { Sun, Moon } from 'lucide-react'
import { useApp } from '../../context/AppContext'

function ThemeToggle(){const {theme,setTheme}=useApp();const next=theme==='dark'?'light':'dark';return <button className="theme-toggle top-theme-toggle" onClick={()=>setTheme(next)} aria-label={`Switch to ${next} mode`} title={`Switch to ${next} mode`}>{theme==='dark'?<Sun size={16}/>:<Moon size={16}/>}<span>{theme==='dark'?'Light':'Dark'} mode</span></button>}

export { ThemeToggle }
export default ThemeToggle
