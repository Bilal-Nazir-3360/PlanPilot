import { AnimatePresence, motion } from 'framer-motion'
import { BarChart3, CalendarDays, CheckSquare, CreditCard, FolderKanban, House, LayoutDashboard, Menu, Moon, Settings as SettingsIcon, Sun, Users, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import AccountMenu from '../ui/AccountMenu'
import DiamondMark from '../ui/DiamondMark'

const sections = [
  ['WORKSPACE', [['/dashboard', 'Overview', LayoutDashboard], ['/dashboard/tasks', 'Tasks', CheckSquare], ['/dashboard/projects', 'Projects', FolderKanban], ['/dashboard/calendar', 'Calendar', CalendarDays], ['/dashboard/team', 'Team', Users]]],
  ['INSIGHTS', [['/dashboard/analytics', 'Analytics', BarChart3]]],
  ['ACCOUNT', [['/dashboard/billing', 'Billing', CreditCard], ['/dashboard/settings', 'Settings', SettingsIcon]]],
]

function DashboardLayout({ children }) {
  const { theme, setTheme, user, plan, tasks, loading: tasksLoading, projects, loading: projectsLoading } = useApp()
  const [menuOpen, setMenuOpen] = useState(false)
  const loc = useLocation()
  const sidebarRef = useRef(null)
  const menuButtonRef = useRef(null)
  const firstName = user?.name?.trim().split(/\s+/)[0] || 'Demo user'
  const initial = (user?.name || 'D')[0].toUpperCase()
  const activeTasks = tasks.filter((task) => task.status !== 'Done').length
  const taskCount = tasksLoading ? null : activeTasks
  const projectCount = projectsLoading ? null : projects.length
  const usageLabel = plan.id === 'free' ? `${activeTasks} of 25 active tasks` : 'Unlimited tasks'
  const titles = {'/dashboard':'Overview','/dashboard/tasks':'Tasks','/dashboard/projects':'Projects','/dashboard/calendar':'Calendar','/dashboard/team':'Team','/dashboard/analytics':'Analytics','/dashboard/billing':'Billing','/dashboard/settings':'Settings'}
  const primary = loc.pathname === '/dashboard' || loc.pathname === '/dashboard/tasks' ? { to: '/dashboard/tasks', label: 'Add task' } : loc.pathname === '/dashboard/projects' ? { to: '/dashboard/projects', label: 'New project' } : loc.pathname === '/dashboard/team' ? { to: '/dashboard/team', label: 'Add member' } : null

  useEffect(() => {
    setMenuOpen(false)
  }, [loc.key])

  useEffect(() => {
    if (!menuOpen) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
        return
      }
      if (event.key !== 'Tab' || !sidebarRef.current) return
      const focusable = [...sidebarRef.current.querySelectorAll('a[href],button:not([disabled])')]
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return <div className="app-shell">
    <AnimatePresence>{menuOpen && <motion.button className="dashboard-backdrop" type="button" aria-label="Close navigation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMenuOpen(false)} />}</AnimatePresence>
    <aside ref={sidebarRef} className={menuOpen ? 'is-open' : ''}>
      <div className="sidebar-top">
        <Link to="/dashboard" className="dashboard-brand"><DiamondMark /><span>PlanPilot</span></Link>
        <Link to="/" className="sidebar-website-button"><House size={16} /><span>Website</span></Link>
        <button className="sidebar-close icon-btn" onClick={() => setMenuOpen(false)} aria-label="Close navigation"><X size={20} /></button>
      </div>
      <Link to="/dashboard/billing" className="workspace-card">
        <div className="workspace-card-heading"><strong>{firstName}'s workspace</strong><span className="plan-badge">{plan.name}</span></div>
        <div className="workspace-usage"><span>{usageLabel}</span>{plan.id === 'free' && <span className="workspace-usage-bar"><i style={{ width: `${Math.min(100, activeTasks / 25 * 100)}%` }} /></span>}</div>
      </Link>
      <nav className="side-links" aria-label="Dashboard navigation">
        {sections.map(([heading, items]) => <div className="nav-section" key={heading}><span className="nav-section-label">{heading}</span>{items.map(([to, label, Icon]) => <Link onClick={() => setMenuOpen(false)} className={loc.pathname === to ? 'active' : ''} key={to} to={to} aria-label={label} title={label}>{loc.pathname === to && <motion.span className="nav-active-bar" layoutId="dashboard-active-bar" initial={false} transition={{ type: 'spring', stiffness: 420, damping: 32 }} /> }<Icon size={20} /><span>{label}</span>{label === 'Tasks' && taskCount > 0 && <b className="nav-count">{taskCount}</b>}{label === 'Projects' && projectCount > 0 && <b className="nav-count">{projectCount}</b>}</Link>)}</div>)}
      </nav>
      <div className="side-bottom">
        <button className="theme-toggle" title={theme === 'dark' ? 'Light mode' : 'Dark mode'} aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}<span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span></button>
        <AccountMenu variant="dashboard" user={user} triggerClassName="dashboard-user-trigger" />
      </div>
    </aside>
    <main id="main" className="dashboard-main">
      <div className="dashboard-page-container">
        <header className="dash-header"><div><span className="eyebrow">PLANPILOT / {titles[loc.pathname]}</span><h2>{titles[loc.pathname] || 'Workspace'}</h2></div><div className="header-actions">{primary && <Link className="btn header-primary" to={primary.to}>{primary.label}</Link>}<button ref={menuButtonRef} className="mobile-menu-toggle icon-btn" onClick={() => setMenuOpen(true)} aria-label="Open navigation"><Menu size={20} /></button></div></header>
        {children}
      </div>
    </main>
  </div>
}

export { DashboardLayout }
export default DashboardLayout
