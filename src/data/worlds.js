// ============================================================================
// كل بيانات الموقع في الملف ده: المجموعة الشمسية، العوالم (المريخ / القمر / ...)
// والمركبات اللي جوه كل عالم. الكود (الشاشات والـ chat) بيقرأ من هنا بس.
//
// ⚠️ بيانات Opportunity مسودة من معلومات NASA العامة وتحتاج مراجعتك.
//    الـ chat بيجاوب من الحقول اللي هنا بس: أي معلومة مش موجودة المركبة مش هتجاوب عنها.
//
// ─────────────────────────────────────────────────────────────────────────────
// إزاي تضيف مركبة جديدة لعالم موجود (مثلًا Perseverance على المريخ)؟
//   1) حط ملف الموديل في public/models/  والفيديو في public/videos/
//   2) انسخ كائن `opportunity` تحت، غيّر اسمه (const perseverance = {...}) وغيّر قيمه
//   3) ضيفه في `crafts` بتاع العالم:  crafts: [opportunity, perseverance]
//   لما يبقى فيه أكتر من مركبة، بيظهر شريط اختيار المركبات تلقائيًا.
//
// إزاي تضيف عالم جديد (القمر)؟
//   1) انسخ كتلة `moon` الموجودة تحت (متعلّق عليها)، وفعّلها بـ  enabled: true
//   2) `solarNode`: جزء من اسم الجسم جوه solar.glb (بيتحط عليه الدبوس تلقائيًا)
//   3) ضيفها في مصفوفة `worlds` تحت
//   زرار الاستكشاف في شاشة البداية والدبوس بيظهروا تلقائيًا لكل عالم enabled.
// ============================================================================

// مجسم المجموعة الشمسية في شاشة البداية
export const solar = {
  model: '/models/solar.glb',
  size: 17, // كبّر الرقم لو عايز المجسم أكبر على الشاشة
}

// حالات المهمة
export const statuses = {
  ended: { ar: 'انتهت المهمة', en: 'Mission ended' },
  active: { ar: 'لسه شغالة', en: 'Still active' },
  lost: { ar: 'انقطع الاتصال', en: 'Contact lost' },
}

// ─────────────────────────── المركبات ───────────────────────────

const opportunity = {
  id: 'opportunity',
  code: 'MER-B',
  model: '/models/opportunity.glb',
  modelSize: 4.2, // حجم المجسم في المشهد
  video: '/videos/opportunity.mp4', // اختياري
  videoPoster: '/videos/opportunity-poster.jpg', // اختياري

  name: { ar: 'أوبورتيونيتي', en: 'Opportunity' },
  nickname: { ar: 'أوبي', en: 'Oppy' },
  tagline: {
    ar: 'مركبة كان المفروض تشتغل 3 شهور، واشتغلت أكتر من 14 سنة.',
    en: 'Built for 3 months. It kept working for over 14 years.',
  },

  // ended | active | lost
  status: 'ended',

  // البطاقة: كل صف = عنوان + قيمة
  facts: [
    { id: 'launch', label: { ar: 'الإطلاق', en: 'Launch' }, value: { ar: '7 يوليو 2003', en: 'July 7, 2003' } },
    { id: 'landing', label: { ar: 'الهبوط على المريخ', en: 'Landing on Mars' }, value: { ar: '25 يناير 2004', en: 'January 25, 2004' } },
    { id: 'site', label: { ar: 'مكان الهبوط', en: 'Landing site' }, value: { ar: 'ميريديياني بلانوم (Meridiani Planum)', en: 'Meridiani Planum' } },
    { id: 'planned', label: { ar: 'المدة المخططة', en: 'Planned mission' }, value: { ar: '90 يوم مريخي (حوالي 3 شهور)', en: '90 Martian days (about 3 months)' } },
    { id: 'actual', label: { ar: 'المدة الفعلية', en: 'Actual mission' }, value: { ar: 'أكتر من 14 سنة', en: 'More than 14 years' } },
    { id: 'distance', label: { ar: 'المسافة اللي قطعتها', en: 'Distance driven' }, value: { ar: 'حوالي 45 كيلومتر', en: 'About 45 kilometers (28 miles)' } },
    { id: 'power', label: { ar: 'مصدر الطاقة', en: 'Power' }, value: { ar: 'ألواح شمسية', en: 'Solar panels' } },
    { id: 'lastContact', label: { ar: 'آخر اتصال', en: 'Last contact' }, value: { ar: '10 يونيو 2018', en: 'June 10, 2018' } },
  ],

  achievement: {
    ar: 'لقت أدلة قوية إن المريخ كان فيه مياه سائلة زمان، وإن المكان ده ممكن كان مناسب للحياة الميكروبية.',
    en: 'It found strong evidence that liquid water once existed on Mars, in places that may have been able to support microbial life.',
  },

  // قصة قصيرة بصوت المركبة (خيال إبداعي مبني على حقائق)
  story: [
    {
      ar: 'اتولدت على الأرض سنة 2003، وسافرت 7 شهور في الفضاء لحد ما وصلت المريخ.',
      en: 'I was built on Earth and launched in 2003. After about seven months in space, I reached Mars.',
    },
    {
      ar: 'العلماء قالوا لي: عندك 90 يوم مريخي بس. أنا كملت أكتر من 14 سنة، وقطعت حوالي 45 كيلومتر.',
      en: 'Scientists gave me 90 Martian days. I kept going for over 14 years and drove about 45 kilometers.',
    },
    {
      ar: 'في 2018 عاصفة رملية ضخمة غطت السما، والألواح الشمسية ما قدرتش تاخد ضوء كفاية. آخر اتصال كان في 10 يونيو 2018.',
      en: 'In 2018 a huge dust storm blocked the sunlight my solar panels needed. My last contact with Earth was on June 10, 2018.',
    },
  ],

  // الـ chat
  chatIntro: {
    ar: 'أهلًا! أنا أوبي. أنا روبوت مش إنسان، بس أقدر أحكي لك اللي عرفته عن مهمتي على المريخ. اسألني!',
    en: 'Hi! I’m Oppy. I’m a robot, not a person, but I can tell you what I learned on my Mars mission. Ask me anything!',
  },
  suggestions: {
    ar: ['إنت اشتغلت قد إيه؟', 'إيه أهم اكتشاف؟', 'إيه اللي حصل لك في 2018؟', 'بتاخدي طاقتك منين؟'],
    en: ['How long did you work?', 'What was your biggest discovery?', 'What happened in 2018?', 'Where does your power come from?'],
  },

  sources: [
    {
      title: 'NASA Science: Mars Exploration Rovers (Spirit and Opportunity)',
      url: 'https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/',
    },
    { title: 'NASA/JPL: Mars Exploration Rover Mission', url: 'https://mars.nasa.gov/mer/' },
  ],
}

// ─────────────────────────── العوالم ───────────────────────────

const mars = {
  id: 'mars',
  enabled: true,
  solarNode: 'mars', // جزء من اسم الكوكب جوه solar.glb
  backdrop: 'mars', // شكل الخلفية (متعرّف في src/components/backdrops.jsx)
  name: { ar: 'المريخ', en: 'Mars' },
  subtitle: { ar: 'الكوكب الأحمر', en: 'The red planet' },
  crafts: [opportunity],
}

/* القمر: فعّله لما تجهّز الخلفية والمركبات
const moon = {
  id: 'moon',
  enabled: true,
  solarNode: 'moon',
  backdrop: 'moon',
  name: { ar: 'القمر', en: 'The Moon' },
  subtitle: { ar: 'جارنا الأقرب', en: 'Our closest neighbor' },
  crafts: [ ...مركبات القمر هنا... ],
}
*/

export const worlds = [mars /*, moon */]
