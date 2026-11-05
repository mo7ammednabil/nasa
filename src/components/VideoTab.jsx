import { useState } from 'react'
import { useLang } from '../i18n.jsx'

export default function VideoTab({ craft }) {
  const { t } = useLang()
  const [missing, setMissing] = useState(!craft.video)

  return (
    <div className="px-5 pb-5">
      <div className="overflow-hidden rounded-xl border border-white/10 bg-black" style={{ aspectRatio: '16 / 9' }}>
        {missing ? (
          <div className="grid h-full place-items-center p-4 text-center">
            <div>
              <p className="font-semibold">{t.videoMissing}</p>
              {craft.video && (
                <p className="mt-2 text-xs text-muted">
                  {t.videoMissingHint} <span dir="ltr" className="inline-block">{craft.video}</span>
                </p>
              )}
            </div>
          </div>
        ) : (
          <video
            className="h-full w-full"
            controls
            playsInline
            preload="metadata"
            poster={craft.videoPoster}
            onError={() => setMissing(true)}
          >
            <source src={craft.video} type="video/mp4" onError={() => setMissing(true)} />
          </video>
        )}
      </div>
    </div>
  )
}
