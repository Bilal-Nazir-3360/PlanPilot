import { useEffect, useState } from 'react'
import { featureCategories } from '../../../data/features'

export default function CategoryTabs() {
  const [active, setActive] = useState(featureCategories[0].id)
  useEffect(() => {
    const sections = featureCategories.map(({ id }) => document.getElementById(`feature-category-${id}`)).filter(Boolean)
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActive(visible.target.id.replace('feature-category-', ''))
    }, { rootMargin: '-25% 0px -55% 0px', threshold: [0.1, 0.4, 0.8] })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])
  return <nav className="feature-tabs" aria-label="Feature categories"><div className="feature-tabs-inner">{featureCategories.map((category) => <a key={category.id} href={`#feature-category-${category.id}`} aria-current={active === category.id ? 'page' : undefined}>{category.label}</a>)}</div></nav>
}
