import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import PricingHero from './pricing/PricingHero'
import ComparisonTable from './pricing/ComparisonTable'
import DemoSteps from './pricing/DemoSteps'
import PricingFaq from './pricing/PricingFaq'

export default function Pricing() {
  useDocumentTitle('Pricing — PlanPilot', 'Compare PlanPilot demo plans and choose the workspace experience that fits your planning style.')

  return (
    <>
      <Navbar />
      <main id="main" className="pricing-page">
        <PricingHero />
        <ComparisonTable />
        <DemoSteps />
        <PricingFaq />
      </main>
      <Footer />
    </>
  )
}
