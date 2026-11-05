import { useState } from 'react'
import { X } from 'lucide-react'
import Button from './Button'
import Modal from './Modal'
import { TASK_STATUSES } from '../../utils/taskOrder'

const projects = ['Website refresh', 'Q4 Launch', 'Internal']
const priorities = ['High', 'Medium', 'Low']

function getInitialForm(task) {
  return {
    title: task?.title || '',
    description: task?.description || '',
    status: task?.status || 'Todo',
    priority: task?.priority || 'Medium',
    due: /^\d{4}-\d{2}-\d{2}$/.test(task?.due || '') ? task.due : '',
    project: task?.project || projects[0],
    tag: task?.tag || 'General',
  }
}

function isValidDate(value) {
  if (!value) return true
  const date = new Date(`${value}T00:00:00`)
  return !Number.isNaN(date.getTime()) && `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}` === value
}

export default function TaskModal({ close, save, task }) {
  const [form, setForm] = useState(() => getInitialForm(task))
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const editing = Boolean(task)
  const update = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: '' }))
  }
  const submit = async (event) => {
    event.preventDefault()
    const nextErrors = {}
    const title = form.title.trim()
    if (!title) nextErrors.title = 'Task name is required.'
    else if (title.length > 120) nextErrors.title = 'Task name must be 120 characters or fewer.'
    if (form.description.length > 500) nextErrors.description = 'Description must be 500 characters or fewer.'
    if (!isValidDate(form.due)) nextErrors.due = 'Enter a valid due date.'
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }
    setSaving(true)
    try {
      await save({ ...form, title, description: form.description.trim(), tag: form.tag.trim() || 'General' })
    } catch (error) {
      setErrors({ ...(error.errors || {}), form: error.message || 'Could not save this task.' })
    } finally {
      setSaving(false)
    }
  }

  return <Modal onClose={close} labelledBy="task-modal-title">
    <form className="task-form" onSubmit={submit}>
      <div className="card-head"><h3 id="task-modal-title">{editing ? 'Edit task' : 'New task'}</h3><button type="button" className="icon-btn" onClick={close} aria-label="Close task form"><X size={18}/></button></div>
      {errors.form && <small className="form-error" role="alert">{errors.form}</small>}
      <label>Task name<input autoFocus value={form.title} onChange={(event) => update('title', event.target.value)} placeholder="What needs doing?" aria-invalid={Boolean(errors.title)} aria-describedby={errors.title ? 'task-title-error' : undefined}/>{errors.title && <small className="form-error" id="task-title-error">{errors.title}</small>}</label>
      <label>Description<textarea rows="3" value={form.description} onChange={(event) => update('description', event.target.value)} placeholder="Add useful context..." aria-invalid={Boolean(errors.description)} aria-describedby={errors.description ? 'task-description-error' : undefined}/>{errors.description && <small className="form-error" id="task-description-error">{errors.description}</small>}</label>
      <div className="form-row"><label>Status<select value={form.status} onChange={(event) => update('status', event.target.value)}>{TASK_STATUSES.map((status) => <option key={status}>{status}</option>)}</select>{errors.status && <small className="form-error">{errors.status}</small>}</label><label>Priority<select value={form.priority} onChange={(event) => update('priority', event.target.value)}>{priorities.map((priority) => <option key={priority}>{priority}</option>)}</select>{errors.priority && <small className="form-error">{errors.priority}</small>}</label></div>
      <div className="form-row"><label>Project<select value={form.project} onChange={(event) => update('project', event.target.value)}>{projects.map((project) => <option key={project}>{project}</option>)}</select>{errors.project && <small className="form-error">{errors.project}</small>}</label><label>Due date<input type="date" value={form.due} onChange={(event) => update('due', event.target.value)} aria-invalid={Boolean(errors.due)} aria-describedby={errors.due ? 'task-due-error' : undefined}/>{errors.due && <small className="form-error" id="task-due-error">{errors.due}</small>}</label></div>
      <label>Tag<input value={form.tag} onChange={(event) => update('tag', event.target.value)} placeholder="General"/>{errors.tag && <small className="form-error">{errors.tag}</small>}</label>
      <div className="modal-actions"><Button type="button" variant="ghost" onClick={close} disabled={saving}>Cancel</Button><Button type="submit" disabled={saving}>{saving ? 'Saving...' : editing ? 'Save changes' : 'Create task'}</Button></div>
    </form>
  </Modal>
}
