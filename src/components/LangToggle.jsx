import { useLang } from '../i18n.jsx'

export default function LangToggle() {
  const { lang, setLang, t } = useLang()
  return (
    <button
      className="icon-btn"
      onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
      lang={lang === 'ar' ? 'en' : 'ar'}
      aria-label={`Switch language to ${t.lang}`}
    >
      {t.lang}
    </button>
  )
}
