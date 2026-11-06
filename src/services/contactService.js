import { api } from './api'
import validateContact, { cleanContactMessage } from '../utils/validateContact'

export async function addMessage(message) {
  const clean = cleanContactMessage(message)
  const errors = validateContact(clean)
  if (Object.keys(errors).length) {
    const error = new Error('Please fix the highlighted fields.')
    error.errors = errors
    throw error
  }
  const { message: confirmation } = await api('/api/contact', {
    method: 'POST',
    body: { ...clean, website: clean.website || '' },
  })
  return confirmation
}
