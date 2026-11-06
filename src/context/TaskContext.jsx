import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import { useToast } from './ToastContext'
import { createTask, deleteTask as deleteTaskFromService, getTasks, reorderTasks as reorderTasksInService, updateTask as updateTaskInService } from '../services/taskService'
import { moveTask as moveTaskInOrder } from '../utils/taskOrder'
import { addReview as addReviewToService, deleteReview as deleteReviewFromService, getReviews, updateReview as updateReviewInService } from '../services/reviewService'

const TaskContext = createContext(null)
export function TaskProvider({ children }) {
  const { user, loading: authLoading } = useAuth()
  const { setToast } = useToast()
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reviews, setReviews] = useState([])
  const [reviewsLoading, setReviewsLoading] = useState(true)
  const [reviewsError, setReviewsError] = useState(null)
  const loadReviews = async () => {
    setReviewsLoading(true)
    setReviewsError(null)
    try {
      setReviews(await getReviews())
    } catch (loadError) {
      setReviewsError(loadError)
    } finally {
      setReviewsLoading(false)
    }
  }
  useEffect(() => { loadReviews() }, [])
  const loadTasks = async (isActive = () => true) => {
    setLoading(true)
    setError(null)
    try {
      const nextTasks = await getTasks()
      if (isActive()) setTasks(nextTasks)
    } catch (loadError) {
      if (isActive()) setError(loadError)
    } finally {
      if (isActive()) setLoading(false)
    }
  }
  useEffect(() => {
    if (authLoading) return
    if (!user) {
      setTasks([])
      setError(null)
      setLoading(false)
      return
    }
    let active = true
    loadTasks(() => active)
    return () => {
      active = false
    }
  }, [authLoading, user])
  const addTask = async (task) => {
    const createdTask = await createTask({ ...task, order: 0 })
    setTasks((current) => [...current, createdTask])
    return createdTask
  }
  const updateTask = async (id, patch) => {
    const updatedTask = await updateTaskInService(id, patch)
    setTasks((current) => current.map((task) => task.id === id ? updatedTask : task))
    return updatedTask
  }
  const deleteTask = async (id) => {
    await deleteTaskFromService(id)
    setTasks((current) => current.filter((task) => task.id !== id))
  }
  const reorderTasks = async (nextTasks) => {
    const previousTasks = tasks
    const changed = nextTasks.filter((task) => {
      const previous = previousTasks.find((item) => item.id === task.id)
      return previous && (previous.status !== task.status || previous.order !== task.order)
    })
    if (!changed.length) return
    setTasks(nextTasks)
    try {
      await reorderTasksInService(changed.map(({ id, status, order }) => ({ id, status, order })))
    } catch (reorderError) {
      setTasks(previousTasks)
      setToast(reorderError.message || 'Could not save the task order.')
    }
  }
  const moveTask = (id, status) => {
    const nextTasks = moveTaskInOrder(tasks, id, status)
    return reorderTasks(nextTasks)
  }
  const addReview = async (review) => {
    const created = await addReviewToService(review)
    setReviews((current) => [created, ...current])
    return created
  }
  const updateReview = async (id, changes) => {
    const updated = await updateReviewInService(id, changes)
    setReviews((current) => current.map((review) => review.id === id ? updated : review))
    return updated
  }
  const deleteReview = async (id) => {
    await deleteReviewFromService(id)
    setReviews((current) => current.filter((review) => review.id !== id))
  }
  const clearTasks = () => setTasks([])
  return <TaskContext.Provider value={{ tasks, setTasks, loading, error, reloadTasks: loadTasks, addTask, updateTask, deleteTask, moveTask, reorderTasks, reviews, reviewsLoading, reviewsError, reloadReviews: loadReviews, addReview, updateReview, deleteReview, clearTasks }}>{children}</TaskContext.Provider>
}
export const useTasks = () => useContext(TaskContext)
