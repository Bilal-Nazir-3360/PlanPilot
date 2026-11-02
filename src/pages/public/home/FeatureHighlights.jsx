import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { features } from '../../../data/features'

const highlightIds = ['tasks', 'analytics', 'themes', 'projects', 'calendar']

export default function FeatureHighlights() {
  const highlights = features.filter((feature) => highlightIds.includes(feature.id))
  return <section id="features" className="section-shell feature-highlights" aria-labelledby="highlights-title"><div className="eyebrow">WHAT WORKS TODAY</div><h2 id="highlights-title">Tools for a <em>clearer</em> working rhythm.</h2><div className="highlight-list">{highlights.map(({ id, title, benefit }, index) => <article className="highlight-row" key={id}><span className="highlight-number">0{index + 1}</span><div><h3>{title}</h3><p>{benefit}</p></div><Link to="/features">Explore <ArrowUpRight size={15} /></Link></article>)}</div></section>
}
