import { useEffect, useState } from 'react'
import Footer from '../../../components/layout/Footer'
import Navbar from '../../../components/layout/Navbar'
import useDocumentTitle from '../../../hooks/useDocumentTitle'

export default function LegalPage({ title, description, sections, lastUpdated, children }) {
  const [activeId, setActiveId] = useState(sections[0]?.id)
  useDocumentTitle(`${title} — PlanPilot`, description)

  useEffect(() => {
    const headings = sections.map(({ id }) => document.getElementById(id)).filter(Boolean)
    if (!headings.length || !('IntersectionObserver' in window)) return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      if (visible[0]) setActiveId(visible[0].target.id)
    }, { rootMargin: '-96px 0px -65% 0px', threshold: [0, 1] })
    headings.forEach((heading) => observer.observe(heading))
    return () => observer.disconnect()
  }, [sections])

  return <><Navbar /><main id="main" className="legal-page"><header className="legal-header"><div className="eyebrow">PLAIN-ENGLISH POLICY</div><h1>{title}</h1>{lastUpdated && <p className="legal-updated">Last updated: <time dateTime={lastUpdated}>{lastUpdated}</time></p>}</header><div className="legal-layout"><aside className="legal-toc" aria-label={`${title} sections`}><strong>On this page</strong><nav>{sections.map(({ id, label }) => <a className={activeId === id ? 'active' : ''} href={`#${id}`} key={id}>{label}</a>)}</nav></aside><article className="legal-content">{children}</article></div></main><Footer /></>
}
