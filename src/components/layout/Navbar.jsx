import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { NAV_MODE, navLinks, siteName } from '../../data/site'
import DiamondMark from '../ui/DiamondMark'
import Button from '../ui/Button'
import ThemeToggle from '../ui/ThemeToggle'

const HOVER_QUERY = '(hover: none)'

export default function Navbar() {
  const { user, loading, demoLogin, logout, setToast } = useApp()
  const location = useLocation()
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState(() => NAV_MODE === 'on-scroll' && typeof window !== 'undefined' && window.scrollY < 80)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const dockRef = useRef(null)
  const logoButtonRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const mobileButtonRef = useRef(null)
  const accountMenuRef = useRef(null)
  const accountButtonRef = useRef(null)
  const openTimerRef = useRef(null)
  const closeTimerRef = useRef(null)

  const firstName = user?.name?.trim().split(/\s+/)[0] || 'Account'
  const initial = firstName[0]?.toUpperCase() || 'A'
  const clearTimers = () => {
    window.clearTimeout(openTimerRef.current)
    window.clearTimeout(closeTimerRef.current)
  }
  const openDock = () => {
    clearTimers()
    setExpanded(true)
  }
  const closeDock = () => {
    clearTimers()
    setExpanded(false)
    setAccountOpen(false)
  }
  const scheduleOpen = () => {
    if (window.matchMedia(HOVER_QUERY).matches) return
    clearTimers()
    openTimerRef.current = window.setTimeout(openDock, 100)
  }
  const scheduleClose = () => {
    if (accountOpen || dockRef.current?.contains(document.activeElement)) return
    clearTimers()
    closeTimerRef.current = window.setTimeout(closeDock, 350)
  }

  useEffect(() => {
    setMobileOpen(false)
    setAccountOpen(false)
    setExpanded(NAV_MODE === 'on-scroll' && window.scrollY < 80)
  }, [location.pathname])

  useEffect(() => {
    if (NAV_MODE !== 'on-scroll') return undefined
    const onScroll = () => setExpanded(window.scrollY < 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => () => clearTimers(), [])

  useEffect(() => {
    const onPointerDown = (event) => {
      if (!dockRef.current?.contains(event.target)) {
        closeDock()
        setMobileOpen(false)
        setAccountOpen(false)
      }
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (mobileOpen) {
          setMobileOpen(false)
          mobileButtonRef.current?.focus()
        } else if (accountOpen) {
          setAccountOpen(false)
          accountButtonRef.current?.focus()
        } else if (expanded) {
          closeDock()
          logoButtonRef.current?.focus()
        }
      }
      if (mobileOpen && event.key === 'Tab' && mobileMenuRef.current) {
        const focusable = [...mobileMenuRef.current.querySelectorAll('a,button')].filter((item) => !item.disabled)
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
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [accountOpen, expanded, mobileOpen])

  useEffect(() => {
    if (!mobileOpen) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusTimer = window.setTimeout(() => mobileMenuRef.current?.querySelector('a,button')?.focus(), 0)
    return () => {
      window.clearTimeout(focusTimer)
      document.body.style.overflow = previousOverflow
    }
  }, [mobileOpen])

  const closeMenus = () => {
    setMobileOpen(false)
    setAccountOpen(false)
    closeDock()
  }
  const tryDemo = async () => {
    try {
      await demoLogin()
      setToast('Demo account ready')
      closeMenus()
      navigate('/dashboard')
    } catch (error) {
      setToast(error.message || 'Unable to start the demo account')
    }
  }
  const handleLogout = async () => {
    try {
      await logout()
      closeMenus()
      setToast('You have been signed out.')
      navigate('/')
    } catch (error) {
      setToast(error.message || 'Unable to sign out. Please try again.')
    }
  }
  const accountItems = [
    { label: 'Open dashboard', to: '/dashboard' },
    { label: 'Settings', to: '/dashboard/settings' },
  ]
  const renderLink = ({ label, to }, index) => (
    <NavLink
      key={to}
      to={to}
      onClick={closeMenus}
      className={({ isActive }) => `dock-link${isActive ? ' active' : ''}`}
      style={{ '--dock-delay': `${80 + index * 30}ms` }}
    >
      <span>{String(index + 1).padStart(2, '0')}</span>{label}
    </NavLink>
  )

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header
        ref={dockRef}
        className={`public-dock${expanded ? ' is-expanded' : ''}`}
        onMouseEnter={scheduleOpen}
        onMouseLeave={scheduleClose}
        onFocusCapture={openDock}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) scheduleClose()
        }}
      >
        <nav className="dock-pill" aria-label="Primary navigation">
          <div className="dock-side dock-side-left">{navLinks.slice(0, 3).map(renderLink)}</div>
          <button
            ref={logoButtonRef}
            type="button"
            className="dock-logo"
            aria-label="Open navigation"
            aria-expanded={expanded}
            aria-controls="desktop-navigation"
            onClick={() => (expanded ? closeDock() : openDock())}
          >
            <DiamondMark />
            <span className="sr-only">{siteName}</span>
          </button>
          <div id="desktop-navigation" className="dock-side dock-side-right">
            {navLinks.slice(3).map((link, index) => renderLink(link, index + 3))}
            <span className="dock-divider" aria-hidden="true" />
            <ThemeToggle />
            <div className="nav-auth-slot">
              {loading ? <span className="nav-auth-placeholder" aria-hidden="true" /> : user ? (
                <div className="signed-in-nav">
                  <div className="account-menu-wrap">
                    <button ref={accountButtonRef} type="button" className="account-trigger" onClick={() => setAccountOpen((current) => !current)} aria-haspopup="menu" aria-expanded={accountOpen}>
                      <span className="avatar">{initial}</span><span>{firstName}</span><ChevronDown size={15} />
                    </button>
                    {accountOpen && <div ref={accountMenuRef} className="account-menu" role="menu" aria-label="Account menu">
                      <div className="account-details"><b>{user.name}</b><small>{user.email}</small></div>
                      {accountItems.map(({ label, to }) => <Link key={to} to={to} role="menuitem" onClick={closeMenus}>{label}</Link>)}
                      <div className="account-divider" />
                      <button type="button" role="menuitem" onClick={handleLogout}>Log out</button>
                    </div>}
                  </div>
                  <Link to="/dashboard" className="nav-cta-link" onClick={closeMenus}><Button>Open dashboard <ArrowRight size={15} /></Button></Link>
                </div>
              ) : (
                <><Link to="/login" className="nav-account-link" onClick={closeMenus}>Log in</Link><Link to="/signup" className="nav-account-link nav-signup-link" onClick={closeMenus}>Sign up</Link><button type="button" className="nav-cta-link nav-text-button" onClick={tryDemo}><Button type="button">Try demo <ArrowRight size={15} /></Button></button></>
              )}
            </div>
          </div>
        </nav>
        <button ref={mobileButtonRef} type="button" className="dock-mobile-button" onClick={() => setMobileOpen(true)} aria-label="Open navigation" aria-expanded={mobileOpen} aria-controls="mobile-navigation"><DiamondMark /></button>
        <AnimatePresence>
          {mobileOpen && <motion.div ref={mobileMenuRef} id="mobile-navigation" className="mobile-nav-sheet" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: .2 }} onPointerDown={(event) => event.target === event.currentTarget && setMobileOpen(false)}>
            {user && <div className="mobile-account-details"><span className="avatar">{initial}</span><div><b>{user.name}</b><small>{user.email}</small></div></div>}
            {navLinks.map(({ label, to }, index) => <NavLink key={to} to={to} onClick={closeMenus} className="mobile-nav-link"><span>{String(index + 1).padStart(2, '0')}</span>{label}</NavLink>)}
            {!loading && (user ? <><NavLink to="/dashboard" onClick={closeMenus} className="mobile-nav-link">Open dashboard</NavLink><NavLink to="/dashboard/settings" onClick={closeMenus} className="mobile-nav-link">Settings</NavLink><button type="button" onClick={handleLogout} className="mobile-nav-link mobile-nav-button">Log out</button></> : <><NavLink to="/login" onClick={closeMenus} className="mobile-nav-link">Log in</NavLink><NavLink to="/signup" onClick={closeMenus} className="mobile-nav-link">Sign up</NavLink><button type="button" onClick={tryDemo} className="nav-cta-link nav-text-button"><Button type="button">Try demo <ArrowRight size={15} /></Button></button></>)}
          </motion.div>}
        </AnimatePresence>
      </header>
    </>
  )
}
