import { useEffect } from 'react'

export default function useDocumentTitle(title, description, noindex = false) {
  useEffect(() => {
    document.title = title
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    const previousDescription = meta.getAttribute('content')
    meta.setAttribute('content', description)
    let robots = document.querySelector('meta[name="robots"]')
    const previousRobots = robots?.getAttribute('content')
    if (noindex) {
      if (!robots) {
        robots = document.createElement('meta')
        robots.name = 'robots'
        document.head.appendChild(robots)
      }
      robots.setAttribute('content', 'noindex, nofollow')
    }
    return () => {
      document.title = 'PlanPilot — Plan boldly. Ship clearly.'
      if (previousDescription === null) meta.remove()
      else meta.setAttribute('content', previousDescription)
      if (noindex && robots) {
        if (previousRobots === undefined || previousRobots === null) robots.remove()
        else robots.setAttribute('content', previousRobots)
      }
    }
  }, [description, noindex, title])
}
