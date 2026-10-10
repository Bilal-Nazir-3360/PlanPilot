import { Accessibility, Moon, Smartphone, Touchpad } from 'lucide-react'
import Reveal from '../../../components/ui/Reveal'

const items = [
  [Moon, 'Dark and light themes', 'Switch themes and keep your preference in the browser.'],
  [Touchpad, 'Keyboard and touch ready', 'Use keyboard sensors, touch activation, and status controls.'],
  [Smartphone, 'Responsive by design', 'Workspace layouts adapt from wide screens to phones.'],
  [Accessibility, 'Reduced motion and focus', 'Respect motion preferences and use labelled, focusable dialogs.'],
]

export default function BuiltStrip() {
  return <Reveal><section className="built-strip" aria-label="Built for real use">{items.map(([Icon, title, description]) => <article key={title}><Icon size={19}/><h3>{title}</h3><p>{description}</p></article>)}</section></Reveal>
}
