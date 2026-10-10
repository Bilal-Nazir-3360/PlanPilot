import { Check, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '../../../components/ui/Button'
import Modal from '../../../components/ui/Modal'
import StatusBadge from './StatusBadge'

function ModalVisual({ feature }) {
  if (feature.id === 'tasks') return <div className="feature-demo"><h3>Live task flow</h3><div className="demo-board">{['Todo', 'In progress', 'Done'].map((status, index) => <div className="demo-lane" key={status}><b>{status}</b>{index === 1 && <motion.span className="demo-pill" layout>Polish onboarding</motion.span>}{index === 2 && <span className="demo-pill">Analytics events</span>}</div>)}</div></div>
  if (feature.id === 'themes') return <div className="feature-demo feature-demo-theme"><h3>Theme ready</h3><div><span className="theme-orb dark-orb"/> <span className="theme-orb light-orb"/> <b>Dark and light modes</b></div></div>
  return <div className="feature-demo"><h3>{feature.status === 'Coming soon' ? 'Product direction' : 'Sample view'}</h3><div className="modal-bars"><i/><i/><i/><i/></div></div>
}

export default function FeatureModal({ feature, close }) {
  if (!feature) return null
  return <Modal onClose={close} layoutId={`feature-${feature.id}`} labelledBy={`feature-modal-${feature.id}`} className="feature-modal">
    <div className="card-head"><div><StatusBadge status={feature.status}/><h2 id={`feature-modal-${feature.id}`}>{feature.title}</h2></div><button type="button" className="icon-btn" onClick={close} aria-label="Close feature details"><X size={18}/></button></div>
    <div className="feature-modal-content"><p>{feature.description}</p><ModalVisual feature={feature}/><ul className="feature-capabilities">{feature.capabilities.map((capability) => <li key={capability}><Check size={15}/>{capability}</li>)}</ul>{feature.status === 'Live' && <Link to="/login" onClick={close}><Button>Try it in the demo</Button></Link>}</div>
  </Modal>
}
