export const TASK_STATUSES = ['Todo', 'In progress', 'Done']

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
  const source = tasks
    .filter((task) => task.status === active.status && task.id !== activeId)
    .sort((a, b) => a.order - b.order)
  const targetIndex = overId ? destination.findIndex((task) => task.id === overId) : destination.length
  const insertAt = targetIndex < 0 ? destination.length : targetIndex
  destination.splice(insertAt, 0, { ...active, status })
  const positions = new Map(destination.map((task, index) => [task.id, index]))
  const sourcePositions = new Map(source.map((task, index) => [task.id, index]))

  return tasks.map((task) => {
    if (task.id === activeId) return { ...task, status, order: positions.get(activeId) }
    if (positions.has(task.id)) return { ...task, order: positions.get(task.id) }
    if (sourcePositions.has(task.id)) return { ...task, order: sourcePositions.get(task.id) }
    return task
  })
}
