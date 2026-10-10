import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useId, useRef, useState } from 'react'

const focusableSelector = 'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'

export default function Modal({ open = true, onClose, children, title, labelledBy, className = '', layoutId }) {
  const dialogRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const [touchDevice, setTouchDevice] = useState(false)
  const generatedId = useId()
  const titleId = labelledBy || (title ? `modal-title-${generatedId}` : undefined)

  useEffect(() => {
    setTouchDevice(typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches)
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const previous = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusDialog = () => dialogRef.current?.querySelector(focusableSelector)?.focus()
    const timer = window.setTimeout(focusDialog, 0)
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.()
      if (event.key !== 'Tab') return
      const focusable = dialogRef.current?.querySelectorAll(focusableSelector)
      if (!focusable?.length) return
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
    document.addEventListener('keydown', onKeyDown)
    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      previous?.focus?.()
    }
  }, [onClose, open])

  const dismiss = (_, info) => {
    if (info.offset.y > 120 || info.velocity.y > 700) onClose?.()
  }

  return <AnimatePresence>
    {open && <motion.div className="modal-back animated-modal-back" role="presentation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0.15 : 0.25 }} onMouseDown={(event) => event.target === event.currentTarget && onClose?.()}>
      <motion.div ref={dialogRef} className={`modal animated-modal ${className}`} role="dialog" aria-modal="true" aria-labelledby={titleId} layoutId={layoutId} initial={{ opacity: 0, y: reduceMotion ? 0 : 18, scale: reduceMotion ? 1 : 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: reduceMotion ? 0 : 12, scale: reduceMotion ? 1 : 0.98 }} transition={{ duration: reduceMotion ? 0.15 : 0.28 }} drag={touchDevice && !reduceMotion ? 'y' : false} dragConstraints={{ top: 0, bottom: 0 }} dragElastic={{ top: 0.04, bottom: 0.7 }} onDragEnd={dismiss}>
        {title && <h2 id={titleId} className="sr-only">{title}</h2>}
        {children}
      </motion.div>
    </motion.div>}
  </AnimatePresence>
}
