import { useReducedMotion, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Footer from '../../components/layout/Footer'
import Navbar from '../../components/layout/Navbar'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import { useAuth } from '../../context/AuthContext'

function LostIllustration() {
  const reduceMotion = useReducedMotion()
  return <motion.svg className="not-found-art" viewBox="0 0 240 150" role="img" aria-label="A small route marker drifting away from a path" animate={reduceMotion ? undefined : { y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity }}><path d="M32 115c31-35 63-44 93-34 29 10 51 2 83-34" /><circle cx="32" cy="115" r="7" /><circle cx="208" cy="47" r="7" /><path d="M105 67l15-22 15 22-15 22z" /></motion.svg>
}

export default function NotFound() {
  const { user } = useAuth()
  useDocumentTitle('Page not found — PlanPilot', 'The requested PlanPilot page could not be found.', true)
  return <><Navbar /><main id="main" className="not-found-page"><LostIllustration /><div className="eyebrow">404 · ROUTE NOT FOUND</div><h1>This path needs a reset.</h1><p>That page does not exist in this demo. Let’s get you back to a useful place.</p><div className="not-found-actions"><Link className="btn" to="/">Home</Link>{user ? <Link className="btn ghost" to="/dashboard">Dashboard</Link> : <Link className="btn ghost" to="/login">Login</Link>}</div><Link className="text-link not-found-contact" to="/contact">Contact if something looks wrong</Link></main><Footer /></>
}
