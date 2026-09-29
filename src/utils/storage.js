// -----------------------------------------------------------------------
// storage.js
// Tiny, safe wrappers around localStorage. Some browsers (private mode,
// strict settings) throw when touching localStorage, so every call is
// wrapped in try/catch and simply degrades to "not saved".
// -----------------------------------------------------------------------
export function readStorage(key) {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

export function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    /* ignore - settings just won't persist */
  }
}
