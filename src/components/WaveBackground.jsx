import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { BACKGROUND_ANIMATION } from '../data/site'

export const LINE_COUNT = 12
export const SPEED_MULTIPLIER = 1
export const LINE_OPACITY = 0.55
export const ACCENT_OPACITY = 0.28
export const AMPLITUDE_SCALE = 1

const SEED = 173
const idleTimeout = 1000

const seededValue = (index, min, max) => {
  const value = Math.sin(SEED + index * 12.9898) * 43758.5453
  const fraction = value - Math.floor(value)
  return min + fraction * (max - min)
}

const buildWavePath = (center, amplitude, wavelength) => {
  const cyclesPerTile = Math.max(1, Math.round(1200 / wavelength))
  const segmentWidth = 1200 / (cyclesPerTile * 2)
  const controlOffset = segmentWidth * 0.552
  let path = `M 0 ${center}`

  for (let tile = 0; tile < 2; tile += 1) {
    for (let segment = 0; segment < cyclesPerTile * 2; segment += 1) {
      const start = tile * 1200 + segment * segmentWidth
      const end = start + segmentWidth
      const direction = segment % 2 === 0 ? -1 : 1
      path += ` C ${start + controlOffset} ${center + direction * amplitude}, ${end - controlOffset} ${center + direction * amplitude}, ${end} ${center}`
    }
  }

  return path
}

const lineParameters = Array.from({ length: LINE_COUNT }, (_, index) => {
  const wavelength = Math.round(seededValue(index, 500, 1100))
  const amplitude = Math.round(seededValue(index + 20, 14, 60))
  const position = Math.round(8 + (84 / (LINE_COUNT - 1)) * index)
  const duration = Math.round(seededValue(index + 40, 70, 160))
  const phase = seededValue(index + 60, 0, Math.PI * 2)
  const center = 500 + Math.sin(phase) * 90
  const scaledAmplitude = amplitude * AMPLITUDE_SCALE
  const path = buildWavePath(center, scaledAmplitude, wavelength)

  return {
    amplitude,
    duration,
    index,
    path,
    position,
    wavelength,
  }
})

function WaveBackground() {
  const { pathname } = useLocation()
  const [ready, setReady] = useState(false)
  const [hidden, setHidden] = useState(false)
  const dashboard = pathname.startsWith('/dashboard')
  const tasks = pathname === '/dashboard/tasks'
  const lines = useMemo(() => lineParameters.slice(0, dashboard ? 6 : LINE_COUNT), [dashboard])

  useEffect(() => {
    if (!BACKGROUND_ANIMATION) return undefined

    let idleId
    let timeoutId
    const mount = () => setReady(true)
    if ('requestIdleCallback' in window) idleId = window.requestIdleCallback(mount, { timeout: idleTimeout })
    else timeoutId = window.setTimeout(mount, 0)

    const onVisibilityChange = () => setHidden(document.hidden)
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => {
      if (idleId !== undefined && 'cancelIdleCallback' in window) window.cancelIdleCallback(idleId)
      if (timeoutId !== undefined) window.clearTimeout(timeoutId)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  if (!BACKGROUND_ANIMATION || !ready || tasks) return null

  return (
    <div className={`wave-background${hidden ? ' is-paused' : ''}${dashboard ? ' is-dashboard' : ''}`} aria-hidden="true">
      {lines.map((line) => (
        <svg
          className={`wave-background__layer${line.index % 4 === 3 ? ' is-accent' : ''}${line.index % 8 === 3 || line.index % 8 === 7 ? ' is-drifting' : ''}${line.index % 2 ? ' is-reversed' : ''}`}
          key={line.index}
          viewBox="0 0 2400 1000"
          preserveAspectRatio="none"
          style={{
            '--wave-amplitude': `${line.amplitude}px`,
            '--wave-line-opacity': LINE_OPACITY,
            '--wave-accent-opacity': ACCENT_OPACITY,
            '--wave-duration': `${line.duration / SPEED_MULTIPLIER}s`,
            '--wave-position': `${line.position}%`,
            '--wave-path-width': `${line.wavelength}px`,
          }}
        >
          <path d={line.path} />
        </svg>
      ))}
    </div>
  )
}

export default WaveBackground
