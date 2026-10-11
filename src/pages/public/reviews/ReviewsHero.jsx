export default function ReviewsHero({ onWrite }) {
  return <section className="reviews-hero" aria-labelledby="reviews-title">
    <div className="eyebrow">FROM THE COMMUNITY</div>
    <h1 id="reviews-title">A clearer way to reflect on work.</h1>
    <p>Honest feedback from people exploring calmer planning and focused progress.</p>
    <button className="btn" type="button" onClick={onWrite}>Write a review</button>
    <small>Reviews are stored in this browser only.</small>
  </section>
}
