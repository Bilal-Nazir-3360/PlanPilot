import { CheckCircle2 } from 'lucide-react'
import { useReducedMotion, motion } from 'framer-motion'
import Button from '../../../components/ui/Button'
import { contactEmail, githubUrl, linkedinUrl } from '../../../data/site'

export default function SuccessState({ onSendAnother }) {
  const reduceMotion = useReducedMotion()
  return <motion.section className="contact-success card" initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0.2 : 0.45 }} aria-labelledby="contact-success-title">
    <CheckCircle2 size={34} aria-hidden="true" /><h2 id="contact-success-title">Message saved</h2><p>Saved in this browser. This demo does not send email.</p><div className="contact-success-links"><a href={`mailto:${contactEmail}`}>Email</a><a href={githubUrl} target="_blank" rel="noreferrer">GitHub</a><a href={linkedinUrl} target="_blank" rel="noreferrer">LinkedIn</a></div><Button type="button" variant="ghost" onClick={onSendAnother}>Send another</Button>
  </motion.section>
}
