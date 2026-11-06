import { api } from './api'

export async function getProjects() {
  const { projects } = await api('/api/projects')
  return Array.isArray(projects) ? projects : []
}

export async function createProject(project) {
  const { project: created } = await api('/api/projects', { method: 'POST', body: project })
  return created
}

export async function updateProject(id, changes) {
  const { project } = await api(`/api/projects/${id}`, { method: 'PATCH', body: changes })
  return project
}

export async function deleteProject(id) {
  await api(`/api/projects/${id}`, { method: 'DELETE' })
}
