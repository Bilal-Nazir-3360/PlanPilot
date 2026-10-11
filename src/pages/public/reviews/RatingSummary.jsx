import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Star } from 'lucide-react'
import { useRef } from 'react'
import { averageRating, countPerStar, percentagePerStar } from '../../../utils/reviewStats'

export default function RatingSummary({ reviews, onRating }) {
  const ref = useRef(null)
  const visible = useInView(ref, { once: true, amount: .3 })
  const reduceMotion = useReducedMotion()
  const counts = countPerStar(reviews)
  const percentages = percentagePerStar(reviews)
  const average = averageRating(reviews)
  if (!reviews.length) return <section className="rating-summary review-empty"><h2>No reviews yet</h2><p>Be the first to share a review from this browser.</p></section>
  return <section ref={ref} className="rating-summary" aria-labelledby="rating-summary-title">
    <div className="rating-overview"><h2 id="rating-summary-title">{average.toFixed(1)}</h2><div className="stars" aria-label={`${average.toFixed(1)} out of 5 stars`}>{[1,2,3,4,5].map((star)=><Star key={star} size={18} fill={star <= Math.round(average) ? 'currentColor' : 'none'} />)}</div><p>{reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}</p></div>
    <div className="rating-bars" aria-label="Filter reviews by rating">{[5,4,3,2,1].map((star)=><button type="button" key={star} className="rating-bar-row" onClick={()=>onRating(String(star))} aria-label={`Show ${counts[star]} ${star}-star reviews`}><span>{star} <Star size={13} fill="currentColor"/></span><span className="rating-bar"><motion.i initial={{ transform: 'scaleX(0)' }} animate={{ transform: visible ? `scaleX(${percentages[star] / 100})` : 'scaleX(0)' }} transition={reduceMotion ? { duration: 0 } : { duration: .65, delay: (5-star)*.07 }} /></span><strong>{counts[star]}</strong></button>)}</div>
  </section>
}
