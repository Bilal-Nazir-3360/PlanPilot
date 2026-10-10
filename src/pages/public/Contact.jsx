import { Mail } from 'lucide-react'
import Button from '../../components/ui/Button'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import { useApp } from '../../context/AppContext'

function Contact(){const {setToast}=useApp();const submit=e=>{e.preventDefault();e.currentTarget.reset();setToast('Message sent — we will be in touch soon')};return <><Navbar/><main className="simple-page contact-page"><div className="eyebrow">GET IN TOUCH</div><h1>Let’s talk</h1><p className="simple-content">Questions, partnerships, or just want to say hello? Send us a message and our team will get back to you.</p><form className="contact-form card" onSubmit={submit}><label>Name<input required name="name" autoComplete="name"/></label><label>Email<input required name="email" type="email" autoComplete="email"/></label><label>Message<textarea required name="message" rows="5"/></label><Button type="submit"><Mail size={15}/> Send message</Button></form></main><Footer/></>}

export default Contact
