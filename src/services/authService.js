import { getItem, removeItem, setItem } from './storage'

export const getUser = () => getItem('pp_user', null)
export const saveUser = (user) => setItem('pp_user', user)
export const logout = () => removeItem('pp_user')
export const login = (email) => ({ email, name: email.split('@')[0] })
