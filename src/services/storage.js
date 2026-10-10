const getStorage = () => (typeof window === 'undefined' ? null : window.localStorage)

export function getItem(key, fallback = null) {
  try {
    const storage = getStorage()
    if (!storage) return fallback
    const value = storage.getItem(key)
    return value === null ? fallback : JSON.parse(value)
  } catch {
    return fallback
  }
}

export function setItem(key, value) {
  try {
    const storage = getStorage()
    if (storage) storage.setItem(key, JSON.stringify(value))
  } catch {
    // Browser storage can be unavailable or full; the in-memory state remains usable.
  }
}

export function removeItem(key) {
  try {
    const storage = getStorage()
    if (storage) storage.removeItem(key)
  } catch {
    // Browser storage can be unavailable; logout still clears the in-memory state.
  }
}
