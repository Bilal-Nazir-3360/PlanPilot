import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import { createTeamMember, deleteTeamMember, getTeamMembers, updateTeamMember } from '../services/teamService'

const TeamContext = createContext(null)

export function TeamProvider({ children }) {
  const { user, loading: authLoading } = useAuth()
  const [teamMembers, setTeamMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const reloadTeam = async () => {
    setLoading(true)
    setError(null)
    try {
      setTeamMembers(await getTeamMembers())
    } catch (loadError) {
      setError(loadError)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (authLoading) return
    if (!user) {
      setTeamMembers([])
      setError(null)
      setLoading(false)
      return
    }
    reloadTeam()
  }, [authLoading, user])

  const addMember = async (member) => {
    const created = await createTeamMember(member)
    setTeamMembers((current) => [...current, created])
    return created
  }
  const editMember = async (id, changes) => {
    const updated = await updateTeamMember(id, changes)
    setTeamMembers((current) => current.map((member) => member.id === id ? updated : member))
    return updated
  }
  const removeMember = async (id) => {
    await deleteTeamMember(id)
    setTeamMembers((current) => current.filter((member) => member.id !== id))
  }

  return <TeamContext.Provider value={{ teamMembers, loading, error, reloadTeam, addMember, updateMember: editMember, deleteMember: removeMember }}>{children}</TeamContext.Provider>
}

export const useTeam = () => useContext(TeamContext)
