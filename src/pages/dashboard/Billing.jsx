import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import { useApp } from '../../context/AppContext'
import BillingCurrentPlan from './billing/BillingCurrentPlan'
import BillingHistory from './billing/BillingHistory'
import BillingPlanCard from './billing/BillingPlanCard'
import { plans } from '../../data/plans'
import useDocumentTitle from '../../hooks/useDocumentTitle'

export default function Billing() {
  const { plan, setPlan, setToast } = useApp()
  const [cycle, setCycle] = useState(plan.billingCycle)
  const [pending, setPending] = useState(null)
  const reduceMotion = useReducedMotion()
  useDocumentTitle('Billing — PlanPilot', 'Manage your PlanPilot demo plan, usage limits, and browser-only plan history.')
  const confirmSwitch = () => {
    setPlan(pending, cycle)
    setPending(null)
    setToast(`Switched to ${plans.find((item) => item.id === pending).name}`)
  }
  const pendingPlan = plans.find((item) => item.id === pending)
  const changeSummary = pendingPlan ? `${pendingPlan.name} adds ${pendingPlan.id === 'team' ? 'team invites, roles, and shared project progress.' : pendingPlan.id === 'pro' ? 'unlimited tasks and full analytics charts.' : 'the Free plan limits.'} Existing tasks remain unchanged. Demo pricing. No payment is processed.` : ''
  return <div className="billing-page">
    <BillingCurrentPlan />
    <div className="billing-switcher-heading"><div><div className="eyebrow">EXPLORE PLANS</div><h2>Switch your demo plan.</h2></div><div className="billing-cycle-toggle" role="radiogroup" aria-label="Billing cycle">{['monthly','yearly'].map((value)=><label className={cycle===value?'active':''} key={value}><input type="radio" name="billing-cycle-dashboard" checked={cycle===value} onChange={()=>setCycle(value)} />{value}</label>)}</div></div>
    <div className="billing-plan-grid"><AnimatePresence initial={false}>{plans.map((item)=><motion.div key={item.id} layout initial={{opacity:0}} animate={{opacity:1}} transition={reduceMotion?{duration:0}:{duration:.25}}><BillingPlanCard planId={item.id} cycle={cycle} current={item.id===plan.id} onSwitch={setPending}/></motion.div>)}</AnimatePresence></div>
    <BillingHistory />
    <div className="billing-demo-note"><strong>Demo billing only.</strong> No payment is processed, and there is no renewal.</div>
    {pendingPlan&&<ConfirmDialog title={`Switch to ${pendingPlan.name}?`} message={changeSummary} close={()=>setPending(null)} confirm={confirmSwitch} confirmLabel={`Switch to ${pendingPlan.name}`} />}
    <Link className="billing-back-link" to="/dashboard">Back to workspace</Link>
  </div>
}
