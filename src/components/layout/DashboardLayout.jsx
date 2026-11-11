import { useEffect, useRef, useState } from 'react'
import { BarChart3, CalendarDays, CheckSquare, ChevronDown, CreditCard, FolderKanban, House, LayoutDashboard, Menu, Moon, Settings as SettingsIcon, Sun, Users, X } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

const sections = [
  ['Workspace', [['/dashboard', 'Overview', LayoutDashboard], ['/dashboard/tasks', 'Tasks', CheckSquare], ['/dashboard/projects', 'Projects', FolderKanban], ['/dashboard/calendar', 'Calendar', CalendarDays], ['/dashboard/team', 'Team', Users]]],
  ['Insights', [['/dashboard/analytics', 'Analytics', BarChart3]]],
  ['Account', [['/dashboard/billing', 'Billing', CreditCard], ['/dashboard/settings', 'Settings', SettingsIcon]]],
]

function DashboardLayout({ children }) {
  const { theme, setTheme, user, logout, plan, setToast } = useApp()
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const nav = useNavigate()
  const loc = useLocation()
  const userMenuRef = useRef(null)
  const userButtonRef = useRef(null)

  const handleLogout = async () => {
    try {
      await logout()
      setUserMenuOpen(false)
      setToast('You have been signed out.')
      nav('/')
    } catch (error) {
      setToast(error.message || 'Unable to sign out. Please try again.')
    }
  }

  useEffect(() => {
    if (!userMenuOpen) return undefined
    const onPointerDown = (event) => {
      if (!userMenuRef.current?.contains(event.target) && !userButtonRef.current?.contains(event.target)) setUserMenuOpen(false)
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setUserMenuOpen(false)
        userButtonRef.current?.focus()
        return
      }
      if (!userMenuRef.current || !['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return
      const items = [...userMenuRef.current.querySelectorAll('[role="menuitem"]')]
      const index = items.indexOf(document.activeElement)
      event.preventDefault()
      if (event.key === 'Home') items[0]?.focus()
      else if (event.key === 'End') items[items.length - 1]?.focus()
      else items[(index + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length]?.focus()
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [userMenuOpen])

  const toggleUserMenu = () => {
    setUserMenuOpen((current) => {
      if (!current) window.setTimeout(() => userMenuRef.current?.querySelector('[role="menuitem"]')?.focus(), 0)
      return !current
    })
  }

  const titles = {'/dashboard':'Overview','/dashboard/tasks':'Tasks','/dashboard/projects':'Projects','/dashboard/calendar':'Calendar','/dashboard/team':'Team','/dashboard/analytics':'Analytics','/dashboard/billing':'Billing','/dashboard/settings':'Settings'}
  const primary = loc.pathname === '/dashboard' || loc.pathname === '/dashboard/tasks' ? { to: '/dashboard/tasks', label: 'Add task' } : loc.pathname === '/dashboard/projects' ? { to: '/dashboard/projects', label: 'New project' } : loc.pathname === '/dashboard/team' ? { to: '/dashboard/team', label: 'Add member' } : null
  const initial = (user?.name || 'D')[0].toUpperCase()
  const firstName = user?.name?.trim().split(/\s+/)[0] || 'Demo user'

  return <div className="app-shell"><aside className={menuOpen ? 'is-open' : ''}><div className="sidebar-top"><Link to="/dashboard" className="brand"><span>✦</span> PlanPilot</Link><Link to="/" className="rail-home icon-btn" aria-label="Back to website" title="Back to website"><House size={18}/></Link><button className="sidebar-close icon-btn" onClick={() => setMenuOpen(false)} aria-label="Close navigation"><X size={20}/></button></div><div className="workspace-select">Acme workspace <ChevronDown size={14}/></div><nav className="side-links">{sections.map(([heading,items]) => <div className="nav-section" key={heading}><span className="nav-section-label">{heading}</span>{items.map(([to,label,Icon]) => <Link onClick={() => setMenuOpen(false)} className={loc.pathname === to ? 'active' : ''} key={to} to={to}><Icon size={18}/><span>{label}</span></Link>)}</div>)}</nav><div className="side-bottom"><button className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? <Sun size={17}/> : <Moon size={17}/>} <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span></button><button ref={userButtonRef} className="user-chip" type="button" onClick={toggleUserMenu} aria-haspopup="menu" aria-expanded={userMenuOpen}><span className="avatar">{initial}</span><span className="user-chip-details"><b>{firstName}</b><span className="plan-badge">{plan.name}</span></span><ChevronDown size={16} aria-hidden="true" /></button>{userMenuOpen && <div ref={userMenuRef} className="dashboard-user-menu" role="menu" aria-label="Account menu"><Link to="/" role="menuitem" tabIndex={0} onClick={() => setUserMenuOpen(false)}>Back to website</Link><Link to="/dashboard/settings" role="menuitem" tabIndex={0} onClick={() => setUserMenuOpen(false)}>Settings</Link><div className="account-divider" /><button type="button" role="menuitem" tabIndex={0} onClick={handleLogout}>Log out</button></div>}</div></aside><main id="main" className="dashboard-main"><header className="dash-header"><div><span className="eyebrow">PLANPILOT / {titles[loc.pathname]}</span><h2>{titles[loc.pathname] || 'Workspace'}</h2></div><div className="header-actions">{primary && <Link className="btn header-primary" to={primary.to}>{primary.label}</Link>}<button className="mobile-menu-toggle icon-btn" onClick={() => setMenuOpen(true)} aria-label="Open navigation"><Menu size={20}/></button></div></header>{children}</main></div>
}

export { DashboardLayout }
export default DashboardLayout
