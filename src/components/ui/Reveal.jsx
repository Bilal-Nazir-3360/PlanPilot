import { motion, useReducedMotion } from 'framer-motion'

export default function Reveal({ children, className = '', delay = 0, ...props }) {
  const reduceMotion = useReducedMotion()
  return <motion.div className={className} initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: reduceMotion ? 0.2 : 0.45, delay: Math.min(delay, 0.2) }}>{children}</motion.div>
}

export function RevealGroup({ children, className = '', stagger = 0.07, ...props }) {
  const reduceMotion = useReducedMotion()
  return <motion.div className={className} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: reduceMotion ? 0 : Math.min(stagger, 0.04) } } }} {...props}>{Array.isArray(children) ? children.slice(0, 6).map((child, index) => <motion.div key={child?.key || index} variants={{ hidden: { opacity: 0, y: reduceMotion ? 0 : 8 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: reduceMotion ? 0.2 : 0.45 }}>{child}</motion.div>) : children}</motion.div>
}
