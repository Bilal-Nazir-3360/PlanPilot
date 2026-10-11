# PlanPilot

> A focused task-management workspace for clearer planning and follow-through.

[![React 18](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-powered-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-animations-EF008F)](https://motion.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
![Status: prototype](https://img.shields.io/badge/status-prototype-e2b659)

## What it is

PlanPilot is a React task-management workspace with a Kanban board, planning views, analytics, and a small public product site. It includes local demo authentication, reviews, and plan-based UI for exploring the workspace. This is a frontend-only prototype: data is stored in the browser, billing is a demo, and there is no backend yet.

## Features

### Public site

- Home, Features, Pricing, Reviews, About, Contact, Privacy, and Terms pages.
- Features page with live, preview, and coming-soon statuses plus interactive task demos.
- Reviews with validated submissions, sample-review labels, sorting, rating filters, text search, rating summary, edit/delete controls for the signed-in user's reviews, and browser-only persistence.
- Pricing page with Free, Pro, and Team demo plans, monthly/yearly display, comparison table, FAQ, and demo steps. No real payment flow.

### Workspace

- Seeded tasks and projects are demo workspace data; seeded reviews are labeled "Sample review".
- Task CRUD with title, description, status, priority, due date, project, and tag fields.
- dnd-kit drag-and-drop to reorder tasks within a status and move them between Todo, In progress, and Done.
- Task search plus priority and project filters.
- Calendar, Projects, Team, Analytics, Overview, and Settings pages.
- Theme switching between dark and light modes.
- Protected dashboard routes with local demo authentication.

### Plans (demo)

- Free, Pro, and Team plan selection with monthly/yearly display and browser-only plan-change history.
- Free active-task limit of 25; existing tasks are not deleted on downgrade.
- Free analytics shows summary cards while Pro and Team can view charts.
- Team invites are available on Team and show an upgrade prompt on Free and Pro.
- Billing page with current-plan usage, plan switching, confirmation dialog, and demo history.

## Tech stack

- React 18, React Router, and Vite
- Context API for auth, tasks/reviews, theme, toast, and plan state
- Framer Motion
- Tailwind CSS with custom CSS
- dnd-kit for drag-and-drop
- Recharts for analytics
- Lucide React icons
- Browser `localStorage` through the service layer

## Run locally

```bash
npm install
npm run dev
npm run build
npm run preview
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

Demo login:

- Use `demo@planpilot.app` and any password in the login form.
- Sign-up accepts `?plan=pro` or `?plan=team`, for example `/signup?plan=pro`.

## Route map

### Public and authentication

| Route | Page |
| --- | --- |
| `/` | Home |
| `/features` | Features |
| `/pricing` | Pricing |
| `/reviews` | Reviews |
| `/about` | About |
| `/contact` | Contact |
| `/privacy` | Privacy |
| `/terms` | Terms |
| `/login` | Login |
| `/signup` | Signup |

### Dashboard

| Route | Page |
| --- | --- |
| `/dashboard` | Dashboard overview |
| `/dashboard/tasks` | Tasks |
| `/dashboard/projects` | Projects |
| `/dashboard/calendar` | Calendar |
| `/dashboard/team` | Team |
| `/dashboard/analytics` | Analytics |
| `/dashboard/billing` | Demo billing |
| `/dashboard/settings` | Settings |

Dashboard routes require the local demo user.

## Project structure

```text
src/
├── App.jsx
├── main.jsx
├── components/
│   ├── layout/
│   └── ui/
├── context/
├── data/
├── hooks/
├── pages/
│   ├── dashboard/
│   └── public/
├── routes/
├── services/
└── utils/
```

## Data and persistence

Only files under `src/services/` access `localStorage`; contexts and pages use those services.

| Key | Stored data | Service |
| --- | --- | --- |
| `pp_user` | Local demo user | `authService.js` |
| `pp_tasks` | Tasks and task ordering | `taskService.js` |
| `pp_reviews` | Seeded and user-submitted reviews | `reviewService.js` |
| `pp_theme` | `dark` or `light` theme | `storage.js` via `ThemeContext` |
| `pp_plan` | Selected plan, billing cycle, and plan-change history | `planService.js` |

## Plans and limits

| Plan | Current limits and live behavior | Coming soon |
| --- | --- | --- |
| Free | 25 active tasks, 1 workspace, task board/search, calendar, summary analytics cards | — |
| Pro | Unlimited tasks, 1 workspace, priority/project filters, full analytics charts | Saved filter views, recurring tasks, priority support |
| Team | Everything in Pro, plus team directory, invites and roles, shared project progress | Activity log, real-time collaboration, admin controls |

Plan selection is a demo. No payment is processed.

## Accessibility and performance

- Reduced-motion preferences are respected by the implemented animations.
- Task drag-and-drop includes keyboard sensors.
- Route pages are lazy-loaded with a loading fallback.
- Production vendor chunks split React, motion, charts, and dnd-kit dependencies.

## Roadmap

- Express and MongoDB backend with JWT authentication
- Vitest and React Testing Library tests
- GitHub Actions CI
- Real-time collaboration
- Recurring tasks
- Projects CRUD
- Team CRUD

## License

MIT
