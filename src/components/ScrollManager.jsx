import { useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

const RETRY_WINDOW = 500

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function findHashTarget(hash) {
  return hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
}

function retryUntilFound(callback) {
  const startedAt = performance.now()
  let frame
  const retry = () => {
    if (callback() || performance.now() - startedAt >= RETRY_WINDOW) return
    frame = window.requestAnimationFrame(retry)
  }
  retry()
  return () => window.cancelAnimationFrame(frame)
}

export default function ScrollManager() {
  const location = useLocation()
  const navigationType = useNavigationType()
  const firstRender = useRef(true)
  const previousPathname = useRef(location.pathname)

  useLayoutEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      previousPathname.current = location.pathname
      return undefined
    }

    const pathnameChanged = previousPathname.current !== location.pathname
    previousPathname.current = location.pathname
    if (navigationType === 'POP') return undefined

    const focusMain = () => {
      const main = document.getElementById('main')
      if (!main) return false
      main.tabIndex = -1
      main.style.outline = 'none'
      main.focus({ preventScroll: true })
      return true
    }
    const focusCleanup = retryUntilFound(focusMain)
    let scrollCleanup = () => {}
    if (location.hash) {
      const behavior = prefersReducedMotion() ? 'auto' : 'smooth'
      scrollCleanup = retryUntilFound(() => {
        const hashTarget = findHashTarget(location.hash)
        if (!hashTarget) return false
        hashTarget.scrollIntoView({ behavior, block: 'start' })
        return true
      })
    } else if (pathnameChanged) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
    return () => {
      focusCleanup()
      scrollCleanup()
    }
  }, [location.hash, location.pathname, location.search, navigationType])

  return null
}
