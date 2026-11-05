import { useEffect, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { Box3, Vector3 } from 'three'

/**
 * بيحمّل ملف GLB وبيظبط حجمه ومكانه تلقائيًا،
 * عشان أي موديل (مهما كان مقياسه الأصلي) يظهر بالحجم المطلوب في نص المشهد.
 *
 * size     : أكبر بُعد للموديل بعد الضبط
 * grounded : لو true، أسفل الموديل بيلزق في y = 0 (للمركبة)
 * onReady  : بيرجّع نسخة المشهد بعد التحميل (نستخدمها لإيجاد كوكب المريخ مثلًا)
 */
export default function NormalizedModel({ url, size = 4, grounded = false, onReady, ...props }) {
  const { scene } = useGLTF(url)
  const cloned = useMemo(() => scene.clone(true), [scene])

  const { k, offset } = useMemo(() => {
    const box = new Box3().setFromObject(cloned)
    const s = box.getSize(new Vector3())
    const c = box.getCenter(new Vector3())
    const max = Math.max(s.x, s.y, s.z) || 1
    const k = size / max
    const offset = new Vector3(-c.x, grounded ? -box.min.y : -c.y, -c.z)
    return { k, offset }
  }, [cloned, size, grounded])

  useEffect(() => {
    onReady?.(cloned)
  }, [cloned, onReady])

  return (
    <group scale={k} {...props}>
      <primitive object={cloned} position={offset} />
    </group>
  )
}
