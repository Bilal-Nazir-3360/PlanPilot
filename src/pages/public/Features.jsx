import { useState } from 'react'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import FeaturesHero from './features/FeaturesHero'
import CategoryTabs from './features/CategoryTabs'
import FeatureCategories from './features/FeatureCategories'
import FeatureModal from './features/FeatureModal'
import InteractiveDemos from './features/InteractiveDemos'
import BuiltStrip from './features/BuiltStrip'
import Roadmap from './features/Roadmap'
import FinalCta from './features/FinalCta'

export default function Features() {
  const [selectedFeature, setSelectedFeature] = useState(null)
  useDocumentTitle('Features — PlanPilot', 'Explore the live task workflow, focused planning tools, and honest product roadmap in PlanPilot.')
  return <main id="main" className="features-page"><FeaturesHero/><CategoryTabs/><FeatureCategories onOpen={setSelectedFeature}/><InteractiveDemos/><BuiltStrip/><Roadmap/><FinalCta/>{selectedFeature && <FeatureModal feature={selectedFeature} close={() => setSelectedFeature(null)}/>}</main>
}
