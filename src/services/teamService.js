import { api } from './api'

export async function getTeamMembers() {
  const { teamMembers } = await api('/api/team')
  return Array.isArray(teamMembers) ? teamMembers : []
}

export async function createTeamMember(member) {
  const { teamMember } = await api('/api/team', { method: 'POST', body: member })
  return teamMember
}

export async function updateTeamMember(id, changes) {
  const { teamMember } = await api(`/api/team/${id}`, { method: 'PATCH', body: changes })
  return teamMember
}

export async function deleteTeamMember(id) {
  await api(`/api/team/${id}`, { method: 'DELETE' })
}
