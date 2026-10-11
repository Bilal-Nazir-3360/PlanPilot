import { planById } from '../../../data/plans'
import SpotlightCard from '../../../components/ui/SpotlightCard'
import { useApp } from '../../../context/AppContext'

export default function BillingHistory() {
  const { plan } = useApp()
  const history = [...plan.history].reverse()
  return <SpotlightCard className="billing-history"><div className="card-head"><div><h3>Demo billing history</h3><p className="muted">Plan changes made in this browser only.</p></div></div>{history.length?<ul>{history.map((entry,index)=><li key={`${entry.changedAt}-${index}`}><span>{planById[entry.planId]?.name||'Free'} · {entry.billingCycle}</span><time dateTime={entry.changedAt}>{new Date(entry.changedAt).toLocaleDateString()}</time></li>)}</ul>:<p className="muted">No demo plan changes yet.</p>}</SpotlightCard>
}
