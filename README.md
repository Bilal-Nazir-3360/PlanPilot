# PlanPilot

PlanPilot is a polished React 18 task-management SaaS prototype for focused teams. It combines tasks, projects, planning, team visibility, and lightweight analytics in one responsive workspace with a calm dark/gold visual system.

This repository contains the PlanPilot frontend application. Authentication and persistence are intentionally local so the project can be run without a backend.

## Overview

PlanPilot has two experiences:

- **Public marketing site** for explaining the product and converting visitors.
- **Protected workspace** for planning and tracking day-to-day work.

The app seeds an Acme workspace with tasks, projects, calendar items, team members, and analytics data. A user can sign in locally, manage tasks, switch themes, open the workspace help widget, and clear locally stored workspace data.

The visual system includes a compact animated network illustration inspired by connected workspaces. It is intentionally positioned behind the interface with low-contrast lines, softly pulsing nodes, and reduced-motion support so it adds atmosphere without making the content difficult to read.

## Features

### Public experience

- Home page with product positioning, calls to action, and feature highlights.
- Features, pricing, reviews, about, contact, privacy, and terms pages.
- Responsive marketing navigation and footer.
- Basic SEO title, description, viewport, and theme-color metadata.
- Friendly fallback 404 page.

### Workspace experience

- Demo login and signup flow with protected dashboard routes.
- Overview dashboard with summary metrics, progress chart, active projects, and upcoming tasks.
- Task workspace with:
  - Seeded demo tasks
  - Search across task title, project, and tag
  - Kanban status columns
  - Task creation modal
  - Priority, due-date, project, and tag metadata
  - Drag-and-drop-ready task cards
- Project cards with completion progress and member counts.
- Calendar view with monthly grid and project events.
- Team directory with member roles and invite action.
- Analytics view with velocity, on-time rate, cycle time, and Recharts visualization.
- Settings page with dark/light mode toggle and clear-local-data action.
- Persistent dark/light mode controls in the public navigation, authentication pages, and dashboard.
- Subtle animated network background with separate dark- and light-mode contrast tuning.
- Responsive navigation controls and background scaling for mobile screens.
- Sidebar navigation with active route state.
- Floating workspace help widget.
- Toast notifications for key local actions.
- Responsive layouts for desktop, tablet, and mobile.

### Persistence and state

- Context API for application state.
- `localStorage` persistence for:
  - `pp_tasks`
  - `pp_user`
  - `pp_theme`
- Seed data automatically restores a useful demo workspace when no local task data exists.

## Tech stack

- React 18
- Vite
- JavaScript/JSX
- React Router v6
- Tailwind CSS with custom CSS styling
- Framer Motion
- Recharts
- Lucide React
- Context API
- Browser localStorage
- Vercel SPA rewrite configuration

## Theme and motion behavior

Dark mode is the default and uses deep navy surfaces, gold actions, and cyan/teal ambient accents. Light mode uses warm off-white surfaces, readable slate text, teal active states, and softer network artwork. The selected mode is stored in `pp_theme` and is restored on the next visit.

The ambient network is decorative only, uses `aria-hidden="true"`, and never captures pointer input. Users who enable reduced motion in their operating system see the same illustration without animated movement.

## Folder structure

```text
PlanPilot/
├── index.html                 # Vite HTML entry and SEO metadata
├── package.json               # Scripts and dependencies
├── package-lock.json          # Locked dependency versions
├── vite.config.js             # React/Vite configuration
├── tailwind.config.js         # Tailwind content and theme configuration
├── postcss.config.js          # Tailwind/PostCSS pipeline
├── vercel.json                # SPA fallback rewrite for Vercel
├── .env.example               # Environment variable template
├── .gitignore
├── README.md
└── src/
    ├── main.jsx               # Routes, providers, pages, components, demo data
    └── styles.css             # Global theme, responsive layout, and component CSS
```

## Setup and local development

Requirements:

- Node.js 18 or newer
- npm 9 or newer

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

The app does not require a database, API key, or backend for the local flow. Use any valid-looking email and any password on `/login` or `/signup`.

## Local account note

There is no remote account service. Authentication is intentionally simulated in the browser:

1. Open `/login` or `/signup`.
2. Use `demo@planpilot.app` (or another email).
3. Use any password.
4. You will be redirected to `/dashboard`.

The signed-in user is stored in `localStorage`. Logging out removes `pp_user`; clearing workspace data removes the stored task set and leaves the app ready to reseed or accept new tasks.

## Build and preview

Create a production build:

```bash
npm run build
```

The optimized output is written to `dist/`. Preview that build locally:

```bash
npm run preview
```

## Deploy to Vercel

### Git-based deployment

1. Push the repository to GitHub, GitLab, or Bitbucket.
2. In Vercel, choose **Add New → Project**.
3. Import the repository.
4. Keep the detected Vite settings:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`
5. Deploy.

The included `vercel.json` rewrites unknown paths to `/index.html`, so direct navigation and refreshes on React Router routes work correctly.

### Vercel CLI

```bash
npm install -g vercel
vercel
vercel --prod
```

If environment-backed integrations are added later, copy `.env.example` into Vercel Project Settings and configure the corresponding variables. Do not commit `.env` files or secrets.

## GitHub publishing workflow

The source repository is:

`https://github.com/Bilal-Nazir-3360/PlanPilot`

After making changes, run the production build, review the working tree, and push the `master` branch:

```bash
npm run build
git status
git add -A
git commit -m "Describe the change"
git push origin master
```

Keep generated dependencies, build output, local environment files, and editor files excluded through `.gitignore`. Never commit passwords, API keys, or `.env` files.

## Route map

### Public routes

| Route | Purpose |
| --- | --- |
| `/` | Landing page |
| `/features` | Product capabilities |
| `/pricing` | Pricing overview |
| `/reviews` | Customer proof |
| `/about` | Company/product story |
| `/contact` | Contact information |
| `/login` | Demo sign-in |
| `/signup` | Demo account creation |
| `/privacy` | Privacy page |
| `/terms` | Terms page |

### Protected dashboard routes

| Route | Purpose |
| --- | --- |
| `/dashboard` | Workspace overview |
| `/dashboard/tasks` | Searchable Kanban task workspace |
| `/dashboard/projects` | Project progress and members |
| `/dashboard/calendar` | Monthly planning calendar |
| `/dashboard/team` | Team directory |
| `/dashboard/analytics` | Velocity and delivery analytics |
| `/dashboard/settings` | Theme and local-data controls |

## Assumptions

- This is a frontend demo, not a production multi-tenant backend.
- Authentication is a local simulation; credentials are not validated remotely.
- Seeded project, team, calendar, and analytics content is representative UI data.
- Task data is scoped to the current browser and is not synchronized between users or devices.
- The help chat is a local UI widget for workspace guidance.
- No external email, billing, notification, or collaboration integrations are configured.

## Future improvements

- Add a real authentication provider and server-side authorization.
- Persist workspaces, tasks, comments, and activity in a database.
- Add real-time collaboration, task comments, mentions, and notifications.
- Complete configurable drag-and-drop ordering and richer task editing.
- Add project creation/editing and invite flows backed by an API.
- Add recurring tasks, calendar synchronization, filters, saved views, and bulk actions.
- Connect analytics to event data instead of seeded chart values.
- Connect the help widget to a secure support service.
- Add automated unit, accessibility, and end-to-end tests.
- Add CI checks, error monitoring, and production performance budgets.
