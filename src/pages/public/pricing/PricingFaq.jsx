import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

const questions = [
  ['Is this real billing?', 'No, it is a portfolio demo. No payment is processed and no card details are requested.'],
  ['What happens to my tasks if I switch to Free?', 'Nothing is deleted. You just cannot add new active tasks over the Free plan limit.'],
  ['Can I change plans?', 'Yes. You can change plans any time in the demo.'],
  ['Where is my data stored?', 'In this browser until a backend is added.'],
]

export default function PricingFaq() {
  const [open, setOpen] = useState(null)
  const reduceMotion = useReducedMotion()

  return (
    <section className="pricing-section pricing-faq" aria-labelledby="faq-title">
      <div className="pricing-section-heading"><div className="eyebrow">GOOD TO KNOW</div><h2 id="faq-title">Frequently asked questions.</h2></div>
      <div className="faq-list">
        {questions.map(([question, answer], index) => {
          const isOpen = open === index
          return <div className="faq-item" key={question}>
            <button type="button" aria-expanded={isOpen} aria-controls={`faq-answer-${index}`} onClick={() => setOpen(isOpen ? null : index)}>
              <span>{question}</span><ChevronDown size={18} aria-hidden="true" />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && <motion.div id={`faq-answer-${index}`} className="faq-answer" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={reduceMotion ? { duration: 0 } : undefined}><p>{answer}</p></motion.div>}
            </AnimatePresence>
          </div>
        })}
      </div>
    </section>
  )
}
