import { motion, useReducedMotion } from 'framer-motion'
import { useApp } from '../../../context/AppContext'
import SpotlightCard from '../../../components/ui/SpotlightCard'

export default function BillingCurrentPlan() {
  const { plan, tasks } = useApp()
  const reduceMotion = useReducedMotion()
  const active = tasks.filter((task) => task.status !== 'Done').length
  const unlimited = plan.limits.activeTasks === Infinity
  const percentage = unlimited ? 1 : Math.min(active / plan.limits.activeTasks, 1)
  return <SpotlightCard className="billing-current-plan">
    <div className="billing-current-heading"><div><div className="eyebrow">CURRENT PLAN</div><h2>{plan.name}</h2></div><span className="plan-badge">{plan.billingCycle}</span></div>
    <p className="muted">${plan.billingCycle === 'yearly' ? plan.yearlyMonthlyPrice : plan.monthlyPrice} / user / month · Demo: no renewal</p>
    <div className="usage-heading"><span>Active tasks</span><strong>{unlimited?'Unlimited':`${active} / ${plan.limits.activeTasks}`}</strong></div>
    <div className="usage-meter" role="progressbar" aria-label="Active task usage" aria-valuemin="0" aria-valuemax={unlimited?undefined:plan.limits.activeTasks} aria-valuenow={unlimited?undefined:active}><motion.i className={!unlimited&&percentage >= .8?'near-limit':''} animate={{ transform: `scaleX(${percentage})` }} initial={{ transform: 'scaleX(0)' }} transition={reduceMotion?{duration:0}:{duration:.45}} /></div>
    <p className="muted billing-usage-note">{unlimited?'Your plan has no active-task limit.':'Existing tasks are never deleted when you change plans.'}</p>
  </SpotlightCard>
}
