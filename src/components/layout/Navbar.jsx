import { useState } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../ui/Button'
import ThemeToggle from '../ui/ThemeToggle'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return <nav className="public-nav"><Link to="/" className="brand"><span>✦</span> PlanPilot</Link><div className={`nav-links ${open ? 'show' : ''}`}><Link to="/features">Features</Link><Link to="/pricing">Pricing</Link><Link to="/reviews">Reviews</Link><Link to="/about">About</Link><Link to="/contact">Contact</Link><Link to="/login" className="nav-login">Log in</Link><Link to="/signup"><Button>Start for free <ArrowRight size={15}/></Button></Link></div><div className="nav-controls"><ThemeToggle/><button className="icon-btn mobile-menu" onClick={() => setOpen(!open)} aria-label={open ? 'Close navigation' : 'Open navigation'}>{open ? <X/> : <Menu/>}</button></div></nav>
}
