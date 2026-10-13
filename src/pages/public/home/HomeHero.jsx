import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../components/ui/Button'
import Reveal from '../../../components/ui/Reveal'
import { useApp } from '../../../context/AppContext'

export default function HomeHero() {
  const { demoLogin, setToast } = useApp()
  const navigate = useNavigate()
  const tryDemo = () => {
    demoLogin()
    setToast('Demo account ready')
    navigate('/dashboard')
  }

  return <section className="home-hero">
    <Reveal><div className="eyebrow">A CALMER WAY TO WORK</div><h1>Plan boldly.<br /><em>Ship clearly.</em></h1><p className="home-hero-copy">A focused workspace for turning everyday plans into visible progress.</p><div className="hero-actions"><Button type="button" onClick={tryDemo}>Try the live demo <ArrowRight size={16} /></Button><a href="#features" className="text-link">See features <ArrowRight size={15} /></a></div><p className="home-hero-note">No signup needed. Data stays in your browser.</p></Reveal>
  </section>
}
