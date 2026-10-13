import Navbar from './Navbar'
import Footer from './Footer'

export default function SimplePage({ title, children }) {
  return <><Navbar/><main id="main" className="simple-page"><div className="eyebrow">PLANPILOT</div><h1>{title}</h1><div className="simple-content">{children || <p>Everything you need to move from idea to impact, without the overhead. PlanPilot keeps your team aligned and your best work moving forward.</p>}</div></main><Footer/></>
}
