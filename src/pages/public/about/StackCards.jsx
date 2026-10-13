import { BarChart3, CheckSquare, Code2, Move, Palette, Zap } from 'lucide-react'
import Reveal from '../../../components/ui/Reveal'
import SpotlightCard from '../../../components/ui/SpotlightCard'

const stack = [
  ['React', 'Build the routed pages, reusable components, and context-based app state.', CheckSquare],
  ['Vite', 'Provide the fast development server and production build pipeline.', Zap],
  ['Framer Motion', 'Animate reveals, cards, navigation indicators, and other focused transitions.', Move],
  ['Tailwind', 'Support the project styling setup alongside the custom CSS theme system.', Palette],
  ['dnd-kit', 'Power keyboard- and pointer-friendly task drag-and-drop in the workspace.', Code2],
  ['Recharts', 'Render the dashboard analytics charts from the demo data.', BarChart3],
]

export default function StackCards() {
  return <section className="about-section section-shell" aria-labelledby="stack-title"><Reveal><div className="eyebrow">THE TOOLKIT</div><h2 id="stack-title">A practical front-end stack.</h2></Reveal><div className="about-stack-grid">{stack.map(([name, description, Icon], index) => <Reveal key={name} delay={index * .04}><SpotlightCard className="about-stack-card"><Icon size={21} aria-hidden="true" /><h3>{name}</h3><p>{description}</p></SpotlightCard></Reveal>)}</div></section>
}
