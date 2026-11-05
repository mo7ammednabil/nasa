// خلفيات العوالم، مرسومة بالكود (SVG + CSS) من غير صور عشان تفضل خفيفة.
// عالم جديد (مثلًا القمر)؟ ضيف خلفية هنا وسجّلها في `backdrops` تحت،
// وبعدها حط نفس الاسم في `backdrop` بتاع العالم في src/data/worlds.js.
// عايز صورة بدل الرسمة؟ حط الصورة في public/ واستخدم:
//   <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/mars-bg.jpg')" }} />

const DUST = Array.from({ length: 16 }, (_, i) => ({
  left: (i * 47) % 100,
  top: 10 + ((i * 29) % 50),
  size: 2 + (i % 2),
  delay: (i % 7) * -1.3,
  dur: 16 + (i % 5) * 4,
}))

function MarsBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #0b0a10 0%, #25131a 24%, #5c2a20 46%, #a8532f 64%, #dd8a52 74%)',
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          top: '30%',
          insetInlineStart: '16%',
          width: 64,
          height: 64,
          background: 'radial-gradient(circle, #fff1da 0%, #ffd2a0 40%, rgba(255,190,120,0) 72%)',
          boxShadow: '0 0 100px 40px rgba(255,170,100,0.28)',
        }}
      />
      {DUST.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            background: 'rgba(255,225,190,0.4)',
            animation: `drift ${d.dur}s linear ${d.delay}s infinite alternate`,
          }}
        />
      ))}
      <svg className="absolute inset-x-0 bottom-0 h-[58%] w-full" viewBox="0 0 1200 520" preserveAspectRatio="none">
        <path d="M0 120 L90 70 L170 110 L270 40 L360 105 L470 60 L580 112 L690 52 L790 100 L900 66 L1010 108 L1110 78 L1200 112 L1200 520 L0 520 Z" fill="#8a4126" opacity="0.7" />
        <path d="M0 170 C140 130 260 190 400 160 C560 126 640 190 800 165 C960 140 1060 180 1200 150 L1200 520 L0 520 Z" fill="#6f3320" />
        <path d="M0 260 C180 220 300 290 480 262 C650 236 760 300 940 268 C1060 248 1140 270 1200 258 L1200 520 L0 520 Z" fill="#552618" />
        <path d="M0 360 C200 330 330 395 520 372 C720 348 880 410 1060 378 C1130 366 1170 372 1200 366 L1200 520 L0 520 Z" fill="#3a1a11" />
      </svg>
      <div
        className="absolute inset-x-0"
        style={{
          bottom: '40%',
          height: '16%',
          background: 'linear-gradient(180deg, rgba(240,170,110,0), rgba(240,170,110,0.22), rgba(240,170,110,0))',
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-1/3" style={{ background: 'linear-gradient(180deg, rgba(9,11,16,0), rgba(9,11,16,0.6))' }} />
    </div>
  )
}

// خلفية افتراضية لأي عالم ملوش خلفية مسجّلة
function DefaultBackdrop() {
  return (
    <div
      className="absolute inset-0"
      aria-hidden="true"
      style={{ background: 'radial-gradient(ellipse at 50% 100%, #1b2030 0%, #0b0d14 60%, #07080c 100%)' }}
    />
  )
}

export const backdrops = { mars: MarsBackdrop }
export const getBackdrop = (name) => backdrops[name] || DefaultBackdrop
