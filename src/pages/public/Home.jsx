import Footer from '../../components/layout/Footer'
import Navbar from '../../components/layout/Navbar'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import FinalCta from './home/FinalCta'
import FeatureHighlights from './home/FeatureHighlights'
import HomeHero from './home/HomeHero'
import HowItWorks from './home/HowItWorks'
import LazySection from './home/LazySection'
import ProductPreview from './home/ProductPreview'
import TechStrip from './home/TechStrip'

export default function Home() {
  useDocumentTitle('PlanPilot — Plan boldly. Ship clearly.', 'Try the live PlanPilot workspace demo: organize tasks, projects, and progress in a focused browser-based prototype.')
  return <><Navbar /><main id="main" className="home-page"><HomeHero /><ProductPreview /><LazySection><HowItWorks /></LazySection><LazySection><FeatureHighlights /></LazySection><LazySection><TechStrip /></LazySection><LazySection><FinalCta /></LazySection></main><Footer /></>
}
