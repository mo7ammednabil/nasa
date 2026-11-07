import { useState } from 'react'
import WelcomeScreen from './components/WelcomeScreen.jsx'
import WorldScreen from './components/WorldScreen.jsx'
import AgeSelectScreen from './components/AgeSelectScreen.jsx'
import { getWorld } from './lib/content.js'
import { useAgeGroup } from './lib/ageGroup.jsx'

export default function App() {
  const [worldId, setWorldId] = useState(null)
  const [pendingWorldId, setPendingWorldId] = useState(null)
  const [isChangingAge, setIsChangingAge] = useState(false)
  const { ageGroupId } = useAgeGroup()

  const world = worldId ? getWorld(worldId) : null

  function handleStartExplore(targetWorldId) {
    if (!ageGroupId) {
      setPendingWorldId(targetWorldId)
      setIsChangingAge(true)
    } else {
      setWorldId(targetWorldId)
    }
  }

  function handleAgeConfirmed() {
    setIsChangingAge(false)
    if (pendingWorldId) {
      setWorldId(pendingWorldId)
      setPendingWorldId(null)
    }
  }

  if (isChangingAge) {
    return (
      <main className="h-full overflow-hidden">
        <AgeSelectScreen
          onConfirm={handleAgeConfirmed}
          onBack={worldId || (!pendingWorldId && ageGroupId) ? () => setIsChangingAge(false) : null}
        />
      </main>
    )
  }

  return (
    <main className="h-full overflow-hidden">
      {world ? (
        <WorldScreen
          key={world.id}
          world={world}
          onBack={() => setWorldId(null)}
          onChangeAge={() => setIsChangingAge(true)}
        />
      ) : (
        <WelcomeScreen
          onExplore={handleStartExplore}
          onChangeAge={() => setIsChangingAge(true)}
        />
      )}
    </main>
  )
}
