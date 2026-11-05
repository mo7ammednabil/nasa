import { worlds } from '../data/worlds.js'

// يختار النص حسب اللغة (ولو مش موجود بيرجع للإنجليزي)
export const pick = (obj, lang) => (obj && (obj[lang] ?? obj.en)) || ''

export const enabledWorlds = () => worlds.filter((w) => w.enabled)
export const getWorld = (id) => worlds.find((w) => w.id === id)

// النص اللي بيتبعت للـ AI: هو المصدر الوحيد لإجابات المركبة
export function buildKnowledge(craft, statuses, lang) {
  const lines = []
  lines.push(`Name: ${pick(craft.name, 'en')} (nickname ${pick(craft.nickname, 'en')})`)
  lines.push(`Status: ${pick(statuses[craft.status], 'en')}`)
  craft.facts.forEach((f) => lines.push(`${pick(f.label, 'en')}: ${pick(f.value, 'en')}`))
  lines.push(`Main achievement: ${pick(craft.achievement, 'en')}`)
  lines.push('Story:')
  craft.story.forEach((s) => lines.push(`- ${pick(s, 'en')}`))
  if (lang === 'ar') {
    lines.push('')
    lines.push('Arabic wording reference (use these Arabic phrasings when answering in Arabic):')
    craft.facts.forEach((f) => lines.push(`${pick(f.label, 'ar')}: ${pick(f.value, 'ar')}`))
    lines.push(`الإنجاز: ${pick(craft.achievement, 'ar')}`)
  }
  return lines.join('\n')
}
