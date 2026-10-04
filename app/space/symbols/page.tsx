'use client'

import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useLanguage } from '../../context/LanguageContext'

/* ============================================================
   SVG ICONS
   ============================================================ */
const BookIcon = ({ color = '#a78bfa', size = 20 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <path d="M4 5.5C4 4.7 4.7 4 5.5 4H12v15H5.5c-.8 0-1.5.7-1.5 1.5V5.5Z" stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M20 5.5c0-.8-.7-1.5-1.5-1.5H12v15h6.5c.8 0 1.5.7 1.5 1.5V5.5Z" stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
)
const AlchemyIcon = ({ color = '#a78bfa', size = 20 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <path d="M9 3h6M10 3v5l-4 9a2 2 0 0 0 2 3h8a2 2 0 0 0 2-3l-4-9V3" stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M7 15h10" stroke={color} strokeWidth="1" opacity="0.6" />
  </svg>
)
const RuneIcon = ({ color = '#a78bfa', size = 20 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <path d="M6 3v18M6 3l12 8-12 8" stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
)
const GeometryIcon = ({ color = '#a78bfa', size = 20 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <circle cx="12" cy="12" r="4" stroke={color} strokeWidth="1.2" />
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.2" />
    <path d="M3 12h18M12 3v18M5 5l14 14M19 5 5 19" stroke={color} strokeWidth="0.6" opacity="0.4" />
  </svg>
)
const EgyptIcon = ({ color = '#a78bfa', size = 20 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <path d="M12 3v12M8 3h8M9 15c0 3 1.5 5 3 5s3-2 3-5" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="12" cy="8" r="1.5" stroke={color} strokeWidth="1.2" />
  </svg>
)
const StarIcon = ({ color = '#a78bfa', size = 20 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <path d="m12 3 2.5 6L21 11l-6 2.5L12 20l-2.5-6.5L3 11l6.5-2L12 3Z" stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
)
const NatureIcon = ({ color = '#a78bfa', size = 20 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <path d="M20 4C11 4 4 10 4 18c0 1 0 2 .5 2 8-.5 15-6 15.5-16Z" stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M4 20c4-4 8-8 16-16" stroke={color} strokeWidth="0.8" opacity="0.6" />
  </svg>
)
const TransformIcon = ({ color = '#a78bfa', size = 20 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <path d="M4 12a8 8 0 0 1 14-5l2 2M20 12a8 8 0 0 1-14 5l-2-2" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    <path d="M20 5v4h-4M4 19v-4h4" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const ShieldIcon = ({ color = '#a78bfa', size = 20 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Z" stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
)
const CloseIcon = ({ color = '#a8a29e' }: { color?: string }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
    <path d="M6 6l12 12M18 6 6 18" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

/* ============================================================
   CATEGORIES
   ============================================================ */
const categories = [
  { id: 'alchemy',      nameEn: 'Alchemy',          nameAr: 'الخيمياء',           Icon: AlchemyIcon,   color: '#fbbf24' },
  { id: 'runes',        nameEn: 'Elder Futhark',    nameAr: 'الرونات',            Icon: RuneIcon,      color: '#a78bfa' },
  { id: 'geometry',     nameEn: 'Sacred Geometry',  nameAr: 'الهندسة المقدسة',    Icon: GeometryIcon,  color: '#22d3ee' },
  { id: 'egypt',        nameEn: 'Egyptian',         nameAr: 'المصرية',            Icon: EgyptIcon,     color: '#fbbf24' },
  { id: 'cosmic',       nameEn: 'Cosmic & Planetary', nameAr: 'الكونية والكواكب', Icon: StarIcon,      color: '#c084fc' },
  { id: 'nature',       nameEn: 'Nature & Animals', nameAr: 'الطبيعة والحيوانات', Icon: NatureIcon,    color: '#34d399' },
  { id: 'transform',    nameEn: 'Transformation',   nameAr: 'التحول',             Icon: TransformIcon, color: '#f472b6' },
  { id: 'protection',   nameEn: 'Protection',       nameAr: 'الحماية',            Icon: ShieldIcon,    color: '#60a5fa' },
]

/* ============================================================
   SYMBOLS DATA
   ============================================================ */
interface Symbol {
  id: string
  nameEn: string
  nameAr: string
  symbol: string
  originEn: string
  originAr: string
  meaningEn: string
  meaningAr: string
  historicalEn: string
  historicalAr: string
  modernEn: string
  modernAr: string
  color: string
  category: string
}

const symbols: Symbol[] = [
  /* ---------- ALCHEMY ---------- */
  { id: 'philosophers-stone', nameEn: "Philosopher's Stone", nameAr: 'حجر الفلاسفة', symbol: '◉',
    originEn: 'Western alchemy, Magnum Opus', originAr: 'الخيمياء الغربية، العمل العظيم',
    meaningEn: 'Transmutation, spiritual perfection, immortality', meaningAr: 'التحويل الجوهري، الكمال الروحي، الخلود',
    historicalEn: 'The legendary substance sought by alchemists, believed to transmute base metals into gold and grant longevity. A central symbol of the alchemical quest.',
    historicalAr: 'الجوهر الأسطوري الذي بحث عنه الخيميائيون، يُعتقد أنه يحوّل المعادن الخسيسة إلى ذهب ويمنح الخلود. رمز مركزي في رحلة الخيمياء.',
    modernEn: 'Symbol of ultimate inner transformation and the attainment of the true self.',
    modernAr: 'رمز للتحول الداخلي الأقصى وتحقيق الذات الحقيقية.',
    color: '#fbbf24', category: 'alchemy' },
  { id: 'sulfur', nameEn: 'Sulfur', nameAr: 'الكبريت', symbol: '🜍',
    originEn: 'Tria Prima (Paracelsian alchemy)', originAr: 'الثلاثية الأولى (خيمياء باراسيلسوس)',
    meaningEn: 'Soul, combustibility, active principle, masculine energy', meaningAr: 'الروح، القابلية للاشتعال، المبدأ الفعّال، الطاقة الذكرية',
    historicalEn: 'One of the three primes. Represented the soul and the active, fiery principle in matter.',
    historicalAr: 'أحد المبادئ الثلاثة. يمثل الروح والمبدأ الفعّال الناري في المادة.',
    modernEn: 'Symbol of inner fire, willpower, and transformative passion.',
    modernAr: 'رمز للنار الداخلية، الإرادة، والشغف التحويلي.',
    color: '#ef4444', category: 'alchemy' },
  { id: 'mercury-alch', nameEn: 'Mercury (Alchemical)', nameAr: 'الزئبق', symbol: '☿',
    originEn: 'Tria Prima', originAr: 'الثلاثية الأولى',
    meaningEn: 'Spirit, fluidity, volatility, communication', meaningAr: 'الروح، السيولة، التطاير، التواصل',
    historicalEn: 'Represented the spirit — the mediating principle between sulfur and salt.',
    historicalAr: 'يمثل الروح — المبدأ الوسيط بين الكبريت والملح.',
    modernEn: 'Symbol of adaptability, mental agility, and the mediating intelligence.',
    modernAr: 'رمز للتكيف، الرشاقة الذهنية، والذكاء الوسيط.',
    color: '#a78bfa', category: 'alchemy' },
  { id: 'salt', nameEn: 'Salt', nameAr: 'الملح', symbol: '🜔',
    originEn: 'Tria Prima', originAr: 'الثلاثية الأولى',
    meaningEn: 'Body, solidity, crystallization, preservation', meaningAr: 'الجسد، الصلابة، التبلور، الحفظ',
    historicalEn: 'Represented the body — the fixed, material principle.',
    historicalAr: 'يمثل الجسد — المبدأ الثابت والمادي.',
    modernEn: 'Symbol of grounding, embodiment, and physical manifestation.',
    modernAr: 'رمز للتجذير، التجسد، والتجلي المادي.',
    color: '#e7e9ea', category: 'alchemy' },
  { id: 'fire-alch', nameEn: 'Alchemical Fire', nameAr: 'عنصر النار', symbol: '🜂',
    originEn: 'Four Classical Elements', originAr: 'العناصر الأربعة الكلاسيكية',
    meaningEn: 'Heat, transformation, expansion, purification', meaningAr: 'الحرارة، التحول، التوسع، التطهير',
    historicalEn: 'Fire — the element of transformation and the driving force of change.',
    historicalAr: 'النار — عنصر التحول والقوة الدافعة للتغيير.',
    modernEn: 'Inner passion, will, and the courage to transform.',
    modernAr: 'الشغف الداخلي، الإرادة، والشجاعة للتحول.',
    color: '#f97316', category: 'alchemy' },
  { id: 'water-alch', nameEn: 'Alchemical Water', nameAr: 'عنصر الماء', symbol: '🜄',
    originEn: 'Four Classical Elements', originAr: 'العناصر الأربعة الكلاسيكية',
    meaningEn: 'Fluidity, dissolution, emotion, adaptation', meaningAr: 'السيولة، التحلل، العاطفة، التكيف',
    historicalEn: 'Water — the element of dissolution and emotional depth.',
    historicalAr: 'الماء — عنصر التحلل والعمق العاطفي.',
    modernEn: 'Symbol of emotional flow and inner receptivity.',
    modernAr: 'رمز للتدفق العاطفي والاستقبال الداخلي.',
    color: '#38bdf8', category: 'alchemy' },
  { id: 'air-alch', nameEn: 'Alchemical Air', nameAr: 'عنصر الهواء', symbol: '🜁',
    originEn: 'Four Classical Elements', originAr: 'العناصر الأربعة الكلاسيكية',
    meaningEn: 'Movement, breath, intellect, communication', meaningAr: 'الحركة، النفس، الفكر، التواصل',
    historicalEn: 'Air — the element of intellect and communication.',
    historicalAr: 'الهواء — عنصر الفكر والتواصل.',
    modernEn: 'Symbol of mental clarity and the breath of life.',
    modernAr: 'رمز للصفاء الذهني ونسمة الحياة.',
    color: '#67e8f9', category: 'alchemy' },
  { id: 'earth-alch', nameEn: 'Alchemical Earth', nameAr: 'عنصر الأرض', symbol: '🜃',
    originEn: 'Four Classical Elements', originAr: 'العناصر الأربعة الكلاسيكية',
    meaningEn: 'Matter, stability, physicality, foundation', meaningAr: 'المادة، الاستقرار، الجسدية، الأساس',
    historicalEn: 'Earth — the element of matter and manifestation.',
    historicalAr: 'الأرض — عنصر المادة والتجلي.',
    modernEn: 'Symbol of grounding and material stability.',
    modernAr: 'رمز للتجذير والاستقرار المادي.',
    color: '#84cc16', category: 'alchemy' },
  { id: 'ouroboros', nameEn: 'Ouroboros', nameAr: 'الأوروبوروس', symbol: 'ⵔ',
    originEn: 'Ancient Egypt → Greek alchemy → European alchemy', originAr: 'مصر القديمة → الخيمياء اليونانية → الخيمياء الأوروبية',
    meaningEn: 'Cycle, infinity, unity, death and rebirth', meaningAr: 'الدورة، اللانهاية، الوحدة، الموت والبعث',
    historicalEn: 'A serpent or dragon eating its own tail — a symbol of cyclical nature and eternal return.',
    historicalAr: 'ثعبان أو تنين يأكل ذيله — رمز للطبيعة الدورية والعودة الأبدية.',
    modernEn: 'Symbol of self-renewal, integration, and the endless cycle of transformation.',
    modernAr: 'رمز للتجدد الذاتي، التكامل، والدورة اللانهائية من التحول.',
    color: '#a78bfa', category: 'alchemy' },

  /* ---------- ELDER FUTHARK ---------- */
  { id: 'fehu', nameEn: 'Fehu', nameAr: 'فيهو', symbol: 'ᚠ',
    originEn: 'Elder Futhark', originAr: 'الأبجدية الفوثاركية القديمة',
    meaningEn: 'Cattle, movable wealth', meaningAr: 'الماشية، الثروة المنقولة',
    historicalEn: 'Historically associated with cattle and movable wealth in early Germanic societies.',
    historicalAr: 'يرتبط تاريخياً بالماشية والثروة المنقولة في المجتمعات الجرمانية المبكرة.',
    modernEn: 'Abundance, resources, movement of wealth, material creation.',
    modernAr: 'الوفرة، الموارد، حركة الثروة، الخلق المادي.',
    color: '#fbbf24', category: 'runes' },
  { id: 'uruz', nameEn: 'Uruz', nameAr: 'أوروز', symbol: 'ᚢ',
    originEn: 'Elder Futhark', originAr: 'الأبجدية الفوثاركية القديمة',
    meaningEn: 'Aurochs (wild ox)', meaningAr: 'الثور البري',
    historicalEn: 'Historically the rune of the aurochs — a symbol of primal strength.',
    historicalAr: 'تاريخياً رونة الثور البري — رمز للقوة البدائية.',
    modernEn: 'Inner strength, vitality, untamed power.',
    modernAr: 'القوة الداخلية، الحيوية، القوة الجامحة.',
    color: '#a78bfa', category: 'runes' },
  { id: 'thurisaz', nameEn: 'Thurisaz', nameAr: 'ثوريساز', symbol: 'ᚦ',
    originEn: 'Elder Futhark', originAr: 'الأبجدية الفوثاركية القديمة',
    meaningEn: 'Giant, Þurs', meaningAr: 'العملاق، ثورس',
    historicalEn: 'Associated with the giants (thurses) of Norse cosmology.',
    historicalAr: 'يرتبط بالعمالقة (ثورس) في الكونيات النوردية.',
    modernEn: 'Protection, boundaries, reactive force, challenge.',
    modernAr: 'الحماية، الحدود، القوة التفاعلية، التحدي.',
    color: '#64748b', category: 'runes' },
  { id: 'ansuz', nameEn: 'Ansuz', nameAr: 'أنسوز', symbol: 'ᚨ',
    originEn: 'Elder Futhark', originAr: 'الأبجدية الفوثاركية القديمة',
    meaningEn: 'God, deity', meaningAr: 'الإله، الرب',
    historicalEn: 'Associated with the gods and divine communication.',
    historicalAr: 'يرتبط بالآلهة والتواصل الإلهي.',
    modernEn: 'Divine messages, higher communication, wisdom.',
    modernAr: 'الرسائل الإلهية، التواصل الأعلى، الحكمة.',
    color: '#22d3ee', category: 'runes' },
  { id: 'raidho', nameEn: 'Raidho', nameAr: 'رايدهو', symbol: 'ᚱ',
    originEn: 'Elder Futhark', originAr: 'الأبجدية الفوثاركية القديمة',
    meaningEn: 'Riding, journey', meaningAr: 'الركوب، الرحلة',
    historicalEn: 'Associated with riding and travel.',
    historicalAr: 'يرتبط بالركوب والسفر.',
    modernEn: 'Journey, destiny, movement towards a goal.',
    modernAr: 'الرحلة، القدر، الحركة نحو الهدف.',
    color: '#60a5fa', category: 'runes' },
  { id: 'kenaz', nameEn: 'Kenaz', nameAr: 'كيناز', symbol: 'ᚲ',
    originEn: 'Elder Futhark', originAr: 'الأبجدية الفوثاركية القديمة',
    meaningEn: 'Torch', meaningAr: 'المشعل',
    historicalEn: 'Associated with the torch — a source of light and warmth.',
    historicalAr: 'يرتبط بالمشعل — مصدر النور والدفء.',
    modernEn: 'Illumination, creative fire, inner knowledge.',
    modernAr: 'الإشراق، النار الإبداعية، المعرفة الداخلية.',
    color: '#f59e0b', category: 'runes' },
  { id: 'gebo', nameEn: 'Gebo', nameAr: 'غيبو', symbol: 'ᚷ',
    originEn: 'Elder Futhark', originAr: 'الأبجدية الفوثاركية القديمة',
    meaningEn: 'Gift', meaningAr: 'الهدية',
    historicalEn: 'Associated with gifts and exchange.',
    historicalAr: 'يرتبط بالهدايا والتبادل.',
    modernEn: 'Generosity, reciprocity, sacred exchange.',
    modernAr: 'الكرم، التبادل، العطاء المقدس.',
    color: '#a78bfa', category: 'runes' },
  { id: 'wunjo', nameEn: 'Wunjo', nameAr: 'وونجو', symbol: 'ᚹ',
    originEn: 'Elder Futhark', originAr: 'الأبجدية الفوثاركية القديمة',
    meaningEn: 'Joy', meaningAr: 'الفرح',
    historicalEn: 'Associated with joy and harmony.',
    historicalAr: 'يرتبط بالفرح والانسجام.',
    modernEn: 'Joy, harmony, well-being.',
    modernAr: 'الفرح، الانسجام، العافية.',
    color: '#34d399', category: 'runes' },
  { id: 'hagalaz', nameEn: 'Hagalaz', nameAr: 'هاغالاز', symbol: 'ᚺ',
    originEn: 'Elder Futhark', originAr: 'الأبجدية الفوثاركية القديمة',
    meaningEn: 'Hail', meaningAr: 'البَرَد',
    historicalEn: 'Associated with hail — a disruptive natural force.',
    historicalAr: 'يرتبط بالبَرَد — قوة طبيعية مدمرة.',
    modernEn: 'Sudden change, disruption, necessary destruction.',
    modernAr: 'التغيير المفاجئ، التعطيل، الدمار الضروري.',
    color: '#60a5fa', category: 'runes' },
  { id: 'nauthiz', nameEn: 'Nauthiz', nameAr: 'ناوثيز', symbol: 'ᚾ',
    originEn: 'Elder Futhark', originAr: 'الأبجدية الفوثاركية القديمة',
    meaningEn: 'Need, necessity', meaningAr: 'الحاجة، الضرورة',
    historicalEn: 'Associated with need and constraint.',
    historicalAr: 'يرتبط بالحاجة والقيود.',
    modernEn: 'Necessity, resistance, discipline.',
    modernAr: 'الضرورة، المقاومة، الانضباط.',
    color: '#64748b', category: 'runes' },
  { id: 'isa', nameEn: 'Isa', nameAr: 'إيسا', symbol: 'ᛁ',
    originEn: 'Elder Futhark', originAr: 'الأبجدية الفوثاركية القديمة',
    meaningEn: 'Ice', meaningAr: 'الجليد',
    historicalEn: 'Associated with ice — cold, stillness, and delay.',
    historicalAr: 'يرتبط بالجليد — البرد، السكون، والتأخير.',
    modernEn: 'Stillness, patience, concentrated focus.',
    modernAr: 'السكون، الصبر، التركيز المكثف.',
    color: '#67e8f9', category: 'runes' },
  { id: 'jera', nameEn: 'Jera', nameAr: 'جيرا', symbol: 'ᛃ',
    originEn: 'Elder Futhark', originAr: 'الأبجدية الفوثاركية القديمة',
    meaningEn: 'Year, harvest', meaningAr: 'السنة، الحصاد',
    historicalEn: 'Associated with the yearly cycle and harvest.',
    historicalAr: 'يرتبط بالدورة السنوية والحصاد.',
    modernEn: 'Cycles, patience, rewarded effort.',
    modernAr: 'الدورات، الصبر، الجهد المكافأ.',
    color: '#84cc16', category: 'runes' },
  { id: 'eihwaz', nameEn: 'Eihwaz', nameAr: 'إيهواز', symbol: 'ᛇ',
    originEn: 'Elder Futhark', originAr: 'الأبجدية الفوثاركية القديمة',
    meaningEn: 'Yew tree', meaningAr: 'شجرة الطقسوس',
    historicalEn: 'Associated with the yew — a tree linked to death and endurance.',
    historicalAr: 'يرتبط بشجرة الطقسوس — شجرة مرتبطة بالموت والتحمل.',
    modernEn: 'Transformation, endurance, the axis between worlds.',
    modernAr: 'التحول، التحمل، المحور بين العوالم.',
    color: '#a3a380', category: 'runes' },
  { id: 'perthro', nameEn: 'Perthro', nameAr: 'بيرثرو', symbol: 'ᛈ',
    originEn: 'Elder Futhark', originAr: 'الأبجدية الفوثاركية القديمة',
    meaningEn: 'Uncertain (possibly "lot" or "dice cup")', meaningAr: 'غير مؤكد (ربما "القرعة" أو "كأس النرد")',
    historicalEn: 'Its original meaning is uncertain; possibly associated with fate or chance.',
    historicalAr: 'معناه الأصلي غير مؤكد؛ ربما مرتبط بالقدر أو الحظ.',
    modernEn: 'Mystery, fate, hidden knowledge.',
    modernAr: 'الغموض، القدر، المعرفة الخفية.',
    color: '#9333ea', category: 'runes' },
  { id: 'algiz', nameEn: 'Algiz', nameAr: 'ألغيز', symbol: 'ᛉ',
    originEn: 'Elder Futhark', originAr: 'الأبجدية الفوثاركية القديمة',
    meaningEn: 'Uncertain (traditionally: elk or protection)', meaningAr: 'غير مؤكد (تقليدياً: الأيائل أو الحماية)',
    historicalEn: 'Its exact meaning is uncertain. Traditionally associated with elk or protection.',
    historicalAr: 'معناه الدقيق غير مؤكد. يرتبط تقليدياً بالأيائل أو الحماية.',
    modernEn: 'Protection, spiritual shield, higher guidance.',
    modernAr: 'الحماية، الدرع الروحي، الإرشاد الأعلى.',
    color: '#a78bfa', category: 'runes' },
  { id: 'sowilo', nameEn: 'Sowilo', nameAr: 'سوويلو', symbol: 'ᛊ',
    originEn: 'Elder Futhark', originAr: 'الأبجدية الفوثاركية القديمة',
    meaningEn: 'Sun', meaningAr: 'الشمس',
    historicalEn: 'Associated with the sun.',
    historicalAr: 'يرتبط بالشمس.',
    modernEn: 'Light, guidance, victory, life force.',
    modernAr: 'النور، الإرشاد، النصر، قوة الحياة.',
    color: '#fbbf24', category: 'runes' },
  { id: 'tiwaz', nameEn: 'Tiwaz', nameAr: 'تيواز', symbol: 'ᛏ',
    originEn: 'Elder Futhark', originAr: 'الأبجدية الفوثاركية القديمة',
    meaningEn: 'Týr (the god)', meaningAr: 'تير (الإله)',
    historicalEn: 'Associated with the god Týr — a symbol of justice and honor.',
    historicalAr: 'يرتبط بالإله تير — رمز العدالة والشرف.',
    modernEn: 'Justice, courage, truth, sacrifice.',
    modernAr: 'العدالة، الشجاعة، الحقيقة، التضحية.',
    color: '#60a5fa', category: 'runes' },
  { id: 'berkano', nameEn: 'Berkano', nameAr: 'بيركانو', symbol: 'ᛒ',
    originEn: 'Elder Futhark', originAr: 'الأبجدية الفوثاركية القديمة',
    meaningEn: 'Birch', meaningAr: 'شجرة البتولا',
    historicalEn: 'Associated with the birch — a symbol of growth and renewal.',
    historicalAr: 'يرتبط بشجرة البتولا — رمز النمو والتجدد.',
    modernEn: 'Birth, growth, nurturing, new beginnings.',
    modernAr: 'الولادة، النمو، الرعاية، البدايات الجديدة.',
    color: '#34d399', category: 'runes' },
  { id: 'ehwaz', nameEn: 'Ehwaz', nameAr: 'إهواز', symbol: 'ᛖ',
    originEn: 'Elder Futhark', originAr: 'الأبجدية الفوثاركية القديمة',
    meaningEn: 'Horse', meaningAr: 'الحصان',
    historicalEn: 'Associated with the horse — a symbol of partnership and movement.',
    historicalAr: 'يرتبط بالحصان — رمز الشراكة والحركة.',
    modernEn: 'Partnership, trust, movement forward.',
    modernAr: 'الشراكة، الثقة، الحركة إلى الأمام.',
    color: '#a3a380', category: 'runes' },
  { id: 'mannaz', nameEn: 'Mannaz', nameAr: 'ماناز', symbol: 'ᛗ',
    originEn: 'Elder Futhark', originAr: 'الأبجدية الفوثاركية القديمة',
    meaningEn: 'Human, humanity', meaningAr: 'الإنسان، البشرية',
    historicalEn: 'Associated with humanity and the self.',
    historicalAr: 'يرتبط بالإنسان والذات.',
    modernEn: 'The self, humanity, community.',
    modernAr: 'الذات، الإنسانية، المجتمع.',
    color: '#c084fc', category: 'runes' },
  { id: 'laguz', nameEn: 'Laguz', nameAr: 'لاغوز', symbol: 'ᛚ',
    originEn: 'Elder Futhark', originAr: 'الأبجدية الفوثاركية القديمة',
    meaningEn: 'Water, lake', meaningAr: 'الماء، البحيرة',
    historicalEn: 'Associated with water — a symbol of flow and intuition.',
    historicalAr: 'يرتبط بالماء — رمز التدفق والحدس.',
    modernEn: 'Intuition, flow, emotional depth.',
    modernAr: 'الحدس، التدفق، العمق العاطفي.',
    color: '#38bdf8', category: 'runes' },
  { id: 'ingwaz', nameEn: 'Ingwaz', nameAr: 'إنغواز', symbol: 'ᛜ',
    originEn: 'Elder Futhark', originAr: 'الأبجدية الفوثاركية القديمة',
    meaningEn: 'Ing (a deity)', meaningAr: 'إنغ (إله)',
    historicalEn: 'Associated with the god Ing.',
    historicalAr: 'يرتبط بالإله إنغ.',
    modernEn: 'Fertility, potential, gestation.',
    modernAr: 'الخصوبة، الإمكانية، الحمل.',
    color: '#84cc16', category: 'runes' },
  { id: 'dagaz', nameEn: 'Dagaz', nameAr: 'داغاز', symbol: 'ᛞ',
    originEn: 'Elder Futhark', originAr: 'الأبجدية الفوثاركية القديمة',
    meaningEn: 'Day', meaningAr: 'النهار',
    historicalEn: 'Associated with day — a symbol of light and awakening.',
    historicalAr: 'يرتبط بالنهار — رمز النور والصحوة.',
    modernEn: 'Awakening, transformation, breakthrough.',
    modernAr: 'الصحوة، التحول، الاختراق.',
    color: '#fcd34d', category: 'runes' },
  { id: 'othala', nameEn: 'Othala', nameAr: 'أوثالا', symbol: 'ᛟ',
    originEn: 'Elder Futhark', originAr: 'الأبجدية الفوثاركية القديمة',
    meaningEn: 'Inheritance, ancestral property', meaningAr: 'الميراث، ممتلكات الأجداد',
    historicalEn: 'Associated with ancestral property and inheritance.',
    historicalAr: 'يرتبط بممتلكات الأجداد والميراث.',
    modernEn: 'Ancestry, roots, heritage.',
    modernAr: 'الأصل، الجذور، التراث.',
    color: '#a78bfa', category: 'runes' },

  /* ---------- SACRED GEOMETRY ---------- */
  { id: 'point', nameEn: 'Point', nameAr: 'النقطة', symbol: '●',
    originEn: 'Sacred Geometry', originAr: 'الهندسة المقدسة',
    meaningEn: 'Origin, unity, the source', meaningAr: 'الأصل، الوحدة، المصدر',
    historicalEn: 'The point has been considered the origin of all geometric form.',
    historicalAr: 'اعتُبرت النقطة أصل كل شكل هندسي.',
    modernEn: 'The seed of all creation.',
    modernAr: 'بذرة كل خلق.',
    color: '#e7e9ea', category: 'geometry' },
  { id: 'circle', nameEn: 'Circle', nameAr: 'الدائرة', symbol: '○',
    originEn: 'Sacred Geometry', originAr: 'الهندسة المقدسة',
    meaningEn: 'Unity, wholeness, eternity', meaningAr: 'الوحدة، الكلية، الأبدية',
    historicalEn: 'A universal symbol across many cultures.',
    historicalAr: 'رمز عالمي عبر العديد من الثقافات.',
    modernEn: 'Completeness, cycles, infinity.',
    modernAr: 'الاكتمال، الدورات، اللانهاية.',
    color: '#22d3ee', category: 'geometry' },
  { id: 'triangle', nameEn: 'Triangle', nameAr: 'المثلث', symbol: '△',
    originEn: 'Sacred Geometry', originAr: 'الهندسة المقدسة',
    meaningEn: 'Threefold structure, ascent, fire', meaningAr: 'البنية الثلاثية، الصعود، النار',
    historicalEn: 'Associated with ascent or stability depending on orientation.',
    historicalAr: 'يرتبط بالصعود أو الاستقرار حسب الاتجاه.',
    modernEn: 'Trinity, balance, transformation.',
    modernAr: 'الثالوث، التوازن، التحول.',
    color: '#f59e0b', category: 'geometry' },
  { id: 'square', nameEn: 'Square', nameAr: 'المربع', symbol: '□',
    originEn: 'Sacred Geometry', originAr: 'الهندسة المقدسة',
    meaningEn: 'Stability, material order, four directions', meaningAr: 'الاستقرار، النظام المادي، الاتجاهات الأربعة',
    historicalEn: 'Often associated with earth and matter.',
    historicalAr: 'غالباً ما يرتبط بالأرض والمادة.',
    modernEn: 'Foundation, structure, manifestation.',
    modernAr: 'الأساس، البنية، التجلي.',
    color: '#84cc16', category: 'geometry' },
  { id: 'pentagon', nameEn: 'Pentagon', nameAr: 'المخمس', symbol: '⬠',
    originEn: 'Sacred Geometry', originAr: 'الهندسة المقدسة',
    meaningEn: 'Fivefold symmetry, the human form', meaningAr: 'التناظر الخماسي، الشكل الإنساني',
    historicalEn: 'Associated with the human body and the Pythagorean tradition.',
    historicalAr: 'يرتبط بالجسم البشري والتقليد الفيثاغوري.',
    modernEn: 'Humanity, protection, harmony.',
    modernAr: 'الإنسانية، الحماية، الانسجام.',
    color: '#a78bfa', category: 'geometry' },
  { id: 'hexagram', nameEn: 'Hexagram', nameAr: 'السداسي', symbol: '✡',
    originEn: 'Sacred Geometry / Judaism / Western occultism', originAr: 'الهندسة المقدسة / اليهودية / التنجيم الغربي',
    meaningEn: 'Meeting of opposites, interlocking triangles', meaningAr: 'التقاء الأضداد، مثلثات متشابكة',
    historicalEn: 'In Jewish tradition it is the Magen David. In Western occultism it also carries elemental symbolism.',
    historicalAr: 'في التقليد اليهودي هو ماغن ديفيد. في التنجيم الغربي يحمل أيضاً رمزية عنصرية.',
    modernEn: 'Balance, union of opposites, cosmic order.',
    modernAr: 'التوازن، اتحاد الأضداد، النظام الكوني.',
    color: '#60a5fa', category: 'geometry' },
  { id: 'vesica', nameEn: 'Vesica Piscis', nameAr: 'فيسيكا بيسيس', symbol: '◉',
    originEn: 'Sacred Geometry', originAr: 'الهندسة المقدسة',
    meaningEn: 'Divine union, intersection, creation', meaningAr: 'الاتحاد الإلهي، التقاطع، الخلق',
    historicalEn: 'Historically significant in sacred geometry and Christian architecture.',
    historicalAr: 'مهم تاريخياً في الهندسة المقدسة والعمارة المسيحية.',
    modernEn: 'Emergence, integration, the space between.',
    modernAr: 'الظهور، التكامل، الفضاء بين.',
    color: '#c084fc', category: 'geometry' },
  { id: 'flower-of-life', nameEn: 'Flower of Life', nameAr: 'زهرة الحياة', symbol: '❀',
    originEn: 'Sacred Geometry', originAr: 'الهندسة المقدسة',
    meaningEn: 'Creation, unity, blueprint of existence', meaningAr: 'الخلق، الوحدة، مخطط الوجود',
    historicalEn: 'A geometric pattern of overlapping circles, found across cultures. Modern interpretations claim cosmic properties — these are not historically established.',
    historicalAr: 'نمط هندسي من دوائر متداخلة، موجود عبر الثقافات. التفسيرات الحديثة تدّعي خصائص كونية — غير مثبتة تاريخياً.',
    modernEn: 'Interconnectedness, harmony, divine order.',
    modernAr: 'الترابط، الانسجام، النظام الإلهي.',
    color: '#a78bfa', category: 'geometry' },
  { id: 'metatron', nameEn: "Metatron's Cube", nameAr: 'مكعب ميتاترون', symbol: '⬡',
    originEn: 'Modern sacred geometry', originAr: 'الهندسة المقدسة الحديثة',
    meaningEn: 'Cosmic structure, Platonic solids, balance', meaningAr: 'البنية الكونية، المجسمات الأفلاطونية، التوازن',
    historicalEn: 'A modern sacred-geometry system built from interconnected forms.',
    historicalAr: 'نظام حديث للهندسة المقدسة مبني من أشكال مترابطة.',
    modernEn: 'Cosmic order, integration, manifestation.',
    modernAr: 'النظام الكوني، التكامل، التجلي.',
    color: '#22d3ee', category: 'geometry' },

  /* ---------- EGYPTIAN ---------- */
  { id: 'ankh', nameEn: 'Ankh', nameAr: 'عنخ', symbol: '☥',
    originEn: 'Ancient Egypt', originAr: 'مصر القديمة',
    meaningEn: 'Life', meaningAr: 'الحياة',
    historicalEn: 'An ancient Egyptian hieroglyph associated with life.',
    historicalAr: 'هيروغليفية مصرية قديمة مرتبطة بالحياة.',
    modernEn: 'Life, vitality, eternal existence.',
    modernAr: 'الحياة، الحيوية، الوجود الأبدي.',
    color: '#fbbf24', category: 'egypt' },
  { id: 'eye-of-horus', nameEn: 'Eye of Horus (Wedjat)', nameAr: 'عين حورس', symbol: '𓂀',
    originEn: 'Ancient Egypt', originAr: 'مصر القديمة',
    meaningEn: 'Healing, protection, regeneration', meaningAr: 'الشفاء، الحماية، التجدد',
    historicalEn: 'Associated with the restored eye of Horus — a symbol of healing, protection, and regeneration.',
    historicalAr: 'يرتبط بعين حورس المُستعادة — رمز للشفاء والحماية والتجدد.',
    modernEn: 'Protection, wholeness, spiritual vision.',
    modernAr: 'الحماية، الكلية، الرؤية الروحية.',
    color: '#22d3ee', category: 'egypt' },
  { id: 'djed', nameEn: 'Djed Pillar', nameAr: 'عمود جد', symbol: '𓊽',
    originEn: 'Ancient Egypt', originAr: 'مصر القديمة',
    meaningEn: 'Stability, endurance, Osiris', meaningAr: 'الاستقرار، التحمل، أوزوريس',
    historicalEn: 'Associated with stability, endurance, and the god Osiris.',
    historicalAr: 'يرتبط بالاستقرار والتحمل والإله أوزوريس.',
    modernEn: 'Foundation, resilience, resurrection.',
    modernAr: 'الأساس، المرونة، البعث.',
    color: '#a78bfa', category: 'egypt' },
  { id: 'scarab', nameEn: 'Scarab', nameAr: 'الجعران', symbol: '𓆣',
    originEn: 'Ancient Egypt', originAr: 'مصر القديمة',
    meaningEn: 'Transformation, regeneration, rebirth', meaningAr: 'التحول، التجدد، البعث',
    historicalEn: 'Symbol of the sun-god Khepri, associated with rebirth and the daily cycle of the sun.',
    historicalAr: 'رمز لإله الشمس خبري، يرتبط بالبعث والدورة اليومية للشمس.',
    modernEn: 'Transformation, renewal, personal rebirth.',
    modernAr: 'التحول، التجدد، البعث الشخصي.',
    color: '#84cc16', category: 'egypt' },
  { id: 'shen', nameEn: 'Shen Ring', nameAr: 'حلقة شن', symbol: '◯',
    originEn: 'Ancient Egypt', originAr: 'مصر القديمة',
    meaningEn: 'Eternity, protection, cyclical return', meaningAr: 'الأبدية، الحماية، العودة الدورية',
    historicalEn: 'A circle of rope symbolizing eternity and protection.',
    historicalAr: 'دائرة من الحبل ترمز للأبدية والحماية.',
    modernEn: 'Protection, wholeness, infinity.',
    modernAr: 'الحماية، الكلية، اللانهاية.',
    color: '#fbbf24', category: 'egypt' },
  { id: 'was', nameEn: 'Was Scepter', nameAr: 'صولجان واس', symbol: '｜',
    originEn: 'Ancient Egypt', originAr: 'مصر القديمة',
    meaningEn: 'Power, dominion, authority', meaningAr: 'القوة، السيادة، السلطة',
    historicalEn: 'A symbol of power and dominion carried by deities and pharaohs.',
    historicalAr: 'رمز للقوة والسيادة يحمله الآلهة والفراعنة.',
    modernEn: 'Personal power, authority, sovereignty.',
    modernAr: 'القوة الشخصية، السلطة، السيادة.',
    color: '#f59e0b', category: 'egypt' },

  /* ---------- COSMIC & PLANETARY ---------- */
  { id: 'sun', nameEn: 'Sun', nameAr: 'الشمس', symbol: '☉',
    originEn: 'Ancient Mediterranean → Western alchemy & astrology', originAr: 'البحر المتوسط القديم → الخيمياء والتنجيم الغربيين',
    meaningEn: 'Identity, vitality, illumination, consciousness', meaningAr: 'الهوية، الحيوية، الإشراق، الوعي',
    historicalEn: 'In alchemy associated with gold. In astrology, the sun represents the core self.',
    historicalAr: 'في الخيمياء يرتبط بالذهب. في التنجيم، تمثل الشمس الذات الأساسية.',
    modernEn: 'Vitality, identity, life force.',
    modernAr: 'الحيوية، الهوية، قوة الحياة.',
    color: '#fbbf24', category: 'cosmic' },
  { id: 'moon', nameEn: 'Moon', nameAr: 'القمر', symbol: '☽',
    originEn: 'Ancient Mediterranean → Western alchemy & astrology', originAr: 'البحر المتوسط القديم → الخيمياء والتنجيم الغربيين',
    meaningEn: 'Cycles, reflection, emotion, subconscious', meaningAr: 'الدورات، الانعكاس، العاطفة، اللاوعي',
    historicalEn: 'In alchemy associated with silver. In astrology, the moon represents the inner emotional world.',
    historicalAr: 'في الخيمياء يرتبط بالفضة. في التنجيم، يمثل القمر العالم العاطفي الداخلي.',
    modernEn: 'Intuition, cycles, inner life.',
    modernAr: 'الحدس، الدورات، الحياة الداخلية.',
    color: '#e7e9ea', category: 'cosmic' },
  { id: 'mercury-planet', nameEn: 'Mercury', nameAr: 'عطارد', symbol: '☿',
    originEn: 'Western astrology & alchemy', originAr: 'التنجيم والخيمياء الغربيين',
    meaningEn: 'Communication, movement, exchange', meaningAr: 'التواصل، الحركة، التبادل',
    historicalEn: 'In alchemy associated with quicksilver. In astrology, the planet of communication.',
    historicalAr: 'في الخيمياء يرتبط بالزئبق. في التنجيم، كوكب التواصل.',
    modernEn: 'Mind, communication, adaptability.',
    modernAr: 'العقل، التواصل، التكيف.',
    color: '#a78bfa', category: 'cosmic' },
  { id: 'venus', nameEn: 'Venus', nameAr: 'الزهرة', symbol: '♀',
    originEn: 'Western astrology & alchemy', originAr: 'التنجيم والخيمياء الغربيين',
    meaningEn: 'Love, beauty, attraction, values', meaningAr: 'الحب، الجمال، الجذب، القيم',
    historicalEn: 'In alchemy associated with copper.',
    historicalAr: 'في الخيمياء يرتبط بالنحاس.',
    modernEn: 'Love, beauty, attraction.',
    modernAr: 'الحب، الجمال، الجذب.',
    color: '#f0abfc', category: 'cosmic' },
  { id: 'mars', nameEn: 'Mars', nameAr: 'المريخ', symbol: '♂',
    originEn: 'Western astrology & alchemy', originAr: 'التنجيم والخيمياء الغربيين',
    meaningEn: 'Conflict, force, action, courage', meaningAr: 'الصراع، القوة، الفعل، الشجاعة',
    historicalEn: 'In alchemy associated with iron.',
    historicalAr: 'في الخيمياء يرتبط بالحديد.',
    modernEn: 'Drive, courage, willpower.',
    modernAr: 'الدافع، الشجاعة، قوة الإرادة.',
    color: '#ef4444', category: 'cosmic' },
  { id: 'jupiter', nameEn: 'Jupiter', nameAr: 'المشتري', symbol: '♃',
    originEn: 'Western astrology & alchemy', originAr: 'التنجيم والخيمياء الغربيين',
    meaningEn: 'Expansion, authority, abundance, wisdom', meaningAr: 'التوسع، السلطة، الوفرة، الحكمة',
    historicalEn: 'In alchemy associated with tin.',
    historicalAr: 'في الخيمياء يرتبط بالقصدير.',
    modernEn: 'Growth, opportunity, expansion.',
    modernAr: 'النمو، الفرصة، التوسع.',
    color: '#22d3ee', category: 'cosmic' },
  { id: 'saturn', nameEn: 'Saturn', nameAr: 'زحل', symbol: '♄',
    originEn: 'Western astrology & alchemy', originAr: 'التنجيم والخيمياء الغربيين',
    meaningEn: 'Time, limitation, structure, discipline', meaningAr: 'الزمن، القيود، البنية، الانضباط',
    historicalEn: 'In alchemy associated with lead.',
    historicalAr: 'في الخيمياء يرتبط بالرصاص.',
    modernEn: 'Time, responsibility, discipline.',
    modernAr: 'الزمن، المسؤولية، الانضباط.',
    color: '#64748b', category: 'cosmic' },
  { id: 'north-node', nameEn: 'North Node (Rahu)', nameAr: 'العقدة الشمالية', symbol: '☊',
    originEn: 'Vedic & Western astrology', originAr: 'التنجيم الفيدي والغربي',
    meaningEn: 'Future growth, karmic direction', meaningAr: 'النمو المستقبلي، الاتجاه الكارمي',
    historicalEn: 'Represents the soul’s future lessons and karmic purpose.',
    historicalAr: 'يمثل دروس الروح المستقبلية والهدف الكارمي.',
    modernEn: 'Growth, destiny, evolution.',
    modernAr: 'النمو، القدر، التطور.',
    color: '#a78bfa', category: 'cosmic' },
  { id: 'south-node', nameEn: 'South Node (Ketu)', nameAr: 'العقدة الجنوبية', symbol: '☋',
    originEn: 'Vedic & Western astrology', originAr: 'التنجيم الفيدي والغربي',
    meaningEn: 'Past, comfort zone, innate talents', meaningAr: 'الماضي، منطقة الراحة، المواهب الفطرية',
    historicalEn: 'Represents past patterns and talents carried into this life.',
    historicalAr: 'يمثل الأنماط والمواهب السابقة المنقولة إلى هذه الحياة.',
    modernEn: 'Release, integration, karmic balance.',
    modernAr: 'التحرر، التكامل، التوازن الكارمي.',
    color: '#64748b', category: 'cosmic' },
  { id: 'infinity', nameEn: 'Infinity', nameAr: 'اللانهاية', symbol: '∞',
    originEn: 'Mathematics & mystical symbolism', originAr: 'الرياضيات والرمزية الصوفية',
    meaningEn: 'Eternity, endlessness, divine limitlessness', meaningAr: 'الأبدية، اللامحدودية، اللامحدود الإلهي',
    historicalEn: 'The infinity symbol was first used mathematically in the 17th century, but the concept of endlessness is ancient.',
    historicalAr: 'استُخدم رمز اللانهاية رياضياً لأول مرة في القرن السابع عشر، لكن مفهوم اللامحدودية قديم.',
    modernEn: 'Infinity, eternity, endless cycles.',
    modernAr: 'اللانهاية، الأبدية، الدورات اللانهائية.',
    color: '#c084fc', category: 'cosmic' },

  /* ---------- NATURE & ANIMALS ---------- */
  { id: 'serpent', nameEn: 'Serpent', nameAr: 'الثعبان', symbol: '⌇',
    originEn: 'Global — ancient cultures worldwide', originAr: 'عالمي — ثقافات قديمة حول العالم',
    meaningEn: 'Transformation, renewal, wisdom, healing, danger', meaningAr: 'التحول، التجدد، الحكمة، الشفاء، الخطر',
    historicalEn: 'The serpent appears across many cultures — symbolizing life, death, renewal, or wisdom depending on context.',
    historicalAr: 'يظهر الثعبان في ثقافات عديدة — يرمز للحياة أو الموت أو التجدد أو الحكمة حسب السياق.',
    modernEn: 'Transformation, healing, kundalini.',
    modernAr: 'التحول، الشفاء، الكونداليني.',
    color: '#84cc16', category: 'nature' },
  { id: 'eagle', nameEn: 'Eagle', nameAr: 'النسر', symbol: 'ⵣ',
    originEn: 'Many traditions worldwide', originAr: 'تقاليد عديدة حول العالم',
    meaningEn: 'Sky, power, vision, sovereignty', meaningAr: 'السماء، القوة، الرؤية، السيادة',
    historicalEn: 'Associated with the sky, sovereignty, and vision in many traditions — including Rome, Egypt, and indigenous cultures.',
    historicalAr: 'يرتبط بالسماء والسيادة والرؤية في تقاليد عديدة — بما في ذلك روما ومصر والثقافات الأصلية.',
    modernEn: 'Higher perspective, courage, leadership.',
    modernAr: 'المنظور الأعلى، الشجاعة، القيادة.',
    color: '#fbbf24', category: 'nature' },
  { id: 'raven', nameEn: 'Raven', nameAr: 'الغراب', symbol: 'ᛉ',
    originEn: 'Norse, Celtic, and many other traditions', originAr: 'النوردية والكلتية وتقاليد أخرى',
    meaningEn: 'Prophecy, memory, death, divine knowledge', meaningAr: 'النبوة، الذاكرة، الموت، المعرفة الإلهية',
    historicalEn: 'Associated with Odin in Norse tradition. In Celtic tradition, linked to the Morrigan.',
    historicalAr: 'يرتبط بأودين في التقليد النوردي. وفي التقليد الكلتي يرتبط بالموريغان.',
    modernEn: 'Transformation, magic, spiritual insight.',
    modernAr: 'التحول، السحر، البصيرة الروحية.',
    color: '#a78bfa', category: 'nature' },
  { id: 'owl', nameEn: 'Owl', nameAr: 'البومة', symbol: '❍',
    originEn: 'Greek, Hindu, and other traditions', originAr: 'اليونانية والهندوسية وتقاليد أخرى',
    meaningEn: 'Wisdom, night, mystery, perception', meaningAr: 'الحكمة، الليل، الغموض، الإدراك',
    historicalEn: 'Associated with Athena in Greek tradition.',
    historicalAr: 'يرتبط بأثينا في التقليد اليوناني.',
    modernEn: 'Wisdom, intuition, inner vision.',
    modernAr: 'الحكمة، الحدس، الرؤية الداخلية.',
    color: '#60a5fa', category: 'nature' },
  { id: 'wolf', nameEn: 'Wolf', nameAr: 'الذئب', symbol: '⋀',
    originEn: 'Global — many traditions', originAr: 'عالمي — تقاليد عديدة',
    meaningEn: 'Wildness, loyalty, instinct, social bonds', meaningAr: 'التوحش، الولاء، الغريزة، الروابط الاجتماعية',
    historicalEn: 'Appears in Norse, Native American, and many other traditions.',
    historicalAr: 'يظهر في التقاليد النوردية والأمريكية الأصلية وغيرها.',
    modernEn: 'Instinct, loyalty, freedom.',
    modernAr: 'الغريزة، الولاء، الحرية.',
    color: '#a3a380', category: 'nature' },
  { id: 'butterfly', nameEn: 'Butterfly', nameAr: 'الفراشة', symbol: '⋈',
    originEn: 'Global — many traditions', originAr: 'عالمي — تقاليد عديدة',
    meaningEn: 'Transformation, rebirth, beauty from struggle', meaningAr: 'التحول، البعث، الجمال من المعاناة',
    historicalEn: 'Associated with the soul in Greek, Aztec, and many other traditions.',
    historicalAr: 'يرتبط بالروح في التقليد اليوناني والأزتكي وغيرها.',
    modernEn: 'Metamorphosis, growth, lightness.',
    modernAr: 'التحول، النمو، الخفة.',
    color: '#c084fc', category: 'nature' },
  { id: 'lion', nameEn: 'Lion', nameAr: 'الأسد', symbol: '♌',
    originEn: 'Many traditions worldwide', originAr: 'تقاليد عديدة حول العالم',
    meaningEn: 'Royalty, courage, solar imagery, power', meaningAr: 'الملكية، الشجاعة، الرمزية الشمسية، القوة',
    historicalEn: 'A symbol of royalty and solar power in many traditions.',
    historicalAr: 'رمز للملكية والقوة الشمسية في تقاليد عديدة.',
    modernEn: 'Courage, leadership, dignity.',
    modernAr: 'الشجاعة، القيادة، الكرامة.',
    color: '#f59e0b', category: 'nature' },
  { id: 'phoenix', nameEn: 'Phoenix', nameAr: 'العنقاء', symbol: '⋆',
    originEn: 'Greek, Egyptian, and later alchemical traditions', originAr: 'اليونانية والمصرية والتقاليد الخيميائية اللاحقة',
    meaningEn: 'Death and rebirth, renewal, immortality', meaningAr: 'الموت والبعث، التجدد، الخلود',
    historicalEn: 'A mythical bird that dies in flames and is reborn from its ashes. Became important in alchemical symbolism.',
    historicalAr: 'طائر أسطوري يموت في النيران ويُبعث من رماده. أصبح مهماً في الرمزية الخيميائية.',
    modernEn: 'Resurrection, renewal, personal transformation.',
    modernAr: 'البعث، التجدد، التحول الشخصي.',
    color: '#f97316', category: 'nature' },
  { id: 'dragon', nameEn: 'Dragon', nameAr: 'التنين', symbol: '𝌆',
    originEn: 'Global — many traditions', originAr: 'عالمي — تقاليد عديدة',
    meaningEn: 'Power, chaos, protection, wisdom', meaningAr: 'القوة، الفوضى، الحماية، الحكمة',
    historicalEn: 'Dragons appear across many cultures with vastly different meanings — from wise guardians to destructive beasts.',
    historicalAr: 'تظهر التنانين في ثقافات عديدة بمعانٍ مختلفة تماماً — من الحراس الحكماء إلى الوحوش المدمرة.',
    modernEn: 'Inner power, transformation, sovereignty.',
    modernAr: 'القوة الداخلية، التحول، السيادة.',
    color: '#ef4444', category: 'nature' },
  { id: 'lotus', nameEn: 'Lotus', nameAr: 'اللوتس', symbol: '⚘',
    originEn: 'Hindu & Buddhist traditions', originAr: 'التقاليد الهندوسية والبوذية',
    meaningEn: 'Purity, spiritual development, enlightenment', meaningAr: 'النقاء، التطور الروحي، التنوير',
    historicalEn: 'The lotus is especially important in Buddhist and Hindu imagery — symbolizing purity rising from mud.',
    historicalAr: 'اللوتس مهم بشكل خاص في التصوير البوذي والهندوسي — يرمز للنقاء المنبعث من الطين.',
    modernEn: 'Spiritual awakening, purity, inner beauty.',
    modernAr: 'الصحوة الروحية، النقاء، الجمال الداخلي.',
    color: '#f0abfc', category: 'nature' },

  /* ---------- TRANSFORMATION ---------- */
  { id: 'ouroboros-2', nameEn: 'Ouroboros (Cycle)', nameAr: 'الأوروبوروس (الدورة)', symbol: 'ⵎ',
    originEn: 'Ancient Egypt → alchemical traditions', originAr: 'مصر القديمة → التقاليد الخيميائية',
    meaningEn: 'Eternal return, cyclical nature, self-renewal', meaningAr: 'العودة الأبدية، الطبيعة الدورية، التجدد الذاتي',
    historicalEn: 'A serpent eating its tail — a symbol of cyclic time and eternal return.',
    historicalAr: 'ثعبان يأكل ذيله — رمز الزمن الدوري والعودة الأبدية.',
    modernEn: 'Self-renewal, integration, transformation.',
    modernAr: 'التجدد الذاتي، التكامل، التحول.',
    color: '#a78bfa', category: 'transform' },
  { id: 'spiral', nameEn: 'Spiral', nameAr: 'الحلزون', symbol: '↻',
    originEn: 'Prehistoric European art → many traditions', originAr: 'الفن الأوروبي ما قبل التاريخ → تقاليد عديدة',
    meaningEn: 'Cycles, growth, evolution, movement', meaningAr: 'الدورات، النمو، التطور، الحركة',
    historicalEn: 'A universal motif found in prehistoric art worldwide.',
    historicalAr: 'زخرفة عالمية موجودة في الفن ما قبل التاريخ في جميع أنحاء العالم.',
    modernEn: 'Development through cycles, inner journey.',
    modernAr: 'التطور عبر الدورات، الرحلة الداخلية.',
    color: '#22d3ee', category: 'transform' },
  { id: 'fire-transform', nameEn: 'Fire (Purification)', nameAr: 'النار (التطهير)', symbol: '△',
    originEn: 'Global — many traditions', originAr: 'عالمي — تقاليد عديدة',
    meaningEn: 'Destruction, purification, transformation', meaningAr: 'الدمار، التطهير، التحول',
    historicalEn: 'Fire has been a symbol of purification and transformation across many traditions.',
    historicalAr: 'كانت النار رمزاً للتطهير والتحول في تقاليد عديدة.',
    modernEn: 'Inner fire, transformation, renewal.',
    modernAr: 'النار الداخلية، التحول، التجدد.',
    color: '#f97316', category: 'transform' },
  { id: 'ashes', nameEn: 'Ashes', nameAr: 'الرماد', symbol: '⋮',
    originEn: 'Global — many traditions', originAr: 'عالمي — تقاليد عديدة',
    meaningEn: 'What remains after destruction, renewal, mourning', meaningAr: 'ما يبقى بعد الدمار، التجدد، الحداد',
    historicalEn: 'Ashes symbolize both mourning and the fertile ground from which new life emerges.',
    historicalAr: 'يرمز الرماد للحداد والأرض الخصبة التي تنبعث منها حياة جديدة.',
    modernEn: 'Endings that become beginnings.',
    modernAr: 'نهايات تصبح بدايات.',
    color: '#94a3b8', category: 'transform' },
  { id: 'eclipse', nameEn: 'Eclipse', nameAr: 'الكسوف', symbol: '◐',
    originEn: 'Astronomical / symbolic', originAr: 'فلكي / رمزي',
    meaningEn: 'Concealment, revelation, transition, threshold', meaningAr: 'الإخفاء، الكشف، الانتقال، العتبة',
    historicalEn: 'Astronomically, the alignment of celestial bodies. Symbolically, concealment and revelation.',
    historicalAr: 'فلكياً، اصطفاف الأجرام السماوية. رمزياً، الإخفاء والكشف.',
    modernEn: 'Transformation, threshold, sacred pause.',
    modernAr: 'التحول، العتبة، الوقفة المقدسة.',
    color: '#c084fc', category: 'transform' },
  { id: 'labyrinth', nameEn: 'Labyrinth', nameAr: 'المتاهة', symbol: '⌘',
    originEn: 'Greek, medieval European traditions', originAr: 'اليونانية والتقاليد الأوروبية في العصور الوسطى',
    meaningEn: 'Inner journey, confrontation, return', meaningAr: 'الرحلة الداخلية، المواجهة، العودة',
    historicalEn: 'Unlike a maze, a labyrinth traditionally has a single winding path toward the center.',
    historicalAr: 'على عكس المتاهة، للمتاهة التقليدية مسار واحد متعرج نحو المركز.',
    modernEn: 'Self-discovery, inner journey.',
    modernAr: 'اكتشاف الذات، الرحلة الداخلية.',
    color: '#a3a380', category: 'transform' },

  /* ---------- PROTECTION ---------- */
  { id: 'pentagram', nameEn: 'Pentagram', nameAr: 'النجمة الخماسية', symbol: '⛤',
    originEn: 'Pythagorean → Medieval → Modern occult', originAr: 'فيثاغورس → العصور الوسطى → الباطنية الحديثة',
    meaningEn: 'Protection, five elements, geometry', meaningAr: 'الحماية، العناصر الخمسة، الهندسة',
    historicalEn: 'Historically it has had many meanings — geometry, Christianity, protection, and later occult symbolism. The inverted form is a modern association, not an ancient one.',
    historicalAr: 'تاريخياً حمل معاني عديدة — الهندسة والمسيحية والحماية ثم الرمزية الباطنية. الشكل المقلوب ارتباط حديث، وليس قديماً.',
    modernEn: 'Protection, elements, spiritual balance.',
    modernAr: 'الحماية، العناصر، التوازن الروحي.',
    color: '#a78bfa', category: 'protection' },
  { id: 'hamsa', nameEn: 'Hamsa', nameAr: 'الخمسة', symbol: '✋',
    originEn: 'Middle Eastern & North African traditions', originAr: 'تقاليد الشرق الأوسط وشمال إفريقيا',
    meaningEn: 'Protection, blessing, warding off the evil eye', meaningAr: 'الحماية، البركة، درء الحسد',
    historicalEn: 'A protective hand symbol used across Jewish, Christian, and Muslim communities in the Middle East.',
    historicalAr: 'رمز يد واقية مستخدم في المجتمعات اليهودية والمسيحية والإسلامية في الشرق الأوسط.',
    modernEn: 'Protection, blessing, divine guidance.',
    modernAr: 'الحماية، البركة، الإرشاد الإلهي.',
    color: '#fbbf24', category: 'protection' },
  { id: 'nazar', nameEn: 'Nazar (Evil Eye)', nameAr: 'النظرة (العين)', symbol: '◉',
    originEn: 'Turkish & Middle Eastern traditions', originAr: 'التقاليد التركية والشرق أوسطية',
    meaningEn: 'Protection against the evil eye', meaningAr: 'الحماية من الحسد',
    historicalEn: 'A protective eye motif used across Turkey, Greece, and the Middle East.',
    historicalAr: 'رمز عين واقية يُستخدم في تركيا واليونان والشرق الأوسط.',
    modernEn: 'Protection, warding, awareness.',
    modernAr: 'الحماية، الحماية، الوعي.',
    color: '#38bdf8', category: 'protection' },
  { id: 'mjolnir', nameEn: 'Mjölnir', nameAr: 'مطرقة ثور', symbol: '⨁',
    originEn: 'Norse tradition', originAr: 'التقليد النوردي',
    meaningEn: 'Thor’s hammer, protection, consecration', meaningAr: 'مطرقة ثور، الحماية، التقديس',
    historicalEn: 'Thor’s hammer, worn as a protective amulet in the Viking Age.',
    historicalAr: 'مطرقة ثور، تُلبس كتميمة واقية في عصر الفايكنج.',
    modernEn: 'Protection, strength, ancestral connection.',
    modernAr: 'الحماية، القوة، الاتصال بالأجداد.',
    color: '#64748b', category: 'protection' },
]

/* ============================================================
   PAGE
   ============================================================ */
export default function SymbolsPage() {
  const router = useRouter()
  const { language, toggleLanguage } = useLanguage()
  const [activeCategory, setActiveCategory] = useState('alchemy')
  const [selectedSymbol, setSelectedSymbol] = useState<Symbol | null>(null)
  const [stars, setStars] = useState<any[]>([])

  useEffect(() => {
    const s = []
    for (let i = 0; i < 120; i++) {
      s.push({
        id: i, x: Math.random() * 100, y: Math.random() * 100,
        size: Math.random() * 1.2 + 0.3,
        delay: Math.random() * 4,
        duration: Math.random() * 3 + 2,
      })
    }
    setStars(s)
  }, [])

  const currentSymbols = activeCategory === 'all'
    ? symbols
    : symbols.filter((s) => s.category === activeCategory)

  const currentCategory = categories.find((c) => c.id === activeCategory)!
  const accent = currentCategory?.color ?? '#a78bfa'

  return (
    <div
      className="min-h-screen overflow-hidden relative selection:bg-purple-900/40 selection:text-purple-100"
      style={{
        background: 'radial-gradient(ellipse at 50% -10%, #150b2e 0%, #0a0518 35%, #040211 70%, #010105 100%)',
        fontFamily: "'Cormorant Garamond', 'Georgia', serif",
      }}
    >
      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {stars.map((s) => (
          <div key={s.id} className="absolute rounded-full"
            style={{
              left: s.x + '%', top: s.y + '%',
              width: s.size + 'px', height: s.size + 'px',
              background: 'rgba(220, 200, 255, 0.85)',
              boxShadow: '0 0 4px rgba(200, 170, 255, 0.7)',
              animation: `twinkle ${s.duration}s ease-in-out infinite`,
              animationDelay: s.delay + 's',
            }} />
        ))}
      </div>

      {/* Purple ambient glows */}
      <div className="absolute top-0 left-1/4 w-[60vw] h-[60vh] pointer-events-none opacity-40"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(168,85,247,0.15) 0%, transparent 65%)' }} />
      <div className="absolute bottom-0 right-1/4 w-[50vw] h-[50vh] pointer-events-none opacity-30"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(251,191,36,0.12) 0%, transparent 65%)' }} />

      {/* NAV */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-6 flex justify-between items-center">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push('/space')}
          className="text-purple-300/80 hover:text-purple-100 transition-all duration-300 flex items-center gap-2 text-xs tracking-[0.25em] uppercase bg-purple-950/30 border border-purple-800/40 backdrop-blur-md px-4 py-2 rounded-full"
        >
          ← {language === 'en' ? 'Return to Space' : 'العودة إلى الفضاء'}
        </motion.button>
        <button
          onClick={toggleLanguage}
          className="px-4 py-2 bg-purple-950/30 rounded-full text-purple-200 text-xs tracking-widest uppercase hover:bg-purple-900/40 transition-all duration-300 border border-purple-800/40 backdrop-blur-md"
        >
          {language === 'en' ? 'العربية' : 'English'}
        </button>
      </div>

      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center pt-16 pb-6 relative z-10"
      >
        <div className="flex justify-center gap-4 mb-6 opacity-90 text-2xl"
          style={{ color: '#c084fc', textShadow: '0 0 20px rgba(168,85,247,0.6)' }}>
          <span style={{ fontFamily: 'serif' }}>ᛟ</span>
          <span style={{ fontFamily: 'serif' }}>☿</span>
          <span style={{ fontFamily: 'serif' }}>✡</span>
          <span style={{ fontFamily: 'serif' }}>☥</span>
          <span style={{ fontFamily: 'serif' }}>☉</span>
        </div>
        <h1
          className="text-4xl md:text-6xl font-light tracking-[0.25em] italic"
          style={{
            color: '#e9d5ff',
            textShadow: '0 0 30px rgba(168,85,247,0.5), 0 0 80px rgba(88,28,135,0.5)',
          }}
        >
          {language === 'en' ? 'The Symbol Archive' : 'أرشيف الرموز'}
        </h1>
        <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-purple-500/60 to-transparent mx-auto mt-6" />
        <p className="text-purple-300/60 text-xs tracking-[0.4em] uppercase mt-5">
          {language === 'en' ? 'Historical · Cultural · Esoteric · Modern' : 'تاريخي · ثقافي · باطني · حديث'}
        </p>
      </motion.div>

      {/* Intro */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 max-w-3xl mx-auto px-6 mb-10"
      >
        <div
          className="rounded-3xl p-6 border relative overflow-hidden"
          style={{
            background: 'linear-gradient(160deg, rgba(20,10,40,0.7), rgba(4,2,17,0.9))',
            borderColor: 'rgba(168,85,247,0.3)',
          }}
        >
          <span className="absolute top-3 left-3 w-3 h-3 border-l border-t" style={{ borderColor: 'rgba(168,85,247,0.5)' }} />
          <span className="absolute top-3 right-3 w-3 h-3 border-r border-t" style={{ borderColor: 'rgba(168,85,247,0.5)' }} />
          <span className="absolute bottom-3 left-3 w-3 h-3 border-l border-b" style={{ borderColor: 'rgba(168,85,247,0.5)' }} />
          <span className="absolute bottom-3 right-3 w-3 h-3 border-r border-b" style={{ borderColor: 'rgba(168,85,247,0.5)' }} />
          <p className="text-purple-200/80 text-sm italic leading-relaxed text-center">
            {language === 'en'
              ? 'Symbols do not possess one universal meaning. Their meanings change across cultures, historical periods, and traditions. This archive distinguishes documented historical meanings from later esoteric and modern interpretations.'
              : 'الرموز لا تمتلك معنى واحداً عالمياً. تتغير معانيها عبر الثقافات والفترات التاريخية والتقاليد. يميّز هذا الأرشيف بين المعاني التاريخية الموثقة والتفسيرات الباطنية والحديثة اللاحقة.'}
          </p>
        </div>
      </motion.div>

      {/* CATEGORIES */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-4">
        <div className="flex flex-wrap justify-center gap-2.5 mb-10 max-w-4xl mx-auto">
          {categories.map((cat) => {
            const Icon = cat.Icon
            const active = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="px-3 py-1.5 rounded-full text-[11px] tracking-wide transition-all duration-300 flex items-center gap-2 backdrop-blur-sm border"
                style={{
                  background: active ? `${cat.color}22` : 'rgba(20,10,40,0.4)',
                  color: active ? cat.color : '#7c6f80',
                  borderColor: active ? `${cat.color}88` : 'rgba(60,40,80,0.5)',
                  boxShadow: active ? `0 0 12px ${cat.color}33` : 'none',
                }}
              >
                <Icon color={active ? cat.color : '#7c6f80'} size={14} />
                <span>{language === 'en' ? cat.nameEn : cat.nameAr}</span>
              </button>
            )
          })}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 pb-20">
          <AnimatePresence mode="wait">
            {currentSymbols.map((symbol, idx) => (
              <motion.button
                key={symbol.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ delay: idx * 0.015, duration: 0.3 }}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedSymbol(symbol)}
                className="text-center rounded-2xl p-6 border relative overflow-hidden group transition-all duration-300"
                style={{
                  background: `linear-gradient(160deg, ${symbol.color}12, rgba(4,2,17,0.9))`,
                  borderColor: `${symbol.color}33`,
                }}
              >
                <div
                  className="text-5xl mb-4 select-none transition-all duration-500 group-hover:scale-110"
                  style={{
                    color: symbol.color,
                    textShadow: `0 0 25px ${symbol.color}88`,
                    fontFamily: 'serif',
                    lineHeight: 1.2,
                  }}
                >
                  {symbol.symbol}
                </div>
                <h3 className="text-slate-200 text-sm tracking-wide mb-1">
                  {language === 'en' ? symbol.nameEn : symbol.nameAr}
                </h3>
                <p className="text-slate-500 text-[10px] tracking-widest uppercase">
                  {language === 'en' ? symbol.originEn.split('→')[0].trim() : symbol.originAr.split('→')[0].trim()}
                </p>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedSymbol && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={() => setSelectedSymbol(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg max-h-[88vh] overflow-y-auto rounded-2xl border p-7"
              style={{
                background: 'linear-gradient(180deg, #0a0518, #040211)',
                borderColor: `${selectedSymbol.color}55`,
                boxShadow: `0 0 50px ${selectedSymbol.color}33`,
              }}
            >
              <span className="absolute top-2 left-2 w-3 h-3 border-l border-t" style={{ borderColor: `${selectedSymbol.color}66` }} />
              <span className="absolute top-2 right-2 w-3 h-3 border-r border-t" style={{ borderColor: `${selectedSymbol.color}66` }} />
              <span className="absolute bottom-2 left-2 w-3 h-3 border-l border-b" style={{ borderColor: `${selectedSymbol.color}66` }} />
              <span className="absolute bottom-2 right-2 w-3 h-3 border-r border-b" style={{ borderColor: `${selectedSymbol.color}66` }} />

              <button
                onClick={() => setSelectedSymbol(null)}
                className="absolute top-4 right-4 opacity-60 hover:opacity-100 transition-opacity"
                aria-label="close"
              >
                <CloseIcon color={selectedSymbol.color} />
              </button>

              <div className="text-center mb-6">
                <div
                  className="text-6xl mb-3 select-none"
                  style={{
                    color: selectedSymbol.color,
                    textShadow: `0 0 30px ${selectedSymbol.color}88`,
                    fontFamily: 'serif',
                    lineHeight: 1.2,
                  }}
                >
                  {selectedSymbol.symbol}
                </div>
                <h2 className="text-2xl italic font-light tracking-wide text-slate-100">
                  {language === 'en' ? selectedSymbol.nameEn : selectedSymbol.nameAr}
                </h2>
                <div className="w-16 h-[1px] mx-auto my-3"
                  style={{ background: `linear-gradient(to right, transparent, ${selectedSymbol.color}88, transparent)` }} />
              </div>

              <div className="space-y-3">
                <div className="rounded-xl p-4 border" style={{ background: 'rgba(0,0,0,0.4)', borderColor: `${selectedSymbol.color}22` }}>
                  <p className="text-[10px] tracking-[0.3em] uppercase mb-1.5" style={{ color: `${selectedSymbol.color}cc` }}>
                    {language === 'en' ? 'Origin' : 'الأصل'}
                  </p>
                  <p className="text-slate-300 text-sm italic leading-relaxed">
                    {language === 'en' ? selectedSymbol.originEn : selectedSymbol.originAr}
                  </p>
                </div>
                <div className="rounded-xl p-4 border" style={{ background: 'rgba(0,0,0,0.4)', borderColor: `${selectedSymbol.color}22` }}>
                  <p className="text-[10px] tracking-[0.3em] uppercase mb-1.5" style={{ color: `${selectedSymbol.color}cc` }}>
                    {language === 'en' ? 'Core Meaning' : 'المعنى الجوهري'}
                  </p>
                  <p className="text-slate-200 text-sm italic leading-relaxed">
                    {language === 'en' ? selectedSymbol.meaningEn : selectedSymbol.meaningAr}
                  </p>
                </div>
                <div className="rounded-xl p-4 border" style={{ background: 'rgba(0,0,0,0.4)', borderColor: `${selectedSymbol.color}22` }}>
                  <p className="text-[10px] tracking-[0.3em] uppercase mb-1.5" style={{ color: `${selectedSymbol.color}cc` }}>
                    {language === 'en' ? 'Historical Context' : 'السياق التاريخي'}
                  </p>
                  <p className="text-slate-400 text-xs italic leading-relaxed">
                    {language === 'en' ? selectedSymbol.historicalEn : selectedSymbol.historicalAr}
                  </p>
                </div>
                <div className="rounded-xl p-4 border" style={{ background: 'rgba(0,0,0,0.4)', borderColor: `${selectedSymbol.color}22` }}>
                  <p className="text-[10px] tracking-[0.3em] uppercase mb-1.5" style={{ color: `${selectedSymbol.color}cc` }}>
                    {language === 'en' ? 'Modern Interpretation' : 'التفسير الحديث'}
                  </p>
                  <p className="text-slate-400 text-xs italic leading-relaxed">
                    {language === 'en' ? selectedSymbol.modernEn : selectedSymbol.modernAr}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap');
      `}</style>
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; transform: scale(0.9); }
          50% { opacity: 0.9; transform: scale(1.15); }
        }
      `}</style>
    </div>
  )
}