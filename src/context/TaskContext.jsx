import { createContext, useContext, useEffect, useState } from 'react'
import { getTasks, saveTasks } from '../services/taskService'
import { addReview as addReviewToService, clearReviews as clearReviewsFromService, deleteReview as deleteReviewFromService, getReviews, saveReviews, updateReview as updateReviewInService } from '../services/reviewService'

const TaskContext = createContext(null)
export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(getTasks)
  const [reviews, setReviews] = useState(getReviews)
  useEffect(() => saveTasks(tasks), [tasks])
  useEffect(() => saveReviews(reviews), [reviews])
  const addTask = (task) => setTasks((current) => [{ ...task, id: Date.now() }, ...current])
  const updateTask = (id, patch) => setTasks((current) => current.map((task) => task.id === id ? { ...task, ...patch } : task))
  const deleteTask = (id) => setTasks((current) => current.filter((task) => task.id !== id))
  const moveTask = (id, status, order) => setTasks((current) => current.map((task) => task.id === id ? { ...task, status, order } : task))
  const addReview = (review) => {
    const result = addReviewToService(review)
    setReviews(result.reviews)
    return result
  }
  const updateReview = (id, changes) => {
    const result = updateReviewInService(id, changes)
    setReviews(result.reviews)
    return result
  }
  const deleteReview = (id) => setReviews(deleteReviewFromService(id))
  const clearTasks = () => setTasks([])
  const clearReviews = () => setReviews(clearReviewsFromService())
  return <TaskContext.Provider value={{ tasks, setTasks, reviews, addReview, updateReview, deleteReview, clearTasks, clearReviews }}>{children}</TaskContext.Provider>
}
export const useTasks = () => useContext(TaskContext)
