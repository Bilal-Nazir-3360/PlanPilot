import Reveal from '../../../components/ui/Reveal'
import { aboutStory, isRealValue } from '../../../data/site'

const sections = [
  ['01', 'Why I built it', 'why'],
  ['02', 'What I learned', 'learned'],
  ['03', 'What comes next', 'next'],
]

export default function Story() {
  const visibleSections = sections.filter(([, , key]) => isRealValue(aboutStory[key]))
  if (!visibleSections.length) return null
  return <section className="about-story section-shell" aria-labelledby="story-title"><Reveal><div className="eyebrow">THE STORY</div><h2 id="story-title">A small system for exploring product decisions.</h2><div className="story-copy">{visibleSections.map(([number, label, key]) => <article className="story-section" key={key}><span className="story-number">{number}</span><div><div className="eyebrow">{label}</div><p>{aboutStory[key]}</p></div></article>)}</div></Reveal></section>
}
