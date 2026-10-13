const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function passwordStrength(password = '') {
  if (password.length < 8) return { label: 'Too short', value: 0 }
  let value = 1
  if (/[A-Z]/.test(password)) value += 1
  if (/[0-9]/.test(password)) value += 1
  if (/[^A-Za-z0-9]/.test(password)) value += 1
  return { label: value >= 4 ? 'Strong' : value >= 3 ? 'Good' : 'Basic', value }
}

export function validateEmail(email = '') {
  return emailPattern.test(email.trim()) ? '' : 'Enter a valid email address.'
}

export function validateLogin({ email = '', password = '' }) {
  const errors = {}
  const emailError = validateEmail(email)
  if (emailError) errors.email = emailError
  if (!password) errors.password = 'Enter your password.'
  return errors
}

export function validateSignup({ name = '', email = '', password = '' }) {
  const errors = {}
  const cleanName = name.trim()
  const emailError = validateEmail(email)
  if (cleanName.length < 2 || cleanName.length > 50) errors.name = 'Name must be between 2 and 50 characters.'
  if (emailError) errors.email = emailError
  if (password.length < 8) errors.password = 'Password must be at least 8 characters.'
  return errors
}

export function hasAuthErrors(errors) {
  return Object.keys(errors).length > 0
}
