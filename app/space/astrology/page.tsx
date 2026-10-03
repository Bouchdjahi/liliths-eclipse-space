'use client'

import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
/* ============================================================
   ELEGANT SVG ICONS
   ============================================================ */
const ZodiacIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.2" />
    <path d="M12 3v18M3 12h18" stroke={color} strokeWidth="0.6" opacity="0.4" />
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.2" />
  </svg>
)

const PlanetIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
    <circle cx="12" cy="12" r="6" stroke={color} strokeWidth="1.2" />
    <ellipse cx="12" cy="12" rx="10" ry="3.5" stroke={color} strokeWidth="1" transform="rotate(-25 12 12)" />
  </svg>
)

const AsteroidIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
    <circle cx="12" cy="12" r="5" stroke={color} strokeWidth="1.2" />
    <circle cx="9" cy="10" r="1" fill={color} opacity="0.6" />
    <circle cx="14" cy="13" r="0.8" fill={color} opacity="0.6" />
    <circle cx="12" cy="15" r="1.2" fill={color} opacity="0.4" />
    <ellipse cx="12" cy="12" rx="10" ry="3" stroke={color} strokeWidth="0.8" strokeDasharray="2 3" transform="rotate(20 12 12)" />
  </svg>
)

const HouseIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
    <path d="M4 20V10l8-6 8 6v10H4Z" stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M9 20v-5h6v5" stroke={color} strokeWidth="1" />
  </svg>
)

const AspectIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
    <path d="M12 3 3 20h18L12 3Z" stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M8 20 12 8l4 12" stroke={color} strokeWidth="0.8" opacity="0.6" />
  </svg>
)

const RetrogradeIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
    <path d="M5 12a7 7 0 0 1 12-5l2 2M19 12a7 7 0 0 1-12 5l-2-2" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    <path d="M19 5v4h-4M5 19v-4h4" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const BookIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
    <path d="M4 5.5C4 4.7 4.7 4 5.5 4H12v15H5.5c-.8 0-1.5.7-1.5 1.5V5.5Z" stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M20 5.5c0-.8-.7-1.5-1.5-1.5H12v15h6.5c.8 0 1.5.7 1.5 1.5V5.5Z" stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
)

const CloseIcon = ({ color = '#8c826e' }: { color?: string }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
    <path d="M6 6l12 12M18 6 6 18" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

/* ============================================================
   DATA
   ============================================================ */

const introParagraphsEn = [
  {
    title: 'Western (Tropical) Astrology',
    body: 'Aligns with the Earth\'s seasons, beginning the zodiac at the Vernal Equinox (0° Aries). It focuses primarily on psychological profiling, personal growth, character analysis, and individual archetype mapping.',
    color: '#a5b4fc',
  },
  {
    title: 'Indian (Vedic / Sidereal) Astrology',
    body: 'Aligns with the fixed, observable constellations in the night sky. Owing to the precession of the equinoxes (known as Ayanamsa, currently ~23–24 degrees), planet positions differ between the two systems. Vedic astrology places strong emphasis on karma, destiny, timed life cycles (Dashas), and predictive accuracy.',
    color: '#f0a6c8',
  },
]
const introParagraphsAr = [
  {
    title: 'الخريطة الغربية (Tropical)',
    body: 'تعتمد على حركة الشمس وحساب الفصول الأربعة، وتبدأ من نقطة الاعتدال الربيعي مع برج الحمل. تركّز بشكل كبير على الجانب النفسي، التحليل، وشخصية الفرد.',
    color: '#a5b4fc',
  },
  {
    title: 'الخريطة الهندية (Vedic / Sidereal)',
    body: 'تعتمد على المواقع الفلكية الثابتة للنجوم في السماء. فرق الحساب بين الخريطتين يُعرف بـ Ayanamsa (حوالي 23–24 درجة)، لذا قد يختلف برجكِ أو طالعكِ بدرجة واحدة عن الغربية. تركّز الفيدية بشكل أكبر على القدر، الكارما، والأحداث الزمنية والتوقعات.',
    color: '#f0a6c8',
  },
]

const zodiacSigns = [
  { id: 'aries', nameEn: 'Aries', nameAr: 'الحمل', symbol: '♈', element: 'fire',
    dateEn: 'Mar 21 – Apr 19', dateAr: '21 مارس – 19 أبريل',
    rulerEn: 'Mars', rulerAr: 'المريخ',
    strengthsEn: 'Courageous, pioneering, ambitious, decisive',
    strengthsAr: 'شجاع، مبادر، طموح، قيادي',
    weaknessesEn: 'Impulsive, impatient, short-tempered',
    weaknessesAr: 'مندفع، عدائي، قليل الصبر',
    color: '#ef4444' },
  { id: 'taurus', nameEn: 'Taurus', nameAr: 'الثور', symbol: '♉', element: 'earth',
    dateEn: 'Apr 20 – May 20', dateAr: '20 أبريل – 20 مايو',
    rulerEn: 'Venus', rulerAr: 'الزهرة',
    strengthsEn: 'Grounded, dependable, patient, appreciative of beauty',
    strengthsAr: 'مستقر، مخلص، عملي، يعشق الجمال',
    weaknessesEn: 'Stubborn, possessive, resistant to change',
    weaknessesAr: 'عنيد، مادي، يكره التغيير',
    color: '#10b981' },
  { id: 'gemini', nameEn: 'Gemini', nameAr: 'الجوزاء', symbol: '♊', element: 'air',
    dateEn: 'May 21 – Jun 20', dateAr: '21 مايو – 20 يونيو',
    rulerEn: 'Mercury', rulerAr: 'عطارد',
    strengthsEn: 'Intellectually curious, adaptable, articulate, versatile',
    strengthsAr: 'ذكي، مرن، متحدث بارع، فضولي',
    weaknessesEn: 'Inconsistent, superficial, easily distracted',
    weaknessesAr: 'متقلب، سطحي، يتشتت بسرعة',
    color: '#f59e0b' },
  { id: 'cancer', nameEn: 'Cancer', nameAr: 'السرطان', symbol: '♋', element: 'water',
    dateEn: 'Jun 21 – Jul 22', dateAr: '21 يونيو – 22 يوليو',
    rulerEn: 'Moon', rulerAr: 'القمر',
    strengthsEn: 'Nurturing, intuitive, protective, emotionally deep',
    strengthsAr: 'حدسي، حنون، حامي، عاطفي',
    weaknessesEn: 'Moody, over-sensitive, overly defensive',
    weaknessesAr: 'مزاجي، متملك، يتأثر بسرعة',
    color: '#3b82f6' },
  { id: 'leo', nameEn: 'Leo', nameAr: 'الأسد', symbol: '♌', element: 'fire',
    dateEn: 'Jul 23 – Aug 22', dateAr: '23 يوليو – 22 أغسطس',
    rulerEn: 'Sun', rulerAr: 'الشمس',
    strengthsEn: 'Charismatic, generous, confident, warm-hearted',
    strengthsAr: 'كريم، واثق، كاريزمي، حنون',
    weaknessesEn: 'Egocentric, domineering, recognition-seeking',
    weaknessesAr: 'مغرور، محب للظهور، متسلط',
    color: '#f97316' },
  { id: 'virgo', nameEn: 'Virgo', nameAr: 'العذراء', symbol: '♍', element: 'earth',
    dateEn: 'Aug 23 – Sep 22', dateAr: '23 أغسطس – 22 سبتمبر',
    rulerEn: 'Mercury', rulerAr: 'عطارد',
    strengthsEn: 'Analytical, meticulous, practical, service-oriented',
    strengthsAr: 'دقيق، تحليلي، منظم، خدوم',
    weaknessesEn: 'Overly critical, perfectionist, prone to anxiety',
    weaknessesAr: 'شديد الانتقاد، وسواسي، قلق',
    color: '#8b5cf6' },
  { id: 'libra', nameEn: 'Libra', nameAr: 'الميزان', symbol: '♎', element: 'air',
    dateEn: 'Sep 23 – Oct 22', dateAr: '23 سبتمبر – 22 أكتوبر',
    rulerEn: 'Venus', rulerAr: 'الزهرة',
    strengthsEn: 'Diplomatic, fair-minded, harmonious, refined',
    strengthsAr: 'دبلوماسي، عادل، راقي، اجتماعي',
    weaknessesEn: 'Indecisive, conflict-averse, superficial',
    weaknessesAr: 'متردد، يتهرب من المواجهة، مادي',
    color: '#ec4899' },
  { id: 'scorpio', nameEn: 'Scorpio', nameAr: 'العقرب', symbol: '♏', element: 'water',
    dateEn: 'Oct 23 – Nov 21', dateAr: '23 أكتوبر – 21 نوفمبر',
    rulerEn: 'Pluto / Mars', rulerAr: 'بلوتو / المريخ',
    strengthsEn: 'Perceptive, passionate, resilient, loyal',
    strengthsAr: 'عميق، حدسي، قوي الإرادة، مخلص',
    weaknessesEn: 'Suspicious, secretive, vengeful, controlling',
    weaknessesAr: 'شكاك، انتقامي، غامض، متملك',
    color: '#9333ea' },
  { id: 'sagittarius', nameEn: 'Sagittarius', nameAr: 'القوس', symbol: '♐', element: 'fire',
    dateEn: 'Nov 22 – Dec 21', dateAr: '22 نوفمبر – 21 ديسمبر',
    rulerEn: 'Jupiter', rulerAr: 'المشتري',
    strengthsEn: 'Philosophical, optimistic, adventurous, honest',
    strengthsAr: 'متفائل، مغامر، فلسفي، صادق',
    weaknessesEn: 'Blunt, tactless, restless, dogmatic',
    weaknessesAr: 'غير مسؤول، صريح بوقاحة، متهور',
    color: '#eab308' },
  { id: 'capricorn', nameEn: 'Capricorn', nameAr: 'الجدي', symbol: '♑', element: 'earth',
    dateEn: 'Dec 22 – Jan 19', dateAr: '22 ديسمبر – 19 يناير',
    rulerEn: 'Saturn', rulerAr: 'زحل',
    strengthsEn: 'Disciplined, pragmatic, strategic, persistent',
    strengthsAr: 'طموح، منضبط، حكيم، عملي',
    weaknessesEn: 'Rigid, overly cautious, emotionally reserved',
    weaknessesAr: 'صارم، بارد عاطفياً، تشاؤمي',
    color: '#94a3b8' },
  { id: 'aquarius', nameEn: 'Aquarius', nameAr: 'الدلو', symbol: '♒', element: 'air',
    dateEn: 'Jan 20 – Feb 18', dateAr: '20 يناير – 18 فبراير',
    rulerEn: 'Uranus / Saturn', rulerAr: 'أورانوس / زحل',
    strengthsEn: 'Innovative, humanitarian, independent, visionary',
    strengthsAr: 'مبتكر، إنساني، مستقل، غير تقليدي',
    weaknessesEn: 'Detached, rebellious, emotionally aloof',
    weaknessesAr: 'منفصل عاطفياً، متمرد، متزمت برأيه',
    color: '#06b6d4' },
  { id: 'pisces', nameEn: 'Pisces', nameAr: 'الحوت', symbol: '♓', element: 'water',
    dateEn: 'Feb 19 – Mar 20', dateAr: '19 فبراير – 20 مارس',
    rulerEn: 'Neptune / Jupiter', rulerAr: 'نبتون / المشتري',
    strengthsEn: 'Empathetic, imaginative, spiritually inclined, compassionate',
    strengthsAr: 'خيالي، رحيم، حدسي، روحاني',
    weaknessesEn: 'Escapist, boundary-lacking, prone to martyrdom',
    weaknessesAr: 'هروبي، يتقمص دور الضحية، غير واقعي',
    color: '#6366f1' },
]

const planets = [
  { id: 'sun', nameEn: 'Sun', nameAr: 'الشمس', symbol: '☉', category: 'personal',
    meaningEn: 'Core identity, vital energy, ego, and life purpose.',
    meaningAr: 'الهوية، الجوهر، الإرادة، الوعي الأساسي وطاقة الحياة.',
    rulerEn: 'Ruler of Leo', rulerAr: 'حاكم الأسد', color: '#f59e0b' },
  { id: 'moon', nameEn: 'Moon', nameAr: 'القمر', symbol: '☾', category: 'personal',
    meaningEn: 'Subconscious mind, emotional needs, instincts, and maternal connection.',
    meaningAr: 'المشاعر، اللاوعي، الأمان الداخلي، الطفولة النفسية.',
    rulerEn: 'Ruler of Cancer', rulerAr: 'حاكم السرطان', color: '#93c5fd' },
  { id: 'mercury', nameEn: 'Mercury', nameAr: 'عطارد', symbol: '☿', category: 'personal',
    meaningEn: 'Intellect, communication patterns, reasoning, and information processing.',
    meaningAr: 'العقل، التفكير، التواصل، اللغة والتحليل.',
    rulerEn: 'Ruler of Gemini & Virgo', rulerAr: 'حاكم الجوزاء والعذراء', color: '#fcd34d' },
  { id: 'venus', nameEn: 'Venus', nameAr: 'الزهرة', symbol: '♀', category: 'personal',
    meaningEn: 'Values, relationships, aesthetic preferences, harmony, and attraction.',
    meaningAr: 'الحب، الجمال، العلاقات، الذوق، القيم.',
    rulerEn: 'Ruler of Taurus & Libra', rulerAr: 'حاكمة الثور والميزان', color: '#f9a8d4' },
  { id: 'mars', nameEn: 'Mars', nameAr: 'المريخ', symbol: '♂', category: 'personal',
    meaningEn: 'Drive, ambition, physical energy, assertiveness, and response to conflict.',
    meaningAr: 'الطاقة، الغضب، الشجاعة، الدافع والرغبة.',
    rulerEn: 'Ruler of Aries', rulerAr: 'حاكم الحمل', color: '#ef4444' },
  { id: 'jupiter', nameEn: 'Jupiter', nameAr: 'المشتري', symbol: '♃', category: 'social',
    meaningEn: 'Expansion, wisdom, higher education, philosophy, and good fortune.',
    meaningAr: 'التوسع، الحظ، الإيمان، الحكمة والنمو.',
    rulerEn: 'Ruler of Sagittarius', rulerAr: 'حاكم القوس', color: '#22d3ee' },
  { id: 'saturn', nameEn: 'Saturn', nameAr: 'زحل', symbol: '♄', category: 'social',
    meaningEn: 'Discipline, karmic lessons, boundaries, maturity, and long-term structure.',
    meaningAr: 'الدروس، القيود، النضج، المسؤولية، الزمن.',
    rulerEn: 'Ruler of Capricorn', rulerAr: 'حاكم الجدي', color: '#94a3b8' },
  { id: 'uranus', nameEn: 'Uranus', nameAr: 'أورانوس', symbol: '♅', category: 'transpersonal',
    meaningEn: 'Innovation, sudden breakthroughs, rebellion, and technological evolution.',
    meaningAr: 'التغيير، الثورة، الحرية، الصدمات المفاجئة.',
    rulerEn: 'Ruler of Aquarius', rulerAr: 'حاكم الدلو', color: '#06b6d4' },
  { id: 'neptune', nameEn: 'Neptune', nameAr: 'نبتون', symbol: '♆', category: 'transpersonal',
    meaningEn: 'Dreams, spirituality, illusion, artistic inspiration, and transcendence.',
    meaningAr: 'الروحانية، الأحلام، الخيال، الذوبان، الغموض.',
    rulerEn: 'Ruler of Pisces', rulerAr: 'حاكم الحوت', color: '#6366f1' },
  { id: 'pluto', nameEn: 'Pluto', nameAr: 'بلوتو', symbol: '♇', category: 'transpersonal',
    meaningEn: 'Deep psychological transformation, power dynamics, rebirth, and regeneration.',
    meaningAr: 'التحول العميق، الموت الرمزي، القوة الخفية، التجدد.',
    rulerEn: 'Ruler of Scorpio', rulerAr: 'حاكم العقرب', color: '#a855f7' },
]

const asteroids = [
  { id: 'lilith', nameEn: 'Lilith (Black Moon)', nameAr: 'ليليث', symbol: '⚸',
    meaningEn: 'Rebellious and repressed side, suppressed desires, unsubmissive feminine power, psychological shadow.',
    meaningAr: 'الجانب المتمرد والمقموع، الرغبات المكبوتة، القوة الأنثوية غير الخاضعة، الظل النفسي.',
    color: '#a855f7' },
  { id: 'ceres', nameEn: 'Ceres', nameAr: 'سيريس', symbol: '⚳',
    meaningEn: 'Care, motherhood, giving, nourishment.',
    meaningAr: 'الرعاية، الأمومة، العطاء، التغذية.',
    color: '#10b981' },
  { id: 'pallas', nameEn: 'Pallas', nameAr: 'بالاس', symbol: '⚴',
    meaningEn: 'Wisdom, strategy, analytical intelligence.',
    meaningAr: 'الحكمة، الاستراتيجية، الذكاء التحليلي.',
    color: '#3b82f6' },
  { id: 'vesta', nameEn: 'Vesta', nameAr: 'فيستا', symbol: '⚵',
    meaningEn: 'Focus, commitment, inner rituals.',
    meaningAr: 'التركيز، الالتزام، الطقوس الداخلية.',
    color: '#f59e0b' },
  { id: 'chiron', nameEn: 'Chiron', nameAr: 'تشيرون', symbol: '⚷',
    meaningEn: 'Inner wounds and deep healing.',
    meaningAr: 'الجراح الداخلية والشفاء العميق.',
    color: '#fcd34d' },
  { id: 'north-node', nameEn: 'North Node', nameAr: 'العقدة الشمالية', symbol: '☊',
    meaningEn: 'Spiritual direction and future development.',
    meaningAr: 'الاتجاه الروحي والتطور المستقبلي.',
    color: '#22d3ee' },
  { id: 'south-node', nameEn: 'South Node', nameAr: 'العقدة الجنوبية', symbol: '☋',
    meaningEn: 'Past, habits, old karma.',
    meaningAr: 'الماضي، العادات، الكارما القديمة.',
    color: '#94a3b8' },
]

const houses = [
  { id: 'house1', number: 'I', nameEn: '1st House (Ascendant)', nameAr: 'البيت الأول (الطالع)',
    meaningEn: 'Physical appearance, first impressions, identity, and general vitality.',
    meaningAr: 'الذات، المظهر الخارجي، الانطباع الأول، والشخصية التي يراها الناس.',
    color: '#ef4444' },
  { id: 'house2', number: 'II', nameEn: '2nd House', nameAr: 'البيت الثاني',
    meaningEn: 'Personal finances, tangible assets, values, and self-worth.',
    meaningAr: 'الأموال الشخصية، الممتلكات، القيم النفسية، والتقدير الذاتي.',
    color: '#10b981' },
  { id: 'house3', number: 'III', nameEn: '3rd House', nameAr: 'البيت الثالث',
    meaningEn: 'Local environment, siblings, short journeys, learning styles, everyday communication.',
    meaningAr: 'التواصل، الأخوة، الجيران، الدراسات البسيطة، والتفكير العملي.',
    color: '#f59e0b' },
  { id: 'house4', number: 'IV', nameEn: '4th House (IC)', nameAr: 'البيت الرابع',
    meaningEn: 'Home, family, ancestral roots, private life, foundational security.',
    meaningAr: 'المنزل، العائلة، الأصول، الجذور، الشعور بالأمان.',
    color: '#3b82f6' },
  { id: 'house5', number: 'V', nameEn: '5th House', nameAr: 'البيت الخامس',
    meaningEn: 'Creative expression, romance, joy, hobbies, children, and risk-taking.',
    meaningAr: 'الإبداع، الحب والمغامرات العاطفية، الأطفال، الهوايات، والمتعة.',
    color: '#ec4899' },
  { id: 'house6', number: 'VI', nameEn: '6th House', nameAr: 'البيت السادس',
    meaningEn: 'Daily routines, health, work habits, service, and wellness practices.',
    meaningAr: 'الصحة اليومية، الروتين، العمل اليومي، والخدمة.',
    color: '#8b5cf6' },
  { id: 'house7', number: 'VII', nameEn: '7th House (Descendant)', nameAr: 'البيت السابع',
    meaningEn: 'Committed relationships, marriage, business partnerships, open contracts.',
    meaningAr: 'العلاقات والشراكات، الزواج، العدالة والأعداء المعلنون.',
    color: '#06b6d4' },
  { id: 'house8', number: 'VIII', nameEn: '8th House', nameAr: 'البيت الثامن',
    meaningEn: 'Shared finances, intimacy, deep psychological transformation, rebirth.',
    meaningAr: 'التحولات الكبرى، الأموال المشتركة، المواريث، العلوم الباطنية.',
    color: '#9333ea' },
  { id: 'house9', number: 'IX', nameEn: '9th House', nameAr: 'البيت التاسع',
    meaningEn: 'Higher education, long-distance travel, philosophy, belief systems, publishing.',
    meaningAr: 'السفر البعيد، التعليم العالي، الفلسفة، الدين، والعدل.',
    color: '#f97316' },
  { id: 'house10', number: 'X', nameEn: '10th House (MC)', nameAr: 'البيت العاشر',
    meaningEn: 'Career path, public reputation, ambitions, authority, life purpose.',
    meaningAr: 'المهنة، السمعة العامة، الطموح، والإنجازات الاجتماعية.',
    color: '#f43f5e' },
  { id: 'house11', number: 'XI', nameEn: '11th House', nameAr: 'البيت الحادي عشر',
    meaningEn: 'Social circles, community, long-term aspirations, networks.',
    meaningAr: 'الأصدقاء، الشبكات الاجتماعية، الأهداف المستقبلية.',
    color: '#6366f1' },
  { id: 'house12', number: 'XII', nameEn: '12th House', nameAr: 'البيت الثاني عشر',
    meaningEn: 'Unconscious mind, solitude, spiritual awakening, hidden matters.',
    meaningAr: 'العقل الباطن، العزلة، الروحانيات، الأسرار، وإنهاء الدورات.',
    color: '#a78bfa' },
]

const aspects = [
  { id: 'conjunction', nameEn: 'Conjunction', nameAr: 'اقتران', symbol: '☌', angle: '0°',
    meaningEn: 'Planets unite — a fusion of energies, often intense and inseparable.',
    meaningAr: 'دمج طاقة قوية، توحد الكواكب، طاقة مكثفة ومتلازمة.',
    color: '#94a3b8' },
  { id: 'sextile', nameEn: 'Sextile', nameAr: 'تسديس', symbol: '⚹', angle: '60°',
    meaningEn: 'Opportunities and balance, positive potentials that flow easily.',
    meaningAr: 'فرص وتوازن، إمكانيات إيجابية تتدفق بسهولة.',
    color: '#f59e0b' },
  { id: 'square', nameEn: 'Square', nameAr: 'تربيع', symbol: '□', angle: '90°',
    meaningEn: 'Tension and internal conflict — challenges that drive growth.',
    meaningAr: 'توتر وصراع داخلي، تحديات للنمو.',
    color: '#ef4444' },
  { id: 'trine', nameEn: 'Trine', nameAr: 'تثليث', symbol: '△', angle: '120°',
    meaningEn: 'Natural harmony, smooth energy flow, innate talents.',
    meaningAr: 'انسجام طبيعي، تدفق سلس للطاقة، مواهب فطرية.',
    color: '#10b981' },
  { id: 'opposition', nameEn: 'Opposition', nameAr: 'مقابلة', symbol: '☍', angle: '180°',
    meaningEn: 'Pull and push — balance between two polarities.',
    meaningAr: 'شد وجذب، توازن بين قطبين متقابلين.',
    color: '#3b82f6' },
]

const retrogrades = [
  { id: 'mercury-rx', nameEn: 'Mercury Retrograde', nameAr: 'تراجع عطارد', frequencyEn: '3–4 times per year', frequencyAr: '3–4 مرات في السنة',
    meaningEn: 'Miscommunications, technological glitches, travel delays, and the re-emergence of past contacts. Ideal for reviewing, editing, and reflection — not for launching new ventures.',
    meaningAr: 'سوء الفهم، أعطال الأجهزة، تأخر الرحلات، عودة أشخاص من الماضي. الأفضل: التخطيط، المراجعة، وإعادة التفكير — وليس البدء بمشاريع جديدة.',
    color: '#fcd34d' },
  { id: 'venus-rx', nameEn: 'Venus Retrograde', nameAr: 'تراجع الزهرة', frequencyEn: 'Every 18 months', frequencyAr: 'كل 18 شهراً',
    meaningEn: 'Re-evaluation of relationships, self-worth, personal finances, and artistic choices. Ideal for healing past dynamics and reassessing values.',
    meaningAr: 'اختبار العلاقات، إعادة تقييم القيم والمال، عودة العلاقات القديمة لإنهاء الملفات المعلقة.',
    color: '#f9a8d4' },
  { id: 'mars-rx', nameEn: 'Mars Retrograde', nameAr: 'تراجع المريخ', frequencyEn: 'Every 2 years', frequencyAr: 'كل سنتين',
    meaningEn: 'Dip in physical energy, internal frustration, delayed projects. Ideal for refining strategies rather than launching attacks.',
    meaningAr: 'هبوط في الطاقة والدافع، إحباط، صعوبة في دفع المشاريع للأمام. الأفضل: إعادة ضبط الاستراتيجيات.',
    color: '#ef4444' },
  { id: 'saturn-rx', nameEn: 'Saturn Retrograde', nameAr: 'تراجع زحل', frequencyEn: '~4.5 to 5 months annually', frequencyAr: 'حوالي 4.5 إلى 5 أشهر سنوياً',
    meaningEn: 'Saturn is the cosmic taskmaster of structure, limits, and responsibility. When it turns retrograde, the focus shifts inward to audit your long-term foundations. It forces an evaluation of boundaries, commitments, and self-discipline — asking whether your current life structures are truly sustainable.',
    meaningAr: 'زحل هو كوكب الانضباط والحدود. أثناء تراجعه، يجبرك الكون على إلقاء نظرة جادة على مسؤولياتك وتحديد ما إذا كانت الخطة التي تسيرين عليها مستدامة أم لا. إنه وقت إعادة بناء القواعد الشخصية والتأكد من قوة الأساسات.',
    color: '#94a3b8' },
  { id: 'jupiter-rx', nameEn: 'Jupiter Retrograde', nameAr: 'تراجع المشتري', frequencyEn: '~4 months annually', frequencyAr: 'حوالي 4 أشهر سنوياً',
    meaningEn: 'As the planet of expansion, belief systems, and optimism, Jupiter Retrograde invites internal spiritual growth. Rather than pursuing external opportunities, this period prompts a reassessment of personal ethics, core beliefs, and wisdom — ensuring that your pursuit of abundance aligns with your true purpose.',
    meaningAr: 'المشتري كوكب التوسع والحظ. يتراجع ليعيد تعريف معنى "النمو" لديكِ. بدلاً من التوسع الخارجي، يركز التراجع على النمو الروحي والفلسفي الداخلي، ويطلب منكِ مراجعة معتقداتك وقيمكِ قبل البدء بفرص جديدة.',
    color: '#22d3ee' },
  { id: 'uranus-rx', nameEn: 'Uranus Retrograde', nameAr: 'تراجع أورانوس', frequencyEn: '~5 months annually', frequencyAr: 'حوالي 5 أشهر سنوياً',
    meaningEn: 'Uranus governs innovation, rebellion, and sudden breakthroughs. During its retrograde phase, radical change occurs internally. It encourages you to break free from self-imposed limitations, shed outdated conditioning, and embrace your authentic individuality quietly before expressing it publicly.',
    meaningAr: 'أورانوس كوكب التغيير المفاجئ والحرية. أثناء تراجعه، تتجه الثورة والتغيير إلى الداخل. إنه الوقت الذي تتحررين فيه من القيود النفسية القديمة والمفاهيم المكتسبة التي تمنعكِ من التعبير عن أصالتكِ.',
    color: '#06b6d4' },
  { id: 'neptune-rx', nameEn: 'Neptune Retrograde', nameAr: 'تراجع نبتون', frequencyEn: '~5 months annually', frequencyAr: 'حوالي 5 أشهر سنوياً',
    meaningEn: 'Neptune rules spirituality, dreams, and illusions. Its retrograde period acts as a reality check — dissolving rose-tinted glasses and exposing illusions. It is a powerful time for spiritual discernment, face-to-face honesty, and artistic reflection.',
    meaningAr: 'نبتون كوكب الأوهام والأحلام والروحانيات. يعمل تراجعه كإزالة للغشاوة عن العينين؛ يرفع أغطية الوهم لتنظري إلى الأوضاع والعلاقات بحقيقتها دون تجميل أو هروب.',
    color: '#6366f1' },
  { id: 'pluto-rx', nameEn: 'Pluto Retrograde', nameAr: 'تراجع بلوتو', frequencyEn: '~5 to 6 months annually', frequencyAr: 'حوالي 5 إلى 6 أشهر سنوياً',
    meaningEn: 'Pluto represents power, rebirth, and psychological depth. Pluto Retrograde demands profound shadow work. It invites you to confront subconscious fears, let go of toxic attachments, and release control mechanisms to facilitate genuine personal rebirth.',
    meaningAr: 'كوكب التحول والعمق. يتطلب تراجعه مواجهة الظلال النفسية (Shadow Work)، مخاوف الفقدان، ومسائل التحكم والسيطرة، ليُعيدكِ إلى قوتكِ الذاتية الحقيقية بعد التخلي عما لم يعد يخدمكِ.',
    color: '#a855f7' },
]

const advancedConcepts = [
  { id: 'angles', nameEn: 'The Four Angles of the Chart', nameAr: 'زوايا الخريطة الأربعة',
    meaningEn: 'Ascendant (ASC / 1st House): The outer persona, physical vitality, and the lens through which you view the world.\n\nDescendant (DSC / 7th House): The qualities you seek in partnerships and committed relationships.\n\nMidheaven (MC / 10th House): Public reputation, career aspirations, and social standing.\n\nImum Coeli (IC / 4th House): Private life, psychological roots, ancestry, and emotional security.',
    meaningAr: 'الطالع (ASC / البيت الأول): قناعكِ الخارجي، بداية جسدكِ، والوجه الذي تقابلين به العالم.\n\nمقابل الطالع (DSC / البيت السابع): نوع الشراكات والعلاقات التي تنجذبين إليها.\n\nمنتصف السماء (MC / البيت العاشر): ذروة طموحكِ وصورتكِ العامة وسيرتكِ المهنية.\n\nقاع السماء (IC / البيت الرابع): أصولكِ وعائلتكِ وعالمكِ الداخلي الخاص بعيداً عن أعين الناس.',
    color: '#d4af6a' },
  { id: 'nodes', nameEn: 'The Lunar Nodes (Rahu & Ketu)', nameAr: 'العقد القمرية: راهو وكتو',
    meaningEn: 'North Node (Rahu): Represents your soul\'s future lessons, karmic purpose, and areas of growth to embrace in this lifetime.\n\nSouth Node (Ketu): Represents past comfort zones, innate talents, and karmic patterns that must be integrated rather than over-relied upon.',
    meaningAr: 'العقدة الشمالية (Rahu): تمثل المستقبل والهدف الكارمي؛ الاتجاه الذي يجب أن تتطوري نحوه في هذه الحياة رغم أنه قد يبدو غير مألوف في البداية.\n\nالعقدة الجنوبية (Ketu): تمثل الماضي والمواهب المكتسبة؛ المنطقة التي ترتاحين فيها، ولكن البقاء فيها يسبب الركود.',
    color: '#c090e0' },
  { id: 'aspects-advanced', nameEn: 'Planetary Aspects (Advanced)', nameAr: 'الاتصالات الفلكية (متقدم)',
    meaningEn: 'Conjunction (0°): Fusion of two planetary energies operating together.\n\nTrine (120°): Harmonious flow of energy, talent, and natural ease.\n\nSextile (60°): Supportive energy that creates opportunities requiring conscious action.\n\nSquare (90°): Friction and tension that drive inner growth, resilience, and action.\n\nOpposition (180°): Polarizing energy highlighting the need for balance and integration.',
    meaningAr: 'الاقتران (0°): اندماج كامل للطاقات.\n\nالتثليث (120°): تدفق سلس وسهل للطاقة بين الكواكب (حظ ومواهب طبيعية).\n\nالتسديس (60°): فرص وتناغم يتطلبان بذل القليل من المجهود لاستغلالهما.\n\nالتربيع (90°): توتر وضغط بين كوكبين يجبرانكِ على التطور والعمل العملي.\n\nالمقابلة (180°): شد وجذب بين طرفين يحتاج إلى إيجاد توازن وحلول وسط.',
    color: '#7cc7f0' },
  { id: 'saturn-return', nameEn: 'The Saturn Return', nameAr: 'عودة زحل',
    meaningEn: 'Occurring around ages 27–30 and 57–60, the Saturn Return marks a pivotal astrological rite of passage. As Saturn returns to its exact natal placement, it dismantles fragile structures and demands full accountability, career clarity, and emotional maturity.',
    meaningAr: 'تحدث هذه الظاهرة عندما يعود كوكب زحل إلى نفس الموقع والدرجة التي كان عليها لحظة ولادتكِ (تحدث بين سن 27-30 وثانية بين 57-60). تُعتبر هذه الفترة مرحلة النضج الكبرى ودخول مرحلة البلوغ الحقيقي، حيث تسقط البنى غير الثابتة وتتحملين المسؤولية الكاملة عن خياراتكِ المهنية والعاطفية.',
    color: '#6ee7b7' },
]

/* ============================================================
   PAGE
   ============================================================ */
type TabKey = 'intro' | 'zodiac' | 'planets' | 'asteroids' | 'houses' | 'aspects' | 'retrogrades' | 'advanced'
type Selected = { type: TabKey; data: any } | null

export default function AstralCharts() {
  const router = useRouter()
  const { language, toggleLanguage } = useLanguage()
  const [activeTab, setActiveTab] = useState<TabKey>('intro')
  const [selected, setSelected] = useState<Selected>(null)

  const tabs: { key: TabKey; labelEn: string; labelAr: string; Icon: any; color: string }[] = [
    { key: 'intro',       labelEn: 'Overview',    labelAr: 'نظرة عامة',   Icon: BookIcon,        color: '#d4af6a' },
    { key: 'zodiac',      labelEn: 'Zodiac',      labelAr: 'الأبراج',      Icon: ZodiacIcon,      color: '#a5b4fc' },
    { key: 'planets',     labelEn: 'Planets',     labelAr: 'الكواكب',      Icon: PlanetIcon,      color: '#7cc7f0' },
    { key: 'asteroids',   labelEn: 'Asteroids',   labelAr: 'الكويكبات',    Icon: AsteroidIcon,    color: '#c090e0' },
    { key: 'houses',      labelEn: 'Houses',      labelAr: 'البيوت',       Icon: HouseIcon,       color: '#6ee7b7' },
    { key: 'aspects',     labelEn: 'Aspects',     labelAr: 'الزوايا',      Icon: AspectIcon,      color: '#f0a6c8' },
    { key: 'retrogrades', labelEn: 'Retrogrades', labelAr: 'التراجعات',    Icon: RetrogradeIcon,  color: '#fcd34d' },
    { key: 'advanced',    labelEn: 'Advanced',    labelAr: 'متقدم',        Icon: AspectIcon,      color: '#6ee7b7' },
  ]

  const currentTab = tabs.find(t => t.key === activeTab)!
  const accent = currentTab.color

  const renderIntro = () => {
    const paragraphs = language === 'en' ? introParagraphsEn : introParagraphsAr
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {paragraphs.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className="rounded-2xl p-6 border relative overflow-hidden"
            style={{
              background: 'linear-gradient(160deg, rgba(15,12,8,0.7), rgba(8,6,3,0.9))',
              borderColor: `${p.color}33`,
            }}
          >
            <span className="absolute top-3 left-3 w-3 h-3 border-l border-t" style={{ borderColor: `${p.color}66` }} />
            <span className="absolute top-3 right-3 w-3 h-3 border-r border-t" style={{ borderColor: `${p.color}66` }} />
            <span className="absolute bottom-3 left-3 w-3 h-3 border-l border-b" style={{ borderColor: `${p.color}66` }} />
            <span className="absolute bottom-3 right-3 w-3 h-3 border-r border-b" style={{ borderColor: `${p.color}66` }} />

            <h3 className="text-lg md:text-xl font-serif tracking-widest uppercase mb-4" style={{ color: p.color, textShadow: `0 0 15px ${p.color}66` }}>
              {p.title}
            </h3>
            <p className="text-[#c7beaa]/90 text-sm leading-relaxed font-light">{p.body}</p>
          </motion.div>
        ))}
      </div>
    )
  }

  const renderZodiac = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {zodiacSigns.map((sign, idx) => (
        <motion.button
          key={sign.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.03 }}
          whileHover={{ scale: 1.02, y: -3 }}
          onClick={() => setSelected({ type: 'zodiac', data: sign })}
          className="text-left rounded-xl p-5 border relative overflow-hidden transition-all duration-300"
          style={{
            background: 'linear-gradient(160deg, rgba(20,16,10,0.7), rgba(8,6,3,0.9))',
            borderColor: `${sign.color}33`,
          }}
        >
          <span className="absolute top-2 left-2 w-2.5 h-2.5 border-l border-t" style={{ borderColor: `${sign.color}55` }} />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 border-r border-t" style={{ borderColor: `${sign.color}55` }} />
          <div className="text-center">
            <div className="text-4xl mb-2 font-serif" style={{ color: sign.color, textShadow: `0 0 15px ${sign.color}88` }}>
              {sign.symbol}
            </div>
            <h3 className="text-[#f4efe2] font-serif text-base tracking-wide">
              {language === 'en' ? sign.nameEn : sign.nameAr}
            </h3>
            <p className="text-[#c7beaa]/60 text-[10px] mt-1 font-mono">
              {language === 'en' ? sign.dateEn : sign.dateAr}
            </p>
            <div className="mt-3 inline-block px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-[0.2em] font-serif"
              style={{ color: sign.color, border: `1px solid ${sign.color}44`, background: `${sign.color}12` }}>
              {language === 'en' ? sign.element
                : sign.element === 'fire' ? 'ناري'
                : sign.element === 'earth' ? 'ترابي'
                : sign.element === 'air' ? 'هوائي' : 'مائي'}
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  )

  const renderPlanets = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {planets.map((planet, idx) => (
        <motion.button
          key={planet.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.04 }}
          whileHover={{ scale: 1.02, y: -3 }}
          onClick={() => setSelected({ type: 'planets', data: planet })}
          className="text-left rounded-xl p-5 border transition-all duration-300 flex items-start gap-4"
          style={{
            background: 'linear-gradient(160deg, rgba(15,12,8,0.7), rgba(8,6,3,0.9))',
            borderColor: `${planet.color}33`,
          }}
        >
          <div className="shrink-0 w-14 h-14 rounded-full flex items-center justify-center border font-serif text-2xl"
            style={{ color: planet.color, borderColor: `${planet.color}55`, background: `${planet.color}10`, textShadow: `0 0 15px ${planet.color}88` }}>
            {planet.symbol}
          </div>
          <div className="flex-1">
            <h3 className="text-[#f4efe2] font-serif text-base tracking-wide">
              {language === 'en' ? planet.nameEn : planet.nameAr}
            </h3>
            <p className="text-[9px] tracking-[0.2em] uppercase mt-0.5 font-serif" style={{ color: `${planet.color}aa` }}>
              {language === 'en' ? planet.rulerEn : planet.rulerAr}
            </p>
            <p className="text-[#c7beaa]/75 text-xs mt-2 leading-relaxed font-light">
              {language === 'en' ? planet.meaningEn : planet.meaningAr}
            </p>
          </div>
        </motion.button>
      ))}
    </div>
  )

  const renderAsteroids = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {asteroids.map((item, idx) => (
        <motion.button
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          whileHover={{ scale: 1.01, y: -3 }}
          onClick={() => setSelected({ type: 'asteroids', data: item })}
          className="text-left rounded-xl p-5 border transition-all duration-300 flex items-start gap-4"
          style={{
            background: 'linear-gradient(160deg, rgba(15,12,8,0.7), rgba(8,6,3,0.9))',
            borderColor: `${item.color}33`,
          }}
        >
          <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center border font-serif text-xl"
            style={{ color: item.color, borderColor: `${item.color}55`, background: `${item.color}10` }}>
            {item.symbol}
          </div>
          <div className="flex-1">
            <h3 className="text-[#f4efe2] font-serif text-base tracking-wide">
              {language === 'en' ? item.nameEn : item.nameAr}
            </h3>
            <p className="text-[#c7beaa]/75 text-xs mt-2 leading-relaxed font-light">
              {language === 'en' ? item.meaningEn : item.meaningAr}
            </p>
          </div>
        </motion.button>
      ))}
    </div>
  )

  const renderHouses = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {houses.map((house, idx) => (
        <motion.button
          key={house.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.03 }}
          whileHover={{ scale: 1.02, y: -3 }}
          onClick={() => setSelected({ type: 'houses', data: house })}
          className="text-left rounded-xl p-4 border transition-all duration-300"
          style={{
            background: 'linear-gradient(160deg, rgba(15,12,8,0.7), rgba(8,6,3,0.9))',
            borderColor: `${house.color}33`,
          }}
        >
          <div className="text-center">
            <div className="text-2xl font-serif tracking-widest" style={{ color: house.color, textShadow: `0 0 12px ${house.color}88` }}>
              {house.number}
            </div>
            <h3 className="text-[#f4efe2] text-xs mt-2 tracking-wide leading-tight">
              {language === 'en' ? house.nameEn : house.nameAr}
            </h3>
          </div>
        </motion.button>
      ))}
    </div>
  )

  const renderAspects = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {aspects.map((aspect, idx) => (
        <motion.button
          key={aspect.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          whileHover={{ scale: 1.02, y: -3 }}
          onClick={() => setSelected({ type: 'aspects', data: aspect })}
          className="text-left rounded-xl p-5 border transition-all duration-300"
          style={{
            background: 'linear-gradient(160deg, rgba(15,12,8,0.7), rgba(8,6,3,0.9))',
            borderColor: `${aspect.color}33`,
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-[#f4efe2] font-serif text-base tracking-wide">
                {language === 'en' ? aspect.nameEn : aspect.nameAr}
              </h3>
              <p className="text-[10px] font-mono mt-0.5" style={{ color: `${aspect.color}cc` }}>
                {aspect.symbol} • {aspect.angle}
              </p>
            </div>
            <div className="text-3xl font-serif" style={{ color: `${aspect.color}88` }}>
              {aspect.symbol}
            </div>
          </div>
          <p className="text-[#c7beaa]/75 text-xs leading-relaxed font-light">
            {language === 'en' ? aspect.meaningEn : aspect.meaningAr}
          </p>
        </motion.button>
      ))}
    </div>
  )

  const renderRetrogrades = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {retrogrades.map((rx, idx) => (
        <motion.button
          key={rx.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.06 }}
          whileHover={{ scale: 1.01, y: -3 }}
          onClick={() => setSelected({ type: 'retrogrades', data: rx })}
          className="text-left rounded-2xl p-6 border relative overflow-hidden transition-all duration-300"
          style={{
            background: 'linear-gradient(160deg, rgba(15,12,8,0.75), rgba(8,6,3,0.92))',
            borderColor: `${rx.color}33`,
          }}
        >
          <span className="absolute top-3 left-3 w-3 h-3 border-l border-t" style={{ borderColor: `${rx.color}66` }} />
          <span className="absolute top-3 right-3 w-3 h-3 border-r border-t" style={{ borderColor: `${rx.color}66` }} />
          <span className="absolute bottom-3 left-3 w-3 h-3 border-l border-b" style={{ borderColor: `${rx.color}66` }} />
          <span className="absolute bottom-3 right-3 w-3 h-3 border-r border-b" style={{ borderColor: `${rx.color}66` }} />

          <div className="flex items-center gap-3 mb-3">
            <div className="shrink-0"><RetrogradeIcon color={rx.color} /></div>
            <div>
              <h3 className="text-base md:text-lg font-serif tracking-wide uppercase" style={{ color: rx.color, textShadow: `0 0 12px ${rx.color}66` }}>
                {language === 'en' ? rx.nameEn : rx.nameAr}
              </h3>
              <p className="text-[10px] tracking-widest uppercase font-serif" style={{ color: `${rx.color}aa` }}>
                {language === 'en' ? rx.frequencyEn : rx.frequencyAr}
              </p>
            </div>
          </div>
          <p className="text-[#c7beaa]/85 text-sm leading-relaxed font-light">
            {language === 'en' ? rx.meaningEn : rx.meaningAr}
          </p>
        </motion.button>
      ))}
    </div>
  )

  const renderAdvanced = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {advancedConcepts.map((item, idx) => (
        <motion.button
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.08 }}
          whileHover={{ scale: 1.01, y: -3 }}
          onClick={() => setSelected({ type: 'advanced', data: item })}
          className="text-left rounded-2xl p-6 border relative overflow-hidden transition-all duration-300"
          style={{
            background: 'linear-gradient(160deg, rgba(15,12,8,0.75), rgba(8,6,3,0.92))',
            borderColor: `${item.color}33`,
          }}
        >
          <span className="absolute top-3 left-3 w-3 h-3 border-l border-t" style={{ borderColor: `${item.color}66` }} />
          <span className="absolute top-3 right-3 w-3 h-3 border-r border-t" style={{ borderColor: `${item.color}66` }} />
          <span className="absolute bottom-3 left-3 w-3 h-3 border-l border-b" style={{ borderColor: `${item.color}66` }} />
          <span className="absolute bottom-3 right-3 w-3 h-3 border-r border-b" style={{ borderColor: `${item.color}66` }} />

          <div className="flex items-center gap-3 mb-3">
            <div className="shrink-0"><AspectIcon color={item.color} /></div>
            <h3 className="text-base md:text-lg font-serif tracking-wide uppercase" style={{ color: item.color, textShadow: `0 0 12px ${item.color}66` }}>
              {language === 'en' ? item.nameEn : item.nameAr}
            </h3>
          </div>
          <p className="text-[#c7beaa]/85 text-sm leading-relaxed font-light whitespace-pre-line">
            {language === 'en' ? item.meaningEn : item.meaningAr}
          </p>
        </motion.button>
      ))}
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'intro': return renderIntro()
      case 'zodiac': return renderZodiac()
      case 'planets': return renderPlanets()
      case 'asteroids': return renderAsteroids()
      case 'houses': return renderHouses()
      case 'aspects': return renderAspects()
      case 'retrogrades': return renderRetrogrades()
      case 'advanced': return renderAdvanced()
      default: return null
    }
  }

  const renderModalBody = () => {
    if (!selected) return null
    const d = selected.data
    const type = selected.type

    if (type === 'zodiac') {
      return (
        <div className="space-y-3">
          <div className="rounded-xl p-4 border" style={{ background: 'rgba(0,0,0,0.4)', borderColor: `${d.color}33` }}>
            <p className="text-[10px] tracking-widest uppercase font-mono mb-1" style={{ color: d.color }}>
              {language === 'en' ? 'Alignment Period' : 'فترة المحاذاة'}
            </p>
            <p className="text-[#f4efe2] text-sm">{language === 'en' ? d.dateEn : d.dateAr}</p>
          </div>
          <div className="rounded-xl p-4 border" style={{ background: 'rgba(0,0,0,0.4)', borderColor: `${d.color}33` }}>
            <p className="text-[10px] tracking-widest uppercase font-mono mb-1" style={{ color: d.color }}>
              {language === 'en' ? 'Ruling Planet' : 'الكوكب الحاكم'}
            </p>
            <p className="text-[#f4efe2] text-sm">{language === 'en' ? d.rulerEn : d.rulerAr}</p>
          </div>
          <div className="rounded-xl p-4 border" style={{ background: 'rgba(0,0,0,0.4)', borderColor: `${d.color}33` }}>
            <p className="text-[10px] tracking-widest uppercase font-mono mb-1" style={{ color: d.color }}>
              {language === 'en' ? 'Strengths' : 'الإيجابيات'}
            </p>
            <p className="text-[#c7beaa] text-sm leading-relaxed">{language === 'en' ? d.strengthsEn : d.strengthsAr}</p>
          </div>
          <div className="rounded-xl p-4 border" style={{ background: 'rgba(0,0,0,0.4)', borderColor: `${d.color}33` }}>
            <p className="text-[10px] tracking-widest uppercase font-mono mb-1" style={{ color: d.color }}>
              {language === 'en' ? 'Weaknesses' : 'السلبيات'}
            </p>
            <p className="text-[#c7beaa] text-sm leading-relaxed">{language === 'en' ? d.weaknessesEn : d.weaknessesAr}</p>
          </div>
        </div>
      )
    }

    if (type === 'planets' || type === 'asteroids' || type === 'aspects' || type === 'retrogrades' || type === 'advanced') {
      return (
        <div className="rounded-xl p-4 border" style={{ background: 'rgba(0,0,0,0.4)', borderColor: `${d.color}33` }}>
          {d.rulerEn && (
            <>
              <p className="text-[10px] tracking-widest uppercase font-mono mb-1" style={{ color: d.color }}>
                {language === 'en' ? 'Rulership' : 'الحاكمية'}
              </p>
              <p className="text-[#f4efe2] text-sm mb-4">{language === 'en' ? d.rulerEn : d.rulerAr}</p>
            </>
          )}
          {d.angle && (
            <>
              <p className="text-[10px] tracking-widest uppercase font-mono mb-1" style={{ color: d.color }}>
                {language === 'en' ? 'Geometric Angle' : 'الزاوية الهندسية'}
              </p>
              <p className="text-[#f4efe2] text-sm mb-4 font-mono">{d.angle}</p>
            </>
          )}
          {d.frequencyEn && (
            <>
              <p className="text-[10px] tracking-widest uppercase font-mono mb-1" style={{ color: d.color }}>
                {language === 'en' ? 'Frequency' : 'التكرار'}
              </p>
              <p className="text-[#f4efe2] text-sm mb-4">{language === 'en' ? d.frequencyEn : d.frequencyAr}</p>
            </>
          )}
          <p className="text-[10px] tracking-widest uppercase font-mono mb-1" style={{ color: d.color }}>
            {language === 'en' ? 'Meaning' : 'المعنى'}
          </p>
          <p className="text-[#c7beaa] text-sm leading-relaxed whitespace-pre-line">
            {language === 'en' ? d.meaningEn : d.meaningAr}
          </p>
        </div>
      )
    }

    if (type === 'houses') {
      return (
        <div className="rounded-xl p-4 border" style={{ background: 'rgba(0,0,0,0.4)', borderColor: `${d.color}33` }}>
          <p className="text-[10px] tracking-widest uppercase font-mono mb-1" style={{ color: d.color }}>
            {language === 'en' ? 'Life Domain' : 'مجال الحياة'}
          </p>
          <p className="text-[#c7beaa] text-sm leading-relaxed">
            {language === 'en' ? d.meaningEn : d.meaningAr}
          </p>
        </div>
      )
    }

    return null
  }

  return (
    <div className="min-h-screen bg-[#070913] text-[#f4efe2] overflow-hidden relative selection:bg-[#b89047]/30 selection:text-[#f4efe2]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(35,21,60,0.35),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {[...Array(120)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              width: Math.random() * 1.4 + 0.4 + 'px',
              height: Math.random() * 1.4 + 0.4 + 'px',
              boxShadow: '0 0 4px rgba(255,255,255,0.7)',
              animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
              animationDelay: Math.random() * 4 + 's',
            }}
          />
        ))}
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-6 flex justify-between items-center">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push('/space')}
          className="text-[#c7beaa] opacity-60 hover:opacity-100 transition-all duration-300 flex items-center gap-2 text-xs font-serif tracking-[0.2em]"
        >
          ← {language === 'en' ? 'RETURN TO SPACE' : 'العودة إلى الفضاء'}
        </motion.button>

        <button
          onClick={toggleLanguage}
          className="px-4 py-1.5 rounded bg-transparent border border-[#b89047]/20 text-[#c7beaa] text-xs font-serif hover:border-[#b89047]/50 hover:text-[#f4efe2] transition-all duration-300"
        >
          {language === 'en' ? 'العربية' : 'English'}
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center pt-12 pb-6 relative z-10"
      >
        <div className="flex justify-center mb-5 opacity-70">
          <ZodiacIcon color="#b89047" />
        </div>
        <h1 className="text-3xl md:text-5xl font-serif font-normal tracking-[0.25em] text-[#e6ca95]">
          {language === 'en' ? 'ASTRAL CHARTS' : 'الخرائط الفلكية'}
        </h1>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#b89047]/40 to-transparent mx-auto mt-5" />
        <p className="text-[#8c826e] text-[10px] tracking-[0.4em] uppercase mt-4 font-serif">
          {language === 'en' ? 'GEOMETRIC BLUEPRINTS OF COSMIC ENERGY' : 'البصمة الهندسية للطاقة الكونية'}
        </p>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-wrap justify-center gap-3 md:gap-5 mb-8 border-b border-[#b89047]/10 pb-6 text-xs md:text-sm tracking-widest font-serif">
          {tabs.map((t) => {
            const active = activeTab === t.key
            return (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className="px-2 py-1 transition-all duration-300 flex items-center gap-2"
                style={{ color: active ? t.color : '#8c826e', textShadow: active ? `0 0 12px ${t.color}66` : 'none' }}
              >
                <t.Icon color={active ? t.color : '#8c826e'} />
                {language === 'en' ? t.labelEn : t.labelAr}
              </button>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex justify-center mb-10 pointer-events-none"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border"
            style={{
              borderColor: `${accent}44`,
              background: `${accent}0a`,
            }}
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
              <circle cx="12" cy="12" r="9" stroke={accent} strokeWidth="1.4" />
              <path d="M12 8v0.01M11 12h1v5h1" stroke={accent} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span
              className="text-[10px] md:text-[11px] tracking-[0.28em] uppercase font-serif"
              style={{ color: accent }}
            >
              {language === 'en'
                ? 'Tap any card to reveal its full information'
                : 'اضغط على أي بطاقة لعرض معلوماتها الكاملة'}
            </span>
          </motion.div>
        </motion.div>

        <div className="min-h-[400px]">{renderContent()}</div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md max-h-[85vh] overflow-y-auto rounded-2xl border p-7"
              style={{
                background: 'linear-gradient(180deg, #0e1017, #05060c)',
                borderColor: `${selected.data.color ?? accent}55`,
                boxShadow: `0 0 40px ${selected.data.color ?? accent}33`,
              }}
            >
              <span className="absolute top-2 left-2 w-3 h-3 border-l border-t" style={{ borderColor: `${selected.data.color ?? accent}66` }} />
              <span className="absolute top-2 right-2 w-3 h-3 border-r border-t" style={{ borderColor: `${selected.data.color ?? accent}66` }} />
              <span className="absolute bottom-2 left-2 w-3 h-3 border-l border-b" style={{ borderColor: `${selected.data.color ?? accent}66` }} />
              <span className="absolute bottom-2 right-2 w-3 h-3 border-r border-b" style={{ borderColor: `${selected.data.color ?? accent}66` }} />

              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 opacity-60 hover:opacity-100 transition-opacity"
                aria-label="close"
              >
                <CloseIcon />
              </button>

              <div className="text-center mb-6">
                <div
                  className="text-5xl mb-3 font-serif"
                  style={{ color: selected.data.color ?? accent, textShadow: `0 0 20px ${(selected.data.color ?? accent)}66` }}
                >
                  {selected.data.symbol ?? selected.data.number ?? '✦'}
                </div>
                <h2 className="text-xl font-serif tracking-widest uppercase" style={{ color: selected.data.color ?? accent }}>
                  {language === 'en' ? selected.data.nameEn : selected.data.nameAr}
                </h2>
                <div className="w-16 h-[1px] mx-auto my-3" style={{ background: `linear-gradient(to right, transparent, ${selected.data.color ?? accent}88, transparent)` }} />
              </div>

              {renderModalBody()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; transform: scale(0.9); }
          50% { opacity: 0.9; transform: scale(1.15); }
        }
      `}</style>
    </div>
  )
}
