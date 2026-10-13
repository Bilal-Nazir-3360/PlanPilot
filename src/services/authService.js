import { getItem, removeItem, setItem } from './storage'
import { hasAuthErrors, validateLogin, validateSignup } from '../utils/validateAuth'

export const getUser = () => getItem('pp_user', null)
export const saveUser = (user) => setItem('pp_user', user)
export const logout = () => removeItem('pp_user')

function validationError(errors) {
  const error = new Error('Please correct the highlighted fields.')
  error.name = 'AuthValidationError'
  error.fields = errors
  return error
}

export const login = (email, password) => {
  const errors = validateLogin({ email, password })
  if (hasAuthErrors(errors)) throw validationError(errors)
  return { email: email.trim(), name: email.trim().split('@')[0] }
}

export const createAccount = (name, email, password) => {
  const errors = validateSignup({ name, email, password })
  if (hasAuthErrors(errors)) throw validationError(errors)
  return { email: email.trim(), name: name.trim() }
}

export const demoLogin = () => ({ email: 'demo@planpilot.app', name: 'demo' })
