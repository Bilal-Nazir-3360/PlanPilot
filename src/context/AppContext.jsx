import { useAuth } from './AuthContext'
import { useTasks } from './TaskContext'
import { useTheme } from './ThemeContext'
import { useToast } from './ToastContext'
import { usePlan } from './PlanContext'
import { useProjects } from './ProjectContext'
import { useTeam } from './TeamContext'

export function useApp() {
  const auth = useAuth()
  const taskState = useTasks()
  const theme = useTheme()
  const toast = useToast()
  const plan = usePlan()
  const projects = useProjects()
  const team = useTeam()
  return {
    ...taskState,
    ...theme,
    ...auth,
    ...toast,
    ...plan,
    ...projects,
    ...team,
    clearData: () => {
      theme.clearTheme()
      plan.clearPlan()
      toast.setToast('Theme and plan settings cleared')
    },
    addTask: async (task) => {
      await taskState.addTask(task)
      toast.setToast('Task added to your workspace')
    },
    updateTask: async (id, patch) => {
      await taskState.updateTask(id, patch)
      toast.setToast('Task updated')
    },
    deleteTask: async (id) => {
      await taskState.deleteTask(id)
      toast.setToast('Task deleted')
    },
    moveTask: (id, status, order) => {
      taskState.moveTask(id, status, order)
      toast.setToast('Task moved')
    },
    addReview: async (review) => {
      await taskState.addReview(review)
      toast.setToast('Thanks for sharing your experience')
    },
  }
}
