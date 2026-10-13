import Reveal from '../../../components/ui/Reveal'
import { aboutStory } from '../../../data/site'

export default function Story() {
  return <section className="about-story section-shell" aria-labelledby="story-title"><Reveal><div className="eyebrow">THE STORY</div><h2 id="story-title">A small system for exploring product decisions.</h2><div className="story-copy"><p>{aboutStory.whyBuilt}</p><p>{aboutStory.learned}</p><p>{aboutStory.improve}</p></div></Reveal></section>
}
