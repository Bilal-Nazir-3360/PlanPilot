import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../components/ui/Button'
import SpotlightCard from '../../../components/ui/SpotlightCard'
import { useApp } from '../../../context/AppContext'
import { githubUrl } from '../../../data/site'

export default function FinalCta() {
  const { demoLogin, setToast } = useApp()
  const navigate = useNavigate()
  const tryDemo = () => {
    demoLogin()
    setToast('Demo account ready')
    navigate('/dashboard')
  }
  return <section className="section-shell final-home-cta"><SpotlightCard className="final-home-card"><div><div className="eyebrow">READY WHEN YOU ARE</div><h2>Make the next step obvious.</h2><p>Explore the working prototype and see how PlanPilot keeps work moving.</p></div><div className="final-home-actions"><Button type="button" onClick={tryDemo}>Try the live demo <ArrowRight size={16} /></Button><a className="btn ghost" href={githubUrl} target="_blank" rel="noreferrer">View on GitHub</a></div></SpotlightCard></section>
}
