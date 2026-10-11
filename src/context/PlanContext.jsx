import { createContext, useContext, useState } from 'react'
import { planById } from '../data/plans'
import { clearPlan as clearSavedPlan, getPlan, savePlan } from '../services/planService'

const PlanContext = createContext(null)

export function PlanProvider({ children }) {
  const [selection, setSelection] = useState(getPlan)
  const plan = { ...planById[selection.planId], billingCycle: selection.billingCycle }

  const setPlan = (planId, billingCycle = 'monthly') => {
    const next = savePlan(planId, billingCycle)
    setSelection(next)
  }

  const clearPlan = () => setSelection(clearSavedPlan())

  return (
    <PlanContext.Provider
      value={{
        plan,
        setPlan,
        clearPlan,
        limits: plan.limits,
        canAddTask: (activeTaskCount) => activeTaskCount < plan.limits.activeTasks,
        canViewFullAnalytics: plan.id === 'pro' || plan.id === 'team',
        canInviteMembers: plan.id === 'team',
      }}
    >
      {children}
    </PlanContext.Provider>
  )
}

export const usePlan = () => useContext(PlanContext)
