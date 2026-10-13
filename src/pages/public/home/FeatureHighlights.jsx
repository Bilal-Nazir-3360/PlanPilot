import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SpotlightCard from '../../../components/ui/SpotlightCard'
import { features } from '../../../data/features'

const highlightIds = ['tasks', 'analytics', 'themes', 'projects', 'calendar']

export default function FeatureHighlights() {
  const highlights = features.filter((feature) => highlightIds.includes(feature.id))
  return <section id="features" className="section-shell feature-highlights" aria-labelledby="highlights-title"><div className="eyebrow">WHAT WORKS TODAY</div><h2 id="highlights-title">Tools for a clearer working rhythm.</h2><div className="highlight-grid">{highlights.map(({ id, title, benefit, icon: Icon }) => <SpotlightCard key={id} className="highlight-card"><Icon size={22} /><h3>{title}</h3><p>{benefit}</p><Link to="/features">Explore feature <ArrowUpRight size={15} /></Link></SpotlightCard>)}</div></section>
}
