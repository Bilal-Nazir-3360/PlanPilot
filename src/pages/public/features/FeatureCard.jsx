import { ArrowUpRight } from 'lucide-react'
import SpotlightCard from '../../../components/ui/SpotlightCard'
import StatusBadge from './StatusBadge'

export default function FeatureCard({ feature, onOpen }) {
  const Icon = feature.icon
  return <SpotlightCard as="article" interactive className={`feature-card feature-card-${feature.size}`} role="button" tabIndex={0} layoutId={`feature-${feature.id}`} onClick={() => onOpen(feature)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onOpen(feature) } }}>
    <div className="feature-card-icon"><Icon size={20}/></div>
    <h3>{feature.title}</h3>
    <p>{feature.benefit}</p>
    <div className="feature-card-footer"><StatusBadge status={feature.status}/><button type="button" className="feature-learn" onClick={(event) => { event.stopPropagation(); onOpen(feature) }}>Learn more <ArrowUpRight size={14}/></button></div>
  </SpotlightCard>
}
