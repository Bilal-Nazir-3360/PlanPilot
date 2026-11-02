import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../components/ui/Button'
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
  return <section id="start" className="section-shell final-home-cta"><div className="final-home-card"><div><div className="eyebrow">READY WHEN YOU ARE</div><h2>Make the next step <em>obvious.</em></h2><p>Explore the working prototype and see how PlanPilot keeps work moving.</p></div><div className="final-home-actions"><Button type="button" onClick={tryDemo}>Try the live demo <ArrowRight size={16} /></Button><a className="btn-frame" href={githubUrl} target="_blank" rel="noreferrer">View on GitHub</a></div></div></section>
}
