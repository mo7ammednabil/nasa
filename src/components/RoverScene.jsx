import { Suspense, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, OrbitControls } from '@react-three/drei'
import NormalizedModel from './NormalizedModel.jsx'
import ErrorBoundary from './ErrorBoundary.jsx'

// مجسم بديل بسيط لحد ما تضيف ملف الموديل
function PlaceholderRover() {
  const wheel = (x, z) => (
    <mesh key={`${x}${z}`} position={[x, 0.32, z]} rotation={[0, 0, Math.PI / 2]}>
      <cylinderGeometry args={[0.32, 0.32, 0.22, 20]} />
      <meshStandardMaterial color="#1b1d24" roughness={0.9} />
    </mesh>
  )
  return (
    <group>
      <mesh position={[0, 0.95, 0]}>
        <boxGeometry args={[1.5, 0.45, 2.2]} />
        <meshStandardMaterial color="#cfc6b4" roughness={0.6} />
      </mesh>
      <mesh position={[0, 1.4, -0.5]}>
        <boxGeometry args={[1.5, 0.06, 1.1]} />
        <meshStandardMaterial color="#1f3b5c" roughness={0.4} metalness={0.3} />
      </mesh>
      <mesh position={[0.3, 1.75, 0.8]}>
        <cylinderGeometry args={[0.05, 0.05, 0.9, 10]} />
        <meshStandardMaterial color="#aaa" />
      </mesh>
      <mesh position={[0.3, 2.25, 0.8]}>
        <boxGeometry args={[0.35, 0.2, 0.25]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      {[-1, 0, 1].flatMap((z) => [wheel(-0.95, z * 0.9), wheel(0.95, z * 0.9)])}
    </group>
  )
}

function Rover({ craft, onSelect }) {
  const [hover, setHover] = useState(false)
  const size = craft.modelSize || 4.2

  const over = (e) => {
    e.stopPropagation()
    setHover(true)
    document.body.style.cursor = 'pointer'
  }
  const out = () => {
    setHover(false)
    document.body.style.cursor = ''
  }

  return (
    <group
      onClick={(e) => {
        e.stopPropagation()
        onSelect()
      }}
      onPointerOver={over}
      onPointerOut={out}
      scale={hover ? 1.03 : 1}
    >
      {/* صندوق شفاف أكبر من المركبة: أي ضغطة حواليها بتتحسب ضغطة على المركبة */}
      <mesh position={[0, size * 0.4, 0]}>
        <boxGeometry args={[size * 1.9, size * 0.95, size * 1.7]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      <ErrorBoundary key={craft.id} fallback={<PlaceholderRover />}>
        <Suspense fallback={null}>
          <NormalizedModel url={craft.model} size={size} grounded />
        </Suspense>
      </ErrorBoundary>
    </group>
  )
}

// لما لوحة المعلومات تفتح على الموبايل، المساحة بتصغر، فنبعّد الكاميرا شوية
function CameraZoom({ compact }) {
  useFrame(({ camera }) => {
    const target = compact ? 0.5 : 1
    if (Math.abs(camera.zoom - target) > 0.002) {
      camera.zoom += (target - camera.zoom) * 0.12
      camera.updateProjectionMatrix()
    }
  })
  return null
}

export default function RoverScene({ craft, onSelect, compact }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [5.5, 2.6, 6.5], fov: 36 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      aria-label={craft.name.en}
    >
      <hemisphereLight args={['#ffd7a8', '#7a3a1a', 1.4]} />
      <directionalLight position={[-6, 8, 4]} intensity={2.4} color="#ffe2b8" />
      <Rover craft={craft} onSelect={onSelect} />
      <CameraZoom compact={compact} />
      <ContactShadows position={[0, 0.01, 0]} opacity={0.55} scale={14} blur={2.6} far={4} color="#1a0a05" />
      <OrbitControls
  makeDefault
  target={[0, 1.4, 0]}
  enableRotate={true}
  enablePan={true}
  enableZoom={true}
  enableDamping={true}
  dampingFactor={0.05}
  minDistance={3}
  maxDistance={20}
  minPolarAngle={0}
  maxPolarAngle={Math.PI}
  screenSpacePanning={true}
/>
    </Canvas>
  )
}
