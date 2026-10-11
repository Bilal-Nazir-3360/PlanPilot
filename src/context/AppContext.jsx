import { useAuth } from './AuthContext'
import { useTasks } from './TaskContext'
import { useTheme } from './ThemeContext'
import { useToast } from './ToastContext'
import { usePlan } from './PlanContext'

export function useApp() {
  const auth = useAuth()
  const taskState = useTasks()
  const theme = useTheme()
  const toast = useToast()
  const plan = usePlan()
  return {
    ...taskState,
    ...theme,
    ...auth,
    ...toast,
    ...plan,
    clearData: () => {
      taskState.clearTasks()
      taskState.clearReviews()
      plan.clearPlan()
      toast.setToast('Workspace data cleared')
    },
    addTask: (task) => {
      taskState.addTask(task)
      toast.setToast('Task added to your workspace')
    },
    updateTask: (id, patch) => {
      taskState.updateTask(id, patch)
      toast.setToast('Task updated')
    },
    deleteTask: (id) => {
      taskState.deleteTask(id)
      toast.setToast('Task deleted')
    },
    moveTask: (id, status, order) => {
      taskState.moveTask(id, status, order)
      toast.setToast('Task moved')
    },
    addReview: (review) => {
      taskState.addReview({ ...review, ownerId: auth.user?.email || null })
      toast.setToast('Thanks for sharing your experience')
    },
  }
}
