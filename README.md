<div align="center">

# PlanPilot

### Plan boldly. Ship clearly.

PlanPilot is a focused task-management workspace for teams that want a clearer view of their work and less operational noise. It brings tasks, projects, planning, team activity, analytics, and product guidance into one calm, responsive interface.

<p>
  <img src="https://img.shields.io/badge/status-prototype-e2b659?style=for-the-badge" alt="Prototype status" />
  <img src="https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react&logoColor=white" alt="React 18" />
  <img src="https://img.shields.io/badge/Vite-powered-646cff?style=for-the-badge&logo=vite&logoColor=white" alt="Vite powered" />
</p>

</div>

## Highlights

- Focused dashboard for tasks, projects, calendar, team, and analytics.
- Complete Kanban task workspace with create, edit, delete, search, priorities, due dates, tags, and status controls.
- Real drag-and-drop with dnd-kit for reordering tasks and moving them between Todo, In progress, and Done.
- Keyboard, pointer, and touch drag sensors with a visible drag overlay and empty-column drop targets.
- Safe task-data migration for older `pp_tasks` records, including persisted ordering and new task descriptions.
- Local demo authentication with protected dashboard routes.
- Community reviews with star ratings and persistent submissions.
- Dark/light theme with persistence and reduced-motion support.
- Reusable SpotlightCard, tilt, reveal, animated Modal, and ConfirmDialog primitives with touch and accessibility support.
- Premium `/features` page with honest Live/Preview/Coming soon badges, product mockup, category tabs, interactive sample demos, and roadmap.
- Responsive public marketing pages, authentication screens, and workspace layouts.
- Reusable contexts, services, UI components, and page modules ready for a future API.
- Animated ambient background that adapts to the active theme without blocking interaction.
- Visual animations respect reduced-motion preferences and keep draggable task cards sensor-safe.
- Route pages are lazy-loaded and production dependencies are split into React, motion, charts, and dnd vendor chunks to reduce the initial bundle.

## Tech stack

- React 18 and Vite
- React Router
- Context API
- Framer Motion
- Recharts
- Lucide React
- dnd-kit
- Tailwind CSS with custom CSS
- Browser localStorage for the prototype

> PlanPilot currently runs as a frontend prototype. The service layer is intentionally separated so authentication and persistence can later move to an Express/MongoDB API without rewriting the UI.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

Create a production build:

```bash
npm run build
npm run preview
```

## Demo flow

1. Open `/login` or `/signup`.
2. Use any valid-looking email and password.
3. Continue to the protected `/dashboard`.
4. Explore tasks, projects, calendar, team, analytics, and settings.

The prototype stores demo state in these browser keys:

- `pp_user`
- `pp_tasks`
- `pp_reviews`
- `pp_theme`

### Task workspace

The Tasks page supports:

- Creating tasks with title, description, status, priority, due date, project, and tag.
- Editing and deleting existing tasks with accessible modal dialogs.
- Searching by title, project, or tag.
- Filtering by priority and project.
- Reordering tasks within a column and moving them between columns with drag-and-drop.
- Changing status directly from a task card for touch-friendly use.

Drag-and-drop reordering is intentionally disabled while search or filters are active so visible ordering cannot conflict with hidden tasks. Clear the active filters to reorder the full board.

## Route map

### Public

`/` · `/features` · `/pricing` · `/reviews` · `/about` · `/contact` · `/privacy` · `/terms`

### Authentication

`/login` · `/signup`

### Workspace

`/dashboard` · `/dashboard/tasks` · `/dashboard/projects` · `/dashboard/calendar` · `/dashboard/team` · `/dashboard/analytics` · `/dashboard/settings`

The `/features` page is a product tour: live task and theme capabilities are marked separately from sample-data previews and future roadmap items. Live feature details link directly into the demo login flow.

## Project structure

```text
src/
├── App.jsx                 # Route definitions
├── main.jsx                # React bootstrap, router, providers, styles
├── components/             # Layouts, animated UI primitives, ambient background
├── context/                # Auth, task, theme, and toast state
├── data/                   # Seed tasks, projects, reviews, and workspace data
├── pages/                  # Public and dashboard pages
├── routes/                 # Protected route guard
├── services/               # Storage, auth, task, and review boundaries
└── styles.css              # Global visual system and responsive styles
```

## Project status

PlanPilot is a polished product-flow prototype designed to demonstrate a focused team workspace. It does not yet include a production database, remote authentication, billing, or server-side APIs.

---

Built with React, Vite, and a bias toward calmer workdays.
