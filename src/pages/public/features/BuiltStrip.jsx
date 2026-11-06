import { Accessibility, Moon, Smartphone, Touchpad } from 'lucide-react'
import Reveal from '../../../components/ui/Reveal'
import SplitSection from '../../../components/ui/SplitSection'

const items = [
  [Moon, 'Dark and light themes', 'Switch themes and keep your preference in the browser.'],
  [Touchpad, 'Keyboard and touch ready', 'Use keyboard sensors, touch activation, and status controls.'],
  [Smartphone, 'Responsive by design', 'Workspace layouts adapt from wide screens to phones.'],
  [Accessibility, 'Reduced motion and focus', 'Respect motion preferences and use labelled, focusable dialogs.'],
]

export default function BuiltStrip() {
  return <SplitSection className="built-strip" eyebrow="BUILT FOR REAL USE" title="Designed for everyday use" labelledBy="built-strip-title"><Reveal><div className="built-strip-list">{items.map(([Icon, title, description]) => <article key={title}><Icon size={24}/><div><h3>{title}</h3><p>{description}</p></div></article>)}</div></Reveal></SplitSection>
}
