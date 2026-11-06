import { useEffect, useState } from 'react'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import FinalCta from './home/FinalCta'
import FeatureHighlights from './home/FeatureHighlights'
import HomeHero from './home/HomeHero'
import HowItWorks from './home/HowItWorks'
import LazySection from './home/LazySection'
import TechStrip from './home/TechStrip'

const sections = [
  ['product', 'Product'],
  ['how-it-works', 'How it works'],
  ['features', 'Features'],
  ['stack', 'Stack'],
  ['start', 'Start'],
]

function SectionRail() {
  const [active, setActive] = useState('product')
  const [heroVisible, setHeroVisible] = useState(true)
  const [endingVisible, setEndingVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
      if (visible[0]) setActive(visible[0].target.id)
    }, { rootMargin: '-20% 0px -55% 0px', threshold: [0.1, 0.35, 0.7] })
    const observeSections = () => sections.forEach(([id]) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })
    observeSections()
    const observeEnding = () => {
      const finalCta = document.getElementById('start')
      const footer = document.querySelector('.site-footer')
      if (finalCta) endingObserver.observe(finalCta)
      if (footer) endingObserver.observe(footer)
    }
    const mutations = new MutationObserver(() => {
      observeSections()
      observeEnding()
    })
    mutations.observe(document.getElementById('main'), { childList: true, subtree: true })
    const heroObserver = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting), { threshold: 0 })
    const hero = document.getElementById('product')
    if (hero) heroObserver.observe(hero)
    const endingObserver = new IntersectionObserver((entries) => {
      setEndingVisible(entries.some((entry) => entry.isIntersecting))
    }, { threshold: 0 })
    observeEnding()
    return () => {
      observer.disconnect()
      heroObserver.disconnect()
      endingObserver.disconnect()
      mutations.disconnect()
    }
  }, [])

  return <nav className={`section-rail ${heroVisible ? '' : 'is-visible'} ${endingVisible ? 'is-hidden' : ''}`} aria-label="Home page sections">
    <ol>{sections.map(([id, label]) => <li key={id} className={active === id ? 'active' : ''}><a href={`#${id}`}><span className="section-rail-label">{label}</span><span className="section-rail-marker" /></a></li>)}</ol>
  </nav>
}

export default function Home() {
  useDocumentTitle('PlanPilot — Plan boldly. Ship clearly.', 'Try the live PlanPilot workspace demo: organize tasks, projects, and progress in a focused browser-based prototype.')
  return <main id="main" className="home-page"><SectionRail /><HomeHero /><LazySection><HowItWorks /></LazySection><LazySection><FeatureHighlights /></LazySection><LazySection><TechStrip /></LazySection><LazySection><FinalCta /></LazySection></main>
}
