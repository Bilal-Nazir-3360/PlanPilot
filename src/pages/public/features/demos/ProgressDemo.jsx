import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export default function ProgressDemo() {
  const [done, setDone] = useState(2)
  const reduceMotion = useReducedMotion()
  const total = 4
  const progress = useMemo(() => done / total, [done])
  const circumference = 2 * Math.PI * 42
  return <article className="interactive-demo spotlight-card card"><h3>Progress that updates</h3><p>Click a task to complete it and watch the signal change.</p><div className="demo-progress"><svg className="progress-ring" viewBox="0 0 100 100" aria-label={`${done} of ${total} sample tasks complete`}><circle cx="50" cy="50" r="42"/><motion.circle className="ring-value" cx="50" cy="50" r="42" strokeDasharray={circumference} initial={false} animate={{ strokeDashoffset: circumference * (1 - progress) }} transition={{ duration: reduceMotion ? 0 : .35 }}/></svg><strong>{done}/{total}</strong><button type="button" className="btn ghost" onClick={() => setDone((current) => current === total ? 0 : current + 1)}>{done === total ? 'Reset sample' : 'Complete next task'}</button></div></article>
}
