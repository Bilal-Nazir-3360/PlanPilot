import { X } from 'lucide-react'
import Button from './Button'
import Modal from './Modal'

export default function ConfirmDialog({ open = true, title, message, close, confirm, confirmLabel = 'Confirm' }) {
  const titleId = 'confirm-dialog-title'
  return <Modal open={open} onClose={close} labelledBy={titleId}>
    <div className="card-head"><h3 id={titleId}>{title}</h3><button type="button" className="icon-btn" onClick={close} aria-label="Close confirmation"><X size={18}/></button></div>
    <p className="muted">{message}</p>
    <div className="modal-actions"><Button type="button" variant="ghost" onClick={close}>Cancel</Button><Button type="button" variant="danger" onClick={confirm}>{confirmLabel}</Button></div>
  </Modal>
}
