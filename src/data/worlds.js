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

  // محتوى مخصص لكل فئة عمرية
  ageContent: {
    kids: {
      tagline: {
        ar: 'روبوت صغير سافر للمريخ وعاش هناك أكتر من 14 سنة! 🌟',
        en: 'A little robot traveled to Mars and lived there for over 14 years! 🌟',
      },
      story: [
        {
          ar: 'تخيّل إنك بعت صديقك الروبوت للمريخ! أنا أوبي، وسافرت من الأرض لحد الكوكب الأحمر في 2003.',
          en: 'Imagine sending your robot friend to Mars! I’m Oppy, and I traveled from Earth to the red planet in 2003.',
        },
        {
          ar: 'كنت المفروض أشتغل 3 شهور بس، لكن أنا كملت أكتر من 14 سنة كاملة! مشيت حوالي 45 كيلومتر على المريخ.',
          en: 'I was only supposed to work for 3 months, but I kept going for over 14 whole years! I drove about 45 kilometers on Mars.',
        },
        {
          ar: 'بعدين جت عاصفة رملية ضخمة وغطت الشمس، والألواح الشمسية بتاعتي ما عرفتش تاخد ضوء. وداعًا يا مريخ! 🌪️',
          en: 'Then a giant dust storm covered the sun and my solar panels couldn’t get light. Goodbye Mars! 🌪️',
        },
      ],
      suggestions: {
        ar: ['ليه اسمك أوبي؟', 'المريخ شكله إيه؟', 'إيه أحلى حاجة عملتها؟', 'ليه وقفت عن الشغل؟'],
        en: ['Why are you called Oppy?', 'What does Mars look like?', 'What was the coolest thing you did?', 'Why did you stop?'],
      },
      chatIntro: {
        ar: 'مرحبًا يا بطل! أنا أوبي، روبوت فضاء صغير 🤖 اسألني أي سؤال عن مغامرتي على المريخ!',
        en: 'Hi there! I’m Oppy, a friendly space robot 🤖 Ask me anything about my adventure on Mars!',
      },
    },

    teens: {
      tagline: {
        ar: 'مركبة كانت مصممة للعمل 90 يوماً مريخياً — واستمرت أكثر من 14 عاماً.',
        en: 'Designed for a 90-sol mission — it explored Mars for over 14 Earth years.',
      },
      story: [
        {
          ar: 'أُطلقت في 7 يوليو 2003 وهبطت في سهل ميريديياني بلانوم (Meridiani Planum) في يناير 2004، وهي منطقة اختيرت لاحتمال وجود مياه سائلة قديمة.',
          en: 'I launched on July 7, 2003, and touched down in Meridiani Planum in January 2004 — a landing site targeted for mineral clues of past water.',
        },
        {
          ar: 'قطعت حوالي 45 كيلومتراً وحللت صخور وتربة المريخ. اكتشفت كرات الهيماتيت الدقيقة (Hematite Blueberries) التي تتشكل بوجود المياه السائلة.',
          en: 'I drove about 45 kilometers and analyzed Martian rock and soil, discovering hematite "blueberries" — mineral spherules that formed in liquid water.',
        },
        {
          ar: 'في يونيو 2018، ضربت المريخ عاصفة غبارية عالمية كبرى حجبت أشعة الشمس عن ألواحي الشمسية، وفُقد الاتصال بعد 10 يونيو 2018.',
          en: 'In June 2018, a planet-encircling dust storm blocked sunlight from reaching my solar arrays. NASA sent final commands in early 2019.',
        },
      ],
      suggestions: {
        ar: ['كيف أثبتت وجود مياه قديمة على المريخ؟', 'ما هي كرات الهيماتيت الزرقاء (Blueberries)؟', 'كيف كانت الألواح الشمسية تعمل مع تراكم الغبار؟', 'ما أطول مسافة قطعتها في يوم واحد؟'],
        en: ['How did you prove past liquid water on Mars?', 'What are the Martian "blueberries"?', 'How did solar panels survive years of dust?', 'What was the greatest engineering challenge you faced?'],
      },
      chatIntro: {
        ar: 'أهلاً بك! أنا أوبورتيونيتي (Opportunity). اسألني عن أدواتي العلمية، اكتشافاتي الجيولوجية، أو مسيرتي عبر فوهات المريخ.',
        en: 'Welcome! I’m Opportunity (MER-B). Ask me about my scientific payload, geological discoveries, or crater explorations.',
      },
    },

    researchers: {
      tagline: {
        ar: 'مهمة استكشاف مريخية (MER-B) تجاوزت عمرها التصميمي بـ 55 ضعفاً وقدّمت دليلاً حاسماً على بيئات مائية قديمة.',
        en: 'NASA Mars Exploration Rover (MER-B) operating 55× beyond design lifetime; delivered decisive in-situ evidence of ancient aqueous environments.',
      },
      story: [
        {
          ar: 'أُطلقت على متن صاروخ Delta II 7925H في 7 يوليو 2003 بنظام MER-B، وهبطت في ميريديياني بلانوم عبر وسائد هوائية ودرع حراري ورادار هبوط.',
          en: 'Launched aboard a Delta II 7925H heavy rocket on July 7, 2003. Landed via aeroshell, parachute, and airbag deceleration into an impact crater at Meridiani Planum.',
        },
        {
          ar: 'حملت حزمة Athena العلمية: Pancam وMini-TES للرصد الطيفي، مطياف موسباور (Mössbauer)، مطياف جسيمات ألفا وأشعة سينية (APXS)، ومجهر صخري وأداة حك الصخور (RAT). أثبتت وجود بيئة مائية حمضية قديمة عبر كرات الهيماتيت وطبقات الجبس وكبريتات الماغنسيوم.',
          en: 'Carried the Athena science payload: Pancam, Mini-TES, Mössbauer Spectrometer, APXS, Microscopic Imager, and the Rock Abrasion Tool (RAT). Confirmed acidic, sulfate-rich ancient aqueous environments and cross-bedded sedimentary sulfate outcrops.',
        },
        {
          ar: 'اجتازت 45.16 كم وصولاً إلى حافة فوهة Endeavour (قطر 22 كم) ودرست صخور Noachian القديمة التي تعود لأكثر من 3.7 مليار سنة، حتى غطتها عاصفة الغبار العالمية MY34 في يونيو 2018.',
          en: 'Traversed 45.16 km to the rim of 22 km Endeavour Crater, characterizing ancient Noachian phyllosilicates (clays) from >3.7 Gya, before the planetary MY34 dust storm attenuated solar insolation below operating thresholds.',
        },
      ],
      suggestions: {
        ar: ['ما التوقيعات البترولوجية لمعدن الجاروسيت والهيماتيت؟', 'كيف أثّرت عاصفة 2018 (MY34) على توازن الطاقة الحرارية والكهربائية؟', 'ما الفروقات بين حزمة Athena وحزمة Perseverance SuperCam/PIXL؟', 'ما البيانات التي قدّمتها فوهة Endeavour عن عصر Noachian؟'],
        en: ['What petrological evidence did jarosite and hematite spherules provide?', 'How did atmospheric opacity (tau > 10.8) terminate operations in 2018?', 'How did Athena science compare to MSL CheMin and Perseverance PIXL?', 'What did phyllosilicate detections at Endeavour rim reveal about early Martian pH?'],
      },
      chatIntro: {
        ar: 'مرحباً. أنا المستكشف المريخي Opportunity (MER-B). جاهز لمناقشة القياسات الطيفية، البيانات البترولوجية، وتفاصيل الهندسة الفضائية.',
        en: 'Greetings. I am Opportunity (MER-B). Ready to discuss in-situ petrology, spectroscopic telemetry, and planetary surface operations.',
      },
    },
  },

  // الـ chat الافتراضي
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
const moon = {
  id: 'moon',
  enabled: true,
  solarNode: 'moon',
  backdrop: 'moon',
  name: {
    ar: 'القمر',
    en: 'Moon',
  },
  subtitle: { ar: 'جارنا الأقرب', en: 'Our closest neighbor' },
  crafts: [],
}
const space = {
  id: 'space',
  enabled: true,
  solarNode: null,
  backdrop: 'space',
  name: {
    ar: 'الفضاء',
    en: 'Space',
  },
    subtitle: { ar: 'اكتشف أسرار الكون', en: 'Explore the universe' },
  crafts: [],
}

export const worlds = [mars , moon ,space]
