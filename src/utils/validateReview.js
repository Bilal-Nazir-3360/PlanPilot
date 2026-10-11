const sanitize = (value) => String(value ?? '').replace(/[\u0000-\u001f\u007f-\u009f]/g, '').replace(/\s+/g, ' ').trim()

export function cleanReview(review) {
  return {
    ...review,
    name: sanitize(review.name),
    role: sanitize(review.role).slice(0, 60),
    comment: sanitize(review.comment ?? review.text),
  }
}

export default function validateReview(review) {
  const clean = cleanReview(review)
  const errors = {}
  if (clean.name.length < 2 || clean.name.length > 50) errors.name = 'Name must be between 2 and 50 characters.'
  if (clean.role.length > 60) errors.role = 'Role must be 60 characters or fewer.'
  if (![1, 2, 3, 4, 5].includes(Number(clean.rating))) errors.rating = 'Choose a rating from 1 to 5.'
  if (clean.comment.length < 10 || clean.comment.length > 500) errors.comment = 'Review must be between 10 and 500 characters.'
  return errors
}
