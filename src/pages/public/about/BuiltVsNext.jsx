import { ArrowUpRight, Check, Sparkles } from 'lucide-react'
import Reveal from '../../../components/ui/Reveal'

const built = ['Task CRUD with drag-and-drop', 'Local reviews and contact messages', 'Demo plan selection and billing views', 'Dark and light theming', 'Lazy-loaded routes']
const next = ['Express and MongoDB backend with JWT auth', 'Automated tests and CI', 'Real-time collaboration']

function List({ title, items, Icon }) {
  return <div className="built-next-column"><div className="built-next-heading"><Icon size={19} aria-hidden="true" /><h3>{title}</h3></div><ul>{items.map((item) => <li key={item}><Check size={16} aria-hidden="true" />{item}</li>)}</ul></div>
}

export default function BuiltVsNext() {
  return <section className="about-section section-shell" aria-labelledby="built-next-title"><Reveal><div className="eyebrow">HONEST SCOPE</div><h2 id="built-next-title">What is here, and what comes next.</h2></Reveal><div className="built-next-grid"><Reveal><List title="Built" items={built} Icon={Check} /></Reveal><Reveal delay=".08"><List title="Next" items={next} Icon={Sparkles} /></Reveal></div><div className="principles-strip"><div><ArrowUpRight size={18} aria-hidden="true" /><strong>Design principles</strong></div><span>Calm interface</span><span>Keyboard and touch support</span><span>Reduced-motion respect</span><span>Honest demo labels</span></div></section>
}
