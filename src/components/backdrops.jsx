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

function MoonBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Black space sky */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #03050b 0%, #101521 55%, #252a32 100%)',
        }}
      />

      {/* Stars */}
      {Array.from({ length: 90 }, (_, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${(i * 37.7) % 100}%`,
            top: `${(i * 23.9) % 65}%`,
            width: i % 8 === 0 ? 3 : 1.5,
            height: i % 8 === 0 ? 3 : 1.5,
            opacity: 0.3 + ((i * 13) % 7) / 10,
          }}
        />
      ))}

      {/* Moon glow */}
      <div
        className="absolute rounded-full"
        style={{
          top: '10%',
          right: '15%',
          width: 180,
          height: 180,
          background: 'radial-gradient(circle, rgba(220,225,235,0.12), transparent 70%)',
        }}
      />

      {/* Lunar surface */}
      <svg
        className="absolute inset-x-0 bottom-0 h-[65%] w-full"
        viewBox="0 0 1200 520"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="moonGround" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b9098" />
            <stop offset="100%" stopColor="#30343d" />
          </linearGradient>
          <radialGradient id="moonCrater">
            <stop offset="0%" stopColor="#353a43" />
            <stop offset="65%" stopColor="#555b64" />
            <stop offset="100%" stopColor="#a0a5ac" />
          </radialGradient>
        </defs>

        <path
          d="M0 170 Q150 80 300 150 Q450 190 600 110 Q800 40 950 150 Q1080 190 1200 100 L1200 520 L0 520 Z"
          fill="url(#moonGround)"
        />

        <path
          d="M0 250 Q180 170 350 240 Q520 290 700 210 Q900 150 1050 230 Q1140 260 1200 210 L1200 520 L0 520 Z"
          fill="#666c75"
        />

        <path
          d="M0 350 Q200 280 400 340 Q650 400 850 320 Q1050 270 1200 350 L1200 520 L0 520 Z"
          fill="#454b54"
        />

        {/* Craters */}
        <ellipse cx="220" cy="260" rx="75" ry="24" fill="#343941" />
        <ellipse cx="220" cy="253" rx="75" ry="24" fill="url(#moonCrater)" />

        <ellipse cx="650" cy="220" rx="105" ry="35" fill="#343941" />
        <ellipse cx="650" cy="212" rx="105" ry="35" fill="url(#moonCrater)" />

        <ellipse cx="1000" cy="300" rx="90" ry="28" fill="#30353d" />
        <ellipse cx="1000" cy="292" rx="90" ry="28" fill="url(#moonCrater)" />

        <ellipse cx="440" cy="390" rx="65" ry="20" fill="#252a32" />
        <ellipse cx="440" cy="384" rx="65" ry="20" fill="#555b64" />
      </svg>

      {/* Ground shadow */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/4"
        style={{
          background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.65))',
        }}
      />
    </div>
  )
}

function SpaceBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Deep space */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 45%, #172044 0%, #090d20 45%, #03040b 100%)',
        }}
      />

      {/* Nebula clouds */}
      <div
        className="absolute"
        style={{
          width: '85%',
          height: '65%',
          top: '15%',
          left: '8%',
          background: 'radial-gradient(ellipse, rgba(90,65,160,0.28), rgba(30,100,150,0.12) 40%, transparent 72%)',
          filter: 'blur(35px)',
        }}
      />

      <div
        className="absolute"
        style={{
          width: '65%',
          height: '50%',
          top: '35%',
          right: '-10%',
          background: 'radial-gradient(ellipse, rgba(30,110,160,0.2), transparent 70%)',
          filter: 'blur(35px)',
        }}
      />

      {/* Stars */}
      {Array.from({ length: 150 }, (_, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${(i * 47.7) % 100}%`,
            top: `${(i * 29.3) % 100}%`,
            width: i % 13 === 0 ? 3 : i % 4 === 0 ? 2 : 1,
            height: i % 13 === 0 ? 3 : i % 4 === 0 ? 2 : 1,
            opacity: 0.25 + ((i * 17) % 7) / 10,
          }}
        />
      ))}

      {/* Distant galaxy */}
      <div
        className="absolute rounded-full"
        style={{
          top: '24%',
          left: '18%',
          width: 150,
          height: 55,
          transform: 'rotate(-28deg)',
          background: 'radial-gradient(ellipse, rgba(210,190,255,0.55), rgba(100,110,210,0.18) 45%, transparent 75%)',
          filter: 'blur(8px)',
        }}
      />

      {/* Glowing distant planet */}
      <div
        className="absolute rounded-full"
        style={{
          top: '58%',
          right: '13%',
          width: 95,
          height: 95,
          background: 'radial-gradient(circle at 35% 30%, #b2c7e8, #526b9c 45%, #182747 75%)',
          boxShadow: '0 0 50px rgba(100,140,220,0.2)',
          opacity: 0.65,
        }}
      />

      {/* Subtle bottom darkness */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/3"
        style={{
          background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.4))',
        }}
      />
    </div>
  )
}


export const backdrops = {
  mars: MarsBackdrop,
  moon: MoonBackdrop,
  space: SpaceBackdrop,
}

export const getBackdrop = (name) => backdrops[name] || DefaultBackdrop