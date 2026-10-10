import { Route, Routes } from 'react-router-dom'
import AmbientBackground from './components/AmbientBackground'
import About from './pages/public/About'
import Contact from './pages/public/Contact'
import Features from './pages/public/Features'
import Home from './pages/public/Home'
import Login from './pages/public/Login'
import NotFound from './pages/public/NotFound'
import Privacy from './pages/public/Privacy'
import Pricing from './pages/public/Pricing'
import Reviews from './pages/public/Reviews'
import Signup from './pages/public/Signup'
import Terms from './pages/public/Terms'
import Analytics from './pages/dashboard/Analytics'
import Calendar from './pages/dashboard/Calendar'
import Dashboard from './pages/dashboard/Dashboard'
import DashPage from './pages/dashboard/DashPage'
import Projects from './pages/dashboard/Projects'
import Settings from './pages/dashboard/Settings'
import Tasks from './pages/dashboard/Tasks'
import Team from './pages/dashboard/Team'
import ProtectedRoute from './routes/ProtectedRoute'

export default function App() {
  return (
    <>
      <AmbientBackground />
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
        <Route path="/dashboard/settings" element={<ProtectedRoute><DashPage title="Settings" sub="Your workspace, your way."><Settings /></DashPage></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
