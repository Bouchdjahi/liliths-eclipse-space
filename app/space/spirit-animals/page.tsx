'use client'

import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
/* ============================================================
   SVG ICONS
   ============================================================ */
const PawIcon = ({ color = '#34d399', size = 20 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <ellipse cx="12" cy="16" rx="4" ry="4.5" stroke={color} strokeWidth="1.3" />
    <circle cx="6" cy="10" r="2" stroke={color} strokeWidth="1.3" />
    <circle cx="10" cy="6.5" r="2" stroke={color} strokeWidth="1.3" />
    <circle cx="14" cy="6.5" r="2" stroke={color} strokeWidth="1.3" />
    <circle cx="18" cy="10" r="2" stroke={color} strokeWidth="1.3" />
  </svg>
)
const FeatherIcon = ({ color = '#fcd34d', size = 20 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <path d="M20 4c-6 0-10 4-12 10l-3 6M20 4c0 6-4 10-10 12M20 4 8 16" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
  </svg>
)
const WaterIcon = ({ color = '#38bdf8', size = 20 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <path d="M12 3s-6 7-6 11a6 6 0 1 0 12 0c0-4-6-11-6-11Z" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
)
const LeafIcon = ({ color = '#4ade80', size = 20 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <path d="M20 4C11 4 4 10 4 18c0 1 0 2 .5 2 8-.5 15-6 15.5-16Z" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
    <path d="M4 20c4-4 8-8 16-16" stroke={color} strokeWidth="0.8" opacity="0.6" />
  </svg>
)
const FireIcon = ({ color = '#f97316', size = 20 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <path d="M12 3c2 4 4 5 4 9a4 4 0 1 1-8 0c0-2 1-3 2-4 0 2 1 3 2 3 .5-2 0-4-2-5 1-1 2-2 2-3Z" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
)
const EyeIcon = ({ color = '#a78bfa', size = 20 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <path d="M3 12s3-7 9-7 9 7 9 7-3 7-9 7-9-7-9-7Z" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.3" />
  </svg>
)
const ShadowIcon = ({ color = '#7c3aed', size = 20 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <path d="M12 20c-4 0-7-3-7-7 0-3 2-6 5-7-1 3 1 6 4 6 2 0 4 2 4 4 0 3-3 4-6 4Z" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
)
const SnakeIcon = ({ color = '#a3e635', size = 20 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <path d="M4 20c4 0 4-4 0-4s-4-4 0-4 8 0 8-4-4-4-4-1" stroke={color} strokeWidth="1.4" strokeLinecap="round" fill="none" />
    <circle cx="16" cy="5" r="1.5" stroke={color} strokeWidth="1.2" />
    <circle cx="16.5" cy="5" r="0.4" fill={color} />
  </svg>
)
const CloseIcon = ({ color = '#a8a29e' }: { color?: string }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
    <path d="M6 6l12 12M18 6 6 18" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

/* ============================================================
   ANIMALS
   ============================================================ */
interface Animal {
  id: string
  nameEn: string
  nameAr: string
  emoji: string
  element: string
  type: string
  coreEn: string
  coreAr: string
  spiritEn: string
  spiritAr: string
  powerEn: string
  powerAr: string
  protectionEn: string
  protectionAr: string
  shadowEn: string
  shadowAr: string
  color: string
  group: string
}

const animals: Animal[] = [
  /* APEX PREDATORS */
  { id: 'wolf', nameEn: 'Wolf', nameAr: 'الذئب', emoji: '🐺', element: 'Earth / Air', type: 'Spirit Guide', group: 'apex',
    coreEn: 'Loyalty, deep intuition, freedom, social connection combined with fierce independence.',
    coreAr: 'الولاء، الحدس العميق، الحرية، والجمع بين الروابط الاجتماعية والاستقلالية التامة.',
    spiritEn: 'A call to trust your gut instincts, reclaim your personal power, and find a balance between community loyalty and sovereign autonomy.',
    spiritAr: 'دعوة للثقة بغريزتك، واستعادة قوتك الشخصية، وإيجاد التوازن بين الانتماء للجماعة والسيادة الفردية.',
    powerEn: 'Leadership in groups, instinct, and inner truth.',
    powerAr: 'القيادة في المجموعات، الغريزة، والحقيقة الداخلية.',
    protectionEn: 'Territorial defense and pack awareness.',
    protectionAr: 'الدفاع عن المنطقة والوعي الجماعي.',
    shadowEn: 'Loneliness, emotional suppression, isolation.',
    shadowAr: 'الوحدة، القمع العاطفي، والعزلة.',
    color: 'from-emerald-950/40 to-teal-950/30' },
  { id: 'bear', nameEn: 'Bear', nameAr: 'الدب', emoji: '🐻', element: 'Earth', type: 'Power Animal', group: 'apex',
    coreEn: 'Grounding, strength, introspection, healing, and the power of rest.',
    coreAr: 'التأصيل، القوة، التأمل الداخلي، الشفاء، وقوة الراحة.',
    spiritEn: 'Appears when you are called to slow down, retreat into hibernation to heal burnout, and tap into your inner resilience.',
    spiritAr: 'يظهر عندما تكون مدعواً لإبطاء وتيرة حياتك، والانسحاب للتعافي من الإرهاق، واستدعاء مرونتك الداخلية.',
    powerEn: 'Raw strength and emotional stability.',
    powerAr: 'القوة الخام والاستقرار العاطفي.',
    protectionEn: 'Physical and emotional defense.',
    protectionAr: 'الدفاع الجسدي والعاطفي.',
    shadowEn: 'Anger, isolation, suppression.',
    shadowAr: 'الغضب، العزلة، والقمع.',
    color: 'from-amber-950/40 to-emerald-950/40' },
  { id: 'lion', nameEn: 'Lion / Lioness', nameAr: 'الأسد / اللبوة', emoji: '🦁', element: 'Fire', type: 'Power Animal', group: 'apex',
    coreEn: 'Leadership, courage, majesty, feminine power, and fierce protection.',
    coreAr: 'القيادة، الشجاعة، الجلال، القوة الأنثوية، والحماية الشرسة.',
    spiritEn: 'Signifies it is time to step into your authority, lead with quiet strength, and fiercely protect what matters.',
    spiritAr: 'يدل على أن الوقت قد حان لتولي زمام أمورك، والقيادة بقوة هادئة، وحماية ما يهمك بشراسة.',
    powerEn: 'Dominance over fear and raw courage.',
    powerAr: 'السيطرة على الخوف والشجاعة الخام.',
    protectionEn: 'Territorial energy defense.',
    protectionAr: 'الدفاع الطاقي عن المنطقة.',
    shadowEn: 'Ego, control issues, dominance.',
    shadowAr: 'الأنا، مشاكل السيطرة، والهيمنة.',
    color: 'from-amber-950/40 to-emerald-950/40' },
  { id: 'panther', nameEn: 'Panther / Black Jaguar', nameAr: 'الفهد الأسود', emoji: '🐆', element: 'Earth / Water', type: 'Shadow Animal', group: 'apex',
    coreEn: 'Mystery, reclaiming power, moving through the unknown, and mastering the shadow self.',
    coreAr: 'الغموض، استعادة القوة، عبور المجهول، وإتقان الجانب المظلم من الذات.',
    spiritEn: 'Emerges during deep transformation, indicating you are stepping through fear and reclaiming hidden parts of yourself.',
    spiritAr: 'يبرز خلال أوقات التحول العميق، مما يشير إلى أنك تخطو عبر الخوف وتستعيد أجزاء مخفية من نفسك.',
    powerEn: 'Silent power, stealth, and mastery of fear.',
    powerAr: 'القوة الصامتة، التخفي، وإتقان الخوف.',
    protectionEn: 'Shadow shielding.',
    protectionAr: 'الحماية الظلية.',
    shadowEn: 'Suppressed rage, secrecy, isolation.',
    shadowAr: 'الغضب المكبوت، السرية، والعزلة.',
    color: 'from-purple-950/40 to-emerald-950/40' },
  { id: 'tiger', nameEn: 'Tiger', nameAr: 'النمر', emoji: '🐅', element: 'Fire', type: 'Power Animal', group: 'apex',
    coreEn: 'Personal strength, willpower, sensual energy, and unpredictable momentum.',
    coreAr: 'القوة الشخصية، قوة الإرادة، الطاقة الحسية، والاندفاع غير المتوقع.',
    spiritEn: 'A sign to balance intense internal drive with patience, striking only when the timing is perfect.',
    spiritAr: 'إشارة لموازنة الدافع الداخلي الشديد مع الصبر، والانقضاض فقط عندما يكون التوقيت مثالياً.',
    powerEn: 'Fearless action and raw passion.',
    powerAr: 'العمل بدون خوف والشغف الخام.',
    protectionEn: 'Aggressive boundary defense.',
    protectionAr: 'الدفاع العدواني عن الحدود.',
    shadowEn: 'Rage, impulsiveness.',
    shadowAr: 'الغضب والاندفاع.',
    color: 'from-orange-950/40 to-emerald-950/40' },
  { id: 'fox', nameEn: 'Fox', nameAr: 'الثعلب', emoji: '🦊', element: 'Earth / Air', type: 'Spirit Guide', group: 'apex',
    coreEn: 'Agility, intelligence, observation, camouflage, and finding a way around obstacles.',
    coreAr: 'الرشاقة، الذكاء، الملاحظة، التمويه، وإيجاد طريق حول العقبات.',
    spiritEn: 'Encourages you to trust your mental sharpness and navigate complex situations with grace.',
    spiritAr: 'يشجعك على الثقة بحدتك الذهنية والتعامل مع المواقف المعقدة برشاقة.',
    powerEn: 'Problem-solving intelligence.',
    powerAr: 'ذكاء حل المشكلات.',
    protectionEn: 'Survival through awareness.',
    protectionAr: 'البقاء من خلال الوعي.',
    shadowEn: 'Manipulation, avoidance.',
    shadowAr: 'التلاعب والتجنب.',
    color: 'from-orange-950/40 to-emerald-950/30' },

  /* AIR — BIRDS */
  { id: 'eagle', nameEn: 'Eagle', nameAr: 'النسر', emoji: '🦅', element: 'Air', type: 'Spirit Guide', group: 'air',
    coreEn: 'Divine connection, extreme focus, rising above petty details, and spiritual illumination.',
    coreAr: 'الاتصال الإلهي، التركيز الشديد، الارتفاع فوق التفاصيل التافهة، والإشراق الروحي.',
    spiritEn: 'Appears when you need to lift your perspective, look at the big picture, and reclaim your visionary power.',
    spiritAr: 'يظهر عندما تحتاج إلى رفع منظورك، والنظر إلى الصورة الكبرى، واستعادة قوتك الرؤيوية.',
    powerEn: 'Leadership, sharp perception, independence.',
    powerAr: 'القيادة، الإدراك الحاد، والاستقلال.',
    protectionEn: 'Sees danger from far away.',
    protectionAr: 'يرى الخطر من بعيد.',
    shadowEn: 'Emotional detachment, arrogance.',
    shadowAr: 'الانفصال العاطفي والغطرسة.',
    color: 'from-amber-950/40 to-emerald-950/30' },
  { id: 'owl', nameEn: 'Owl', nameAr: 'البومة', emoji: '🦉', element: 'Air', type: 'Spirit Guide', group: 'air',
    coreEn: 'Wisdom, silent observation, ability to see through deception, and night vision.',
    coreAr: 'الحكمة، الملاحظة الصامتة، القدرة على كشف الخداع، والرؤية الليلية.',
    spiritEn: 'Linked to profound shifts, truth-seeking, and letting go of illusions.',
    spiritAr: 'غالباً ما ترتبط بتحولات عميقة، والبحث عن الحقيقة، والتخلي عن الأوهام.',
    powerEn: 'Deep perception and hidden truth.',
    powerAr: 'الإدراك العميق والحقيقة الخفية.',
    protectionEn: 'Night awareness, insight.',
    protectionAr: 'الوعي الليلي والبصيرة.',
    shadowEn: 'Emotional isolation.',
    shadowAr: 'العزلة العاطفية.',
    color: 'from-emerald-950/40 to-teal-950/40' },
  { id: 'raven', nameEn: 'Raven / Crow', nameAr: 'الغراب', emoji: '🐦‍⬛', element: 'Air', type: 'Spirit Guide', group: 'air',
    coreEn: 'Magic, transformation, shifting reality, divine law, and bridging seen and unseen worlds.',
    coreAr: 'السحر، التحول، تغيير الواقع، القانون الإلهي، والربط بين العالمين المرئي وغير المرئي.',
    spiritEn: 'A powerful omen of change, asking you to look at your reality differently and accept metamorphosis.',
    spiritAr: 'فأل قوي للتغيير، يطلب منك النظر إلى واقعك بشكل مختلف وتقبل التحول.',
    powerEn: 'Alchemy and shapeshifting.',
    powerAr: 'الخيمياء والتحول.',
    protectionEn: 'Divine law and truth.',
    protectionAr: 'القانون الإلهي والحقيقة.',
    shadowEn: 'Fear of change, superstition.',
    shadowAr: 'الخوف من التغيير والخرافة.',
    color: 'from-stone-900/50 to-emerald-950/30' },
  { id: 'hawk', nameEn: 'Hawk', nameAr: 'الصقر', emoji: '🦅', element: 'Air', type: 'Spirit Guide', group: 'air',
    coreEn: 'Immediate focus, tactical awareness, seizing opportunities, and higher messaging.',
    coreAr: 'التركيز الفوري، الوعي التكتيكي، اقتناص الفرص، والرسائل العليا.',
    spiritEn: 'Tells you to pay attention to sudden insights and strike while an opportunity is clear.',
    spiritAr: 'يخبرك بأن تنتبه للرؤى المفاجئة وأن تغتنم الفرصة فور وضوحها.',
    powerEn: 'Tactical precision.',
    powerAr: 'الدقة التكتيكية.',
    protectionEn: 'Alert awareness.',
    protectionAr: 'الوعي اليقظ.',
    shadowEn: 'Over-anticipation.',
    shadowAr: 'الترقب المفرط.',
    color: 'from-emerald-950/40 to-teal-950/30' },
  { id: 'hummingbird', nameEn: 'Hummingbird', nameAr: 'الطنان', emoji: '🐦', element: 'Air', type: 'Spirit Guide', group: 'air',
    coreEn: 'Infinite joy, lightness of being, endurance, and healing the bitter past.',
    coreAr: 'الفرح اللامتناهي، خفة الروح، القدرة على التحمل، وشفاء الماضي المرير.',
    spiritEn: 'A reminder that even the smallest energy can travel vast distances; it encourages sweetness and resilience.',
    spiritAr: 'تذكير بأن أصغر طاقة يمكنها قطع مسافات هائلة؛ وهو يشجع على الحلاوة والقدرة على الصمود.',
    powerEn: 'Joyful endurance.',
    powerAr: 'التحمل المبهج.',
    protectionEn: 'Lightness against heaviness.',
    protectionAr: 'الخفة ضد الثقل.',
    shadowEn: 'Overexertion.',
    shadowAr: 'الإفراط في الجهد.',
    color: 'from-emerald-950/40 to-teal-950/20' },

  /* HERD & GENTLE GIANTS */
  { id: 'deer', nameEn: 'Deer / Stag', nameAr: 'الغزال / الأيل', emoji: '🦌', element: 'Earth', type: 'Spirit Guide', group: 'herd',
    coreEn: 'Sensitivity, gentleness, intuition, and nobility under pressure.',
    coreAr: 'الحساسية، اللطف، الحدس، والنبل تحت الضغط.',
    spiritEn: 'Appears when you need to approach a fragile situation with gentleness, open your heart, and trust your instincts.',
    spiritAr: 'يظهر عندما تحتاج إلى التعامل مع موقف هش بلطف، وفتح قلبك، والثقة بغريزتك.',
    powerEn: 'Gentle sovereignty.',
    powerAr: 'السيادة اللطيفة.',
    protectionEn: 'Sensitivity as radar.',
    protectionAr: 'الحساسية كرادار.',
    shadowEn: 'Fearfulness, timidity.',
    shadowAr: 'الخوف والجبن.',
    color: 'from-amber-950/40 to-emerald-950/30' },
  { id: 'horse', nameEn: 'Horse', nameAr: 'الحصان', emoji: '🐎', element: 'Fire / Earth', type: 'Power Animal', group: 'herd',
    coreEn: 'Physical vitality, endurance, freedom, and balancing wild passion with discipline.',
    coreAr: 'الحيوية الجسدية، التحمل، الحرية، وموازنة الشغف البري بالتدريب.',
    spiritEn: 'Signals a desire for personal liberation, momentum, and understanding what drives your actions.',
    spiritAr: 'يشير إلى رغبة في التحرر الشخصي، والزخم، وفهم ما يحرك أفعالك.',
    powerEn: 'Stamina and drive.',
    powerAr: 'التحمل والدافع.',
    protectionEn: 'Escape from stagnation.',
    protectionAr: 'الهروب من الركود.',
    shadowEn: 'Impulsiveness, burnout.',
    shadowAr: 'الاندفاع والإرهاق.',
    color: 'from-amber-950/40 to-emerald-950/30' },
  { id: 'elephant', nameEn: 'Elephant', nameAr: 'الفيل', emoji: '🐘', element: 'Earth', type: 'Protection Animal', group: 'herd',
    coreEn: 'Wisdom, family bonds, patience, and unbreakable emotional memory.',
    coreAr: 'الحكمة، روابط العائلة، الصبر، والذاكرة العاطفية التي لا تنكسر.',
    spiritEn: 'Reminds you to lean on your community, honor your ancestors, and walk with unshakeable stability.',
    spiritAr: 'يذكرك بالاعتماد على مجتمعك، وتكريم دروس أسلافك، والسير بثبات لا يوهن.',
    powerEn: 'Stability and endurance.',
    powerAr: 'الاستقرار والتحمل.',
    protectionEn: 'Ancestral shielding.',
    protectionAr: 'الحماية الأجدادية.',
    shadowEn: 'Emotional heaviness, holding past trauma.',
    shadowAr: 'الثقل العاطفي، والتمسك بصدمات الماضي.',
    color: 'from-emerald-950/40 to-teal-950/40' },
  { id: 'elk', nameEn: 'Elk', nameAr: 'الإلك', emoji: '🦌', element: 'Earth', type: 'Power Animal', group: 'herd',
    coreEn: 'Stamina, pride, nobility, and surviving harsh winters through inner fortitude.',
    coreAr: 'القدرة على التحمل، الكبرياء، النبل، والنجاة من الشتاء القاسي بصلابة داخلية.',
    spiritEn: 'Signifies stamina and stepping into a position of calm, grounded leadership.',
    spiritAr: 'يدل على القدرة على التحمل والخطو نحو موقع قيادي هادئ وراسخ.',
    powerEn: 'Endurance and stature.',
    powerAr: 'التحمل والقامة.',
    protectionEn: 'Emotional resilience.',
    protectionAr: 'المرونة العاطفية.',
    shadowEn: 'Stubbornness.',
    shadowAr: 'العناد.',
    color: 'from-amber-950/40 to-emerald-950/40' },

  /* WATER DWELLERS */
  { id: 'whale', nameEn: 'Whale', nameAr: 'الحوت', emoji: '🐋', element: 'Water', type: 'Spirit Guide', group: 'water',
    coreEn: 'Deep emotional resonance, creation through sound, ancient wisdom, and vast emotional oceans.',
    coreAr: 'الرنين العاطفي العميق، الخلق من خلال الصوت، الحكمة القديمة، والإبحار في محيطات عاطفية شاسعة.',
    spiritEn: 'Encourages you to tune into your inner voice, trust your intuition, and dive deep into creative and emotional truths.',
    spiritAr: 'يشجعك على الاستماع لصوتك الداخلي، والثقة بحدسك، والغطس عميقاً في حقائقك الإبداعية والعاطفية.',
    powerEn: 'Ancient memory and sound healing.',
    powerAr: 'الذاكرة العريقة وشفاء الصوت.',
    protectionEn: 'Deep emotional ocean.',
    protectionAr: 'محيط عاطفي عميق.',
    shadowEn: 'Emotional overwhelm.',
    shadowAr: 'الاكتساح العاطفي.',
    color: 'from-teal-950/40 to-emerald-950/40' },
  { id: 'dolphin', nameEn: 'Dolphin', nameAr: 'الدلفين', emoji: '🐬', element: 'Water', type: 'Spirit Guide', group: 'water',
    coreEn: 'Breathwork, community, pure joy, playfulness, and emotional healing.',
    coreAr: 'تمارين التنفس، المجتمع، الفرح الخالص، المرح، والشفاء العاطفي.',
    spiritEn: 'A call to bring more play, levity, and social harmony into your daily routine.',
    spiritAr: 'دعوة لإدخال المزيد من المرح، والخفة، والانسجام الاجتماعي في روتينك اليومي.',
    powerEn: 'Healing presence.',
    powerAr: 'الحضور الشافي.',
    protectionEn: 'Emotional harmony.',
    protectionAr: 'الانسجام العاطفي.',
    shadowEn: 'Escapism, avoidance of pain.',
    shadowAr: 'الهروب وتجنب الألم.',
    color: 'from-teal-950/40 to-emerald-950/30' },
  { id: 'shark', nameEn: 'Shark', nameAr: 'قرش البحر', emoji: '🦈', element: 'Water', type: 'Power Animal', group: 'water',
    coreEn: 'Fearlessness, forward motion, intuition, and targeted focus.',
    coreAr: 'انعدام الخوف، الحركة للأمام، الحدس، والتركيز المستهدف.',
    spiritEn: 'Reminds you never to stagnate — keep moving forward, trusting your internal radar completely.',
    spiritAr: 'يذكرك بألا تتوقف أبداً عن التقدم للأمام، مع الثقة التامة برادارك الداخلي.',
    powerEn: 'Unstoppable momentum.',
    powerAr: 'الزخم الذي لا يتوقف.',
    protectionEn: 'Survival instinct.',
    protectionAr: 'غريزة البقاء.',
    shadowEn: 'Ruthlessness.',
    shadowAr: 'القسوة.',
    color: 'from-teal-950/50 to-emerald-950/40' },
  { id: 'turtle', nameEn: 'Turtle / Tortoise', nameAr: 'السلحفاة', emoji: '🐢', element: 'Earth / Water', type: 'Protection Animal', group: 'water',
    coreEn: 'Grounding, patience, protection, longevity, and staying connected to Mother Earth.',
    coreAr: 'التأصيل، الصبر، الحماية، طول العمر، والبقاء على اتصال بالأرض الأم.',
    spiritEn: 'A sign to slow down, protect your energy, and remember that slow, steady persistence always wins.',
    spiritAr: 'إشارة لإبطاء السرعة، حماية طاقتك، وتذكر أن المثابرة الهادئة تنتصر دائماً.',
    powerEn: 'Endurance.',
    powerAr: 'التحمل.',
    protectionEn: 'The shield of time.',
    protectionAr: 'درع الزمن.',
    shadowEn: 'Emotional withdrawal.',
    shadowAr: 'الانسحاب العاطفي.',
    color: 'from-emerald-950/40 to-teal-950/40' },

  /* REPTILES, INSECTS & AMPHIBIANS */
  { id: 'snake', nameEn: 'Snake', nameAr: 'الأفعى', emoji: '🐍', element: 'Earth', type: 'Shadow Animal', group: 'reptile',
    coreEn: 'Transformation, healing, vital life force (Kundalini), shedding the past, and spiritual awakening.',
    coreAr: 'التحول، الشفاء، قوة الحياة الحيوية (الكونداليني)، التخلص من الماضي، واليقظة الروحية.',
    spiritEn: 'The ultimate symbol of rebirth; it appears when you are actively shedding an old version of yourself.',
    spiritAr: 'الرمز الأسمى للولادة الجديدة؛ يظهر عندما تسلخ بوعي نسخة قديمة منك لتنمو في جلد جديد.',
    powerEn: 'Healing transformation.',
    powerAr: 'التحول الشافي.',
    protectionEn: 'Energetic regeneration.',
    protectionAr: 'التجديد الطاقي.',
    shadowEn: 'Fear, emotional intensity.',
    shadowAr: 'الخوف والكثافة العاطفية.',
    color: 'from-emerald-950/50 to-teal-950/40' },
  { id: 'spider', nameEn: 'Spider', nameAr: 'العنكبوت', emoji: '🕷️', element: 'Air / Earth', type: 'Spirit Guide', group: 'reptile',
    coreEn: 'Destiny, patience, creative manifestation, and the web of interconnected choices.',
    coreAr: 'القدر، الصبر، التجلي الإبداعي، وشبكة الخيارات المترابطة.',
    spiritEn: 'Reminds you that you are actively weaving your reality with every thought and choice you make.',
    spiritAr: 'يذكرك بأنك تنسج واقعك بوعي مع كل فكرة واختيار تتخذه.',
    powerEn: 'Creative manifestation.',
    powerAr: 'التجلي الإبداعي.',
    protectionEn: 'Awareness of the web.',
    protectionAr: 'الوعي بالشبكة.',
    shadowEn: 'Manipulation of others.',
    shadowAr: 'التلاعب بالآخرين.',
    color: 'from-purple-950/40 to-emerald-950/30' },
  { id: 'butterfly', nameEn: 'Butterfly', nameAr: 'الفراشة', emoji: '🦋', element: 'Air', type: 'Spirit Guide', group: 'reptile',
    coreEn: 'Complete transformation, lightness, beauty born from struggle, and spiritual evolution.',
    coreAr: 'التحول الكامل، الخفة، الجمال المولود من رحم المعاناة، والتطور الروحي.',
    spiritEn: 'Signals that a long, dark period of inner work or cocooning is finally blooming into a vibrant new chapter.',
    spiritAr: 'تشير إلى أن فترة طويلة ومظلمة من العمل الداخلي أو الشرنقة تزهر أخيراً في فصل جديد نابض بالحياة.',
    powerEn: 'Metamorphosis.',
    powerAr: 'التحول.',
    protectionEn: 'Lightness against darkness.',
    protectionAr: 'الخفة ضد الظلام.',
    shadowEn: 'Fragility.',
    shadowAr: 'الهشاشة.',
    color: 'from-purple-950/40 to-pink-950/30' },
  { id: 'frog', nameEn: 'Frog', nameAr: 'الضفدع', emoji: '🐸', element: 'Water', type: 'Spirit Guide', group: 'reptile',
    coreEn: 'Cleansing, rain magic, transition, jumping into the unknown, and emotional release.',
    coreAr: 'التطهير، سحر المطر، الانتقال، القفز نحو المجهول، والإفراز العاطفي.',
    spiritEn: 'Appears when it is time to cleanse your energetic field, wash away old stagnant emotions, and leap toward change.',
    spiritAr: 'يظهر عندما يحين الوقت لتطهير مجالك الطاقي، وغسل المشاعر الراكدة القديمة، والقفز نحو التغيير.',
    powerEn: 'Emotional detox.',
    powerAr: 'التنقية العاطفية.',
    protectionEn: 'Cleansing water.',
    protectionAr: 'الماء المطهر.',
    shadowEn: 'Avoidance of emotions.',
    shadowAr: 'تجنب المشاعر.',
    color: 'from-emerald-950/50 to-teal-950/40' },
  { id: 'lizard', nameEn: 'Lizard', nameAr: 'السحلية', emoji: '🦎', element: 'Earth / Fire', type: 'Spirit Guide', group: 'reptile',
    coreEn: 'Shadow integration, letting go of what no longer serves, and navigating dreams.',
    coreAr: 'دمج الجانب المظلم، التخلي عما لم يعد يخدمك، والإبحار في الأحلام.',
    spiritEn: 'Encourages you to pay attention to your dreams and trust your capacity to regenerate after a loss.',
    spiritAr: 'تشجعك على الانتباه لأحلامك والثقة بقدرتك على التجدد بعد أي خسارة.',
    powerEn: 'Regeneration.',
    powerAr: 'التجدد.',
    protectionEn: 'Shedding the tail (letting go).',
    protectionAr: 'إسقاط الذيل (التخلي).',
    shadowEn: 'Denial, avoidance.',
    shadowAr: 'الإنكار والتجنب.',
    color: 'from-emerald-950/40 to-amber-950/30' },

  /* DOMESTIC & MYTHIC */
  { id: 'cat', nameEn: 'Cat', nameAr: 'القط', emoji: '🐱', element: 'Air / Earth', type: 'Spirit Guide', group: 'domestic',
    coreEn: 'Mystery, independence, curiosity, psychic protection, and balancing affection with autonomy.',
    coreAr: 'الغموض، الاستقلالية، الفضول، الحماية النفسية، وموازنة المودة العالية بالسيادة المطلقة.',
    spiritEn: 'Teaches you the value of setting energetic boundaries, trusting your intuition, and honoring your need for solitude.',
    spiritAr: 'يعلمك قيمة وضع الحدود الطاقية، الثقة بحدسك، واحترام حاجتك للعزلة.',
    powerEn: 'Spiritual sensitivity.',
    powerAr: 'الحساسية الروحية.',
    protectionEn: 'Energetic boundary sensing.',
    protectionAr: 'استشعار الحدود الطاقية.',
    shadowEn: 'Emotional distance, avoidance.',
    shadowAr: 'المسافة العاطفية والتجنب.',
    color: 'from-stone-900/50 to-emerald-950/30' },
  { id: 'dog', nameEn: 'Dog', nameAr: 'الكلب', emoji: '🐕', element: 'Earth', type: 'Spirit Guide', group: 'domestic',
    coreEn: 'Loyalty, unconditional love, protection, companionship, and emotional honesty.',
    coreAr: 'الولاء، الحب غير المشروط، الحماية، الصحبة، والصدق العاطفي.',
    spiritEn: 'Appears to remind you of the importance of loyalty, standing by your tribe, and leading with an open, faithful heart.',
    spiritAr: 'يظهر ليذكرك بأهمية الولاء، والوقوف بجانب قبيلتك، والقيادة بقلب مفتوح وصادق.',
    powerEn: 'Unconditional love.',
    powerAr: 'الحب غير المشروط.',
    protectionEn: 'Heart-centered protection.',
    protectionAr: 'الحماية القائمة على القلب.',
    shadowEn: 'Codependency.',
    shadowAr: 'الاعتماد المتبادل.',
    color: 'from-emerald-950/40 to-amber-950/30' },
  { id: 'ant', nameEn: 'Ant', nameAr: 'النملة', emoji: '🐜', element: 'Earth', type: 'Spirit Guide', group: 'domestic',
    coreEn: 'Discipline, patience, collective strength.',
    coreAr: 'الانضباط، الصبر، القوة الجماعية.',
    spiritEn: 'Long-term building and consistency.',
    spiritAr: 'البناء طويل المدى والاتساق.',
    powerEn: 'Unstoppable persistence.',
    powerAr: 'المثابرة التي لا تقهر.',
    protectionEn: 'Survival through structure.',
    protectionAr: 'البقاء من خلال البنية.',
    shadowEn: 'Overwork, losing individuality.',
    shadowAr: 'الإرهاق وفقدان الفردية.',
    color: 'from-emerald-950/40 to-amber-950/30' },
  { id: 'bee', nameEn: 'Bee', nameAr: 'النحلة', emoji: '🐝', element: 'Earth / Air', type: 'Spirit Guide', group: 'domestic',
    coreEn: 'Community, productivity, divine order.',
    coreAr: 'المجتمع، الإنتاجية، النظام الإلهي.',
    spiritEn: 'Purpose through service.',
    spiritAr: 'الهدف من خلال الخدمة.',
    powerEn: 'Teamwork and creation.',
    powerAr: 'العمل الجماعي والإبداع.',
    protectionEn: 'Structured harmony.',
    protectionAr: 'الانسجام المنظم.',
    shadowEn: 'Burnout, people-pleasing.',
    shadowAr: 'الإرهاق وإرضاء الآخرين.',
    color: 'from-amber-950/40 to-emerald-950/30' },
  { id: 'crocodile', nameEn: 'Crocodile', nameAr: 'التمساح', emoji: '🐊', element: 'Water / Earth', type: 'Shadow Animal', group: 'reptile',
    coreEn: 'Survival instinct, ancient wisdom.',
    coreAr: 'غريزة البقاء، الحكمة القديمة.',
    spiritEn: 'Patience before action.',
    spiritAr: 'الصبر قبل الفعل.',
    powerEn: 'Primal survival intelligence.',
    powerAr: 'ذكاء البقاء البدائي.',
    protectionEn: 'Hidden strength, stealth awareness.',
    protectionAr: 'القوة الخفية والوعي الخفي.',
    shadowEn: 'Emotional suppression, aggression.',
    shadowAr: 'القمع العاطفي والعدوانية.',
    color: 'from-emerald-950/50 to-teal-950/50' },
]

/* ============================================================
   GROUPS
   ============================================================ */
const groups = [
  { id: 'all', nameEn: 'All Animals', nameAr: 'جميع الحيوانات', Icon: PawIcon, color: '#34d399' },
  { id: 'apex', nameEn: 'Apex Predators', nameAr: 'المفترسة', Icon: FireIcon, color: '#f97316' },
  { id: 'air', nameEn: 'Masters of the Air', nameAr: 'أسياد السماء', Icon: FeatherIcon, color: '#fcd34d' },
  { id: 'herd', nameEn: 'Gentle Giants', nameAr: 'العمالقة اللطفاء', Icon: LeafIcon, color: '#4ade80' },
  { id: 'water', nameEn: 'Water Dwellers', nameAr: 'كائنات الماء', Icon: WaterIcon, color: '#38bdf8' },
  { id: 'reptile', nameEn: 'Reptiles & Insects', nameAr: 'الزواحف والحشرات', Icon: SnakeIcon, color: '#a3e635' },
  { id: 'domestic', nameEn: 'Domestic Allies', nameAr: 'الحلفاء المنزليون', Icon: EyeIcon, color: '#a78bfa' },
  { id: 'shadow', nameEn: 'Shadow Animals', nameAr: 'حيوانات الظل', Icon: ShadowIcon, color: '#7c3aed' },
]

/* ============================================================
   PAGE
   ============================================================ */
export default function SpiritAnimalsPage() {
  const router = useRouter()
  const { language, toggleLanguage } = useLanguage()
  const [activeGroup, setActiveGroup] = useState('all')
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [fireflies, setFireflies] = useState<any[]>([])

  useEffect(() => {
    const list = []
    for (let i = 0; i < 80; i++) {
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

  const displayedAnimals = (activeGroup === 'all' ? animals : animals.filter((a) => a.group === activeGroup))
    .filter((a) =>
      a.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.nameAr.includes(searchTerm)
    )

  const introEn = 'Spirit animals have fascinated humanity for millennia, serving as powerful symbols of intuition, archetypes of the subconscious, and guides through life\'s psychological and spiritual transitions. Every creature — from the solitary predator to the communal herd animal, from the deep ocean to the sovereign of the sky — represents a unique mirror for human consciousness, shadow work, and primal energy.'
  const introAr = 'أرْواح الحيوانات الحارسة أسرت البشرية لآلاف السنين، كرموز قوية للحدس، ونماذج أصلية للعقل الباطن، ومرشدين عبر التحولات النفسية والروحية. كل كائن — من المفترس المنفرد إلى حيوان القطيع، من أعماق المحيط إلى سيد السماء — يمثل مرآة فريدة للوعي البشري، وعمل الظل، والطاقة البدائية.'

  return (
    <div
      className="min-h-screen overflow-hidden relative selection:bg-amber-700/40 selection:text-amber-100"
      style={{
        background: 'radial-gradient(ellipse at 50% -20%, #0e2a1c 0%, #081911 25%, #030a07 70%, #010402 100%)',
        fontFamily: "'Cormorant Garamond', 'Georgia', serif",
      }}
    >
      {/* Layered canopy glow */}
      <div className="absolute inset-0 pointer-events-none opacity-80"
        style={{ background: 'radial-gradient(ellipse at 50% -30%, rgba(217,169,80,0.14) 0%, transparent 55%)' }} />
      <div className="absolute inset-0 pointer-events-none opacity-60"
        style={{ background: 'radial-gradient(ellipse at 20% 110%, rgba(15,60,35,0.5) 0%, transparent 55%)' }} />
      <div className="absolute inset-0 pointer-events-none opacity-50"
        style={{ background: 'radial-gradient(ellipse at 85% 90%, rgba(90,50,20,0.35) 0%, transparent 55%)' }} />

      {/* Dense jungle leaf silhouettes at top */}
      <svg className="absolute top-0 left-0 right-0 pointer-events-none opacity-[0.35]" width="100%" height="220" viewBox="0 0 1200 220" preserveAspectRatio="none">
        <path d="M0 0 L60 80 Q80 100 100 80 L140 20 Q160 60 200 100 Q230 130 260 100 L300 30 Q330 70 370 110 Q400 130 440 100 L480 40 Q510 80 550 120 Q590 140 620 100 L660 30 Q690 70 730 110 Q760 140 800 110 L840 40 Q870 80 910 120 Q950 150 990 110 L1030 40 Q1060 80 1100 120 Q1140 150 1180 100 L1200 80 L1200 0 Z" fill="#031f11" />
        <path d="M0 0 L50 100 Q80 140 130 120 L180 40 Q210 90 260 140 Q300 170 350 130 L400 50 Q440 100 490 150 Q530 180 580 140 L630 60 Q660 110 710 160 Q760 190 810 150 L860 70 Q890 120 940 170 Q980 200 1030 160 L1080 80 Q1120 130 1170 170 Q1190 185 1200 170 L1200 0 Z" fill="#04170d" opacity="0.9" />
      </svg>

      {/* Ground jungle ferns at bottom */}
      <svg className="absolute bottom-0 left-0 right-0 pointer-events-none opacity-[0.4]" width="100%" height="200" viewBox="0 0 1200 200" preserveAspectRatio="none">
        <path d="M0 200 L60 120 Q90 80 120 120 L180 200 Z" fill="#021a0e" />
        <path d="M120 200 L180 100 Q220 60 260 100 L320 200 Z" fill="#031d10" />
        <path d="M280 200 L340 130 Q380 90 420 130 L480 200 Z" fill="#021a0e" />
        <path d="M720 200 L780 110 Q820 70 860 110 L920 200 Z" fill="#031d10" />
        <path d="M900 200 L960 130 Q1000 90 1040 130 L1100 200 Z" fill="#021a0e" />
        <path d="M1060 200 L1120 100 Q1160 60 1200 100 L1200 200 Z" fill="#031d10" />
      </svg>

      {/* Hanging vines from top corners */}
      <svg className="absolute top-0 left-0 pointer-events-none opacity-40" width="280" height="600" viewBox="0 0 280 600" fill="none">
        <path d="M60 0 C50 80 90 160 70 260 C50 360 100 460 80 600" stroke="#166534" strokeWidth="1.2" />
        <path d="M60 80 C30 95 20 120 45 135 C70 120 80 100 60 80Z" fill="#166534" opacity="0.7" />
        <path d="M70 220 C100 235 110 260 85 275 C60 260 50 240 70 220Z" fill="#166534" opacity="0.7" />
        <path d="M70 380 C40 395 30 420 55 435 C80 420 90 400 70 380Z" fill="#166534" opacity="0.7" />
        <path d="M180 0 C170 100 210 200 190 320 C170 440 200 520 190 600" stroke="#14532d" strokeWidth="1" />
        <path d="M180 100 C150 115 140 140 165 155 C190 140 200 120 180 100Z" fill="#14532d" opacity="0.6" />
        <path d="M185 260 C215 275 225 300 200 315 C175 300 165 280 185 260Z" fill="#14532d" opacity="0.6" />
      </svg>
      <svg className="absolute top-0 right-0 pointer-events-none opacity-40" width="280" height="600" viewBox="0 0 280 600" fill="none">
        <path d="M220 0 C230 80 190 160 210 260 C230 360 180 460 200 600" stroke="#166534" strokeWidth="1.2" />
        <path d="M220 80 C250 95 260 120 235 135 C210 120 200 100 220 80Z" fill="#166534" opacity="0.7" />
        <path d="M210 220 C180 235 170 260 195 275 C220 260 230 240 210 220Z" fill="#166534" opacity="0.7" />
        <path d="M210 380 C240 395 250 420 225 435 C200 420 190 400 210 380Z" fill="#166534" opacity="0.7" />
        <path d="M100 0 C110 100 70 200 90 320 C110 440 80 520 90 600" stroke="#14532d" strokeWidth="1" />
        <path d="M100 100 C130 115 140 140 115 155 C90 140 80 120 100 100Z" fill="#14532d" opacity="0.6" />
        <path d="M95 260 C65 275 55 300 80 315 C105 300 115 280 95 260Z" fill="#14532d" opacity="0.6" />
      </svg>

      {/* Amber-gold fireflies */}
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
              background: 'radial-gradient(circle, rgba(255, 230, 150, 1) 0%, rgba(217, 169, 80, 0.6) 45%, transparent 100%)',
              boxShadow: '0 0 12px rgba(217, 169, 80, 0.7), 0 0 24px rgba(217, 169, 80, 0.35)',
              animation: `fireflyFloat ${f.duration}s ease-in-out infinite`,
              animationDelay: f.delay + 's',
            }}
          />
        ))}
      </div>

      {/* NAV */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-6 flex justify-between items-center">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push('/space')}
          className="text-emerald-300/80 hover:text-amber-200 transition-all duration-300 flex items-center gap-2 text-xs tracking-[0.25em] uppercase bg-emerald-950/30 border border-emerald-800/40 backdrop-blur-md px-4 py-2 rounded-full"
        >
          ← {language === 'en' ? 'Return to Space' : 'العودة إلى الفضاء'}
        </motion.button>
        <button
          onClick={toggleLanguage}
          className="px-4 py-2 bg-emerald-950/30 rounded-full text-amber-200 text-xs tracking-widest uppercase hover:bg-emerald-900/40 transition-all duration-300 border border-emerald-800/40 backdrop-blur-md"
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
          <PawIcon color="#f5c66b" size={22} />
          <FeatherIcon color="#fcd34d" size={22} />
          <WaterIcon color="#7dd3a3" size={22} />
          <LeafIcon color="#f5c66b" size={22} />
          <FeatherIcon color="#fcd34d" size={22} />
        </div>
        <h1
          className="text-4xl md:text-6xl font-light tracking-[0.15em] italic"
          style={{
            color: '#f5e6b8',
            textShadow: '0 0 30px rgba(217,169,80,0.5), 0 0 80px rgba(120,80,20,0.5)',
          }}
        >
          {language === 'en' ? 'Spirit Animals & Totems' : 'الحيوانات الروحية والطواطم'}
        </h1>
        <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-amber-500/60 to-transparent mx-auto mt-6" />
        <p className="text-amber-400/70 text-xs tracking-[0.5em] uppercase mt-5">
          {language === 'en' ? 'Animal Guides · Jungle Totems · Power Spirits' : 'المرشدون الحيوانيون · الطواطم · حيوانات القوة'}
        </p>
      </motion.div>

      {/* Intro */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl mx-auto px-6 mb-10"
      >
        <div
          className="rounded-3xl p-7 border relative overflow-hidden"
          style={{
            background: 'linear-gradient(160deg, rgba(8,26,16,0.85), rgba(3,10,6,0.95))',
            borderColor: 'rgba(217,169,80,0.3)',
            boxShadow: '0 0 40px rgba(20,83,45,0.3)',
          }}
        >
          <span className="absolute top-3 left-3 w-4 h-4 border-l border-t" style={{ borderColor: 'rgba(217,169,80,0.5)' }} />
          <span className="absolute top-3 right-3 w-4 h-4 border-r border-t" style={{ borderColor: 'rgba(217,169,80,0.5)' }} />
          <span className="absolute bottom-3 left-3 w-4 h-4 border-l border-b" style={{ borderColor: 'rgba(217,169,80,0.5)' }} />
          <span className="absolute bottom-3 right-3 w-4 h-4 border-r border-b" style={{ borderColor: 'rgba(217,169,80,0.5)' }} />
          <p className="text-stone-300/90 text-base leading-relaxed italic text-center">
            {language === 'en' ? introEn : introAr}
          </p>
        </div>
      </motion.div>

      {/* GROUP FILTERS */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 mb-6">
        <div className="flex flex-wrap justify-center gap-2.5 mb-6">
          {groups.map((g) => {
            const Icon = g.Icon
            const active = activeGroup === g.id
            return (
              <button
                key={g.id}
                onClick={() => setActiveGroup(g.id)}
                className="px-3 py-1.5 rounded-full text-[11px] tracking-wide transition-all duration-300 flex items-center gap-2 backdrop-blur-sm border"
                style={{
                  background: active ? `${g.color}22` : 'rgba(6,26,16,0.4)',
                  color: active ? g.color : '#78716c',
                  borderColor: active ? `${g.color}88` : 'rgba(30,60,40,0.5)',
                  boxShadow: active ? `0 0 12px ${g.color}33` : 'none',
                }}
              >
                <Icon color={active ? g.color : '#78716c'} size={14} />
                <span>{language === 'en' ? g.nameEn : g.nameAr}</span>
              </button>
            )
          })}
        </div>

        {/* SEARCH */}
        <div className="max-w-md mx-auto mb-10">
          <input
            type="text"
            placeholder={language === 'en' ? 'Track an animal spirit...' : 'ابحث عن حيوان روحي...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-3 bg-emerald-950/40 border rounded-full text-stone-200 placeholder:text-stone-500 focus:outline-none text-sm italic transition-all"
            style={{
              borderColor: 'rgba(217,169,80,0.3)',
              fontFamily: "'Cormorant Garamond', serif",
            }}
          />
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-20">
          {displayedAnimals.map((animal, idx) => (
            <motion.div
              key={animal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.015 }}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedAnimal(animal)}
              className={`bg-gradient-to-br ${animal.color} rounded-2xl p-5 border border-emerald-900/40 hover:border-amber-600/50 transition-all duration-500 cursor-pointer relative overflow-hidden group`}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-amber-500/5 to-transparent pointer-events-none transition-opacity duration-500" />

              <div className="flex items-center gap-3 mb-3 relative z-10">
                <div className="text-4xl grayscale-[40%] group-hover:grayscale-0 transition-all duration-500">
                  {animal.emoji}
                </div>
                <div>
                  <h3 className="text-stone-200 font-light text-lg italic tracking-wide group-hover:text-amber-200 transition-colors">
                    {language === 'en' ? animal.nameEn : animal.nameAr}
                  </h3>
                  <p className="text-amber-500/60 text-[9px] tracking-[0.2em] uppercase mt-0.5">
                    {animal.element} · {animal.type}
                  </p>
                </div>
              </div>
              <p className="text-stone-400/90 text-xs leading-relaxed line-clamp-2 pl-1 relative z-10 italic group-hover:text-stone-300 transition-colors">
                {language === 'en' ? animal.coreEn : animal.coreAr}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedAnimal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#020704]/95 backdrop-blur-xl p-4"
            onClick={() => setSelectedAnimal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: 'spring', duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border p-7"
              style={{
                background: 'linear-gradient(180deg, #071a10, #020705)',
                borderColor: 'rgba(217,169,80,0.4)',
                boxShadow: '0 0 60px rgba(217,169,80,0.15)',
              }}
            >
              <span className="absolute top-2 left-2 w-3 h-3 border-l border-t" style={{ borderColor: 'rgba(217,169,80,0.5)' }} />
              <span className="absolute top-2 right-2 w-3 h-3 border-r border-t" style={{ borderColor: 'rgba(217,169,80,0.5)' }} />
              <span className="absolute bottom-2 left-2 w-3 h-3 border-l border-b" style={{ borderColor: 'rgba(217,169,80,0.5)' }} />
              <span className="absolute bottom-2 right-2 w-3 h-3 border-r border-b" style={{ borderColor: 'rgba(217,169,80,0.5)' }} />

              <button
                onClick={() => setSelectedAnimal(null)}
                className="absolute top-4 right-4 opacity-60 hover:opacity-100 transition-opacity"
                aria-label="close"
              >
                <CloseIcon color="#f5c66b" />
              </button>

              <div className="text-center mb-6">
                <div className="text-6xl mb-3 grayscale-[20%]">{selectedAnimal.emoji}</div>
                <h2 className="text-3xl italic font-light tracking-wide text-stone-100">
                  {language === 'en' ? selectedAnimal.nameEn : selectedAnimal.nameAr}
                </h2>
                <p className="text-amber-400/70 text-[10px] tracking-[0.3em] uppercase mt-1">
                  {selectedAnimal.element} · {selectedAnimal.type}
                </p>
                <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-amber-600/60 to-transparent mx-auto my-3" />
              </div>

              <div className="space-y-3.5">
                <div className="bg-emerald-950/25 rounded-2xl p-4 border border-emerald-900/40">
                  <p className="text-emerald-400 text-[10px] tracking-[0.3em] uppercase mb-1.5">
                    {language === 'en' ? 'Core Meaning' : 'المعنى الجوهري'}
                  </p>
                  <p className="text-stone-300 text-sm italic leading-relaxed">
                    {language === 'en' ? selectedAnimal.coreEn : selectedAnimal.coreAr}
                  </p>
                </div>

                <div className="bg-emerald-950/25 rounded-2xl p-4 border border-emerald-900/40">
                  <p className="text-amber-400 text-[10px] tracking-[0.3em] uppercase mb-1.5">
                    {language === 'en' ? 'Spirit Guidance' : 'المرشد الروحي'}
                  </p>
                  <p className="text-stone-300 text-sm italic leading-relaxed">
                    {language === 'en' ? selectedAnimal.spiritEn : selectedAnimal.spiritAr}
                  </p>
                </div>

                <div className="bg-emerald-950/25 rounded-2xl p-4 border border-emerald-900/40">
                  <p className="text-teal-400 text-[10px] tracking-[0.3em] uppercase mb-1.5">
                    {language === 'en' ? 'Power Essence' : 'حيوان القوة'}
                  </p>
                  <p className="text-stone-300 text-sm italic leading-relaxed">
                    {language === 'en' ? selectedAnimal.powerEn : selectedAnimal.powerAr}
                  </p>
                </div>

                <div className="bg-emerald-950/25 rounded-2xl p-4 border border-emerald-900/40">
                  <p className="text-emerald-300 text-[10px] tracking-[0.3em] uppercase mb-1.5">
                    {language === 'en' ? 'Protection Aura' : 'الحماية'}
                  </p>
                  <p className="text-stone-300 text-sm italic leading-relaxed">
                    {language === 'en' ? selectedAnimal.protectionEn : selectedAnimal.protectionAr}
                  </p>
                </div>

                <div className="bg-emerald-950/25 rounded-2xl p-4 border border-emerald-900/40">
                  <p className="text-purple-400 text-[10px] tracking-[0.3em] uppercase mb-1.5">
                    {language === 'en' ? 'Shadow Teachings' : 'حيوان الظل'}
                  </p>
                  <p className="text-stone-300 text-sm italic leading-relaxed">
                    {language === 'en' ? selectedAnimal.shadowEn : selectedAnimal.shadowAr}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-emerald-950/60 text-center">
                <p className="text-amber-500/50 text-[10px] tracking-[0.3em] uppercase italic">
                  {language === 'en' ? 'The wild mirrors the soul' : 'الحيوان يعكس روحك'}
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
