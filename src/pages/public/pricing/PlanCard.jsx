import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { planById } from '../../../data/plans'
import { useApp } from '../../../context/AppContext'
import SpotlightCard from '../../../components/ui/SpotlightCard'

const categories = ['Tasks', 'Planning', 'Analytics', 'Collaboration', 'Support']

function FeatureBadge({ status }) {
  return <span className={`pricing-status pricing-status-${status}`}>{status === 'live' ? 'Live' : 'Coming soon'}</span>
}

export default function PlanCard({ planId }) {
  const { plan: selectedPlan, user } = useApp()
  const reduceMotion = useReducedMotion()
  const plan = planById[planId]
  const price = selectedPlan.billingCycle === 'yearly' ? plan.yearlyMonthlyPrice : plan.monthlyPrice
  const paid = plan.id !== 'free'
  const destination = paid && user ? '/dashboard/billing' : plan.id === 'free' ? '/signup' : `/signup?plan=${plan.id}`

  return (
    <SpotlightCard className={`pricing-plan-card pricing-plan-${plan.id} ${plan.highlight ? 'pricing-plan-highlight' : ''}`}>
      {plan.highlight && <span className="popular-badge">Most popular</span>}
      <div className="pricing-card-head">
        <div>
          <h2>{plan.name}</h2>
          <p>{plan.tagline}</p>
        </div>
      </div>
      <div className="pricing-price" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.strong
            key={`${plan.id}-${selectedPlan.billingCycle}`}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
          >
            ${price}
          </motion.strong>
        </AnimatePresence>
        <span>/ user / month</span>
      </div>
      <p className="pricing-billing-note">{plan.id === 'free' ? 'Always free in the demo' : 'Placeholder demo price'}</p>
      {plan.id !== 'free' && <p className="pricing-includes">Everything in {plan.includes === 'pro' ? 'Pro' : 'Free'}, plus:</p>}
      <div className="pricing-feature-groups">
        {categories.map((category) => plan.features[category].length > 0 && (
          <div className="pricing-feature-group" key={category}>
            <h3>{category}</h3>
            <ul>
              {plan.features[category].map((feature) => (
                <li key={feature.name}><span>{feature.name}</span><FeatureBadge status={feature.status} /></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="pricing-limits">
        <span>{plan.limits.activeTasks === Infinity ? 'Unlimited active tasks' : `Up to ${plan.limits.activeTasks} active tasks`}</span>
        <span>{plan.limits.workspaces} workspace</span>
      </div>
      <Link className={`btn pricing-card-cta ${plan.highlight ? '' : 'ghost'}`} to={destination}>
        {plan.id === 'free' ? 'Start free' : `Try ${plan.name} in the demo`}
      </Link>
    </SpotlightCard>
  )
}
