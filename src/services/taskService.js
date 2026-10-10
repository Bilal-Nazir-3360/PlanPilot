import seedTasks from '../data/tasks'
import { getItem, setItem } from './storage'
import { migrateTasks, sortTasks } from '../utils/taskOrder'

export const getTasks = () => {
  const saved = getItem('pp_tasks', null)
  return sortTasks(migrateTasks(saved || seedTasks))
}

export const saveTasks = (tasks) => setItem('pp_tasks', sortTasks(migrateTasks(tasks)))
