import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { BACKGROUND_ANIMATION } from '../data/site'

const IDLE_TIMEOUT = 1000
const FRAME_INTERVAL = 1000 / 30
const RESIZE_DEBOUNCE = 200
const TRANSITION_DURATION = 600

const hexToRgb = (value) => {
  const match = value.trim().match(/^#([0-9a-f]{3,8})$/i)
  if (!match) return null
  const hex = match[1]
  if (hex.length === 3) return hex.split('').map((part) => parseInt(part + part, 16))
  if (hex.length >= 6) return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)]
  return null
}

const readColor = (value, fallback) => {
  const hex = hexToRgb(value)
  if (hex) return hex
  const rgb = value.match(/\d+/g)
  return rgb ? rgb.slice(0, 3).map(Number) : fallback
}

const colorWithOpacity = (color, opacity) => `rgba(${color.join(',')},${opacity})`

function FlowBackground({ variant = 'full' }) {
  const canvasRef = useRef(null)
  const [ready, setReady] = useState(false)
  const { theme } = useTheme()
  const { pathname } = useLocation()

  useEffect(() => {
    if (!BACKGROUND_ANIMATION || pathname === '/dashboard/tasks') return undefined
    if (typeof navigator !== 'undefined' && navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) return undefined

    let idleId
    let timeoutId
    const mount = () => setReady(true)
    if ('requestIdleCallback' in window) idleId = window.requestIdleCallback(mount, { timeout: IDLE_TIMEOUT })
    else timeoutId = window.setTimeout(mount, 0)
    return () => {
      if (idleId !== undefined && 'cancelIdleCallback' in window) window.cancelIdleCallback(idleId)
      if (timeoutId !== undefined) window.clearTimeout(timeoutId)
    }
  }, [pathname])

  useEffect(() => {
    if (!ready || !canvasRef.current || !BACKGROUND_ANIMATION || pathname === '/dashboard/tasks') return undefined

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    if (!context) return undefined

    let width = 0
    let height = 0
    let dpr = 1
    let animationFrame
    let resizeTimeout
    let lastFrame = 0
    let paused = document.hidden
    let colors = { text: [167, 165, 158], accent: [230, 180, 80], ok: [111, 191, 142] }
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const chipCount = variant === 'quiet' ? 8 : 20
    const chips = []

    const updateColors = () => {
      const styles = getComputedStyle(document.documentElement)
      colors = {
        text: readColor(styles.getPropertyValue('--text-muted'), colors.text),
        accent: readColor(styles.getPropertyValue('--accent'), colors.accent),
        ok: readColor(styles.getPropertyValue('--ok'), colors.ok),
      }
    }

    const laneCount = () => window.innerWidth < 640 ? 1 : 3
    const laneFor = (x) => Math.min(laneCount() - 1, Math.floor((x / Math.max(width, 1)) * laneCount()))
    const laneColor = (lane) => [colors.text, colors.accent, colors.ok][lane] || colors.text
    const resetChip = (chip, x = Math.random() * Math.max(width, 1)) => {
      chip.x = x
      chip.y = Math.random() * Math.max(height, 1)
      chip.width = 28 + Math.random() * 28
      chip.height = 10 + Math.random() * 4
      chip.speed = 6 + Math.random() * 8
      chip.lane = laneFor(chip.x)
      chip.previousLane = chip.lane
      chip.transitionStarted = 0
    }

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      chips.forEach((chip) => {
        chip.x = Math.min(chip.x, width)
        chip.y = Math.min(chip.y, height)
        chip.lane = laneFor(chip.x)
        chip.previousLane = chip.lane
      })
    }

    const draw = (timestamp = 0) => {
      context.clearRect(0, 0, width, height)
      const lanes = laneCount()
      context.setLineDash([1, 7])
      context.lineWidth = 1
      context.strokeStyle = colorWithOpacity(colors.text, 0.06)
      for (let lane = 1; lane < lanes; lane += 1) {
        const x = (width / lanes) * lane
        context.beginPath()
        context.moveTo(x, 0)
        context.lineTo(x, height)
        context.stroke()
      }
      context.setLineDash([])

      const opacityMultiplier = variant === 'quiet' ? 0.5 : 1
      chips.forEach((chip) => {
        const currentLane = laneFor(chip.x)
        if (currentLane !== chip.lane) {
          chip.previousLane = chip.lane
          chip.lane = currentLane
          chip.transitionStarted = timestamp
        }
        const transitionProgress = chip.transitionStarted ? Math.min(1, (timestamp - chip.transitionStarted) / TRANSITION_DURATION) : 1
        const oldColor = laneColor(chip.previousLane)
        const newColor = laneColor(chip.lane)
        const oldOpacity = [0.1, 0.16, 0.14][chip.previousLane] || 0.1
        const newOpacity = [0.1, 0.16, 0.14][chip.lane] || 0.1
        context.fillStyle = colorWithOpacity(oldColor, oldOpacity * (1 - transitionProgress) * opacityMultiplier)
        context.beginPath()
        context.roundRect(chip.x, chip.y, chip.width, chip.height, 3)
        context.fill()
        context.fillStyle = colorWithOpacity(newColor, newOpacity * transitionProgress * opacityMultiplier)
        context.beginPath()
        context.roundRect(chip.x, chip.y, chip.width, chip.height, 3)
        context.fill()
      })
    }

    const frame = (timestamp) => {
      if (paused) return
      if (timestamp - lastFrame < FRAME_INTERVAL) {
        animationFrame = requestAnimationFrame(frame)
        return
      }
      const elapsed = lastFrame ? (timestamp - lastFrame) / 1000 : 0
      lastFrame = timestamp
      chips.forEach((chip) => {
        chip.x += chip.speed * elapsed
        chip.y += Math.sin(timestamp / 2500 + chip.phase) * 0.04
        if (chip.x > width + chip.width) resetChip(chip, -chip.width)
      })
      draw(timestamp)
      if (!reducedMotion) animationFrame = requestAnimationFrame(frame)
    }

    updateColors()
    for (let index = 0; index < chipCount; index += 1) {
      const chip = { phase: Math.random() * Math.PI * 2 }
      resetChip(chip)
      chips.push(chip)
    }
    resize()
    draw()
    if (!reducedMotion) animationFrame = requestAnimationFrame(frame)

    const observer = new MutationObserver(updateColors)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] })
    const onVisibilityChange = () => {
      paused = document.hidden
      if (!paused && !reducedMotion) {
        lastFrame = performance.now()
        animationFrame = requestAnimationFrame(frame)
      } else if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
    const onResize = () => {
      window.clearTimeout(resizeTimeout)
      resizeTimeout = window.setTimeout(resize, RESIZE_DEBOUNCE)
    }
    document.addEventListener('visibilitychange', onVisibilityChange)
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.clearTimeout(resizeTimeout)
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibilityChange)
      window.removeEventListener('resize', onResize)
    }
  }, [ready, pathname, theme, variant])

  if (!ready || !BACKGROUND_ANIMATION || pathname === '/dashboard/tasks') return null
  return <canvas ref={canvasRef} className="flow-background" aria-hidden="true" />
}

export default FlowBackground
