'use client'

import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useLanguage } from '../../context/LanguageContext'

/* ============================================================
   SVG ICONS
   ============================================================ */
const ChakraIcon = ({ color = '#22d3ee', size = 20 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1.3" />
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.3" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke={color} strokeWidth="1" opacity="0.6" />
  </svg>
)
const TheoryIcon = ({ color = '#22d3ee', size = 20 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <path d="M12 3c-4 0-7 3-7 7 0 3 1.5 5 4 6v3h6v-3c2.5-1 4-3 4-6 0-4-3-7-7-7Z" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
    <path d="M10 21h4" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
  </svg>
)
const PolarityIcon = ({ color = '#22d3ee', size = 20 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z" stroke={color} strokeWidth="1.3" />
    <path d="M12 3v18" stroke={color} strokeWidth="0.8" opacity="0.5" />
    <circle cx="8" cy="12" r="1" fill={color} />
    <circle cx="16" cy="12" r="1" fill={color} />
  </svg>
)
const AuraIcon = ({ color = '#22d3ee', size = 20 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <circle cx="12" cy="12" r="2.5" fill={color} />
    <circle cx="12" cy="12" r="6" stroke={color} strokeWidth="1.1" opacity="0.7" />
    <circle cx="12" cy="12" r="9.5" stroke={color} strokeWidth="0.9" opacity="0.4" />
  </svg>
)
const FrequencyIcon = ({ color = '#22d3ee', size = 20 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <path d="M3 12h2l2-6 4 12 4-12 2 6h4" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const FireIcon = ({ color = '#f97316', size = 22 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <path d="M12 3c2 4 4 5 4 9a4 4 0 1 1-8 0c0-2 1-3 2-4 0 2 1 3 2 3 .5-2 0-4-2-5 1-1 2-2 2-3Z" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
)
const EarthIcon = ({ color = '#a3a380', size = 22 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <path d="M3 18h18M5 18l2-8 3 4 2-6 3 6 2-3 2 7" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const StarIcon = ({ color = '#93c5fd', size = 22 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <path d="m12 3 2.5 6L21 11l-6 2.5L12 20l-2.5-6.5L3 11l6.5-2L12 3Z" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
)
const CloseIcon = ({ color = '#a8a29e' }: { color?: string }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
    <path d="M6 6l12 12M18 6 6 18" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)
const MoonIcon = ({ color = '#c084fc', size = 22 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <path d="M16 3a9 9 0 1 0 0 18 7 7 0 1 1 0-18Z" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
)
const SunIcon = ({ color = '#fcd34d', size = 22 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <circle cx="12" cy="12" r="4" stroke={color} strokeWidth="1.3" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
  </svg>
)

/* ============================================================
   DATA
   ============================================================ */

// ---------- THEORY: 3 SOURCES ----------
const energySources = [
  {
    id: 'cosmic', nameEn: 'Cosmic Energy', nameAr: 'الطاقة الكونية',
    Icon: StarIcon, color: '#a78bfa',
    essenceEn: 'Fast, intense, transformative. Pushes towards discovery, experimentation, and breaking old patterns.',
    essenceAr: 'سريعة، مكثفة، تحويلية. تدفع نحو الاكتشاف، التجريب، وكسر الأنماط القديمة.',
    questionEn: 'What can I discover?',
    questionAr: 'ماذا يمكن أن أكتشف؟',
    shadowEn: 'Instability, isolation, superiority, over-analysis, difficulty committing to one path.',
    shadowAr: 'عدم الاستقرار، العزلة، الشعور بالتفوق، الإفراط في التحليل، صعوبة الاستقرار على مشروع واحد.',
    needEn: 'Grounding and embodiment.',
    needAr: 'التجذير والتجسيد.',
  },
  {
    id: 'celestial', nameEn: 'Celestial Energy', nameAr: 'الطاقة السماوية',
    Icon: MoonIcon, color: '#67e8f9',
    essenceEn: 'Balance between speed and slowness. Awareness, integration, translation between ideas and reality.',
    essenceAr: 'التوازن بين السرعة والبطء. الوعي، التكامل، الترجمة بين الأفكار والواقع.',
    questionEn: 'How do I understand what I have discovered?',
    questionAr: 'كيف أفهم ما اكتشفته؟',
    shadowEn: 'Indecision, endless waiting, avoidance, difficulty choosing a direction.',
    shadowAr: 'التردد، الانتظار المستمر، التجنب، صعوبة اختيار اتجاه.',
    needEn: 'Decision.',
    needAr: 'القرار.',
  },
  {
    id: 'earth', nameEn: 'Earth Energy', nameAr: 'الطاقة الأرضية',
    Icon: EarthIcon, color: '#a3a380',
    essenceEn: 'Slow, grounded, enduring. Body, stability, embodiment, family, community, building over time.',
    essenceAr: 'بطيئة، متجذرة، مستمرة. الجسد، الاستقرار، التجسيد، الأسرة، المجتمع، البناء مع الزمن.',
    questionEn: 'How do I make what I know real?',
    questionAr: 'كيف أجعل ما أعرفه موجوداً في الواقع؟',
    shadowEn: 'Stagnation, fear of change, dependence, endless postponement.',
    shadowAr: 'الجمود، الخوف من التغيير، الاعتماد، التأجيل المستمر.',
    needEn: 'A spark of movement.',
    needAr: 'شرارة من الحركة.',
  },
]

// ---------- 7 CHAKRAS ----------
interface Chakra {
  id: string
  nameEn: string; nameAr: string
  sanskrit: string
  locationEn: string; locationAr: string
  elementEn: string; elementAr: string
  color: string
  colorNameEn: string; colorNameAr: string
  questionEn: string; questionAr: string
  woundEn: string; woundAr: string
  balancedEn: string; balancedAr: string
  disturbedEn: string; disturbedAr: string
  lessonEn: string; lessonAr: string
}

const chakras: Chakra[] = [
  {
    id: 'crown', nameEn: 'Crown Chakra', nameAr: 'شاكرا التاج',
    sanskrit: 'Sahasrara',
    locationEn: 'Crown of the head', locationAr: 'قمة الرأس',
    elementEn: 'Consciousness / Beyond elements', elementAr: 'الوعي / ما وراء العناصر',
    color: '#C084FC', colorNameEn: 'Violet / White', colorNameAr: 'بنفسجي / أبيض',
    questionEn: 'Am I aware of something greater than the ego?',
    questionAr: 'هل أعي شيئاً أكبر من الأنا؟',
    woundEn: 'Loss of meaning, existential emptiness, spiritual bypassing.',
    woundAr: 'فقدان المعنى، الفراغ الوجودي، التجاوز الروحي.',
    balancedEn: 'Sense of meaning, humility, openness, acceptance of uncertainty.',
    balancedAr: 'الشعور بالمعنى، التواضع، الانفتاح، تقبل الغموض.',
    disturbedEn: 'Emptiness despite external success, constant seeking outside, spiritual bypassing.',
    disturbedAr: 'الفراغ رغم النجاح الخارجي، البحث المستمر في الخارج، استخدام الروحانية للهروب.',
    lessonEn: 'Consciousness.',
    lessonAr: 'الوعي.',
  },
  {
    id: 'third-eye', nameEn: 'Third Eye Chakra', nameAr: 'شاكرا العين الثالثة',
    sanskrit: 'Ajna',
    locationEn: 'Between the eyebrows', locationAr: 'بين الحاجبين',
    elementEn: 'Light / Perception', elementAr: 'النور / الإدراك',
    color: '#6366F1', colorNameEn: 'Indigo', colorNameAr: 'نيلي',
    questionEn: 'Am I seeing what is truly there?',
    questionAr: 'هل أرى ما هو موجود حقاً؟',
    woundEn: 'Denial, confusion, deception, refusing to see reality.',
    woundAr: 'الإنكار، الارتباك، الخداع، رفض رؤية الواقع.',
    balancedEn: 'Observation, discernment, critical thinking, intuition combined with reason.',
    balancedAr: 'الملاحظة، التمييز، التفكير النقدي، الحدس مع العقل.',
    disturbedEn: 'Distrust of perception, over-interpretation, seeing every coincidence as a sign.',
    disturbedAr: 'عدم الثقة بالإدراك، الإفراط في التفسير، رؤية كل صدفة كعلامة.',
    lessonEn: 'Discernment.',
    lessonAr: 'التمييز.',
  },
  {
    id: 'throat', nameEn: 'Throat Chakra', nameAr: 'شاكرا الحلق',
    sanskrit: 'Vishuddha',
    locationEn: 'Throat and neck', locationAr: 'الحلق والرقبة',
    elementEn: 'Space / Ether', elementAr: 'الفضاء / الأثير',
    color: '#38BDF8', colorNameEn: 'Blue', colorNameAr: 'أزرق',
    questionEn: 'Can I speak my truth?',
    questionAr: 'هل أستطيع أن أقول حقيقتي؟',
    woundEn: 'Suppression, fear of speaking, being punished for honesty.',
    woundAr: 'الإسكات، الخوف من التعبير، العقاب على الصراحة.',
    balancedEn: 'Authentic expression, clear communication, healthy boundaries.',
    balancedAr: 'التعبير الأصيل، التواصل الواضح، الحدود الصحية.',
    disturbedEn: 'Talking without expressing, or complete silence; saying yes while meaning no.',
    disturbedAr: 'الكلام دون تعبير، أو الصمت التام؛ قول نعم بينما القلب يريد لا.',
    lessonEn: 'Authentic expression.',
    lessonAr: 'التعبير الأصيل.',
  },
  {
    id: 'heart', nameEn: 'Heart Chakra', nameAr: 'شاكرا القلب',
    sanskrit: 'Anahata',
    locationEn: 'Center of the chest', locationAr: 'وسط الصدر',
    elementEn: 'Air', elementAr: 'الهواء',
    color: '#34D399', colorNameEn: 'Green', colorNameAr: 'أخضر',
    questionEn: 'Can I love without losing myself?',
    questionAr: 'هل أستطيع أن أحب دون أن أفقد نفسي؟',
    woundEn: 'Abandonment, betrayal, rejection, grief, loss of trust.',
    woundAr: 'الهجر، الخيانة، الرفض، الفقد، فقدان الثقة.',
    balancedEn: 'Love with boundaries, grief without drowning, forgiveness without harm.',
    balancedAr: 'الحب مع الحدود، الحزن دون الغرق، التسامح دون السماح بالأذى.',
    disturbedEn: 'Closed heart ("I will never love again") or heart without boundaries ("I will give everything").',
    disturbedAr: 'قلب مغلق ("لن أحب مرة أخرى") أو قلب بلا حدود ("سأعطي كل شيء").',
    lessonEn: 'Mature love.',
    lessonAr: 'الحب الناضج.',
  },
  {
    id: 'solar-plexus', nameEn: 'Solar Plexus Chakra', nameAr: 'شاكرا الضفيرة الشمسية',
    sanskrit: 'Manipura',
    locationEn: 'Upper abdomen / navel', locationAr: 'أعلى البطن / السرة',
    elementEn: 'Fire', elementAr: 'النار',
    color: '#FBBF24', colorNameEn: 'Yellow', colorNameAr: 'أصفر',
    questionEn: 'What will I do?',
    questionAr: 'ماذا سأفعل؟',
    woundEn: 'Humiliation, powerlessness, control by others, chronic criticism.',
    woundAr: 'الإذلال، العجز، السيطرة من الآخرين، الانتقاد المستمر.',
    balancedEn: 'Confidence, decision-making, healthy boundaries, personal responsibility.',
    balancedAr: 'الثقة، اتخاذ القرار، الحدود الصحية، المسؤولية الشخصية.',
    disturbedEn: 'Powerlessness ("I cannot") or excessive control ("I must control everything").',
    disturbedAr: 'العجز ("لا أستطيع") أو السيطرة المفرطة ("يجب أن أتحكم بكل شيء").',
    lessonEn: 'Personal power.',
    lessonAr: 'القوة الشخصية.',
  },
  {
    id: 'sacral', nameEn: 'Sacral Chakra', nameAr: 'شاكرا العجز',
    sanskrit: 'Svadhisthana',
    locationEn: 'Lower abdomen / sacral region', locationAr: 'أسفل البطن / منطقة العجز',
    elementEn: 'Water', elementAr: 'الماء',
    color: '#FB923C', colorNameEn: 'Orange', colorNameAr: 'برتقالي',
    questionEn: 'Am I allowed to feel and desire?',
    questionAr: 'هل أسمح لنفسي أن أشعر وأرغب؟',
    woundEn: 'Shame, sexual repression, betrayal, violation of boundaries.',
    woundAr: 'العار، القمع الجنسي، الخيانة، انتهاك الحدود.',
    balancedEn: 'Feeling without drowning, desire without losing oneself, pleasure without shame.',
    balancedAr: 'الشعور دون الغرق، الرغبة دون فقدان الذات، المتعة دون العار.',
    disturbedEn: 'Disconnection from body, guilt around desire, using attraction for validation.',
    disturbedAr: 'الانفصال عن الجسد، الذنب تجاه الرغبة، استخدام الجاذبية للتقدير.',
    lessonEn: 'Flow and embodied desire.',
    lessonAr: 'التدفق والرغبة المتجسدة.',
  },
  {
    id: 'root', nameEn: 'Root Chakra', nameAr: 'شاكرا الجذر',
    sanskrit: 'Muladhara',
    locationEn: 'Base of the spine / pelvic floor', locationAr: 'قاعدة العمود الفقري / العجان',
    elementEn: 'Earth', elementAr: 'الأرض',
    color: '#F87171', colorNameEn: 'Red', colorNameAr: 'أحمر',
    questionEn: 'Am I safe enough to exist?',
    questionAr: 'هل أنا آمن بما يكفي لأكون؟',
    woundEn: 'Fear, instability, unstable childhood, loss of home, chronic defense.',
    woundAr: 'الخوف، عدم الاستقرار، طفولة غير مستقرة، فقدان المنزل، الدفاع المستمر.',
    balancedEn: 'Stability, presence, grounding, trust in your ability to cope.',
    balancedAr: 'الثبات، الحضور، التجذير، الثقة بقدرتك على التعامل.',
    disturbedEn: 'Survival becomes dominant; change feels threatening even when necessary.',
    disturbedAr: 'البقاء يسيطر؛ التغيير يبدو مهدداً حتى عندما يكون ضرورياً.',
    lessonEn: 'Stability.',
    lessonAr: 'الثبات.',
  },
]

// ---------- POLARITY ----------
const polarityData = [
  {
    id: 'feminine', nameEn: 'Feminine Energy', nameAr: 'الطاقة الأنثوية',
    Icon: MoonIcon, color: '#c084fc',
    essenceEn: 'Reception, intuition, depth, embodiment, feeling, creation, transformation. It receives something and allows it to become something else.',
    essenceAr: 'الاستقبال، الحدس، العمق، التجسد، الشعور، الإبداع، التحول. تستقبل شيئاً وتسمح له بأن يصبح شيئاً آخر.',
    shadowEn: 'Dependency, emotional overwhelm, projection, self-abandonment, passivity, submission, drowning in emotion.',
    shadowAr: 'الاعتماد، الاكتساح العاطفي، الإسقاط، التضحية بالذات، السلبية، الخضوع، الغرق في المشاعر.',
    sovereignEn: 'She chooses, feels deeply without being controlled, gives without martyrdom, soft without powerlessness, fierce without becoming someone else.',
    sovereignAr: 'تختار، تشعر بعمق دون أن تسيطر عليها المشاعر، تعطي دون استشهاد، لينة دون عجز، شرسة دون أن تصبح شخصاً آخر.',
  },
  {
    id: 'masculine', nameEn: 'Masculine Energy', nameAr: 'الطاقة الذكورية',
    Icon: SunIcon, color: '#fcd34d',
    essenceEn: 'Direction, action, structure, discernment, protection, decision, manifestation. It takes an intention and moves it towards reality.',
    essenceAr: 'الاتجاه، الفعل، البنية، التمييز، الحماية، القرار، التجلي. يأخذ النية ويحركها نحو الواقع.',
    shadowEn: 'Control, rigidity, possessiveness, arrogance, emotional suppression, walls instead of boundaries, domination, compulsive productivity.',
    shadowAr: 'السيطرة، الجمود، التملك، الغرور، كبت المشاعر، الجدران بدل الحدود، التسلط، الإنتاجية القهرية.',
    sovereignEn: 'Protects without possessing, leads without controlling, sets boundaries without cruelty, vulnerable without losing strength.',
    sovereignAr: 'يحمي دون أن يمتلك، يقود دون أن يسيطر، يضع حدوداً دون قسوة، ضعيف أمام نفسه دون فقدان القوة.',
  },
]

// ---------- AURA COLORS ----------
const auraColors = [
  { id: 'red', nameEn: 'Red', nameAr: 'الأحمر', color: '#ef4444',
    meaningEn: 'Power, vitality, instinct, survival, courage, action. I live.',
    meaningAr: 'القوة، الحيوية، الغريزة، البقاء، الشجاعة، الفعل. أنا أعيش.',
    shadowEn: 'Anger, impulsiveness, aggression, material attachment.',
    shadowAr: 'الغضب، الاندفاع، العدوانية، التعلق بالماديات.' },
  { id: 'orange', nameEn: 'Orange', nameAr: 'البرتقالي', color: '#f97316',
    meaningEn: 'Desire, creativity, pleasure, emotion, connection. I feel and create.',
    meaningAr: 'الرغبة، الإبداع، المتعة، العاطفة، الاتصال. أنا أشعر وأبدع.',
    shadowEn: 'Attachment, constant pleasure-seeking, jealousy, dependence.',
    shadowAr: 'التعلق، البحث المستمر عن المتعة، الغيرة، الاعتماد.' },
  { id: 'yellow', nameEn: 'Yellow', nameAr: 'الأصفر', color: '#eab308',
    meaningEn: 'Mind, will, confidence, clarity, decision. I think and choose.',
    meaningAr: 'العقل، الإرادة، الثقة، الوضوح، القرار. أنا أفكر وأختار.',
    shadowEn: 'Overthinking, anxiety, need for control, ego.',
    shadowAr: 'الإفراط في التفكير، القلق، الحاجة إلى السيطرة، الأنا.' },
  { id: 'green', nameEn: 'Green', nameAr: 'الأخضر', color: '#10b981',
    meaningEn: 'Heart, love, compassion, healing, balance. I love and connect.',
    meaningAr: 'القلب، الحب، الرحمة، الشفاء، التوازن. أنا أحب وأتصل.',
    shadowEn: 'Excessive self-sacrifice, jealousy, saving everyone, forgetting self.',
    shadowAr: 'التضحية المفرطة، الغيرة، محاولة إنقاذ الجميع، نسيان الذات.' },
  { id: 'blue', nameEn: 'Blue', nameAr: 'الأزرق', color: '#38bdf8',
    meaningEn: 'Expression, voice, truth, calmness, communication. I speak my truth.',
    meaningAr: 'التعبير، الصوت، الحقيقة، الهدوء، التواصل. أنا أعبّر عن حقيقتي.',
    shadowEn: 'Suppressed voice, fear of expression, withdrawal, excessive silence.',
    shadowAr: 'كبت الصوت، الخوف من التعبير، الانسحاب، الصمت المفرط.' },
  { id: 'indigo', nameEn: 'Indigo', nameAr: 'النيلي', color: '#6366f1',
    meaningEn: 'Intuition, inner vision, contemplation, perception. I see and perceive.',
    meaningAr: 'الحدس، الرؤية الداخلية، التأمل، الإدراك. أنا أرى وأدرك.',
    shadowEn: 'Over-interpretation, suspicion, seeing every coincidence as a sign.',
    shadowAr: 'الإفراط في التفسير، الشك، رؤية كل صدفة كعلامة.' },
  { id: 'purple', nameEn: 'Purple', nameAr: 'البنفسجي', color: '#a855f7',
    meaningEn: 'Spirit, meaning, consciousness, transcendence. I search for meaning.',
    meaningAr: 'الروح، المعنى، الوعي، التجاوز. أنا أبحث عن المعنى.',
    shadowEn: 'Spiritual bypassing, ignoring real problems, spiritual superiority.',
    shadowAr: 'التجاوز الروحي، تجاهل المشكلات الحقيقية، الشعور بالتفوق الروحي.' },
  { id: 'white', nameEn: 'White', nameAr: 'الأبيض', color: '#e7e9ea',
    meaningEn: 'Purity, clarity, expansiveness, awareness. I become clear.',
    meaningAr: 'النقاء، الصفاء، الاتساع، الوعي. أنا أصفو.',
    shadowEn: 'Using "light" to escape the shadow; denying darker parts.',
    shadowAr: 'استخدام "النور" للهروب من الظل؛ إنكار الأجزاء المظلمة.' },
  { id: 'black', nameEn: 'Black', nameAr: 'الأسود', color: '#4a4a4a',
    meaningEn: 'Protection, depth, the unconscious, transition, shadow work. I face my shadow.',
    meaningAr: 'الحماية، العمق، اللاوعي، الانتقال، عمل الظل. أنا أواجه ظلي.',
    shadowEn: 'Misunderstood as purely negative — but often simply a phase of closure or rebuilding.',
    shadowAr: 'يُساء فهمه كسلبي بحت — لكنه غالباً مرحلة إغلاق أو إعادة بناء.' },
]

// ---------- AURA LAYERS ----------
const auraLayers = [
  { id: 'physical', nameEn: 'Physical Layer', nameAr: 'الطبقة الجسدية', color: '#f87171',
    meaningEn: 'Relationship with the body, presence in the material world, vitality, rest, bodily safety.',
    meaningAr: 'العلاقة بالجسد، الحضور في العالم المادي، الحيوية، الراحة، الأمان الجسدي.',
    questionEn: 'Am I living inside my body, or as though I am separate from it?',
    questionAr: 'هل أعيش داخل جسدي، أم وكأنني منفصل عنه؟' },
  { id: 'emotional', nameEn: 'Emotional Layer', nameAr: 'الطبقة العاطفية', color: '#fb923c',
    meaningEn: 'The realm of feelings, emotional expression, boundaries, and how we hold our emotions.',
    meaningAr: 'عالم المشاعر، التعبير العاطفي، الحدود، وكيف نحمل مشاعرنا.',
    questionEn: 'Am I allowing my emotions to move through me, or have they become my driver?',
    questionAr: 'هل أسمح لمشاعري أن تمر بي، أم أصبحت مشاعري هي التي تقود؟' },
  { id: 'mental', nameEn: 'Mental Layer', nameAr: 'الطبقة العقلية', color: '#eab308',
    meaningEn: 'Thoughts, beliefs, interpretations, and the ability to distinguish fact from story.',
    meaningAr: 'الأفكار، المعتقدات، التفسيرات، والقدرة على التمييز بين الحقيقة والقصة.',
    questionEn: 'Am I seeing reality as it is, or through the story my mind created?',
    questionAr: 'هل أرى الواقع كما هو، أم من خلال القصة التي صنعها عقلي؟' },
  { id: 'will', nameEn: 'Will Layer', nameAr: 'طبقة الإرادة', color: '#f59e0b',
    meaningEn: 'The bridge between knowing and doing — decision, discipline, direction, persistence.',
    meaningAr: 'الجسر بين المعرفة والفعل — القرار، الانضباط، الاتجاه، الاستمرار.',
    questionEn: 'Do I have a direction, or do I know what I want but fail to move toward it?',
    questionAr: 'هل أملك اتجاهاً، أم أعرف ما أريد لكنني لا أتحرك نحوه؟' },
  { id: 'social', nameEn: 'Social Layer', nameAr: 'الطبقة الاجتماعية', color: '#34d399',
    meaningEn: 'Relationships, boundaries, giving and receiving, closeness and distance.',
    meaningAr: 'العلاقات، الحدود، الأخذ والعطاء، القرب والابتعاد.',
    questionEn: 'Can I be close to someone without losing myself?',
    questionAr: 'هل أستطيع أن أكون قريباً من شخص دون أن أفقد نفسي؟' },
  { id: 'intuitive', nameEn: 'Intuitive Layer', nameAr: 'طبقة الحدس', color: '#6366f1',
    meaningEn: 'Inner perception, pattern recognition, subtle awareness — always verified by reason.',
    meaningAr: 'الإدراك الداخلي، ملاحظة الأنماط، الوعي الدقيق — دائماً يُتحقق منه بالعقل.',
    questionEn: 'Is this calm intuition, or is it fear looking for evidence?',
    questionAr: 'هل هذا حدس هادئ، أم خوف يبحث عن دليل؟' },
  { id: 'spiritual', nameEn: 'Spiritual Layer', nameAr: 'الطبقة الروحية', color: '#a855f7',
    meaningEn: 'Meaning, consciousness, interconnection, values — carried into daily life, not away from it.',
    meaningAr: 'المعنى، الوعي، الترابط، القيم — تُحمل إلى الحياة اليومية، لا هرباً منها.',
    questionEn: 'Does my spirituality help me face life, or escape from it?',
    questionAr: 'هل روحانيتي تساعدني على مواجهة الحياة، أم الهروب منها؟' },
]

// ---------- FREQUENCIES ----------
const frequencies = [
  { hz: '174', nameEn: 'Relaxation & Grounding', nameAr: 'الاسترخاء والأمان', color: '#7dd3fc',
    meaningEn: 'Symbol of calmness, grounding, and physical ease during meditation and quiet reflection.',
    meaningAr: 'رمز للهدوء والاستقرار والراحة الجسدية أثناء التأمل والتأمل الهادئ.' },
  { hz: '285', nameEn: 'Renewal', nameAr: 'التجدد', color: '#a5b4fc',
    meaningEn: 'Associated with renewal and balance during inner work and body awareness.',
    meaningAr: 'يرتبط بالتجدد والتوازن أثناء العمل الداخلي والوعي بالجسد.' },
  { hz: '396', nameEn: 'Fear & Release', nameAr: 'الخوف والتحرر', color: '#f87171',
    meaningEn: 'Symbolically, facing what frightens you rather than running from it. Releasing old patterns.',
    meaningAr: 'رمزياً، مواجهة ما يخيفك بدلاً من الهروب منه. التحرر من الأنماط القديمة.' },
  { hz: '417', nameEn: 'Change', nameAr: 'التغيير', color: '#fb923c',
    meaningEn: 'Breaking old patterns, beginning again, personal transitions, intention-setting.',
    meaningAr: 'كسر الأنماط القديمة، البداية من جديد، التحولات الشخصية، تحديد النوايا.' },
  { hz: '432', nameEn: 'Calm & Harmony', nameAr: 'الهدوء والانسجام', color: '#67e8f9',
    meaningEn: 'Widely used in meditation for its calming quality. Not "the frequency of the universe" — simply a calming option.',
    meaningAr: 'يُستخدم على نطاق واسع في التأمل لصفاته الهادئة. ليس "تردد الكون" — مجرد خيار للهدوء.' },
  { hz: '528', nameEn: 'Love & Transformation', nameAr: 'الحب والتحول', color: '#34d399',
    meaningEn: 'The "Love Frequency" — symbolically associated with love, transformation, opening the heart.',
    meaningAr: '"تردد الحب" — يرتبط رمزياً بالحب، التحول، فتح القلب.' },
  { hz: '639', nameEn: 'Relationships', nameAr: 'العلاقات', color: '#f472b6',
    meaningEn: 'Love, relationships, forgiveness, compassion, reconciliation.',
    meaningAr: 'الحب، العلاقات، التسامح، الرحمة، المصالحة.' },
  { hz: '741', nameEn: 'Expression & Clarity', nameAr: 'التعبير والوضوح', color: '#38bdf8',
    meaningEn: 'Self-expression, clarity, communication, clearing mental confusion.',
    meaningAr: 'التعبير عن الذات، الوضوح، التواصل، إزالة الارتباك الذهني.' },
  { hz: '852', nameEn: 'Intuition & Awareness', nameAr: 'الحدس والوعي', color: '#a78bfa',
    meaningEn: 'Deep meditation, inner awareness, returning to your inner world.',
    meaningAr: 'التأمل العميق، الوعي الداخلي، العودة إلى عالمك الداخلي.' },
]

/* ============================================================
   PAGE
   ============================================================ */
type TabKey = 'theory' | 'chakras' | 'polarity' | 'aura' | 'frequency'
type Selected = { type: string; data: any } | null

export default function EnergyPage() {
  const router = useRouter()
  const { language, toggleLanguage } = useLanguage()
  const [activeTab, setActiveTab] = useState<TabKey>('theory')
  const [selected, setSelected] = useState<Selected>(null)
  const [stars, setStars] = useState<any[]>([])

  useEffect(() => {
    const s = []
    for (let i = 0; i < 140; i++) {
      s.push({
        id: i, x: Math.random() * 100, y: Math.random() * 100,
        size: Math.random() * 1.4 + 0.4,
        delay: Math.random() * 4,
        duration: Math.random() * 3 + 2,
      })
    }
    setStars(s)
  }, [])

  const tabs: { key: TabKey; labelEn: string; labelAr: string; Icon: any; color: string }[] = [
    { key: 'theory',    labelEn: 'Theory',        labelAr: 'النظرية',       Icon: TheoryIcon,     color: '#22d3ee' },
    { key: 'chakras',   labelEn: '7 Chakras',     labelAr: 'الشاكرات السبع', Icon: ChakraIcon,     color: '#a855f7' },
    { key: 'polarity',  labelEn: 'Polarity',      labelAr: 'القطبان',        Icon: PolarityIcon,   color: '#f0abfc' },
    { key: 'aura',      labelEn: 'Aura',          labelAr: 'الهالة',         Icon: AuraIcon,       color: '#34d399' },
    { key: 'frequency', labelEn: 'Frequency',     labelAr: 'الترددات',       Icon: FrequencyIcon,  color: '#fcd34d' },
  ]

  const currentTab = tabs.find(t => t.key === activeTab)!
  const accent = currentTab.color

  /* ------------ THEORY ------------ */
  const renderTheory = () => (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="rounded-3xl p-6 border relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, rgba(3,10,30,0.7), rgba(1,3,10,0.9))', borderColor: `${accent}33` }}>
        <span className="absolute top-3 left-3 w-3 h-3 border-l border-t" style={{ borderColor: `${accent}66` }} />
        <span className="absolute top-3 right-3 w-3 h-3 border-r border-t" style={{ borderColor: `${accent}66` }} />
        <span className="absolute bottom-3 left-3 w-3 h-3 border-l border-b" style={{ borderColor: `${accent}66` }} />
        <span className="absolute bottom-3 right-3 w-3 h-3 border-r border-b" style={{ borderColor: `${accent}66` }} />
        <p className="text-slate-300/90 text-base leading-relaxed italic text-center">
          {language === 'en'
            ? 'The question is not always how much energy a person possesses, but what kind of energy they carry, how intensely it moves, how quickly it transforms, and whether they know how to direct it.'
            : 'ليست المشكلة دائماً في مقدار الطاقة التي يملكها الإنسان، بل في نوعها، وسرعة حركتها، وقدرته على احتوائها وتوجيهها.'}
        </p>
      </div>

      <div className="text-center py-4">
        <h3 className="text-lg tracking-[0.3em] uppercase" style={{ color: accent }}>
          {language === 'en' ? 'The Three Sources' : 'المصادر الثلاثة'}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {energySources.map((src, idx) => {
          const Icon = src.Icon
          return (
            <motion.button
              key={src.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              onClick={() => setSelected({ type: 'source', data: src })}
              className="text-left rounded-2xl p-6 border relative overflow-hidden group"
              style={{
                background: `linear-gradient(160deg, ${src.color}10, rgba(1,3,10,0.9))`,
                borderColor: `${src.color}44`,
              }}
            >
              <span className="absolute top-3 left-3 w-3 h-3 border-l border-t" style={{ borderColor: `${src.color}66` }} />
              <span className="absolute top-3 right-3 w-3 h-3 border-r border-t" style={{ borderColor: `${src.color}66` }} />
              <div className="flex items-center gap-3 mb-4">
                <Icon color={src.color} size={28} />
                <h4 className="text-lg italic font-light" style={{ color: src.color, textShadow: `0 0 15px ${src.color}55` }}>
                  {language === 'en' ? src.nameEn : src.nameAr}
                </h4>
              </div>
              <p className="text-slate-300/85 text-sm italic leading-relaxed mb-4">
                {language === 'en' ? src.essenceEn : src.essenceAr}
              </p>
              <div className="rounded-lg p-3 border" style={{ background: 'rgba(0,0,0,0.35)', borderColor: `${src.color}22` }}>
                <p className="text-[10px] tracking-[0.25em] uppercase mb-1" style={{ color: `${src.color}aa` }}>
                  {language === 'en' ? 'Its Question' : 'سؤالها'}
                </p>
                <p className="text-slate-300 text-xs italic">
                  {language === 'en' ? src.questionEn : src.questionAr}
                </p>
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )

  /* ------------ CHAKRAS DIAGRAM ------------ */
  const renderChakras = () => (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-5xl mx-auto py-4">
      {/* Visual Column: Alignment System */}
      <div className="relative flex flex-col items-center justify-between h-[640px] w-24 py-6">
        {/* Spine Energy Filament */}
        <div className="absolute top-0 bottom-0 w-[2px]"
          style={{
            background: `linear-gradient(to bottom, #C084FC 0%, #6366F1 17%, #38BDF8 33%, #34D399 50%, #FBBF24 67%, #FB923C 83%, #F87171 100%)`,
            opacity: 0.5,
            boxShadow: `0 0 12px rgba(34,211,238,0.4)`,
          }} />

        {chakras.map((chakra, idx) => (
          <motion.div
            key={chakra.id}
            whileHover={{ scale: 1.15 }}
            onClick={() => setSelected({ type: 'chakra', data: chakra })}
            className="w-12 h-12 rounded-full z-10 cursor-pointer flex items-center justify-center transition-all duration-500"
            style={{
              background: 'rgba(1,3,10,0.9)',
              border: `1.5px solid ${chakra.color}`,
              boxShadow: `0 0 20px ${chakra.color}66, inset 0 0 10px ${chakra.color}44`,
            }}
          >
            <div className="w-4 h-4 rounded-full animate-pulse"
              style={{ backgroundColor: chakra.color, boxShadow: `0 0 12px ${chakra.color}` }} />
          </motion.div>
        ))}
      </div>

      {/* Info Column */}
      <div className="flex-1 w-full flex flex-col justify-between gap-3">
        {chakras.map((chakra, idx) => (
          <motion.button
            key={chakra.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ x: language === 'en' ? 6 : -6 }}
            onClick={() => setSelected({ type: 'chakra', data: chakra })}
            className="text-left rounded-xl p-3 border transition-all duration-300 group flex items-center justify-between"
            style={{
              background: `linear-gradient(90deg, ${chakra.color}10, rgba(1,3,10,0.6))`,
              borderColor: `${chakra.color}33`,
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full hidden sm:block" style={{ backgroundColor: chakra.color }} />
              <div>
                <h3 className="text-sm text-slate-200 tracking-wide group-hover:text-white transition-colors">
                  {language === 'en' ? chakra.nameEn : chakra.nameAr}
                  <span className="text-[11px] text-slate-500 mx-2 italic">({chakra.sanskrit})</span>
                </h3>
                <p className="text-slate-400 text-xs mt-0.5 line-clamp-1 max-w-md">
                  {language === 'en' ? chakra.questionEn : chakra.questionAr}
                </p>
              </div>
            </div>
            <span className="text-[10px] uppercase tracking-widest whitespace-nowrap" style={{ color: `${chakra.color}cc` }}>
              {language === 'en' ? chakra.colorNameEn : chakra.colorNameAr}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  )

  /* ------------ POLARITY ------------ */
  const renderPolarity = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
      {polarityData.map((pole, idx) => {
        const Icon = pole.Icon
        return (
          <motion.button
            key={pole.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15 }}
            whileHover={{ y: -4 }}
            onClick={() => setSelected({ type: 'pole', data: pole })}
            className="text-left rounded-3xl p-6 border relative overflow-hidden"
            style={{
              background: `linear-gradient(160deg, ${pole.color}15, rgba(1,3,10,0.9))`,
              borderColor: `${pole.color}44`,
            }}
          >
            <span className="absolute top-3 left-3 w-3 h-3 border-l border-t" style={{ borderColor: `${pole.color}66` }} />
            <span className="absolute top-3 right-3 w-3 h-3 border-r border-t" style={{ borderColor: `${pole.color}66` }} />
            <span className="absolute bottom-3 left-3 w-3 h-3 border-l border-b" style={{ borderColor: `${pole.color}66` }} />
            <span className="absolute bottom-3 right-3 w-3 h-3 border-r border-b" style={{ borderColor: `${pole.color}66` }} />
            <div className="flex items-center gap-3 mb-4">
              <Icon color={pole.color} size={30} />
              <h3 className="text-xl italic font-light" style={{ color: pole.color, textShadow: `0 0 15px ${pole.color}55` }}>
                {language === 'en' ? pole.nameEn : pole.nameAr}
              </h3>
            </div>
            <p className="text-slate-300/85 text-sm italic leading-relaxed mb-4">
              {language === 'en' ? pole.essenceEn : pole.essenceAr}
            </p>
            <div className="rounded-lg p-3 border" style={{ background: 'rgba(0,0,0,0.35)', borderColor: `${pole.color}22` }}>
              <p className="text-[10px] tracking-[0.25em] uppercase mb-1" style={{ color: `${pole.color}aa` }}>
                {language === 'en' ? 'Its Shadow' : 'ظلّها'}
              </p>
              <p className="text-slate-400 text-xs italic leading-relaxed">
                {language === 'en' ? pole.shadowEn : pole.shadowAr}
              </p>
            </div>
          </motion.button>
        )
      })}

      <div className="md:col-span-2 mt-6 rounded-3xl p-6 border relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, rgba(3,10,30,0.7), rgba(1,3,10,0.9))', borderColor: `${accent}33` }}>
        <p className="text-slate-300/90 text-sm italic leading-relaxed text-center">
          {language === 'en'
            ? 'You are not meant to choose one pole and erase the other. You are meant to learn how to move between them. The complete human being is capable of polarity, movement and integration — you are the meeting point between the two.'
            : 'لست مضطراً لاختيار قطب واحد ومحو الآخر. أنت مدعو لتعلم كيفية التنقل بينهما. الكائن الإنساني الكامل قادر على القطبية والحركة والتكامل — أنت نقطة الالتقاء بينهما.'}
        </p>
      </div>
    </div>
  )

  /* ------------ AURA ------------ */
  const renderAura = () => (
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* Colors */}
      <div>
        <h3 className="text-center text-lg tracking-[0.3em] uppercase mb-6" style={{ color: accent }}>
          {language === 'en' ? 'The Colors' : 'الألوان'}
        </h3>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
          {auraColors.map((c, idx) => (
            <motion.button
              key={c.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelected({ type: 'auraColor', data: c })}
              className="rounded-2xl p-4 border relative overflow-hidden"
              style={{ background: `linear-gradient(160deg, ${c.color}15, rgba(1,3,10,0.9))`, borderColor: `${c.color}44` }}
            >
              <div className="w-10 h-10 mx-auto rounded-full mb-2"
                style={{ backgroundColor: c.color, boxShadow: `0 0 20px ${c.color}, inset 0 0 10px rgba(255,255,255,0.3)` }} />
              <p className="text-xs text-center text-slate-200 italic tracking-wide">
                {language === 'en' ? c.nameEn : c.nameAr}
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Layers */}
      <div>
        <h3 className="text-center text-lg tracking-[0.3em] uppercase mb-6" style={{ color: accent }}>
          {language === 'en' ? 'The Layers' : 'الطبقات'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {auraLayers.map((layer, idx) => (
            <motion.button
              key={layer.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              whileHover={{ y: -4 }}
              onClick={() => setSelected({ type: 'auraLayer', data: layer })}
              className="text-left rounded-2xl p-5 border relative overflow-hidden"
              style={{ background: `linear-gradient(160deg, ${layer.color}10, rgba(1,3,10,0.9))`, borderColor: `${layer.color}44` }}
            >
              <h4 className="text-base italic mb-2" style={{ color: layer.color, textShadow: `0 0 12px ${layer.color}55` }}>
                {language === 'en' ? layer.nameEn : layer.nameAr}
              </h4>
              <p className="text-slate-300/80 text-xs leading-relaxed">
                {language === 'en' ? layer.meaningEn : layer.meaningAr}
              </p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )

  /* ------------ FREQUENCY ------------ */
  const renderFrequency = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="rounded-3xl p-6 border relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, rgba(3,10,30,0.7), rgba(1,3,10,0.9))', borderColor: `${accent}33` }}>
        <p className="text-slate-300/90 text-sm italic leading-relaxed text-center">
          {language === 'en'
            ? 'Sound can be a doorway into a particular state, but it cannot replace inner work. The sound vibrates outside you, but transformation happens in the way you meet yourself within.'
            : 'الصوت يمكن أن يكون باباً إلى حالة معينة، لكنه ليس بديلاً عن العمل الداخلي. الصوت يهتز في الخارج، لكن التحول الحقيقي يحدث في الطريقة التي نلتقي بها مع أنفسنا في الداخل.'}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {frequencies.map((f, idx) => (
          <motion.button
            key={f.hz}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ y: -3 }}
            onClick={() => setSelected({ type: 'frequency', data: f })}
            className="text-left rounded-2xl p-5 border relative overflow-hidden group"
            style={{ background: `linear-gradient(160deg, ${f.color}10, rgba(1,3,10,0.9))`, borderColor: `${f.color}44` }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl font-mono" style={{ color: f.color, textShadow: `0 0 12px ${f.color}66` }}>
                {f.hz} <span className="text-sm opacity-70">Hz</span>
              </div>
              <FrequencyIcon color={f.color} size={20} />
            </div>
            <h4 className="text-sm italic mb-1" style={{ color: f.color }}>
              {language === 'en' ? f.nameEn : f.nameAr}
            </h4>
            <p className="text-slate-400 text-xs italic leading-relaxed line-clamp-2">
              {language === 'en' ? f.meaningEn : f.meaningAr}
            </p>
          </motion.button>
        ))}
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'theory': return renderTheory()
      case 'chakras': return renderChakras()
      case 'polarity': return renderPolarity()
      case 'aura': return renderAura()
      case 'frequency': return renderFrequency()
      default: return null
    }
  }

  /* ------------ MODAL BODY ------------ */
  const renderModalBody = () => {
    if (!selected) return null
    const d = selected.data

    if (selected.type === 'source') {
      return (
        <div className="space-y-3">
          <div className="rounded-xl p-4 border" style={{ background: 'rgba(0,0,0,0.4)', borderColor: `${d.color}33` }}>
            <p className="text-[10px] tracking-[0.3em] uppercase mb-1.5" style={{ color: d.color }}>
              {language === 'en' ? 'Essence' : 'الجوهر'}
            </p>
            <p className="text-slate-300 text-sm italic leading-relaxed">
              {language === 'en' ? d.essenceEn : d.essenceAr}
            </p>
          </div>
          <div className="rounded-xl p-4 border" style={{ background: 'rgba(0,0,0,0.4)', borderColor: `${d.color}33` }}>
            <p className="text-[10px] tracking-[0.3em] uppercase mb-1.5" style={{ color: d.color }}>
              {language === 'en' ? 'Its Question' : 'سؤالها'}
            </p>
            <p className="text-slate-200 text-sm italic">{language === 'en' ? d.questionEn : d.questionAr}</p>
          </div>
          <div className="rounded-xl p-4 border" style={{ background: 'rgba(0,0,0,0.4)', borderColor: `${d.color}33` }}>
            <p className="text-[10px] tracking-[0.3em] uppercase mb-1.5" style={{ color: d.color }}>
              {language === 'en' ? 'Shadow' : 'الظل'}
            </p>
            <p className="text-slate-300 text-sm italic leading-relaxed">
              {language === 'en' ? d.shadowEn : d.shadowAr}
            </p>
          </div>
          <div className="rounded-xl p-4 border" style={{ background: 'rgba(0,0,0,0.4)', borderColor: `${d.color}33` }}>
            <p className="text-[10px] tracking-[0.3em] uppercase mb-1.5" style={{ color: d.color }}>
              {language === 'en' ? 'What It Needs' : 'ما تحتاجه'}
            </p>
            <p className="text-slate-300 text-sm italic">{language === 'en' ? d.needEn : d.needAr}</p>
          </div>
        </div>
      )
    }

    if (selected.type === 'chakra') {
      return (
        <div className="space-y-3">
          <div className="rounded-xl p-4 border" style={{ background: 'rgba(0,0,0,0.4)', borderColor: `${d.color}33` }}>
            <p className="text-[10px] tracking-[0.3em] uppercase mb-1.5" style={{ color: d.color }}>
              {language === 'en' ? 'Location & Element' : 'الموقع والعنصر'}
            </p>
            <p className="text-slate-300 text-sm italic">
              {language === 'en' ? d.locationEn : d.locationAr} · {language === 'en' ? d.elementEn : d.elementAr}
            </p>
          </div>
          <div className="rounded-xl p-4 border" style={{ background: 'rgba(0,0,0,0.4)', borderColor: `${d.color}33` }}>
            <p className="text-[10px] tracking-[0.3em] uppercase mb-1.5" style={{ color: d.color }}>
              {language === 'en' ? 'The Wound' : 'الجرح'}
            </p>
            <p className="text-slate-300 text-sm italic leading-relaxed">
              {language === 'en' ? d.woundEn : d.woundAr}
            </p>
          </div>
          <div className="rounded-xl p-4 border" style={{ background: 'rgba(0,0,0,0.4)', borderColor: `${d.color}33` }}>
            <p className="text-[10px] tracking-[0.3em] uppercase mb-1.5" style={{ color: d.color }}>
              {language === 'en' ? 'Balanced' : 'متوازنة'}
            </p>
            <p className="text-slate-300 text-sm italic leading-relaxed">
              {language === 'en' ? d.balancedEn : d.balancedAr}
            </p>
          </div>
          <div className="rounded-xl p-4 border" style={{ background: 'rgba(0,0,0,0.4)', borderColor: `${d.color}33` }}>
            <p className="text-[10px] tracking-[0.3em] uppercase mb-1.5" style={{ color: d.color }}>
              {language === 'en' ? 'Disturbed' : 'مضطربة'}
            </p>
            <p className="text-slate-300 text-sm italic leading-relaxed">
              {language === 'en' ? d.disturbedEn : d.disturbedAr}
            </p>
          </div>
          <div className="rounded-xl p-4 border" style={{ background: 'rgba(0,0,0,0.4)', borderColor: `${d.color}33` }}>
            <p className="text-[10px] tracking-[0.3em] uppercase mb-1.5" style={{ color: d.color }}>
              {language === 'en' ? 'Lesson' : 'الدرس'}
            </p>
            <p className="text-slate-200 text-sm italic">{language === 'en' ? d.lessonEn : d.lessonAr}</p>
          </div>
        </div>
      )
    }

    if (selected.type === 'pole') {
      return (
        <div className="space-y-3">
          <div className="rounded-xl p-4 border" style={{ background: 'rgba(0,0,0,0.4)', borderColor: `${d.color}33` }}>
            <p className="text-[10px] tracking-[0.3em] uppercase mb-1.5" style={{ color: d.color }}>
              {language === 'en' ? 'Essence' : 'الجوهر'}
            </p>
            <p className="text-slate-300 text-sm italic leading-relaxed">
              {language === 'en' ? d.essenceEn : d.essenceAr}
            </p>
          </div>
          <div className="rounded-xl p-4 border" style={{ background: 'rgba(0,0,0,0.4)', borderColor: `${d.color}33` }}>
            <p className="text-[10px] tracking-[0.3em] uppercase mb-1.5" style={{ color: d.color }}>
              {language === 'en' ? 'Shadow' : 'الظل'}
            </p>
            <p className="text-slate-300 text-sm italic leading-relaxed">
              {language === 'en' ? d.shadowEn : d.shadowAr}
            </p>
          </div>
          <div className="rounded-xl p-4 border" style={{ background: 'rgba(0,0,0,0.4)', borderColor: `${d.color}33` }}>
            <p className="text-[10px] tracking-[0.3em] uppercase mb-1.5" style={{ color: d.color }}>
              {language === 'en' ? 'The Sovereign Version' : 'النسخة السيادية'}
            </p>
            <p className="text-slate-300 text-sm italic leading-relaxed">
              {language === 'en' ? d.sovereignEn : d.sovereignAr}
            </p>
          </div>
        </div>
      )
    }

    if (selected.type === 'auraColor') {
      return (
        <div className="space-y-3">
          <div className="rounded-xl p-4 border" style={{ background: 'rgba(0,0,0,0.4)', borderColor: `${d.color}33` }}>
            <p className="text-[10px] tracking-[0.3em] uppercase mb-1.5" style={{ color: d.color }}>
              {language === 'en' ? 'Meaning' : 'المعنى'}
            </p>
            <p className="text-slate-300 text-sm italic leading-relaxed">
              {language === 'en' ? d.meaningEn : d.meaningAr}
            </p>
          </div>
          <div className="rounded-xl p-4 border" style={{ background: 'rgba(0,0,0,0.4)', borderColor: `${d.color}33` }}>
            <p className="text-[10px] tracking-[0.3em] uppercase mb-1.5" style={{ color: d.color }}>
              {language === 'en' ? 'Shadow' : 'الظل'}
            </p>
            <p className="text-slate-300 text-sm italic leading-relaxed">
              {language === 'en' ? d.shadowEn : d.shadowAr}
            </p>
          </div>
        </div>
      )
    }

    if (selected.type === 'auraLayer') {
      return (
        <div className="space-y-3">
          <div className="rounded-xl p-4 border" style={{ background: 'rgba(0,0,0,0.4)', borderColor: `${d.color}33` }}>
            <p className="text-[10px] tracking-[0.3em] uppercase mb-1.5" style={{ color: d.color }}>
              {language === 'en' ? 'What It Represents' : 'ماذا تمثل'}
            </p>
            <p className="text-slate-300 text-sm italic leading-relaxed">
              {language === 'en' ? d.meaningEn : d.meaningAr}
            </p>
          </div>
          <div className="rounded-xl p-4 border" style={{ background: 'rgba(0,0,0,0.4)', borderColor: `${d.color}33` }}>
            <p className="text-[10px] tracking-[0.3em] uppercase mb-1.5" style={{ color: d.color }}>
              {language === 'en' ? 'The Question' : 'السؤال'}
            </p>
            <p className="text-slate-200 text-sm italic">{language === 'en' ? d.questionEn : d.questionAr}</p>
          </div>
        </div>
      )
    }

    if (selected.type === 'frequency') {
      return (
        <div className="rounded-xl p-4 border" style={{ background: 'rgba(0,0,0,0.4)', borderColor: `${d.color}33` }}>
          <p className="text-[10px] tracking-[0.3em] uppercase mb-1.5" style={{ color: d.color }}>
            {language === 'en' ? 'Symbolic Use' : 'الاستخدام الرمزي'}
          </p>
          <p className="text-slate-300 text-sm italic leading-relaxed">
            {language === 'en' ? d.meaningEn : d.meaningAr}
          </p>
        </div>
      )
    }

    return null
  }

  return (
    <div
      className="min-h-screen overflow-hidden relative selection:bg-cyan-500/30 selection:text-cyan-100"
      style={{
        background: 'radial-gradient(ellipse at 50% -10%, #05102e 0%, #020722 35%, #010212 70%, #000208 100%)',
        fontFamily: "'Cormorant Garamond', 'Georgia', serif",
      }}
    >
      {/* Starfield */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {stars.map((s) => (
          <div key={s.id} className="absolute rounded-full"
            style={{
              left: s.x + '%', top: s.y + '%',
              width: s.size + 'px', height: s.size + 'px',
              background: 'rgba(160, 190, 255, 0.85)',
              boxShadow: '0 0 4px rgba(140, 180, 255, 0.7)',
              animation: `twinkle ${s.duration}s ease-in-out infinite`,
              animationDelay: s.delay + 's',
            }} />
        ))}
      </div>

      {/* Top cyan glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70vw] h-[40vh] pointer-events-none opacity-60"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(34,211,238,0.12) 0%, transparent 60%)' }} />

      {/* NAV */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-6 flex justify-between items-center">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push('/space')}
          className="text-cyan-300/80 hover:text-cyan-200 transition-all duration-300 flex items-center gap-2 text-xs tracking-[0.25em] uppercase bg-cyan-950/30 border border-cyan-800/40 backdrop-blur-md px-4 py-2 rounded-full"
        >
          ← {language === 'en' ? 'Return to Space' : 'العودة إلى الفضاء'}
        </motion.button>
        <button
          onClick={toggleLanguage}
          className="px-4 py-2 bg-cyan-950/30 rounded-full text-cyan-200 text-xs tracking-widest uppercase hover:bg-cyan-900/40 transition-all duration-300 border border-cyan-800/40 backdrop-blur-md"
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
          <ChakraIcon color="#22d3ee" size={22} />
          <StarIcon color="#a78bfa" size={22} />
          <AuraIcon color="#34d399" size={22} />
          <FrequencyIcon color="#fcd34d" size={22} />
          <StarIcon color="#22d3ee" size={22} />
        </div>
        <h1
          className="text-4xl md:text-6xl font-light tracking-[0.15em] italic"
          style={{
            color: '#cffafe',
            textShadow: '0 0 30px rgba(34,211,238,0.5), 0 0 80px rgba(2,62,138,0.5)',
          }}
        >
          {language === 'en' ? 'Energy & Consciousness' : 'الطاقة والوعي'}
        </h1>
        <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent mx-auto mt-6" />
        <p className="text-cyan-400/70 text-xs tracking-[0.5em] uppercase mt-5">
          {language === 'en' ? 'Theory · Chakras · Polarity · Aura · Frequency' : 'النظرية · الشاكرات · القطبان · الهالة · الترددات'}
        </p>
      </motion.div>

      {/* TABS */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-wrap justify-center gap-3 md:gap-5 mb-10 border-b border-cyan-400/10 pb-6 text-xs md:text-sm tracking-widest font-serif">
          {tabs.map((t) => {
            const active = activeTab === t.key
            return (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className="px-3 py-1.5 transition-all duration-300 flex items-center gap-2"
                style={{
                  color: active ? t.color : '#64748b',
                  textShadow: active ? `0 0 12px ${t.color}66` : 'none',
                  borderBottom: active ? `1px solid ${t.color}` : '1px solid transparent',
                }}
              >
                <t.Icon color={active ? t.color : '#64748b'} size={16} />
                {language === 'en' ? t.labelEn : t.labelAr}
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="min-h-[400px]"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* MODAL */}
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
                background: 'linear-gradient(180deg, #050c22, #010208)',
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
                <CloseIcon color={selected.data.color ?? '#22d3ee'} />
              </button>

              <div className="text-center mb-6">
                <div className="text-xs tracking-[0.3em] uppercase mb-3"
                  style={{ color: `${selected.data.color ?? accent}cc` }}>
                  {selected.type === 'source' ? (language === 'en' ? 'Energy Source' : 'مصدر الطاقة')
                    : selected.type === 'chakra' ? (selected.data.sanskrit)
                    : selected.type === 'pole' ? (language === 'en' ? 'Polarity' : 'القطبية')
                    : selected.type === 'auraColor' ? (language === 'en' ? 'Aura Color' : 'لون الهالة')
                    : selected.type === 'auraLayer' ? (language === 'en' ? 'Aura Layer' : 'طبقة الهالة')
                    : selected.type === 'frequency' ? (language === 'en' ? 'Frequency' : 'تردد')
                    : ''}
                </div>
                <h2 className="text-2xl italic font-light tracking-wide text-slate-100">
                  {selected.type === 'frequency'
                    ? `${selected.data.hz} Hz`
                    : (language === 'en' ? selected.data.nameEn : selected.data.nameAr)}
                </h2>
                <div className="w-16 h-[1px] mx-auto my-3"
                  style={{ background: `linear-gradient(to right, transparent, ${selected.data.color ?? accent}88, transparent)` }} />
              </div>

              {renderModalBody()}
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
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
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