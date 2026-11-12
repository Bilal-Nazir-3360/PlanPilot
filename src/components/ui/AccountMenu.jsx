import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { CreditCard, ExternalLink, LogIn, LogOut, Settings, UserRound } from 'lucide-react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

function getPosition(rect, width, height) {
  const gap = 8
  const spaceBelow = window.innerHeight - rect.bottom
  const top = spaceBelow >= height + gap || rect.top < height + gap ? rect.bottom + gap : rect.top - height - gap
  const left = Math.min(Math.max(gap, rect.right - width), window.innerWidth - width - gap)
  return { top, left }
}

export default function AccountMenu({ variant = 'public', user, triggerClassName = '' }) {
  const app = useApp()
  const navigate = useNavigate()
  const reducedMotion = useReducedMotion()
  const triggerRef = useRef(null)
  const panelRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const [ready, setReady] = useState(false)
  const currentUser = user ?? app.user
  const firstName = currentUser?.name?.trim().split(/\s+/)[0] || 'Account'
  const initial = firstName[0]?.toUpperCase() || 'A'
  const plan = app.plan

  const updatePosition = () => {
    if (!triggerRef.current) return
    const rect = triggerRef.current.getBoundingClientRect()
    setPosition(getPosition(rect, 276, currentUser ? 350 : 220))
  }

  useLayoutEffect(() => {
    if (!open) return undefined
    updatePosition()
    setReady(true)
    const onResize = () => updatePosition()
    window.addEventListener('resize', onResize)
    window.addEventListener('scroll', onResize, true)
    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onResize, true)
    }
  }, [open, currentUser])

  useEffect(() => {
    if (!open) return undefined
    const onPointerDown = (event) => {
      if (!triggerRef.current?.contains(event.target) && !panelRef.current?.contains(event.target)) setOpen(false)
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
        return
      }
      if (event.key === 'Tab') {
        setOpen(false)
        return
      }
      if (!panelRef.current || !['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return
      const items = [...panelRef.current.querySelectorAll('[role="menuitem"]')]
      const index = items.indexOf(document.activeElement)
      event.preventDefault()
      if (event.key === 'Home') items[0]?.focus()
      else if (event.key === 'End') items[items.length - 1]?.focus()
      else items[(index + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length]?.focus()
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    window.setTimeout(() => panelRef.current?.querySelector('[role="menuitem"]')?.focus(), 0)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const logout = async () => {
    try {
      await app.logout()
      setOpen(false)
      app.setToast('You have been signed out.')
      navigate('/')
    } catch (error) {
      app.setToast(error.message || 'Unable to sign out. Please try again.')
    }
  }

  const items = currentUser
    ? [
        { label: variant === 'public' ? 'Open dashboard' : 'Back to website', to: variant === 'public' ? '/dashboard' : '/', Icon: variant === 'public' ? ExternalLink : HouseIcon },
        { label: 'Settings', to: '/dashboard/settings', Icon: Settings },
        { label: 'Billing and plan', to: '/dashboard/billing', Icon: CreditCard },
      ]
    : [
        { label: 'Log in', to: '/login', Icon: LogIn },
        { label: 'Sign up', to: '/signup', Icon: UserRound },
        { label: 'Try demo', action: app.demoLogin, Icon: ExternalLink },
      ]

  return (
    <>
      <button ref={triggerRef} type="button" className={`account-trigger ${triggerClassName}`} onClick={() => setOpen((value) => !value)} aria-haspopup="menu" aria-expanded={open}>
        <span className="avatar">{initial}</span><span className="account-trigger-name"><b>{firstName}</b></span><ChevronIcon />
      </button>
      {createPortal(
        <AnimatePresence>
          {open && ready && <motion.div ref={panelRef} className="account-menu account-menu-portal" role="menu" aria-label="Account menu" style={{ top: position.top, left: position.left }} initial={{ opacity: 0, y: reducedMotion ? 0 : 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reducedMotion ? 0 : 6 }} transition={{ duration: .16 }}>
            {currentUser ? <div className="account-menu-header"><span className="avatar">{initial}</span><div><b>{currentUser.name}</b><small>{currentUser.email}</small><span className="plan-badge">{plan.name}</span></div></div> : <div className="account-menu-header"><span className="avatar">{initial}</span><div><b>Welcome back</b><small>Choose an account action</small></div></div>}
            <div className="account-menu-items">{items.map(({ label, to, action: action, Icon }) => to ? <Link key={label} to={to} role="menuitem" onClick={() => setOpen(false)}><Icon size={17} />{label}</Link> : <button key={label} type="button" role="menuitem" onClick={async () => { setOpen(false); await action(); navigate('/dashboard') }}><Icon size={17} />{label}</button>)}</div>
            {currentUser && <><div className="account-divider" /><button type="button" className="account-menu-danger" role="menuitem" onClick={logout}><LogOut size={17} />Log out</button></>}
          </motion.div>}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}

function ChevronIcon() {
  return <svg className="account-chevron" viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function HouseIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 11 8-7 8 7v9H4v-9Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><path d="M9 20v-5h6v5" fill="none" stroke="currentColor" strokeWidth="1.8" /></svg>
}
