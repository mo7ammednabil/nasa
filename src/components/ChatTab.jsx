import { useEffect, useRef, useState } from 'react'
import { useLang } from '../i18n.jsx'
import { pick } from '../lib/content.js'
import { askRover, chatEnabled, looksLikeDistress, MAX_QUESTION_LENGTH } from '../lib/groq.js'

export default function ChatTab({ craft }) {
  const { t, lang } = useLang()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const lastSent = useRef(0)
  const endRef = useRef(null)
  const abortRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, busy])

  useEffect(() => () => abortRef.current?.abort(), [])

  const push = (role, content, extra = {}) =>
    setMessages((m) => [...m, { role, content, ...extra }])

  async function send(text) {
    const q = text.trim()
    if (!q || busy) return
    if (q.length > MAX_QUESTION_LENGTH) return push('assistant', t.chatTooLong, { system: true })
    // أسئلة فيها ضيق أو خطر: رد ثابت فورًا ومفيش اتصال بالـ AI
    if (looksLikeDistress(q)) {
      push('user', q)
      setInput('')
      return push('assistant', t.chatSafety, { system: true })
    }
    if (Date.now() - lastSent.current < 2000) return push('assistant', t.chatRate, { system: true })
    lastSent.current = Date.now()

    const history = messages.filter((m) => !m.system)
    push('user', q)
    setInput('')

    if (!chatEnabled) return push('assistant', t.chatNoKey, { system: true })

    setBusy(true)
    abortRef.current = new AbortController()
    try {
      const answer = await askRover({ craft, history, question: q, lang, signal: abortRef.current.signal })
      push('assistant', answer || t.chatError, { system: !answer })
    } catch (e) {
      if (e.name !== 'AbortError') push('assistant', t.chatError, { system: true })
    } finally {
      setBusy(false)
    }
  }

  const suggestions = craft.suggestions?.[lang] || []

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="scroll-y min-h-0 flex-1 space-y-3 px-5 pb-3" aria-live="polite">
        <Bubble role="assistant">{pick(craft.chatIntro, lang)}</Bubble>
        {messages.length === 0 && suggestions.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {suggestions.map((s) => (
              <button key={s} className="chip" onClick={() => send(s)}>
                {s}
              </button>
            ))}
          </div>
        )}
        {messages.map((m, i) => (
          <Bubble key={i} role={m.role} muted={m.system}>
            {m.content}
          </Bubble>
        ))}
        {busy && (
          <Bubble role="assistant" muted>
            {t.thinking}
          </Bubble>
        )}
        <div ref={endRef} />
      </div>

      <form
        className="border-t border-white/10 p-3"
        onSubmit={(e) => {
          e.preventDefault()
          send(input)
        }}
      >
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={MAX_QUESTION_LENGTH}
            placeholder={t.chatPlaceholder}
            aria-label={t.chatPlaceholder}
            className="min-w-0 flex-1 rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-base text-fg outline-none placeholder:text-muted focus:border-accent"
          />
          <button type="submit" className="btn !px-4 !py-2" disabled={busy || !input.trim()} style={{ opacity: busy || !input.trim() ? 0.5 : 1 }}>
            {t.send}
          </button>
        </div>
        <p className="mt-2 text-xs leading-snug text-muted">{t.chatFooter}</p>
      </form>
    </div>
  )
}

function Bubble({ role, muted, children }) {
  const mine = role === 'user'
  return (
    <div className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
      <div
        className="max-w-[88%] whitespace-pre-wrap rounded-2xl px-3.5 py-2 text-[0.93rem] leading-relaxed"
        style={{
          background: mine ? '#ff7a45' : muted ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
          color: mine ? '#1a0b05' : muted ? '#9aa2b5' : '#eceef4',
          fontStyle: muted ? 'italic' : 'normal',
        }}
      >
        {children}
      </div>
    </div>
  )
}
