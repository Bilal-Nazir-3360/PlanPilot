import { useState } from 'react'
import { featureCategories, features } from '../../../data/features'
import Reveal from '../../../components/ui/Reveal'
import FeatureCard from './FeatureCard'
import SplitSection from '../../../components/ui/SplitSection'

export default function FeatureCategories({ onOpen }) {
  const [openFeature, setOpenFeature] = useState(null)
  return <div className="feature-categories">{featureCategories.map((category) => {
    const categoryFeatures = features.filter((feature) => feature.category === category.id)
    return <SplitSection className="feature-category" id={`feature-category-${category.id}`} key={category.id} eyebrow={category.eyebrow} title={category.title} description={category.description} labelledBy={`category-title-${category.id}`}><div className="feature-category-grid">{categoryFeatures.map((feature, index) => <Reveal key={feature.id} delay={index * .04}><FeatureCard feature={feature} onOpen={onOpen} expanded={openFeature === feature.id} onToggle={() => setOpenFeature((current) => current === feature.id ? null : feature.id)}/></Reveal>)}</div></SplitSection>
  })}</div>
}
