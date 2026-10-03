'use client'

import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import * as Astronomy from 'astronomy-engine'

/* ============================================================
   SVG ICONS
   ============================================================ */
const MoonIcon = ({ color = '#e7d5a5', size = 22, phase = 0.5 }: { color?: string; size?: number; phase?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1" opacity="0.4" />
    <path d="M12 3 A9 9 0 1 0 12 21 A9 9 0 0 1 12 3Z" fill={color} opacity="0.9" />
  </svg>
)
const StarIcon = ({ color = '#e7d5a5', size = 20 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <path d="m12 2 2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6Z" stroke={color} strokeWidth="1" strokeLinejoin="round" />
  </svg>
)
const PentagramIcon = ({ color = '#e7d5a5', size = 20 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <path d="M12 2 14.5 9.5 22 9.5 15.8 14.3 18 22 12 17.5 6 22 8.2 14.3 2 9.5 9.5 9.5Z" stroke={color} strokeWidth="1.1" strokeLinejoin="round" />
  </svg>
)
const CandleIcon = ({ color = '#e7d5a5', size = 20 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <rect x="8" y="10" width="8" height="12" stroke={color} strokeWidth="1.1" />
    <path d="M12 2c1.5 2 2 3.5 2 5 0 1.5-1 3-2 3s-2-1.5-2-3c0-1.5.5-3 2-5Z" stroke={color} strokeWidth="1.1" strokeLinejoin="round" />
    <path d="M6 22h12" stroke={color} strokeWidth="1" opacity="0.5" />
  </svg>
)
const CrystalIcon = ({ color = '#e7d5a5', size = 20 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <path d="M12 2 5 9l7 13 7-13-7-7Z" stroke={color} strokeWidth="1.1" strokeLinejoin="round" />
    <path d="M5 9h14M12 2v20" stroke={color} strokeWidth="0.7" opacity="0.5" />
  </svg>
)
const PlanetIcon = ({ color = '#e7d5a5', size = 20 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <circle cx="12" cy="12" r="5.5" stroke={color} strokeWidth="1.1" />
    <ellipse cx="12" cy="12" rx="10" ry="3" stroke={color} strokeWidth="1" transform="rotate(-25 12 12)" />
  </svg>
)
const PortalIcon = ({ color = '#e7d5a5', size = 20 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.1" />
    <circle cx="12" cy="12" r="5.5" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
    <circle cx="12" cy="12" r="2" fill={color} />
  </svg>
)
const ChaliceIcon = ({ color = '#e7d5a5', size = 20 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <path d="M7 3h10v5a5 5 0 0 1-5 5 5 5 0 0 1-5-5V3Z" stroke={color} strokeWidth="1.1" strokeLinejoin="round" />
    <path d="M12 13v6M8 21h8" stroke={color} strokeWidth="1.1" strokeLinecap="round" />
  </svg>
)
const SwordIcon = ({ color = '#e7d5a5', size = 20 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <path d="M12 2v14M8 16h8M6 19h12" stroke={color} strokeWidth="1.1" strokeLinecap="round" />
  </svg>
)
const WandIcon = ({ color = '#e7d5a5', size = 20 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <path d="M4 20 20 4M4 20h.01M14 4l2-2M18 8l2-2M10 4l2-2" stroke={color} strokeWidth="1.1" strokeLinecap="round" />
  </svg>
)
const PentacleIcon = ({ color = '#e7d5a5', size = 20 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.1" />
    <path d="M12 2 14.5 9.5 22 9.5 15.8 14.3 18 22 12 17.5 6 22 8.2 14.3 2 9.5 9.5 9.5Z" stroke={color} strokeWidth="1" strokeLinejoin="round" />
  </svg>
)
const CloseIcon = ({ color = '#a8a29e' }: { color?: string }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
    <path d="M6 6l12 12M18 6 6 18" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)
const WaxSealIcon = ({ color = '#8b1a1a', size = 40 }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 40 40" width={size} height={size} fill="none">
    <circle cx="20" cy="20" r="18" fill={color} opacity="0.15" />
    <circle cx="20" cy="20" r="15" stroke={color} strokeWidth="0.8" opacity="0.4" />
    <circle cx="20" cy="20" r="13" fill={color} opacity="0.5" />
    <path d="M20 8 22 17 31 17 24 23 27 32 20 26 13 32 16 23 9 17 18 17Z" fill="#f5e6b8" opacity="0.95" />
  </svg>
)

/* ============================================================
   TAROT DECK — 78 cards
   ============================================================ */
interface TarotCard {
  id: string
  nameEn: string
  nameAr: string
  arcana: 'major' | 'minor'
  suitEn?: string
  suitAr?: string
  uprightEn: string
  uprightAr: string
  reversedEn: string
  reversedAr: string
  keywordsEn: string[]
  keywordsAr: string[]
}

const tarotDeck: TarotCard[] = [
  { id: 'fool', nameEn: 'The Fool', nameAr: 'المهرّج', arcana: 'major', uprightEn: 'New beginnings, innocence, spontaneous adventure, leap of faith.', uprightAr: 'بدايات جديدة، براءة، مغامرة عفوية، قفزة إيمان.', reversedEn: 'Recklessness, holding back, fear of the unknown.', reversedAr: 'التهور، التراجع، الخوف من المجهول.', keywordsEn: ['beginnings', 'innocence', 'faith'], keywordsAr: ['بدايات', 'براءة', 'إيمان'] },
  { id: 'magician', nameEn: 'The Magician', nameAr: 'الساحر', arcana: 'major', uprightEn: 'Manifestation, resourcefulness, power, inspired action.', uprightAr: 'التجلي، البراعة، القوة، الفعل الملهم.', reversedEn: 'Manipulation, poor planning, untapped talents.', reversedAr: 'التلاعب، سوء التخطيط، مواهب غير مستغلة.', keywordsEn: ['manifestation', 'power', 'will'], keywordsAr: ['التجلي', 'القوة', 'الإرادة'] },
  { id: 'high-priestess', nameEn: 'The High Priestess', nameAr: 'الكاهنة العليا', arcana: 'major', uprightEn: 'Intuition, sacred knowledge, divine feminine, the subconscious.', uprightAr: 'الحدس، المعرفة المقدسة، الأنوثة المقدسة، اللاوعي.', reversedEn: 'Secrets, disconnection from intuition, withdrawal.', reversedAr: 'الأسرار، الانفصال عن الحدس، الانسحاب.', keywordsEn: ['intuition', 'mystery', 'inner voice'], keywordsAr: ['الحدس', 'الغموض', 'الصوت الداخلي'] },
  { id: 'empress', nameEn: 'The Empress', nameAr: 'الإمبراطورة', arcana: 'major', uprightEn: 'Fertility, femininity, beauty, nature, abundance.', uprightAr: 'الخصوبة، الأنوثة، الجمال، الطبيعة، الوفرة.', reversedEn: 'Creative block, dependence on others, emptiness.', reversedAr: 'انسداد إبداعي، الاعتماد على الآخرين، الفراغ.', keywordsEn: ['abundance', 'nurturing', 'creation'], keywordsAr: ['الوفرة', 'الرعاية', 'الإبداع'] },
  { id: 'emperor', nameEn: 'The Emperor', nameAr: 'الإمبراطور', arcana: 'major', uprightEn: 'Authority, structure, control, fatherhood, stability.', uprightAr: 'السلطة، البنية، السيطرة، الأبوة، الاستقرار.', reversedEn: 'Tyranny, rigidity, coldness, domination.', reversedAr: 'الطغيان، الجمود، البرود، الهيمنة.', keywordsEn: ['authority', 'structure', 'stability'], keywordsAr: ['السلطة', 'البنية', 'الاستقرار'] },
  { id: 'hierophant', nameEn: 'The Hierophant', nameAr: 'البابا', arcana: 'major', uprightEn: 'Spiritual wisdom, tradition, conformity, institutions.', uprightAr: 'الحكمة الروحية، التقليد، الامتثال، المؤسسات.', reversedEn: 'Rebellion, subversiveness, new approaches.', reversedAr: 'التمرد، التخريب، المناهج الجديدة.', keywordsEn: ['tradition', 'guidance', 'beliefs'], keywordsAr: ['التقليد', 'الإرشاد', 'المعتقدات'] },
  { id: 'lovers', nameEn: 'The Lovers', nameAr: 'العشاق', arcana: 'major', uprightEn: 'Love, harmony, relationships, values alignment, choices.', uprightAr: 'الحب، الانسجام، العلاقات، توافق القيم، الاختيارات.', reversedEn: 'Disharmony, imbalance, misalignment of values.', reversedAr: 'عدم الانسجام، الاختلال، عدم توافق القيم.', keywordsEn: ['love', 'union', 'choice'], keywordsAr: ['الحب', 'الاتحاد', 'الاختيار'] },
  { id: 'chariot', nameEn: 'The Chariot', nameAr: 'العربة', arcana: 'major', uprightEn: 'Control, willpower, success, determination.', uprightAr: 'السيطرة، الإرادة، النجاح، التصميم.', reversedEn: 'Loss of control, lack of direction, aggression.', reversedAr: 'فقدان السيطرة، غياب الاتجاه، العدوانية.', keywordsEn: ['victory', 'will', 'direction'], keywordsAr: ['النصر', 'الإرادة', 'الاتجاه'] },
  { id: 'strength', nameEn: 'Strength', nameAr: 'القوة', arcana: 'major', uprightEn: 'Strength, courage, persuasion, influence, compassion.', uprightAr: 'القوة، الشجاعة، الإقناع، التأثير، الرحمة.', reversedEn: 'Inner strength, self-doubt, low energy, raw emotion.', reversedAr: 'القوة الداخلية، الشك بالذات، انخفاض الطاقة.', keywordsEn: ['courage', 'compassion', 'power'], keywordsAr: ['الشجاعة', 'الرحمة', 'القوة'] },
  { id: 'hermit', nameEn: 'The Hermit', nameAr: 'الناسك', arcana: 'major', uprightEn: 'Soul-searching, introspection, being alone, inner guidance.', uprightAr: 'البحث الروحي، التأمل، العزلة، الإرشاد الداخلي.', reversedEn: 'Isolation, loneliness, withdrawal.', reversedAr: 'العزلة، الوحدة، الانسحاب.', keywordsEn: ['introspection', 'solitude', 'wisdom'], keywordsAr: ['التأمل', 'العزلة', 'الحكمة'] },
  { id: 'wheel', nameEn: 'Wheel of Fortune', nameAr: 'عجلة الحظ', arcana: 'major', uprightEn: 'Good luck, karma, life cycles, destiny, a turning point.', uprightAr: 'الحظ السعيد، الكارما، دورات الحياة، القدر، نقطة تحول.', reversedEn: 'Bad luck, resistance to change, breaking cycles.', reversedAr: 'الحظ السيئ، مقاومة التغيير، كسر الدورات.', keywordsEn: ['cycles', 'fate', 'change'], keywordsAr: ['الدورات', 'القدر', 'التغيير'] },
  { id: 'justice', nameEn: 'Justice', nameAr: 'العدالة', arcana: 'major', uprightEn: 'Justice, fairness, truth, cause and effect, law.', uprightAr: 'العدالة، الإنصاف، الحقيقة، السبب والنتيجة.', reversedEn: 'Unfairness, lack of accountability, dishonesty.', reversedAr: 'الظلم، غياب المساءلة، عدم الأمانة.', keywordsEn: ['justice', 'truth', 'balance'], keywordsAr: ['العدالة', 'الحقيقة', 'التوازن'] },
  { id: 'hanged-man', nameEn: 'The Hanged Man', nameAr: 'المعلّق', arcana: 'major', uprightEn: 'Pause, surrender, letting go, new perspectives.', uprightAr: 'التوقف، الاستسلام، التخلي، منظور جديد.', reversedEn: 'Delays, resistance, stalling, indecision.', reversedAr: 'التأخير، المقاومة، التعطيل، التردد.', keywordsEn: ['surrender', 'pause', 'perspective'], keywordsAr: ['الاستسلام', 'التوقف', 'المنظور'] },
  { id: 'death', nameEn: 'Death', nameAr: 'الموت', arcana: 'major', uprightEn: 'Endings, change, transformation, transition.', uprightAr: 'النهايات، التغيير، التحول، الانتقال.', reversedEn: 'Resistance to change, personal transformation, inner purging.', reversedAr: 'مقاومة التغيير، التحول الشخصي، التنقية الداخلية.', keywordsEn: ['transformation', 'endings', 'rebirth'], keywordsAr: ['التحول', 'النهايات', 'البعث'] },
  { id: 'temperance', nameEn: 'Temperance', nameAr: 'الاعتدال', arcana: 'major', uprightEn: 'Balance, moderation, patience, purpose.', uprightAr: 'التوازن، الاعتدال، الصبر، الهدف.', reversedEn: 'Imbalance, excess, self-healing, re-alignment.', reversedAr: 'الاختلال، الإفراط، الشفاء الذاتي، إعادة المحاذاة.', keywordsEn: ['balance', 'patience', 'moderation'], keywordsAr: ['التوازن', 'الصبر', 'الاعتدال'] },
  { id: 'devil', nameEn: 'The Devil', nameAr: 'الشيطان', arcana: 'major', uprightEn: 'Shadow self, attachment, addiction, restriction.', uprightAr: 'الظل، التعلق، الإدمان، القيود.', reversedEn: 'Releasing limiting beliefs, detachment.', reversedAr: 'تحرير المعتقدات المقيّدة، الانفصال.', keywordsEn: ['shadow', 'attachment', 'liberation'], keywordsAr: ['الظل', 'التعلق', 'التحرر'] },
  { id: 'tower', nameEn: 'The Tower', nameAr: 'البرج', arcana: 'major', uprightEn: 'Sudden change, upheaval, chaos, revelation, awakening.', uprightAr: 'تغيير مفاجئ، اضطراب، فوضى، كشف، صحوة.', reversedEn: 'Personal transformation, fear of change, averting disaster.', reversedAr: 'التحول الشخصي، الخوف من التغيير، تجنب الكارثة.', keywordsEn: ['upheaval', 'revelation', 'awakening'], keywordsAr: ['الاضطراب', 'الكشف', 'الصحوة'] },
  { id: 'star', nameEn: 'The Star', nameAr: 'النجمة', arcana: 'major', uprightEn: 'Hope, faith, purpose, renewal, spirituality.', uprightAr: 'الأمل، الإيمان، الهدف، التجدد، الروحانية.', reversedEn: 'Lack of faith, despair, self-trust, disconnection.', reversedAr: 'فقدان الإيمان، اليأس، الثقة بالذات، الانفصال.', keywordsEn: ['hope', 'renewal', 'guidance'], keywordsAr: ['الأمل', 'التجدد', 'الإرشاد'] },
  { id: 'moon-tarot', nameEn: 'The Moon', nameAr: 'القمر', arcana: 'major', uprightEn: 'Illusion, fear, anxiety, subconscious, intuition.', uprightAr: 'الوهم، الخوف، القلق، اللاوعي، الحدس.', reversedEn: 'Release of fear, repressed emotion, inner confusion.', reversedAr: 'تحرير الخوف، العاطفة المكبوتة، الارتباك الداخلي.', keywordsEn: ['illusion', 'intuition', 'subconscious'], keywordsAr: ['الوهم', 'الحدس', 'اللاوعي'] },
  { id: 'sun-tarot', nameEn: 'The Sun', nameAr: 'الشمس', arcana: 'major', uprightEn: 'Positivity, fun, warmth, success, vitality.', uprightAr: 'الإيجابية، المرح، الدفء، النجاح، الحيوية.', reversedEn: 'Inner child, feeling down, overly optimistic.', reversedAr: 'الطفل الداخلي، الشعور بالانخفاض، التفاؤل المفرط.', keywordsEn: ['joy', 'success', 'vitality'], keywordsAr: ['الفرح', 'النجاح', 'الحيوية'] },
  { id: 'judgement', nameEn: 'Judgement', nameAr: 'الحساب', arcana: 'major', uprightEn: 'Judgement, rebirth, inner calling, absolution.', uprightAr: 'الحساب، البعث، النداء الداخلي، الغفران.', reversedEn: 'Self-doubt, inner critic, ignoring the call.', reversedAr: 'الشك بالذات، الناقد الداخلي، تجاهل النداء.', keywordsEn: ['awakening', 'calling', 'rebirth'], keywordsAr: ['الصحوة', 'النداء', 'البعث'] },
  { id: 'world', nameEn: 'The World', nameAr: 'العالم', arcana: 'major', uprightEn: 'Completion, integration, accomplishment, travel.', uprightAr: 'الإكمال، التكامل، الإنجاز، السفر.', reversedEn: 'Seeking personal closure, short-cuts, delays.', reversedAr: 'البحث عن الإغلاق الشخصي، طرق مختصرة، تأخيرات.', keywordsEn: ['completion', 'integration', 'fulfillment'], keywordsAr: ['الإكمال', 'التكامل', 'التحقق'] },

  { id: 'wands-ace', nameEn: 'Ace of Wands', nameAr: 'آس العصي', arcana: 'minor', suitEn: 'Wands', suitAr: 'العصي', uprightEn: 'Inspiration, new opportunities, growth, potential.', uprightAr: 'الإلهام، الفرص الجديدة، النمو، الإمكانية.', reversedEn: 'Emerging idea, lack of direction, distractions.', reversedAr: 'فكرة ناشئة، غياب الاتجاه، المشتتات.', keywordsEn: ['inspiration', 'spark', 'potential'], keywordsAr: ['الإلهام', 'الشرارة', 'الإمكانية'] },
  { id: 'wands-two', nameEn: 'Two of Wands', nameAr: 'اثنان العصي', arcana: 'minor', suitEn: 'Wands', suitAr: 'العصي', uprightEn: 'Future planning, progress, decisions, discovery.', uprightAr: 'التخطيط للمستقبل، التقدم، القرارات، الاكتشاف.', reversedEn: 'Inner alignment, fear of unknown.', reversedAr: 'المحاذاة الداخلية، الخوف من المجهول.', keywordsEn: ['planning', 'vision', 'decision'], keywordsAr: ['التخطيط', 'الرؤية', 'القرار'] },
  { id: 'wands-three', nameEn: 'Three of Wands', nameAr: 'ثلاثة العصي', arcana: 'minor', suitEn: 'Wands', suitAr: 'العصي', uprightEn: 'Looking ahead, expansion, rapid growth, foresight.', uprightAr: 'التطلع إلى الأمام، التوسع، النمو السريع، البصيرة.', reversedEn: 'Personal growth, playing safe, obstacles.', reversedAr: 'النمو الشخصي، اللعب الآمن، العقبات.', keywordsEn: ['expansion', 'foresight', 'progress'], keywordsAr: ['التوسع', 'البصيرة', 'التقدم'] },
  { id: 'wands-four', nameEn: 'Four of Wands', nameAr: 'أربعة العصي', arcana: 'minor', suitEn: 'Wands', suitAr: 'العصي', uprightEn: 'Celebration, harmony, marriage, home, community.', uprightAr: 'الاحتفال، الانسجام، الزواج، المنزل، المجتمع.', reversedEn: 'Inner harmony, conflict at home.', reversedAr: 'الانسجام الداخلي، الخلاف في المنزل.', keywordsEn: ['celebration', 'home', 'harmony'], keywordsAr: ['الاحتفال', 'المنزل', 'الانسجام'] },
  { id: 'wands-five', nameEn: 'Five of Wands', nameAr: 'خمسة العصي', arcana: 'minor', suitEn: 'Wands', suitAr: 'العصي', uprightEn: 'Conflict, disagreements, competition, tension.', uprightAr: 'الصراع، الخلافات، المنافسة، التوتر.', reversedEn: 'Inner conflict, avoidance, resolution.', reversedAr: 'الصراع الداخلي، التجنب، الحل.', keywordsEn: ['conflict', 'competition', 'tension'], keywordsAr: ['الصراع', 'المنافسة', 'التوتر'] },
  { id: 'wands-six', nameEn: 'Six of Wands', nameAr: 'ستة العصي', arcana: 'minor', suitEn: 'Wands', suitAr: 'العصي', uprightEn: 'Success, public recognition, progress, self-confidence.', uprightAr: 'النجاح، التقدير العام، التقدم، الثقة بالذات.', reversedEn: 'Private achievement, egotism, fall from grace.', reversedAr: 'الإنجاز الخاص، الأنانية، السقوط من النعمة.', keywordsEn: ['victory', 'recognition', 'confidence'], keywordsAr: ['النصر', 'التقدير', 'الثقة'] },
  { id: 'wands-seven', nameEn: 'Seven of Wands', nameAr: 'سبعة العصي', arcana: 'minor', suitEn: 'Wands', suitAr: 'العصي', uprightEn: 'Challenge, competition, protection, perseverance.', uprightAr: 'التحدي، المنافسة، الحماية، المثابرة.', reversedEn: 'Exhaustion, giving up, overwhelmed.', reversedAr: 'الإرهاق، الاستسلام، الإغراق.', keywordsEn: ['perseverance', 'defense', 'challenge'], keywordsAr: ['المثابرة', 'الدفاع', 'التحدي'] },
  { id: 'wands-eight', nameEn: 'Eight of Wands', nameAr: 'ثمانية العصي', arcana: 'minor', suitEn: 'Wands', suitAr: 'العصي', uprightEn: 'Movement, fast paced change, action, alignment.', uprightAr: 'الحركة، التغيير السريع، الفعل، المحاذاة.', reversedEn: 'Delays, frustration, resisting change.', reversedAr: 'التأخير، الإحباط، مقاومة التغيير.', keywordsEn: ['speed', 'movement', 'action'], keywordsAr: ['السرعة', 'الحركة', 'الفعل'] },
  { id: 'wands-nine', nameEn: 'Nine of Wands', nameAr: 'تسعة العصي', arcana: 'minor', suitEn: 'Wands', suitAr: 'العصي', uprightEn: 'Resilience, courage, persistence, boundaries.', uprightAr: 'المرونة، الشجاعة، المثابرة، الحدود.', reversedEn: 'Exhaustion, fatigue, questioning motivations.', reversedAr: 'الإرهاق، التعب، التشكيك في الدوافع.', keywordsEn: ['resilience', 'persistence', 'boundaries'], keywordsAr: ['المرونة', 'المثابرة', 'الحدود'] },
  { id: 'wands-ten', nameEn: 'Ten of Wands', nameAr: 'عشرة العصي', arcana: 'minor', suitEn: 'Wands', suitAr: 'العصي', uprightEn: 'Burden, extra responsibility, hard work, completion.', uprightAr: 'العبء، المسؤولية الإضافية، العمل الجاد، الإكمال.', reversedEn: 'Doing it all, carrying the burden, release.', reversedAr: 'فعل كل شيء، حمل العبء، التحرير.', keywordsEn: ['burden', 'responsibility', 'work'], keywordsAr: ['العبء', 'المسؤولية', 'العمل'] },
  { id: 'wands-page', nameEn: 'Page of Wands', nameAr: 'وصيف العصي', arcana: 'minor', suitEn: 'Wands', suitAr: 'العصي', uprightEn: 'Exploration, excitement, freedom, new ideas.', uprightAr: 'الاستكشاف، الإثارة، الحرية، أفكار جديدة.', reversedEn: 'Newly formed ideas, redirecting energy.', reversedAr: 'أفكار جديدة التكوين، إعادة توجيه الطاقة.', keywordsEn: ['exploration', 'enthusiasm', 'discovery'], keywordsAr: ['الاستكشاف', 'الحماس', 'الاكتشاف'] },
  { id: 'wands-knight', nameEn: 'Knight of Wands', nameAr: 'فارس العصي', arcana: 'minor', suitEn: 'Wands', suitAr: 'العصي', uprightEn: 'Energy, passion, inspired action, adventure.', uprightAr: 'الطاقة، الشغف، الفعل الملهم، المغامرة.', reversedEn: 'Haste, scattered energy, delays.', reversedAr: 'التسرع، الطاقة المشتتة، التأخير.', keywordsEn: ['passion', 'action', 'adventure'], keywordsAr: ['الشغف', 'الفعل', 'المغامرة'] },
  { id: 'wands-queen', nameEn: 'Queen of Wands', nameAr: 'ملكة العصي', arcana: 'minor', suitEn: 'Wands', suitAr: 'العصي', uprightEn: 'Courage, confidence, independence, vitality.', uprightAr: 'الشجاعة، الثقة، الاستقلال، الحيوية.', reversedEn: 'Self-respect, re-establishing confidence.', reversedAr: 'احترام الذات، إعادة بناء الثقة.', keywordsEn: ['confidence', 'independence', 'courage'], keywordsAr: ['الثقة', 'الاستقلال', 'الشجاعة'] },
  { id: 'wands-king', nameEn: 'King of Wands', nameAr: 'ملك العصي', arcana: 'minor', suitEn: 'Wands', suitAr: 'العصي', uprightEn: 'Natural-born leader, vision, entrepreneur, honour.', uprightAr: 'قائد بالفطرة، رؤية، رائد أعمال، شرف.', reversedEn: 'Impulsiveness, haste, ruthless, high expectations.', reversedAr: 'الاندفاع، التسرع، القسوة، توقعات عالية.', keywordsEn: ['leadership', 'vision', 'honour'], keywordsAr: ['القيادة', 'الرؤية', 'الشرف'] },

  { id: 'cups-ace', nameEn: 'Ace of Cups', nameAr: 'آس الكؤوس', arcana: 'minor', suitEn: 'Cups', suitAr: 'الكؤوس', uprightEn: 'Love, new relationships, compassion, creativity.', uprightAr: 'الحب، العلاقات الجديدة، الرحمة، الإبداع.', reversedEn: 'Self-love, intuition, repressed emotions.', reversedAr: 'حب الذات، الحدس، المشاعر المكبوتة.', keywordsEn: ['love', 'emotion', 'beginning'], keywordsAr: ['الحب', 'العاطفة', 'البداية'] },
  { id: 'cups-two', nameEn: 'Two of Cups', nameAr: 'اثنان الكؤوس', arcana: 'minor', suitEn: 'Cups', suitAr: 'الكؤوس', uprightEn: 'Unified love, partnership, mutual attraction.', uprightAr: 'الحب الموحّد، الشراكة، الجذب المتبادل.', reversedEn: 'Self-love, break-ups, disharmony, distrust.', reversedAr: 'حب الذات، الانفصال، عدم الانسجام.', keywordsEn: ['partnership', 'union', 'connection'], keywordsAr: ['الشراكة', 'الاتحاد', 'الاتصال'] },
  { id: 'cups-three', nameEn: 'Three of Cups', nameAr: 'ثلاثة الكؤوس', arcana: 'minor', suitEn: 'Cups', suitAr: 'الكؤوس', uprightEn: 'Celebration, friendship, creativity, community.', uprightAr: 'الاحتفال، الصداقة، الإبداع، المجتمع.', reversedEn: 'Independence, alone time, over-indulgence.', reversedAr: 'الاستقلال، وقت الوحدة، الإفراط.', keywordsEn: ['celebration', 'friendship', 'community'], keywordsAr: ['الاحتفال', 'الصداقة', 'المجتمع'] },
  { id: 'cups-four', nameEn: 'Four of Cups', nameAr: 'أربعة الكؤوس', arcana: 'minor', suitEn: 'Cups', suitAr: 'الكؤوس', uprightEn: 'Meditation, contemplation, apathy, reevaluation.', uprightAr: 'التأمل، التفكير، اللامبالاة، إعادة التقييم.', reversedEn: 'Retreat, withdrawal, checking in.', reversedAr: 'الانسحاب، التقوقع، التحقق.', keywordsEn: ['contemplation', 'apathy', 'reevaluation'], keywordsAr: ['التأمل', 'اللامبالاة', 'إعادة التقييم'] },
  { id: 'cups-five', nameEn: 'Five of Cups', nameAr: 'خمسة الكؤوس', arcana: 'minor', suitEn: 'Cups', suitAr: 'الكؤوس', uprightEn: 'Regret, failure, disappointment, pessimism.', uprightAr: 'الندم، الفشل، خيبة الأمل، التشاؤم.', reversedEn: 'Self-forgiveness, moving on.', reversedAr: 'المسامحة الذاتية، المضي قدماً.', keywordsEn: ['regret', 'grief', 'loss'], keywordsAr: ['الندم', 'الحزن', 'الفقد'] },
  { id: 'cups-six', nameEn: 'Six of Cups', nameAr: 'ستة الكؤوس', arcana: 'minor', suitEn: 'Cups', suitAr: 'الكؤوس', uprightEn: 'Revisiting the past, childhood memories, innocence, joy.', uprightAr: 'العودة إلى الماضي، ذكريات الطفولة، البراءة، الفرح.', reversedEn: 'Moving forward, leaving home, independence.', reversedAr: 'التقدم إلى الأمام، مغادرة المنزل، الاستقلال.', keywordsEn: ['nostalgia', 'innocence', 'memories'], keywordsAr: ['الحنين', 'البراءة', 'الذكريات'] },
  { id: 'cups-seven', nameEn: 'Seven of Cups', nameAr: 'سبعة الكؤوس', arcana: 'minor', suitEn: 'Cups', suitAr: 'الكؤوس', uprightEn: 'Opportunities, choices, wishful thinking, illusion.', uprightAr: 'الفرص، الاختيارات، التمني، الوهم.', reversedEn: 'Alignment, personal values, overwhelmed by choices.', reversedAr: 'المحاذاة، القيم الشخصية، الإغراق بالخيارات.', keywordsEn: ['choices', 'illusion', 'opportunities'], keywordsAr: ['الاختيارات', 'الوهم', 'الفرص'] },
  { id: 'cups-eight', nameEn: 'Eight of Cups', nameAr: 'ثمانية الكؤوس', arcana: 'minor', suitEn: 'Cups', suitAr: 'الكؤوس', uprightEn: 'Disappointment, abandonment, withdrawal, escapism.', uprightAr: 'خيبة الأمل، الهجر، الانسحاب، الهروب.', reversedEn: 'Trying one more time, indecision, drifting.', reversedAr: 'محاولة أخرى، التردد، الانجراف.', keywordsEn: ['withdrawal', 'walking away', 'search'], keywordsAr: ['الانسحاب', 'الرحيل', 'البحث'] },
  { id: 'cups-nine', nameEn: 'Nine of Cups', nameAr: 'تسعة الكؤوس', arcana: 'minor', suitEn: 'Cups', suitAr: 'الكؤوس', uprightEn: 'Contentment, satisfaction, gratitude, wish come true.', uprightAr: 'الرضا، السعادة، الامتنان، تحقيق الأمنية.', reversedEn: 'Inner happiness, materialism, dissatisfaction.', reversedAr: 'السعادة الداخلية، المادية، عدم الرضا.', keywordsEn: ['contentment', 'satisfaction', 'wish'], keywordsAr: ['الرضا', 'السعادة', 'الأمنية'] },
  { id: 'cups-ten', nameEn: 'Ten of Cups', nameAr: 'عشرة الكؤوس', arcana: 'minor', suitEn: 'Cups', suitAr: 'الكؤوس', uprightEn: 'Divine love, blissful relationships, harmony, alignment.', uprightAr: 'الحب الإلهي، العلاقات السعيدة، الانسجام.', reversedEn: 'Misalignment of values, disharmony.', reversedAr: 'عدم توافق القيم، عدم الانسجام.', keywordsEn: ['harmony', 'family', 'bliss'], keywordsAr: ['الانسجام', 'العائلة', 'السعادة'] },
  { id: 'cups-page', nameEn: 'Page of Cups', nameAr: 'وصيف الكؤوس', arcana: 'minor', suitEn: 'Cups', suitAr: 'الكؤوس', uprightEn: 'Creative opportunities, curiosity, possibility.', uprightAr: 'فرص إبداعية، الفضول، الإمكانية.', reversedEn: 'New ideas, doubting intuition, creative blocks.', reversedAr: 'أفكار جديدة، الشك بالحدس، الانسدادات.', keywordsEn: ['curiosity', 'creativity', 'messages'], keywordsAr: ['الفضول', 'الإبداع', 'الرسائل'] },
  { id: 'cups-knight', nameEn: 'Knight of Cups', nameAr: 'فارس الكؤوس', arcana: 'minor', suitEn: 'Cups', suitAr: 'الكؤوس', uprightEn: 'Romance, charm, imagination, beauty.', uprightAr: 'الرومانسية، السحر، الخيال، الجمال.', reversedEn: 'Overactive imagination, unrealistic, jealousy.', reversedAr: 'الخيال المفرط، غير الواقعي، الغيرة.', keywordsEn: ['romance', 'charm', 'idealism'], keywordsAr: ['الرومانسية', 'السحر', 'المثالية'] },
  { id: 'cups-queen', nameEn: 'Queen of Cups', nameAr: 'ملكة الكؤوس', arcana: 'minor', suitEn: 'Cups', suitAr: 'الكؤوس', uprightEn: 'Compassionate, caring, emotionally stable, intuitive.', uprightAr: 'رحيمة، مهتمة، مستقرة عاطفياً، حدسية.', reversedEn: 'Inner feelings, self-care, self-love.', reversedAr: 'المشاعر الداخلية، العناية بالذات، حب الذات.', keywordsEn: ['compassion', 'intuition', 'empathy'], keywordsAr: ['الرحمة', 'الحدس', 'التعاطف'] },
  { id: 'cups-king', nameEn: 'King of Cups', nameAr: 'ملك الكؤوس', arcana: 'minor', suitEn: 'Cups', suitAr: 'الكؤوس', uprightEn: 'Emotionally balanced, compassionate, diplomatic.', uprightAr: 'متوازن عاطفياً، رحيم، دبلوماسي.', reversedEn: 'Inner feelings, moodiness, manipulation.', reversedAr: 'المشاعر الداخلية، التقلب المزاجي، التلاعب.', keywordsEn: ['balance', 'wisdom', 'compassion'], keywordsAr: ['التوازن', 'الحكمة', 'الرحمة'] },

  { id: 'swords-ace', nameEn: 'Ace of Swords', nameAr: 'آس السيوف', arcana: 'minor', suitEn: 'Swords', suitAr: 'السيوف', uprightEn: 'Breakthrough, clarity, sharp mind, new idea.', uprightAr: 'الاختراق، الوضوح، العقل الحاد، فكرة جديدة.', reversedEn: 'Confusion, brutality, chaos, clarity.', reversedAr: 'الارتباك، الوحشية، الفوضى، الوضوح.', keywordsEn: ['clarity', 'breakthrough', 'truth'], keywordsAr: ['الوضوح', 'الاختراق', 'الحقيقة'] },
  { id: 'swords-two', nameEn: 'Two of Swords', nameAr: 'اثنان السيوف', arcana: 'minor', suitEn: 'Swords', suitAr: 'السيوف', uprightEn: 'Difficult choices, indecision, stalemate, avoidance.', uprightAr: 'الخيارات الصعبة، التردد، الجمود، التجنب.', reversedEn: 'Lesser of two evils, no right choice.', reversedAr: 'أقل الشرين، لا خيار صحيح.', keywordsEn: ['choice', 'stalemate', 'avoidance'], keywordsAr: ['الخيار', 'الجمود', 'التجنب'] },
  { id: 'swords-three', nameEn: 'Three of Swords', nameAr: 'ثلاثة السيوف', arcana: 'minor', suitEn: 'Swords', suitAr: 'السيوف', uprightEn: 'Heartbreak, emotional pain, sorrow, grief.', uprightAr: 'انكسار القلب، الألم العاطفي، الحزن، الفقد.', reversedEn: 'Recovery, forgiveness, moving on.', reversedAr: 'التعافي، المسامحة، المضي قدماً.', keywordsEn: ['heartbreak', 'grief', 'pain'], keywordsAr: ['انكسار القلب', 'الحزن', 'الألم'] },
  { id: 'swords-four', nameEn: 'Four of Swords', nameAr: 'أربعة السيوف', arcana: 'minor', suitEn: 'Swords', suitAr: 'السيوف', uprightEn: 'Rest, restoration, contemplation, recuperation.', uprightAr: 'الراحة، الاستعادة، التأمل، التعافي.', reversedEn: 'Restlessness, burnout, stress, recovery.', reversedAr: 'الأرق، الإرهاق، التوتر، التعافي.', keywordsEn: ['rest', 'recovery', 'meditation'], keywordsAr: ['الراحة', 'التعافي', 'التأمل'] },
  { id: 'swords-five', nameEn: 'Five of Swords', nameAr: 'خمسة السيوف', arcana: 'minor', suitEn: 'Swords', suitAr: 'السيوف', uprightEn: 'Conflict, disagreements, competition, defeat.', uprightAr: 'الصراع، الخلافات، المنافسة، الهزيمة.', reversedEn: 'Reconciliation, making amends, past resentment.', reversedAr: 'المصالحة، التعويض، الاستياء السابق.', keywordsEn: ['conflict', 'defeat', 'tension'], keywordsAr: ['الصراع', 'الهزيمة', 'التوتر'] },
  { id: 'swords-six', nameEn: 'Six of Swords', nameAr: 'ستة السيوف', arcana: 'minor', suitEn: 'Swords', suitAr: 'السيوف', uprightEn: 'Transition, leaving behind, moving on.', uprightAr: 'الانتقال، التخلي، المضي قدماً.', reversedEn: 'Emotional baggage, unresolved issues.', reversedAr: 'الأمتعة العاطفية، القضايا العالقة.', keywordsEn: ['transition', 'healing', 'moving on'], keywordsAr: ['الانتقال', 'الشفاء', 'المضي'] },
  { id: 'swords-seven', nameEn: 'Seven of Swords', nameAr: 'سبعة السيوف', arcana: 'minor', suitEn: 'Swords', suitAr: 'السيوف', uprightEn: 'Deception, trickery, tactics, strategy.', uprightAr: 'الخداع، الحيلة، التكتيكات، الاستراتيجية.', reversedEn: 'Coming clean, rethinking approach, confession.', reversedAr: 'الاعتراف، إعادة التفكير، الإقرار.', keywordsEn: ['deception', 'strategy', 'stealth'], keywordsAr: ['الخداع', 'الاستراتيجية', 'التخفي'] },
  { id: 'swords-eight', nameEn: 'Eight of Swords', nameAr: 'ثمانية السيوف', arcana: 'minor', suitEn: 'Swords', suitAr: 'السيوف', uprightEn: 'Self-imposed restriction, imprisonment, inner critic.', uprightAr: 'التقييد الذاتي، السجن، الناقد الداخلي.', reversedEn: 'Self-acceptance, new perspective, freedom.', reversedAr: 'قبول الذات، منظور جديد، الحرية.', keywordsEn: ['restriction', 'self-imposed', 'blocked'], keywordsAr: ['التقييد', 'الذاتي', 'الانسداد'] },
  { id: 'swords-nine', nameEn: 'Nine of Swords', nameAr: 'تسعة السيوف', arcana: 'minor', suitEn: 'Swords', suitAr: 'السيوف', uprightEn: 'Anxiety, worry, fear, depression, nightmares.', uprightAr: 'القلق، الهم، الخوف، الاكتئاب، الكوابيس.', reversedEn: 'Inner turmoil, deep fears, secrets, hope.', reversedAr: 'الاضطراب الداخلي، المخاوف العميقة، الأسرار، الأمل.', keywordsEn: ['anxiety', 'worry', 'fear'], keywordsAr: ['القلق', 'الهم', 'الخوف'] },
  { id: 'swords-ten', nameEn: 'Ten of Swords', nameAr: 'عشرة السيوف', arcana: 'minor', suitEn: 'Swords', suitAr: 'السيوف', uprightEn: 'Painful endings, deep wounds, betrayal, loss.', uprightAr: 'نهايات مؤلمة، جروح عميقة، الخيانة، الفقد.', reversedEn: 'Recovery, regeneration, resisting inevitable end.', reversedAr: 'التعافي، التجدد، مقاومة النهاية الحتمية.', keywordsEn: ['endings', 'pain', 'transformation'], keywordsAr: ['النهايات', 'الألم', 'التحول'] },
  { id: 'swords-page', nameEn: 'Page of Swords', nameAr: 'وصيف السيوف', arcana: 'minor', suitEn: 'Swords', suitAr: 'السيوف', uprightEn: 'New ideas, curiosity, thirst for knowledge, new ways.', uprightAr: 'أفكار جديدة، الفضول، التعطش للمعرفة، طرق جديدة.', reversedEn: 'Self-expression, all talk, deception.', reversedAr: 'التعبير عن الذات، الكلام فقط، الخداع.', keywordsEn: ['curiosity', 'intellect', 'truth'], keywordsAr: ['الفضول', 'الفكر', 'الحقيقة'] },
  { id: 'swords-knight', nameEn: 'Knight of Swords', nameAr: 'فارس السيوف', arcana: 'minor', suitEn: 'Swords', suitAr: 'السيوف', uprightEn: 'Ambitious, action-oriented, driven, fast-thinking.', uprightAr: 'طموح، موجه نحو العمل، مدفوع، سريع التفكير.', reversedEn: 'Restless, unfocused, impulsive, burn-out.', reversedAr: 'قلق، غير مركز، متهور، احتراق.', keywordsEn: ['action', 'ambition', 'drive'], keywordsAr: ['الفعل', 'الطموح', 'الدافع'] },
  { id: 'swords-queen', nameEn: 'Queen of Swords', nameAr: 'ملكة السيوف', arcana: 'minor', suitEn: 'Swords', suitAr: 'السيوف', uprightEn: 'Independent, unbiased judgement, clear boundaries.', uprightAr: 'مستقلة، حكم غير متحيز، حدود واضحة.', reversedEn: 'Overly emotional, easily influenced, cold.', reversedAr: 'عاطفية بشكل مفرط، سهلة التأثر، باردة.', keywordsEn: ['clarity', 'judgement', 'independence'], keywordsAr: ['الوضوح', 'الحكم', 'الاستقلال'] },
  { id: 'swords-king', nameEn: 'King of Swords', nameAr: 'ملك السيوف', arcana: 'minor', suitEn: 'Swords', suitAr: 'السيوف', uprightEn: 'Mental clarity, intellectual power, authority, truth.', uprightAr: 'الوضوح الذهني، القوة الفكرية، السلطة، الحقيقة.', reversedEn: 'Quiet power, inner truth, manipulation.', reversedAr: 'القوة الهادئة، الحقيقة الداخلية، التلاعب.', keywordsEn: ['authority', 'truth', 'intellect'], keywordsAr: ['السلطة', 'الحقيقة', 'الفكر'] },

  { id: 'pents-ace', nameEn: 'Ace of Pentacles', nameAr: 'آس البنتاكلز', arcana: 'minor', suitEn: 'Pentacles', suitAr: 'البنتاكلز', uprightEn: 'New financial or career opportunity, manifestation, abundance.', uprightAr: 'فرصة مالية أو مهنية جديدة، التجلي، الوفرة.', reversedEn: 'Lost opportunity, lack of planning, scarcity.', reversedAr: 'فرصة ضائعة، غياب التخطيط، الندرة.', keywordsEn: ['opportunity', 'abundance', 'manifestation'], keywordsAr: ['الفرصة', 'الوفرة', 'التجلي'] },
  { id: 'pents-two', nameEn: 'Two of Pentacles', nameAr: 'اثنان البنتاكلز', arcana: 'minor', suitEn: 'Pentacles', suitAr: 'البنتاكلز', uprightEn: 'Multiple priorities, time management, prioritisation.', uprightAr: 'أولويات متعددة، إدارة الوقت، تحديد الأولويات.', reversedEn: 'Over-committed, disorganisation.', reversedAr: 'الالتزام المفرط، عدم التنظيم.', keywordsEn: ['balance', 'priorities', 'flexibility'], keywordsAr: ['التوازن', 'الأولويات', 'المرونة'] },
  { id: 'pents-three', nameEn: 'Three of Pentacles', nameAr: 'ثلاثة البنتاكلز', arcana: 'minor', suitEn: 'Pentacles', suitAr: 'البنتاكلز', uprightEn: 'Teamwork, collaboration, learning, implementation.', uprightAr: 'العمل الجماعي، التعاون، التعلم، التنفيذ.', reversedEn: 'Disharmony, misalignment, working alone.', reversedAr: 'عدم الانسجام، عدم التوافق، العمل بمفردك.', keywordsEn: ['collaboration', 'skill', 'teamwork'], keywordsAr: ['التعاون', 'المهارة', 'الفريق'] },
  { id: 'pents-four', nameEn: 'Four of Pentacles', nameAr: 'أربعة البنتاكلز', arcana: 'minor', suitEn: 'Pentacles', suitAr: 'البنتاكلز', uprightEn: 'Saving money, security, conservatism, scarcity.', uprightAr: 'توفير المال، الأمان، التحفظ، الندرة.', reversedEn: 'Over-spending, greed, self-protection.', reversedAr: 'الإفراط في الإنفاق، الجشع، الحماية الذاتية.', keywordsEn: ['security', 'control', 'conservation'], keywordsAr: ['الأمان', 'السيطرة', 'الحفظ'] },
  { id: 'pents-five', nameEn: 'Five of Pentacles', nameAr: 'خمسة البنتاكلز', arcana: 'minor', suitEn: 'Pentacles', suitAr: 'البنتاكلز', uprightEn: 'Financial loss, poverty, lack mindset, isolation.', uprightAr: 'الخسارة المالية، الفقر، عقلية الندرة، العزلة.', reversedEn: 'Recovery from financial loss, spiritual poverty.', reversedAr: 'التعافي من الخسارة، الفقر الروحي.', keywordsEn: ['hardship', 'loss', 'isolation'], keywordsAr: ['المشقة', 'الخسارة', 'العزلة'] },
  { id: 'pents-six', nameEn: 'Six of Pentacles', nameAr: 'ستة البنتاكلز', arcana: 'minor', suitEn: 'Pentacles', suitAr: 'البنتاكلز', uprightEn: 'Giving, receiving, sharing wealth, generosity, charity.', uprightAr: 'العطاء، الاستقبال، مشاركة الثروة، الكرم.', reversedEn: 'Self-care, unpaid debts, one-sided charity.', reversedAr: 'العناية بالذات، الديون، الصدقة من جانب واحد.', keywordsEn: ['generosity', 'charity', 'balance'], keywordsAr: ['الكرم', 'الصدقة', 'التوازن'] },
  { id: 'pents-seven', nameEn: 'Seven of Pentacles', nameAr: 'سبعة البنتاكلز', arcana: 'minor', suitEn: 'Pentacles', suitAr: 'البنتاكلز', uprightEn: 'Long-term view, sustainable results, perseverance, investment.', uprightAr: 'النظرة طويلة المدى، النتائج المستدامة، المثابرة.', reversedEn: 'Lack of long-term vision, limited success.', reversedAr: 'غياب الرؤية طويلة المدى، النجاح المحدود.', keywordsEn: ['investment', 'patience', 'harvest'], keywordsAr: ['الاستثمار', 'الصبر', 'الحصاد'] },
  { id: 'pents-eight', nameEn: 'Eight of Pentacles', nameAr: 'ثمانية البنتاكلز', arcana: 'minor', suitEn: 'Pentacles', suitAr: 'البنتاكلز', uprightEn: 'Apprenticeship, repetitive tasks, mastery, skill development.', uprightAr: 'التدريب، المهام المتكررة، الإتقان، تطوير المهارات.', reversedEn: 'Self-development, perfectionism, misdirected activity.', reversedAr: 'التطوير الذاتي، الكمالية، النشاط الموجه بشكل خاطئ.', keywordsEn: ['mastery', 'skill', 'dedication'], keywordsAr: ['الإتقان', 'المهارة', 'التفاني'] },
  { id: 'pents-nine', nameEn: 'Nine of Pentacles', nameAr: 'تسعة البنتاكلز', arcana: 'minor', suitEn: 'Pentacles', suitAr: 'البنتاكلز', uprightEn: 'Abundance, luxury, self-sufficiency, financial independence.', uprightAr: 'الوفرة، الرفاهية، الاكتفاء الذاتي، الاستقلال المالي.', reversedEn: 'Self-worth, over-investment in work, hustling.', reversedAr: 'احترام الذات، الإفراط في الاستثمار في العمل.', keywordsEn: ['abundance', 'independence', 'luxury'], keywordsAr: ['الوفرة', 'الاستقلال', 'الرفاهية'] },
  { id: 'pents-ten', nameEn: 'Ten of Pentacles', nameAr: 'عشرة البنتاكلز', arcana: 'minor', suitEn: 'Pentacles', suitAr: 'البنتاكلز', uprightEn: 'Wealth, financial security, family, long-term success.', uprightAr: 'الثروة، الأمان المالي، الأسرة، النجاح طويل المدى.', reversedEn: 'The dark side of wealth, financial failure, loss.', reversedAr: 'الجانب المظلم من الثروة، الفشل المالي، الخسارة.', keywordsEn: ['wealth', 'legacy', 'security'], keywordsAr: ['الثروة', 'الإرث', 'الأمان'] },
  { id: 'pents-page', nameEn: 'Page of Pentacles', nameAr: 'وصيف البنتاكلز', arcana: 'minor', suitEn: 'Pentacles', suitAr: 'البنتاكلز', uprightEn: 'Manifestation, financial opportunity, skill development.', uprightAr: 'التجلي، الفرصة المالية، تطوير المهارات.', reversedEn: 'Lack of progress, procrastination, learning from failure.', reversedAr: 'غياب التقدم، التسويف، التعلم من الفشل.', keywordsEn: ['opportunity', 'learning', 'ambition'], keywordsAr: ['الفرصة', 'التعلم', 'الطموح'] },
  { id: 'pents-knight', nameEn: 'Knight of Pentacles', nameAr: 'فارس البنتاكلز', arcana: 'minor', suitEn: 'Pentacles', suitAr: 'البنتاكلز', uprightEn: 'Hard work, routine, conservatism, perseverance.', uprightAr: 'العمل الجاد، الروتين، التحفظ، المثابرة.', reversedEn: 'Boredom, laziness, stagnation.', reversedAr: 'الملل، الكسل، الركود.', keywordsEn: ['perseverance', 'routine', 'reliability'], keywordsAr: ['المثابرة', 'الروتين', 'الموثوقية'] },
  { id: 'pents-queen', nameEn: 'Queen of Pentacles', nameAr: 'ملكة البنتاكلز', arcana: 'minor', suitEn: 'Pentacles', suitAr: 'البنتاكلز', uprightEn: 'Nurturing, practical, providing, financially secure.', uprightAr: 'راعية، عملية، موفرة، آمنة مالياً.', reversedEn: 'Overly focused on work, financial independence.', reversedAr: 'التركيز المفرط على العمل، الاستقلال المالي.', keywordsEn: ['nurturing', 'abundance', 'practicality'], keywordsAr: ['الرعاية', 'الوفرة', 'العملية'] },
  { id: 'pents-king', nameEn: 'King of Pentacles', nameAr: 'ملك البنتاكلز', arcana: 'minor', suitEn: 'Pentacles', suitAr: 'البنتاكلز', uprightEn: 'Wealth, business, leadership, security, discipline.', uprightAr: 'الثروة، الأعمال، القيادة، الأمان، الانضباط.', reversedEn: 'Financially inept, obsessed with wealth, stubborn.', reversedAr: 'غير كفؤ مالياً، مهووس بالثروة، عنيد.', keywordsEn: ['abundance', 'leadership', 'security'], keywordsAr: ['الوفرة', 'القيادة', 'الأمان'] },
]

/* ============================================================
   NUMEROLOGY
   ============================================================ */
const numerologyMeanings: Record<number, { en: string; ar: string; themeEn: string; themeAr: string; chakra: string }> = {
  1: { en: 'Initiation, leadership, self-will', ar: 'البدء، القيادة، الإرادة الذاتية', themeEn: 'Begin something.', themeAr: 'ابدأ شيئاً.', chakra: 'Root' },
  2: { en: 'Balance, partnership, duality', ar: 'التوازن، الشراكة، الازدواجية', themeEn: 'Weigh both sides.', themeAr: 'وازن بين الجانبين.', chakra: 'Sacral' },
  3: { en: 'Expression, creativity, joy', ar: 'التعبير، الإبداع، الفرح', themeEn: 'Speak or create.', themeAr: 'تحدّث أو أبدع.', chakra: 'Solar Plexus' },
  4: { en: 'Structure, discipline, foundation', ar: 'البنية، الانضباط، الأساس', themeEn: 'Build slowly.', themeAr: 'ابنِ ببطء.', chakra: 'Root' },
  5: { en: 'Change, freedom, movement', ar: 'التغيير، الحرية، الحركة', themeEn: 'Release the old.', themeAr: 'أطلق القديم.', chakra: 'Throat' },
  6: { en: 'Responsibility, care, harmony', ar: 'المسؤولية، الرعاية، الانسجام', themeEn: 'Tend what is yours.', themeAr: 'اعتنِ بما هو لك.', chakra: 'Heart' },
  7: { en: 'Introspection, wisdom, mystery', ar: 'التأمل، الحكمة، الغموض', themeEn: 'Go inward.', themeAr: 'اتجه إلى الداخل.', chakra: 'Third Eye' },
  8: { en: 'Power, karma, material mastery', ar: 'القوة، الكارما، الإتقان المادي', themeEn: 'Own your authority.', themeAr: 'امتلك سلطتك.', chakra: 'Solar Plexus' },
  9: { en: 'Completion, release, wisdom', ar: 'الإكمال، التحرير، الحكمة', themeEn: 'Close a chapter.', themeAr: 'أغلق فصلاً.', chakra: 'Crown' },
  11: { en: 'Intuition, illumination, spiritual messenger', ar: 'الحدس، الإشراق، الرسالة الروحية', themeEn: 'Trust the signal.', themeAr: 'ثق بالإشارة.', chakra: 'Third Eye' },
  22: { en: 'Master builder, vision made tangible', ar: 'البنّاء الأكبر، تحويل الرؤية إلى واقع', themeEn: 'Build the vision.', themeAr: 'ابنِ الرؤية.', chakra: 'Crown' },
}

/* ============================================================
   DAILY ORACLE ENGINE
   Astronomy Engine provides the astronomical layer.
   The interpretation layer below is symbolic/astrological.
   ============================================================ */
const SIGNS_EN = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'] as const
const SIGNS_AR = ['الحمل', 'الثور', 'الجوزاء', 'السرطان', 'الأسد', 'العذراء', 'الميزان', 'العقرب', 'القوس', 'الجدي', 'الدلو', 'الحوت'] as const

type Language = 'en' | 'ar'
type PlanetId = 'sun' | 'moon' | 'mercury' | 'venus' | 'mars' | 'jupiter' | 'saturn' | 'uranus' | 'neptune' | 'pluto'

type PlanetReading = {
  id: PlanetId
  name: string
  sign: string
  degree: number
  minute: number
  longitude: number
  retrograde: boolean
}

type Aspect = {
  a: PlanetReading
  b: PlanetReading
  type: string
  angle: number
  orb: number
  strength: number
}

const PLANETS: { id: PlanetId; body: Astronomy.Body; en: string; ar: string }[] = [
  { id: 'sun', body: Astronomy.Body.Sun, en: 'Sun', ar: 'الشمس' },
  { id: 'moon', body: Astronomy.Body.Moon, en: 'Moon', ar: 'القمر' },
  { id: 'mercury', body: Astronomy.Body.Mercury, en: 'Mercury', ar: 'عطارد' },
  { id: 'venus', body: Astronomy.Body.Venus, en: 'Venus', ar: 'الزهرة' },
  { id: 'mars', body: Astronomy.Body.Mars, en: 'Mars', ar: 'المريخ' },
  { id: 'jupiter', body: Astronomy.Body.Jupiter, en: 'Jupiter', ar: 'المشتري' },
  { id: 'saturn', body: Astronomy.Body.Saturn, en: 'Saturn', ar: 'زحل' },
  { id: 'uranus', body: Astronomy.Body.Uranus, en: 'Uranus', ar: 'أورانوس' },
  { id: 'neptune', body: Astronomy.Body.Neptune, en: 'Neptune', ar: 'نبتون' },
  { id: 'pluto', body: Astronomy.Body.Pluto, en: 'Pluto', ar: 'بلوتو' },
]

const norm360 = (x: number) => ((x % 360) + 360) % 360
const angularDistance = (a: number, b: number) => {
  const d = Math.abs(norm360(a) - norm360(b))
  return Math.min(d, 360 - d)
}

function getLongitude(id: PlanetId, date: Date): number {
  const time = Astronomy.MakeTime(date)
  if (id === 'sun') return norm360(Astronomy.SunPosition(time).elon)
  if (id === 'moon') return norm360(Astronomy.EclipticGeoMoon(time).lon)

  const body = PLANETS.find(p => p.id === id)!.body
  const vector = Astronomy.GeoVector(body, time, Astronomy.Aberration.Corrected)
  return norm360(Astronomy.EquatorialToEcliptic(vector).elon)
}

function isRetrograde(id: PlanetId, date: Date): boolean {
  if (id === 'sun' || id === 'moon') return false
  const before = getLongitude(id, new Date(date.getTime() - 6 * 60 * 60 * 1000))
  const after = getLongitude(id, new Date(date.getTime() + 6 * 60 * 60 * 1000))
  let delta = after - before
  if (delta > 180) delta -= 360
  if (delta < -180) delta += 360
  return delta < 0
}

function longitudeParts(longitude: number) {
  const signIndex = Math.floor(norm360(longitude) / 30)
  const within = norm360(longitude) - signIndex * 30
  return { signIndex, degree: Math.floor(within), minute: Math.round((within - Math.floor(within)) * 60) }
}

function getMoonPhase(date: Date): number {
  // Astronomy Engine returns geocentric Moon-Sun ecliptic separation:
  // 0=new, 90=first quarter, 180=full, 270=last quarter.
  return norm360(Astronomy.MoonPhase(Astronomy.MakeTime(date))) / 360
}

function getMoonPhaseName(phase: number, lang: Language) {
  const idx = Math.floor((phase * 8 + 0.5) % 8)
  const names = lang === 'en'
    ? ['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous', 'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent']
    : ['محاق', 'هلال متزايد', 'الربع الأول', 'أحدب متزايد', 'بدر', 'أحدب متناقص', 'الربع الأخير', 'هلال متناقص']
  return names[idx]
}

function getZodiacSeason(date: Date, lang: Language) {
  const longitude = getLongitude('sun', date)
  const index = Math.floor(longitude / 30)
  return lang === 'en' ? SIGNS_EN[index] : SIGNS_AR[index]
}

function getDayRuler(date: Date, lang: Language) {
  const rulers = lang === 'en'
    ? ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn']
    : ['الشمس', 'القمر', 'المريخ', 'عطارد', 'المشتري', 'الزهرة', 'زحل']
  return rulers[date.getDay()]
}

function getPlanets(date: Date, lang: Language): PlanetReading[] {
  return PLANETS.map(p => {
    const longitude = getLongitude(p.id, date)
    const { signIndex, degree, minute } = longitudeParts(longitude)
    return {
      id: p.id,
      name: lang === 'en' ? p.en : p.ar,
      sign: lang === 'en' ? SIGNS_EN[signIndex] : SIGNS_AR[signIndex],
      degree,
      minute,
      longitude,
      retrograde: isRetrograde(p.id, date),
    }
  })
}

const ASPECT_DEFS = [
  { angle: 0, orb: 8, en: 'Conjunction', ar: 'اقتران' },
  { angle: 60, orb: 5, en: 'Sextile', ar: 'تسديس' },
  { angle: 90, orb: 7, en: 'Square', ar: 'تربيع' },
  { angle: 120, orb: 7, en: 'Trine', ar: 'تثليث' },
  { angle: 180, orb: 8, en: 'Opposition', ar: 'مقابلة' },
]

function getAspects(planets: PlanetReading[], lang: Language): Aspect[] {
  const aspects: Aspect[] = []
  for (let i = 0; i < planets.length; i++) {
    for (let j = i + 1; j < planets.length; j++) {
      const a = planets[i]
      const b = planets[j]
      const separation = angularDistance(a.longitude, b.longitude)
      for (const def of ASPECT_DEFS) {
        const orb = Math.abs(separation - def.angle)
        if (orb <= def.orb) {
          const strength = 1 - orb / def.orb
          aspects.push({
            a, b,
            type: lang === 'en' ? def.en : def.ar,
            angle: def.angle,
            orb,
            strength,
          })
          break
        }
      }
    }
  }
  return aspects.sort((x, y) => y.strength - x.strength).slice(0, 8)
}

function getElement(signIndex: number) {
  return ['fire', 'earth', 'air', 'water'][signIndex % 4]
}

function getEnergyWeather(planets: PlanetReading[], aspects: Aspect[], phase: number, lang: Language) {
  let score = 50
  const moon = planets.find(p => p.id === 'moon')!
  const sun = planets.find(p => p.id === 'sun')!

  // Lunation intensity: New/Full Moon are treated as higher symbolic intensity.
  const phaseAngle = phase * 360
  const lunationDistance = Math.min(phaseAngle, Math.abs(phaseAngle - 180), Math.abs(phaseAngle - 360))
  if (lunationDistance < 12) score += 15
  else if (lunationDistance < 25) score += 7

  // Close major aspects increase activity; exact strength is based on orb.
  score += aspects.slice(0, 5).reduce((sum, a) => sum + Math.round(a.strength * 5), 0)

  // Retrogrades are interpreted as inward/review energy rather than simply "bad" energy.
  const retrogrades = planets.filter(p => p.retrograde).length
  score += Math.min(10, retrogrades * 2)

  // Element balance: Moon/Sun/inner planets carry more weight.
  const weighted = planets.filter(p => ['sun', 'moon', 'mercury', 'venus', 'mars'].includes(p.id))
  const counts = weighted.reduce<Record<string, number>>((acc, p) => {
    const element = getElement(Math.floor(p.longitude / 30))
    acc[element] = (acc[element] || 0) + 1
    return acc
  }, {})
  const dominant = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0]
  if (dominant === 'fire') score += 7
  if (dominant === 'water') score += 3

  // Cancer/Capricorn-style cardinal Moon is still dynamic; this keeps Moon relevant without inventing physics.
  if (['Aries', 'Cancer', 'Libra', 'Capricorn'].includes(moon.sign)) score += 3
  if (['Aries', 'Leo', 'Sagittarius'].includes(sun.sign)) score += 2

  score = Math.max(0, Math.min(100, score))

  let levelEn: string
  let levelAr: string
  let phraseEn: string
  let phraseAr: string

  if (score >= 76) {
    levelEn = 'Intense'; levelAr = 'مكثفة'
    phraseEn = 'The sky is symbolically active. Move deliberately, and give strong impulses a conscious direction.'
    phraseAr = 'السماء نشطة رمزياً. تحرّك بوعي، وامنح الدوافع القوية اتجاهاً مقصوداً.'
  } else if (score >= 56) {
    levelEn = 'Active'; levelAr = 'نشطة'
    phraseEn = 'There is movement in the field. Act where clarity is present, but leave room to observe and adjust.'
    phraseAr = 'هناك حركة في الحقل. تحرّك حيث يوجد الوضوح، واترك مساحة للملاحظة والتعديل.'
  } else if (score >= 36) {
    levelEn = 'Grounded'; levelAr = 'متوازنة'
    phraseEn = 'The day favours steady integration. Let insight become something practical rather than forcing momentum.'
    phraseAr = 'يميل اليوم إلى التكامل الهادئ. حوّل البصيرة إلى شيء عملي بدلاً من فرض الحركة.'
  } else {
    levelEn = 'Quiet'; levelAr = 'هادئة'
    phraseEn = 'The symbolic weather is quieter. Reflection, restoration and careful observation are favoured.'
    phraseAr = 'الطقس الرمزي أكثر هدوءاً. يميل اليوم إلى التأمل والاستعادة والملاحظة الهادئة.'
  }

  return {
    level: lang === 'en' ? levelEn : levelAr,
    phrase: lang === 'en' ? phraseEn : phraseAr,
    score,
  }
}

function getPortal(date: Date, lang: Language) {
  const phase = getMoonPhase(date)
  const day = date.getDate()

  const seasons = Astronomy.Seasons(date.getUTCFullYear())
  const events = [
    { time: seasons.mar_equinox.date, en: 'March Equinox', ar: 'الاعتدال الربيعي' },
    { time: seasons.jun_solstice.date, en: 'June Solstice', ar: 'الانقلاب الصيفي' },
    { time: seasons.sep_equinox.date, en: 'September Equinox', ar: 'الاعتدال الخريفي' },
    { time: seasons.dec_solstice.date, en: 'December Solstice', ar: 'الانقلاب الشتوي' },
  ]
  const nearSeason = events.find(e => Math.abs(date.getTime() - e.time.getTime()) <= 36 * 60 * 60 * 1000)
  if (nearSeason) {
    return { name: lang === 'en' ? `Seasonal Gateway · ${nearSeason.en}` : `البوابة الموسمية · ${nearSeason.ar}`, desc: lang === 'en' ? 'An astronomical seasonal turning point.' : 'نقطة تحول موسمية فلكية.', color: '#34d399' }
  }

  if (phase < 0.025 || phase > 0.975) return { name: lang === 'en' ? 'New Moon Portal' : 'بوابة المحاق', desc: lang === 'en' ? 'A symbolic threshold for beginnings and intention.' : 'عتبة رمزية للبدايات والنية.', color: '#a3a380' }
  if (Math.abs(phase - 0.5) < 0.025) return { name: lang === 'en' ? 'Full Moon Portal' : 'بوابة البدر', desc: lang === 'en' ? 'A symbolic peak for illumination and release.' : 'ذروة رمزية للإضاءة والتحرير.', color: '#e7d5a5' }

  // These are intentionally symbolic calendar portals, not astronomical events.
  if (day === 11) return { name: lang === 'en' ? '11:11 Symbolic Portal' : 'البوابة الرمزية 11:11', desc: lang === 'en' ? 'A numerological symbol of alignment and attention.' : 'رمز عددي للمحاذاة والانتباه.', color: '#a855f7' }
  if (day === 22) return { name: lang === 'en' ? '22:22 Symbolic Portal' : 'البوابة الرمزية 22:22', desc: lang === 'en' ? 'A numerological symbol of building and embodiment.' : 'رمز عددي للبناء والتجسيد.', color: '#fcd34d' }
  if ([3, 13, 23].includes(day)) return { name: lang === 'en' ? '3 Symbolic Portal' : 'البوابة الرمزية 3', desc: lang === 'en' ? 'Creative expression and communication.' : 'التعبير الإبداعي والتواصل.', color: '#f0abfc' }
  if ([7, 17, 27].includes(day)) return { name: lang === 'en' ? '7 Symbolic Portal' : 'البوابة الرمزية 7', desc: lang === 'en' ? 'Inner inquiry and reflection.' : 'البحث الداخلي والتأمل.', color: '#c084fc' }
  if ([9, 19, 29].includes(day)) return { name: lang === 'en' ? '9 Symbolic Portal' : 'البوابة الرمزية 9', desc: lang === 'en' ? 'Completion, closure and release.' : 'الإكمال والإغلاق والتحرير.', color: '#60a5fa' }

  return { name: lang === 'en' ? 'Open Sky' : 'السماء المفتوحة', desc: lang === 'en' ? 'No major astronomical gateway is highlighted today.' : 'لا توجد بوابة فلكية كبرى مميزة اليوم.', color: '#94a3b8' }
}

function getGroundingTheme(planets: PlanetReading[], lang: Language) {
  const elements = planets
    .filter(p => ['sun', 'moon', 'mercury', 'venus', 'mars'].includes(p.id))
    .map(p => getElement(Math.floor(p.longitude / 30)))
  const counts = elements.reduce<Record<string, number>>((a, e) => { a[e] = (a[e] || 0) + 1; return a }, {})
  const dominant = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0]
  const themes: Record<string, { en: string; ar: string }> = {
    fire: { en: 'Ground through action: choose one clear thing and do it.', ar: 'تجذّر عبر الفعل: اختر شيئاً واضحاً واحداً وقم به.' },
    earth: { en: 'Ground through routine, structure and practical care.', ar: 'تجذّر عبر الروتين والبنية والعناية العملية.' },
    air: { en: 'Ground through clarity: write, name and organise your thoughts.', ar: 'تجذّر عبر الوضوح: اكتب أفكارك وسمّها ونظّمها.' },
    water: { en: 'Ground through emotional awareness without becoming consumed by it.', ar: 'تجذّر عبر الوعي بالمشاعر دون أن تبتلعك.' },
  }
  return themes[dominant || 'earth'][lang]
}

/* ============================================================
   PAGE
   ============================================================ */

export default function ReadingEnergyPage() {
  const router = useRouter()
  const { language, toggleLanguage } = useLanguage()
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null)
  const [stars, setStars] = useState<any[]>([])
  const [mounted, setMounted] = useState(false)
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    setMounted(true)
    const s = []
    for (let i = 0; i < 140; i++) {
      s.push({ id: i, x: Math.random() * 100, y: Math.random() * 100, size: Math.random() * 1.3 + 0.3, delay: Math.random() * 5, duration: Math.random() * 3 + 2 })
    }
    setStars(s)

    // Refresh periodically so an open tab naturally moves to the next day's reading.
    const timer = window.setInterval(() => setNow(new Date()), 60_000)
    return () => window.clearInterval(timer)
  }, [])

  const reading = useMemo(() => {
    const today = now
    const seed = seedFromDate(today)
    const rng = mulberry32(seed)

    const idxSet = new Set<number>()
    while (idxSet.size < 3) idxSet.add(Math.floor(rng() * tarotDeck.length))
    const drawnCards = Array.from(idxSet).map((idx, i) => ({
      card: tarotDeck[idx],
      reversed: rng() < 0.3,
      position: language === 'en' ? ['Situation', 'Action', 'Outcome'][i] : ['الموقف', 'الفعل', 'النتيجة'][i],
    }))

    const phase = getMoonPhase(today)
    const planets = getPlanets(today, language)
    const aspects = getAspects(planets, language)
    const energy = getEnergyWeather(planets, aspects, phase, language)

    const numerologyNumber = (() => {
      const str = `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`
      let sum = str.split('').reduce((a, b) => a + parseInt(b), 0)
      while (sum > 9 && sum !== 11 && sum !== 22) sum = sum.toString().split('').reduce((a, b) => a + parseInt(b), 0)
      return sum
    })()

    const numerology = numerologyMeanings[numerologyNumber] || numerologyMeanings[7]

    return {
      date: today,
      moonPhase: phase,
      moonPhaseName: getMoonPhaseName(phase, language),
      zodiac: getZodiacSeason(today, language),
      dayRuler: getDayRuler(today, language),
      planets,
      aspects,
      portal: getPortal(today, language),
      energy,
      groundingTheme: getGroundingTheme(planets, language),
      drawnCards,
      numerologyNumber,
      numerology,
    }
  }, [language, now])

  const formatDate = (d: Date) => {
    return language === 'en'
      ? d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
      : d.toLocaleDateString('ar-EG', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  }

  if (!mounted) return null

  return (
    <div
      className="min-h-screen overflow-hidden relative selection:bg-amber-900/40 selection:text-amber-100"
      style={{
        background: 'radial-gradient(ellipse at 50% -10%, #1a0f05 0%, #0d0703 30%, #050301 65%, #010000 100%)',
        fontFamily: "'Cormorant Garamond', 'Georgia', serif",
      }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {stars.map((s) => (
          <div key={s.id} className="absolute rounded-full"
            style={{
              left: s.x + '%', top: s.y + '%',
              width: s.size + 'px', height: s.size + 'px',
              background: 'rgba(255, 230, 180, 0.85)',
              boxShadow: '0 0 4px rgba(255, 210, 150, 0.7)',
              animation: `twinkle ${s.duration}s ease-in-out infinite`,
              animationDelay: s.delay + 's',
            }} />
        ))}
      </div>

      <div className="absolute top-0 left-1/4 w-[60vw] h-[60vh] pointer-events-none opacity-50"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(251,191,36,0.14) 0%, transparent 60%)' }} />
      <div className="absolute bottom-0 right-1/4 w-[50vw] h-[50vh] pointer-events-none opacity-40"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(180,90,30,0.15) 0%, transparent 60%)' }} />

      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-6 flex justify-between items-center">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push('/space')}
          className="text-amber-300/80 hover:text-amber-100 transition-all duration-300 flex items-center gap-2 text-xs tracking-[0.25em] uppercase bg-amber-950/30 border border-amber-800/40 backdrop-blur-md px-4 py-2 rounded-full"
        >
          ← {language === 'en' ? 'Return to Space' : 'العودة إلى الفضاء'}
        </motion.button>
        <button
          onClick={toggleLanguage}
          className="px-4 py-2 bg-amber-950/30 rounded-full text-amber-200 text-xs tracking-widest uppercase hover:bg-amber-900/40 transition-all duration-300 border border-amber-800/40 backdrop-blur-md"
        >
          {language === 'en' ? 'العربية' : 'English'}
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center pt-16 pb-6 relative z-10"
      >
        <div className="flex justify-center gap-4 mb-6 opacity-90">
          <MoonIcon color="#e7d5a5" size={24} phase={reading.moonPhase} />
          <CandleIcon color="#e7d5a5" size={24} />
          <PentagramIcon color="#e7d5a5" size={24} />
          <CrystalIcon color="#e7d5a5" size={24} />
          <StarIcon color="#e7d5a5" size={24} />
        </div>
        <h1
          className="text-4xl md:text-6xl font-light tracking-[0.15em] italic"
          style={{ color: '#f5e6b8', textShadow: '0 0 30px rgba(251,191,36,0.5), 0 0 80px rgba(120,50,10,0.5)' }}
        >
          {language === 'en' ? "Lilith's Daily Oracle" : 'عرّافة ليليث اليومية'}
        </h1>
        <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-amber-500/60 to-transparent mx-auto mt-6" />
        <p className="text-amber-400/70 text-xs tracking-[0.5em] uppercase mt-5">
          {formatDate(reading.date)}
        </p>
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-8 space-y-8">

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-8 py-4"
        >
          {[
            { label: language === 'en' ? 'Moon' : 'القمر', value: reading.moonPhaseName, symbol: '☽' },
            { label: language === 'en' ? 'Season' : 'الفصل', value: reading.zodiac, symbol: '☉' },
            { label: language === 'en' ? 'Ruler' : 'الحاكم', value: reading.dayRuler, symbol: '♄' },
            { label: language === 'en' ? 'Number' : 'الرقم', value: String(reading.numerologyNumber), symbol: '✦' },
          ].map((item, i) => (
            <div key={i} className="text-center px-4">
              <div className="text-2xl mb-1" style={{ color: '#fbbf24', fontFamily: 'serif' }}>{item.symbol}</div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-amber-400/60">{item.label}</p>
              <p className="text-sm italic" style={{ color: '#f5e6b8' }}>{item.value}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl p-7 border relative overflow-hidden"
          style={{
            background: 'linear-gradient(160deg, rgba(30,15,5,0.85), rgba(5,3,1,0.95))',
            borderColor: 'rgba(251,191,36,0.4)',
          }}
        >
          <span className="absolute top-3 left-3 w-3 h-3 border-l border-t" style={{ borderColor: 'rgba(251,191,36,0.6)' }} />
          <span className="absolute top-3 right-3 w-3 h-3 border-r border-t" style={{ borderColor: 'rgba(251,191,36,0.6)' }} />
          <span className="absolute bottom-3 left-3 w-3 h-3 border-l border-b" style={{ borderColor: 'rgba(251,191,36,0.6)' }} />
          <span className="absolute bottom-3 right-3 w-3 h-3 border-r border-b" style={{ borderColor: 'rgba(251,191,36,0.6)' }} />
          <div className="flex items-center gap-3 mb-5">
            <PlanetIcon color="#fbbf24" size={26} />
            <h3 className="text-amber-300 text-sm tracking-[0.4em] uppercase">
              {language === 'en' ? 'II · Cosmic Weather' : 'II · الطقس الكوني'}
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {reading.planets.map((p, i) => (
              <div key={i} className="rounded-xl p-3 border"
                style={{ background: 'rgba(0,0,0,0.4)', borderColor: p.retrograde ? 'rgba(239,68,68,0.4)' : 'rgba(251,191,36,0.2)' }}>
                <div className="text-[10px] tracking-[0.25em] uppercase mb-1"
                  style={{ color: p.retrograde ? '#fca5a5' : '#fbbf24' }}>
                  {p.name}{p.retrograde ? ' ℞' : ''}
                </div>
                <div className="text-slate-200 text-sm italic">{p.sign}</div>
                <div className="text-slate-500 text-[10px] mt-1">{p.degree}° {String(p.minute).padStart(2, '0')}′</div>
              </div>
            ))}
          </div>
          {reading.aspects.length > 0 && (
            <div className="mt-5 pt-5 border-t border-amber-500/10">
              <p className="text-[10px] tracking-[0.3em] uppercase text-amber-400/60 mb-3">
                {language === 'en' ? 'Major aspects' : 'الاتصالات الرئيسية'}
              </p>
              <div className="flex flex-wrap gap-2">
                {reading.aspects.slice(0, 5).map((aspect, i) => (
                  <span key={i} className="rounded-full border px-3 py-1 text-[11px] text-slate-300/80" style={{ borderColor: 'rgba(251,191,36,0.18)' }}>
                    {aspect.a.name} {aspect.type} {aspect.b.name} · {aspect.orb.toFixed(1)}°
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <div className="rounded-3xl p-6 border relative overflow-hidden"
            style={{ background: 'linear-gradient(160deg, rgba(30,15,5,0.85), rgba(5,3,1,0.95))', borderColor: 'rgba(251,191,36,0.35)' }}>
            <span className="absolute top-3 left-3 w-3 h-3 border-l border-t" style={{ borderColor: 'rgba(251,191,36,0.6)' }} />
            <span className="absolute top-3 right-3 w-3 h-3 border-r border-t" style={{ borderColor: 'rgba(251,191,36,0.6)' }} />
            <div className="flex items-center gap-3 mb-4">
              <CandleIcon color="#fbbf24" size={22} />
              <h3 className="text-amber-300 text-xs tracking-[0.35em] uppercase">
                {language === 'en' ? 'III · Energy' : 'III · الطاقة'}
              </h3>
            </div>
            <p className="text-3xl italic mb-2" style={{ color: '#f5e6b8' }}>{reading.energy.level}</p>
            <p className="text-slate-300/85 text-sm italic leading-relaxed">{reading.energy.phrase}</p>
          </div>
          <div className="rounded-3xl p-6 border relative overflow-hidden"
            style={{ background: 'linear-gradient(160deg, rgba(30,15,5,0.85), rgba(5,3,1,0.95))', borderColor: 'rgba(251,191,36,0.35)' }}>
            <span className="absolute top-3 left-3 w-3 h-3 border-l border-t" style={{ borderColor: 'rgba(251,191,36,0.6)' }} />
            <span className="absolute top-3 right-3 w-3 h-3 border-r border-t" style={{ borderColor: 'rgba(251,191,36,0.6)' }} />
            <div className="flex items-center gap-3 mb-4">
              <PentacleIcon color="#fbbf24" size={22} />
              <h3 className="text-amber-300 text-xs tracking-[0.35em] uppercase">
                {language === 'en' ? 'Grounding Theme' : 'موضوع التجذير'}
              </h3>
            </div>
            <p className="text-2xl italic mb-2" style={{ color: '#f5e6b8' }}>
              {language === 'en' ? 'Celestial balance' : 'التوازن السماوي'}
            </p>
            <p className="text-slate-300/85 text-sm italic leading-relaxed">{reading.groundingTheme}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl p-7 border relative overflow-hidden"
          style={{
            background: `linear-gradient(160deg, ${reading.portal.color}18, rgba(5,3,1,0.95))`,
            borderColor: `${reading.portal.color}55`,
          }}
        >
          <span className="absolute top-3 left-3 w-3 h-3 border-l border-t" style={{ borderColor: `${reading.portal.color}88` }} />
          <span className="absolute top-3 right-3 w-3 h-3 border-r border-t" style={{ borderColor: `${reading.portal.color}88` }} />
          <span className="absolute bottom-3 left-3 w-3 h-3 border-l border-b" style={{ borderColor: `${reading.portal.color}88` }} />
          <span className="absolute bottom-3 right-3 w-3 h-3 border-r border-b" style={{ borderColor: `${reading.portal.color}88` }} />
          <div className="flex items-center gap-4 mb-3">
            <PortalIcon color={reading.portal.color} size={32} />
            <div>
              <h3 className="text-xs tracking-[0.4em] uppercase" style={{ color: `${reading.portal.color}cc` }}>
                {language === 'en' ? 'IV · Portal Watch' : 'IV · مراقبة البوابات'}
              </h3>
              <p className="text-2xl italic" style={{ color: reading.portal.color, textShadow: `0 0 20px ${reading.portal.color}66` }}>
                {reading.portal.name}
              </p>
            </div>
          </div>
          <p className="text-slate-300/85 text-sm italic leading-relaxed">{reading.portal.desc}</p>
        </motion.div>

        <div>
          <div className="text-center mb-6">
            <h3 className="text-lg tracking-[0.3em] uppercase mb-2" style={{ color: '#fbbf24' }}>
              {language === 'en' ? 'V · The Tarot Spread' : 'V · التاروت'}
            </h3>
            <p className="text-amber-400/60 text-[10px] tracking-[0.4em] uppercase">
              {language === 'en' ? 'Situation · Action · Outcome' : 'الموقف · الفعل · النتيجة'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {reading.drawnCards.map((dc, idx) => {
              const SuitIcon = dc.card.suitEn === 'Wands' ? WandIcon : dc.card.suitEn === 'Cups' ? ChaliceIcon : dc.card.suitEn === 'Swords' ? SwordIcon : dc.card.suitEn === 'Pentacles' ? PentacleIcon : PentagramIcon
              return (
                <motion.button
                  key={dc.card.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.15 }}
                  whileHover={{ y: -6 }}
                  onClick={() => setSelectedCard(dc.card)}
                  className="text-center rounded-2xl p-6 border relative overflow-hidden"
                  style={{ background: 'linear-gradient(180deg, rgba(30,15,5,0.9), rgba(5,3,1,0.95))', borderColor: 'rgba(251,191,36,0.4)' }}
                >
                  <span className="absolute top-3 left-3 w-3 h-3 border-l border-t" style={{ borderColor: 'rgba(251,191,36,0.5)' }} />
                  <span className="absolute top-3 right-3 w-3 h-3 border-r border-t" style={{ borderColor: 'rgba(251,191,36,0.5)' }} />
                  <span className="absolute bottom-3 left-3 w-3 h-3 border-l border-b" style={{ borderColor: 'rgba(251,191,36,0.5)' }} />
                  <span className="absolute bottom-3 right-3 w-3 h-3 border-r border-b" style={{ borderColor: 'rgba(251,191,36,0.5)' }} />

                  <p className="text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: '#fbbf24' }}>
                    {dc.position}
                  </p>

                  <div className="mx-auto rounded-lg mb-4 flex items-center justify-center"
                    style={{
                      width: '90px', height: '140px',
                      background: 'linear-gradient(160deg, #1a0f05 0%, #3a1f08 100%)',
                      border: '1.5px solid rgba(251,191,36,0.6)',
                      boxShadow: `0 0 25px rgba(251,191,36,0.3), inset 0 0 15px rgba(251,191,36,0.15)`,
                      transform: dc.reversed ? 'rotate(180deg)' : 'none',
                    }}>
                    <SuitIcon color="#fbbf24" size={40} />
                  </div>

                  <h4 className="text-base italic mb-1" style={{ color: '#f5e6b8' }}>
                    {language === 'en' ? dc.card.nameEn : dc.card.nameAr}
                  </h4>
                  {dc.reversed && (
                    <p className="text-[10px] tracking-[0.3em] uppercase" style={{ color: '#fca5a5' }}>
                      {language === 'en' ? 'Reversed' : 'معكوسة'}
                    </p>
                  )}
                </motion.button>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              key: 'shadow',
              titleEn: 'VI · The Shadow',
              titleAr: 'VI · الظل',
              textEn: `The field asks you to look at what you have been avoiding. Today's theme — ${reading.numerology.themeEn.toLowerCase()} The ${reading.moonPhaseName} moon magnifies hidden truths.`,
              textAr: `يطلب منك الحقل النظر إلى ما كنت تتجنبه. موضوع اليوم — ${reading.numerology.themeAr} قمر ${reading.moonPhaseName} يضخّم الحقائق الخفية.`,
              Icon: CrystalIcon,
            },
            {
              key: 'relations',
              titleEn: 'VII · Relationships',
              titleAr: 'VII · العلاقات',
              textEn: `Venus speaks through ${reading.planets[3].sign} today. Relationships ask for ${reading.numerologyNumber % 2 === 0 ? 'gentle honesty' : 'clear boundaries'}.`,
              textAr: `تتحدث الزهرة عبر ${reading.planets[3].sign} اليوم. تطلب العلاقات ${reading.numerologyNumber % 2 === 0 ? 'صدقاً لطيفاً' : 'حدوداً واضحة'}.`,
              Icon: ChaliceIcon,
            },
            {
              key: 'work',
              titleEn: 'VIII · Work & Money',
              titleAr: 'VIII · العمل والمال',
              textEn: `Mercury guides ${reading.planets[2].sign}. A day for ${reading.numerologyNumber % 3 === 0 ? 'structured action' : 'creative problem-solving'}.`,
              textAr: `يقود عطارد ${reading.planets[2].sign}. يوم ${reading.numerologyNumber % 3 === 0 ? 'لعمل منظم' : 'لحلول إبداعية'}.`,
              Icon: PentacleIcon,
            },
          ].map((s, i) => {
            const I = s.Icon
            return (
              <motion.div
                key={s.key}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + i * 0.08 }}
                className="rounded-3xl p-6 border relative overflow-hidden"
                style={{ background: 'linear-gradient(160deg, rgba(30,15,5,0.85), rgba(5,3,1,0.95))', borderColor: 'rgba(251,191,36,0.3)' }}
              >
                <span className="absolute top-3 left-3 w-3 h-3 border-l border-t" style={{ borderColor: 'rgba(251,191,36,0.5)' }} />
                <span className="absolute bottom-3 right-3 w-3 h-3 border-r border-b" style={{ borderColor: 'rgba(251,191,36,0.5)' }} />
                <div className="flex items-center gap-3 mb-4">
                  <I color="#fbbf24" size={22} />
                  <h3 className="text-amber-300 text-xs tracking-[0.35em] uppercase">
                    {language === 'en' ? s.titleEn : s.titleAr}
                  </h3>
                </div>
                <p className="text-slate-300/85 text-sm italic leading-relaxed">
                  {language === 'en' ? s.textEn : s.textAr}
                </p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="rounded-3xl p-8 border relative overflow-hidden"
          style={{
            background: 'linear-gradient(160deg, rgba(40,20,8,0.9), rgba(5,3,1,0.98))',
            borderColor: 'rgba(251,191,36,0.55)',
            boxShadow: '0 0 60px rgba(251,191,36,0.1)',
          }}
        >
          <span className="absolute top-3 left-3 w-4 h-4 border-l border-t" style={{ borderColor: 'rgba(251,191,36,0.7)' }} />
          <span className="absolute top-3 right-3 w-4 h-4 border-r border-t" style={{ borderColor: 'rgba(251,191,36,0.7)' }} />
          <span className="absolute bottom-3 left-3 w-4 h-4 border-l border-b" style={{ borderColor: 'rgba(251,191,36,0.7)' }} />
          <span className="absolute bottom-3 right-3 w-4 h-4 border-r border-b" style={{ borderColor: 'rgba(251,191,36,0.7)' }} />

          <div className="absolute -top-4 -right-4 opacity-60">
            <WaxSealIcon color="#8b1a1a" size={64} />
          </div>

          <div className="flex items-center gap-3 mb-5 justify-center">
            <CandleIcon color="#fbbf24" size={26} />
            <h3 className="text-amber-300 text-sm tracking-[0.4em] uppercase">
              {language === 'en' ? 'IX · Reflection & Practice' : 'IX · التأمل والممارسة'}
            </h3>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-[10px] tracking-[0.35em] uppercase mb-2 text-center" style={{ color: '#fbbf24' }}>
                {language === 'en' ? 'The Reading' : 'القراءة'}
              </p>
              <p className="text-slate-200 text-base md:text-lg italic leading-relaxed text-center" style={{ color: '#f5e6b8' }}>
                {language === 'en'
                  ? `The field today carries a ${reading.energy.level.toLowerCase()} resonance, ruled by ${reading.dayRuler} and coloured by ${reading.planets[0].sign}. ${reading.portal.name} opens a doorway — ${reading.portal.desc.toLowerCase()}. The ${reading.moonPhaseName} moon draws today's numerology toward ${reading.numerologyNumber}, asking you to ${reading.numerology.themeEn.toLowerCase()} Carry the energy of ${reading.drawnCards[1].card.nameEn} with you — it speaks of ${reading.drawnCards[1].card.keywordsEn.join(', ')}.`
                  : `يحمل حقل اليوم رنيناً ${reading.energy.level}، يحكمه ${reading.dayRuler} ويصبغه ${reading.planets[0].sign}. تفتح ${reading.portal.name} بوابة — ${reading.portal.desc}. يجذب قمر ${reading.moonPhaseName} علم الأعداد اليوم نحو ${reading.numerologyNumber}، طالباً منك أن ${reading.numerology.themeAr} احمل طاقة ${reading.drawnCards[1].card.nameAr} معك — إنها تتحدث عن ${reading.drawnCards[1].card.keywordsAr.join('، ')}.`}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t" style={{ borderColor: 'rgba(251,191,36,0.2)' }}>
              <div>
                <p className="text-[10px] tracking-[0.35em] uppercase mb-2" style={{ color: '#fbbf24' }}>
                  {language === 'en' ? 'Practice' : 'الممارسة'}
                </p>
                <p className="text-slate-300/85 text-sm italic leading-relaxed">
                  {language === 'en'
                    ? `Light a candle at dusk. Name one thing you are releasing and one thing you are calling in. Sit with the ${reading.moonPhaseName.toLowerCase()} energy for ten minutes.`
                    : `أشعل شمعة عند الغسق. سمِّ شيئاً واحداً تحرره وشيئاً واحداً تدعوه. اجلس مع طاقة ${reading.moonPhaseName} لعشر دقائق.`}
                </p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.35em] uppercase mb-2" style={{ color: '#fbbf24' }}>
                  {language === 'en' ? 'Affirmation' : 'التوكيد'}
                </p>
                <p className="text-slate-200 text-sm italic leading-relaxed" style={{ color: '#f5e6b8' }}>
                  {language === 'en'
                    ? `"I move with the field, not against it. ${reading.numerology.themeEn} This is my work today."`
                    : `"أتحرك مع الحقل، لا ضده. ${reading.numerology.themeAr} هذا عملي اليوم."`}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-5 border-t text-center" style={{ borderColor: 'rgba(251,191,36,0.2)' }}>
            <p className="text-amber-500/60 text-[10px] tracking-[0.4em] uppercase italic">
              {language === 'en' ? 'The field is always speaking' : 'الحقل يتحدث دائماً'}
            </p>
          </div>
        </motion.div>

        <div className="text-center py-4">
          <p className="text-amber-500/40 text-[10px] tracking-[0.35em] uppercase max-w-2xl mx-auto italic leading-relaxed">
            {language === 'en'
              ? 'Planetary positions calculated via mean longitude from J2000.0. Astronomical data is real — astrological, numerological and Tarot interpretations are symbolic mirrors, not scientific predictions.'
              : 'حُسبت مواقع الكواكب عبر خط الطول المتوسط من J2000.0. البيانات الفلكية حقيقية — التفسيرات التنجيمية والعددية والتاروت مرايا رمزية، وليست تنبؤات علمية.'}
          </p>
        </div>
      </div>

      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={() => setSelectedCard(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md max-h-[88vh] overflow-y-auto rounded-2xl border p-7"
              style={{
                background: 'linear-gradient(180deg, #1a0f05, #050301)',
                borderColor: 'rgba(251,191,36,0.55)',
                boxShadow: '0 0 50px rgba(251,191,36,0.25)',
              }}
            >
              <span className="absolute top-2 left-2 w-3 h-3 border-l border-t" style={{ borderColor: 'rgba(251,191,36,0.6)' }} />
              <span className="absolute top-2 right-2 w-3 h-3 border-r border-t" style={{ borderColor: 'rgba(251,191,36,0.6)' }} />
              <span className="absolute bottom-2 left-2 w-3 h-3 border-l border-b" style={{ borderColor: 'rgba(251,191,36,0.6)' }} />
              <span className="absolute bottom-2 right-2 w-3 h-3 border-r border-b" style={{ borderColor: 'rgba(251,191,36,0.6)' }} />

              <button
                onClick={() => setSelectedCard(null)}
                className="absolute top-4 right-4 opacity-60 hover:opacity-100 transition-opacity"
                aria-label="close"
              >
                <CloseIcon color="#fbbf24" />
              </button>

              <div className="text-center mb-6">
                <div className="flex justify-center mb-4">
                  <PentagramIcon color="#fbbf24" size={44} />
                </div>
                <h2 className="text-2xl italic font-light tracking-wide" style={{ color: '#f5e6b8' }}>
                  {language === 'en' ? selectedCard.nameEn : selectedCard.nameAr}
                </h2>
                <p className="text-amber-400/70 text-[10px] tracking-[0.35em] uppercase mt-2">
                  {selectedCard.arcana === 'major'
                    ? (language === 'en' ? 'Major Arcana' : 'الأسرار الكبرى')
                    : (language === 'en' ? selectedCard.suitEn : selectedCard.suitAr)}
                </p>
                <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-amber-500/60 to-transparent mx-auto my-3" />
              </div>

              <div className="space-y-3">
                <div className="rounded-xl p-4 border" style={{ background: 'rgba(0,0,0,0.4)', borderColor: 'rgba(251,191,36,0.25)' }}>
                  <p className="text-[10px] tracking-[0.3em] uppercase mb-1.5 text-amber-400">
                    {language === 'en' ? 'Upright' : 'في وضعها الطبيعي'}
                  </p>
                  <p className="text-slate-300 text-sm italic leading-relaxed">
                    {language === 'en' ? selectedCard.uprightEn : selectedCard.uprightAr}
                  </p>
                </div>
                <div className="rounded-xl p-4 border" style={{ background: 'rgba(0,0,0,0.4)', borderColor: 'rgba(251,191,36,0.25)' }}>
                  <p className="text-[10px] tracking-[0.3em] uppercase mb-1.5 text-amber-400">
                    {language === 'en' ? 'Reversed' : 'في وضعها المعكوس'}
                  </p>
                  <p className="text-slate-300 text-sm italic leading-relaxed">
                    {language === 'en' ? selectedCard.reversedEn : selectedCard.reversedAr}
                  </p>
                </div>
                <div className="rounded-xl p-4 border" style={{ background: 'rgba(0,0,0,0.4)', borderColor: 'rgba(251,191,36,0.25)' }}>
                  <p className="text-[10px] tracking-[0.3em] uppercase mb-2 text-amber-400">
                    {language === 'en' ? 'Keywords' : 'الكلمات المفتاحية'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(language === 'en' ? selectedCard.keywordsEn : selectedCard.keywordsAr).map((k, i) => (
                      <span key={i} className="px-3 py-1 rounded-full text-[10px] tracking-wider uppercase border"
                        style={{ borderColor: 'rgba(251,191,36,0.4)', color: '#fbbf24' }}>
                        {k}
                      </span>
                    ))}
                  </div>
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
