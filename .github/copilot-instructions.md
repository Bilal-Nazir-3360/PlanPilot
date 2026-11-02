# PlanPilot rules
React 18 + Vite, React Router, Framer Motion, Tailwind + custom CSS in src/styles.css, dark/gold theme with light mode, lazy-loaded routes.
- No new dependencies. Never touch .env files. Only src/services/ may use localStorage.
- Both themes, prefers-reduced-motion respected, animate only transform and opacity, 44px touch targets, WCAG AA contrast, one h1 per page, mobile-first, no horizontal page scroll.
- Honesty: portfolio project. No fake customers, logos, testimonials, awards, or invented stats. Label sample data. Only claim features that work today. Personal details come from src/data/site.js as obvious placeholders.
- Be economical: read only the files the task needs, do not refactor unrelated code, do not run the dev server.
- Finish by running "npm run build" once, then reply in at most 5 lines: files changed and any problem.
