import { ArrowRight, Clock3, ShieldCheck, Target, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import SpotlightCard from '../../components/ui/SpotlightCard'
import Reveal from '../../components/ui/Reveal'

function Landing(){return <><Navbar/><main id="main"><section className="hero"><div className="eyebrow">THE CLEARER WAY TO WORK</div><h1>Plan boldly.<br/><em>Ship clearly.</em></h1><p className="hero-copy">PlanPilot brings your tasks, projects, and people into one calm, focused workspace. Less noise. More momentum.</p><div className="hero-actions"><Link to="/signup"><Button>Start planning free <ArrowRight size={16}/></Button></Link><Link to="/features" className="text-link">See how it works <ArrowRight size={15}/></Link></div><div className="hero-note"><ShieldCheck size={16}/> No credit card required · Set up in 2 minutes</div></section><Reveal><section className="feature-strip"><SpotlightCard as="div"><Target/><b>One clear view</b><p>Everything your team needs, in context.</p></SpotlightCard><SpotlightCard as="div"><TrendingUp/><b>Built for momentum</b><p>Turn plans into meaningful progress.</p></SpotlightCard><SpotlightCard as="div"><Clock3/><b>More time to think</b><p>Automate the busywork, keep the craft.</p></SpotlightCard></section></Reveal></main><Footer/></>}

export default Landing
