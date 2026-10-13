import { useState } from 'react'
import Footer from '../../components/layout/Footer'
import Navbar from '../../components/layout/Navbar'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import ContactForm from './contact/ContactForm'
import ContactInfo from './contact/ContactInfo'
import SuccessState from './contact/SuccessState'

export default function Contact() {
  const [sent, setSent] = useState(false)
  useDocumentTitle('Contact — PlanPilot', 'Save a message locally in the PlanPilot browser demo and find direct project contact links.')
  return <><Navbar /><main id="main" className="simple-page contact-page"><div className="eyebrow">GET IN TOUCH</div><h1>Let’s talk</h1><p className="simple-content">Questions, feedback, bug reports, or hiring conversations? Save a note locally in this browser demo.</p><div className="contact-layout"><div>{sent ? <SuccessState onSendAnother={() => setSent(false)} /> : <ContactForm onSuccess={() => setSent(true)} />}</div><ContactInfo /></div></main><Footer /></>
}
