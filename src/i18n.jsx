import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const strings = {
  ar: {
    siteTitle: 'أشياء تُركت، لكنها لم تُنسَ',
    siteTitleEn: 'Abandoned but not Forgotten',
    kicker: 'مشروع تعليمي',
    heroLine: 'أجهزة تركتها بعثات الفضاء، وما زالت تحكي قصتها.',
    heroBody:
      'وصلت بعثات كثيرة إلى القمر والمريخ وأنهت عملها، وبقيت معداتها هناك. استكشف كل جهاز: ما مهمته، وماذا حقق، وماذا حدث له بعد ذلك.',
    explore: 'استكشف',
    exploreHint: 'اسحب لتدوير المجموعة الشمسية',
    scaleNote: 'الأحجام والمسافات هنا مضغوطة لتظهر كلها. المسافات الحقيقية أكبر بكثير.',
    loading3d: 'جاري تحميل المشهد…',
    fallbackSolar: 'المشهد ثلاثي الأبعاد غير متاح على جهازك.',
    back: 'رجوع',
    tapCraft: 'اضغط على المركبة',
    dragHint: 'اسحب للتدوير · اضغط على المركبة للتفاصيل',
    comingSoon: 'مركبات هذا العالم قريبًا.',
    chooseCraft: 'اختر مركبة',
    close: 'إغلاق',
    tabInfo: 'المعلومات',
    tabStory: 'القصة',
    tabVideo: 'فيديو',
    tabChat: 'اسألها',
    statusLabel: 'حالة المهمة',
    achievement: 'أهم إنجاز',
    storyNote: 'القصة بصوت المركبة تخيّل إبداعي، والمعلومات التي فيها حقيقية.',
    sources: 'المصادر',
    videoMissing: 'لم يُضَف الفيديو بعد.',
    videoMissingHint: 'ضع الملف في',
    chatPlaceholder: 'اكتب سؤالك عن المركبة…',
    send: 'إرسال',
    thinking: 'جاري التفكير…',
    chatNoKey: 'خدمة الـ chat غير متاحة حاليًا. حاول مرة أخرى بعد قليل.',
    chatError: 'حدثت مشكلة أثناء الرد. حاول مرة أخرى بعد قليل.',
    chatTooLong: 'السؤال طويل قليلًا، اختصره من فضلك.',
    chatRate: 'انتظر لحظة قبل السؤال التالي.',
    chatSafety:
      'يبدو أنك تحتاج للتحدث مع أحد. من فضلك أخبر شخصًا بالغًا تثق به الآن، مثل أحد والديك أو معلمك. أنا روبوت ولا أستطيع مساعدتك في هذا.',
    chatFooter: 'الإجابات مبنية على مصادر NASA الموضحة في تبويب المعلومات. المركبة روبوت ولا تتحدث فعلًا.',
    ageSelectTitle: 'اختر فئتك العمرية',
    ageSelectSubtitle: 'سنخصص القصص، عمق الشروحات العلمية، وأسلوب المحادثة مع الروبوتات ليناسبك تماماً.',
    ageSelectHint: 'يمكنك تغيير هذا الاختيار في أي وقت.',
    continueBtn: 'متابعة الاستكشاف',
    changeAge: 'تغيير المستوى',
    ageLevelLabel: 'المستوى',
    lang: 'English',
  },
  en: {
    siteTitle: 'Abandoned but not Forgotten',
    siteTitleEn: 'Abandoned but not Forgotten',
    kicker: 'Educational project',
    heroLine: 'Machines left behind by space missions still have stories to tell.',
    heroBody:
      'Many missions reached the Moon and Mars, finished their work, and left their hardware behind. Explore each one: what it was built to do, what it achieved, and what happened next.',
    explore: 'Explore',
    exploreHint: 'Drag to rotate the solar system',
    scaleNote: 'Sizes and distances are compressed so everything fits. Real distances are far greater.',
    loading3d: 'Loading scene…',
    fallbackSolar: '3D is not available on this device.',
    back: 'Back',
    tapCraft: 'Tap the rover',
    dragHint: 'Drag to rotate · tap the rover for details',
    comingSoon: 'Missions for this world are coming soon.',
    chooseCraft: 'Choose a craft',
    close: 'Close',
    tabInfo: 'Info',
    tabStory: 'Story',
    tabVideo: 'Video',
    tabChat: 'Ask',
    statusLabel: 'Mission status',
    achievement: 'Biggest achievement',
    storyNote: 'The story is told in the rover’s voice as creative imagination. The facts in it are real.',
    sources: 'Sources',
    videoMissing: 'No video added yet.',
    videoMissingHint: 'Put the file at',
    chatPlaceholder: 'Type your question about the rover…',
    send: 'Send',
    thinking: 'Thinking…',
    chatNoKey: 'Chat is temporarily unavailable. Please try again in a moment.',
    chatError: 'Something went wrong while answering. Please try again in a bit.',
    chatTooLong: 'That question is a bit long. Please shorten it.',
    chatRate: 'Wait a moment before the next question.',
    chatSafety:
      'It sounds like you may need to talk to someone. Please tell a trusted adult right now, like a parent or a teacher. I’m a robot and can’t help with this.',
    chatFooter: 'Answers come from the NASA sources listed in the Info tab. The rover is a robot and does not really talk.',
    ageSelectTitle: 'Choose Your Explorer Level',
    ageSelectSubtitle: 'We will personalize stories, explanation depth, and rover AI chat to fit you best.',
    ageSelectHint: 'You can change your explorer level at any time.',
    continueBtn: 'Continue Exploring',
    changeAge: 'Change Level',
    ageLevelLabel: 'Level',
    lang: 'العربية',
  },
}

const LangContext = createContext(null)

function readStoredLang() {
  try {
    const v = localStorage.getItem('lang')
    if (v === 'ar' || v === 'en') return v
  } catch {
    /* storage can be blocked */
  }
  return 'ar'
}

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(readStoredLang)

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  const setLang = useCallback((l) => {
    setLangState(l)
    try {
      localStorage.setItem('lang', l)
    } catch {
      /* ignore */
    }
  }, [])

  const value = useMemo(
    () => ({ lang, setLang, t: strings[lang], dir: lang === 'ar' ? 'rtl' : 'ltr' }),
    [lang, setLang],
  )
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
