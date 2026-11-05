# Abandoned but not Forgotten — Mars MVP

React + Vite + Tailwind + React Three Fiber. عربي/English، RTL تلقائي.

## التشغيل
```bash
npm install
cp .env.example .env     # وحط VITE_GROQ_API_KEY جواه
npm run dev
```

## الملفات اللي هتضيفها (في public/)
| الملف | الاستخدام |
|---|---|
| `public/models/solar.glb` | شاشة البداية (لو اسم الكوكب فيه "mars" بيتحط عليه الدبوس تلقائيًا) |
| `public/models/opportunity.glb` | المركبة (بيتظبط حجمها ومكانها تلقائيًا) |
| `public/videos/opportunity.mp4` | الفيديو (اختياري) |
| `public/videos/opportunity-poster.jpg` | صورة غلاف الفيديو (اختياري) |

لو أي ملف ناقص، الموقع بيعرض بديل بسيط بدل ما يقع.

## تعديل المحتوى وإضافة مركبات
كل البيانات في ملف واحد: `src/data/worlds.js` (المجموعة الشمسية، العوالم، المركبات، الـ chat).
- **مركبة جديدة:** انسخ كائن `opportunity` وغيّر قيمه، وضيفه في `crafts` بتاع العالم. لما يبقى فيه أكتر من مركبة بيظهر شريط اختيار تلقائيًا.
- **عالم جديد (القمر):** فيه كتلة `moon` متعلّق عليها جاهزة. فعّلها وضيفها في `worlds`، وسجّل الخلفية في `src/components/backdrops.jsx`.
  زرار الاستكشاف والدبوس على المجموعة الشمسية بيظهروا تلقائيًا لكل عالم `enabled: true`.
- حجم مجسم المجموعة الشمسية: `solar.size`. حجم المركبة: `modelSize` جوه المركبة.
- نصوص الواجهة العامة في `src/i18n.jsx`.

## الـ API key (Groq)
- مكانه: ملف `.env` في جذر المشروع: `VITE_GROQ_API_KEY=...` (الملف ده في `.gitignore`).
- مؤقت في الفرونت: أي حد يفتح أدوات المتصفح يقدر يشوفه، فما تنشرش الموقع كده.
- لنقله للباك: غيّر `ENDPOINT` في `src/lib/groq.js` لرابط سيرفرك، وشيل الـ Authorization header،
  وامسح المتغير من `.env`. الـ system prompt كمان الأفضل ينتقل للسيرفر.

## الخلفية
خلفيات العوالم مرسومة بالكود في `src/components/backdrops.jsx`.
لو عايز صورة: حط `public/mars-bg.jpg` وفعّل السطر الموضح في آخر الملف.
