import { ExternalLink, Mail } from 'lucide-react'
import Reveal from '../../../components/ui/Reveal'
import SpotlightCard from '../../../components/ui/SpotlightCard'
import { contactEmail, githubUrl, linkedinUrl } from '../../../data/site'

const links = [
  { label: 'Email', value: contactEmail, href: `mailto:${contactEmail}`, icon: Mail },
  { label: 'GitHub', value: githubUrl, href: githubUrl, icon: ExternalLink },
  { label: 'LinkedIn', value: linkedinUrl, href: linkedinUrl, icon: ExternalLink },
]

export default function ContactInfo() {
  return <Reveal className="contact-info"><div className="eyebrow">DIRECT LINKS</div><h2>Prefer a quick hello?</h2><p>Use these links for project questions, feedback, bug reports, or hiring conversations. The URLs remain placeholders until you replace them in site.js.</p><div className="contact-links">{links.map(({ label, value, href, icon: Icon }) => <SpotlightCard as="a" className="contact-link-card" key={label} href={href} target={label === 'Email' ? undefined : '_blank'} rel={label === 'Email' ? undefined : 'noreferrer'}><Icon size={19} /><span><strong>{label}</strong><small>{value}</small></span><ExternalLink size={15} aria-hidden="true" /></SpotlightCard>)}</div></Reveal>
}
