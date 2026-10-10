import seedTasks from '../data/tasks'
import { getItem, setItem } from './storage'

export const getTasks = () => getItem('pp_tasks', null) || seedTasks
export const saveTasks = (tasks) => setItem('pp_tasks', tasks)
