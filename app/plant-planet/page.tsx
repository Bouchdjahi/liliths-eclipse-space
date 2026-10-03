'use client'

import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
/* ============================================================
   SVG ICONS
   ============================================================ */
const LeafIcon = ({ color = '#34d399', size = 20 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <path d="M20 4C11 4 4 10 4 18c0 1 0 2 .5 2 8-.5 15-6 15.5-16Z" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
    <path d="M4 20c4-4 8-8 16-16" stroke={color} strokeWidth="0.8" opacity="0.6" />
  </svg>
)
const FlowerIcon = ({ color = '#f0abfc', size = 20 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <circle cx="12" cy="12" r="2.5" stroke={color} strokeWidth="1.3" />
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.5 5.5l2.8 2.8M15.7 15.7l2.8 2.8M5.5 18.5l2.8-2.8M15.7 8.3l2.8-2.8" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
  </svg>
)
const TreeIcon = ({ color = '#4ade80', size = 20 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <path d="M12 3 5 12h3l-3 5h14l-3-5h3l-7-9Z" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
    <path d="M12 17v4" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
  </svg>
)
const ShieldIcon = ({ color = '#60a5fa', size = 20 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Z" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
)
const WheatIcon = ({ color = '#fbbf24', size = 20 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <path d="M12 3v18" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    <path d="M12 7c-2 0-3-1.5-3-3M12 7c2 0 3-1.5 3-3M12 11c-2 0-3-1.5-3-3M12 11c2 0 3-1.5 3-3M12 15c-2 0-3-1.5-3-3M12 15c2 0 3-1.5 3-3" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
  </svg>
)
const ButterflyIcon = ({ color = '#c084fc', size = 20 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <path d="M12 12c-3-4-8-5-8-1s5 5 8 1ZM12 12c3-4 8-5 8-1s-5 5-8 1Z" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
    <path d="M12 12v6" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
  </svg>
)
const CrystalIcon = ({ color = '#a78bfa', size = 20 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <path d="M12 3 6 9l6 12 6-12-6-6Z" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
    <path d="M6 9h12M12 3v18" stroke={color} strokeWidth="0.8" opacity="0.5" />
  </svg>
)
const MoonIcon = ({ color = '#93c5fd', size = 20 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <path d="M16 3a9 9 0 1 0 0 18 7 7 0 1 1 0-18Z" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
)
const SunIcon = ({ color = '#fcd34d', size = 20 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <circle cx="12" cy="12" r="4" stroke={color} strokeWidth="1.3" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
  </svg>
)
const ShadowIcon = ({ color = '#7c3aed', size = 20 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <path d="M12 20c-4 0-7-3-7-7 0-3 2-6 5-7-1 3 1 6 4 6 2 0 4 2 4 4 0 3-3 4-6 4Z" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
)
const WarningIcon = ({ color = '#fbbf24', size = 14 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <path d="M12 3 2 20h20L12 3Z" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M12 10v5M12 17.5h.01" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)
const CloseIcon = ({ color = '#a8a29e' }: { color?: string }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
    <path d="M6 6l12 12M18 6 6 18" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)
const FireIcon = ({ color = '#f97316', size = 24 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <path d="M12 3c2 4 4 5 4 9a4 4 0 1 1-8 0c0-2 1-3 2-4 0 2 1 3 2 3 .5-2 0-4-2-5 1-1 2-2 2-3Z" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
)
const EarthIcon = ({ color = '#a3a380', size = 24 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <path d="M3 18h18M5 18l2-8 3 4 2-6 3 6 2-3 2 7" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const AirIcon = ({ color = '#67e8f9', size = 24 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <path d="M3 9h12a3 3 0 1 0-3-3M3 14h15a3 3 0 1 1-3 3M3 19h8" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
  </svg>
)
const WaterIcon = ({ color = '#38bdf8', size = 24 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <path d="M12 3s-6 7-6 11a6 6 0 1 0 12 0c0-4-6-11-6-11Z" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
)

/* ============================================================
   CATEGORIES
   ============================================================ */
const categories = {
  all:            { nameEn: 'All Plants',           nameAr: 'جميع النباتات',         Icon: LeafIcon,      color: '#34d399' },
  higher:         { nameEn: 'Higher Realms',        nameAr: 'العوالم العليا',        Icon: CrystalIcon,   color: '#a78bfa' },
  healing:        { nameEn: 'Healing & Energy',     nameAr: 'الشفاء والطاقة',        Icon: LeafIcon,      color: '#34d399' },
  deepHealing:    { nameEn: 'Deep Healing',         nameAr: 'الشفاء العميق',         Icon: FlowerIcon,    color: '#f0abfc' },
  transformation: { nameEn: 'Transformation',       nameAr: 'التحول والتجدد',        Icon: ButterflyIcon, color: '#c084fc' },
  radicalChange:  { nameEn: 'Radical Change',       nameAr: 'التحول الجذري',         Icon: ShadowIcon,    color: '#7c3aed' },
  love:           { nameEn: 'Love & Emotion',       nameAr: 'الحب والعاطفة',         Icon: FlowerIcon,    color: '#f472b6' },
  trees:          { nameEn: 'Spiritual Trees',      nameAr: 'الأشجار الروحية',       Icon: TreeIcon,      color: '#4ade80' },
  protection:     { nameEn: 'Protection',           nameAr: 'الحماية',               Icon: ShieldIcon,    color: '#60a5fa' },
  abundance:      { nameEn: 'Abundance',            nameAr: 'الوفرة',                Icon: WheatIcon,     color: '#fbbf24' },
  chakras:        { nameEn: 'Chakras',              nameAr: 'الشاكرات',              Icon: CrystalIcon,   color: '#a78bfa' },
  zodiac:         { nameEn: 'Zodiac Plants',        nameAr: 'نباتات الأبراج',        Icon: MoonIcon,      color: '#93c5fd' },
  shadow:         { nameEn: 'Shadow Work',          nameAr: 'عمل الظل',              Icon: ShadowIcon,    color: '#7c3aed' },
  feminine:       { nameEn: 'Feminine Energy',      nameAr: 'الطاقة الأنثوية',       Icon: MoonIcon,      color: '#f0abfc' },
  masculine:      { nameEn: 'Masculine Energy',     nameAr: 'الطاقة الذكرية',        Icon: SunIcon,       color: '#fcd34d' },
}

/* ============================================================
   PLANTS DATABASE
   ============================================================ */
interface Plant {
  id: string
  nameAr: string
  nameEn: string
  category: string
  chakra?: string
  zodiac?: string[]
  element?: string
  meaningAr: string
  meaningEn: string
  ritualAr: string
  ritualEn: string
  color: string
  caution?: boolean
}

const plants: Plant[] = [
  /* HIGHER REALMS */
  { id: 'lotus', nameAr: 'زهرة اللوتس', nameEn: 'Lotus Flower', category: 'higher', chakra: 'crown', zodiac: ['pisces', 'cancer'],
    meaningAr: 'النقاء الروحي، الصحوة، والبعث. تنمو جذورها في الطين لكنها تخرج بقمة الجمال فوق الماء.',
    meaningEn: 'Spiritual purity, awakening, and rebirth. Its roots grow in mud yet it emerges with utmost beauty above the water.',
    ritualAr: 'تأمل مع زهرة اللوتس للارتقاء الروحي.',
    ritualEn: 'Meditate with the lotus flower for spiritual elevation.',
    color: 'from-emerald-950/40 to-teal-950/20' },
  { id: 'iris', nameAr: 'زهرة السوسن', nameEn: 'Iris', category: 'higher', chakra: 'third-eye', zodiac: ['libra', 'aquarius'],
    meaningAr: 'زهرة قوس قزح. ترمز للتواصل بين السماء والأرض، الرسائل الإلهية، والصفاء العقلي.',
    meaningEn: 'The rainbow flower. Symbolizes the bridge between heaven and earth, divine messages, and mental clarity.',
    ritualAr: 'ضع زهرة السوسن في مساحة التأمل لفتح قنوات الحكمة.',
    ritualEn: 'Place the iris in your meditation space to open channels of wisdom.',
    color: 'from-teal-950/40 to-emerald-950/20' },
  { id: 'frankincense', nameAr: 'شجرة اللبان', nameEn: 'Frankincense Tree', category: 'higher', chakra: 'crown', zodiac: ['aquarius', 'pisces'],
    meaningAr: 'استُخدم صمغها منذ آلاف السنين في الطقوس والتأمل. ترمز لطرد الطاقة السلبية ورفع الاهتزازات الروحية.',
    meaningEn: 'Its resin has been used for millennia in rituals. Symbolizes clearing negative energy and raising spiritual vibrations.',
    ritualAr: 'احرق اللبان أثناء الصلاة أو التأمل العميق.',
    ritualEn: 'Burn frankincense during prayer or deep meditation.',
    color: 'from-stone-800/40 to-emerald-950/30' },
  { id: 'passionflower', nameAr: 'زهرة الآلام', nameEn: 'Passion Flower', category: 'higher', chakra: 'third-eye', zodiac: ['pisces', 'scorpio'],
    meaningAr: 'شكلها المعقد يرمز لتجاوز الألم الجسدي والنفسي، وتهدئة فرط التفكير أثناء التأمل.',
    meaningEn: 'Its complex form symbolizes transcending physical and psychological pain, calming overthinking during meditation.',
    ritualAr: 'اشرب شاي زهرة الآلام قبل التأمل.',
    ritualEn: 'Drink passionflower tea before meditation.',
    color: 'from-emerald-950/40 to-stone-900/30' },
  { id: 'peony', nameAr: 'زهرة الفاوانيا', nameEn: 'Peony', category: 'higher', chakra: 'heart', zodiac: ['taurus', 'libra'],
    meaningAr: 'ترمز للحظ السعيد، الرخاء، والشفاء العاطفي العميق.',
    meaningEn: 'Symbolizes good fortune, prosperity, and deep emotional healing.',
    ritualAr: 'ضع الفاوانيا في غرفة المعيشة لجذب الحب الصافي.',
    ritualEn: 'Place peony in your living room to attract pure love.',
    color: 'from-emerald-950/40 to-stone-900/30' },
  { id: 'blue-lotus', nameAr: 'اللوتس الأزرق', nameEn: 'Blue Lotus', category: 'higher', chakra: 'third-eye', zodiac: ['pisces', 'cancer'],
    meaningAr: 'زهرة مقدسة عند الفراعنة، تشتهر بإحداث استرخاء عميق وتصفية الذهن، وفتح الحدس.',
    meaningEn: 'Sacred to the pharaohs, known for inducing deep relaxation, clearing the mind, and opening intuition.',
    ritualAr: 'استخدم اللوتس الأزرق قبل النوم لتحفيز الأحلام الواعية.',
    ritualEn: 'Use blue lotus before sleep to encourage lucid dreaming.',
    color: 'from-emerald-950/40 to-teal-950/30' },

  /* HEALING */
  { id: 'lavender', nameAr: 'اللافندر', nameEn: 'Lavender', category: 'healing', chakra: 'heart', zodiac: ['virgo', 'libra'],
    meaningAr: 'مهدئ طبيعي للقلق، يقلل التوتر ويساعد على النوم العميق. يطهّر طاقة المكان ويجلب السلام.',
    meaningEn: 'A natural calmer for anxiety, reducing stress and promoting deep sleep. Purifies space and brings peace.',
    ritualAr: 'ضع زيت اللافندر في حمامك لتهدئة العقل.',
    ritualEn: 'Add lavender oil to your bath for mental calm.',
    color: 'from-purple-950/40 to-emerald-950/20' },
  { id: 'chamomile', nameAr: 'البابونج', nameEn: 'Chamomile', category: 'healing', chakra: 'solar-plexus', zodiac: ['leo', 'cancer'],
    meaningAr: 'يهدئ الجهاز الهضمي والأعصاب. يمثل طاقة الحنان ويساعد على تجاوز الصدمات العاطفية.',
    meaningEn: 'Soothes the digestive system and nerves. Represents tenderness, helping overcome mild emotional trauma.',
    ritualAr: 'اشرب شاي البابونج قبل النوم لتلطيف القلب.',
    ritualEn: 'Drink chamomile tea before bed to soothe the heart.',
    color: 'from-amber-950/40 to-emerald-950/30' },
  { id: 'aloe-vera', nameAr: 'الألوفيرا', nameEn: 'Aloe Vera', category: 'healing', chakra: 'root', zodiac: ['cancer', 'pisces'],
    meaningAr: 'معجزة في شفاء الحروق وتجديد الخلايا. يرمز للتحمل والصبر ويجلب الحماية للمنزل.',
    meaningEn: 'A miracle for healing burns and regenerating cells. Symbolizes endurance and brings protection to the home.',
    ritualAr: 'ضع الألوفيرا في غرفة نومك لامتصاص الطاقة السلبية.',
    ritualEn: 'Place aloe vera in your bedroom to absorb negative energy.',
    color: 'from-emerald-950/40 to-teal-950/30' },
  { id: 'rosemary', nameAr: 'إكليل الجبل', nameEn: 'Rosemary', category: 'healing', chakra: 'third-eye', zodiac: ['aries', 'leo'],
    meaningAr: 'يعزز الذاكرة والتركيز. نبات للوضوح الفكري وقطع الروابط مع الماضي السلبي.',
    meaningEn: 'Enhances memory and focus. A plant for mental clarity and severing ties with a negative past.',
    ritualAr: 'احرق إكليل الجبل لتنقية الفضاء.',
    ritualEn: 'Burn rosemary to purify space.',
    color: 'from-teal-950/40 to-emerald-950/20' },
  { id: 'mint', nameAr: 'النعناع', nameEn: 'Mint', category: 'healing', chakra: 'throat', zodiac: ['gemini', 'aquarius'],
    meaningAr: 'تجديد الطاقة ووضوح ذهني. يساعد على التعبير بوضوح.',
    meaningEn: 'Energy renewal and mental clarity. Helps with clear expression.',
    ritualAr: 'اشرب شاي النعناع لتصفية الذهن.',
    ritualEn: 'Drink mint tea for mental clarity.',
    color: 'from-emerald-950/40 to-teal-950/20' },

  /* DEEP HEALING */
  { id: 'calendula', nameAr: 'الآذريون', nameEn: 'Calendula', category: 'deepHealing', chakra: 'sacral', zodiac: ['leo', 'aries'],
    meaningAr: 'ممتازة لشفاء الجروح. تُعرف بـ "زهرة الشمس المصغرة" وتشفي الطفل الداخلي.',
    meaningEn: 'Excellent for healing wounds. Known as the "mini sun flower", healing the inner child.',
    ritualAr: 'استخدم زيت الآذريون لتدليك منطقة القلب.',
    ritualEn: 'Use calendula oil to massage the heart area.',
    color: 'from-amber-950/40 to-emerald-950/30' },
  { id: 'flax', nameAr: 'الكتان', nameEn: 'Flax', category: 'deepHealing', chakra: 'heart', zodiac: ['virgo', 'aquarius'],
    meaningAr: 'غني بالأوميغا 3. يرمز للمرونة والثبات والتناغم مع إيقاع الكون.',
    meaningEn: 'Rich in Omega-3. Symbolizes flexibility, stability, and attunement to the universe\'s rhythm.',
    ritualAr: 'أضف بذور الكتان لطعامك للتناغم مع التغيير.',
    ritualEn: 'Add flax seeds to your food to align with change.',
    color: 'from-amber-950/30 to-emerald-950/20' },
  { id: 'clove', nameAr: 'القرنفل', nameEn: 'Clove', category: 'deepHealing', chakra: 'root', zodiac: ['aries', 'leo'],
    meaningAr: 'مسكن قوي للألم. يمتلك طاقة نارية تعمل كدرع حماية.',
    meaningEn: 'A strong pain reliever. Possesses a fiery energy serving as a protective shield.',
    ritualAr: 'احمل حبة قرنفل في جيبك كدرع حماية.',
    ritualEn: 'Carry a clove in your pocket as a protective shield.',
    color: 'from-emerald-950/40 to-red-950/30' },

  /* TRANSFORMATION */
  { id: 'sunflower', nameAr: 'دوار الشمس', nameEn: 'Sunflower', category: 'transformation', chakra: 'solar-plexus', zodiac: ['leo', 'sagittarius'],
    meaningAr: 'تتبع الشمس. ترمز للقوة الداخلية والتفاؤل وإعادة التوجيه نحو النور.',
    meaningEn: 'Follows the sun. Symbolizes inner strength, optimism, and redirecting toward light.',
    ritualAr: 'ازرع دوار الشمس لتنمية الثقة بالنفس.',
    ritualEn: 'Plant sunflowers to grow your confidence.',
    color: 'from-amber-900/40 to-emerald-950/40' },
  { id: 'white-sage', nameAr: 'الميرمية البيضاء', nameEn: 'White Sage', category: 'transformation', chakra: 'third-eye', zodiac: ['sagittarius', 'aquarius'],
    meaningAr: 'تُستخدم في التبخير لتنظيف الهالة والطاقات الراكدة. ترمز للبدايات الجديدة.',
    meaningEn: 'Used in smudging to cleanse the aura and stagnant energies. Symbolizes new beginnings.',
    ritualAr: 'احرق الميرمية البيضاء لبدء صفحة جديدة.',
    ritualEn: 'Burn white sage to begin a new chapter.',
    color: 'from-emerald-950/50 to-teal-950/20' },
  { id: 'orchid', nameAr: 'الأوركيد', nameEn: 'Orchid', category: 'transformation', chakra: 'crown', zodiac: ['libra', 'aquarius'],
    meaningAr: 'ترمز للتحول الروحي والجمال الداخلي.',
    meaningEn: 'Symbolizes spiritual transformation and inner beauty.',
    ritualAr: 'ضع الأوركيد في غرفة التأمل.',
    ritualEn: 'Place orchid in your meditation room.',
    color: 'from-emerald-950/40 to-stone-900/30' },

  /* RADICAL CHANGE */
  { id: 'eucalyptus', nameAr: 'الأوكالبتوس', nameEn: 'Eucalyptus', category: 'radicalChange', chakra: 'throat', zodiac: ['gemini', 'aquarius'],
    meaningAr: 'أوراقها تفتح مجاري التنفس. تمثل "التنفس الجديد" وتُستخدم لقطع التعلقات القديمة.',
    meaningEn: 'Its leaves open the airways. Represents "fresh breath", used to cut old attachments.',
    ritualAr: 'استنشق زيت الأوكالبتوس لتنظيف مسارات الطاقة.',
    ritualEn: 'Inhale eucalyptus oil to cleanse energy pathways.',
    color: 'from-teal-950/40 to-emerald-950/40' },
  { id: 'dandelion-root', nameAr: 'جذر الهندباء', nameEn: 'Dandelion Root', category: 'radicalChange', chakra: 'solar-plexus', zodiac: ['taurus', 'virgo'],
    meaningAr: 'مطهر للكبد (مخزن الغضب). يرمز للتطهير العاطفي الجذري.',
    meaningEn: 'Liver cleanser (the storehouse of anger). Symbolizes radical emotional cleansing.',
    ritualAr: 'اشرب شاي جذر الهندباء لتطهير الكبد.',
    ritualEn: 'Drink dandelion root tea for liver cleansing.',
    color: 'from-amber-950/40 to-emerald-950/30' },
  { id: 'thistle', nameAr: 'الشوك المقدسة', nameEn: 'Thistle', category: 'radicalChange', chakra: 'root', zodiac: ['scorpio', 'capricorn'],
    meaningAr: 'رغم أشواكها، تحمل طاقة حماية وشفاء عالية. ترمز للقوة الدفاعية للروح.',
    meaningEn: 'Despite its thorns, it holds protective and healing energy. Symbolizes the soul\'s defensive strength.',
    ritualAr: 'ضع الشوك في مساحة عملك للحماية.',
    ritualEn: 'Place thistle in your workspace for protection.',
    color: 'from-emerald-950/40 to-stone-900/40' },

  /* LOVE */
  { id: 'rose', nameAr: 'الورد', nameEn: 'Rose', category: 'love', chakra: 'heart', zodiac: ['libra', 'taurus'],
    meaningAr: 'الحب، القلب المفتوح، الرومانسية الروحية.',
    meaningEn: 'Love, open heart, spiritual romance.',
    ritualAr: 'ضع بتلات الورد في حمامك لجذب الحب.',
    ritualEn: 'Place rose petals in your bath to attract love.',
    color: 'from-rose-950/40 to-emerald-950/20' },
  { id: 'jasmine', nameAr: 'الياسمين', nameEn: 'Jasmine', category: 'love', chakra: 'sacral', zodiac: ['cancer', 'pisces'],
    meaningAr: 'الجاذبية، الطاقة الأنثوية، الارتباط الروحي.',
    meaningEn: 'Attraction, feminine energy, spiritual connection.',
    ritualAr: 'ضع الياسمين تحت وسادتك لأحلام الحب.',
    ritualEn: 'Place jasmine under your pillow for love dreams.',
    color: 'from-emerald-950/40 to-teal-950/20' },
  { id: 'hibiscus', nameAr: 'الكركديه', nameEn: 'Hibiscus', category: 'love', chakra: 'sacral', zodiac: ['leo', 'scorpio'],
    meaningAr: 'الشغف والطاقة العاطفية القوية.',
    meaningEn: 'Passion and strong emotional energy.',
    ritualAr: 'اشرب شاي الكركديه لفتح شاكرا العجز.',
    ritualEn: 'Drink hibiscus tea to open the sacral chakra.',
    color: 'from-red-950/40 to-emerald-950/20' },

  /* TREES */
  { id: 'olive', nameAr: 'الزيتون', nameEn: 'Olive', category: 'trees', chakra: 'crown', zodiac: ['libra', 'pisces'],
    meaningAr: 'السلام، الحكمة، البركة.',
    meaningEn: 'Peace, wisdom, blessing.',
    ritualAr: 'احمل غصن زيتون كرمز للسلام الداخلي.',
    ritualEn: 'Carry an olive branch as a symbol of inner peace.',
    color: 'from-emerald-950/40 to-teal-950/40' },
  { id: 'oak', nameAr: 'البلوط', nameEn: 'Oak', category: 'trees', chakra: 'root', zodiac: ['sagittarius', 'leo'],
    meaningAr: 'القوة، الثبات، الحماية.',
    meaningEn: 'Strength, stability, protection.',
    ritualAr: 'قف تحت شجرة البلوط لتأريض طاقتك.',
    ritualEn: 'Stand under an oak tree to ground your energy.',
    color: 'from-amber-950/40 to-emerald-950/30' },
  { id: 'pine', nameAr: 'الصنوبر', nameEn: 'Pine', category: 'trees', chakra: 'crown', zodiac: ['capricorn', 'aquarius'],
    meaningAr: 'التطهير، طول العمر، الاتصال الروحي العالي.',
    meaningEn: 'Purification, longevity, high spiritual connection.',
    ritualAr: 'ضع إبر الصنوبر في بخورك للتطهير.',
    ritualEn: 'Place pine needles in incense for purification.',
    color: 'from-emerald-950/40 to-teal-950/40' },
  { id: 'fig', nameAr: 'التين', nameEn: 'Fig', category: 'trees', chakra: 'third-eye', zodiac: ['virgo', 'taurus'],
    meaningAr: 'المعرفة الباطنية، الأسرار الروحية.',
    meaningEn: 'Inner knowledge, spiritual secrets.',
    ritualAr: 'تأمل تحت شجرة التين لاستقبال الحكمة.',
    ritualEn: 'Meditate under a fig tree to receive wisdom.',
    color: 'from-emerald-950/40 to-teal-950/20' },

  /* PROTECTION */
  { id: 'basil', nameAr: 'الريحان', nameEn: 'Basil', category: 'protection', chakra: 'heart', zodiac: ['aries', 'scorpio'],
    meaningAr: 'حماية، جذب الحظ.',
    meaningEn: 'Protection, attracting luck.',
    ritualAr: 'ازرع الريحان عند باب منزلك للحماية.',
    ritualEn: 'Plant basil at your doorstep for protection.',
    color: 'from-emerald-950/40 to-teal-950/20' },
  { id: 'garlic', nameAr: 'الثوم', nameEn: 'Garlic', category: 'protection', chakra: 'root', zodiac: ['aries', 'scorpio'],
    meaningAr: 'درع قوي ضد الطاقات السلبية.',
    meaningEn: 'Strong shield against negative energies.',
    ritualAr: 'علق فصوص الثوم عند المدخل للحماية.',
    ritualEn: 'Hang garlic cloves at the entrance for protection.',
    color: 'from-emerald-950/50 to-teal-950/40' },
  { id: 'juniper', nameAr: 'العرعر', nameEn: 'Juniper', category: 'protection', chakra: 'root', zodiac: ['capricorn', 'sagittarius'],
    meaningAr: 'طرد الأرواح والطاقات الثقيلة.',
    meaningEn: 'Repelling heavy energies.',
    ritualAr: 'احرق العرعر لتنقية الفضاء.',
    ritualEn: 'Burn juniper to purify the space.',
    color: 'from-emerald-950/40 to-teal-950/20' },

  /* ABUNDANCE */
  { id: 'wheat', nameAr: 'القمح', nameEn: 'Wheat', category: 'abundance', chakra: 'root', zodiac: ['virgo', 'taurus'],
    meaningAr: 'الرزق، الوفرة، الخصوبة.',
    meaningEn: 'Sustenance, abundance, fertility.',
    ritualAr: 'ضع سنابل القمح في مطبخك لجذب الرزق.',
    ritualEn: 'Place wheat sheaves in your kitchen to attract sustenance.',
    color: 'from-amber-950/40 to-emerald-950/40' },
  { id: 'bamboo', nameAr: 'الخيزران', nameEn: 'Bamboo', category: 'abundance', chakra: 'root', zodiac: ['aquarius', 'capricorn'],
    meaningAr: 'النمو السريع، المرونة، الحظ.',
    meaningEn: 'Fast growth, flexibility, luck.',
    ritualAr: 'ضع نبات الخيزران في محفظتك لجذب المال.',
    ritualEn: 'Place bamboo in your wallet to attract money.',
    color: 'from-emerald-950/40 to-teal-950/40' },
  { id: 'pomegranate', nameAr: 'الرمان', nameEn: 'Pomegranate', category: 'abundance', chakra: 'sacral', zodiac: ['scorpio', 'libra'],
    meaningAr: 'الخصوبة، الطاقة الأنثوية، الوفرة الروحية.',
    meaningEn: 'Fertility, feminine energy, spiritual abundance.',
    ritualAr: 'تناول بذور الرمان لتعزيز الخصوبة.',
    ritualEn: 'Eat pomegranate seeds to enhance fertility.',
    color: 'from-red-950/40 to-emerald-950/20' },

  /* CHAKRAS */
  { id: 'ginger', nameAr: 'الزنجبيل', nameEn: 'Ginger', category: 'chakras', chakra: 'root', zodiac: ['aries', 'scorpio'],
    meaningAr: 'الاستقرار، البقاء، القوة الجسدية.',
    meaningEn: 'Stability, survival, physical strength.',
    ritualAr: 'تناول الزنجبيل لتنشيط شاكرا الجذر.',
    ritualEn: 'Eat ginger to activate the root chakra.',
    color: 'from-orange-950/40 to-emerald-950/30' },
  { id: 'turmeric', nameAr: 'الكركم', nameEn: 'Turmeric', category: 'chakras', chakra: 'solar-plexus', zodiac: ['leo', 'sagittarius'],
    meaningAr: 'الثقة، الإرادة، السيطرة على الحياة.',
    meaningEn: 'Confidence, willpower, control of life.',
    ritualAr: 'اشرب الكركم مع الحليب لتقوية الإرادة.',
    ritualEn: 'Drink turmeric latte to strengthen willpower.',
    color: 'from-amber-950/30 to-emerald-950/40' },
  { id: 'thyme', nameAr: 'الزعتر', nameEn: 'Thyme', category: 'chakras', chakra: 'throat', zodiac: ['gemini', 'virgo'],
    meaningAr: 'الكلام، الحقيقة، التعبير.',
    meaningEn: 'Speech, truth, expression.',
    ritualAr: 'اشرب شاي الزعتر لتنشيط شاكرا الحلق.',
    ritualEn: 'Drink thyme tea to activate the throat chakra.',
    color: 'from-emerald-950/40 to-teal-950/30' },
  { id: 'artemisia', nameAr: 'الشيح', nameEn: 'Artemisia', category: 'chakras', chakra: 'third-eye', zodiac: ['pisces', 'sagittarius'],
    meaningAr: 'الرؤية الداخلية، الحدس، الأحلام.',
    meaningEn: 'Inner vision, intuition, dreams.',
    ritualAr: 'ضع الشيح تحت وسادتك لأحلام صافية.',
    ritualEn: 'Place artemisia under your pillow for clear dreams.',
    color: 'from-emerald-950/40 to-teal-950/30' },

  /* SHADOW */
  { id: 'wormwood', nameAr: 'الأفسنتين', nameEn: 'Wormwood', category: 'shadow', chakra: 'third-eye', zodiac: ['scorpio', 'pisces'],
    meaningAr: 'مواجهة الظلال الداخلية.',
    meaningEn: 'Confronting inner shadows.',
    ritualAr: 'استخدم الأفسنتين بحذر شديد لرؤية الأحلام.',
    ritualEn: 'Use wormwood with great caution for dream work.',
    color: 'from-purple-950/50 to-emerald-950/50', caution: true },
  { id: 'onion', nameAr: 'البصل', nameEn: 'Onion', category: 'shadow', chakra: 'root', zodiac: ['cancer', 'scorpio'],
    meaningAr: 'كشف المشاعر المخفية وطبقات النفس.',
    meaningEn: 'Revealing hidden emotions and layers of self.',
    ritualAr: 'قطع البصل لامتصاص الطاقة السلبية.',
    ritualEn: 'Cut onion to absorb negative energy.',
    color: 'from-amber-950/40 to-emerald-950/40' },
  { id: 'cypress', nameAr: 'السرو', nameEn: 'Cypress', category: 'shadow', chakra: 'crown', zodiac: ['capricorn', 'aquarius'],
    meaningAr: 'التحول، الموت الرمزي للبدايات القديمة.',
    meaningEn: 'Transformation, symbolic death of old beginnings.',
    ritualAr: 'تأمل مع السرو للتخلي عن الماضي.',
    ritualEn: 'Meditate with cypress to release the past.',
    color: 'from-emerald-950/40 to-teal-950/50' },

  /* FEMININE */
  { id: 'jasmine-feminine', nameAr: 'الياسمين (أنثوي)', nameEn: 'Jasmine (Feminine)', category: 'feminine', chakra: 'sacral', zodiac: ['cancer', 'pisces'],
    meaningAr: 'طاقة أنثوية عميقة، جاذبية، ارتباط روحي.',
    meaningEn: 'Deep feminine energy, attraction, spiritual connection.',
    ritualAr: 'ارتدِ عطر الياسمين لتعزيز طاقتك الأنثوية.',
    ritualEn: 'Wear jasmine perfume to enhance feminine energy.',
    color: 'from-emerald-950/40 to-pink-950/30' },
  { id: 'lotus-feminine', nameAr: 'اللوتس (أنثوي)', nameEn: 'Lotus (Feminine)', category: 'feminine', chakra: 'crown', zodiac: ['pisces', 'cancer'],
    meaningAr: 'النقاء، الولادة الروحية، الطاقة الأنثوية العليا.',
    meaningEn: 'Purity, spiritual birth, highest feminine energy.',
    ritualAr: 'تأمل مع اللوتس للاتصال بأنوثتك الروحية.',
    ritualEn: 'Meditate with lotus to connect with spiritual femininity.',
    color: 'from-emerald-950/40 to-teal-950/20' },
  { id: 'rose-feminine', nameAr: 'الورد (أنثوي)', nameEn: 'Rose (Feminine)', category: 'feminine', chakra: 'heart', zodiac: ['taurus', 'libra'],
    meaningAr: 'الحب غير المشروط، القلب المفتوح، الاستقبال العاطفي الكامل.',
    meaningEn: 'Unconditional love, open heart, complete emotional receptivity.',
    ritualAr: 'ضع بتلات الورد في حمامك للاتصال بطاقة الأنوثة.',
    ritualEn: 'Place rose petals in your bath to connect with feminine love.',
    color: 'from-emerald-950/40 to-rose-950/30' },
  { id: 'moonflower-feminine', nameAr: 'زهرة القمر (أنثوي)', nameEn: 'Moonflower (Feminine)', category: 'feminine', chakra: 'third-eye', zodiac: ['cancer', 'pisces'],
    meaningAr: 'طاقة القمر، الحدس، الأحلام. تزهر في الظلام — رمز الأنوثة الغامضة.',
    meaningEn: 'Moon energy, intuition, dreams. Blooms in darkness — symbol of mysterious femininity.',
    ritualAr: 'ضع زهرة القمر في غرفة نومك لأحلام واضحة.',
    ritualEn: 'Place moonflower in your bedroom for clear dreams.',
    color: 'from-emerald-950/40 to-slate-900/40' },

  /* MASCULINE */
  { id: 'cinnamon-masculine', nameAr: 'القرفة (ذكوري)', nameEn: 'Cinnamon (Masculine)', category: 'masculine', chakra: 'solar-plexus', zodiac: ['aries', 'leo'],
    meaningAr: 'طاقة نارية ذكورية: قوة، حماية، فعل، جذب.',
    meaningEn: 'Fiery masculine energy: strength, protection, action, attraction.',
    ritualAr: 'أضف القرفة لقهوتك لبدء يومك بقوة.',
    ritualEn: 'Add cinnamon to your coffee to start your day strong.',
    color: 'from-emerald-950/30 to-amber-950/40' },
  { id: 'rosemary-masculine', nameAr: 'إكليل الجبل (ذكوري)', nameEn: 'Rosemary (Masculine)', category: 'masculine', chakra: 'third-eye', zodiac: ['aries', 'leo'],
    meaningAr: 'الذاكرة، الحماية، الطاقة الذكرية النشطة.',
    meaningEn: 'Memory, protection, active masculine energy.',
    ritualAr: 'استخدم زيت إكليل الجبل لتنشيط عقلك.',
    ritualEn: 'Use rosemary oil to activate your mind.',
    color: 'from-emerald-950/40 to-teal-950/30' },
  { id: 'ginger-masculine', nameAr: 'الزنجبيل (ذكوري)', nameEn: 'Ginger (Masculine)', category: 'masculine', chakra: 'root', zodiac: ['aries', 'leo'],
    meaningAr: 'طاقة نارية، حيوية، دافع، قوة.',
    meaningEn: 'Fiery energy, vitality, drive, power.',
    ritualAr: 'اشرب شاي الزنجبيل قبل التمرين.',
    ritualEn: 'Drink ginger tea before workouts.',
    color: 'from-emerald-950/30 to-orange-950/40' },
  { id: 'oak-masculine', nameAr: 'البلوط (ذكوري)', nameEn: 'Oak (Masculine)', category: 'masculine', chakra: 'root', zodiac: ['sagittarius', 'leo'],
    meaningAr: 'القوة، الثبات، الحماية الذكرية الأبوية.',
    meaningEn: 'Strength, stability, protective paternal masculinity.',
    ritualAr: 'قف تحت شجرة البلوط لتأريض طاقتك.',
    ritualEn: 'Stand under an oak tree to ground your energy.',
    color: 'from-emerald-950/40 to-amber-950/40' },
  { id: 'sunflower-masculine', nameAr: 'دوار الشمس (ذكوري)', nameEn: 'Sunflower (Masculine)', category: 'masculine', chakra: 'solar-plexus', zodiac: ['leo', 'sagittarius'],
    meaningAr: 'طاقة شمسية ذكورية، إشعاع، قيادة.',
    meaningEn: 'Solar masculine energy — radiance, leadership.',
    ritualAr: 'ازرع دوار الشمس لتنمية الثقة.',
    ritualEn: 'Plant sunflowers to grow confidence.',
    color: 'from-emerald-950/30 to-amber-900/40' },
  { id: 'cinnamon', nameAr: 'القرفة', nameEn: 'Cinnamon', category: 'masculine', chakra: 'solar-plexus', zodiac: ['aries', 'leo'],
    meaningAr: 'القوة، الحماية، الفعل، الجذب.',
    meaningEn: 'Strength, protection, action, attraction.',
    ritualAr: 'أضف القرفة لقهوتك لبدء يومك بقوة.',
    ritualEn: 'Add cinnamon to your coffee to start your day strong.',
    color: 'from-amber-950/40 to-emerald-950/10' },

  /* ZODIAC */
  { id: 'cinnamon-zodiac-fire', nameAr: 'القرفة (ناري)', nameEn: 'Cinnamon (Fire)', category: 'zodiac', zodiac: ['aries', 'leo', 'sagittarius'], element: 'fire',
    meaningAr: 'قوة، شغف، تحفيز. تناسب الأبراج النارية.',
    meaningEn: 'Strength, passion, stimulation. Suits Fire signs.',
    ritualAr: 'أضف القرفة لطعامك لزيادة الطاقة النارية.',
    ritualEn: 'Add cinnamon to your food to increase fire energy.',
    color: 'from-emerald-950/40 to-red-950/40' },
  { id: 'ginger-zodiac-fire', nameAr: 'الزنجبيل (ناري)', nameEn: 'Ginger (Fire)', category: 'zodiac', zodiac: ['aries', 'leo', 'sagittarius'], element: 'fire',
    meaningAr: 'طاقة، حركة، حماس.',
    meaningEn: 'Energy, movement, enthusiasm.',
    ritualAr: 'اشرب شاي الزنجبيل لتحفيز طاقتك.',
    ritualEn: 'Drink ginger tea to stimulate your energy.',
    color: 'from-emerald-950/40 to-orange-950/30' },
  { id: 'lavender-zodiac-earth', nameAr: 'اللافندر (ترابي)', nameEn: 'Lavender (Earth)', category: 'zodiac', zodiac: ['taurus', 'virgo', 'capricorn'], element: 'earth',
    meaningAr: 'توازن وهدوء واستقرار عاطفي.',
    meaningEn: 'Balance, calm, emotional stability.',
    ritualAr: 'ضع زيت اللافندر لتهدئة أعصابك.',
    ritualEn: 'Apply lavender oil to calm your nerves.',
    color: 'from-emerald-950/40 to-purple-950/20' },
  { id: 'thyme-zodiac-earth', nameAr: 'الزعتر (ترابي)', nameEn: 'Thyme (Earth)', category: 'zodiac', zodiac: ['taurus', 'virgo', 'capricorn'], element: 'earth',
    meaningAr: 'التجذر، الصحة الجسدية، الثبات.',
    meaningEn: 'Grounding, physical health, stability.',
    ritualAr: 'أضف الزعتر لطعامك للاستقرار الجسدي.',
    ritualEn: 'Add thyme to your food for physical stability.',
    color: 'from-emerald-950/40 to-teal-950/30' },
  { id: 'mint-zodiac-air', nameAr: 'النعناع (هوائي)', nameEn: 'Mint (Air)', category: 'zodiac', zodiac: ['gemini', 'libra', 'aquarius'], element: 'air',
    meaningAr: 'وضوح ذهني، تواصل، صفاء.',
    meaningEn: 'Mental clarity, communication, purity.',
    ritualAr: 'اشرب شاي النعناع لتصفية أفكارك.',
    ritualEn: 'Drink mint tea to clear your thoughts.',
    color: 'from-emerald-950/40 to-teal-950/30' },
  { id: 'fennel-zodiac-air', nameAr: 'الشمر (هوائي)', nameEn: 'Fennel (Air)', category: 'zodiac', zodiac: ['gemini', 'libra', 'aquarius'], element: 'air',
    meaningAr: 'الوضوح، الحدس العقلي، التواصل.',
    meaningEn: 'Clarity, mental intuition, communication.',
    ritualAr: 'امضغ بذور الشمر قبل المحادثات المهمة.',
    ritualEn: 'Chew fennel seeds before important conversations.',
    color: 'from-emerald-950/40 to-emerald-900/30' },
  { id: 'jasmine-zodiac-water', nameAr: 'الياسمين (مائي)', nameEn: 'Jasmine (Water)', category: 'zodiac', zodiac: ['cancer', 'scorpio', 'pisces'], element: 'water',
    meaningAr: 'حدس، أحلام، اتصال عاطفي عميق.',
    meaningEn: 'Intuition, dreams, deep emotional connection.',
    ritualAr: 'ضع الياسمين تحت وسادتك لأحلام واضحة.',
    ritualEn: 'Place jasmine under your pillow for clear dreams.',
    color: 'from-emerald-950/40 to-teal-950/30' },
  { id: 'willow-zodiac-water', nameAr: 'الصفصاف (مائي)', nameEn: 'Willow (Water)', category: 'zodiac', zodiac: ['cancer', 'scorpio', 'pisces'], element: 'water',
    meaningAr: 'المرونة، الحدس، الشفاء العاطفي العميق.',
    meaningEn: 'Flexibility, intuition, deep emotional healing.',
    ritualAr: 'تأمل تحت شجرة الصفصاف للشفاء العاطفي.',
    ritualEn: 'Meditate under a willow tree for emotional healing.',
    color: 'from-emerald-950/40 to-teal-950/40' },
  { id: 'sage-zodiac-water', nameAr: 'الميرمية (مائية)', nameEn: 'Sage (Water)', category: 'zodiac', zodiac: ['cancer', 'scorpio', 'pisces'], element: 'water',
    meaningAr: 'التطهير، الحماية، الحكمة الباطنية.',
    meaningEn: 'Purification, protection, inner wisdom.',
    ritualAr: 'احرق الميرمية لتنظيف طاقتك العاطفية.',
    ritualEn: 'Burn sage to cleanse your emotional energy.',
    color: 'from-emerald-950/50 to-teal-950/30' },
]

/* ============================================================
   FOUR ELEMENTS
   ============================================================ */
const fourElements = [
  {
    id: 'fire', nameEn: 'Fire Element', nameAr: 'عنصر النار',
    signsEn: 'Aries · Leo · Sagittarius', signsAr: 'الحمل · الأسد · القوس',
    polarityEn: 'Masculine (Yang)', polarityAr: 'ذكوري (يانغ)',
    essenceEn: 'Action, passion, expansion, willpower, and initiation. Fire is the spark of creation — outwardly focused, dynamic, bold.',
    essenceAr: 'العمل، الشغف، التوسع، الإرادة، والبدء. النار هي شرارة الخلق — موجهة نحو الخارج، ديناميكية، جريئة.',
    shadowEn: 'Impulsiveness, burnout, and impatience when the external world moves too slowly.',
    shadowAr: 'الاندفاع المتهور، الاحتراق النفسي السريع، والنفاد عندما يتحرك العالم ببطء.',
    color: '#f97316', Icon: FireIcon,
  },
  {
    id: 'earth', nameEn: 'Earth Element', nameAr: 'عنصر التراب',
    signsEn: 'Taurus · Virgo · Capricorn', signsAr: 'الثور · العذراء · الجدي',
    polarityEn: 'Feminine (Yin)', polarityAr: 'أنثوي (يين)',
    essenceEn: 'Grounding, stability, manifestation, fertility, and physical structure. Earth is the anchor — receptive, patient, deeply internal.',
    essenceAr: 'التجذر، الاستقرار، التجلي المادي، الخصوبة. التراب هو المرساة — استقبالي، صبور، وداخلي بعمق.',
    shadowEn: 'Stubborn resistance to change, over-materialism, and getting stuck in routine.',
    shadowAr: 'العناد المقاوم للتغيير، المادية المفرطة، والوقوع في فخ الروتين.',
    color: '#a3a380', Icon: EarthIcon,
  },
  {
    id: 'air', nameEn: 'Air Element', nameAr: 'عنصر الهواء',
    signsEn: 'Gemini · Libra · Aquarius', signsAr: 'الجوزاء · الميزان · الدلو',
    polarityEn: 'Masculine (Yang)', polarityAr: 'ذكوري (يانغ)',
    essenceEn: 'Intellect, communication, social connectivity, and abstract thought. Air is the breath of life — expressive, outward-moving, mental.',
    essenceAr: 'الفكر، التواصل، الترابط الاجتماعي، والأفكار المجردة. الهواء هو نفس الحياة — تعبيري، عقلي.',
    shadowEn: 'Detachment from emotions, over-intellectualizing, and mental exhaustion or anxiety.',
    shadowAr: 'الانفصال عن المشاعر، الإفراط في التفكير، والإرهاق العقلي.',
    color: '#67e8f9', Icon: AirIcon,
  },
  {
    id: 'water', nameEn: 'Water Element', nameAr: 'عنصر الماء',
    signsEn: 'Cancer · Scorpio · Pisces', signsAr: 'السرطان · العقرب · الحوت',
    polarityEn: 'Feminine (Yin)', polarityAr: 'أنثوي (يين)',
    essenceEn: 'Emotion, intuition, psychic depth, and spiritual merging. Water is the deep subconscious — receptive, fluid, internal.',
    essenceAr: 'المشاعر، الحدس، العمق النفسي، والاندماج الروحي. الماء هو العقل الباطن العميقة.',
    shadowEn: 'Emotional overwhelm, absorbing external toxic energies, and getting trapped in past grief.',
    shadowAr: 'الاكتساح العاطفي، امتصاص الطاقات السلبية، والوقوع في شرك الماضي.',
    color: '#38bdf8', Icon: WaterIcon,
  },
]

/* ============================================================
   PAGE
   ============================================================ */
export default function PlantPlanet() {
  const router = useRouter()
  const { language, toggleLanguage } = useLanguage()
  const [activeCategory, setActiveCategory] = useState<keyof typeof categories>('all')
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null)
  const [hoveredPlant, setHoveredPlant] = useState<string | null>(null)
  const [showIntro, setShowIntro] = useState(true)

  const displayedPlants =
    activeCategory === 'all' ? plants : plants.filter((p) => p.category === activeCategory)

  const [fireflies, setFireflies] = useState<any[]>([])
  useEffect(() => {
    const list = []
    for (let i = 0; i < 70; i++) {
      list.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3.5 + 1.2,
        delay: Math.random() * 6,
        duration: Math.random() * 5 + 4,
      })
    }
    setFireflies(list)
  }, [])

  const introEn = 'Historically, humans have connected with nature not only as a source of food and medicine, but as a gateway to expressing deep spiritual dimensions. Every flower and plant carries a special energy that touches the soul — aiding in psychological healing or triggering a profound transformation in consciousness.'
  const introAr = 'تاريخياً، ارتبط الإنسان بالطبيعة ليس فقط كمصدر للغذاء والدواء، بل كبوابة تعبير عن الأبعاد الروحية العميقة. لكل زهرة ونبتة طاقة خاصة تلامس الروح، وتساعد في الشفاء النفسي أو إحداث تحول جذري في الوعي.'

  return (
    <div
      className="min-h-screen overflow-hidden relative selection:bg-emerald-700/40 selection:text-emerald-100"
      style={{
        background: 'radial-gradient(ellipse at top, #0a1f13 0%, #061510 40%, #020705 100%)',
        fontFamily: "'Cormorant Garamond', 'Georgia', serif",
      }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-60"
        style={{ background: 'radial-gradient(ellipse at 30% -10%, rgba(52,211,153,0.10) 0%, transparent 60%)' }} />
      <div className="absolute inset-0 pointer-events-none opacity-40"
        style={{ background: 'radial-gradient(ellipse at 70% 110%, rgba(20,83,45,0.35) 0%, transparent 60%)' }} />

      {/* Fireflies */}
      <div className="absolute inset-0 pointer-events-none">
        {fireflies.map((f) => (
          <div
            key={f.id}
            className="absolute rounded-full"
            style={{
              left: f.x + '%',
              top: f.y + '%',
              width: f.size + 'px',
              height: f.size + 'px',
              background: 'radial-gradient(circle, rgba(190, 255, 190, 0.9) 0%, rgba(52,211,153,0.4) 50%, transparent 100%)',
              boxShadow: '0 0 10px rgba(52,211,153,0.6)',
              animation: `fireflyFloat ${f.duration}s ease-in-out infinite`,
              animationDelay: f.delay + 's',
            }}
          />
        ))}
      </div>

      {/* Vines */}
      <svg className="absolute top-0 left-0 pointer-events-none opacity-25" width="200" height="500" viewBox="0 0 200 500" fill="none">
        <path d="M40 0 C30 80 60 160 40 240 C20 320 60 400 30 500" stroke="#34d399" strokeWidth="0.8" />
        <path d="M40 60 C20 70 15 90 30 100 C45 90 55 75 40 60Z" fill="#34d399" opacity="0.5" />
        <path d="M40 180 C60 190 65 210 50 220 C35 210 25 195 40 180Z" fill="#34d399" opacity="0.5" />
        <path d="M40 320 C20 330 15 350 30 360 C45 350 55 335 40 320Z" fill="#34d399" opacity="0.5" />
      </svg>
      <svg className="absolute top-0 right-0 pointer-events-none opacity-25" width="200" height="500" viewBox="0 0 200 500" fill="none">
        <path d="M160 0 C170 80 140 160 160 240 C180 320 140 400 170 500" stroke="#34d399" strokeWidth="0.8" />
        <path d="M160 60 C180 70 185 90 170 100 C155 90 145 75 160 60Z" fill="#34d399" opacity="0.5" />
        <path d="M160 200 C140 210 135 230 150 240 C165 230 175 215 160 200Z" fill="#34d399" opacity="0.5" />
        <path d="M160 340 C180 350 185 370 170 380 C155 370 145 355 160 340Z" fill="#34d399" opacity="0.5" />
      </svg>

      {/* NAV */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-6 flex justify-between items-center">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => router.push('/space')}
          className="text-emerald-300/80 hover:text-emerald-200 transition-all duration-300 flex items-center gap-2 text-xs tracking-[0.25em] uppercase bg-emerald-950/30 border border-emerald-800/40 backdrop-blur-md px-4 py-2 rounded-full"
        >
          ← {language === 'en' ? 'Return to Space' : 'العودة إلى الفضاء'}
        </motion.button>

        <button
          onClick={toggleLanguage}
          className="px-4 py-2 bg-emerald-950/30 rounded-full text-emerald-300 text-xs tracking-widest uppercase hover:bg-emerald-900/40 transition-all duration-300 border border-emerald-800/40 backdrop-blur-md"
        >
          {language === 'en' ? 'العربية' : 'English'}
        </button>
      </div>

      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center pt-16 pb-8 relative z-10"
      >
        <div className="flex justify-center gap-3 mb-6 opacity-90">
          <LeafIcon color="#34d399" size={22} />
          <FlowerIcon color="#a3e635" size={22} />
          <TreeIcon color="#34d399" size={22} />
          <FlowerIcon color="#a3e635" size={22} />
          <LeafIcon color="#34d399" size={22} />
        </div>
        <h1
          className="text-5xl md:text-7xl font-light tracking-[0.15em] italic"
          style={{
            color: '#d1fae5',
            textShadow: '0 0 30px rgba(52,211,153,0.4), 0 0 80px rgba(20,83,45,0.4)',
            fontFamily: "'Cormorant Garamond', serif",
          }}
        >
          {language === 'en' ? 'Planet of Plants' : 'كوكب النباتات'}
        </h1>
        <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent mx-auto mt-6" />
        <p className="text-emerald-400/70 text-xs tracking-[0.5em] uppercase mt-5">
          {language === 'en' ? 'Spiritual Plant Symbolism & Rituals' : 'رمزية النباتات الروحية والطقوس'}
        </p>
      </motion.div>

      {/* INTRO CARD */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="relative z-10 max-w-3xl mx-auto px-6 mb-10"
          >
            <div
              className="rounded-3xl p-7 border relative overflow-hidden"
              style={{
                background: 'linear-gradient(160deg, rgba(6,26,16,0.85), rgba(2,10,6,0.95))',
                borderColor: 'rgba(52,211,153,0.3)',
                boxShadow: '0 0 40px rgba(20,83,45,0.3)',
              }}
            >
              <span className="absolute top-3 left-3 w-4 h-4 border-l border-t" style={{ borderColor: 'rgba(52,211,153,0.5)' }} />
              <span className="absolute top-3 right-3 w-4 h-4 border-r border-t" style={{ borderColor: 'rgba(52,211,153,0.5)' }} />
              <span className="absolute bottom-3 left-3 w-4 h-4 border-l border-b" style={{ borderColor: 'rgba(52,211,153,0.5)' }} />
              <span className="absolute bottom-3 right-3 w-4 h-4 border-r border-b" style={{ borderColor: 'rgba(52,211,153,0.5)' }} />

              <button
                onClick={() => setShowIntro(false)}
                className="absolute top-3 right-3 opacity-60 hover:opacity-100 transition-opacity"
                aria-label="close intro"
              >
                <CloseIcon color="#34d399" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <LeafIcon color="#34d399" size={22} />
                <h3 className="text-emerald-300 text-sm tracking-[0.3em] uppercase">
                  {language === 'en' ? 'The Spiritual Guide' : 'الدليل الروحي'}
                </h3>
              </div>
              <p className="text-stone-300/90 text-base leading-relaxed italic">
                {language === 'en' ? introEn : introAr}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOUR ELEMENTS */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2
            className="text-2xl md:text-4xl font-light italic tracking-wide"
            style={{ color: '#d1fae5', textShadow: '0 0 20px rgba(52,211,153,0.3)' }}
          >
            {language === 'en'
              ? 'The Four Elements & Their Energies'
              : 'العناصر الأربعة وطاقاتها'}
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent mx-auto mt-4" />
          <p className="text-emerald-400/70 text-xs tracking-[0.35em] uppercase mt-4">
            {language === 'en' ? 'Feminine & Masculine Balance' : 'توازن الأنوثة والذكورة'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {fourElements.map((el, idx) => {
            const Icon = el.Icon
            return (
              <motion.div
                key={el.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-3xl p-6 border relative overflow-hidden group"
                style={{
                  background: `linear-gradient(160deg, ${el.color}15, rgba(2,10,6,0.95))`,
                  borderColor: `${el.color}44`,
                  boxShadow: `0 0 25px ${el.color}11`,
                }}
              >
                <span className="absolute top-3 left-3 w-3 h-3 border-l border-t" style={{ borderColor: `${el.color}66` }} />
                <span className="absolute top-3 right-3 w-3 h-3 border-r border-t" style={{ borderColor: `${el.color}66` }} />
                <span className="absolute bottom-3 left-3 w-3 h-3 border-l border-b" style={{ borderColor: `${el.color}66` }} />
                <span className="absolute bottom-3 right-3 w-3 h-3 border-r border-b" style={{ borderColor: `${el.color}66` }} />

                <div className="flex items-center gap-3 mb-3">
                  <Icon color={el.color} size={28} />
                  <div>
                    <h3
                      className="text-xl font-light italic"
                      style={{ color: el.color, textShadow: `0 0 15px ${el.color}88` }}
                    >
                      {language === 'en' ? el.nameEn : el.nameAr}
                    </h3>
                    <p className="text-[10px] tracking-[0.25em] uppercase" style={{ color: `${el.color}cc` }}>
                      {language === 'en' ? el.signsEn : el.signsAr}
                    </p>
                  </div>
                </div>

                <div
                  className="inline-block mb-4 px-3 py-1 rounded-full text-[10px] tracking-[0.2em] uppercase border"
                  style={{
                    background: `${el.color}15`,
                    borderColor: `${el.color}55`,
                    color: el.color,
                  }}
                >
                  {language === 'en' ? el.polarityEn : el.polarityAr}
                </div>

                <p className="text-stone-300/85 text-sm leading-relaxed italic mb-4">
                  {language === 'en' ? el.essenceEn : el.essenceAr}
                </p>

                <div
                  className="rounded-xl p-3 border"
                  style={{ background: 'rgba(0,0,0,0.35)', borderColor: `${el.color}22` }}
                >
                  <p className="text-[10px] tracking-[0.25em] uppercase mb-1" style={{ color: `${el.color}aa` }}>
                    {language === 'en' ? 'Shadow Side' : 'الجانب المظلم'}
                  </p>
                  <p className="text-stone-400/85 text-xs italic leading-relaxed">
                    {language === 'en' ? el.shadowEn : el.shadowAr}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-emerald-300/70 text-sm italic mt-8 max-w-3xl mx-auto"
        >
          {language === 'en'
            ? 'Cosmic Harmony: True balance is achieved when we integrate both energies within ourselves. Just as the zodiac wheel flows continuously between active expression (Fire/Air) and receptive reflection (Earth/Water), human growth requires both the courage to act and the wisdom to feel and receive.'
            : 'التناغم الكوني: يتحقق التوازن الحقيقي عندما ندمج كلا الطاقتين داخل أنفسنا. تماماً مثل عجلة الأبراج التي تتدفق باستمرار بين التعبير النشط (النار/الهواء) والتأمل الاستقبالي (التراب/الماء)، فإن النمو البشري يتطلب شجاعة الفعل وحكمة الشعور والاستقبال.'}
        </motion.p>
      </div>

      {/* CATEGORIES */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-4">
        <div className="flex flex-wrap justify-center gap-2.5 mb-12 max-w-4xl mx-auto">
          {Object.entries(categories).map(([key, cat]) => {
            const Icon = cat.Icon
            const active = activeCategory === key
            return (
              <button
                key={key}
                onClick={() => setActiveCategory(key as keyof typeof categories)}
                className="px-3 py-1.5 rounded-full text-[11px] tracking-wide transition-all duration-300 flex items-center gap-2 backdrop-blur-sm border"
                style={{
                  background: active ? `${cat.color}22` : 'rgba(6,26,16,0.4)',
                  color: active ? cat.color : '#78716c',
                  borderColor: active ? `${cat.color}88` : 'rgba(30,60,40,0.5)',
                  boxShadow: active ? `0 0 12px ${cat.color}33` : 'none',
                }}
              >
                <Icon color={active ? cat.color : '#78716c'} size={14} />
                <span>{language === 'en' ? cat.nameEn : cat.nameAr}</span>
              </button>
            )
          })}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-24">
          {displayedPlants.map((plant, idx) => (
            <motion.div
              key={plant.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.015 }}
              whileHover={{ y: -4 }}
              onMouseEnter={() => setHoveredPlant(plant.id)}
              onMouseLeave={() => setHoveredPlant(null)}
              onClick={() => setSelectedPlant(plant)}
              className={`bg-gradient-to-br ${plant.color} rounded-2xl p-5 border border-emerald-900/40 hover:border-emerald-600/50 transition-all duration-500 cursor-pointer relative overflow-hidden group`}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-emerald-500/5 to-transparent pointer-events-none transition-opacity duration-500" />

              {plant.caution && (
                <div className="absolute top-3 right-3"><WarningIcon color="#fbbf24" /></div>
              )}

              <div className="flex items-center gap-3 mb-3 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-900/50 flex items-center justify-center">
                  <LeafIcon color="#34d399" size={18} />
                </div>
                <div>
                  <h3 className="text-stone-200 font-light text-lg italic tracking-wide group-hover:text-emerald-300 transition-colors duration-300">
                    {language === 'en' ? plant.nameEn : plant.nameAr}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    {plant.chakra && (
                      <span className="text-emerald-500/60 text-[9px] tracking-[0.15em] uppercase">
                        {plant.chakra}
                      </span>
                    )}
                    {plant.element && (
                      <span className="text-amber-500/60 text-[9px] tracking-[0.15em] uppercase border-l border-emerald-900/50 pl-2">
                        {plant.element}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-stone-400/90 text-xs leading-relaxed line-clamp-2 pl-1 relative z-10 italic group-hover:text-stone-300 transition-colors duration-300">
                {language === 'en' ? plant.meaningEn : plant.meaningAr}
              </p>

              <div className="mt-4 pt-2 border-t border-emerald-950/60 flex items-center justify-between opacity-50 group-hover:opacity-100 transition-all duration-300">
                <span className="text-[10px] text-stone-500 italic">
                  {categories[plant.category as keyof typeof categories]
                    ? language === 'en'
                      ? categories[plant.category as keyof typeof categories].nameEn
                      : categories[plant.category as keyof typeof categories].nameAr
                    : ''}
                </span>
                <motion.span
                  animate={{ x: hoveredPlant === plant.id ? 3 : 0 }}
                  className="text-emerald-400 text-[10px] flex items-center gap-1 italic"
                >
                  {language === 'en' ? 'Commune' : 'اتصل'} →
                </motion.span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedPlant && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#010402]/95 backdrop-blur-xl p-4"
            onClick={() => setSelectedPlant(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: 'spring', duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl border p-7"
              style={{
                background: 'linear-gradient(180deg, #071a10, #020705)',
                borderColor: 'rgba(52,211,153,0.4)',
                boxShadow: '0 0 60px rgba(52,211,153,0.15)',
              }}
            >
              <span className="absolute top-2 left-2 w-3 h-3 border-l border-t" style={{ borderColor: 'rgba(52,211,153,0.5)' }} />
              <span className="absolute top-2 right-2 w-3 h-3 border-r border-t" style={{ borderColor: 'rgba(52,211,153,0.5)' }} />
              <span className="absolute bottom-2 left-2 w-3 h-3 border-l border-b" style={{ borderColor: 'rgba(52,211,153,0.5)' }} />
              <span className="absolute bottom-2 right-2 w-3 h-3 border-r border-b" style={{ borderColor: 'rgba(52,211,153,0.5)' }} />

              <button
                onClick={() => setSelectedPlant(null)}
                className="absolute top-4 right-4 opacity-60 hover:opacity-100 transition-opacity"
                aria-label="close"
              >
                <CloseIcon color="#34d399" />
              </button>

              <div className="text-center mb-6">
                <div className="flex justify-center mb-3">
                  <LeafIcon color="#34d399" size={36} />
                </div>
                <h2 className="text-3xl italic font-light tracking-wide text-stone-100">
                  {language === 'en' ? selectedPlant.nameEn : selectedPlant.nameAr}
                </h2>
                <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-emerald-600/60 to-transparent mx-auto my-3" />
              </div>

              <div className="space-y-4">
                <div className="bg-emerald-950/25 rounded-2xl p-4 border border-emerald-900/40">
                  <p className="text-emerald-400 text-[10px] tracking-[0.3em] uppercase mb-2">
                    {language === 'en' ? 'Spiritual Essence' : 'جوهر الروح'}
                  </p>
                  <p className="text-stone-300 text-base italic leading-relaxed">
                    {language === 'en' ? selectedPlant.meaningEn : selectedPlant.meaningAr}
                  </p>
                </div>

                <div className="bg-emerald-900/20 rounded-2xl p-4 border border-emerald-800/40">
                  <p className="text-amber-400/90 text-[10px] tracking-[0.3em] uppercase mb-2">
                    {language === 'en' ? 'Sacred Ritual' : 'الطقوس الروحية'}
                  </p>
                  <p className="text-stone-300 text-base italic leading-relaxed">
                    {language === 'en' ? selectedPlant.ritualEn : selectedPlant.ritualAr}
                  </p>
                </div>

                {(selectedPlant.chakra || selectedPlant.element || selectedPlant.zodiac) && (
                  <div className="flex flex-wrap gap-2 justify-center pt-2">
                    {selectedPlant.chakra && (
                      <span className="px-3 py-1 bg-emerald-950/40 border border-emerald-900/40 rounded-full text-emerald-400 text-[10px] tracking-widest uppercase">
                        {selectedPlant.chakra}
                      </span>
                    )}
                    {selectedPlant.element && (
                      <span className="px-3 py-1 bg-amber-950/30 border border-amber-900/30 rounded-full text-amber-400 text-[10px] tracking-widest uppercase">
                        {selectedPlant.element}
                      </span>
                    )}
                    {selectedPlant.zodiac && selectedPlant.zodiac.map((z) => (
                      <span key={z} className="px-3 py-1 bg-emerald-900/40 border border-emerald-800/50 rounded-full text-stone-300 text-[10px] tracking-widest uppercase">
                        {z}
                      </span>
                    ))}
                  </div>
                )}

                {selectedPlant.caution && (
                  <div className="bg-amber-950/25 rounded-xl p-3 border border-amber-900/30 text-center flex items-center justify-center gap-2">
                    <WarningIcon color="#fbbf24" />
                    <p className="text-amber-400/90 text-xs italic">
                      {language === 'en'
                        ? 'Use with strict caution and spiritual reverence.'
                        : 'استخدم بحذر شديد واحترام روحي.'}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-4 border-t border-emerald-950/60 text-center">
                <p className="text-emerald-500/50 text-[10px] tracking-[0.3em] uppercase italic">
                  {language === 'en'
                    ? 'The wisdom of plants heals the soul'
                    : 'حكمة النباتات تشفي الروح'}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap');
      `}</style>
      <style>{`
        @keyframes fireflyFloat {
          0%, 100% { transform: translate(0, 0); opacity: 0.15; }
          30% { transform: translate(-12px, -18px); opacity: 0.9; }
          60% { transform: translate(10px, -8px); opacity: 0.5; }
          80% { transform: translate(-5px, -25px); opacity: 1; }
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}
