import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import Button from './Button'

export default function DeleteConfirm({ task, close, confirm }) {
  const modalRef = useRef(null)
  useEffect(() => {
    const previous = document.activeElement
    const focusable = modalRef.current?.querySelectorAll('button')
    focusable?.[0]?.focus()
    const onKeyDown = (event) => {
      if (event.key === 'Escape') close()
      if (event.key === 'Tab' && focusable?.length) {
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      previous?.focus?.()
    }
  }, [close])
  return <div className="modal-back" role="presentation"><div className="modal" ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="delete-task-title" aria-describedby="delete-task-description"><div className="card-head"><h3 id="delete-task-title">Delete task?</h3><button className="icon-btn" onClick={close} aria-label="Close delete confirmation"><X size={18}/></button></div><p id="delete-task-description" className="muted">Delete “{task.title}”? This action cannot be undone.</p><div className="modal-actions"><Button variant="ghost" onClick={close}>Cancel</Button><Button variant="danger" onClick={confirm}>Delete task</Button></div></div></div>
}
