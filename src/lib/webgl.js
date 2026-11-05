// فحص بسيط: هل الجهاز يدعم WebGL؟
let cached
export function hasWebGL() {
  if (cached !== undefined) return cached
  try {
    const c = document.createElement('canvas')
    cached = !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    cached = false
  }
  return cached
}
