import { createContext, useContext, useEffect, useState } from 'react'

const ToastContext = createContext(null)
export function ToastProvider({ children }) {
  const [toast, setToast] = useState('')
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(''), 2600)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [toast])
  return <ToastContext.Provider value={{ toast, setToast }}>{children}</ToastContext.Provider>
}
export const useToast = () => useContext(ToastContext)
