import { useState } from 'react'
import { useLang } from '../i18n.jsx'
import { AGE_GROUPS, useAgeGroup } from '../lib/ageGroup.jsx'
import { pick } from '../lib/content.js'
import LangToggle from './LangToggle.jsx'

const HIGHLIGHTS = {
  kids: {
    ar: ['لغة سهلة وقصص مشوقة', 'روبوت فضائي ودود', 'أسئلة خفيفة ومسلية'],
    en: ['Friendly simple language', 'Robot companion tone', 'Fun and easy questions'],
  },
  teens: {
    ar: ['شروحات علمية واضحة', 'أسرار وحقائق المهمات', 'تحديات ومصطلحات مفيدة'],
    en: ['Clear scientific facts', 'Mission details & challenges', 'Introduces key terminology'],
  },
  researchers: {
    ar: ['بيانات تقنية وهندسية', 'تحليل الأدوات والجيولوجيا', 'مراجع علمية وأبحاث ناسا'],
    en: ['In-depth technical payload', 'Petrology & telemetry focus', 'NASA scientific sources'],
  },
}

export default function AgeSelectScreen({ onConfirm, onBack, initialSelected }) {
  const { t, lang } = useLang()
  const { ageGroupId, setAgeGroup } = useAgeGroup()
  const [selected, setSelected] = useState(initialSelected || ageGroupId || 'teens')

  function handleChoose(id) {
    setSelected(id)
    setAgeGroup(id)
    onConfirm(id)
  }

  return (
    <div className="relative min-h-full overflow-y-auto overflow-x-hidden bg-base p-4 sm:p-6 md:p-10 flex flex-col justify-between">
      {/* Background glow & stars */}
      <div
        className="pointer-events-none fixed inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse at 50% 20%, rgba(255,122,69,0.12), transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(80,110,255,0.08), transparent 50%)',
        }}
      />

      {/* Top Header */}
      <header className="relative z-10 flex items-center justify-between pb-6">
        <div>
          {onBack ? (
            <button className="icon-btn" onClick={onBack}>
              <span aria-hidden="true">{lang === 'ar' ? '→' : '←'}</span> {t.back}
            </button>
          ) : (
            <span className="glass rounded-full px-3 py-1 text-xs font-medium text-muted">
              {t.kicker}
            </span>
          )}
        </div>
        <LangToggle />
      </header>

      {/* Main Content */}
      <main className="relative z-10 mx-auto w-full max-w-5xl py-4 sm:py-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <p className="eyebrow mb-2 text-accent2">{t.kicker}</p>
          <h1 className="display text-3xl sm:text-4xl md:text-5xl text-fg">
            {t.ageSelectTitle}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-muted leading-relaxed">
            {t.ageSelectSubtitle}
          </p>
        </div>

        {/* 3 Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {AGE_GROUPS.map((g) => {
            const isCurrent = selected === g.id
            const highlights = HIGHLIGHTS[g.id]?.[lang] || HIGHLIGHTS[g.id]?.en || []

            return (
              <div
                key={g.id}
                role="button"
                tabIndex={0}
                onClick={() => handleChoose(g.id)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleChoose(g.id)}
                className={`panel rise group relative flex flex-col justify-between rounded-2xl p-6 transition-all duration-200 cursor-pointer text-start ${
                  isCurrent
                    ? 'ring-2 shadow-2xl scale-[1.02]'
                    : 'hover:-translate-y-1 hover:border-white/25 hover:shadow-xl'
                }`}
                style={{
                  borderColor: isCurrent ? g.color : 'var(--color-line)',
                  ringColor: isCurrent ? g.color : 'transparent',
                  background: isCurrent ? g.bgColor : 'rgba(14, 17, 24, 0.72)',
                }}
              >
                <div>
                  {/* Top row: Icon + Age pill */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className="grid h-12 w-12 place-items-center rounded-xl text-2xl"
                      style={{
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.1)',
                      }}
                      aria-hidden="true"
                    >
                      {g.icon}
                    </span>
                    <span
                      className="rounded-full px-3 py-1 text-xs font-semibold"
                      style={{
                        background: g.bgColor,
                        color: g.color,
                        border: `1px solid ${g.borderColor}`,
                      }}
                    >
                      {pick(g.ages, lang)}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h2 className="text-xl font-bold text-fg mb-2">
                    {pick(g.name, lang)}
                  </h2>
                  <p className="text-sm text-fg/80 leading-relaxed mb-5">
                    {pick(g.description, lang)}
                  </p>

                  {/* Feature highlights */}
                  <ul className="space-y-2 border-t border-white/10 pt-4 text-xs text-muted">
                    {highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span style={{ color: g.color }}>✦</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom button indicator */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    className={`btn w-full !py-2.5 !text-sm ${
                      isCurrent ? '' : 'btn-ghost'
                    }`}
                    style={
                      isCurrent
                        ? { background: g.color, color: '#090b10', borderColor: 'transparent' }
                        : {}
                    }
                  >
                    {isCurrent ? (
                      <span>✓ {t.continueBtn}</span>
                    ) : (
                      <span>{t.explore}</span>
                    )}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </main>

      {/* Footer hint */}
      <footer className="relative z-10 py-4 text-center text-xs text-muted/70">
        <p>{t.ageSelectHint}</p>
      </footer>
    </div>
  )
}

