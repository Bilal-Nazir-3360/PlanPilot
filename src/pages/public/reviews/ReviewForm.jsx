import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'
import Button from '../../../components/ui/Button'
import { useApp } from '../../../context/AppContext'
import validateReview, { cleanReview } from '../../../utils/validateReview'

const empty = { name: '', role: '', rating: 5, comment: '', honeypot: '' }

export default function ReviewForm({ user, editing, onClose, onSuccess }) {
  const { addReview, updateReview, setToast } = useApp()
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [hoverRating, setHoverRating] = useState(null)
  const [success, setSuccess] = useState(false)
  useEffect(() => { setForm(editing ? { name: editing.name, role: editing.role || '', rating: editing.rating, comment: editing.comment, honeypot: '' } : { ...empty, name: user?.name || '' }); setErrors({}); setSuccess(false) }, [editing, user?.name])
  const update = (field, value) => { setForm((current)=>({...current,[field]:value})); setErrors((current)=>({...current,[field]:''})) }
  const submit = (event) => {
    event.preventDefault()
    const clean = cleanReview(form)
    if (form.honeypot) return
    const nextErrors = validateReview(clean)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    setSubmitting(true)
    window.setTimeout(() => {
      if (editing) {
        updateReview(editing.id, { ...clean, text: clean.comment })
        setToast('Review updated')
        onClose()
      } else {
        const result = addReview({ ...clean, isSample: false, text: clean.comment })
        if (result.error) { setErrors({ form: result.error }); setSubmitting(false); return }
        setToast('Thanks for sharing your review')
        setSuccess(true)
        setForm({ ...empty, name: user?.name || '' })
        onSuccess(result.reviews[0])
      }
      setSubmitting(false)
    }, 120)
  }
  const activeRating = hoverRating || form.rating
  return <section className="review-form-wrap" aria-labelledby="review-form-title"><div className="review-form-heading"><div><div className="eyebrow">{editing?'EDIT REVIEW':'YOUR VOICE'}</div><h2 id="review-form-title">{editing?'Edit your review':'Share your experience'}</h2></div></div><form className="review-form card" onSubmit={submit} noValidate>{success&&<p className="review-success" role="status">Your review was added to the top of the list.</p>}{errors.form&&<p className="form-error" role="alert">{errors.form}</p>}<div className="form-row"><label>Name<input value={form.name} onChange={(event)=>update('name',event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name?'review-name-error':undefined}/>{errors.name&&<small className="form-error" id="review-name-error">{errors.name}</small>}</label><label>Role <span className="muted">(optional)</span><input value={form.role} onChange={(event)=>update('role',event.target.value)} aria-invalid={Boolean(errors.role)} aria-describedby={errors.role?'review-role-error':undefined}/>{errors.role&&<small className="form-error" id="review-role-error">{errors.role}</small>}</label></div><fieldset className="review-rating-field"><legend>Rating</legend><div className="review-star-picker" onMouseLeave={()=>setHoverRating(null)}>{[1,2,3,4,5].map((rating)=><label key={rating} onMouseEnter={()=>setHoverRating(rating)}><input type="radio" name="review-rating" value={rating} checked={form.rating===rating} onChange={()=>update('rating',rating)} aria-label={`${rating} out of 5 stars`} /><Star size={24} fill={rating<=activeRating?'currentColor':'none'}/></label>)}</div>{errors.rating&&<small className="form-error">{errors.rating}</small>}</fieldset><label>Your review<textarea rows="5" value={form.comment} onChange={(event)=>update('comment',event.target.value)} aria-invalid={Boolean(errors.comment)} aria-describedby="review-comment-help review-comment-error"/><span id="review-comment-help" className="character-count">{form.comment.length}/500 characters</span>{errors.comment&&<small className="form-error" id="review-comment-error">{errors.comment}</small>}</label><label className="honeypot" aria-hidden="true">Website<input tabIndex="-1" autoComplete="off" value={form.honeypot} onChange={(event)=>update('honeypot',event.target.value)}/></label><Button type="submit" disabled={submitting}>{submitting?'Submitting…':editing?'Save changes':'Submit review'} <Star size={15}/></Button></form></section>
}
