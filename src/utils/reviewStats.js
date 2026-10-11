export function averageRating(reviews) {
  if (!reviews.length) return 0
  return reviews.reduce((total, review) => total + Number(review.rating || 0), 0) / reviews.length
}

export function countPerStar(reviews) {
  return [5, 4, 3, 2, 1].reduce((counts, rating) => {
    counts[rating] = reviews.filter((review) => Number(review.rating) === rating).length
    return counts
  }, {})
}

export function percentagePerStar(reviews) {
  const counts = countPerStar(reviews)
  return Object.fromEntries(Object.entries(counts).map(([rating, count]) => [rating, reviews.length ? (count / reviews.length) * 100 : 0]))
}

export function sortReviews(reviews, mode = 'newest') {
  return [...reviews].sort((a, b) => {
    if (mode === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt)
    if (mode === 'highest') return b.rating - a.rating || new Date(b.createdAt) - new Date(a.createdAt)
    if (mode === 'lowest') return a.rating - b.rating || new Date(b.createdAt) - new Date(a.createdAt)
    return new Date(b.createdAt) - new Date(a.createdAt)
  })
}

export function filterByRating(reviews, rating) {
  return rating === 'all' || rating === null || rating === undefined ? reviews : reviews.filter((review) => Number(review.rating) === Number(rating))
}
