import { MousePointer2, Save, Shuffle } from 'lucide-react'

const steps = [
  ['01', 'Plan choice is simulated', 'Explore a plan without entering payment details.', MousePointer2],
  ['02', 'Stored in this browser only', 'Your demo selection stays local to this browser.', Save],
  ['03', 'Change it any time', 'Switch plans whenever you want to explore the workspace.', Shuffle],
]

export default function DemoSteps() {
  return (
    <section className="pricing-section demo-steps" aria-labelledby="demo-steps-title">
      <div className="pricing-section-heading"><div className="eyebrow">NO SURPRISES</div><h2 id="demo-steps-title">How the demo works.</h2></div>
      <div className="demo-step-grid">{steps.map(([number, title, text, Icon]) => <article className="demo-step" key={number}><span>{number}</span><Icon size={20}/><h3>{title}</h3><p>{text}</p></article>)}</div>
      <p className="pricing-demo-note">Demo pricing. No payment is processed.</p>
    </section>
  )
}
