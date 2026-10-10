import { featureCategories, features } from '../../../data/features'
import Reveal from '../../../components/ui/Reveal'
import FeatureCard from './FeatureCard'

export default function FeatureCategories({ onOpen }) {
  return <div className="feature-categories">{featureCategories.map((category) => {
    const categoryFeatures = features.filter((feature) => feature.category === category.id)
    return <section className="feature-category" id={`feature-category-${category.id}`} key={category.id} aria-labelledby={`category-title-${category.id}`}>
      <Reveal><div className="feature-category-head"><p className="eyebrow">{category.eyebrow}</p><h2 id={`category-title-${category.id}`}>{category.title}</h2><p>{category.description}</p></div></Reveal>
      <div className="feature-category-grid">{categoryFeatures.map((feature, index) => <Reveal key={feature.id} delay={index * .06}><FeatureCard feature={feature} onOpen={onOpen}/></Reveal>)}</div>
    </section>
  })}</div>
}
