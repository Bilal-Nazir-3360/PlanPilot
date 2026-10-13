import { getItem, removeItem, setItem } from './storage'
import validateContact, { cleanContactMessage } from '../utils/validateContact'

export const CONTACT_MESSAGES_KEY = 'pp_contact_messages'
const RATE_LIMIT_MS = 30000

const normalizeMessage = (message, index = 0) => {
  const clean = cleanContactMessage(message)
  return {
    id: typeof message?.id === 'string' ? message.id : `contact-${Date.now()}-${index}`,
    name: clean.name,
    email: clean.email,
    subject: clean.subject,
    message: clean.message,
    createdAt: typeof message?.createdAt === 'string' ? message.createdAt : new Date().toISOString(),
  }
}

export const getMessages = () => {
  try {
    const saved = getItem(CONTACT_MESSAGES_KEY, [])
    return Array.isArray(saved) ? saved.map(normalizeMessage) : []
  } catch {
    return []
  }
}

export const addMessage = (message) => {
  const current = getMessages()
  const latest = current[0]
  const remaining = latest ? RATE_LIMIT_MS - (Date.now() - new Date(latest.createdAt).getTime()) : 0
  if (remaining > 0) {
    return { messages: current, message: null, error: `Please wait ${Math.ceil(remaining / 1000)} seconds before sending another message.` }
  }

  const clean = cleanContactMessage(message)
  const errors = validateContact(clean)
  if (Object.keys(errors).length) return { messages: current, message: null, errors, error: 'Please fix the highlighted fields.' }

  const nextMessage = normalizeMessage({ ...clean, id: `contact-${Date.now()}`, createdAt: new Date().toISOString() })
  const next = [nextMessage, ...current]
  try {
    setItem(CONTACT_MESSAGES_KEY, next)
  } catch {
    return { messages: current, message: null, error: 'Unable to save your message in this browser.' }
  }
  return { messages: next, message: nextMessage, error: null }
}

export const clearMessages = () => {
  try {
    removeItem(CONTACT_MESSAGES_KEY)
  } catch {
    // Storage failures do not prevent the UI from clearing its local state.
  }
  return []
}
