import { useState } from 'react'
import { closestCorners, DndContext, DragOverlay, KeyboardSensor, PointerSensor, TouchSensor, useDroppable, useSensor, useSensors } from '@dnd-kit/core'
import { sortableKeyboardCoordinates, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { MoreHorizontal, Pencil, Plus, Search, Trash2 } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button'
import DeleteConfirm from '../../components/ui/DeleteConfirm'
import TaskModal from '../../components/ui/TaskModal'
import { moveTask as moveTaskInOrder, reorderTasks, TASK_STATUSES } from '../../utils/taskOrder'

function TaskCard({ task, onEdit, onDelete, onStatusChange, overlay = false }) {
  const sortable = useSortable({ id: task.id, data: { status: task.status }, disabled: overlay })
  const style = overlay ? undefined : { transform: CSS.Transform.toString(sortable.transform), transition: sortable.transition }
  return <div ref={overlay ? undefined : sortable.setNodeRef} style={style} {...(overlay ? {} : sortable.attributes)} {...(overlay ? {} : sortable.listeners)} className={`task-card ${sortable.isDragging ? 'is-dragging' : ''}`}>
    <div className="task-top"><span className={`priority ${task.priority.toLowerCase()}`}>{task.priority}</span><div className="task-actions"><button className="icon-btn" onClick={() => onEdit(task)} aria-label={`Edit ${task.title}`}><Pencil size={14}/></button><button className="icon-btn" onClick={() => onDelete(task)} aria-label={`Delete ${task.title}`}><Trash2 size={14}/></button><MoreHorizontal size={16}/></div></div>
    <b>{task.title}</b>
    {task.description && <small className="task-description">{task.description}</small>}
    <small>{task.project}</small>
    <div className="task-foot"><span>{task.tag}</span><span>{task.due || 'No due date'}</span></div>
    {!overlay && <label className="task-status-select"><span className="sr-only">Status for {task.title}</span><select value={task.status} onChange={(event) => onStatusChange(task, event.target.value)} aria-label={`Status for ${task.title}`}>{TASK_STATUSES.map((status) => <option key={status}>{status}</option>)}</select></label>}
  </div>
}

function KanbanColumn({ status, tasks, onEdit, onDelete, onStatusChange, onAdd }) {
  const { setNodeRef, isOver } = useDroppable({ id: `column:${status}`, data: { status } })
  return <div ref={setNodeRef} className={`kanban-col ${isOver ? 'drop-target' : ''}`}><div className="col-title"><b>{status}</b><span>{tasks.length}</span></div><SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>{tasks.map((task) => <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} onStatusChange={onStatusChange}/>)}</SortableContext>{!tasks.length && <div className="empty-column">No tasks here yet.</div>}<button className="drop-hint" onClick={onAdd}><Plus size={15}/> Add task</button></div>
}

function getStatusFromOver(over) {
  if (!over) return null
  return over.data.current?.status || (typeof over.id === 'string' && over.id.startsWith('column:') ? over.id.slice(7) : null)
}

export default function Tasks() {
  const { tasks, setTasks, addTask, updateTask, deleteTask, moveTask, setToast, canAddTask } = useApp()
  const [query, setQuery] = useState('')
  const [priority, setPriority] = useState('All')
  const [project, setProject] = useState('All')
  const [modalTask, setModalTask] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [activeId, setActiveId] = useState(null)
  const [limitMessage, setLimitMessage] = useState('')
  const activeTaskCount = tasks.filter((task) => task.status !== 'Done').length
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )
  const isFiltered = Boolean(query.trim() || priority !== 'All' || project !== 'All')
  const projects = [...new Set(tasks.map((task) => task.project))]
  const filtered = tasks.filter((task) => {
    const matchesQuery = `${task.title} ${task.project} ${task.tag}`.toLowerCase().includes(query.toLowerCase())
    return matchesQuery && (priority === 'All' || task.priority === priority) && (project === 'All' || task.project === project)
  })
  const activeTask = tasks.find((task) => task.id === activeId)
  const openCreate = () => {
    if (!canAddTask(activeTaskCount)) {
      setLimitMessage('Free plan limit reached. Complete or delete an active task, or upgrade to add more.')
      return
    }
    setLimitMessage('')
    setModalTask(null)
    setShowModal(true)
  }
  const saveTask = (form) => {
    if (!modalTask && !canAddTask(activeTaskCount)) {
      setLimitMessage('Free plan limit reached. Complete or delete an active task, or upgrade to add more.')
      return
    }
    if (modalTask && modalTask.status === 'Done' && form.status !== 'Done' && !canAddTask(activeTaskCount)) {
      setLimitMessage('Free plan limit reached. Complete or delete an active task, or upgrade to move this task back to active.')
      return
    }
    if (modalTask) updateTask(modalTask.id, form)
    else addTask(form)
    setShowModal(false)
    setModalTask(null)
  }
  const confirmDelete = () => {
    deleteTask(deleteTarget.id)
    setDeleteTarget(null)
  }
  const changeStatus = (task, status) => {
    if (task.status === 'Done' && status !== 'Done' && !canAddTask(activeTaskCount)) {
      setLimitMessage('Free plan limit reached. Complete or delete an active task, or upgrade to move this task back to active.')
      return
    }
    setLimitMessage('')
    moveTask(task.id, status, tasks.filter((item) => item.status === status).length)
  }
  const handleDragStart = ({ active }) => setActiveId(active.id)
  const handleDragCancel = () => setActiveId(null)
  const handleDragEnd = ({ active, over }) => {
    setActiveId(null)
    if (isFiltered || !over || active.id === over.id) return
    const task = tasks.find((item) => item.id === active.id)
    const status = getStatusFromOver(over)
    if (!task || !status) return
    if (task.status === 'Done' && status !== 'Done' && !canAddTask(activeTaskCount)) {
      setLimitMessage('Free plan limit reached. Complete or delete an active task, or upgrade to move this task back to active.')
      return
    }
    setLimitMessage('')
    const nextTasks = status === task.status ? reorderTasks(tasks, active.id, over.id) : moveTaskInOrder(tasks, active.id, status, typeof over.id === 'number' ? over.id : null)
    if (nextTasks !== tasks) {
      setTasks(nextTasks)
      setToast('Task moved')
    }
  }

  return <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragCancel={handleDragCancel} onDragEnd={handleDragEnd}>
    <div className="page-toolbar"><div className="task-filters"><div className="search"><Search size={17}/><input placeholder="Search tasks..." value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search tasks"/></div><select value={priority} onChange={(event) => setPriority(event.target.value)} aria-label="Filter by priority"><option>All</option><option>High</option><option>Medium</option><option>Low</option></select><select value={project} onChange={(event) => setProject(event.target.value)} aria-label="Filter by project"><option>All</option>{projects.map((item) => <option key={item}>{item}</option>)}</select></div><Button onClick={openCreate}><Plus size={17}/> New task</Button></div>
    {limitMessage && <p className="plan-limit-message" role="alert">{limitMessage} <Link to="/dashboard/billing">Upgrade</Link></p>}
    {isFiltered && <p className="filter-hint" role="status">Filtering is active. Drag-and-drop reordering is disabled until filters are cleared.</p>}
    {!filtered.length && <div className="empty-state" role="status">{tasks.length ? 'No tasks match your search or filters.' : 'No tasks yet. Create your first task to get started.'}<button className="text-link" onClick={openCreate}>Create a task</button></div>}
    <div className="kanban">{TASK_STATUSES.map((status) => <KanbanColumn key={status} status={status} tasks={filtered.filter((task) => task.status === status).sort((a, b) => a.order - b.order)} onEdit={(task) => { setModalTask(task); setShowModal(true) }} onDelete={setDeleteTarget} onStatusChange={changeStatus} onAdd={openCreate}/>)}</div>
    <DragOverlay>{activeTask ? <TaskCard task={activeTask} overlay onEdit={() => {}} onDelete={() => {}} onStatusChange={() => {}}/> : null}</DragOverlay>
    {showModal && <TaskModal task={modalTask} close={() => { setShowModal(false); setModalTask(null) }} save={saveTask}/>}
    {deleteTarget && <DeleteConfirm task={deleteTarget} close={() => setDeleteTarget(null)} confirm={confirmDelete}/>}
  </DndContext>
}
