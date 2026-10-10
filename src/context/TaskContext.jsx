import { createContext, useContext, useEffect, useState } from 'react'
import { getTasks, saveTasks } from '../services/taskService'
import { getReviews, saveReviews } from '../services/reviewService'
import seedReviews from '../data/reviews'

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
  const addReview = (review) => setReviews((current) => [{ ...review, id: Date.now(), date: new Date().toISOString().slice(0, 10) }, ...current])
  const clearTasks = () => setTasks([])
  const resetReviews = () => setReviews(seedReviews)
  return <TaskContext.Provider value={{ tasks, setTasks, reviews, addTask, updateTask, deleteTask, moveTask, addReview, clearTasks, resetReviews }}>{children}</TaskContext.Provider>
}
export const useTasks = () => useContext(TaskContext)
