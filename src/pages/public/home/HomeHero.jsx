import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../components/ui/Button'
import Reveal from '../../../components/ui/Reveal'
import { useApp } from '../../../context/AppContext'
import ProductPreview from './ProductPreview'

export default function HomeHero() {
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

  return <section id="product" className="home-hero">
    <div className="home-hero-layout"><Reveal><div className="eyebrow">A CALMER WAY TO WORK</div><h1>Plan boldly.<br />Ship <em>clearly.</em></h1><p className="home-hero-copy">A focused workspace for turning everyday plans into visible progress.</p><div className="hero-actions"><Button type="button" onClick={tryDemo}>{user ? 'Open your dashboard' : 'Try the live demo'} <ArrowRight size={16} /></Button><a href="#features" className="btn-frame">See features <ArrowRight size={15} /></a></div><p className="home-hero-note">No signup needed. Data stays in your browser.</p></Reveal><ProductPreview embedded /></div>
    <a className="scroll-cue" href="#how-it-works" aria-label="Scroll to How it works">Scroll <span /></a>
  </section>
}
