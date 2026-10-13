import { CheckCircle2, ListChecks, Search } from 'lucide-react'
import Reveal from '../../../components/ui/Reveal'

const steps = [
  ['Plan', ListChecks, 'Shape projects and tasks into a clear, workable plan.'],
  ['Execute', CheckCircle2, 'Move work through the board and keep momentum visible.'],
  ['Review', Search, 'Use filters and analytics to see what needs attention next.'],
]

export default function HowItWorks() {
  return <section className="section-shell home-how" aria-labelledby="how-title"><Reveal><div className="eyebrow">HOW IT WORKS</div><h2 id="how-title">Less ceremony. More follow-through.</h2><div className="how-grid">{steps.map(([title, Icon, copy], index) => <article className="how-card" key={title}><span className="how-number">0{index + 1}</span><Icon size={23} /><h3>{title}</h3><p>{copy}</p></article>)}</div></Reveal></section>
}
