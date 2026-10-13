import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Circle } from 'lucide-react'
import { useState } from 'react'
import seedTasks from '../../../data/tasks'

const columns = ['Todo', 'In progress', 'Done']
const previewTasks = seedTasks.slice(0, 4)

export default function ProductPreview() {
  const [tasks, setTasks] = useState(previewTasks)
  const reduceMotion = useReducedMotion()

  const moveTask = (id) => setTasks((current) => current.map((task) => {
    if (task.id !== id) return task
    const nextStatus = columns[(columns.indexOf(task.status) + 1) % columns.length]
    return { ...task, status: nextStatus }
  }))

  return <section className="product-preview section-shell" aria-labelledby="preview-title">
    <div className="section-heading"><div><div className="eyebrow">SEE IT IN MOTION</div><h2 id="preview-title">A board that keeps the next step clear.</h2></div><span className="sample-badge">Sample data</span></div>
    <LayoutGroup>
      <div className="preview-board">
        {columns.map((column) => <div className="preview-column" key={column}><div className="preview-column-heading"><h3>{column}</h3><span>{tasks.filter((task) => task.status === column).length}</span></div><div className="preview-task-list"><AnimatePresence initial={false} mode="popLayout">{tasks.filter((task) => task.status === column).map((task) => <motion.article key={task.id} layout transition={{ duration: reduceMotion ? 0 : .3 }} className="preview-task"><div className="preview-task-status">{task.status === 'Done' ? <CheckCircle2 size={15} /> : <Circle size={15} />}</div><div><strong>{task.title}</strong><small>{task.project} · {task.priority}</small></div><button type="button" className="preview-move" onClick={() => moveTask(task.id)} aria-label={`Move ${task.title} to the next status`}><ArrowRight size={15} /></button></motion.article>)}</AnimatePresence></div></div>)}
      </div>
    </LayoutGroup>
    <p className="preview-hint">Tap the arrow on any card to move it between columns.</p>
  </section>
}
