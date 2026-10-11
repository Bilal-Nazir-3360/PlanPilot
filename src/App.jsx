import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import AmbientBackground from './components/AmbientBackground'
import Home from './pages/public/Home'
import ProtectedRoute from './routes/ProtectedRoute'

const About = lazy(() => import('./pages/public/About'))
const Contact = lazy(() => import('./pages/public/Contact'))
const Features = lazy(() => import('./pages/public/Features'))
const Login = lazy(() => import('./pages/public/Login'))
const NotFound = lazy(() => import('./pages/public/NotFound'))
const Privacy = lazy(() => import('./pages/public/Privacy'))
const Pricing = lazy(() => import('./pages/public/Pricing'))
const Reviews = lazy(() => import('./pages/public/Reviews'))
const Signup = lazy(() => import('./pages/public/Signup'))
const Terms = lazy(() => import('./pages/public/Terms'))
const Analytics = lazy(() => import('./pages/dashboard/Analytics'))
const Billing = lazy(() => import('./pages/dashboard/Billing'))
const Calendar = lazy(() => import('./pages/dashboard/Calendar'))
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'))
const DashPage = lazy(() => import('./pages/dashboard/DashPage'))
const Projects = lazy(() => import('./pages/dashboard/Projects'))
const Settings = lazy(() => import('./pages/dashboard/Settings'))
const Tasks = lazy(() => import('./pages/dashboard/Tasks'))
const Team = lazy(() => import('./pages/dashboard/Team'))

function RouteFallback() {
  return <div className="route-fallback" role="status" aria-busy="true" aria-live="polite"><span className="route-spinner" aria-hidden="true"/>Loading page…</div>
}

export default function App() {
  return (
    <>
      <AmbientBackground />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/dashboard/tasks" element={<ProtectedRoute><DashPage title="My tasks" sub="A focused list of everything on your plate."><Tasks /></DashPage></ProtectedRoute>} />
          <Route path="/dashboard/projects" element={<ProtectedRoute><DashPage title="Projects" sub="Big goals, broken into clear next steps."><Projects /></DashPage></ProtectedRoute>} />
          <Route path="/dashboard/calendar" element={<ProtectedRoute><DashPage title="Calendar" sub="See your work in time, not just in lists."><Calendar /></DashPage></ProtectedRoute>} />
          <Route path="/dashboard/team" element={<ProtectedRoute><DashPage title="Team" sub="The people making progress happen."><Team /></DashPage></ProtectedRoute>} />
          <Route path="/dashboard/analytics" element={<ProtectedRoute><DashPage title="Analytics" sub="Understand your momentum and improve it."><Analytics /></DashPage></ProtectedRoute>} />
          <Route path="/dashboard/billing" element={<ProtectedRoute><DashPage title="Billing" sub="Explore your demo plan and workspace limits."><Billing /></DashPage></ProtectedRoute>} />
          <Route path="/dashboard/settings" element={<ProtectedRoute><DashPage title="Settings" sub="Your workspace, your way."><Settings /></DashPage></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  )
}
