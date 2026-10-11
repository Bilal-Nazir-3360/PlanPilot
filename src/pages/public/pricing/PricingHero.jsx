import SpotlightCard from '../../../components/ui/SpotlightCard'
import BillingToggle from './BillingToggle'
import PlanCard from './PlanCard'

export default function PricingHero() {
  return (
    <section className="pricing-hero" aria-labelledby="pricing-title">
      <div className="pricing-hero-copy">
        <div className="eyebrow">DEMO PRICING</div>
        <h1 id="pricing-title">Choose the pace that fits your work.</h1>
        <p>Start with a calm task workspace, then explore deeper planning as your needs grow.</p>
        <BillingToggle />
        <p className="pricing-demo-note">Demo pricing. No payment is processed.</p>
      </div>
      <div className="pricing-plan-grid">
        <PlanCard planId="free" />
        <PlanCard planId="pro" />
        <PlanCard planId="team" />
      </div>
      <SpotlightCard className="pricing-final-cta">
        <div>
          <div className="eyebrow">KEEP MOVING</div>
          <h2>Try the workspace at your own pace.</h2>
          <p>Pick a plan in the demo and see how the workspace changes with you.</p>
        </div>
        <a className="btn" href="/signup">Start free</a>
      </SpotlightCard>
    </section>
  )
}
