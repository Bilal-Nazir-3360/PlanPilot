import { useEffect, useRef, useState } from 'react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import { useApp } from '../../context/AppContext'
import ReviewsHero from './reviews/ReviewsHero'
import RatingSummary from './reviews/RatingSummary'
import ReviewControls from './reviews/ReviewControls'
import ReviewList from './reviews/ReviewList'
import ReviewForm from './reviews/ReviewForm'
import { filterByRating, sortReviews } from '../../utils/reviewStats'
import Modal from '../../components/ui/Modal'

export default function Reviews() {
  const { reviews, user } = useApp()
  const formRef = useRef(null)
  const [sortMode, setSortMode] = useState('newest')
  const [rating, setRating] = useState('all')
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [editing, setEditing] = useState(null)
  const [highlighted, setHighlighted] = useState(null)
  useDocumentTitle('Reviews — PlanPilot', 'Read honest sample and community reviews for the PlanPilot planning workspace.')
  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(search), 220)
    return () => window.clearTimeout(timer)
  }, [search])

  const clearFilters = () => { setSortMode('newest'); setRating('all'); setSearch('') }
  const filtered = sortReviews(filterByRating(reviews, rating).filter((review) => `${review.name} ${review.comment}`.toLowerCase().includes(debouncedSearch.toLowerCase().trim())), sortMode)
  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  const afterSubmit = (review) => {
    setHighlighted(review.id)
    window.setTimeout(() => setHighlighted(null), 2600)
    scrollToForm()
  }

  return <><Navbar/><main id="main" className="reviews-page">
    <ReviewsHero onWrite={scrollToForm} />
    <RatingSummary reviews={reviews} onRating={setRating} />
    <ReviewControls sortMode={sortMode} setSortMode={setSortMode} rating={rating} setRating={setRating} search={search} setSearch={setSearch} clearFilters={clearFilters} total={reviews.length} shown={filtered.length} />
    <ReviewList reviews={filtered} user={user} highlighted={highlighted} onEdit={setEditing} onClearFilters={clearFilters} />
    <div ref={formRef}>{editing ? <Modal open onClose={() => setEditing(null)} labelledBy="edit-review-title"><ReviewForm user={user} editing={editing} onClose={() => setEditing(null)} onSuccess={afterSubmit} /></Modal> : <ReviewForm user={user} onClose={() => setEditing(null)} onSuccess={afterSubmit} />}</div>
  </main><Footer/></>
}
