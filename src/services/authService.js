import { api } from './api'

export const signup = (name, email, password) =>
  api('/api/auth/signup', { method: 'POST', body: { name, email, password } })
    .then(({ user }) => user)

export const login = (email, password) =>
  api('/api/auth/login', { method: 'POST', body: { email, password } })
    .then(({ user }) => user)

export const logout = () =>
  api('/api/auth/logout', { method: 'POST' })

export const getCurrentUser = async () => {
  try {
    const { user } = await api('/api/auth/me')
    return user
  } catch (error) {
    if (error.status === 401) return null
    throw error
  }
}
