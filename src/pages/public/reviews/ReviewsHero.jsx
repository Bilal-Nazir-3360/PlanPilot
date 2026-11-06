import SplitSection from '../../../components/ui/SplitSection'

export default function ReviewsHero({ onWrite }) {
  return <SplitSection className="reviews-hero" eyebrow="FROM THE COMMUNITY" title="A clearer way to reflect on work." description="Honest feedback from people exploring calmer planning and focused progress." labelledBy="reviews-title"><div className="reviews-hero-actions"><button className="btn" type="button" onClick={onWrite}>Write a review</button><small>Reviews are stored in this browser only.</small></div></SplitSection>
}
