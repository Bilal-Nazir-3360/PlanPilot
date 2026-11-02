import Reveal from '../../../components/ui/Reveal'

const steps = [
  ['Plan', 'Shape projects and tasks into a clear, workable plan.'],
  ['Execute', 'Move work through the board and keep momentum visible.'],
  ['Review', 'Use filters and analytics to see what needs attention next.'],
]

export default function HowItWorks() {
  return <section id="how-it-works" className="section-shell home-how" aria-labelledby="how-title"><Reveal><div className="eyebrow">HOW IT WORKS</div><h2 id="how-title">Less ceremony. More <em>follow-through.</em></h2><div className="how-grid">{steps.map(([title, copy], index) => <article className="how-card" key={title}><span className="how-number">0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></Reveal></section>
}
