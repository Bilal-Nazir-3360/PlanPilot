import Reveal from '../../../components/ui/Reveal'
import SpotlightCard from '../../../components/ui/SpotlightCard'
import { authorName, contactEmail, githubUrl, isRealValue, linkedinUrl, location, lookingFor, portfolioUrl, roleLine } from '../../../data/site'

export default function Author() {
  if (!isRealValue(authorName)) return null
  const links = [
    ['GitHub', githubUrl, true],
    ['LinkedIn', linkedinUrl, true],
    ['Portfolio', portfolioUrl, true],
    ['Email', contactEmail, false],
  ]
  return <section className="about-section section-shell" aria-labelledby="author-title"><Reveal><SpotlightCard className="author-card"><div className="author-copy"><div className="eyebrow">THE AUTHOR</div><h2 id="author-title">{authorName}</h2>{isRealValue(roleLine) && <p>{roleLine}</p>}{isRealValue(location) && <p>{location}</p>}{isRealValue(lookingFor) && <p>{lookingFor}</p>}<div className="author-actions">{links.filter(([, value]) => isRealValue(value)).map(([label, value, external], index) => <a className={`btn${index ? ' ghost' : ''}`} key={label} href={external ? value : `mailto:${value}`} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>{label}</a>)}</div></div></SpotlightCard></Reveal></section>
}
