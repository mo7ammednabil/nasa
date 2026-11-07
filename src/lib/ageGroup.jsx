// ============================================================================
// Age Group system — definitions, localStorage persistence, React context
// ============================================================================
import { createContext, useCallback, useContext, useMemo, useState } from 'react'

// ── Definitions ──────────────────────────────────────────────────────────────
export const AGE_GROUPS = [
  {
    id: 'kids',
    icon: '🚀',
    color: '#6ee7a8',       // green-ish
    bgColor: 'rgba(52, 211, 153, 0.12)',
    borderColor: 'rgba(52, 211, 153, 0.35)',
    ages: { ar: '٦ – ٩ سنوات', en: 'Ages 6 – 9' },
    name: { ar: 'المستكشفون الصغار', en: 'Little Explorers' },
    description: {
      ar: 'قصص ممتعة وصور بسيطة. تعرّف على المركبات الفضائية بأسلوب مناسب لك!',
      en: "Fun stories and simple pictures. Learn about space robots in a way that's just right for you!",
    },
  },
  {
    id: 'teens',
    icon: '🔭',
    color: '#93c5fd',       // blue
    bgColor: 'rgba(96, 165, 250, 0.12)',
    borderColor: 'rgba(96, 165, 250, 0.35)',
    ages: { ar: '١٠ – ١٤ سنة', en: 'Ages 10 – 14' },
    name: { ar: 'العلماء الشباب', en: 'Young Scientists' },
    description: {
      ar: 'معلومات علمية واضحة، حقائق مثيرة، ومقارنات رائعة عن المهمات الفضائية.',
      en: 'Clear science, exciting facts, and cool comparisons about real space missions.',
    },
  },
  {
    id: 'researchers',
    icon: '🛰️',
    color: '#c4b5fd',       // purple
    bgColor: 'rgba(167, 139, 250, 0.12)',
    borderColor: 'rgba(167, 139, 250, 0.35)',
    ages: { ar: '١٥+ سنة', en: 'Ages 15+' },
    name: { ar: 'باحثو الفضاء', en: 'Space Researchers' },
    description: {
      ar: 'تفاصيل تقنية وعلمية، أهداف المهمات، أدواتها، وتحدياتها الهندسية.',
      en: 'Technical details, mission objectives, instruments, and engineering challenges.',
    },
  },
]

export const getAgeGroup = (id) => AGE_GROUPS.find((g) => g.id === id) || null

// ── Persistence ───────────────────────────────────────────────────────────────
const STORAGE_KEY = 'ageGroup'

function readStoredAgeGroup() {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (AGE_GROUPS.some((g) => g.id === v)) return v
  } catch { /* storage blocked */ }
  return null
}

// ── Context ───────────────────────────────────────────────────────────────────
const AgeGroupContext = createContext(null)

export function AgeGroupProvider({ children }) {
  const [ageGroupId, setAgeGroupIdState] = useState(readStoredAgeGroup)

  const setAgeGroup = useCallback((id) => {
    setAgeGroupIdState(id)
    try {
      if (id) localStorage.setItem(STORAGE_KEY, id)
      else localStorage.removeItem(STORAGE_KEY)
    } catch { /* ignore */ }
  }, [])

  const ageGroup = getAgeGroup(ageGroupId)

  const value = useMemo(
    () => ({ ageGroupId, ageGroup, setAgeGroup }),
    [ageGroupId, ageGroup, setAgeGroup],
  )
  return <AgeGroupContext.Provider value={value}>{children}</AgeGroupContext.Provider>
}

export const useAgeGroup = () => useContext(AgeGroupContext)
