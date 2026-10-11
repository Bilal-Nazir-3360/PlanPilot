import { usePlan } from '../../../context/PlanContext'
import { motion, useReducedMotion } from 'framer-motion'

export default function BillingToggle() {
  const { plan, setPlan } = usePlan()
  const cycle = plan.billingCycle
  const reduceMotion = useReducedMotion()

  return (
    <div className="billing-toggle-wrap">
      <div className="billing-toggle" role="radiogroup" aria-label="Billing cycle">
        <motion.span
          className="billing-toggle-slider"
          animate={{ x: cycle === 'yearly' ? 92 : 0 }}
          transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 35 }}
          aria-hidden="true"
        />
        {['monthly', 'yearly'].map((value) => (
          <label className={cycle === value ? 'active' : ''} key={value}>
            <input
              type="radio"
              name="billing-cycle"
              value={value}
              checked={cycle === value}
              onChange={() => setPlan(plan.id, value)}
            />
            <span>{value === 'monthly' ? 'Monthly' : 'Yearly'}</span>
          </label>
        ))}
      </div>
      <span className="save-badge">Save 20%</span>
    </div>
  )
}
