import { useState } from 'react'
import { Star } from 'lucide-react'
import SpotlightCard from '../../../components/ui/SpotlightCard'

export default function ReviewCard({ review, isOwner, highlighted, onEdit, onDelete }) {
  const [expanded, setExpanded] = useState(false)
  const long = review.comment.length > 210
  const comment = long && !expanded ? `${review.comment.slice(0, 210).trim()}…` : review.comment
  return <SpotlightCard as="article" className={`review-card ${highlighted ? 'review-highlighted' : ''}`}>
    <div className="review-card-top"><div className="review-avatar" aria-hidden="true">{review.name.split(/\s+/).map((part)=>part[0]).join('').slice(0,2).toUpperCase()}</div><div><b>{review.name}</b>{review.role&&<small>{review.role}</small>}</div>{review.isSample&&<span className="sample-badge">Sample review</span>}</div>
    <div className="stars" aria-label={`${review.rating} out of 5 stars`}>{[1,2,3,4,5].map((star)=><Star key={star} size={15} fill={star<=review.rating?'currentColor':'none'} />)}</div>
    <time dateTime={review.createdAt}>{new Date(review.createdAt).toLocaleDateString()}</time>
    <p>“{comment}”</p>
    {long&&<button className="read-more" type="button" onClick={()=>setExpanded(!expanded)} aria-expanded={expanded}>{expanded?'Show less':'Read more'}</button>}
    {isOwner&&<div className="review-actions"><button type="button" onClick={()=>onEdit(review)}>Edit</button><button type="button" onClick={()=>onDelete(review)}>Delete</button></div>}
  </SpotlightCard>
}
