const yearlyPrice = (monthlyPrice) => Number((monthlyPrice * 0.8).toFixed(2))

export const plans = [
  {
    id: 'free',
    name: 'Free',
    tagline: 'A calm starting point for personal planning.',
    monthlyPrice: 0,
    yearlyMonthlyPrice: yearlyPrice(0),
    highlight: false,
    limits: {
      activeTasks: 25,
      workspaces: 1,
    },
    includes: null,
    features: {
      Tasks: [
        { name: 'Up to 25 active tasks', status: 'live' },
        { name: 'Drag-and-drop board', status: 'live' },
        { name: 'Search', status: 'live' },
      ],
      Planning: [
        { name: 'Calendar', status: 'live' },
        { name: '1 workspace', status: 'live' },
      ],
      Analytics: [
        { name: 'Summary analytics cards', status: 'live' },
      ],
      Collaboration: [],
      Support: [],
    },
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'More room and more insight for focused work.',
    monthlyPrice: 8,
    yearlyMonthlyPrice: yearlyPrice(8),
    highlight: true,
    limits: {
      activeTasks: Infinity,
      workspaces: 1,
    },
    includes: 'free',
    features: {
      Tasks: [
        { name: 'Unlimited tasks', status: 'live' },
        { name: 'Priority filters', status: 'live' },
        { name: 'Project filters', status: 'live' },
        { name: 'Saved filter views', status: 'soon' },
        { name: 'Recurring tasks', status: 'soon' },
      ],
      Planning: [],
      Analytics: [
        { name: 'Full analytics charts', status: 'live' },
      ],
      Collaboration: [],
      Support: [
        { name: 'Priority support', status: 'soon' },
      ],
    },
  },
  {
    id: 'team',
    name: 'Team',
    tagline: 'A shared view of progress for growing teams.',
    monthlyPrice: 15,
    yearlyMonthlyPrice: yearlyPrice(15),
    highlight: false,
    limits: {
      activeTasks: Infinity,
      workspaces: 1,
    },
    includes: 'pro',
    features: {
      Tasks: [],
      Planning: [],
      Analytics: [],
      Collaboration: [
        { name: 'Team directory with invites and roles', status: 'live' },
        { name: 'Shared project progress view', status: 'live' },
        { name: 'Activity log', status: 'soon' },
        { name: 'Real-time collaboration', status: 'soon' },
        { name: 'Admin controls', status: 'soon' },
      ],
      Support: [],
    },
  },
]

export const planById = Object.fromEntries(plans.map((plan) => [plan.id, plan]))
