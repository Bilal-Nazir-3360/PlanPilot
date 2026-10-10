import { motion } from 'framer-motion'
import Reveal from '../../../components/ui/Reveal'
import StatusBadge from './StatusBadge'

const roadmap = [
  ['Real authentication and database', 'Express/MongoDB integration is the next step beyond this frontend prototype.'],
  ['Real-time collaboration', 'Shared updates and presence for teams working together.'],
  ['Notifications', 'Useful reminders and activity signals without noise.'],
  ['Recurring tasks', 'Make routines easier to plan and repeat.'],
]

export default function Roadmap() {
  return <section className="roadmap" aria-labelledby="roadmap-title"><Reveal><p className="eyebrow">THE HONEST ROADMAP</p><h2 id="roadmap-title">What’s next</h2><p>The current demo shows the product direction clearly; these capabilities are not connected yet.</p></Reveal><div className="roadmap-list">{roadmap.map(([title, description], index) => <motion.article className="roadmap-item" key={title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }}><StatusBadge status="Coming soon"/><h3>{title}</h3><p>{description}</p></motion.article>)}</div></section>
}
