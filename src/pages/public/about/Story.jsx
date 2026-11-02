import Reveal from '../../../components/ui/Reveal'
import { aboutStory, isRealValue } from '../../../data/site'

export default function Story() {
  const paragraphs = Object.values(aboutStory).filter(isRealValue)
  if (!paragraphs.length) return null
  return <section className="about-story section-shell" aria-labelledby="story-title"><Reveal><div className="eyebrow">THE STORY</div><h2 id="story-title">A small system for exploring product decisions.</h2><div className="story-copy">{paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></Reveal></section>
}
