import { Send } from 'lucide-react'
import { useId, useState } from 'react'
import Button from '../../../components/ui/Button'
import Reveal from '../../../components/ui/Reveal'
import SpotlightCard from '../../../components/ui/SpotlightCard'
import { useAuth } from '../../../context/AuthContext'
import { addMessage } from '../../../services/contactService'
import validateContact, { cleanContactMessage } from '../../../utils/validateContact'

const initialValues = { name: '', email: '', subject: '', message: '', honeypot: '' }

export default function ContactForm({ onSuccess }) {
  const { user } = useAuth()
  const [values, setValues] = useState(() => ({ ...initialValues, name: user?.name || '', email: user?.email || '' }))
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [sending, setSending] = useState(false)
  const messageId = useId()

  const update = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: '' }))
    setFormError('')
  }

  const submit = (event) => {
    event.preventDefault()
    const clean = cleanContactMessage(values)
    const nextErrors = validateContact(clean)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      setFormError('Please correct the highlighted fields.')
      return
    }
    setSending(true)
    const result = addMessage(clean)
    if (result.error) {
      setErrors(result.errors || {})
      setFormError(result.error)
      setSending(false)
      return
    }
    onSuccess(result.message)
  }

  const fieldError = (field) => errors[field] ? <span id={`${field}-error`} className="form-error">{errors[field]}</span> : null
  const describedBy = (field) => errors[field] ? `${field}-error` : undefined

  return <Reveal><SpotlightCard as="form" className="contact-form card" onSubmit={submit} noValidate aria-busy={sending}>
    <div className="form-status" aria-live="polite">{formError}</div>
    <label htmlFor={`${messageId}-name`}>Name<input id={`${messageId}-name`} name="name" value={values.name} onChange={(event) => update('name', event.target.value)} autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={describedBy('name')} />{fieldError('name')}</label>
    <label htmlFor={`${messageId}-email`}>Email<input id={`${messageId}-email`} name="email" value={values.email} onChange={(event) => update('email', event.target.value)} type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={describedBy('email')} />{fieldError('email')}</label>
    <label htmlFor={`${messageId}-subject`}>Subject<input id={`${messageId}-subject`} name="subject" value={values.subject} onChange={(event) => update('subject', event.target.value)} aria-invalid={Boolean(errors.subject)} aria-describedby={describedBy('subject')} />{fieldError('subject')}</label>
    <label htmlFor={`${messageId}-message`}>Message<textarea id={`${messageId}-message`} name="message" value={values.message} onChange={(event) => update('message', event.target.value)} rows="6" maxLength="1000" aria-invalid={Boolean(errors.message)} aria-describedby={`${messageId}-counter${errors.message ? ` message-error` : ''}`} /> <span id={`${messageId}-counter`} className="character-counter" aria-live="polite">{values.message.length}/1000 characters</span>{fieldError('message')}</label>
    <label className="contact-honeypot" aria-hidden="true">Company<input tabIndex="-1" name="honeypot" value={values.honeypot} onChange={(event) => update('honeypot', event.target.value)} autoComplete="off" /></label>
    <Button type="submit" disabled={sending}><Send size={15} />{sending ? 'Saving…' : 'Save message'}</Button>
  </SpotlightCard></Reveal>
}
