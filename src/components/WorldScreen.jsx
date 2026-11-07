import { lazy, Suspense, useState } from 'react'
import { useLang } from '../i18n.jsx'
import { hasWebGL } from '../lib/webgl.js'
import { pick } from '../lib/content.js'
import LangToggle from './LangToggle.jsx'
import AgeToggle from './AgeToggle.jsx'
import InfoPanel from './InfoPanel.jsx'
import { getBackdrop } from './backdrops.jsx'

const RoverScene = lazy(() => import('./RoverScene.jsx'))

export default function WorldScreen({ world, onBack, onChangeAge }) {
  const { t, lang } = useLang()
  const [craftId, setCraftId] = useState(world.crafts[0]?.id)
  const [open, setOpen] = useState(false)
  const [webgl] = useState(hasWebGL)
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches

  const craft = world.crafts.find((c) => c.id === craftId) || world.crafts[0]
  const Backdrop = getBackdrop(world.backdrop)
  const title = pick(world.name, lang)

  return (
    <div className="relative h-full overflow-hidden bg-base">
      <Backdrop />

      {/* المركبة: لما اللوحة تفتح، المشهد بينزاح عشان المركبة تفضل ظاهرة */}
      <div className={`absolute inset-0 transition-[padding] duration-300 ${open ? 'pb-[58%] md:pb-0 md:pe-[440px]' : ''}`}>
        {!craft ? (
          <div className="grid h-full place-items-center">
            <p className="glass rounded-full px-4 py-2 text-sm text-fg">{t.comingSoon}</p>
          </div>
        ) : webgl ? (
          <Suspense fallback={<div className="grid h-full place-items-center"><p className="text-sm text-fg/80">{t.loading3d}</p></div>}>
            <RoverScene craft={craft} onSelect={() => setOpen(true)} compact={open && isMobile} />
          </Suspense>
        ) : (
          <button onClick={() => setOpen(true)} className="grid h-full w-full place-items-center">
            <span className="btn">{t.tapCraft}</span>
          </button>
        )}
      </div>

      <header className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-3 p-4 md:p-6">
        <div className="pointer-events-auto">
          <button className="icon-btn" onClick={onBack}>
            <span aria-hidden="true">{lang === 'ar' ? '→' : '←'}</span> {t.back}
          </button>
        </div>
        <div className="pointer-events-none hidden text-center sm:block">
          <p className="eyebrow text-fg/70">{pick(world.subtitle, lang)}</p>
          <h1 className="display text-4xl md:text-5xl" style={{ textShadow: '0 2px 24px rgba(0,0,0,0.45)' }}>
            {title}
          </h1>
        </div>
        <div className="pointer-events-auto flex items-center gap-2">
          <AgeToggle onClick={onChangeAge} />
          <LangToggle />
        </div>
      </header>

      <h1 className="display pointer-events-none absolute inset-x-0 top-16 z-10 text-center text-4xl sm:hidden" style={{ textShadow: '0 2px 24px rgba(0,0,0,0.45)' }}>
        {title}
      </h1>

      {/* اختيار المركبة (بيظهر لما يبقى فيه أكتر من مركبة) */}
      {world.crafts.length > 1 && !open && (
        <div className="absolute inset-x-0 bottom-12 z-10 flex flex-wrap items-center justify-center gap-2 px-4" role="group" aria-label={t.chooseCraft}>
          {world.crafts.map((c) => (
            <button key={c.id} className="chip glass" aria-pressed={c.id === craft.id} onClick={() => setCraftId(c.id)}>
              {pick(c.name, lang)}
            </button>
          ))}
        </div>
      )}

      {!open && craft && webgl && (
        <div className="pointer-events-none absolute inset-x-0 top-[24%] z-10 grid place-items-center md:top-[22%]" aria-hidden="true">
          <span className="glass rounded-full px-3 py-1 text-sm font-medium text-fg">{t.tapCraft}</span>
          <span className="ping mt-2 h-3.5 w-3.5 rounded-full bg-accent2" />
        </div>
      )}

      {!open && craft && (
        <p className="pointer-events-none absolute inset-x-0 bottom-4 z-10 text-center text-xs text-fg/70">{t.dragHint}</p>
      )}

      {open && craft && <InfoPanel key={craft.id} craft={craft} onClose={() => setOpen(false)} />}
    </div>
  )
}
