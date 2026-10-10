import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../../../components/ui/Button'
import Reveal from '../../../components/ui/Reveal'

export default function FinalCta() {
  return <Reveal><section className="final-cta" aria-labelledby="final-cta-title"><p className="eyebrow">READY WHEN YOU ARE</p><h2 id="final-cta-title">Give your next week a clearer shape.</h2><p>Try the live demo or create a free demo account in under two minutes.</p><div className="final-cta-actions"><Link to="/login"><Button>Try the live demo <ArrowRight size={16}/></Button></Link><Link to="/signup" className="btn ghost">Create a free demo account</Link></div></section></Reveal>
}
