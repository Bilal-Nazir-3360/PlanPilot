import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'

const sampleTasks = [{ title: 'Launch announcement', priority: 'High' }, { title: 'Update empty state', priority: 'Low' }, { title: 'Review event naming', priority: 'Medium' }]
const filters = ['All', 'Low', 'Medium', 'High']

export default function PriorityDemo() {
  const [filter, setFilter] = useState('All')
  const reduceMotion = useReducedMotion()
  const visible = sampleTasks.filter((task) => filter === 'All' || task.priority === filter)
  return <article className="interactive-demo spotlight-card card"><h3>Priorities at a glance</h3><p>Filter the sample cards to find the next most important move.</p><div className="filter-chips" role="group" aria-label="Priority filters">{filters.map((item) => <button type="button" key={item} className={`filter-chip ${filter === item ? 'active' : ''}`} onClick={() => setFilter(item)}>{item}</button>)}</div><AnimatePresence mode="popLayout">{visible.map((task) => <motion.div className="demo-sample-card" key={task.title} initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }} layout={!reduceMotion}><span>{task.title}</span><small>{task.priority}</small></motion.div>)}</AnimatePresence></article>
}
