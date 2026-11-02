import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { navLinks, siteName } from '../../data/site'
import DiamondMark from '../ui/DiamondMark'
import Button from '../ui/Button'
import ThemeToggle from '../ui/ThemeToggle'

export default function Navbar() {
  const { user, demoLogin, logout, setToast } = useApp()
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef(null)
  const menuButtonRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (open) closeMenu()
  }, [location.pathname])

  useEffect(() => {
    if (!open) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusTarget = menuRef.current?.querySelector('a, button')
    focusTarget?.focus()
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeMenu()
        return
      }
      if (event.key !== 'Tab') return
      const focusable = [...menuRef.current.querySelectorAll('a, button')].filter((element) => !element.disabled)
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    const onPointerDown = (event) => {
      if (!menuRef.current?.contains(event.target) && !menuButtonRef.current?.contains(event.target)) closeMenu()
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  const closeMenu = () => {
    setOpen(false)
    menuButtonRef.current?.focus()
  }
  const tryDemo = () => {
    demoLogin()
    setToast('Demo account ready')
    closeMenu()
    navigate('/dashboard')
  }

  return <><a className="skip-link" href="#main">Skip to content</a><header className={`public-header ${scrolled ? 'is-scrolled' : ''}`}>
    <nav className="public-nav" aria-label="Primary navigation">
      <Link to="/" className="brand" onClick={closeMenu}><DiamondMark /> {siteName}</Link>
      <div className="desktop-nav-links">
        {navLinks.map(({ label, to }, index) => <NavLink key={to} to={to} className={({ isActive }) => `public-nav-link${isActive ? ' active' : ''}`}>{({ isActive }) => <><span className="nav-number">{String(index + 1).padStart(2, '0')}</span>{label}{isActive && <motion.span className="nav-active-indicator" layoutId="public-nav-indicator" />}</>}</NavLink>)}
      </div>
      <div className="nav-actions">
        <ThemeToggle />
        {user ? <><Link to="/dashboard" className="nav-cta-link"><Button>Dashboard <ArrowRight size={15} /></Button></Link><button type="button" className="nav-account-link nav-text-button" onClick={logout}>Log out</button></> : <><Link to="/login" className="nav-account-link">Log in</Link><Link to="/signup" className="nav-account-link nav-signup-link">Sign up</Link><button type="button" className="nav-cta-link nav-text-button" onClick={tryDemo}><Button type="button">Try demo <ArrowRight size={15} /></Button></button></>}
        <button ref={menuButtonRef} type="button" className="icon-btn mobile-menu" onClick={() => setOpen((current) => !current)} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-navigation">{open ? <X /> : <Menu />}</button>
      </div>
    </nav>
    <AnimatePresence>
      {open && <motion.div ref={menuRef} id="mobile-navigation" className="mobile-nav-sheet" onPointerDown={(event) => { if (event.target === event.currentTarget) closeMenu() }} initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>
        {navLinks.map(({ label, to }, index) => <NavLink key={to} to={to} onClick={closeMenu} className={({ isActive }) => `mobile-nav-link${isActive ? ' active' : ''}`}><span>{String(index + 1).padStart(2, '0')}</span>{label}</NavLink>)}
        {user ? <><NavLink to="/dashboard" onClick={closeMenu} className="mobile-nav-link">Dashboard</NavLink><button type="button" onClick={() => { logout(); closeMenu() }} className="mobile-nav-link mobile-nav-button">Log out</button></> : <><NavLink to="/login" onClick={closeMenu} className="mobile-nav-link">Log in</NavLink><NavLink to="/signup" onClick={closeMenu} className="mobile-nav-link">Sign up</NavLink><button type="button" onClick={tryDemo} className="nav-cta-link nav-text-button"><Button type="button">Try demo <ArrowRight size={15} /></Button></button></>}
      </motion.div>}
    </AnimatePresence>
  </header></>
}
