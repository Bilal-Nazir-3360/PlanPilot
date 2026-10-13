import { useEffect, useRef, useState } from 'react'

export default function LazySection({ children, className = '' }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current || !('IntersectionObserver' in window)) {
      setVisible(true)
      return undefined
    }
    const fallback = window.setTimeout(() => setVisible(true), 1500)
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
        window.clearTimeout(fallback)
      }
    }, { rootMargin: '240px 0px' })
    observer.observe(ref.current)
    return () => {
      observer.disconnect()
      window.clearTimeout(fallback)
    }
  }, [])

  return <div ref={ref} className={className}>{visible ? children : <div className="lazy-section-placeholder" aria-hidden="true" />}</div>
}
