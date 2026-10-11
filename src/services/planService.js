import { getItem, removeItem, setItem } from './storage'

const PLAN_KEY = 'pp_plan'
const DEFAULT_PLAN_ID = 'free'
const DEFAULT_BILLING_CYCLE = 'monthly'
const validPlanIds = new Set(['free', 'pro', 'team'])
const validBillingCycles = new Set(['monthly', 'yearly'])

const defaultPlanState = () => ({
  planId: DEFAULT_PLAN_ID,
  billingCycle: DEFAULT_BILLING_CYCLE,
  changedAt: new Date().toISOString(),
  history: [],
})

const normalizePlanState = (saved) => {
  if (!saved || typeof saved !== 'object') return defaultPlanState()

  const planId = validPlanIds.has(saved.planId) ? saved.planId : DEFAULT_PLAN_ID
  const billingCycle = validBillingCycles.has(saved.billingCycle)
    ? saved.billingCycle
    : DEFAULT_BILLING_CYCLE
  const history = Array.isArray(saved.history) ? saved.history : []

  return {
    planId,
    billingCycle,
    changedAt: typeof saved.changedAt === 'string' ? saved.changedAt : new Date().toISOString(),
    history,
  }
}

export const getPlan = () => {
  try {
    return normalizePlanState(getItem(PLAN_KEY, null))
  } catch {
    return defaultPlanState()
  }
}

export const savePlan = (planId, billingCycle = DEFAULT_BILLING_CYCLE) => {
  try {
    const current = getPlan()
    const next = normalizePlanState({
      planId,
      billingCycle,
      changedAt: new Date().toISOString(),
      history: [...current.history, current],
    })
    setItem(PLAN_KEY, next)
    return next
  } catch {
    return getPlan()
  }
}

export const clearPlan = () => {
  try {
    removeItem(PLAN_KEY)
  } catch {
    // Storage failures leave the provider to restore its in-memory free state.
  }
  return defaultPlanState()
}
