import { useAuth } from './AuthContext'
import { useTasks } from './TaskContext'
import { useTheme } from './ThemeContext'
import { useToast } from './ToastContext'

export function useApp() {
  const auth = useAuth()
  const taskState = useTasks()
  const theme = useTheme()
  const toast = useToast()
  return {
    ...taskState,
    ...theme,
    ...auth,
    ...toast,
    clearData: () => {
      taskState.clearTasks()
      taskState.resetReviews()
      toast.setToast('Workspace data cleared')
    },
    addTask: (task) => {
      taskState.addTask(task)
      toast.setToast('Task added to your workspace')
    },
    addReview: (review) => {
      taskState.addReview(review)
      toast.setToast('Thanks for sharing your experience')
    },
  }
}
