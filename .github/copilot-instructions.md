# PlanPilot rules
React 18 + Vite, React Router, Framer Motion, Tailwind + custom CSS in src/styles.css, dark/gold theme with light mode, lazy-loaded routes.
- No new dependencies. Never touch .env files. Only src/services/ may use localStorage.
- Both themes, prefers-reduced-motion respected, animate only transform and opacity, 44px touch targets, WCAG AA contrast, one h1 per page, mobile-first, no horizontal page scroll.
- Honesty: portfolio project. No fake customers, logos, testimonials, awards, or invented stats. Label sample data. Only claim features that work today. Personal details come from src/data/site.js as obvious placeholders.
- Be economical: read only the files the task needs, do not refactor unrelated code, do not run the dev server.
- Finish by running "npm run build" once, then reply in at most 5 lines: files changed and any problem.

## Design direction (applies to all UI work)
- Editorial, type-led look. Headlines: Instrument Serif. Body: Hanken Grotesk. Small labels: JetBrains Mono. Load them from Google Fonts in index.html with font-display: swap and a fallback stack.
- Large headlines, asymmetric layouts, thin divider lines, numbered section labels (01, 02, 03). Avoid identical 3-column card grids and icon-in-circle cards.
- Gold is an accent for one primary action per view. No gradient text, no glow blobs. Spotlight glow only on a few key cards.
- One signature motion per page; everything else is quiet.
- Copy is plain and specific. No words like unlock, supercharge, seamless, revolutionize.

