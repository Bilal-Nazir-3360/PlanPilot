import { Check, Minus } from 'lucide-react'
import { Fragment } from 'react'
import { plans } from '../../../data/plans'

const categories = ['Tasks', 'Planning', 'Analytics', 'Collaboration', 'Support']
const allFeatures = categories.map((category) => ({
  category,
  features: [...new Set(plans.flatMap((plan) => plan.features[category].map((feature) => feature.name)))],
})).filter((group) => group.features.length)

function getStatus(plan, category, name) {
  const ownFeature = plan.features[category].find((feature) => feature.name === name)
  if (ownFeature) return ownFeature.status
  if (plan.includes === 'pro' && plans[1].features[category].some((feature) => feature.name === name)) return 'live'
  if (plan.includes === 'free' && plans[0].features[category].some((feature) => feature.name === name)) return 'live'
  if (plan.id === 'team' && plans[1].features[category].some((feature) => feature.name === name)) return 'live'
  return 'none'
}

function Cell({ status }) {
  if (status === 'live') return <Check aria-label="Included" className="comparison-check" size={17} />
  if (status === 'soon') return <span className="comparison-soon">Soon</span>
  return <Minus aria-label="Not included" className="comparison-dash" size={16} />
}

export default function ComparisonTable() {
  return (
    <section className="pricing-section comparison-section" aria-labelledby="comparison-title">
      <div className="pricing-section-heading">
        <div className="eyebrow">AT A GLANCE</div>
        <h2 id="comparison-title">Compare the demo plans.</h2>
      </div>
      <div className="comparison-scroll">
        <table>
          <caption>Feature availability by demo plan. Live features are available today; Soon features are planned.</caption>
          <thead>
            <tr><th scope="col">Feature</th>{plans.map((plan) => <th scope="col" key={plan.id}>{plan.name}</th>)}</tr>
          </thead>
          <tbody>
            {allFeatures.map((group) => (
              <Fragment key={group.category}>
                <tr className="comparison-category"><th colSpan="4" scope="rowgroup">{group.category}</th></tr>
                {group.features.map((feature) => (
                  <tr key={feature}>
                    <th scope="row">{feature}</th>
                    {plans.map((plan) => <td key={plan.id}><Cell status={getStatus(plan, group.category, feature)} /></td>)}
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
