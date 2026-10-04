'use client'

import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'

/* ============================================================
   ELEGANT SVG ICONS
   ============================================================ */
const ClockIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.2" />
    <path d="M12 7v5l3 2" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const DigitIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
    <circle cx="7" cy="12" r="3" stroke={color} strokeWidth="1.2" />
    <circle cx="17" cy="12" r="3" stroke={color} strokeWidth="1.2" />
  </svg>
)

const MasterIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
    <path d="M12 3 4 12l8 9 8-9-8-9Z" stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M12 7v10" stroke={color} strokeWidth="1" opacity="0.6" />
  </svg>
)

const AngelIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
    <path d="M12 4c-2 3-2 5 0 8 2-3 2-5 0-8Z" stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M5 10c1.5 3 3.5 4 6 3M19 10c-1.5 3-3.5 4-6 3" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="12" cy="15" r="5" stroke={color} strokeWidth="1.2" />
  </svg>
)

const PathIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
    <path d="M4 20c4-2 4-8 8-10s6-4 8-6" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="4" cy="20" r="1.5" fill={color} />
    <circle cx="20" cy="4" r="1.5" fill={color} />
  </svg>
)

const TracksIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
    <path d="M5 4v16M12 4v16M19 4v16" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
    <circle cx="5" cy="9" r="1.5" fill={color} />
    <circle cx="12" cy="14" r="1.5" fill={color} />
    <circle cx="19" cy="8" r="1.5" fill={color} />
  </svg>
)

const SequenceIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
    <path d="M4 6h4v4H4zM10 10h4v4h-4zM16 14h4v4h-4z" stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
)

const FormulaIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
    <path d="M5 6h6M5 12h10M5 18h8" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    <circle cx="18" cy="6" r="2" stroke={color} strokeWidth="1.2" />
    <circle cx="18" cy="18" r="2" stroke={color} strokeWidth="1.2" />
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

const coreNumbers = [
  { number: '0', meaningEn: 'The Divine Source — absolute potential, cosmic oneness, and the unmanifested void from which all creation arises. You are at a point of absolute origin or entering a fresh cycle. Trust your spiritual journey without being tethered to past limitations.', meaningAr: 'المصدر الإلهي — الطاقة المطلقة، الفراغ الذي يخلق كل شيء، والفرص اللانهائية. أنتِ في نقطة الصفر أو بداية دورة جديدة كاملة. اتصل بروحك، واستمع لرحلتك دون قيود أو مخاوف سابقة.' },
  { number: '1', meaningEn: 'The energy of creation, individuality, willpower, and pioneering new pathways. Maintain sharp focus on your thoughts, as they manifest swiftly. Take bold, decisive action and embrace your original identity.', meaningAr: 'طاقة الخلق، الفرادة، قوة الإرادة، والبدء بالمشاريع. ركّز على أفكارك لأنها تتجلى بسرعة. اتخذ خطوات جريئة نحو أهدافك، ولا تخف من الأصالة والانفراد.' },
  { number: '2', meaningEn: 'The frequency of harmony, co-operation, patience, and duality. Exercise patience and trust the unseen work unfolding behind the scenes. Nurture your relationships and avoid forcing outcomes.', meaningAr: 'طاقة التناغم، التعاون، الصبر، والازدواجية. كن صبوراً وثق بالوقائع خلف الكواليس. عزّز علاقاتك ولا تتعجّل النتائج.' },
  { number: '3', meaningEn: 'The energy of expansion, creative self-expression, and joy — connected to spiritual guides and higher wisdom. Express your authentic truth. Authentic joy and open communication attract alignment.', meaningAr: 'طاقة النمو، النمو الروحي، والتعبير عن الذات — يرتبط بالمرشدين الروحيين والمعلمين المقرّبين. عبّر عن أفكارك وإبداعك بصدق. فرحتك وطاقتك الإيجابية هي مفتاح جذب الفرص.' },
  { number: '4', meaningEn: 'The vibration of solid foundations, order, practical work, and the four classical elements. Organise your intentions and establish a clear plan. Methodical, steady efforts secure your long-term success.', meaningAr: 'طاقة الأساسات الصلبة، الانضباط، العمل الجاد، والعناصر الأربعة. حان الوقت لتنظيم حياتك وبناء خطة عمل واضحة. خطاك الثابتة هي ما سيضمن نجاحك المستقبلي.' },
  { number: '5', meaningEn: 'The frequency of dynamic change, adventure, personal liberty, and pivotal life shifts. Major changes are imminent. Embrace them with flexibility — they are designed to expand your horizons.', meaningAr: 'طاقة التحول، المغامرة، والمرونة. هناك تغييرات قادمة حتمية؛ تقبّلها بمرونة ولا تقاوم التحولات لأنها تقودك لنظرة أوسع وحرية أكبر.' },
  { number: '6', meaningEn: 'The energy of unconditional love, domestic balance, responsibility, and healing. Restore balance between material ambitions and personal well-being. Care for yourself and your environment.', meaningAr: 'طاقة الحب اللامشروط، الأسرة، المسؤولية، والرعاية. حافظ على التوازن بين أهدافك المادية والعاطفية والروحية. اعتنِ بنفسك والمحيطين بك.' },
  { number: '7', meaningEn: 'The number of deep knowledge, spiritual awakening, intuition, and introspection. You are on the correct path for inner evolution. Set aside time for solitude, study, and meditation.', meaningAr: 'رقم المعرفة العميق، البحث عن الحقيقة، الحدس، والصحوة الروحية. أنت على الطريق الصحيح لتطوير وعيك. خذ وقتاً للعزلة والتأمل والتعلّم العميق.' },
  { number: '8', meaningEn: 'The frequency of material manifestation, karmic balance, financial flow, and personal authority. You are reaping what you have sown. Balance taking with giving, and handle your power wisely.', meaningAr: 'طاقة التجلي المادي، الكارما، النجاح المالي، والقوة الشخصية. ما زرعته تعصده الآن. تذكّر أن الوفرة تتطلب التوازن بين الأخذ والعطاء واستخدام القوة بحكمة.' },
  { number: '9', meaningEn: 'The energy of universal consciousness, closure, wisdom, and selfless service. Release what no longer serves your higher purpose. Conclude old chapters to clear space for a new cycle.', meaningAr: 'طاقة الحكمة العالية، إغلاق الدوائر، والوعي الشامل. حان الوقت للتخلي عن كل ما لا يخدمك. أغلق مرحلة قديمة لتستعد لاستقبال دورة حياة جديدة.' },
]

const masterNumbers = [
  { number: '11', meaningEn: 'The Intuitive Lightbringer — heightened intuition, illumination, and spiritual insight. Trust your instincts and act as an inspirational beacon for others.', meaningAr: 'المستبصر النوراني — حدس إلهامي قوي وإشعاع فكري. رسالته أن تتبع حسك الداخلي وتكون نوراً لغيرك.' },
  { number: '22', meaningEn: 'The Master Architect — combines the visionary insight of 11 with the grounded practicality of 4. Turn grand spiritual concepts into concrete reality.', meaningAr: 'البنّاء الأعظم — يجمع بين حدس الـ 11 وتجسيد الـ 4. رسالته تحويل الأحلام الكبيرة والأفكار الروحية إلى واقع مادي ملموس.' },
  { number: '33', meaningEn: 'The Master Teacher — unconditional love, cosmic healing, and spiritual devotion. Uplift humanity through compassionate wisdom and service.', meaningAr: 'المعلم الروحي — الشفاء الكوني والحب اللامشروط. رسالته خدمة البشرية والتعبير عن الحكمة من خلال الحب.' },
]

const angelNumbers = [
  { number: '111', meaningEn: 'The Portal of Manifestation — your thoughts rapidly translate into reality. Align your mind strictly with your intended outcomes rather than your fears. You are actively constructing your reality through focus.', meaningAr: 'بوابة التجلي والصحوة — أفكارك تتجلى فوراً في هذه اللحظة. اضبط ذهنك على ما تريد لا على ما تخاف منه. تذكّر أنك الخالق لواقعك عبر النية والتركيز.' },
  { number: '222', meaningEn: 'Divine Timing & Faith — things are developing precisely as intended under divine order. Do not rush. Maintain faith and patience, even if physical evidence has not yet materialised.', meaningAr: 'الإيمان والتوازن — كل شيء يسير وفق الخطة الإلهية بالوقت المناسب. لا تستعجل، حافظ على إيمانك وثقتك ولا تتخلّ عن مسارك حتى لو لم تظهر النتائج فوراً.' },
  { number: '333', meaningEn: 'Spiritual Guidance & Encouragement — you are closely supported by spiritual guides and higher frequencies. Express your truth with confidence and seek inner guidance whenever needed.', meaningAr: 'الدعم والتوجيه — أنت محاط بمرشديك وطاقات الدعم الروحي. لست وحدك؛ اطلب المساعدة والاستجابة حاضرة. عبّر عن حقيقتك بثقة.' },
  { number: '444', meaningEn: 'Protection & Groundedness — complete spiritual protection and structural support surround you. You are safe and securely anchored. Continue your steady work with reassurance.', meaningAr: 'الحماية والأمان — الحماية الإلهية تشملك من كل جانب. أنت آمن ومحاط بطاقة استقرار؛ استمر في العمل الثابت ودع القلق جانباً.' },
  { number: '555', meaningEn: 'Pivotal Realignment — significant, positive transformations are actively unfolding. Let go of outdated patterns and welcome the new. These shifts align you with your true purpose.', meaningAr: 'التحول والتحرير — تغييرات كبيرة وإيجابية في الطريق إليك. حرّر المعتقدات القديمة، ورحّب بالجديد بفرح؛ التغيير القادم يأتي لمصلحتك الروحية.' },
  { number: '666', meaningEn: 'Recalibration & Rebalancing — your focus has become overly dominated by material anxieties or fear-based thinking. Recalibrate your thoughts and elevate your perspective.', meaningAr: 'إعادة التوازن والتركيز — تركيزك مائل بشكل مفرط نحو الماديات أو الأفكار القائمة على الخوف. اضبط أفكارك وارفع تردداتك. أعد التوازن بين الجسد والعقل والروح.' },
  { number: '777', meaningEn: 'Alignment & Divine Grace — you are operating in synchronicity with the universe and your higher path. Stay your current course. You are in full alignment with your spiritual trajectory.', meaningAr: 'التزامن والحظ السعيد — أنت تعمل بتناغم تام مع الكون وطاقتك متطابقة مع مسارك الروحي. تهانينا، استمر على هذا الطريق؛ الفرص والنجاحات مستحقة.' },
  { number: '888', meaningEn: 'The Flow of Abundance — a period of energetic equilibrium, material success, and financial flow. Receive abundance with gratitude and steward your resources responsibly.', meaningAr: 'الوفرة والتدفق المالي — تدفق طاقي كبير للفرص، النجاح، والموارد المادية. استقبل الوفرة بامتنان واستخدمها بوعي ومسؤولية.' },
  { number: '999', meaningEn: 'Closure & Resolution — the conclusion of a significant epoch in your life. Forgive, release the past, and step forward unburdened into the next phase of your journey.', meaningAr: 'النهاية وبداية فصل جديد — اكتمال المرحلة الحالية من حياتك. أطلق سراح الماضي، سامح، واستعد لبدء مرحلة جديدة من رسالتك الشخصية.' },
]

const compoundNumbers = [
  { number: '1234', meaningEn: 'Sequential Progress — your life is moving forward in proper, step-by-step order. Trust the natural gradient of your growth.', meaningAr: 'خطوات متتالية نحو النمو؛ حياتك تسير بالاتجاه والتدرج الصحيح خطوة بخطوة.' },
  { number: '1010', meaningEn: 'Personal Realignment — a call towards personal awakening and self-mastery. Focus on refining your consciousness and personal goals.', meaningAr: 'بداية تحول وتطور شخصي كبير؛ ركّز على النمو الذاتي والارتقاء بالوعي.' },
  { number: '1212', meaningEn: 'Mindset Elevation — release doubts and maintain high expectations. Your current mental framework is directly shaping upcoming events.', meaningAr: 'التخلي عن الخوف والشك؛ حافظ على التفكير الإيجابي لتوليد طاقة تجلٍّ سريعة.' },
  { number: '2121', meaningEn: 'Harmonious Partnerships — trust your intuition regarding collaborations and relationships. You are establishing a period of peace and mutual trust.', meaningAr: 'ثق بحدسك وشراكاتك؛ أنت تبني مرحلة قائمة على التناغم والسلام الداخلي.' },
]

const lifePathNumbers = [
  { number: '1', nameEn: 'The Pioneer', nameAr: 'القائد المبتكر', meaningEn: 'A path of autonomy, innovation, leadership, and self-reliance.', meaningAr: 'مسار الاستقلالية، الريادة، والاعتماد على الذات.' },
  { number: '2', nameEn: 'The Diplomat', nameAr: 'الدبلوماسي الشافي', meaningEn: 'A path of harmony, co-operation, balance, and fine-tuned intuition.', meaningAr: 'مسار التعاون، التوازن، والعلاقات السليمة.' },
  { number: '3', nameEn: 'The Creative', nameAr: 'المبدع المعبّر', meaningEn: 'A path of artistic expression, joyful communication, and inspiration.', meaningAr: 'مسار التعبير الفني، التواصل الإيجابي، والبهجة.' },
  { number: '4', nameEn: 'The Master Builder', nameAr: 'البنّاء المنظّم', meaningEn: 'A path of order, practical discipline, structure, and perseverance.', meaningAr: 'مسار العمل الثابت، الانضباط، وبناء الأساسات القوية.' },
  { number: '5', nameEn: 'The Explorer', nameAr: 'المكتشف الحر', meaningEn: 'A path of personal liberty, adventure, adaptability, and evolution.', meaningAr: 'مسار المغامرة، التكيف، والتحولات الكبرى.' },
  { number: '6', nameEn: 'The Nurturer', nameAr: 'المغذّي الراعي', meaningEn: 'A path of domestic responsibility, healing, unconditional care, and service.', meaningAr: 'مسار المسؤولية، الأسرة، والخدمة المحبة.' },
  { number: '7', nameEn: 'The Seeker', nameAr: 'الباحث الحكيم', meaningEn: 'A path of analytical contemplation, spiritual inquiry, and wisdom.', meaningAr: 'مسار التحليل العميق، المعرفة الداخلية، والروحانيات.' },
  { number: '8', nameEn: 'The Powerhouse', nameAr: 'القيادي التنفيذي', meaningEn: 'A path of material mastery, financial authority, karma, and ambition.', meaningAr: 'مسار الوفرة المادية، القوة الشخصية، والكارما.' },
  { number: '9', nameEn: 'The Humanitarian', nameAr: 'الإنساني الشامل', meaningEn: 'A path of universal consciousness, culmination, and selfless devotion.', meaningAr: 'مسار الحكمة الكونية، التسامح، وإنهاء الدوائر القديمة.' },
  { number: '11', nameEn: 'The Illuminator (Master)', nameAr: 'المستبصر النوراني (رئيسي)', meaningEn: 'Heightened intuitive insight and spiritual inspiration.', meaningAr: 'حدس إلهامي قوي وإشعاع فكري.' },
  { number: '22', nameEn: 'The Master Architect (Master)', nameAr: 'البناء الأعظم (رئيسي)', meaningEn: 'Transforming lofty ideals into physical realities.', meaningAr: 'قدرة تجسيد الأحلام الروحية في واقع مادي.' },
  { number: '33', nameEn: 'The Master Teacher (Master)', nameAr: 'المعلم الروحي (رئيسي)', meaningEn: 'Altruistic healing, cosmic wisdom, and devotion to uplifting others.', meaningAr: 'حب لامشروط وخدمة مجتمعية عميقة.' },
]

const otherTracks = [
  {
    id: 'soul-urge',
    nameEn: "Soul Urge (Heart's Desire) Number",
    nameAr: 'رقم رغبة الروح (Soul Urge)',
    meaningEn: 'Your hidden motivations, the deep desires of your heart, and what your soul secretly yearns for beyond the pressures of the outer world.',
    meaningAr: 'دوافعك الخفية، رغبات قلبك العميقة، وما تطمح إليه روحك سراً بعيداً عن ضغوط العالم الخارجي.',
    calcEn: 'Calculated using ONLY the vowels (A, E, I, O, U) of your full birth name.',
    calcAr: 'يُحسب فقط باستخدام أرقام الحروف المتحركة (A, E, I, O, U) في اسمك الكامل عند الولادة.',
    color: '#a855f7',
  },
  {
    id: 'personality',
    nameEn: 'Personality Number',
    nameAr: 'رقم الشخصية الخارجية',
    meaningEn: 'The mask or first impression you leave on others when they meet you — how the outer world perceives you.',
    meaningAr: 'القناع أو الانطباع الأولي الذي تتركه لدى الآخرين عند أول لقاء — كيف يراك العالم الخارجي.',
    calcEn: 'Calculated using the consonants of your full birth name.',
    calcAr: 'يُحسب باستخدام أرقام الحروف الساكنة (Consonants) في اسمك الكامل.',
    color: '#7cc7f0',
  },
  {
    id: 'expression',
    nameEn: 'Expression / Destiny Number',
    nameAr: 'رقم القدر أو التعبير',
    meaningEn: 'The natural talents and latent abilities you were born with, and the role you came to fulfil in this lifetime.',
    meaningAr: 'المواهب الطبيعية والقدرات الكامنة التي وُلدت بها، والدور الذي جئت لتؤديه في هذه الحياة.',
    calcEn: 'Calculated by summing the values of ALL letters (vowels + consonants) of your full name.',
    calcAr: 'يُحسب بجمع قيم جميع حروف اسمك الكامل (الساكنة والمتحركة معاً).',
    color: '#d4af6a',
  },
  {
    id: 'maturity',
    nameEn: 'Maturity Number',
    nameAr: 'رقم النضج',
    meaningEn: 'Its influence emerges clearly in the second half of life (usually after mid-life). It reveals the true goals and spiritual direction your energy settles into with age and experience.',
    meaningAr: 'يظهر تأثيره بوضوح في النصف الثاني من حياتك (عادة بعد منتصف العمر)، ويدل على الأهداف الحقيقية والتوجه الروحي الذي تستقر عليه طاقتك مع تقدم السن والخبرة.',
    calcEn: 'Add your Life Path Number to your Expression Number, then reduce to a single digit.',
    calcAr: 'يُجمع رقم مسار الحياة مع رقم التعبير ثم يُختزلان إلى رقم مفرد.',
    color: '#f0a6c8',
  },
  {
    id: 'pinnacles',
    nameEn: 'Life Cycles / Pinnacle Numbers',
    nameAr: 'أرقام دورات الحياة (Pinnacles)',
    meaningEn: 'Life is divided into 4 major phases (pinnacles), each with its own number determining the energy, opportunities, and key challenges you face during that specific age period.',
    meaningAr: 'تنقسم حياة الإنسان إلى 4 مراحل أو قمم رئيسية، لكل مرحلة رقم خاص يحدد نوع الطاقة، الفرص، والتحديات الكبرى في كل عمر.',
    calcEn: 'Each pinnacle is calculated from your birth date using a specific formula (varies by pinnacle).',
    calcAr: 'تُحسب كل قمة من تاريخ ميلادك باستخدام معادلة خاصة (تختلف حسب القمة).',
    color: '#6ee7b7',
  },
]

const calculationData = {
  titleEn: 'How to Calculate Your Life Path Number',
  titleAr: 'كيفية حساب رقم مسار الحياة',
  ruleEn: 'Reduce the Day, Month, and Year components individually first, then sum the three resultant values and reduce to a final single digit or Master Number (11, 22, 33 — never reduced).',
  ruleAr: 'تُختزل خانة اليوم وخانة الشهر وخانة السنة كلٌّ على حدة أولاً، ثم تُجمع النواتج الثلاثة وتُختزل للوصول للرقم النهائي. الأرقام الرئيسية (11، 22، 33) لا تُختزل.',
  exampleEn: [
    'Birth date: 5th November 1830 (05 / 11 / 1830)',
    'Month: November = 11 → 1 + 1 = 2',
    'Day: 5',
    'Year: 1830 → 1 + 8 + 3 + 0 = 12 → 1 + 2 = 3',
    'Sum: 2 + 5 + 3 = 10 → 1 + 0 = 1',
    'Result: Life Path Number 1 — The Pioneer, Innovator and Leader.',
  ],
  exampleAr: [
    'تاريخ الميلاد: 5 نوفمبر 1830 (05 / 11 / 1830)',
    'الشهر: نوفمبر = 11 → 1 + 1 = 2',
    'اليوم: 5',
    'السنة: 1830 → 1 + 8 + 3 + 0 = 12 → 1 + 2 = 3',
    'الجمع: 2 + 5 + 3 = 10 → 1 + 0 = 1',
    'النتيجة: رقم مسار الحياة 1 — القائد، المبتكر، والرائد.',
  ],
}

const howToWorkEn = [
  'Observe Your Immediate State — pay close attention to what you were thinking, feeling, or doing the exact moment a sequence caught your attention.',
  'Acknowledge the Synchronicity — accept the observation with simple gratitude; acknowledging strengthens your intuitive awareness.',
  'Avoid Forcing Matches — true numeric synchronicities occur spontaneously. Do not actively hunt for numbers — allow them to present themselves naturally.',
]
const howToWorkAr = [
  'لاحظ شعورك وأفكارك لحظة رؤية الرقم — غالباً ما تكون الرسالة متعلقة بالأفكار التي كانت تدور في ذهنك في نفس اللحظة.',
  'شكر الامتنان — اعترف بالرسالة بالامتنان، لأن ذلك يزيد من استقبالك للتوجيه الداخلي.',
  'لا تتصنّع البحث عنها — الأرقام الملائكية تجد طريقها إليك بعفوية وبشكل متكرر ملفت للانتباه.',
]

/* ============================================================
   PAGE
   ============================================================ */
type TabKey = 'core' | 'master' | 'angel' | 'compound' | 'lifePath' | 'otherTracks' | 'calculation' | 'howTo'
type Selected = { data: any } | null

export default function NumerologyPage() {
  const router = useRouter()
  const { language, toggleLanguage } = useLanguage()
  const [activeTab, setActiveTab] = useState<TabKey>('core')
  const [selected, setSelected] = useState<Selected>(null)

  const tabs: { key: TabKey; labelEn: string; labelAr: string; Icon: any; color: string }[] = [
    { key: 'core',        labelEn: 'Core Numbers',    labelAr: 'الأرقام الأساسية',  Icon: DigitIcon,     color: '#7cc7f0' },
    { key: 'master',      labelEn: 'Master Numbers',  labelAr: 'الأرقام الرئيسية',  Icon: MasterIcon,    color: '#c090e0' },
    { key: 'angel',       labelEn: 'Angel Numbers',   labelAr: 'الأرقام الملائكية', Icon: AngelIcon,     color: '#d4af6a' },
    { key: 'compound',    labelEn: 'Sequences',       labelAr: 'المتواليات',        Icon: SequenceIcon,  color: '#6ee7b7' },
    { key: 'lifePath',    labelEn: 'Life Path',       labelAr: 'مسار الحياة',       Icon: PathIcon,      color: '#f0a6c8' },
    { key: 'otherTracks', labelEn: 'Other Tracks',    labelAr: 'المسارات الأخرى',   Icon: TracksIcon,    color: '#a5b4fc' },
    { key: 'calculation', labelEn: 'Calculation',     labelAr: 'طريقة الحساب',      Icon: FormulaIcon,   color: '#fcd34d' },
    { key: 'howTo',       labelEn: 'How to Use',      labelAr: 'كيف تستخدمها',      Icon: ClockIcon,     color: '#93c5fd' },
  ]

  const currentTab = tabs.find(t => t.key === activeTab)!
  const accent = currentTab.color

  const renderCore = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {coreNumbers.map((item, idx) => (
        <motion.button
          key={item.number}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.03 }}
          whileHover={{ scale: 1.03, y: -3 }}
          onClick={() => setSelected({ data: { ...item, title: item.number } })}
          className="text-center rounded-xl p-5 border relative overflow-hidden transition-all duration-300"
          style={{
            background: 'linear-gradient(160deg, rgba(8,12,25,0.7), rgba(4,6,14,0.9))',
            borderColor: 'rgba(124,199,240,0.2)',
          }}
        >
          <span className="absolute top-2 left-2 w-2.5 h-2.5 border-l border-t" style={{ borderColor: 'rgba(124,199,240,0.35)' }} />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 border-r border-t" style={{ borderColor: 'rgba(124,199,240,0.35)' }} />
          <div className="text-4xl font-serif mb-2" style={{ color: '#7cc7f0', textShadow: '0 0 15px rgba(124,199,240,0.55)' }}>
            {item.number}
          </div>
          <p className="text-[#c7beaa]/75 text-[10px] leading-relaxed font-light line-clamp-2">
            {language === 'en' ? item.meaningEn.slice(0, 80) + '…' : item.meaningAr.slice(0, 80) + '…'}
          </p>
        </motion.button>
      ))}
    </div>
  )

  const renderMaster = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
      {masterNumbers.map((item, idx) => (
        <motion.button
          key={item.number}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.12 }}
          whileHover={{ scale: 1.02, y: -3 }}
          onClick={() => setSelected({ data: { ...item, title: item.number } })}
          className="text-left rounded-2xl p-6 border relative overflow-hidden"
          style={{
            background: 'linear-gradient(160deg, rgba(14,10,25,0.75), rgba(6,4,14,0.92))',
            borderColor: 'rgba(192,144,224,0.2)',
          }}
        >
          <span className="absolute top-3 left-3 w-3 h-3 border-l border-t" style={{ borderColor: 'rgba(192,144,224,0.4)' }} />
          <span className="absolute top-3 right-3 w-3 h-3 border-r border-t" style={{ borderColor: 'rgba(192,144,224,0.4)' }} />
          <span className="absolute bottom-3 left-3 w-3 h-3 border-l border-b" style={{ borderColor: 'rgba(192,144,224,0.4)' }} />
          <span className="absolute bottom-3 right-3 w-3 h-3 border-r border-b" style={{ borderColor: 'rgba(192,144,224,0.4)' }} />
          <div className="text-5xl font-serif mb-3" style={{ color: '#c090e0', textShadow: '0 0 20px rgba(192,144,224,0.55)' }}>
            {item.number}
          </div>
          <p className="text-[#c7beaa]/85 text-sm leading-relaxed font-light">
            {language === 'en' ? item.meaningEn : item.meaningAr}
          </p>
        </motion.button>
      ))}
    </div>
  )

  const renderAngel = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {angelNumbers.map((item, idx) => (
        <motion.button
          key={item.number}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          whileHover={{ scale: 1.01, y: -3 }}
          onClick={() => setSelected({ data: { ...item, title: item.number } })}
          className="text-left rounded-2xl p-6 border relative overflow-hidden"
          style={{
            background: 'linear-gradient(160deg, rgba(18,12,25,0.75), rgba(8,4,12,0.92))',
            borderColor: 'rgba(212,175,106,0.2)',
          }}
        >
          <span className="absolute top-3 left-3 w-3 h-3 border-l border-t" style={{ borderColor: 'rgba(212,175,106,0.4)' }} />
          <span className="absolute top-3 right-3 w-3 h-3 border-r border-t" style={{ borderColor: 'rgba(212,175,106,0.4)' }} />
          <span className="absolute bottom-3 left-3 w-3 h-3 border-l border-b" style={{ borderColor: 'rgba(212,175,106,0.4)' }} />
          <span className="absolute bottom-3 right-3 w-3 h-3 border-r border-b" style={{ borderColor: 'rgba(212,175,106,0.4)' }} />
          <div className="flex items-center gap-4 mb-4">
            <div className="text-3xl font-mono font-bold tracking-wider" style={{ color: '#d4af6a', textShadow: '0 0 15px rgba(212,175,106,0.55)' }}>
              {item.number}
            </div>
          </div>
          <p className="text-[#c7beaa]/85 text-sm leading-relaxed font-light">
            {language === 'en' ? item.meaningEn : item.meaningAr}
          </p>
        </motion.button>
      ))}
    </div>
  )

  const renderCompound = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {compoundNumbers.map((item, idx) => (
        <motion.button
          key={item.number}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.08 }}
          whileHover={{ scale: 1.01, y: -3 }}
          onClick={() => setSelected({ data: { ...item, title: item.number } })}
          className="text-left rounded-2xl p-6 border relative overflow-hidden"
          style={{
            background: 'linear-gradient(160deg, rgba(6,18,14,0.75), rgba(3,8,6,0.92))',
            borderColor: 'rgba(110,231,183,0.2)',
          }}
        >
          <span className="absolute top-3 left-3 w-3 h-3 border-l border-t" style={{ borderColor: 'rgba(110,231,183,0.4)' }} />
          <span className="absolute top-3 right-3 w-3 h-3 border-r border-t" style={{ borderColor: 'rgba(110,231,183,0.4)' }} />
          <span className="absolute bottom-3 left-3 w-3 h-3 border-l border-b" style={{ borderColor: 'rgba(110,231,183,0.4)' }} />
          <span className="absolute bottom-3 right-3 w-3 h-3 border-r border-b" style={{ borderColor: 'rgba(110,231,183,0.4)' }} />
          <div className="text-4xl font-mono font-bold tracking-wider mb-4" style={{ color: '#6ee7b7', textShadow: '0 0 15px rgba(110,231,183,0.55)' }}>
            {item.number}
          </div>
          <p className="text-[#c7beaa]/85 text-sm leading-relaxed font-light">
            {language === 'en' ? item.meaningEn : item.meaningAr}
          </p>
        </motion.button>
      ))}
    </div>
  )

  const renderLifePath = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {lifePathNumbers.map((item, idx) => (
        <motion.button
          key={item.number}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.03 }}
          whileHover={{ scale: 1.02, y: -3 }}
          onClick={() => setSelected({ data: { ...item, title: item.number } })}
          className="text-left rounded-xl p-5 border relative overflow-hidden"
          style={{
            background: 'linear-gradient(160deg, rgba(20,10,18,0.7), rgba(10,4,10,0.9))',
            borderColor: 'rgba(240,166,200,0.2)',
          }}
        >
          <span className="absolute top-2 left-2 w-2.5 h-2.5 border-l border-t" style={{ borderColor: 'rgba(240,166,200,0.35)' }} />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 border-r border-t" style={{ borderColor: 'rgba(240,166,200,0.35)' }} />
          <div className="text-4xl font-serif mb-1" style={{ color: '#f0a6c8', textShadow: '0 0 15px rgba(240,166,200,0.55)' }}>
            {item.number}
          </div>
          <div className="text-[10px] tracking-widest uppercase font-serif mb-2" style={{ color: 'rgba(240,166,200,0.8)' }}>
            {language === 'en' ? item.nameEn : item.nameAr}
          </div>
          <p className="text-[#c7beaa]/75 text-[11px] leading-relaxed font-light">
            {language === 'en' ? item.meaningEn : item.meaningAr}
          </p>
        </motion.button>
      ))}
    </div>
  )

  const renderOtherTracks = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {otherTracks.map((track, idx) => (
        <motion.button
          key={track.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.08 }}
          whileHover={{ scale: 1.01, y: -3 }}
          onClick={() => setSelected({ data: { ...track, title: language === 'en' ? '◆' : '◆', meaningEn: track.meaningEn + '\n\n' + track.calcEn, meaningAr: track.meaningAr + '\n\n' + track.calcAr } })}
          className="text-left rounded-2xl p-6 border relative overflow-hidden"
          style={{
            background: `linear-gradient(160deg, ${track.color}15, rgba(4,6,14,0.92))`,
            borderColor: `${track.color}33`,
          }}
        >
          <span className="absolute top-3 left-3 w-3 h-3 border-l border-t" style={{ borderColor: `${track.color}66` }} />
          <span className="absolute top-3 right-3 w-3 h-3 border-r border-t" style={{ borderColor: `${track.color}66` }} />
          <span className="absolute bottom-3 left-3 w-3 h-3 border-l border-b" style={{ borderColor: `${track.color}66` }} />
          <span className="absolute bottom-3 right-3 w-3 h-3 border-r border-b" style={{ borderColor: `${track.color}66` }} />
          <div className="flex items-center gap-3 mb-4">
            <div className="shrink-0"><TracksIcon color={track.color} /></div>
            <h3 className="text-base md:text-lg font-serif tracking-wide uppercase" style={{ color: track.color, textShadow: `0 0 12px ${track.color}66` }}>
              {language === 'en' ? track.nameEn : track.nameAr}
            </h3>
          </div>
          <p className="text-[#c7beaa]/85 text-sm leading-relaxed font-light mb-4">
            {language === 'en' ? track.meaningEn : track.meaningAr}
          </p>
          <div className="rounded-lg px-3 py-2 border" style={{ background: 'rgba(0,0,0,0.4)', borderColor: `${track.color}22` }}>
            <p className="text-[10px] tracking-widest uppercase font-mono mb-1" style={{ color: `${track.color}cc` }}>
              {language === 'en' ? 'How it is calculated' : 'كيف يُحسب'}
            </p>
            <p className="text-[#c7beaa]/80 text-xs leading-relaxed font-light">
              {language === 'en' ? track.calcEn : track.calcAr}
            </p>
          </div>
        </motion.button>
      ))}
    </div>
  )

  const renderCalculation = () => {
    const c = calculationData
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="rounded-2xl p-6 border relative overflow-hidden"
          style={{ background: 'linear-gradient(160deg, rgba(20,16,8,0.75), rgba(8,5,3,0.92))', borderColor: 'rgba(252,211,77,0.2)' }}>
          <span className="absolute top-3 left-3 w-3 h-3 border-l border-t" style={{ borderColor: 'rgba(252,211,77,0.4)' }} />
          <span className="absolute top-3 right-3 w-3 h-3 border-r border-t" style={{ borderColor: 'rgba(252,211,77,0.4)' }} />
          <span className="absolute bottom-3 left-3 w-3 h-3 border-l border-b" style={{ borderColor: 'rgba(252,211,77,0.4)' }} />
          <span className="absolute bottom-3 right-3 w-3 h-3 border-r border-b" style={{ borderColor: 'rgba(252,211,77,0.4)' }} />
          <h3 className="text-lg font-serif tracking-widest uppercase mb-4" style={{ color: '#fcd34d', textShadow: '0 0 15px rgba(252,211,77,0.5)' }}>
            {language === 'en' ? c.titleEn : c.titleAr}
          </h3>
          <p className="text-[#c7beaa]/90 text-sm leading-relaxed mb-5">
            {language === 'en' ? c.ruleEn : c.ruleAr}
          </p>
          <div className="space-y-2 font-mono text-sm">
            {(language === 'en' ? c.exampleEn : c.exampleAr).map((line, i) => (
              <div key={i} className="rounded-lg px-4 py-2 border" style={{ background: 'rgba(0,0,0,0.4)', borderColor: 'rgba(252,211,77,0.15)', color: i === 5 ? '#fcd34d' : '#c7beaa' }}>
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const renderHowTo = () => {
    const items = language === 'en' ? howToWorkEn : howToWorkAr
    return (
      <div className="max-w-3xl mx-auto space-y-4">
        {items.map((text, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12 }}
            className="rounded-2xl p-5 border relative overflow-hidden flex items-start gap-4"
            style={{ background: 'linear-gradient(160deg, rgba(8,12,22,0.75), rgba(3,5,12,0.92))', borderColor: 'rgba(147,197,253,0.2)' }}
          >
            <span className="absolute top-2 left-2 w-2.5 h-2.5 border-l border-t" style={{ borderColor: 'rgba(147,197,253,0.4)' }} />
            <span className="absolute bottom-2 right-2 w-2.5 h-2.5 border-r border-b" style={{ borderColor: 'rgba(147,197,253,0.4)' }} />
            <div className="shrink-0 w-9 h-9 rounded-full border flex items-center justify-center font-serif text-base"
              style={{ color: '#93c5fd', borderColor: 'rgba(147,197,253,0.4)', background: 'rgba(147,197,253,0.08)' }}>
              {i + 1}
            </div>
            <p className="text-[#c7beaa]/90 text-sm leading-relaxed">{text}</p>
          </motion.div>
        ))}
      </div>
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'core': return renderCore()
      case 'master': return renderMaster()
      case 'angel': return renderAngel()
      case 'compound': return renderCompound()
      case 'lifePath': return renderLifePath()
      case 'otherTracks': return renderOtherTracks()
      case 'calculation': return renderCalculation()
      case 'howTo': return renderHowTo()
      default: return null
    }
  }

  return (
    <div className="min-h-screen bg-[#04061a] text-[#e2e8f0] overflow-hidden relative selection:bg-cyan-500/30 selection:text-white">
      {/* cosmic dust glows */}
      <div className="absolute top-[20%] left-[-10%] w-[45vw] h-[45vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)' }} />
      <div className="absolute bottom-[10%] right-[-10%] w-[50vw] h-[50vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)' }} />

      {/* starfield */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {[...Array(120)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-white" style={{
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            width: Math.random() * 1.4 + 0.4 + 'px',
            height: Math.random() * 1.4 + 0.4 + 'px',
            boxShadow: '0 0 4px rgba(255,255,255,0.7)',
            animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
            animationDelay: Math.random() * 4 + 's',
          }} />
        ))}
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-6 flex justify-between items-center">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push('/space')}
          className="text-cyan-300/70 hover:text-cyan-200 transition-all duration-300 flex items-center gap-2 text-xs font-serif tracking-[0.2em]"
        >
          ← {language === 'en' ? 'RETURN TO SPACE' : 'العودة إلى الفضاء'}
        </motion.button>
        <button
          onClick={toggleLanguage}
          className="px-4 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-200 text-xs font-serif hover:border-cyan-400/60 hover:bg-cyan-900/50 transition-all duration-300"
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
        <div className="flex justify-center mb-5 opacity-80">
          <DigitIcon color="#22d3ee" />
        </div>
        <h1
          className="text-3xl md:text-5xl font-serif font-normal tracking-[0.25em]"
          style={{ color: '#67e8f9', textShadow: '0 0 25px rgba(34,211,238,0.55), 0 0 60px rgba(34,211,238,0.25)' }}
        >
          {language === 'en' ? 'NUMEROLOGY' : 'علم الأعداد'}
        </h1>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent mx-auto mt-5" />
        <p className="text-cyan-300/50 text-[10px] tracking-[0.4em] uppercase mt-4 font-serif">
          {language === 'en' ? 'THE MYSTICAL LANGUAGE OF COSMIC VIBRATIONS' : 'اللغة الغامضة للترددات الكونية'}
        </p>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-wrap justify-center gap-3 md:gap-5 mb-8 border-b border-cyan-400/10 pb-6 text-xs md:text-sm tracking-widest font-serif">
          {tabs.map((t) => {
            const active = activeTab === t.key
            return (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className="px-2 py-1 transition-all duration-300 flex items-center gap-2"
                style={{ color: active ? '#67e8f9' : '#64748b', textShadow: active ? '0 0 12px rgba(34,211,238,0.5)' : 'none' }}
              >
                <t.Icon color={active ? '#67e8f9' : '#64748b'} />
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
            style={{ borderColor: 'rgba(34,211,238,0.3)', background: 'rgba(34,211,238,0.05)' }}
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
              <circle cx="12" cy="12" r="9" stroke="#67e8f9" strokeWidth="1.4" />
              <path d="M12 8v0.01M11 12h1v5h1" stroke="#67e8f9" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[10px] md:text-[11px] tracking-[0.28em] uppercase font-serif" style={{ color: '#67e8f9' }}>
              {language === 'en' ? 'Tap any card to reveal its full meaning' : 'اضغط على أي بطاقة لعرض معناها الكامل'}
            </span>
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}>
            {renderContent()}
          </motion.div>
        </AnimatePresence>
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
                background: 'linear-gradient(180deg, #0a0e20, #04061a)',
                borderColor: 'rgba(34,211,238,0.4)',
                boxShadow: '0 0 40px rgba(34,211,238,0.2)',
              }}
            >
              <span className="absolute top-2 left-2 w-3 h-3 border-l border-t border-cyan-400/50" />
              <span className="absolute top-2 right-2 w-3 h-3 border-r border-t border-cyan-400/50" />
              <span className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-cyan-400/50" />
              <span className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-cyan-400/50" />

              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 opacity-60 hover:opacity-100 transition-opacity"
                aria-label="close"
              >
                <CloseIcon color="#67e8f9" />
              </button>

              <div className="text-center mb-6">
                <div className="text-5xl font-serif mb-3" style={{ color: '#67e8f9', textShadow: '0 0 20px rgba(34,211,238,0.55)' }}>
                  {selected.data.title}
                </div>
                {selected.data.nameEn && (
                  <div className="text-xs tracking-widest uppercase font-serif" style={{ color: 'rgba(103,232,249,0.8)' }}>
                    {language === 'en' ? selected.data.nameEn : selected.data.nameAr}
                  </div>
                )}
                <div className="w-16 h-[1px] mx-auto my-3" style={{ background: 'linear-gradient(to right, transparent, rgba(34,211,238,0.6), transparent)' }} />
              </div>

              <div className="rounded-xl p-4 border" style={{ background: 'rgba(0,0,0,0.4)', borderColor: 'rgba(34,211,238,0.2)' }}>
                <p className="text-[#c7beaa] text-sm leading-relaxed whitespace-pre-line">
                  {language === 'en' ? selected.data.meaningEn : selected.data.meaningAr}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; transform: scale(0.9); }
          50% { opacity: 0.9; transform: scale(1.15); }
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