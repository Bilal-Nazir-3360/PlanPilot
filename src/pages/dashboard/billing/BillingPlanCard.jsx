import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { planById } from '../../../data/plans'
import SpotlightCard from '../../../components/ui/SpotlightCard'

export default function BillingPlanCard({ planId, cycle, current, onSwitch }) {
  const plan = planById[planId]
  const reduceMotion = useReducedMotion()
  const price = cycle === 'yearly' ? plan.yearlyMonthlyPrice : plan.monthlyPrice
  return <SpotlightCard className={`billing-plan-card ${current ? 'active' : ''}`}>
    <div className="billing-plan-top"><h3>{plan.name}</h3>{current&&<span className="plan-badge">Current</span>}</div>
    <p className="muted">{plan.tagline}</p>
    <motion.strong animate={{ opacity: 1 }} initial={{ opacity: reduceMotion ? 1 : 0 }}>${price}<small>/month</small></motion.strong>
    {current?<span className="billing-current-note">Your current demo plan</span>:<button className="btn ghost" onClick={() => onSwitch(planId)}>Switch to {plan.name}</button>}
    {!current&&plan.id==='free'&&<Link className="billing-card-link" to="/dashboard">Keep exploring the workspace</Link>}
  </SpotlightCard>
}
