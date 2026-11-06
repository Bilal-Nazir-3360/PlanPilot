import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import { createProject, deleteProject, getProjects, updateProject } from '../services/projectService'

const ProjectContext = createContext(null)

export function ProjectProvider({ children }) {
  const { user, loading: authLoading } = useAuth()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const reloadProjects = async () => {
    setLoading(true)
    setError(null)
    try {
      setProjects(await getProjects())
    } catch (loadError) {
      setError(loadError)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (authLoading) return
    if (!user) {
      setProjects([])
      setError(null)
      setLoading(false)
      return
    }
    reloadProjects()
  }, [authLoading, user])

  const addProject = async (project) => {
    const created = await createProject(project)
    setProjects((current) => [...current, created])
    return created
  }
  const editProject = async (id, changes) => {
    const updated = await updateProject(id, changes)
    setProjects((current) => current.map((project) => project.id === id ? updated : project))
    return updated
  }
  const removeProject = async (id) => {
    await deleteProject(id)
    setProjects((current) => current.filter((project) => project.id !== id))
  }

  return <ProjectContext.Provider value={{ projects, loading, error, reloadProjects, addProject, updateProject: editProject, deleteProject: removeProject }}>{children}</ProjectContext.Provider>
}

export const useProjects = () => useContext(ProjectContext)
