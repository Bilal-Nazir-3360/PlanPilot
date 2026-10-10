import { useEffect, useRef } from 'react'
import { motion, useReducedMotion, useSpring } from 'framer-motion'

export default function SpotlightCard({ as = 'div', className = '', children, interactive = true, tilt = false, ...props }) {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const rotateX = useSpring(0, { stiffness: 220, damping: 24 })
  const rotateY = useSpring(0, { stiffness: 220, damping: 24 })
  const Component = as === 'div' ? motion.div : motion[as]
  const canTrack = interactive && !reduceMotion && typeof window !== 'undefined' && !window.matchMedia('(pointer: coarse)').matches

  useEffect(() => {
    if (!canTrack || !ref.current) return undefined
    let frame = 0
    let latest = null
    const element = ref.current
    const update = () => {
      frame = 0
      if (!latest) return
      const rect = element.getBoundingClientRect()
      const x = ((latest.clientX - rect.left) / rect.width) * 100
      const y = ((latest.clientY - rect.top) / rect.height) * 100
      element.style.setProperty('--mx', `${x}%`)
      element.style.setProperty('--my', `${y}%`)
      if (tilt) {
        rotateX.set(((y - 50) / 50) * -6)
        rotateY.set(((x - 50) / 50) * 6)
      }
    }
    const onPointerMove = (event) => {
      latest = event
      if (!frame) frame = requestAnimationFrame(update)
    }
    const onPointerLeave = () => {
      latest = null
      rotateX.set(0)
      rotateY.set(0)
      element.style.setProperty('--mx', '50%')
      element.style.setProperty('--my', '50%')
    }
    element.addEventListener('pointermove', onPointerMove, { passive: true })
    element.addEventListener('pointerleave', onPointerLeave)
    return () => {
      element.removeEventListener('pointermove', onPointerMove)
      element.removeEventListener('pointerleave', onPointerLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [canTrack, rotateX, rotateY, tilt])

  return <Component ref={ref} className={`spotlight-card ${tilt ? 'spotlight-card-tilt' : ''} ${className}`} style={{ rotateX, rotateY, transformPerspective: 900 }} {...props}>{children}</Component>
}
