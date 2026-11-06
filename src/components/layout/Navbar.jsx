import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { navLinks, siteName } from '../../data/site'
import DiamondMark from '../ui/DiamondMark'
import ThemeToggle from '../ui/ThemeToggle'

export const BAR_HEIGHT = 64
export const PILL_SPRING_STIFFNESS = 380
export const PILL_SPRING_DAMPING = 32
export const SCROLL_THRESHOLD = 8
export const SHOW_PROGRESS = true

const focusableSelector = 'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])'

export default function Navbar() {
  const { user, loading, demoLogin, logout, setToast } = useApp()
  const location = useLocation()
  const navigate = useNavigate()
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, reducedMotion: true })
  const [scrolled, setScrolled] = useState(() => typeof window !== 'undefined' && window.scrollY >= SCROLL_THRESHOLD)
  const [menuOpen, setMenuOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [hoveredPath, setHoveredPath] = useState(null)
  const menuButtonRef = useRef(null)
  const menuRef = useRef(null)
  const accountRef = useRef(null)
  const accountMenuRef = useRef(null)

  const firstName = user?.name?.trim().split(/\s+/)[0] || 'Account'
  const initial = firstName[0]?.toUpperCase() || 'A'

  useEffect(() => {
    const update = () => setScrolled(window.scrollY >= SCROLL_THRESHOLD)
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setAccountOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!menuOpen) return undefined
    const previousOverflow = document.body.style.overflow
    const previousGutter = document.documentElement.style.scrollbarGutter
    document.body.style.overflow = 'hidden'
    document.documentElement.style.scrollbarGutter = 'stable'
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
        return
      }
      if (event.key !== 'Tab' || !menuRef.current) return
      const focusable = [...menuRef.current.querySelectorAll(focusableSelector)]
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
    return () => {
      document.body.style.overflow = previousOverflow
      document.documentElement.style.scrollbarGutter = previousGutter
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  useEffect(() => {
    if (!accountOpen) return undefined
    const onPointerDown = (event) => {
      if (!accountRef.current?.contains(event.target) && !accountMenuRef.current?.contains(event.target)) setAccountOpen(false)
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setAccountOpen(false)
        accountRef.current?.focus()
        return
      }
      if (!['ArrowDown', 'ArrowUp'].includes(event.key) || !accountMenuRef.current) return
      const items = [...accountMenuRef.current.querySelectorAll('[role="menuitem"]')]
      const current = items.indexOf(document.activeElement)
      if (current < 0) return
      event.preventDefault()
      items[(current + (event.key === 'ArrowDown' ? 1 : items.length - 1)) % items.length]?.focus()
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [accountOpen])

  const closeMenus = () => {
    setMenuOpen(false)
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

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className={`public-header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="public-header-inner">
          <Link to="/" className="public-wordmark" aria-label={siteName} onClick={closeMenus}>
            <DiamondMark /><span>{siteName}</span>
          </Link>
          <nav className="public-pill-nav" aria-label="Public navigation" onMouseLeave={() => setHoveredPath(null)}>
            {navLinks.map((item) => <PillLink key={item.to} item={item} reducedMotion={reducedMotion} hovered={hoveredPath === item.to} hasHovered={Boolean(hoveredPath)} onHover={setHoveredPath} />)}
          </nav>
          <div className="public-header-actions">
            <ThemeToggle />
            <div className="desktop-auth-slot">
              {loading ? <span className="nav-auth-placeholder" aria-hidden="true" /> : user ? (
                <div className="signed-in-nav">
                  <AccountTrigger ref={accountRef} firstName={firstName} initial={initial} open={accountOpen} onClick={() => setAccountOpen((value) => !value)} />
                  {accountOpen && <AccountMenu ref={accountMenuRef} user={user} onClose={closeMenus} onLogout={handleLogout} />}
                  <Link to="/dashboard" className="nav-dashboard-button" onClick={closeMenus}>Open dashboard</Link>
                </div>
              ) : (
                <div className="signed-out-nav">
                  <Link to="/login" className="nav-account-link" onClick={closeMenus}>Log in</Link>
                  <Link to="/signup" className="nav-signup-link" onClick={closeMenus}>Sign up</Link>
                  <button type="button" className="nav-demo-button" onClick={tryDemo}>Try demo</button>
                </div>
              )}
            </div>
            <button ref={menuButtonRef} type="button" className={`mobile-menu-button${menuOpen ? ' is-open' : ''}`} onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}>
              <span /><span /><span />
            </button>
          </div>
        </div>
        <AnimatePresence>
          {menuOpen && <MobileSheet ref={menuRef} user={user} firstName={firstName} onClose={closeMenus} onDemo={tryDemo} onLogout={handleLogout} reducedMotion={reducedMotion} />}
        </AnimatePresence>
        {SHOW_PROGRESS && <motion.div className="nav-scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />}
      </header>
    </>
  )
}

function PillLink({ item, reducedMotion, hovered, hasHovered, onHover }) {
  return (
    <NavLink to={item.to} end className={({ isActive }) => `public-pill-link${isActive ? ' active' : ''}`} onMouseEnter={() => onHover(item.to)} onFocus={() => onHover(item.to)} onBlur={() => onHover(null)}>
      {({ isActive }) => <>
        {(hovered || (!hasHovered && isActive)) && <motion.span className="nav-pill-highlight" layoutId="nav-pill" transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: PILL_SPRING_STIFFNESS, damping: PILL_SPRING_DAMPING }} initial={false} />}
        <span className="public-pill-label">{item.label}</span>
        {isActive && <span className="active-dot" aria-hidden="true" />}
      </>}
    </NavLink>
  )
}

const AccountTrigger = forwardRef(function AccountTrigger({ firstName, initial, open, onClick }, ref) {
  return <button ref={ref} type="button" className="account-trigger" onClick={onClick} aria-haspopup="menu" aria-expanded={open}><span className="avatar">{initial}</span><span>{firstName}</span><ChevronDown size={15} aria-hidden="true" /></button>
})

const AccountMenu = forwardRef(function AccountMenu({ user, onClose, onLogout }, ref) {
  return <div ref={ref} className="account-menu" role="menu" aria-label="Account menu">
    <div className="account-details"><b>{user.name}</b><small>{user.email}</small></div>
    <Link to="/dashboard" role="menuitem" onClick={onClose}>Open dashboard</Link>
    <Link to="/dashboard/settings" role="menuitem" onClick={onClose}>Settings</Link>
    <div className="account-divider" />
    <button type="button" role="menuitem" onClick={onLogout}>Log out</button>
  </div>
})

const MobileSheet = forwardRef(function MobileSheet({ user, onClose, onDemo, onLogout, reducedMotion }, ref) {
  return <motion.div ref={ref} id="mobile-navigation" className="mobile-navigation-sheet" role="dialog" aria-modal="true" aria-label="Mobile navigation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : .2 }}>
    <nav aria-label="Mobile public navigation">
      {navLinks.map((item, index) => <motion.div key={item.to} initial={reducedMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={reducedMotion ? { duration: 0 } : { delay: index * .045, duration: .2 }}><NavLink to={item.to} onClick={onClose} className={({ isActive }) => `mobile-navigation-link${isActive ? ' active' : ''}`}><span>{String(index + 1).padStart(2, '0')}</span>{item.label}</NavLink></motion.div>)}
    </nav>
    {user ? <div className="mobile-auth-links"><div className="mobile-user-details"><b>{user.name}</b><small>{user.email}</small></div><Link to="/dashboard" onClick={onClose}>Open dashboard</Link><Link to="/dashboard/settings" onClick={onClose}>Settings</Link><button type="button" onClick={onLogout}>Log out</button></div> : <div className="mobile-auth-links"><Link to="/login" onClick={onClose}>Log in</Link><Link to="/signup" onClick={onClose}>Sign up</Link><button type="button" className="nav-demo-button" onClick={onDemo}>Try demo</button></div>}
  </motion.div>
})
