export const TASK_STATUSES = ['Todo', 'In progress', 'Done']

export function migrateTask(task, index = 0) {
  return {
    ...task,
    id: task.id ?? Date.now() + index,
    title: typeof task.title === 'string' ? task.title : '',
    description: typeof task.description === 'string' ? task.description : '',
    project: typeof task.project === 'string' ? task.project : 'Internal',
    status: TASK_STATUSES.includes(task.status) ? task.status : 'Todo',
    priority: ['High', 'Medium', 'Low'].includes(task.priority) ? task.priority : 'Medium',
    due: typeof task.due === 'string' ? task.due : '',
    tag: typeof task.tag === 'string' ? task.tag : 'General',
    createdAt: task.createdAt || new Date().toISOString(),
    order: Number.isFinite(task.order) ? task.order : index,
  }
}

export function migrateTasks(tasks) {
  const source = Array.isArray(tasks) ? tasks : []
  const counters = Object.fromEntries(TASK_STATUSES.map((status) => [status, 0]))
  return source.map((task, index) => {
    const migrated = migrateTask(task, counters[task.status] ?? index)
    migrated.order = counters[migrated.status]
    counters[migrated.status] += 1
    return migrated
  })
}

export function sortTasks(tasks) {
  return [...tasks].sort((a, b) => {
    if (a.status !== b.status) return 0
    return (a.order ?? 0) - (b.order ?? 0)
  })
}

export function reorderTasks(tasks, activeId, overId) {
  const active = tasks.find((task) => task.id === activeId)
  const over = tasks.find((task) => task.id === overId)
  if (!active || !over || active.status !== over.status || active.id === over.id) return tasks

  const column = tasks.filter((task) => task.status === active.status).sort((a, b) => a.order - b.order)
  const oldIndex = column.findIndex((task) => task.id === activeId)
  const newIndex = column.findIndex((task) => task.id === overId)
  const nextColumn = [...column]
  const [moved] = nextColumn.splice(oldIndex, 1)
  nextColumn.splice(newIndex, 0, moved)
  const positions = new Map(nextColumn.map((task, index) => [task.id, index]))
  return tasks.map((task) => positions.has(task.id) ? { ...task, order: positions.get(task.id) } : task)
}

export function moveTask(tasks, activeId, status, overId = null) {
  const active = tasks.find((task) => task.id === activeId)
  if (!active || !TASK_STATUSES.includes(status)) return tasks

  const destination = tasks
    .filter((task) => task.status === status && task.id !== activeId)
    .sort((a, b) => a.order - b.order)
  const targetIndex = overId ? destination.findIndex((task) => task.id === overId) : destination.length
  const insertAt = targetIndex < 0 ? destination.length : targetIndex
  destination.splice(insertAt, 0, { ...active, status })
  const positions = new Map(destination.map((task, index) => [task.id, index]))

  return tasks.map((task) => {
    if (task.id === activeId) return { ...task, status, order: positions.get(activeId) }
    if (positions.has(task.id)) return { ...task, order: positions.get(task.id) }
    return task
  })
}
