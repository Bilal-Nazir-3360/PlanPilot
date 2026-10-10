import { useState } from 'react'
import { motion } from 'framer-motion'

const statuses = ['Todo', 'In progress', 'Done']

export default function MoveTaskDemo() {
  const [status, setStatus] = useState('In progress')
  return <article className="interactive-demo spotlight-card card"><h3>Move a task</h3><p>Try the same status change available on the live task cards.</p><select className="demo-select" value={status} onChange={(event) => setStatus(event.target.value)} aria-label="Move sample task">{statuses.map((item) => <option key={item}>{item}</option>)}</select><div className="demo-board demo-board-interactive">{statuses.map((item) => <div className="demo-lane" key={item}><b>{item}</b>{status === item && <motion.span layoutId="demo-task" className="demo-pill">Polish onboarding</motion.span>}</div>)}</div></article>
}
