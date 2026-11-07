import { useLang } from '../i18n.jsx'
import { useAgeGroup } from '../lib/ageGroup.jsx'
import { pick } from '../lib/content.js'

export default function AgeToggle({ onClick, className = '' }) {
  const { lang, t } = useLang()
  const { ageGroup } = useAgeGroup()

  if (!ageGroup) return null

  return (
    <button
      onClick={onClick}
      className={`icon-btn !gap-2 !px-3 text-xs font-semibold ${className}`}
      style={{
        border: `1px solid ${ageGroup.borderColor}`,
        background: ageGroup.bgColor,
        color: ageGroup.color,
      }}
      aria-label={`${t.changeAge}: ${pick(ageGroup.name, lang)}`}
      title={t.changeAge}
    >
      <span className="text-sm" aria-hidden="true">{ageGroup.icon}</span>
      <span className="hidden sm:inline">{pick(ageGroup.name, lang)}</span>
      <span className="opacity-70 text-[0.7rem]">({pick(ageGroup.ages, lang)})</span>
    </button>
  )
}

