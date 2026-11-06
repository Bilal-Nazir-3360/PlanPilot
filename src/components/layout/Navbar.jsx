import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { navLinks, siteName } from '../../data/site'
import DiamondMark from '../ui/DiamondMark'
import Button from '../ui/Button'
import ThemeToggle from '../ui/ThemeToggle'

export default function Navbar() {
  const { user, loading, demoLogin, logout, setToast } = useApp()
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [scrolled, setScrolled] = useState(() => typeof window !== 'undefined' && window.scrollY > 12)
  const mobileMenuRef = useRef(null)
  const mobileButtonRef = useRef(null)
  const accountMenuRef = useRef(null)
  const accountButtonRef = useRef(null)

  const firstName = user?.name?.trim().split(/\s+/)[0] || 'Account'
  const initial = firstName[0]?.toUpperCase() || 'A'

  useLayoutEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setAccountOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!mobileOpen && !accountOpen) return undefined
    const previousOverflow = document.body.style.overflow
    if (mobileOpen) document.body.style.overflow = 'hidden'
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMobileOpen(false)
        setAccountOpen(false)
        if (accountOpen) accountButtonRef.current?.focus()
        else mobileButtonRef.current?.focus()
      }
      if (!accountOpen || !accountMenuRef.current) return
      const items = [...accountMenuRef.current.querySelectorAll('[role="menuitem"]')]
      const currentIndex = items.indexOf(document.activeElement)
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault()
        const offset = event.key === 'ArrowDown' ? 1 : -1
        items[(currentIndex + offset + items.length) % items.length]?.focus()
      } else if (event.key === 'Home' || event.key === 'End') {
        event.preventDefault()
        items[event.key === 'Home' ? 0 : items.length - 1]?.focus()
      }
    }
    const onPointerDown = (event) => {
      if (!accountMenuRef.current?.contains(event.target) && !accountButtonRef.current?.contains(event.target)) setAccountOpen(false)
      if (!mobileMenuRef.current?.contains(event.target) && !mobileButtonRef.current?.contains(event.target)) setMobileOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [accountOpen, mobileOpen])

  const closeMenus = () => {
    setMobileOpen(false)
    setAccountOpen(false)
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

  return <><a className="skip-link" href="#main">Skip to content</a><header className={`public-header ${scrolled ? 'is-scrolled' : ''}`}>
    <nav className="public-nav" aria-label="Primary navigation">
      <div className="public-nav-inner">
      <Link to="/" className="brand" onClick={closeMenus}><DiamondMark /> {siteName}</Link>
      <div className="desktop-nav-links">
        {navLinks.map(({ label, to }, index) => <NavLink key={to} to={to} className={({ isActive }) => `public-nav-link${isActive ? ' active' : ''}`}>{({ isActive }) => <><span className="nav-number">{String(index + 1).padStart(2, '0')}</span>{label}{isActive && <motion.span className="nav-active-indicator" initial={false} layoutId="public-nav-indicator" />}</>}</NavLink>)}
      </div>
      <div className="nav-actions">
        <ThemeToggle />
        {loading ? <span className="nav-auth-placeholder" aria-hidden="true" /> : user ? <div className="signed-in-nav"><Link to="/dashboard" className="nav-cta-link"><Button>Open dashboard <ArrowRight size={15} /></Button></Link><div className="account-menu-wrap"><button ref={accountButtonRef} type="button" className="account-trigger" onClick={() => setAccountOpen((current) => !current)} aria-haspopup="menu" aria-expanded={accountOpen}><span className="avatar">{initial}</span><span>{firstName}</span><ChevronDown size={15} /></button>{accountOpen && <div ref={accountMenuRef} className="account-menu" role="menu" aria-label="Account menu"><div className="account-details"><b>{user.name}</b><small>{user.email}</small></div>{accountItems.map(({ label, to }) => <Link key={to} to={to} role="menuitem" tabIndex={0} onClick={closeMenus}>{label}</Link>)}<div className="account-divider" /><button type="button" role="menuitem" onClick={handleLogout}>Log out</button></div>}</div></div> : <><Link to="/login" className="nav-account-link">Log in</Link><Link to="/signup" className="nav-account-link nav-signup-link">Sign up</Link><button type="button" className="nav-cta-link nav-text-button" onClick={tryDemo}><Button type="button">Try demo <ArrowRight size={15} /></Button></button></>}
        <button ref={mobileButtonRef} type="button" className="icon-btn mobile-menu" onClick={() => setMobileOpen((current) => !current)} aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileOpen} aria-controls="mobile-navigation">{mobileOpen ? <X /> : <Menu />}</button>
      </div>
      </div>
    </nav>
    <AnimatePresence>
      {mobileOpen && <motion.div ref={mobileMenuRef} id="mobile-navigation" className="mobile-nav-sheet" onPointerDown={(event) => { if (event.target === event.currentTarget) closeMenus() }} initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>
        {user && <div className="mobile-account-details"><span className="avatar">{initial}</span><div><b>{user.name}</b><small>{user.email}</small></div></div>}
        {navLinks.map(({ label, to }, index) => <NavLink key={to} to={to} onClick={closeMenus} className={({ isActive }) => `mobile-nav-link${isActive ? ' active' : ''}`}><span>{String(index + 1).padStart(2, '0')}</span>{label}</NavLink>)}
        {!loading && (user ? <><NavLink to="/dashboard" onClick={closeMenus} className="mobile-nav-link">Open dashboard</NavLink><NavLink to="/dashboard/settings" onClick={closeMenus} className="mobile-nav-link">Settings</NavLink><button type="button" onClick={handleLogout} className="mobile-nav-link mobile-nav-button">Log out</button></> : <><NavLink to="/login" onClick={closeMenus} className="mobile-nav-link">Log in</NavLink><NavLink to="/signup" onClick={closeMenus} className="mobile-nav-link">Sign up</NavLink><button type="button" onClick={tryDemo} className="nav-cta-link nav-text-button"><Button type="button">Try demo <ArrowRight size={15} /></Button></button></>)}
      </motion.div>}
    </AnimatePresence>
  </header></>
}
