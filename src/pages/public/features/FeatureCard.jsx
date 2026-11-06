import { ArrowUpRight } from 'lucide-react'
import SpotlightCard from '../../../components/ui/SpotlightCard'
import StatusBadge from './StatusBadge'

export default function FeatureCard({ feature, onOpen, expanded, onToggle }) {
  const Icon = feature.icon
  return <SpotlightCard as="article" interactive className={`feature-card feature-card-${feature.size} ${expanded ? 'is-expanded' : ''}`} role="button" tabIndex={0} aria-expanded={expanded} onClick={onToggle} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onToggle() } }}>
    <div className="feature-card-icon"><Icon size={20}/></div>
    <h3>{feature.title}</h3>
    <p>{feature.benefit}</p>
    <div className="feature-card-footer"><StatusBadge status={feature.status}/><button type="button" className="feature-learn" onClick={(event) => { event.stopPropagation(); onToggle() }} aria-expanded={expanded}>{expanded ? 'Close' : 'Read more'} <ArrowUpRight size={14}/></button></div>
    {expanded && <div className="feature-card-details"><p>{feature.description}</p><ul>{feature.capabilities.map((capability) => <li key={capability}>{capability}</li>)}</ul></div>}
  </SpotlightCard>
}
