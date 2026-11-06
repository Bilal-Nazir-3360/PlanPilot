import { useState } from 'react'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import ContactForm from './contact/ContactForm'
import ContactInfo from './contact/ContactInfo'
import SuccessState from './contact/SuccessState'

export default function Contact() {
  const [sent, setSent] = useState(false)
  useDocumentTitle('Contact — PlanPilot', 'Send a message to the PlanPilot project and find direct contact links.')
  return <main id="main" className="simple-page contact-page"><div className="eyebrow">GET IN TOUCH</div><h1>Let’s talk</h1><p className="simple-content">Questions, feedback, bug reports or a hiring conversation. This demo sends no email.</p><div className="contact-layout"><div>{sent ? <SuccessState onSendAnother={() => setSent(false)} /> : <ContactForm onSuccess={() => setSent(true)} />}</div><ContactInfo /></div></main>
}
