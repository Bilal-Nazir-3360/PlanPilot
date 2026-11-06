import { useState } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import Button from '../../components/ui/Button'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import Modal from '../../components/ui/Modal'
import SpotlightCard from '../../components/ui/SpotlightCard'
import Reveal from '../../components/ui/Reveal'
import { useApp } from '../../context/AppContext'

const colors = ['var(--chart-series)', 'var(--chart-secondary)', 'var(--chart-tertiary)']

function ProjectForm({ project, onSave, onClose }) {
  const [form, setForm] = useState({ name: project?.name || '', description: project?.description || '' })
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const submit = async (event) => {
    event.preventDefault()
    const next = {}
    if (!form.name.trim()) next.name = 'Project name is required.'
    if (Object.keys(next).length) { setErrors(next); return }
    setSaving(true)
    try { await onSave({ name: form.name.trim(), description: form.description.trim() }); onClose() } catch (error) { setErrors({ ...(error.errors || {}), form: error.message }) } finally { setSaving(false) }
  }
  return <Modal onClose={onClose} labelledBy="project-form-title"><form className="task-form" onSubmit={submit}><div className="modal-header card-head"><h3 id="project-form-title">{project ? 'Edit project' : 'New project'}</h3></div><div className="modal-body">{errors.form && <small className="form-error" role="alert">{errors.form}</small>}<label>Project name<input autoFocus value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} aria-invalid={Boolean(errors.name)}/>{errors.name && <small className="form-error">{errors.name}</small>}</label><label>Description<textarea rows="3" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })}/></label></div><div className="modal-footer modal-actions"><Button type="button" variant="ghost" onClick={onClose}>Cancel</Button><Button type="submit" disabled={saving}>{saving ? 'Saving…' : project ? 'Save changes' : 'Create project'}</Button></div></form></Modal>
}

export default function Projects() {
  const { projects, loading, error, reloadProjects, addProject, updateProject, deleteProject, setToast } = useApp()
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const save = (project) => editing?.id ? updateProject(String(editing.id), project) : addProject(project)
  const confirmDelete = async () => { try { await deleteProject(deleting.id); setDeleting(null) } catch (deleteError) { setToast(deleteError.message || 'Could not delete the project.') } }
  if (loading) return <div className="review-empty" role="status">Loading projects…</div>
  if (error) return <div className="review-empty" role="alert"><h3>Could not load projects.</h3><p>{error.message}</p><button className="btn ghost" onClick={reloadProjects}>Retry</button></div>
  return <div className="projects-page"><div className="page-toolbar"><p className="muted">Keep the big picture in view.</p><Button onClick={() => setEditing({})}><Plus size={17}/> New project</Button></div>{!projects.length ? <div className="review-empty"><h3>No projects yet.</h3><p>Create your first project to organize tasks.</p></div> : <div className="project-grid">{projects.map((project, index) => { const color = colors[index % colors.length]; const percent = Number.isFinite(Number(project.percent)) ? Math.max(0, Math.min(100, Number(project.percent))) : 0; return <Reveal key={project.id} delay={index * .06}><SpotlightCard className="card project-detail"><div className="project-banner" style={{ background: color }}/><div className="project-detail-body"><div className="project-icon" style={{ background: color }}>✦</div><div className="card-head"><h3>{project.name}</h3><div><button className="icon-btn" onClick={() => setEditing(project)} aria-label={`Edit ${project.name}`}><Pencil size={15}/></button><button className="icon-btn" onClick={() => setDeleting(project)} aria-label={`Delete ${project.name}`}><Trash2 size={15}/></button></div></div><p className="muted">{project.description || 'A focused space for your best work.'}</p><div className="progress"><i style={{ width: `${percent}%`, background: color }}/></div><div className="project-meta"><span>{project.doneTasks || 0}/{project.totalTasks || 0} tasks</span><span>{percent}% complete</span></div></div></SpotlightCard></Reveal> })}</div>}{editing && <ProjectForm project={editing.id ? editing : null} onSave={save} onClose={() => setEditing(null)}/>} {deleting && <ConfirmDialog title="Delete this project?" message="Its tasks will remain, but their project will be cleared." close={() => setDeleting(null)} confirm={confirmDelete} confirmLabel="Delete project"/>}</div>
}
