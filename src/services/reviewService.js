import seedReviews from '../data/reviews'
import { getItem, removeItem, setItem } from './storage'

const REVIEWS_KEY = 'pp_reviews'
let lastReviewSubmittedAt = 0

const cleanText = (value) => String(value ?? '').replace(/[\u0000-\u001f\u007f-\u009f]/g, '').replace(/\s+/g, ' ').trim()

const normalizeReview = (review, index = 0) => {
  const comment = cleanText(review?.comment ?? review?.text)
  const createdAt = review?.createdAt || (review?.date ? new Date(review.date).toISOString() : new Date().toISOString())
  return {
    id: review?.id ?? `review-${Date.now()}-${index}`,
    name: cleanText(review?.name),
    role: cleanText(review?.role).slice(0, 60),
    rating: Number(review?.rating) >= 1 && Number(review?.rating) <= 5 ? Number(review.rating) : 1,
    comment,
    createdAt,
    isSample: review?.isSample === true,
    ownerId: typeof review?.ownerId === 'string' ? review.ownerId : null,
    text: comment,
    date: createdAt.slice(0, 10),
  }
}

const normalizeReviews = (reviews) => (Array.isArray(reviews) ? reviews : seedReviews).map(normalizeReview)

export const getReviews = () => {
  try {
    const saved = getItem(REVIEWS_KEY, null)
    if (saved === null) {
      const seeded = normalizeReviews(seedReviews)
      setItem(REVIEWS_KEY, seeded)
      return seeded
    }
    return normalizeReviews(saved)
  } catch {
    return normalizeReviews(seedReviews)
  }
}

export const saveReviews = (reviews) => {
  try {
    setItem(REVIEWS_KEY, normalizeReviews(reviews))
  } catch {
    // Storage failures leave the in-memory review state usable.
  }
}

export const getReviewRateLimitRemaining = () => Math.max(0, 30000 - (Date.now() - lastReviewSubmittedAt))

export const addReview = (review) => {
  const remaining = getReviewRateLimitRemaining()
  if (remaining > 0) return { reviews: getReviews(), error: `Please wait ${Math.ceil(remaining / 1000)} seconds before submitting another review.` }
  const next = [normalizeReview(review), ...getReviews()]
  saveReviews(next)
  lastReviewSubmittedAt = Date.now()
  return { reviews: next, error: null }
}

export const updateReview = (id, changes) => {
  const next = getReviews().map((review) => review.id === id ? normalizeReview({ ...review, ...changes }) : review)
  saveReviews(next)
  return next
}

export const deleteReview = (id) => {
  const next = getReviews().filter((review) => review.id !== id)
  saveReviews(next)
  return next
}

export const clearReviews = () => {
  try {
    removeItem(REVIEWS_KEY)
  } catch {
    // Storage failures do not prevent the in-memory state from resetting.
  }
  return normalizeReviews(seedReviews)
}
