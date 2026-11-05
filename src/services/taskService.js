import { api } from './api'
import { sortTasks } from '../utils/taskOrder'

export async function getTasks() {
  const { tasks } = await api('/api/tasks')
  return sortTasks(tasks)
}

export async function createTask(task) {
  const { task: createdTask } = await api('/api/tasks', {
    method: 'POST',
    body: task,
  })
  return createdTask
}

export async function updateTask(id, changes) {
  const { task } = await api(`/api/tasks/${id}`, {
    method: 'PATCH',
    body: changes,
  })
  return task
}

export async function deleteTask(id) {
  await api(`/api/tasks/${id}`, { method: 'DELETE' })
}

export async function reorderTasks(items) {
  await api('/api/tasks/reorder', {
    method: 'PATCH',
    body: items,
  })
}
