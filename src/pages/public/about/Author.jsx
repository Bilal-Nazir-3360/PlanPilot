import { useEffect, useState } from 'react'
import Button from '../../../components/ui/Button'
import Reveal from '../../../components/ui/Reveal'
import SpotlightCard from '../../../components/ui/SpotlightCard'
import { authorName, githubUrl, linkedinUrl } from '../../../data/site'

export default function Author() {
  const [hasPhoto, setHasPhoto] = useState(false)
  useEffect(() => {
    const photo = new Image()
    photo.onload = () => setHasPhoto(true)
    photo.src = '/author.jpg'
  }, [])
  return <section className="about-section section-shell" aria-labelledby="author-title"><Reveal><SpotlightCard className="author-card">{hasPhoto && <img className="author-photo" src="/author.jpg" alt={`Portrait of ${authorName}`} onError={() => setHasPhoto(false)} />}<div className="author-copy"><div className="eyebrow">THE AUTHOR</div><h2 id="author-title">{authorName}</h2><p>Portfolio builder exploring product design, React architecture, and accessible interfaces.</p><div className="author-actions"><a className="btn" href={githubUrl} target="_blank" rel="noreferrer">GitHub</a><a className="btn ghost" href={linkedinUrl} target="_blank" rel="noreferrer">LinkedIn</a></div></div></SpotlightCard></Reveal></section>
}
