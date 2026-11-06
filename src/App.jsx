import { lazy, Suspense } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/public/Home'
import ProtectedRoute from './routes/ProtectedRoute'
import DashboardErrorBoundary from './components/ui/DashboardErrorBoundary'
import WaveBackground from './components/WaveBackground'
import { useToast } from './context/ToastContext'

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

function ToastNotice() {
  const { toast } = useToast()
  return toast ? <div className="toast-notice" role="status" aria-live="polite">{toast}</div> : null
}

export default function App() {
  const { pathname } = useLocation()
  const publicRoute = !pathname.startsWith('/dashboard')

  return (
    <>
      <WaveBackground />
      <ToastNotice />
      {publicRoute && <Navbar />}
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
          <Route path="/dashboard" element={<ProtectedRoute><DashboardErrorBoundary><Dashboard /></DashboardErrorBoundary></ProtectedRoute>} />
          <Route path="/dashboard/tasks" element={<ProtectedRoute><DashboardErrorBoundary><DashPage title="My tasks" sub="A focused list of everything on your plate."><Tasks /></DashPage></DashboardErrorBoundary></ProtectedRoute>} />
          <Route path="/dashboard/projects" element={<ProtectedRoute><DashboardErrorBoundary><DashPage title="Projects" sub="Big goals, broken into clear next steps."><Projects /></DashPage></DashboardErrorBoundary></ProtectedRoute>} />
          <Route path="/dashboard/calendar" element={<ProtectedRoute><DashboardErrorBoundary><DashPage title="Calendar" sub="See your work in time, not just in lists."><Calendar /></DashPage></DashboardErrorBoundary></ProtectedRoute>} />
          <Route path="/dashboard/team" element={<ProtectedRoute><DashboardErrorBoundary><DashPage title="Team" sub="The people making progress happen."><Team /></DashPage></DashboardErrorBoundary></ProtectedRoute>} />
          <Route path="/dashboard/analytics" element={<ProtectedRoute><DashboardErrorBoundary><DashPage title="Analytics" sub="Understand your momentum and improve it."><Analytics /></DashPage></DashboardErrorBoundary></ProtectedRoute>} />
          <Route path="/dashboard/billing" element={<ProtectedRoute><DashboardErrorBoundary><DashPage title="Billing" sub="Explore your demo plan and workspace limits."><Billing /></DashPage></DashboardErrorBoundary></ProtectedRoute>} />
          <Route path="/dashboard/settings" element={<ProtectedRoute><DashboardErrorBoundary><DashPage title="Settings" sub="Your workspace, your way."><Settings /></DashPage></DashboardErrorBoundary></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      {publicRoute && <Footer />}
    </>
  )
}
