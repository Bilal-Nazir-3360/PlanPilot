import { useState } from 'react'
import { featureCategories, features } from '../../../data/features'
import Reveal from '../../../components/ui/Reveal'
import FeatureCard from './FeatureCard'

export default function FeatureCategories({ onOpen }) {
  const [openFeature, setOpenFeature] = useState(null)
  return <div className="feature-categories">{featureCategories.map((category) => {
    const categoryFeatures = features.filter((feature) => feature.category === category.id)
    return <section className="feature-category" id={`feature-category-${category.id}`} key={category.id} aria-labelledby={`category-title-${category.id}`}>
      <Reveal><div className="feature-category-head"><p className="eyebrow">{category.eyebrow}</p><h2 id={`category-title-${category.id}`}>{category.title}</h2><p>{category.description}</p></div></Reveal>
      <div className="feature-category-grid">{categoryFeatures.map((feature, index) => <Reveal key={feature.id} delay={index * .04}><FeatureCard feature={feature} onOpen={onOpen} expanded={openFeature === feature.id} onToggle={() => setOpenFeature((current) => current === feature.id ? null : feature.id)}/></Reveal>)}</div>
    </section>
  })}</div>
}
