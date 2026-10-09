import { useEffect, useRef } from 'react'

/**
 * A restrained aurora mesh that stays behind the interface.
 * The canvas reads PlanPilot's theme class so the in-app toggle updates it too.
 */
export function AmbientBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const pointer = { x: 0.5, y: 0.45, targetX: 0.5, targetY: 0.45 }
    let width = 0
    let height = 0
    let dpr = 1
    let time = 0
    let animationFrame = 0
    let themeObserver

    const isDark = () => document.documentElement.classList.contains('dark')

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const paintGlow = (x, y, radius, color) => {
      const glow = context.createRadialGradient(x, y, 0, x, y, radius)
      glow.addColorStop(0, color)
      glow.addColorStop(0.45, color.replace(/0\.\d+\)/, '0.045)'))
      glow.addColorStop(1, 'rgba(0, 0, 0, 0)')
      context.fillStyle = glow
      context.fillRect(0, 0, width, height)
    }

    const paintRibbon = (offset, amplitude, color) => {
      context.beginPath()
      for (let x = -40; x <= width + 40; x += 18) {
        const normalized = x / Math.max(width, 1)
        const wave = Math.sin(normalized * 5.4 + time * 0.22 + offset) * amplitude
        const secondary = Math.cos(normalized * 11 - time * 0.12 + offset) * amplitude * 0.22
        const y = height * (0.38 + offset * 0.055) + wave + secondary
        if (x === -40) context.moveTo(x, y)
        else context.lineTo(x, y)
      }
      context.strokeStyle = color
      context.lineWidth = Math.max(1, Math.min(width, height) * 0.0022)
      context.shadowBlur = 24
      context.shadowColor = color
      context.stroke()
      context.shadowBlur = 0
    }

    const draw = () => {
      time += reducedMotion.matches ? 0 : 0.006
      pointer.x += (pointer.targetX - pointer.x) * 0.035
      pointer.y += (pointer.targetY - pointer.y) * 0.035

      const dark = isDark()
      context.clearRect(0, 0, width, height)
      context.fillStyle = dark ? '#080b12' : '#f7f9fc'
      context.fillRect(0, 0, width, height)

      const parallaxX = (pointer.x - 0.5) * 42
      const parallaxY = (pointer.y - 0.5) * 28
      const scale = Math.max(width, height)
      paintGlow(width * 0.12 + parallaxX, height * 0.05 + parallaxY, scale * 0.7, dark ? 'rgba(86, 137, 255, 0.16)' : 'rgba(67, 115, 232, 0.12)')
      paintGlow(width * 0.92 - parallaxX, height * 0.18 - parallaxY, scale * 0.62, dark ? 'rgba(153, 111, 255, 0.13)' : 'rgba(115, 91, 224, 0.09)')
      paintGlow(width * 0.52, height * 1.02, scale * 0.7, dark ? 'rgba(38, 196, 174, 0.10)' : 'rgba(28, 166, 149, 0.07)')

      context.save()
      context.globalAlpha = dark ? 0.07 : 0.045
      context.strokeStyle = dark ? '#b8c9ee' : '#41618c'
      context.lineWidth = 1
      const gridSize = Math.max(44, Math.min(72, width / 22))
      for (let x = -gridSize; x < width + gridSize; x += gridSize) {
        context.beginPath()
        context.moveTo(x, 0)
        context.lineTo(x + Math.sin(time * 0.4 + x * 0.01) * 7, height)
        context.stroke()
      }
      for (let y = 0; y < height; y += gridSize) {
        context.beginPath()
        context.moveTo(0, y)
        context.lineTo(width, y + Math.cos(time * 0.35 + y * 0.01) * 7)
        context.stroke()
      }
      context.restore()

      context.save()
      context.globalAlpha = dark ? 0.42 : 0.28
      paintRibbon(0.2, height * 0.075, dark ? 'rgba(112, 155, 255, 0.32)' : 'rgba(72, 119, 231, 0.18)')
      context.globalAlpha = dark ? 0.25 : 0.16
      paintRibbon(1.65, height * 0.055, dark ? 'rgba(183, 130, 255, 0.28)' : 'rgba(123, 92, 226, 0.15)')
      context.restore()

      if (!reducedMotion.matches) animationFrame = requestAnimationFrame(draw)
    }

    const onPointerMove = (event) => {
      pointer.targetX = event.clientX / Math.max(width, 1)
      pointer.targetY = event.clientY / Math.max(height, 1)
    }

    const restart = () => {
      cancelAnimationFrame(animationFrame)
      draw()
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    reducedMotion.addEventListener('change', restart)
    themeObserver = new MutationObserver(restart)
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      reducedMotion.removeEventListener('change', restart)
      themeObserver?.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  )
}

export default AmbientBackground
