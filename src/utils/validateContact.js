const controlCharacters = /[\u0000-\u001f\u007f-\u009f]/g

export const cleanContactValue = (value) => String(value ?? '').replace(controlCharacters, '').replace(/\s+/g, ' ').trim()

export const cleanContactMessage = (message = {}) => ({
  name: cleanContactValue(message.name),
  email: cleanContactValue(message.email),
  subject: cleanContactValue(message.subject),
  message: cleanContactValue(message.message),
  honeypot: cleanContactValue(message.honeypot),
})

export default function validateContact(message = {}) {
  const clean = cleanContactMessage(message)
  const errors = {}
  if (clean.name.length < 2 || clean.name.length > 50) errors.name = 'Name must be between 2 and 50 characters.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email)) errors.email = 'Enter a valid email address.'
  if (clean.subject.length < 3 || clean.subject.length > 100) errors.subject = 'Subject must be between 3 and 100 characters.'
  if (clean.message.length < 10 || clean.message.length > 1000) errors.message = 'Message must be between 10 and 1000 characters.'
  if (clean.honeypot) errors.honeypot = 'Please leave this field blank.'
  return errors
}
