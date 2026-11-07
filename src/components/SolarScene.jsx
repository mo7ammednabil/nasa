import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import { Vector3 } from 'three'
import NormalizedModel from './NormalizedModel.jsx'
import ErrorBoundary from './ErrorBoundary.jsx'
import { useLang } from '../i18n.jsx'
import { solar } from '../data/worlds.js'
import { enabledWorlds, pick } from '../lib/content.js'

const reduceMotion =
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// دبوس العالم: نقطة نابضة + اسم، بتتضغط وتفتح شاشة العالم
function WorldPin({ world, onExplore }) {
  const { lang } = useLang()
  const name = pick(world.name, lang)
  return (
    <Html
      center
      zIndexRange={[20, 0]}
      style={{
        top: 0,
        left: 0,
        pointerEvents: 'auto',
        direction: 'ltr',
      }}
    >
      <button
        onClick={() => onExplore(world.id)}
        aria-label={name}
        className="relative grid place-items-center"
        style={{ width: 56, height: 56, background: 'none', border: 0, cursor: 'pointer' }}
      >
        <span
          className="ping absolute rounded-full"
          style={{ inset: 0, margin: 'auto', width: 30, height: 30, border: '2px solid #ffb27a' }}
        />
        <span
          className="absolute rounded-full"
          style={{ inset: 0, margin: 'auto', width: 11, height: 11, background: '#ffb27a', boxShadow: '0 0 12px #ff7a45' }}
        />
        <span
          className="glass absolute rounded-full text-fg"
          style={{
            top: 50,
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '2px 12px',
            whiteSpace: 'nowrap',
            fontSize: 13,
            fontWeight: 600,
            direction: lang === 'ar' ? 'rtl' : 'ltr',
          }}
        >
          {name}
        </span>
      </button>
    </Html>
  )
}

// يلزق الدبوس على مكان الجسم جوه solar.glb
function PinFollower({ target, world, onExplore }) {
  const ref = useRef()
  const v = useMemo(() => new Vector3(), [])
  useFrame(() => {
    if (!target || !ref.current) return
    target.getWorldPosition(v)
    ref.current.position.copy(v)
  })
  return (
    <group ref={ref}>
      <WorldPin world={world} onExplore={onExplore} />
    </group>
  )
}

function SolarModel({ onExplore }) {
  const [nodes, setNodes] = useState({})
  // الحجم بيصغر على الشاشات الضيقة عشان المجسم يفضل كله ظاهر
  const aspect = useThree((s) => s.viewport.aspect)
  const size = solar.size * Math.min(1, aspect / 1.5)

  const onReady = useCallback((scene) => {
    const found = {}
    enabledWorlds().forEach((w) => {
      if (!w.solarNode) return
      const re = new RegExp(w.solarNode, 'i')
      scene.traverse((o) => {
        if (!found[w.id] && re.test(o.name || '')) found[w.id] = o
      })
    })
    setNodes(found)
  }, [])

  return (
    <>
      <NormalizedModel url={solar.model} size={size} onReady={onReady} />
      {enabledWorlds().map(
        (w) => nodes[w.id] && <PinFollower key={w.id} target={nodes[w.id]} world={w} onExplore={onExplore} />,
      )}
    </>
  )
}

// مشهد بديل مبني بالكود لو solar.glb مش موجود
const PLANETS = [
  { name: 'Mercury', r: 0.22, d: 3.2, speed: 1.6, color: '#9a8f86' },
  { name: 'Venus', r: 0.4, d: 4.6, speed: 1.2, color: '#d9a766' },
  { name: 'Earth', r: 0.42, d: 6.0, speed: 1.0, color: '#3d7ab5' },
  { name: 'Mars', r: 0.3, d: 7.4, speed: 0.8, color: '#d4552a' },
  { name: 'Jupiter', r: 1.0, d: 9.8, speed: 0.45, color: '#c9a37a' },
  { name: 'Saturn', r: 0.85, d: 12.0, speed: 0.34, color: '#d8c08a', ring: true },
  { name: 'Uranus', r: 0.55, d: 13.8, speed: 0.24, color: '#8fc9cf' },
  { name: 'Neptune', r: 0.55, d: 15.4, speed: 0.18, color: '#4a66c2' },
]

function Planet({ p, onExplore }) {
  const ref = useRef()
  const phase = useMemo(() => Math.random() * Math.PI * 2, [])
  const world = enabledWorlds().find((w) => w.solarNode && new RegExp(w.solarNode, 'i').test(p.name))
  useFrame(({ clock }) => {
    if (!ref.current) return
    const a = phase + (reduceMotion ? 0 : clock.elapsedTime * 0.12 * p.speed)
    ref.current.position.set(Math.cos(a) * p.d, 0, Math.sin(a) * p.d)
  })
  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[p.r, 24, 24]} />
        <meshStandardMaterial color={p.color} roughness={0.9} />
      </mesh>
      {p.ring && (
        <mesh rotation={[Math.PI / 2.3, 0, 0]}>
          <ringGeometry args={[p.r * 1.4, p.r * 2.1, 48]} />
          <meshBasicMaterial color="#cdb78a" side={2} transparent opacity={0.7} />
        </mesh>
      )}
      {world && <WorldPin world={world} onExplore={onExplore} />}
    </group>
  )
}

function ProceduralSolar({ onExplore }) {
  return (
    <group scale={1.25}>
      <mesh>
        <sphereGeometry args={[1.7, 32, 32]} />
        <meshBasicMaterial color="#f2b441" />
      </mesh>
      {PLANETS.map((p) => (
        <group key={p.name}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[p.d - 0.02, p.d + 0.02, 96]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.14} side={2} />
          </mesh>
          <Planet p={p} onExplore={onExplore} />
        </group>
      ))}
    </group>
  )
}

// على الشاشات الكبيرة بنزيح المجموعة الشمسية بعيد عن النص
function ViewShift() {
  const { camera, size } = useThree()
  const { dir } = useLang()
  useEffect(() => {
    const shift = size.width >= 768 ? size.width * 0.18 * (dir === 'rtl' ? 1 : -1) : 0
    camera.setViewOffset(size.width, size.height, shift, 0, size.width, size.height)
    return () => camera.clearViewOffset()
  }, [camera, size, dir])
  return null
}

export default function SolarScene({ onExplore }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 9, 22], fov: 38 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      style={{ direction: 'ltr' }}
      dir="ltr"
      aria-label="Solar system"
    >
      <ViewShift />
      <ambientLight intensity={1.6} />
      <pointLight position={[0, 0, 0]} intensity={900} decay={2} color="#ffd9a0" />
      <directionalLight position={[8, 10, 6]} intensity={1.2} />
      <Suspense fallback={null}>
        <ErrorBoundary fallback={<ProceduralSolar onExplore={onExplore} />}>
          <SolarModel onExplore={onExplore} />
        </ErrorBoundary>
      </Suspense>
      <OrbitControls
        enablePan={false}
        enableDamping
        minDistance={9}
        maxDistance={40}
        autoRotate={!reduceMotion}
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI * 0.62}
      />
    </Canvas>
  )
}
