import Reveal from '../../../components/ui/Reveal'
import { aboutStory, isRealValue } from '../../../data/site'

export default function AboutHero() {
  return <section className="about-hero section-shell" aria-labelledby="about-title"><Reveal><p className="eyebrow">ABOUT PLANPILOT</p><h1 id="about-title">A portfolio project built for clearer work.</h1>{isRealValue(aboutStory.heroLine) && <p className="about-summary">{aboutStory.heroLine}</p>}</Reveal></section>
}
