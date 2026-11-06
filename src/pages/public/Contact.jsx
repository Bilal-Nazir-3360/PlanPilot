import { useState } from 'react'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import ContactForm from './contact/ContactForm'
import ContactInfo from './contact/ContactInfo'
import SuccessState from './contact/SuccessState'
import SplitSection from '../../components/ui/SplitSection'

export default function Contact() {
  const [sent, setSent] = useState(false)
  useDocumentTitle('Contact — PlanPilot', 'Send a message to the PlanPilot project and find direct contact links.')
  return <main id="main" className="contact-page"><SplitSection className="contact-section" eyebrow="GET IN TOUCH" title="Let’s talk" description="Questions, feedback, bug reports or a hiring conversation. This demo sends no email." labelledBy="contact-title"><div className="contact-layout"><div>{sent ? <SuccessState onSendAnother={() => setSent(false)} /> : <ContactForm onSuccess={() => setSent(true)} />}</div><ContactInfo /></div></SplitSection></main>
}
