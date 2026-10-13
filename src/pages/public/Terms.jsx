import LegalPage from './legal/LegalPage'

const sections = [
  { id: 'demo-only', label: 'Portfolio demo' },
  { id: 'responsible-use', label: 'Responsible use' },
  { id: 'availability', label: 'Availability and warranty' },
]

export default function Terms() {
  return <LegalPage title="Terms" description="Short demo terms for using PlanPilot as a browser-based portfolio project." sections={sections}>
    <section id="demo-only"><h2>Portfolio demo</h2><p>PlanPilot is a portfolio demonstration provided for exploration and evaluation. It is provided as is, and features may change as the project develops.</p><p>No payment is processed, no purchase is created, and the plans shown in the workspace are demo plans.</p></section>
    <section id="responsible-use"><h2>Responsible use</h2><p>Use the demo for testing and learning. Do not store sensitive information in it, because current data is kept in browser storage and is not a secure account system.</p></section>
    <section id="availability"><h2>Availability and warranty</h2><p>The demo is provided without warranties. It may be unavailable, incomplete, or contain defects, and it is not a substitute for a production service.</p></section>
  </LegalPage>
}
