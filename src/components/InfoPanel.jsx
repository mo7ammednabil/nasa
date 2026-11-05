import { useEffect, useId, useRef, useState } from 'react'
import { useLang } from '../i18n.jsx'
import { statuses } from '../data/worlds.js'
import { pick } from '../lib/content.js'
import ChatTab from './ChatTab.jsx'
import VideoTab from './VideoTab.jsx'

const TABS = ['info', 'story', 'video', 'chat']

export default function InfoPanel({ craft, onClose }) {
  const { t, lang } = useLang()
  const [tab, setTab] = useState('info')
  const id = useId()
  const closeRef = useRef(null)

  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const label = { info: t.tabInfo, story: t.tabStory, video: t.tabVideo, chat: t.tabChat }

  return (
    <section
      role="dialog"
      aria-label={pick(craft.name, lang)}
      className="panel rise absolute inset-x-0 bottom-0 z-30 flex h-[56%] flex-col overflow-hidden rounded-t-2xl md:inset-x-auto md:bottom-4 md:end-4 md:top-20 md:h-auto md:w-[420px] md:rounded-2xl"
    >
      <header className="flex items-start justify-between gap-3 px-5 pb-3 pt-4">
        <div className="min-w-0">
          <p className="eyebrow">
            {craft.code} · {pick(craft.nickname, lang)}
          </p>
          <h2 className="display mt-1 truncate text-2xl">{pick(craft.name, lang)}</h2>
        </div>
        <button ref={closeRef} className="icon-btn shrink-0" onClick={onClose} aria-label={t.close}>
          ✕
        </button>
      </header>

      <div role="tablist" aria-label="sections" className="mx-4 flex gap-1 rounded-xl bg-white/5 p-1">
        {TABS.map((k) => (
          <button
            key={k}
            role="tab"
            id={`${id}-${k}`}
            aria-selected={tab === k}
            aria-controls={`${id}-panel`}
            className="tab"
            onClick={() => setTab(k)}
          >
            {label[k]}
          </button>
        ))}
      </div>

      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-${tab}`} className="mt-3 min-h-0 flex-1">
        {tab === 'info' && <InfoTab craft={craft} />}
        {tab === 'story' && <StoryTab craft={craft} />}
        {tab === 'video' && <VideoTab craft={craft} />}
        {tab === 'chat' && <ChatTab craft={craft} />}
      </div>
    </section>
  )
}

function InfoTab({ craft }) {
  const { t, lang } = useLang()
  return (
    <div className="scroll-y h-full space-y-5 px-5 pb-5">
      <p className="text-[1.02rem] leading-relaxed text-fg/90">{pick(craft.tagline, lang)}</p>

      <div className="flex items-center gap-3">
        <span className="text-sm text-muted">{t.statusLabel}</span>
        <span className={`badge badge-${craft.status}`}>{pick(statuses[craft.status], lang)}</span>
      </div>

      <dl className="divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
        {craft.facts.map((f) => (
          <div key={f.id} className="grid grid-cols-[8rem_1fr] gap-3 px-4 py-2.5 text-[0.92rem]">
            <dt className="text-muted">{pick(f.label, lang)}</dt>
            <dd className="font-medium">{pick(f.value, lang)}</dd>
          </div>
        ))}
      </dl>

      <div className="rounded-xl border border-accent/30 bg-accent/10 p-4">
        <p className="eyebrow text-accent2">{t.achievement}</p>
        <p className="mt-1.5 leading-relaxed">{pick(craft.achievement, lang)}</p>
      </div>

      <div>
        <p className="eyebrow">{t.sources}</p>
        <ul className="mt-2 space-y-1.5 text-sm">
          {craft.sources.map((s) => (
            <li key={s.url}>
              <a className="text-accent2 underline decoration-white/20 underline-offset-4 hover:decoration-accent2" href={s.url} target="_blank" rel="noreferrer noopener" dir="ltr">
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function StoryTab({ craft }) {
  const { t, lang } = useLang()
  const [i, setI] = useState(0)
  const last = craft.story.length - 1
  return (
    <div className="flex h-full flex-col px-5 pb-5">
      <div className="flex gap-1.5" aria-hidden="true">
        {craft.story.map((_, k) => (
          <span key={k} className="h-1 flex-1 rounded-full" style={{ background: k <= i ? '#ff7a45' : 'rgba(255,255,255,0.15)' }} />
        ))}
      </div>
      <div className="scroll-y min-h-0 flex-1 py-5">
        <p key={i} className="rise text-[1.35rem] font-medium leading-snug md:text-[1.5rem]">
          {pick(craft.story[i], lang)}
        </p>
      </div>
      <div className="flex items-center justify-between gap-3">
        <button className="icon-btn" onClick={() => setI((v) => Math.max(0, v - 1))} disabled={i === 0} style={{ opacity: i === 0 ? 0.35 : 1 }} aria-label="previous">
          {lang === 'ar' ? '→' : '←'}
        </button>
        <span className="text-xs text-muted">
          {i + 1} / {craft.story.length}
        </span>
        <button className="icon-btn" onClick={() => setI((v) => Math.min(last, v + 1))} disabled={i === last} style={{ opacity: i === last ? 0.35 : 1 }} aria-label="next">
          {lang === 'ar' ? '←' : '→'}
        </button>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-muted">{t.storyNote}</p>
    </div>
  )
}
