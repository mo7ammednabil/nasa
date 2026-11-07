import { lazy, Suspense, useState } from 'react'
import { useLang } from '../i18n.jsx'
import { hasWebGL } from '../lib/webgl.js'
import { enabledWorlds, pick } from '../lib/content.js'
import LangToggle from './LangToggle.jsx'

const SolarScene = lazy(() => import('./SolarScene.jsx'))

const STARS = Array.from({ length: 60 }, (_, i) => ({
  x: (i * 37.7) % 100,
  y: (i * 53.3) % 100,
  s: i % 9 === 0 ? 2 : 1,
  o: 0.25 + ((i * 7) % 6) / 12,
}))

export default function WelcomeScreen({ onExplore }) {
  const { t, lang } = useLang()
  const [webgl] = useState(hasWebGL)
  const worlds = enabledWorlds()

  const titleMain = lang === 'ar' ? t.siteTitle : t.siteTitleEn
  const titleSub = lang === 'ar' ? t.siteTitleEn : t.siteTitle

  return (
    <div className="relative h-full overflow-y-auto overflow-x-hidden bg-base md:overflow-hidden">
      <div
        className="pointer-events-none fixed inset-0 md:absolute"
        aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(255,122,69,0.10), transparent 55%), radial-gradient(ellipse at 80% 10%, rgba(80,110,255,0.08), transparent 50%)' }}
      />
      <div className="pointer-events-none fixed inset-0 md:absolute" aria-hidden="true">
        {STARS.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, opacity: s.o }}
          />
        ))}
      </div>

      <header className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between p-4 md:p-6">
        <span className="glass rounded-full px-3 py-1 text-xs font-medium text-muted">{t.kicker}</span>
        <span className="pointer-events-auto">
          <LangToggle />
        </span>
      </header>

      {/* المشهد ثلاثي الأبعاد */}
      <div className="relative z-10 mt-14 h-[45vh] min-h-[300px] w-full shrink-0 md:absolute md:inset-0 md:mt-0 md:h-auto md:min-h-0" dir="ltr">
        {webgl ? (
          <Suspense fallback={<Center text={t.loading3d} />}>
            <SolarScene onExplore={onExplore} />
          </Suspense>
        ) : (
          <StaticFallback text={t.fallbackSolar} />
        )}
      </div>

      {/* النص والأزرار */}
      <div className="relative z-10 px-5 pb-12 pt-4 md:pointer-events-none md:absolute md:inset-y-0 md:bottom-0 md:end-auto md:flex md:w-[44%] md:items-center md:p-14 md:pb-6 md:pt-20">
        <div
          aria-hidden="true"
          className="hidden md:absolute md:inset-0 md:-z-10 md:block md:bg-linear-to-r md:from-base/90 md:via-base/55 md:to-transparent rtl:md:bg-linear-to-l"
        />
        <div className="rise max-w-xl">
          <p className="eyebrow mb-3 text-accent2">{titleSub}</p>
          <h1 className="display text-[2.3rem] sm:text-5xl md:text-[3.4rem]">{titleMain}</h1>
          <p className="mt-4 text-lg font-medium leading-snug text-fg/90">{t.heroLine}</p>
          <p className="mt-2 max-w-md text-[0.95rem] leading-relaxed text-muted">{t.heroBody}</p>

          <div className="pointer-events-auto mt-6 flex flex-wrap items-center gap-3">
            {worlds.map((w, i) => (
              <button key={w.id} className={`btn ${i === 0 ? '' : 'btn-ghost'}`} onClick={() => onExplore(w.id)}>
                {t.explore} {pick(w.name, lang)}
                <span aria-hidden="true">{lang === 'ar' ? '←' : '→'}</span>
              </button>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted/80">{t.exploreHint}</p>
          <p className="mt-1 max-w-md text-xs text-muted/60">{t.scaleNote}</p>
        </div>
      </div>
    </div>
  )
}

function Center({ text }) {
  return (
    <div className="grid h-full place-items-center">
      <p className="text-sm text-muted">{text}</p>
    </div>
  )
}

function StaticFallback({ text }) {
  return (
    <div className="grid h-full place-items-center">
      <div className="text-center">
        <div
          className="mx-auto h-40 w-40 rounded-full"
          style={{ background: 'radial-gradient(circle at 35% 35%, #ff9a6a, #8f3009 70%)', boxShadow: '0 0 80px rgba(255,122,69,0.35)' }}
        />
        <p className="mt-4 text-sm text-muted">{text}</p>
      </div>
    </div>
  )
}
