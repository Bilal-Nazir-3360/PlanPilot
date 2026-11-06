export const siteName = 'PlanPilot'
export const BACKGROUND_ANIMATION = true
export const NAV_MODE = 'always-collapsed'
export const tagline = 'A focused task-management workspace for clearer planning and follow-through.'
export const githubUrl = 'https://github.com/Bilal-Nazir-3360'
export const linkedinUrl = 'https://www.linkedin.com/in/mbilal-nazir'
export const portfolioUrl = 'https://bilal-nazir.vercel.app/'
export const contactEmail = 'bachohan786@gmail.com'
export const authorName = 'Muhammad Bilal Nazir'
export const location = 'Based in Pakistan, open to remote work'
export const roleLine = 'CS graduate, full-stack and AI/ML developer'
export const lookingFor = 'Associate Software Engineer, full-stack (MERN), frontend, backend, and junior AI/ML roles'
export const privacyLastUpdated = '2026-10-13'
export const demoPassword = 'planpilot-demo'
export const aboutStory = {
  heroLine: 'PlanPilot is a task-management app I built to practise product design, React architecture, and accessible UI. For now it runs entirely in the browser.',
  why: 'I built PlanPilot to show that I can design and build a complete product interface, not just single components. A task manager is familiar enough that anyone can judge it quickly, and it covers the front-end work I wanted to practise: routing, shared state, forms, drag-and-drop, and a consistent visual system.',
  learned: 'I learned to keep data access behind a service layer, so the interface never touches storage directly and a real backend can replace it later. I also learned how to make drag-and-drop work with keyboard and touch as well as the mouse, how to validate forms properly, and how to respect reduced-motion and contrast needs from the start instead of adding them at the end.',
  next: 'Next is a real backend: an Express and MongoDB API with JWT authentication, so accounts and tasks persist beyond one browser. After that I plan to add automated tests, a CI check on every push, and real-time collaboration.',
}

export const isRealValue = (value) => Boolean(value && !/^\[.*\]$/.test(value) && !/^your[- ]/i.test(value) && !/example\.com|your-profile|your-username/i.test(value))

export const navLinks = [
  { label: 'Features', to: '/features' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Reviews', to: '/reviews' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export const footerLinkGroups = [
  {
    label: 'Product',
    links: [
      { label: 'Features', to: '/features' },
      { label: 'Pricing', to: '/pricing' },
      { label: 'Reviews', to: '/reviews' },
    ],
  },
  {
    label: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Contact', to: '/contact' },
      { label: 'LinkedIn', href: linkedinUrl },
    ],
  },
  {
    label: 'Legal',
    links: [
      { label: 'Privacy', to: '/privacy' },
      { label: 'Terms', to: '/terms' },
    ],
  },
]
