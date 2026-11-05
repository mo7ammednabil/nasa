import { useState } from 'react'
import WelcomeScreen from './components/WelcomeScreen.jsx'
import WorldScreen from './components/WorldScreen.jsx'
import { getWorld } from './lib/content.js'

export default function App() {
  const [worldId, setWorldId] = useState(null)
  const world = worldId ? getWorld(worldId) : null

  return (
    <main className="h-full">
      {world ? (
        <WorldScreen key={world.id} world={world} onBack={() => setWorldId(null)} />
      ) : (
        <WelcomeScreen onExplore={setWorldId} />
      )}
    </main>
  )
}
