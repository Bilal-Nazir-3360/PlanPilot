import SplitSection from '../../../components/ui/SplitSection'

const technologies = ['React', 'Vite', 'Framer Motion', 'Tailwind CSS', 'dnd-kit', 'Recharts']

export default function TechStrip() {
  return <SplitSection id="stack" className="tech-strip" eyebrow="BUILT WITH" title="The tools behind the prototype" labelledBy="stack-title"><div className="tech-strip-content">{technologies.map((technology) => <span className="tech-chip" key={technology}>{technology}</span>)}</div></SplitSection>
}
