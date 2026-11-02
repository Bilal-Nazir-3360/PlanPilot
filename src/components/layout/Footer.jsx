import { Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { authorName, contactEmail, footerLinkGroups, githubUrl, isRealValue, linkedinUrl, portfolioUrl, siteName, tagline } from '../../data/site'
import DiamondMark from '../ui/DiamondMark'

function FooterLink({ link }) {
  if (link.href && !isRealValue(link.href)) return null
  if (link.href) return <a href={link.href} target="_blank" rel="noreferrer">{link.label}</a>
  return <Link to={link.to}>{link.label}</Link>
}

export default function Footer() {
  const year = new Date().getFullYear()
  return <footer className="site-footer">
    <div className="footer-brand"><Link to="/" className="brand"><DiamondMark /> {siteName}</Link><p>{tagline}</p><small>Portfolio prototype. Data stays in your browser.</small></div>
    <div className="footer-groups">{footerLinkGroups.map((group) => <div key={group.label}><h2>{group.label}</h2>{group.links.map((link) => <FooterLink key={link.label} link={link} />)}</div>)}</div>
    <div className="footer-meta">{isRealValue(contactEmail) && <a href={`mailto:${contactEmail}`}><Mail size={15} /> {contactEmail}</a>}{isRealValue(githubUrl) && <a href={githubUrl} target="_blank" rel="noreferrer">GitHub</a>}{isRealValue(linkedinUrl) && <a href={linkedinUrl} target="_blank" rel="noreferrer">LinkedIn</a>}{isRealValue(portfolioUrl) && <a href={portfolioUrl} target="_blank" rel="noreferrer">Portfolio</a>}<span>© {year} {isRealValue(authorName) ? authorName : siteName}</span></div>
  </footer>
}
