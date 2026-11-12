import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../components/ui/Button'
import ElectricCard from '../../../components/ui/ElectricCard'
import { useApp } from '../../../context/AppContext'
import { githubUrl } from '../../../data/site'

export default function FinalCta() {
  const { user, demoLogin, setToast } = useApp()
  const navigate = useNavigate()
  const tryDemo = async () => {
    if (user) {
      navigate('/dashboard')
      return
    }
    await demoLogin()
    setToast('Demo account ready')
    navigate('/dashboard')
  }
  return <section id="start" className="section-shell final-home-cta"><ElectricCard className="final-home-card" intensity="full"><div className="final-home-card-content"><div className="final-home-card-copy"><div className="final-home-kicker"><span className="electric-card-badge">Live demo</span><div className="eyebrow">READY WHEN YOU ARE</div></div><h2>Make the next step <em>obvious.</em></h2><p>Explore the working prototype and see how PlanPilot keeps work moving.</p></div><div className="final-home-actions"><Button type="button" onClick={tryDemo}>{user ? 'Open your dashboard' : 'Try the live demo'} <ArrowRight size={16} /></Button><a className="btn-frame" href={githubUrl} target="_blank" rel="noreferrer">View on GitHub</a></div></div></ElectricCard></section>
}
