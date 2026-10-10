import { Link } from 'react-router-dom'

export default function Footer() {
  return <footer><div className="brand"><span>✦</span> PlanPilot</div><span>© 2025 PlanPilot, Inc.</span><div><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link></div></footer>
}
