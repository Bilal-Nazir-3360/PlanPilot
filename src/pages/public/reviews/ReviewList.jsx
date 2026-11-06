import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import ConfirmDialog from '../../../components/ui/ConfirmDialog'
import Reveal from '../../../components/ui/Reveal'
import { useApp } from '../../../context/AppContext'
import ReviewCard from './ReviewCard'

export default function ReviewList({ reviews, user, highlighted, onEdit, onClearFilters, loading, error, onRetry }) {
  const { deleteReview, setToast } = useApp()
  const reduceMotion = useReducedMotion()
  const [limit, setLimit] = useState(6)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const visible = reviews.slice(0, limit)
  const own = (review) => Boolean(user && [user.id, user.email].includes(review.ownerId))
  return <>
    <section className="review-list" aria-labelledby="review-list-title"><h2 id="review-list-title" className="sr-only">Reviews</h2>{loading?<div className="review-empty" role="status">Loading reviews…</div>:error?<div className="review-empty" role="alert"><h3>Could not load reviews.</h3><p>{error.message}</p><button className="btn ghost" type="button" onClick={onRetry}>Retry</button></div>:!reviews.length?<div className="review-empty"><h3>No reviews yet.</h3><p>Be the first to share your experience.</p></div>:<><div className="review-grid"><AnimatePresence mode="popLayout">{visible.map((review,index)=><motion.div key={review.id} layout initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={reduceMotion?{duration:0}:{delay:index*.04}}><Reveal delay={reduceMotion?0:index*.04}><ReviewCard review={review} isOwner={own(review)} highlighted={highlighted===review.id} onEdit={onEdit} onDelete={setDeleteTarget}/></Reveal></motion.div>)}</AnimatePresence></div>{limit<reviews.length&&<button className="btn ghost review-toggle" type="button" onClick={()=>setLimit((current)=>current+6)}>Show more</button>}</>}</section>
    {deleteTarget&&<ConfirmDialog title="Delete this review?" message="This permanently removes your review. Sample reviews are never changed." close={()=>setDeleteTarget(null)} confirm={async()=>{try{await deleteReview(deleteTarget.id);setDeleteTarget(null)}catch(error){setToast(error.message||'Could not delete the review.')}}} confirmLabel="Delete review"/>}
  </>
}
