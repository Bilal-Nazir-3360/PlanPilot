import { useState } from 'react'
import { closestCorners, DndContext, DragOverlay, KeyboardSensor, PointerSensor, TouchSensor, useDroppable, useSensor, useSensors } from '@dnd-kit/core'
import { sortableKeyboardCoordinates, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { MoreHorizontal, Plus, Search } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button'
import DeleteConfirm from '../../components/ui/DeleteConfirm'
import TaskModal from '../../components/ui/TaskModal'
import { moveTask as moveTaskInOrder, reorderTasks as reorderTasksInOrder, TASK_STATUSES } from '../../utils/taskOrder'

function TaskCard({ task, onEdit, onDelete, onStatusChange, overlay = false }) {
  const sortable = useSortable({ id: task.id, data: { status: task.status }, disabled: overlay })
  const [menuOpen, setMenuOpen] = useState(false)
  const style = overlay ? undefined : { transform: CSS.Transform.toString(sortable.transform), transition: sortable.transition }
  const runAction = (action) => {
    setMenuOpen(false)
    action()
  }
  return <div ref={overlay ? undefined : sortable.setNodeRef} style={style} {...(overlay ? {} : sortable.attributes)} {...(overlay ? {} : sortable.listeners)} className={`task-card ${sortable.isDragging ? 'is-dragging' : ''}`}>
    <div className="task-top"><span className={`priority ${task.priority.toLowerCase()}`}>{task.priority}</span><span className="task-due">{task.due || 'No due date'}</span>{!overlay && <div className="task-menu"><button type="button" className="icon-btn task-menu-trigger" onClick={() => setMenuOpen((value) => !value)} aria-label={`Actions for ${task.title}`} aria-haspopup="menu" aria-expanded={menuOpen}><MoreHorizontal size={18}/></button>{menuOpen && <div className="task-menu-list" role="menu" aria-label={`Actions for ${task.title}`}><button type="button" role="menuitem" onClick={() => runAction(() => onEdit(task))}>Edit</button>{TASK_STATUSES.map((status) => <button type="button" role="menuitem" key={status} onClick={() => runAction(() => onStatusChange(task, status))}>Move to {status}</button>)}<button type="button" role="menuitem" onClick={() => runAction(() => onDelete(task))}>Delete</button></div>}</div>}</div>
    <b className="task-title">{task.title}</b>
    <div className="task-meta"><span className="task-project">{task.project || 'No project'}</span>{task.tag && <span className="task-tag">{task.tag}</span>}</div>
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
  const { tasks, loading, error, reloadTasks, addTask, updateTask, deleteTask, moveTask, reorderTasks, setToast, canAddTask } = useApp()
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
  const saveTask = async (form) => {
    if (!modalTask && !canAddTask(activeTaskCount)) {
      setLimitMessage('Free plan limit reached. Complete or delete an active task, or upgrade to add more.')
      return false
    }
    if (modalTask && modalTask.status === 'Done' && form.status !== 'Done' && !canAddTask(activeTaskCount)) {
      setLimitMessage('Free plan limit reached. Complete or delete an active task, or upgrade to move this task back to active.')
      return false
    }
    if (modalTask) await updateTask(modalTask.id, form)
    else await addTask(form)
    setShowModal(false)
    setModalTask(null)
    return true
  }
  const confirmDelete = async () => {
    try {
      await deleteTask(deleteTarget.id)
      setDeleteTarget(null)
    } catch (deleteError) {
      setToast(deleteError.message || 'Could not delete the task.')
    }
  }
  const changeStatus = async (task, status) => {
    if (task.status === 'Done' && status !== 'Done' && !canAddTask(activeTaskCount)) {
      setLimitMessage('Free plan limit reached. Complete or delete an active task, or upgrade to move this task back to active.')
      return
    }
    setLimitMessage('')
    const nextOrder = tasks.filter((item) => item.status === status).length
    try {
      await updateTask(task.id, { status, order: nextOrder })
    } catch (statusError) {
      setToast(statusError.message || 'Could not save the task status.')
    }
  }
  const handleDragStart = ({ active }) => setActiveId(active.id)
  const handleDragCancel = () => setActiveId(null)
  const handleDragEnd = async ({ active, over }) => {
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
    const overId = typeof over.id === 'string' && over.id.startsWith('column:') ? null : over.id
    const nextTasks = status === task.status ? reorderTasksInOrder(tasks, active.id, over.id) : moveTaskInOrder(tasks, active.id, status, overId)
    if (nextTasks !== tasks) {
      try {
        await reorderTasks(nextTasks)
        setToast('Task moved')
      } catch (statusError) {
        setToast(statusError.message || 'Could not save the task status.')
      }
    }
  }

  return <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragCancel={handleDragCancel} onDragEnd={handleDragEnd}>
    <div className="page-toolbar"><div className="task-filters"><div className="search"><Search size={17}/><input placeholder="Search tasks..." value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search tasks"/></div><select value={priority} onChange={(event) => setPriority(event.target.value)} aria-label="Priority: All"><option value="All">Priority: All</option><option value="High">Priority: High</option><option value="Medium">Priority: Medium</option><option value="Low">Priority: Low</option></select><select value={project} onChange={(event) => setProject(event.target.value)} aria-label="Project: All"><option value="All">Project: All</option>{projects.map((item) => <option key={item} value={item}>Project: {item}</option>)}</select>{isFiltered && <button type="button" className="filter-clear text-link" onClick={() => { setQuery(''); setPriority('All'); setProject('All') }}>Clear</button>}</div></div>
    {limitMessage && <p className="plan-limit-message" role="alert">{limitMessage} <Link to="/dashboard/billing">Upgrade</Link></p>}
    {isFiltered && <p className="filter-hint" role="status">Filtering is active. Drag-and-drop reordering is disabled until filters are cleared.</p>}
    {loading && <div className="tasks-loading" aria-busy="true" aria-label="Loading tasks"><div className="task-skeleton"/><div className="task-skeleton"/><div className="task-skeleton"/></div>}
    {!loading && error && <div className="empty-state task-error" role="alert"><span>Could not load your tasks. {error.message}</span><Button variant="ghost" onClick={reloadTasks}>Retry</Button></div>}
    {!loading && !error && !filtered.length && <div className="empty-state" role="status">{tasks.length ? 'No tasks match your search or filters.' : 'No tasks yet. Create your first task to get started.'}<button className="text-link" onClick={openCreate}>Create a task</button></div>}
    {!loading && !error && <div className="kanban">{TASK_STATUSES.map((status) => <KanbanColumn key={status} status={status} tasks={filtered.filter((task) => task.status === status).sort((a, b) => a.order - b.order)} onEdit={(task) => { setModalTask(task); setShowModal(true) }} onDelete={setDeleteTarget} onStatusChange={changeStatus} onAdd={openCreate}/>)}</div>}
    <DragOverlay>{activeTask ? <TaskCard task={activeTask} overlay onEdit={() => {}} onDelete={() => {}} onStatusChange={() => {}}/> : null}</DragOverlay>
    {showModal && <TaskModal task={modalTask} close={() => { setShowModal(false); setModalTask(null) }} save={saveTask}/>}
    {deleteTarget && <DeleteConfirm task={deleteTarget} close={() => setDeleteTarget(null)} confirm={confirmDelete}/>}
  </DndContext>
}
