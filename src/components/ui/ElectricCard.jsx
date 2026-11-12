import { useEffect, useId, useRef, useState } from 'react'

export const DISPLACEMENT = 6
export const NOISE_FREQUENCY = 0.012
export const SPEED_BASE = 1
export const GLOW_OPACITY_FULL = 0.55
export const GLOW_OPACITY_CALM = 0.15
export const GLOW_BLUR = 6

const activeRegions = new Set()

function ElectricCard({
  as: Component = 'div',
  className = '',
  children,
  color = 'var(--accent)',
  intensity = 'full',
  speed = SPEED_BASE,
  radius = 14,
  borderWidth = 2,
  active = true,
  ...props
}) {
  const cardRef = useRef(null)
  const filterId = `electric-${useId().replace(/:/g, '')}`
  const regionId = useId()
  const [visible, setVisible] = useState(false)
  const [staticMode, setStaticMode] = useState(false)

  useEffect(() => {
    const narrow = window.matchMedia('(max-width: 639px)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const filterSupported = typeof CSS !== 'undefined' && typeof CSS.supports === 'function' && CSS.supports('filter', 'url(#electric-filter)')
    const overflow = getComputedStyle(cardRef.current).overflow
    const fallback = narrow || reduced || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) || !filterSupported || overflow !== 'visible'
    setStaticMode(fallback)
    if (!active || !cardRef.current || narrow || reduced) return undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (activeRegions.size === 0 || activeRegions.has(regionId)) {
          activeRegions.add(regionId)
          setVisible(true)
        }
      } else {
        activeRegions.delete(regionId)
        setVisible(false)
      }
    }, { threshold: 0.1 })
    observer.observe(cardRef.current)
    return () => {
      activeRegions.delete(regionId)
      observer.disconnect()
    }
  }, [active, regionId])

  const effectiveWidth = staticMode ? 1 : borderWidth
  const glowOpacity = intensity === 'calm' ? GLOW_OPACITY_CALM : GLOW_OPACITY_FULL

  return (
    <Component
      ref={cardRef}
      className={`electric-card electric-card-${intensity}${staticMode ? ' is-static' : ''} ${className}`}
      style={{ '--electric-color': color, '--electric-radius': `${radius}px`, '--electric-width': `${effectiveWidth}px`, '--electric-glow-opacity': glowOpacity, '--electric-speed': `${SPEED_BASE / speed}s` }}
      {...props}
    >
      {!staticMode && <svg className="electric-card__effect electric-card__border" style={{ filter: `url(#${filterId}-border)` }} aria-hidden="true" focusable="false">
        <defs>
          <filter id={`${filterId}-border`} filterUnits="userSpaceOnUse" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency={NOISE_FREQUENCY} numOctaves="2" seed="7">
              <animate attributeName="baseFrequency" values={`${NOISE_FREQUENCY};${NOISE_FREQUENCY * 1.15};${NOISE_FREQUENCY}`} dur="9s" repeatCount="indefinite" begin={visible ? '0s' : 'indefinite'} />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale={DISPLACEMENT} />
          </filter>
        </defs>
        <rect x={DISPLACEMENT * 1.5} y={DISPLACEMENT * 1.5} width={`calc(100% - ${DISPLACEMENT * 3}px)`} height={`calc(100% - ${DISPLACEMENT * 3}px)`} rx={radius} />
      </svg>}
      {!staticMode && <svg className="electric-card__effect electric-card__glow" style={{ filter: `blur(${GLOW_BLUR}px) url(#${filterId}-glow)` }} aria-hidden="true" focusable="false">
        <defs>
          <filter id={`${filterId}-glow`} filterUnits="userSpaceOnUse" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency={NOISE_FREQUENCY} numOctaves="2" seed="7">
              <animate attributeName="baseFrequency" values={`${NOISE_FREQUENCY};${NOISE_FREQUENCY * 1.15};${NOISE_FREQUENCY}`} dur="9s" repeatCount="indefinite" begin={visible ? '0s' : 'indefinite'} />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale={DISPLACEMENT} />
          </filter>
        </defs>
        <rect x={DISPLACEMENT * 1.5} y={DISPLACEMENT * 1.5} width={`calc(100% - ${DISPLACEMENT * 3}px)`} height={`calc(100% - ${DISPLACEMENT * 3}px)`} rx={radius} />
      </svg>}
      <div className="electric-card__surface" aria-hidden="true" />
      <div className="electric-card__content">{children}</div>
    </Component>
  )
}

export default ElectricCard
