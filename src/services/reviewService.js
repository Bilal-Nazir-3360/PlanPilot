import { api } from './api'
import validateReview, { cleanReview } from '../utils/validateReview'

const normalizeReview = (review) => {
  const comment = String(review?.comment ?? review?.text ?? '').trim()
  const createdAt = review?.createdAt || new Date().toISOString()
  return {
    ...review,
    id: review?.id,
    name: String(review?.name ?? '').trim(),
    role: String(review?.role ?? '').trim(),
    rating: Number(review?.rating),
    comment,
    createdAt,
    isSample: review?.isSample === true,
    ownerId: review?.ownerId ?? null,
    text: comment,
    date: createdAt.slice(0, 10),
  }
}

export async function getReviews() {
  const { reviews } = await api('/api/reviews')
  return (Array.isArray(reviews) ? reviews : []).map(normalizeReview)
}

export async function addReview(review) {
  const clean = cleanReview(review)
  const errors = validateReview(clean)
  if (Object.keys(errors).length) {
    const error = new Error('Please fix the highlighted review fields.')
    error.errors = errors
    throw error
  }
  const { review: created } = await api('/api/reviews', {
    method: 'POST',
    body: { ...clean, website: clean.website || '' },
  })
  return normalizeReview(created)
}

export async function updateReview(id, changes) {
  const clean = cleanReview(changes)
  const errors = validateReview(clean)
  if (Object.keys(errors).length) {
    const error = new Error('Please fix the highlighted review fields.')
    error.errors = errors
    throw error
  }
  const { review } = await api(`/api/reviews/${id}`, {
    method: 'PATCH',
    body: clean,
  })
  return normalizeReview(review)
}

export async function deleteReview(id) {
  await api(`/api/reviews/${id}`, { method: 'DELETE' })
}
