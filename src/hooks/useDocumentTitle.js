import { useEffect } from 'react'

export default function useDocumentTitle(title, description) {
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
    return () => {
      document.title = 'PlanPilot — Plan boldly. Ship clearly.'
      if (previousDescription === null) meta.remove()
      else meta.setAttribute('content', previousDescription)
    }
  }, [description, title])
}
