import Reveal from '../../../components/ui/Reveal'
import { aboutStory, isRealValue } from '../../../data/site'
import SplitSection from '../../../components/ui/SplitSection'

const sections = [
  ['01', 'Why I built it', 'why'],
  ['02', 'What I learned', 'learned'],
  ['03', 'What comes next', 'next'],
]

export default function Story() {
  const visibleSections = sections.filter(([, , key]) => isRealValue(aboutStory[key]))
  if (!visibleSections.length) return null
  return <SplitSection className="about-story" eyebrow="THE STORY" title="A small system for exploring product decisions." labelledBy="story-title"><Reveal><div className="story-copy">{visibleSections.map(([number, label, key]) => <article className="story-section" key={key}><span className="story-number">{number}</span><div><div className="eyebrow">{label}</div><p>{aboutStory[key]}</p></div></article>)}</div></Reveal></SplitSection>
}
