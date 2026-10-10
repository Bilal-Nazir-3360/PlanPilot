import { ArrowRight, Check, GripVertical } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import Button from '../../../components/ui/Button'
import Reveal from '../../../components/ui/Reveal'

const columns = [
  { label: 'Todo', cards: ['Launch notes', 'Team sync'] },
  { label: 'In progress', cards: ['Polish onboarding'] },
  { label: 'Done', cards: ['Analytics events'] },
]

export default function FeaturesHero() {
  const reduceMotion = useReducedMotion()
  return <section className="features-hero" aria-labelledby="features-title">
    <Reveal className="features-hero-copy">
      <p className="eyebrow">THE PLANPILOT WORKSPACE</p>
      <h1 id="features-title">Less noise.<br/><em>More momentum.</em></h1>
      <p className="features-lede">A focused workspace for planning clearly, moving work forward, and seeing what matters next.</p>
      <div className="features-actions"><Link to="/login"><Button>Try the live demo <ArrowRight size={16}/></Button></Link><a className="btn ghost" href="https://github.com/Bilal-Nazir-3360/PlanPilot" target="_blank" rel="noreferrer">View on GitHub</a></div>
      <div className="features-legend" aria-label="Feature status legend"><span><i className="legend-dot live"/> Live</span><span><i className="legend-dot preview"/> Preview</span><span><i className="legend-dot soon"/> Coming soon</span></div>
    </Reveal>
    <div className="features-hero-mockup" aria-label="Sample PlanPilot Kanban board">
      <div className="mockup-chrome"><span/><span/><span/><b>sample workspace / tasks</b></div>
      <div className="mockup-board">{columns.map((column, columnIndex) => <div className="mockup-column" key={column.label}><div className="mockup-column-head"><b>{column.label}</b><span>{column.cards.length}</span></div>{column.cards.map((card, index) => <motion.div key={card} className="mockup-task" animate={reduceMotion ? { opacity: 1 } : { y: [0, columnIndex === 1 ? -4 : 0, 0] }} transition={{ duration: 4, delay: index * .45, repeat: Infinity, repeatDelay: 2 }}><GripVertical size={13}/><span>{card}</span><Check size={13}/></motion.div>)}</div>)}</div>
      <div className="mockup-footer"><span><i/> Workspace synced</span><span>5 sample tasks</span></div>
    </div>
  </section>
}
