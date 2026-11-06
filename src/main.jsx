import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { PlanProvider } from './context/PlanContext'
import { TaskProvider } from './context/TaskContext'
import { ProjectProvider } from './context/ProjectContext'
import { TeamProvider } from './context/TeamContext'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './context/ToastContext'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <AuthProvider>
      <PlanProvider>
        <ThemeProvider>
          <ToastProvider>
            <TaskProvider>
              <ProjectProvider>
                <TeamProvider>
                  <App />
                </TeamProvider>
              </ProjectProvider>
            </TaskProvider>
          </ToastProvider>
        </ThemeProvider>
      </PlanProvider>
    </AuthProvider>
  </BrowserRouter>,
)
