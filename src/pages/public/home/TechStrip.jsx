const technologies = ['React', 'Vite', 'Framer Motion', 'Tailwind CSS', 'dnd-kit', 'Recharts']

export default function TechStrip() {
  return <section className="tech-strip section-shell" aria-label="Technology stack"><span className="tech-label">Built with</span><div>{technologies.map((technology) => <span className="tech-chip" key={technology}>{technology}</span>)}</div></section>
}
