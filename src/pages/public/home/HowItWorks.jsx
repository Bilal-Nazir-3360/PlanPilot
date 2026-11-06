import Reveal from '../../../components/ui/Reveal'
import SplitSection from '../../../components/ui/SplitSection'

const steps = [
  ['Plan', 'Shape projects and tasks into a clear, workable plan.'],
  ['Execute', 'Move work through the board and keep momentum visible.'],
  ['Review', 'Use filters and analytics to see what needs attention next.'],
]

export default function HowItWorks() {
  return <SplitSection id="how-it-works" className="home-how" eyebrow="HOW IT WORKS" title={<>Less ceremony. More <em>follow-through.</em></>} labelledBy="how-title"><Reveal><div className="how-grid">{steps.map(([title, copy], index) => <article className="how-card" key={title}><span className="how-number">0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></Reveal></SplitSection>
}
