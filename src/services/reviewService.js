import seedReviews from '../data/reviews'
import { getItem, setItem } from './storage'

export const getReviews = () => getItem('pp_reviews', null) || seedReviews
export const saveReviews = (reviews) => setItem('pp_reviews', reviews)
