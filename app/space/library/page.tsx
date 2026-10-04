'use client'

import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'

/* ============================================================
   SVG ICONS
   ============================================================ */
const BookGlyph = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
    <path d="M4 5.5C4 4.7 4.7 4 5.5 4H12v15H5.5c-.8 0-1.5.7-1.5 1.5V5.5Z" stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M20 5.5c0-.8-.7-1.5-1.5-1.5H12v15h6.5c.8 0 1.5.7 1.5 1.5V5.5Z" stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M12 4v15" stroke={color} strokeWidth="0.8" opacity="0.5" />
  </svg>
)
const LaurelIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
    <path d="M12 20c-3-3-5-6-5-10a5 5 0 0 1 10 0c0 4-2 7-5 10Z" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
    <path d="M12 10v10" stroke={color} strokeWidth="1" opacity="0.6" />
    <path d="M12 12c1.5-.5 3-1 4-2M12 15c1.5-.5 3-1 4-2M12 12c-1.5-.5-3-1-4-2M12 15c-1.5-.5-3-1-4-2" stroke={color} strokeWidth="0.9" opacity="0.7" />
  </svg>
)
const MindIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
    <path d="M9 20v-2c-2.5-1-4-3.5-4-6.5C5 8 7.5 5.5 11 5.5c3 0 5.5 2 6.5 4.5l1.5.5-1 2 .5 2-2 .5v2h-2c0 1-.5 2-2 2.5V20" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
    <circle cx="10" cy="11" r="0.9" fill={color} />
  </svg>
)
const RavenIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
    <path d="M4 14c2-4 5-6 9-6 2 0 3 .5 4 1l3-3-1 3 3 1-3 1 1 2-3-1c-1 3-3 5-7 5l-2 3-1-3-3 1 2-3-2-1Z" stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
    <circle cx="15" cy="10" r="0.7" fill={color} />
  </svg>
)
const StarIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
    <path d="m12 3 2.5 6L21 11l-6 2.5L12 20l-2.5-6.5L3 11l6.5-2L12 3Z" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
)
const SpeechIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
    <path d="M4 6h16v10H9l-5 4V6Z" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
    <path d="M8 10h8M8 12.5h5" stroke={color} strokeWidth="1" opacity="0.7" />
  </svg>
)
const LeafIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
    <path d="M20 4C11 4 4 10 4 18c0 1 0 2 .5 2 8-.5 15-6 15.5-16Z" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
    <path d="M4 20c4-4 8-8 16-16" stroke={color} strokeWidth="0.8" opacity="0.6" />
  </svg>
)
const ChipIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
    <rect x="7" y="7" width="10" height="10" rx="1.5" stroke={color} strokeWidth="1.3" />
    <rect x="9.5" y="9.5" width="5" height="5" rx="0.5" stroke={color} strokeWidth="1" opacity="0.6" />
    <path d="M10 4v3M14 4v3M10 17v3M14 17v3M4 10h3M4 14h3M17 10h3M17 14h3" stroke={color} strokeWidth="1" />
  </svg>
)
const LockIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
    <rect x="5" y="11" width="14" height="9" rx="1.5" stroke={color} strokeWidth="1.3" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke={color} strokeWidth="1.3" />
    <circle cx="12" cy="15.5" r="1" fill={color} />
  </svg>
)
const BookSpineGlyph = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
    <path d="M5 4.5C5 3.7 5.7 3 6.5 3H12v17H6.5C5.7 20 5 19.3 5 18.5v-14Z" stroke={color} strokeWidth="1.1" />
    <path d="M19 4.5c0-.8-.7-1.5-1.5-1.5H12v17h5.5c.8 0 1.5-.7 1.5-1.5v-14Z" stroke={color} strokeWidth="1.1" />
    <path d="M12 3v17" stroke={color} strokeWidth="0.7" opacity="0.6" />
  </svg>
)
const ArticleIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
    <rect x="3.5" y="4" width="17" height="16" rx="1.5" stroke={color} strokeWidth="1.2" />
    <path d="M6.5 8h11M6.5 11h11M6.5 14h7M6.5 17h5" stroke={color} strokeWidth="1" strokeLinecap="round" />
  </svg>
)
const LinkedInIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
    <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" stroke={color} strokeWidth="1.5" />
    <path d="M8 10v7M8 7.2v.1M12 17v-4a2.5 2.5 0 0 1 5 0v4" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
  </svg>
)
const CompassIcon = ({ color, size = 32 }: { color: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.2" />
    <path d="m8 16 4-8 4 8-4-2-4 2Z" stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
)
const CloseIcon = ({ color = '#8c826e' }: { color?: string }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
    <path d="M6 6l12 12M18 6 6 18" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)
const InfoIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.3" />
    <path d="M12 8v.01M11 12h1v5h1" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const AmazonIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
    <path d="M3 14c4.5 3.5 11 3.5 18 0" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M18 13v3l3-1.5-3-1.5Z" fill={color} />
    <path d="M7 7h10v6H7z" stroke={color} strokeWidth="1.2" />
  </svg>
)
const SparkleIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
    <path d="M12 2l1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5L12 2Z" stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M19 17l.7 2.8L22.5 20l-2.8.7L19 23.5l-.7-2.8L15.5 20l2.8-.7L19 17Z" fill={color} opacity="0.6" />
  </svg>
)

/* ============================================================
   DATA
   ============================================================ */
interface Book {
  id: string
  nameEn: string
  nameAr: string
  authorEn: string
  descriptionEn: string
  descriptionAr: string
  isLocked?: boolean
  subcategory?: string
}

/* ---------- PHILOSOPHY ---------- */
const philosophyShelf: Book[] = [
  { id: 'the-republic', nameEn: 'The Republic', nameAr: 'الجمهورية', authorEn: 'Plato', subcategory: 'core', descriptionEn: 'Justice, the ideal state, and the nature of the soul.', descriptionAr: 'العدالة، الدولة المثالية، وطبيعة الروح.' },
  { id: 'apology', nameEn: 'Apology', nameAr: 'الدفاع', authorEn: 'Plato', subcategory: 'core', descriptionEn: 'Socrates\' defense at his trial — philosophy as a way of life.', descriptionAr: 'دفاع سقراط في محاكمته — الفلسفة كطريقة حياة.' },
  { id: 'meditations', nameEn: 'Meditations', nameAr: 'التأملات', authorEn: 'Marcus Aurelius', subcategory: 'core', descriptionEn: 'Private stoic internal framework metrics.', descriptionAr: 'مقاييس الأطر الداخلية للرواقية الشخصية.' },
  { id: 'the-courage-to-be', nameEn: 'The Courage to Be', nameAr: 'الشجاعة من أجل الكينونة', authorEn: 'Paul Tillich', subcategory: 'core', descriptionEn: 'Analysis of anxiety and courage structures.', descriptionAr: 'تحليل بنيات القلق والشجاعة.' },
  { id: 'the-myth-of-sisyphus', nameEn: 'The Myth of Sisyphus', nameAr: 'أسطورة سيزيف', authorEn: 'Albert Camus', subcategory: 'core', descriptionEn: 'Crucial existential thoughts on the absurd.', descriptionAr: 'أفكار وجودية حاسمة حول العبثية.' },
  { id: 'the-stranger', nameEn: 'The Stranger', nameAr: 'الغريب', authorEn: 'Albert Camus', subcategory: 'core', descriptionEn: 'A portrait of absolute detachment and social isolation.', descriptionAr: 'صورة للانفصال المطلق والعزلة الاجتماعية.' },
  { id: 'being-and-time', nameEn: 'Being and Time', nameAr: 'الكينونة والزمان', authorEn: 'Martin Heidegger', subcategory: 'core', descriptionEn: 'The fundamental question of Being.', descriptionAr: 'السؤال الأساسي للكينونة.' },
  { id: 'the-second-sex', nameEn: 'The Second Sex', nameAr: 'الجنس الآخر', authorEn: 'Simone de Beauvoir', subcategory: 'core', descriptionEn: 'Foundational text of existential feminism.', descriptionAr: 'النص التأسيسي للنسوية الوجودية.' },

  { id: 'corpus-hermeticum', nameEn: 'The Corpus Hermeticum', nameAr: 'المتن الهرمسي', authorEn: 'Hermes Trismegistus', subcategory: 'hermetic', descriptionEn: 'The foundational Hermetic texts on the divine mind and cosmos.', descriptionAr: 'النصوص الهرمسية التأسيسية عن العقل الإلهي والكون.' },
  { id: 'emerald-tablet', nameEn: 'The Emerald Tablet', nameAr: 'اللوح الزمردي', authorEn: 'Hermes Trismegistus', subcategory: 'hermetic', descriptionEn: 'The most famous Hermetic text — "As above, so below."', descriptionAr: 'أشهر النصوص الهرمسية — "كما في الأعلى، كذلك في الأسفل".' },
  { id: 'the-kybalion', nameEn: 'The Kybalion', nameAr: 'الكيباليون', authorEn: 'Three Initiates', subcategory: 'hermetic', descriptionEn: 'The seven Hermetic principles (1908).', descriptionAr: 'المبادئ الهرمسية السبعة (1908).' },
  { id: 'secret-teachings', nameEn: 'The Secret Teachings of All Ages', nameAr: 'التعاليم السرية لكل العصور', authorEn: 'Manly P. Hall', subcategory: 'hermetic', descriptionEn: 'Encyclopedic survey of esoteric symbolism.', descriptionAr: 'مسح موسوعي للرمزية الباطنية.' },
  { id: 'egyptian-hermes', nameEn: 'The Egyptian Hermes', nameAr: 'هرمس المصري', authorEn: 'Garth Fowden', subcategory: 'hermetic', descriptionEn: 'Historical study of the Hermetic tradition in Egypt.', descriptionAr: 'دراسة تاريخية للتقاليد الهرمسية في مصر.' },

  { id: 'being-and-nothingness', nameEn: 'Being and Nothingness', nameAr: 'الكينونة والعدم', authorEn: 'Jean-Paul Sartre', subcategory: 'existential', descriptionEn: 'The foundational text of French existentialism.', descriptionAr: 'النص التأسيسي للوجودية الفرنسية.' },
  { id: 'fear-and-trembling', nameEn: 'Fear and Trembling', nameAr: 'الخوف والارتجاف', authorEn: 'Søren Kierkegaard', subcategory: 'existential', descriptionEn: 'Faith, sacrifice, and the absurd.', descriptionAr: 'الإيمان والتضحية والعبث.' },
  { id: 'zarathustra', nameEn: 'Thus Spoke Zarathustra', nameAr: 'هكذا تكلم زرادشت', authorEn: 'Friedrich Nietzsche', subcategory: 'existential', descriptionEn: 'The Übermensch, eternal recurrence, and the death of God.', descriptionAr: 'الإنسان الأعلى، العودة الأبدية، وموت الإله.' },
  { id: 'beyond-good-and-evil', nameEn: 'Beyond Good and Evil', nameAr: 'ما وراء الخير والشر', authorEn: 'Friedrich Nietzsche', subcategory: 'existential', descriptionEn: 'A prelude to a philosophy of the future.', descriptionAr: 'مقدمة لفلسفة المستقبل.' },
  { id: 'genealogy-of-morality', nameEn: 'On the Genealogy of Morality', nameAr: 'في نسب الأخلاق', authorEn: 'Friedrich Nietzsche', subcategory: 'existential', descriptionEn: 'A genealogical investigation of moral values.', descriptionAr: 'تحقيق نسبي في القيم الأخلاقية.' },
  { id: 'the-gay-science', nameEn: 'The Gay Science', nameAr: 'العلم المرح', authorEn: 'Friedrich Nietzsche', subcategory: 'existential', descriptionEn: '"God is dead" and the joyful wisdom.', descriptionAr: '"الإله ميت" والحكمة المرحة.' },
  { id: 'trouble-with-being-born', nameEn: 'The Trouble with Being Born', nameAr: 'مشكلة أن نُولد', authorEn: 'Emil Cioran', subcategory: 'existential', descriptionEn: 'Aphorisms on existence, suffering, and non-birth.', descriptionAr: 'أمثال عن الوجود والمعاناة وعدم الولادة.' },

  { id: 'letters-from-a-stoic', nameEn: 'Letters from a Stoic', nameAr: 'رسائل من رواقي', authorEn: 'Seneca', subcategory: 'stoic', descriptionEn: 'Timeless letters detailing life and deliberate virtue.', descriptionAr: 'رسائل خالدة توضح تفاصيل الحياة والفضيلة المتعمدة.' },
  { id: 'on-the-shortness-of-life', nameEn: 'On the Shortness of Life', nameAr: 'في قصر الحياة', authorEn: 'Seneca', subcategory: 'stoic', descriptionEn: 'On the wise use of time.', descriptionAr: 'في الاستخدام الحكيم للوقت.' },
  { id: 'discourses', nameEn: 'Discourses', nameAr: 'المحاورات', authorEn: 'Epictetus', subcategory: 'stoic', descriptionEn: 'The philosopher\'s core teachings.', descriptionAr: 'التعاليم الأساسية للفيلسوف.' },
  { id: 'enchiridion', nameEn: 'Enchiridion (The Handbook)', nameAr: 'الكتيب', authorEn: 'Epictetus', subcategory: 'stoic', descriptionEn: 'A concise manual of Stoic practice.', descriptionAr: 'دليل موجز للممارسة الرواقية.' },
  { id: 'the-daily-stoic', nameEn: 'The Daily Stoic', nameAr: 'الرواقي اليومي', authorEn: 'Ryan Holiday & Stephen Hanselman', subcategory: 'stoic', descriptionEn: '366 meditations on wisdom and virtue.', descriptionAr: '366 تأملاً في الحكمة والفضيلة.' },
  { id: 'the-inner-citadel', nameEn: 'The Inner Citadel', nameAr: 'القلعة الداخلية', authorEn: 'Pierre Hadot', subcategory: 'stoic', descriptionEn: 'The Meditations of Marcus Aurelius as spiritual practice.', descriptionAr: 'تأملات ماركوس أوريليوس كممارسة روحية.' },

  { id: 'archetypes-collective', nameEn: 'The Archetypes and the Collective Unconscious', nameAr: 'النماذج الأصلية واللاوعي الجمعي', authorEn: 'Carl Jung', subcategory: 'shadow', descriptionEn: 'Jung\'s core work on archetypes.', descriptionAr: 'عمل يونغ الأساسي عن النماذج الأصلية.' },
  { id: 'the-red-book', nameEn: 'The Red Book', nameAr: 'الكتاب الأحمر', authorEn: 'Carl Jung', subcategory: 'shadow', descriptionEn: 'Jung\'s personal visionary journals.', descriptionAr: 'مذكرات يونغ الرؤيوية الشخصية.' },
  { id: 'psychology-and-alchemy', nameEn: 'Psychology and Alchemy', nameAr: 'علم النفس والخيمياء', authorEn: 'Carl Jung', subcategory: 'shadow', descriptionEn: 'Alchemy as a psychological process.', descriptionAr: 'الخيمياء كعملية نفسية.' },
  { id: 'symbols-of-transformation', nameEn: 'Symbols of Transformation', nameAr: 'رموز التحول', authorEn: 'Carl Jung', subcategory: 'shadow', descriptionEn: 'The symbol of the hero and the unconscious.', descriptionAr: 'رمز البطل واللاوعي.' },

  { id: 'conscious-mind', nameEn: 'The Conscious Mind', nameAr: 'العقل الواعي', authorEn: 'David J. Chalmers', subcategory: 'consciousness', descriptionEn: 'In search of a fundamental theory of consciousness.', descriptionAr: 'بحثاً عن نظرية أساسية للوعي.' },
  { id: 'godel-escher-bach', nameEn: 'Gödel, Escher, Bach', nameAr: 'غودل، إيشر، باخ', authorEn: 'Douglas Hofstadter', subcategory: 'consciousness', descriptionEn: 'An eternal golden braid of minds and machines.', descriptionAr: 'ضفيرة ذهبية أبدية للعقول والآلات.' },
  { id: 'consciousness-explained', nameEn: 'Consciousness Explained', nameAr: 'شرح الوعي', authorEn: 'Daniel C. Dennett', subcategory: 'consciousness', descriptionEn: 'A materialist account of consciousness.', descriptionAr: 'تفسير مادي للوعي.' },
  { id: 'being-you', nameEn: 'Being You', nameAr: 'كونك أنت', authorEn: 'Anil Seth', subcategory: 'consciousness', descriptionEn: 'A new science of consciousness.', descriptionAr: 'علم جديد للوعي.' },

  { id: 'memories-dreams', nameEn: 'Memories, Dreams, Reflections', nameAr: 'ذكريات، أحلام، تأملات', authorEn: 'Carl Jung', subcategory: 'psychology', descriptionEn: 'Jung\'s autobiography.', descriptionAr: 'سيرة يونغ الذاتية.' },
  { id: 'modern-man-search', nameEn: 'Modern Man in Search of a Soul', nameAr: 'الإنسان الحديث بحثاً عن روح', authorEn: 'Carl Jung', subcategory: 'psychology', descriptionEn: 'Jung on the spiritual crisis of modernity.', descriptionAr: 'يونغ عن الأزمة الروحية للحداثة.' },
  { id: 'varieties-of-religious-experience', nameEn: 'The Varieties of Religious Experience', nameAr: 'أشكال الخبرة الدينية', authorEn: 'William James', subcategory: 'psychology', descriptionEn: 'A study in human nature.', descriptionAr: 'دراسة في الطبيعة البشرية.' },

  { id: 'hero-thousand-faces', nameEn: 'The Hero with a Thousand Faces', nameAr: 'البطل بألف وجه', authorEn: 'Joseph Campbell', subcategory: 'mythology-symbolism', descriptionEn: 'Comparative mythology and the Hero\'s Journey.', descriptionAr: 'الأساطير المقارنة ورحلة البطل.' },
  { id: 'power-of-myth', nameEn: 'The Power of Myth', nameAr: 'قوة الأسطورة', authorEn: 'Campbell & Moyers', subcategory: 'mythology-symbolism', descriptionEn: 'Myth, symbolism and human experience.', descriptionAr: 'الأسطورة والرمزية والتجربة الإنسانية.' },

  { id: 'sapiens', nameEn: 'Sapiens', nameAr: 'العاقل', authorEn: 'Yuval Noah Harari', subcategory: 'humanity', descriptionEn: 'A brief history of humankind.', descriptionAr: 'تاريخ موجز للبشرية.' },
  { id: 'selfish-gene', nameEn: 'The Selfish Gene', nameAr: 'الجين الأناني', authorEn: 'Richard Dawkins', subcategory: 'humanity', descriptionEn: 'Evolution from the gene\'s perspective.', descriptionAr: 'التطور من منظور الجين.' },
  { id: 'civilization-discontents', nameEn: 'Civilization and Its Discontents', nameAr: 'الحضارة وسخطها', authorEn: 'Sigmund Freud', subcategory: 'humanity', descriptionEn: 'The tension between civilization and instinct.', descriptionAr: 'التوتر بين الحضارة والغريزة.' },

  { id: 'doors-of-perception', nameEn: 'The Doors of Perception', nameAr: 'أبواب الإدراك', authorEn: 'Aldous Huxley', subcategory: 'existence', descriptionEn: 'On visionary experience and consciousness.', descriptionAr: 'في التجربة الرؤيوية والوعي.' },
  { id: 'order-of-time', nameEn: 'The Order of Time', nameAr: 'نظام الزمن', authorEn: 'Carlo Rovelli', subcategory: 'existence', descriptionEn: 'Physics and the nature of time.', descriptionAr: 'الفيزياء وطبيعة الزمن.' },
]

const psychologyShelf: Book[] = [
  { id: 'the-laws-of-human-nature', nameEn: 'The Laws of Human Nature', nameAr: 'قوانين الطبيعة البشرية', authorEn: 'Robert Greene', descriptionEn: 'Codes analyzing hidden human drivers.', descriptionAr: 'رموز تحلل الدوافع الخفية.' },
  { id: 'surrounded-by-idiots', nameEn: 'Surrounded by Idiots', nameAr: 'محاط بالحمقى', authorEn: 'Thomas Erikson', descriptionEn: 'Color system for relational analysis.', descriptionAr: 'نظام الألوان للتحليل السلوكي.' },
  { id: 'power', nameEn: 'The 48 Laws of Power', nameAr: '48 قانونًا للقوة', authorEn: 'Robert Greene', descriptionEn: 'Tactical parameters for social control.', descriptionAr: 'معالم تكتيكية للسيطرة الاجتماعية.' },
  { id: 'thinking-fast-and-slow', nameEn: 'Thinking, Fast and Slow', nameAr: 'التفكير السريع والبطيء', authorEn: 'Daniel Kahneman', descriptionEn: 'Dual cognitive processing profiles.', descriptionAr: 'ملفات المعالجة الإدراكية المزدوجة.' },
  { id: 'the-prince', nameEn: 'The Prince', nameAr: 'الأمير', authorEn: 'Machiavelli', descriptionEn: 'Foundational realism governing rule.', descriptionAr: 'الواقعية الأساسية التي تحكم الحكم.' },
  { id: 'criminal-psychology', nameEn: 'Criminal Psychology', nameAr: 'علم النفس الجنائي', authorEn: 'Francis Parker', descriptionEn: 'Forensic metrics of deviant patterns.', descriptionAr: 'مقاييس جنائية للأنماط المنحرفة.' },
]

const gothicShelf: Book[] = [
  { id: 'the-tell-tale-heart', nameEn: 'The Tell-Tale Heart', nameAr: 'القلب الوشي', authorEn: 'Edgar Allan Poe', descriptionEn: 'Metrics of guilt and paranoia.', descriptionAr: 'مقاييس الذنب والبارانويا.' },
  { id: 'the-black-cat', nameEn: 'The Black Cat', nameAr: 'القط الأسود', authorEn: 'Edgar Allan Poe', descriptionEn: 'Analysis of domestic malice and dark omens.', descriptionAr: 'تحليل الخبث المنزلي والنذر.' },
  { id: 'the-fall-of-the-house-of-usher', nameEn: 'Fall of the House of Usher', nameAr: 'سقوط بيت آشر', authorEn: 'Edgar Allan Poe', descriptionEn: 'Structural decay of sanity and lineage.', descriptionAr: 'التدهور الهيكلي للسلامة والسلالة.' },
  { id: 'frankenstein', nameEn: 'Frankenstein', nameAr: 'فرانكنشتاين', authorEn: 'Mary Shelley', descriptionEn: 'Hubris of creation and isolation.', descriptionAr: 'غطرسة الخلق والعزلة.' },
  { id: 'dracula', nameEn: 'Dracula', nameAr: 'دراكولا', authorEn: 'Bram Stoker', descriptionEn: 'Tracking vampiric migration layers.', descriptionAr: 'تتبع طبقات هجرة مصاصي الدماء.' },
  { id: 'dr-jekyll-mr-hyde', nameEn: 'Dr. Jekyll & Mr. Hyde', nameAr: 'د. جيكل والسيد هايد', authorEn: 'R. L. Stevenson', descriptionEn: 'The split profile of duality.', descriptionAr: 'الملف المنقسم للثنائية.' },
  { id: 'the-picture-of-dorian-gray', nameEn: 'The Picture of Dorian Gray', nameAr: 'صورة دوريان غراي', authorEn: 'Oscar Wilde', descriptionEn: 'A portrait absorbing internal sins.', descriptionAr: 'لوحة تمتص الخطايا.' },
  { id: 'the-haunting-of-hill-house', nameEn: 'The Haunting of Hill House', nameAr: 'رعب منزل هيل', authorEn: 'Shirley Jackson', descriptionEn: 'Psychogeographical mapping of dread.', descriptionAr: 'رسم نفسي وجغرافي للرعب.' },
]

const mythologyShelf: Book[] = [
  { id: 'theogony', nameEn: 'Theogony', nameAr: 'ثيوغونيا', authorEn: 'Hesiod', descriptionEn: 'Origins and genealogy of the Greek gods.', descriptionAr: 'أصول وأنساب الآلهة اليونانية.' },
  { id: 'the-iliad', nameEn: 'The Iliad', nameAr: 'الإلياذة', authorEn: 'Homer', descriptionEn: 'Greek heroic mythology and the Trojan War.', descriptionAr: 'الأسطورة البطولية اليونانية وحرب طروادة.' },
  { id: 'the-odyssey', nameEn: 'The Odyssey', nameAr: 'الأوديسة', authorEn: 'Homer', descriptionEn: 'Journey, transformation, gods and fate.', descriptionAr: 'الرحلة، التحول، الآلهة والقدر.' },
  { id: 'metamorphoses', nameEn: 'Metamorphoses', nameAr: 'التحولات', authorEn: 'Ovid', descriptionEn: 'One of the great surviving collections of Greco-Roman myths.', descriptionAr: 'من أعظم المجموعات الباقية من الأساطير اليونانية الرومانية.' },
  { id: 'mythology-hamilton', nameEn: 'Mythology', nameAr: 'الأساطير', authorEn: 'Edith Hamilton', descriptionEn: 'Accessible overview of Greek, Roman and Norse mythology.', descriptionAr: 'نظرة عامة على الأساطير اليونانية والرومانية والنوردية.' },
  { id: 'norse-mythology-gaiman', nameEn: 'Norse Mythology', nameAr: 'الأساطير النوردية', authorEn: 'Neil Gaiman', descriptionEn: 'Modern retelling of Norse myths.', descriptionAr: 'إعادة سرد حديثة للأساطير النوردية.' },
  { id: 'poetic-edda', nameEn: 'Poetic Edda', nameAr: 'الإيدا الشعرية', authorEn: 'Anonymous (Norse)', descriptionEn: 'Primary source of Norse mythological poems.', descriptionAr: 'المصدر الأساسي للقصائد الأسطورية النوردية.' },
  { id: 'prose-edda', nameEn: 'Prose Edda', nameAr: 'الإدا النثرية', authorEn: 'Snorri Sturluson', descriptionEn: 'Medieval compilation of Norse mythology.', descriptionAr: 'تجميع قروسطي للأساطير النوردية.' },
  { id: 'epic-of-gilgamesh', nameEn: 'The Epic of Gilgamesh', nameAr: 'ملحمة جلجامش', authorEn: 'Anonymous (Mesopotamian)', descriptionEn: 'One of the oldest surviving epic poems.', descriptionAr: 'من أقدم القصائد الملحمية الباقية.' },
]

const linguisticsShelf: Book[] = [
  { id: 'intro-to-language', nameEn: 'An Introduction to Language', nameAr: 'مقدمة في اللغة', authorEn: 'Fromkin, Rodman & Hyams', descriptionEn: 'Foundational undergraduate linguistics text.', descriptionAr: 'نص أساسي في اللسانيات للطلاب الجامعيين.' },
  { id: 'language-files', nameEn: 'Language Files', nameAr: 'ملفات اللغة', authorEn: 'Ohio State University', descriptionEn: 'Comprehensive introductory linguistics workbook.', descriptionAr: 'كتاب تدريبي شامل في اللسانيات التمهيدية.' },
  { id: 'cambridge-encyclopedia', nameEn: 'The Cambridge Encyclopedia of Language', nameAr: 'موسوعة كامبريدج للغة', authorEn: 'David Crystal', descriptionEn: 'Encyclopedic overview of world languages.', descriptionAr: 'نظرة موسوعية للغات العالم.' },
  { id: 'course-in-phonetics', nameEn: 'A Course in Phonetics', nameAr: 'دورة في الصوتيات', authorEn: 'Peter Ladefoged & Keith Johnson', descriptionEn: 'The standard textbook on phonetic science.', descriptionAr: 'الكتاب المعياري في علم الصوتيات.' },
  { id: 'understanding-syntax', nameEn: 'Understanding Syntax', nameAr: 'فهم النحو', authorEn: 'Maggie Tallerman', descriptionEn: 'Cross-linguistic introduction to syntax.', descriptionAr: 'مقدمة عبر لغوية إلى النحو.' },
  { id: 'semantics-saeed', nameEn: 'Semantics', nameAr: 'علم الدلالة', authorEn: 'John I. Saeed', descriptionEn: 'Introduction to meaning in language.', descriptionAr: 'مقدمة في المعنى في اللغة.' },
  { id: 'pragmatics-yule', nameEn: 'Pragmatics', nameAr: 'التداولية', authorEn: 'George Yule', descriptionEn: 'Study of language use in context.', descriptionAr: 'دراسة استخدام اللغة في السياق.' },
  { id: 'language-myths', nameEn: 'Language Myths', nameAr: 'أساطير اللغة', authorEn: 'Laurie Bauer & Peter Trudgill', descriptionEn: 'Debunking common beliefs about language.', descriptionAr: 'دحض المعتقدات الشائعة حول اللغة.' },
  { id: 'because-internet', nameEn: 'Because Internet', nameAr: 'لأن الإنترنت', authorEn: 'Gretchen McCulloch', descriptionEn: 'How the internet is transforming language.', descriptionAr: 'كيف يحول الإنترنت اللغة.' },
]

const astronomyShelf: Book[] = [
  { id: 'cosmos-sagan', nameEn: 'Cosmos', nameAr: 'الكون', authorEn: 'Carl Sagan', descriptionEn: 'A landmark journey through the universe.', descriptionAr: 'رحلة بارزة عبر الكون.' },
  { id: 'brief-history-time', nameEn: 'A Brief History of Time', nameAr: 'تاريخ موجز للزمن', authorEn: 'Stephen Hawking', descriptionEn: 'From the Big Bang to black holes.', descriptionAr: 'من الانفجار العظيم إلى الثقوب السوداء.' },
  { id: 'pale-blue-dot', nameEn: 'Pale Blue Dot', nameAr: 'النقطة الزرقاء الباهتة', authorEn: 'Carl Sagan', descriptionEn: 'Humanity\'s place in the cosmos.', descriptionAr: 'مكانة البشرية في الكون.' },
  { id: 'nightwatch', nameEn: 'NightWatch', nameAr: 'مراقبة الليل', authorEn: 'Terence Dickinson', descriptionEn: 'The practical guide to amateur astronomy.', descriptionAr: 'الدليل العملي لعلم الفلك للهواة.' },
  { id: 'astrophysics-hurry', nameEn: 'Astrophysics for People in a Hurry', nameAr: 'الفيزياء الفلكية للمتعجلين', authorEn: 'Neil deGrasse Tyson', descriptionEn: 'Brief but complete picture of the universe.', descriptionAr: 'صورة موجزة لكن كاملة للكون.' },
  { id: 'black-holes-time-warps', nameEn: 'Black Holes and Time Warps', nameAr: 'الثقوب السوداء وانحناء الزمن', authorEn: 'Kip Thorne', descriptionEn: 'Einstein\'s legacy and modern physics.', descriptionAr: 'إرث أينشتاين والفيزياء الحديثة.' },
  { id: 'fabric-of-cosmos', nameEn: 'The Fabric of the Cosmos', nameAr: 'نسيج الكون', authorEn: 'Brian Greene', descriptionEn: 'Space, time, and the texture of reality.', descriptionAr: 'الفضاء والزمن ونسيج الواقع.' },
  { id: 'planets-sobel', nameEn: 'The Planets', nameAr: 'الكواكب', authorEn: 'Dava Sobel', descriptionEn: 'A literary journey through the solar system.', descriptionAr: 'رحلة أدبية عبر المجموعة الشمسية.' },
]

const technologyShelf: Book[] = [
  { id: 'evolution-of-technology', nameEn: 'The Evolution of Technology', nameAr: 'تطور التكنولوجيا', authorEn: 'George Basalla', descriptionEn: 'How technological innovation evolves.', descriptionAr: 'كيف يتطور الابتكار التكنولوجي.' },
  { id: 'victorian-internet', nameEn: 'The Victorian Internet', nameAr: 'إنترنت العصر الفيكتوري', authorEn: 'Tom Standage', descriptionEn: 'The telegraph and the first global network.', descriptionAr: 'التلغراف وأول شبكة عالمية.' },
  { id: 'the-information', nameEn: 'The Information', nameAr: 'المعلومة', authorEn: 'James Gleick', descriptionEn: 'A history, a theory, a flood.', descriptionAr: 'تاريخ، نظرية، طوفان.' },
  { id: 'the-innovators', nameEn: 'The Innovators', nameAr: 'المبتكرون', authorEn: 'Walter Isaacson', descriptionEn: 'How a group of hackers created the digital revolution.', descriptionAr: 'كيف أنشأت مجموعة من الهاكرز الثورة الرقمية.' },
  { id: 'code-petzold', nameEn: 'Code', nameAr: 'الكود', authorEn: 'Charles Petzold', descriptionEn: 'The hidden language of computer hardware and software.', descriptionAr: 'اللغة الخفية لأجهزة وبرمجيات الحاسوب.' },
  { id: 'modern-approach-ai', nameEn: 'Artificial Intelligence: A Modern Approach', nameAr: 'الذكاء الاصطناعي: مقاربة حديثة', authorEn: 'Russell & Norvig', descriptionEn: 'The standard AI textbook.', descriptionAr: 'الكتاب المعياري للذكاء الاصطناعي.' },
  { id: 'superintelligence', nameEn: 'Superintelligence', nameAr: 'الذكاء الفائق', authorEn: 'Nick Bostrom', descriptionEn: 'Paths, dangers, strategies for superintelligent AI.', descriptionAr: 'مسارات ومخاطر واستراتيجيات الذكاء الفائق.' },
  { id: 'life-3-0', nameEn: 'Life 3.0', nameAr: 'الحياة 3.0', authorEn: 'Max Tegmark', descriptionEn: 'Being human in the age of AI.', descriptionAr: 'أن تكون إنساناً في عصر الذكاء الاصطناعي.' },
]

const astrobiologyShelf: Book[] = [
  { id: 'astrobiology-cockell', nameEn: 'Astrobiology: An Introduction', nameAr: 'علم الأحياء الفلكي: مقدمة', authorEn: 'Charles S. Cockell', descriptionEn: 'From the nature of life to the search for ETI.', descriptionAr: 'من طبيعة الحياة إلى البحث عن ذكاء خارج الأرض.' },
  { id: 'intro-astrobiology-rothery', nameEn: 'An Introduction to Astrobiology', nameAr: 'مقدمة في علم الأحياء الفلكي', authorEn: 'Rothery, Gilmour & Sephton', descriptionEn: 'Origin of life and habitable environments.', descriptionAr: 'أصل الحياة والبيئات الصالحة للسكن.' },
  { id: 'life-in-universe', nameEn: 'Life in the Universe', nameAr: 'الحياة في الكون', authorEn: 'Bennett, Shostak, Schneider', descriptionEn: 'Introductory astrobiology and the question of life beyond Earth.', descriptionAr: 'علم الأحياء الفلكي التمهيدي وسؤال الحياة خارج الأرض.' },
  { id: 'vital-question', nameEn: 'The Vital Question', nameAr: 'السؤال الحيوي', authorEn: 'Nick Lane', descriptionEn: 'Why is life the way it is?', descriptionAr: 'لماذا الحياة كما هي؟' },
  { id: 'eerie-silence', nameEn: 'The Eerie Silence', nameAr: 'الصمت المخيف', authorEn: 'Paul Davies', descriptionEn: 'Renewing our search for alien intelligence.', descriptionAr: 'تجديد بحثنا عن ذكاء خارج الأرض.' },
  { id: 'rare-earth', nameEn: 'Rare Earth', nameAr: 'الأرض النادرة', authorEn: 'Ward & Brownlee', descriptionEn: 'Why complex life is uncommon in the universe.', descriptionAr: 'لماذا الحياة المعقدة نادرة في الكون.' },
  { id: 'case-for-mars', nameEn: 'The Case for Mars', nameAr: 'الحجة من أجل المريخ', authorEn: 'Robert Zubrin', descriptionEn: 'The plan to settle the red planet.', descriptionAr: 'خطة لاستيطان الكوكب الأحمر.' },
  { id: 'exoplanet-handbook', nameEn: 'The Exoplanet Handbook', nameAr: 'دليل الكواكب الخارجية', authorEn: 'Michael Perryman', descriptionEn: 'Comprehensive reference on exoplanets.', descriptionAr: 'مرجع شامل عن الكواكب الخارجية.' },
]

const philosophySubcategories = [
  { id: 'core',                labelEn: 'Core Philosophy',      labelAr: 'الفلسفة الأساسية',    color: '#d4af6a' },
  { id: 'hermetic',            labelEn: 'Hermeticism',         labelAr: 'الهرمسية',           color: '#fbbf24' },
  { id: 'existential',         labelEn: 'Existentialism',      labelAr: 'الوجودية',           color: '#c084fc' },
  { id: 'stoic',               labelEn: 'Stoicism',            labelAr: 'الرواقية',           color: '#60a5fa' },
  { id: 'shadow',              labelEn: 'Shadow Work',         labelAr: 'عمل الظل',           color: '#a855f7' },
  { id: 'consciousness',       labelEn: 'Consciousness',       labelAr: 'الوعي',              color: '#34d399' },
  { id: 'psychology',          labelEn: 'Psychology',          labelAr: 'علم النفس',          color: '#f0abfc' },
  { id: 'mythology-symbolism', labelEn: 'Myth & Symbolism',    labelAr: 'الأسطورة والرمزية',  color: '#f472b6' },
  { id: 'humanity',            labelEn: 'Humanity',            labelAr: 'الإنسانية',          color: '#e7d5a5' },
  { id: 'existence',           labelEn: 'Existence & Death',   labelAr: 'الوجود والموت',      color: '#7c3aed' },
]

/* ============================================================
   PAGE
   ============================================================ */
export default function LibraryPage() {
  const router = useRouter()
  const { language, toggleLanguage } = useLanguage()
  const [view, setView] = useState<'hub' | 'shelves'>('hub')
  const [activeShelf, setActiveShelf] = useState('philosophy')
  const [activeSubcategory, setActiveSubcategory] = useState('core')
  const [bookNotice, setBookNotice] = useState<Book | null>(null)
  const [showLilithBooks, setShowLilithBooks] = useState(false)
  const [showArticles, setShowArticles] = useState(false)
  const [showBookBanner, setShowBookBanner] = useState(true)

  const shelves = {
    philosophy:  { books: philosophyShelf  as Book[], Icon: LaurelIcon, color: '#d4af6a', themeBorder: 'rgba(212, 175, 106, 0.25)', themeBg: 'linear-gradient(160deg, rgba(35, 21, 13, 0.7), rgba(20, 11, 6, 0.85))' },
    psychology:  { books: psychologyShelf  as Book[], Icon: MindIcon,   color: '#8ea7d4', themeBorder: 'rgba(142, 167, 212, 0.25)', themeBg: 'linear-gradient(160deg, rgba(26, 28, 35, 0.7), rgba(14, 16, 20, 0.85))' },
    gothic:      { books: gothicShelf      as Book[], Icon: RavenIcon,  color: '#c090e0', themeBorder: 'rgba(192, 144, 224, 0.25)', themeBg: 'linear-gradient(160deg, rgba(24, 17, 30, 0.7), rgba(11, 7, 15, 0.85))' },
    mythology:   { books: mythologyShelf   as Book[], Icon: StarIcon,   color: '#f0a6c8', themeBorder: 'rgba(240, 166, 200, 0.25)', themeBg: 'linear-gradient(160deg, rgba(30, 15, 25, 0.7), rgba(15, 6, 12, 0.85))' },
    linguistics: { books: linguisticsShelf as Book[], Icon: SpeechIcon, color: '#a5b4fc', themeBorder: 'rgba(165, 180, 252, 0.25)', themeBg: 'linear-gradient(160deg, rgba(30, 27, 75, 0.7), rgba(15, 23, 42, 0.85))' },
    astronomy:   { books: astronomyShelf   as Book[], Icon: StarIcon,   color: '#7cc7f0', themeBorder: 'rgba(124, 199, 240, 0.25)', themeBg: 'linear-gradient(160deg, rgba(10, 17, 40, 0.7), rgba(2, 6, 23, 0.85))' },
    technology:  { books: technologyShelf  as Book[], Icon: ChipIcon,   color: '#cbd5e1', themeBorder: 'rgba(203, 213, 225, 0.25)', themeBg: 'linear-gradient(160deg, rgba(17, 24, 39, 0.7), rgba(3, 7, 18, 0.85))' },
    astrobiology:{ books: astrobiologyShelf as Book[], Icon: LeafIcon,  color: '#6ee7b7', themeBorder: 'rgba(110, 231, 183, 0.25)', themeBg: 'linear-gradient(160deg, rgba(6, 78, 59, 0.7), rgba(2, 44, 34, 0.85))' },
  }

  type ShelfKey = keyof typeof shelves
  const current = shelves[activeShelf as ShelfKey]

  const shelfTabs: { key: ShelfKey; labelEn: string; labelAr: string }[] = [
    { key: 'philosophy',  labelEn: 'Philosophy',  labelAr: 'الفلسفة' },
    { key: 'psychology',  labelEn: 'Psychology',  labelAr: 'علم النفس' },
    { key: 'gothic',      labelEn: 'Gothic & Poe',labelAr: 'القوطي وبو' },
    { key: 'mythology',   labelEn: 'Mythology',   labelAr: 'الأساطير' },
    { key: 'linguistics', labelEn: 'Linguistics', labelAr: 'اللسانيات' },
    { key: 'astronomy',   labelEn: 'Astronomy',   labelAr: 'علم الفلك' },
    { key: 'technology',  labelEn: 'Technology',  labelAr: 'التكنولوجيا' },
    { key: 'astrobiology',labelEn: 'Astrobiology',labelAr: 'الأحياء الفلكي' },
  ]

  const currentBooks: Book[] = activeShelf === 'philosophy'
    ? current.books.filter((b: Book) => b.subcategory === activeSubcategory)
    : current.books

  const hubCards = [
    { key: 'shelves', Icon: CompassIcon, color: '#d4af6a', titleEn: 'Library Space', titleAr: 'فضاء المكتبة', descEn: 'Explore the deep shelves — philosophy, mythology, linguistics, astronomy, and more.', descAr: 'استكشف الأرفف العميقة — الفلسفة، الأساطير، اللسانيات، علم الفلك، وأكثر.', cta: { en: 'Enter the Shelves', ar: 'ادخل إلى الأرفف' }, action: () => setView('shelves') },
    { key: 'lilith-books', Icon: BookGlyph, color: '#e6ca95', titleEn: "Lilith's Books", titleAr: 'كتب ليليث', descEn: "Original manuscripts written by Lilith. Currently in progress — arriving soon.", descAr: 'مخطوطات أصلية بقلم ليليث. قيد الإعداد — قريباً.', cta: { en: 'Coming Soon', ar: 'قريباً' }, action: () => setShowLilithBooks(true) },
    { key: 'articles', Icon: ArticleIcon, color: '#7caeff', titleEn: 'Articles', titleAr: 'المقالات', descEn: 'Deeper thoughts and long-form writing, published on LinkedIn.', descAr: 'أفكار أعمق وكتابات مطوّلة، منشورة على لينكد إن.', cta: { en: 'Read on LinkedIn', ar: 'اقرأ على لينكد إن' }, action: () => setShowArticles(true) },
  ]

  return (
    <div className="min-h-screen bg-[#070913] text-[#f4efe2] overflow-hidden relative selection:bg-[#b89047]/30 selection:text-[#f4efe2]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(35,21,13,0.28),transparent_70%)] pointer-events-none" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-6 flex justify-between items-center">
        <motion.button
          onClick={() => (view === 'shelves' ? setView('hub') : router.push('/space'))}
          className="text-[#c7beaa] opacity-60 hover:opacity-100 transition-all duration-300 flex items-center gap-2 text-xs font-serif tracking-[0.2em]"
        >
          ← {view === 'shelves' ? (language === 'en' ? 'BACK TO ARCHIVE' : 'العودة إلى الأرشيف') : (language === 'en' ? 'LEAVE CHAMBER' : 'مغادرة الغرفة')}
        </motion.button>
        <button onClick={toggleLanguage} className="px-4 py-1.5 rounded bg-transparent border border-[#b89047]/20 text-[#c7beaa] text-xs font-serif hover:border-[#b89047]/50 hover:text-[#f4efe2] transition-all duration-300">
          {language === 'en' ? 'العربية' : 'English'}
        </button>
      </div>

      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center pt-12 pb-4 relative z-10">
        <div className="flex justify-center mb-5 opacity-70"><BookSpineGlyph color="#b89047" /></div>
        <h1 className="text-3xl md:text-5xl font-serif font-normal tracking-[0.25em] text-[#e6ca95]">
          {language === 'en' ? 'THE GRAND ARCHIVE' : 'الأرشيف الكبير'}
        </h1>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#b89047]/40 to-transparent mx-auto mt-5" />
        <p className="text-[#8c826e] text-[10px] tracking-[0.4em] uppercase mt-4 font-serif">
          {language === 'en' ? 'A SILENT LIBRARY OF DEEP THOUGHT' : 'مكتبة صامتة للفكر العميق'}
        </p>
      </motion.div>

      {/* BOOK BANNER - NEW */}
      <AnimatePresence>
        {showBookBanner && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6 }} className="relative z-20 max-w-4xl mx-auto px-6 py-6">
            <div className="relative rounded-2xl p-6 md:p-8 border border-[#FFD700]/30 overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(20, 15, 5, 0.95), rgba(10, 8, 3, 0.98))', boxShadow: '0 0 60px rgba(255, 215, 0, 0.15)' }}>
              <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle at 20% 20%, rgba(255, 215, 0, 0.15), transparent 50%)' }} />
              <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-[#FFD700]/60" />
              <div className="absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 border-[#FFD700]/60" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 border-[#FFD700]/60" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-[#FFD700]/60" />
              <button onClick={() => setShowBookBanner(false)} className="absolute top-4 right-4 z-10 opacity-50 hover:opacity-100 transition-opacity" aria-label="close banner"><CloseIcon color="#FFD700" /></button>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                <div className="shrink-0 relative">
                  <div className="w-24 h-32 md:w-32 md:h-44 rounded border border-[#FFD700]/40 flex items-center justify-center relative overflow-hidden" style={{ background: 'linear-gradient(160deg, rgba(40, 30, 10, 0.9), rgba(20, 15, 5, 0.95))', boxShadow: '0 0 30px rgba(255, 215, 0, 0.2)' }}>
                    <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 50% 30%, rgba(255, 215, 0, 0.4), transparent 70%)' }} />
                    <div className="text-center px-2"><div className="text-[#FFD700] text-2xl mb-1"><BookGlyph color="#FFD700" /></div><p className="text-[8px] tracking-[0.2em] uppercase text-[#FFD700]/70">Lilith</p></div>
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#FFD700] flex items-center justify-center" style={{ boxShadow: '0 0 15px rgba(255, 215, 0, 0.6)' }}><SparkleIcon color="#000" /></div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FFD700]/40 bg-[#FFD700]/10 mb-3"><span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] animate-pulse" /><span className="text-[9px] tracking-[0.3em] uppercase text-[#FFD700]">{language === 'en' ? 'Now Available' : 'متوفر الآن'}</span></div>
                  <h2 className="font-serif text-xl md:text-3xl tracking-[0.15em] uppercase mb-2" style={{ color: '#FFD700', textShadow: '0 0 20px rgba(255, 215, 0, 0.4)' }}>{language === 'en' ? 'My Book is Now on Amazon' : 'كتابي متوفر الآن على أمازون'}</h2>
                  <p className="text-[#c7beaa] text-sm leading-relaxed italic mb-3 max-w-lg">{language === 'en' ? 'Available as an eBook. For those who wish to sell it or inquire about distribution rights, everything is on my other website. Visit Lilith\'s Website for more information.' : 'متوفر ككتاب إلكتروني. لمن يرغب في بيعه أو الاستفسار عن حقوق التوزيع، كل شيء على موقعي الآخر. تفضل بزيارة موقع ليليث لمزيد من المعلومات.'}</p>
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <a href="https://a.co/d/0fDYArZc" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-[10px] tracking-[0.25em] uppercase font-serif transition-all duration-300 hover:scale-105" style={{ background: 'rgba(255, 215, 0, 0.15)', color: '#FFD700', border: '1px solid rgba(255, 215, 0, 0.6)', boxShadow: '0 0 20px rgba(255, 215, 0, 0.2)' }}><AmazonIcon color="#FFD700" />{language === 'en' ? 'Buy on Amazon' : 'اشترِ من أمازون'}</a>
                    <a href="/space/websites" className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-[10px] tracking-[0.25em] uppercase font-serif transition-all duration-300 hover:scale-105" style={{ background: 'rgba(255, 215, 0, 0.05)', color: '#FFD700', border: '1px solid rgba(255, 215, 0, 0.3)' }}>{language === 'en' ? "Visit Lilith's Website" : 'زيارة موقع ليليث'}</a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {view === 'hub' && (
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hubCards.map((card, i) => {
              const Icon = card.Icon
              const title = language === 'en' ? card.titleEn : card.titleAr
              const desc = language === 'en' ? card.descEn : card.descAr
              const cta = language === 'en' ? card.cta.en : card.cta.ar
              return (
                <motion.button key={card.key} onClick={card.action} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12, duration: 0.7 }} whileHover={{ y: -6 }}
                  className="group relative text-left rounded-2xl p-8 border transition-all duration-500 overflow-hidden min-h-[320px] flex flex-col justify-between"
                  style={{ background: `linear-gradient(160deg, rgba(15, 12, 8, 0.7), rgba(8, 6, 3, 0.9))`, borderColor: `${card.color}33` }}>
                  <span className="absolute top-3 left-3 w-3 h-3 border-l border-t" style={{ borderColor: `${card.color}66` }} />
                  <span className="absolute top-3 right-3 w-3 h-3 border-r border-t" style={{ borderColor: `${card.color}66` }} />
                  <span className="absolute bottom-3 left-3 w-3 h-3 border-l border-b" style={{ borderColor: `${card.color}66` }} />
                  <span className="absolute bottom-3 right-3 w-3 h-3 border-r border-b" style={{ borderColor: `${card.color}66` }} />
                  <div className="absolute inset-0 opacity-40 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 0%, ${card.color}22 0%, transparent 60%)` }} />
                  <div className="relative z-10">
                    <div className="mb-6 opacity-90"><Icon color={card.color} size={40} /></div>
                    <h3 className="text-xl md:text-2xl font-serif tracking-widest uppercase mb-3" style={{ color: card.color, textShadow: `0 0 18px ${card.color}66` }}>{title}</h3>
                    <p className="text-[#c7beaa]/80 text-sm leading-relaxed font-light italic">{desc}</p>
                  </div>
                  <div className="relative z-10 mt-6">
                    <span className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-serif px-4 py-2 rounded border transition-all duration-500" style={{ color: card.color, borderColor: `${card.color}66`, background: `${card.color}10` }}>{cta} →</span>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>
      )}

      <AnimatePresence>
        {view === 'shelves' && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} transition={{ duration: 0.6 }} className="relative z-10 max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-wrap justify-center gap-3 md:gap-5 mb-6 border-b border-[#b89047]/10 pb-6 text-xs md:text-sm tracking-widest font-serif">
              {shelfTabs.map((s) => {
                const shelf = shelves[s.key]
                const active = activeShelf === s.key
                return (
                  <button key={s.key} onClick={() => setActiveShelf(s.key)} className="px-2 py-1 transition-all duration-300 flex items-center gap-2"
                    style={{ color: active ? shelf.color : '#8c826e', textShadow: active ? `0 0 12px ${shelf.color}66` : 'none' }}>
                    <span className="opacity-90"><shelf.Icon color={active ? shelf.color : '#8c826e'} /></span>
                    {language === 'en' ? s.labelEn : s.labelAr}
                  </button>
                )
              })}
            </div>

            {activeShelf === 'philosophy' && (
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {philosophySubcategories.map((sub) => {
                  const active = activeSubcategory === sub.id
                  return (
                    <button key={sub.id} onClick={() => setActiveSubcategory(sub.id)}
                      className="px-3 py-1.5 rounded-full text-[10px] tracking-[0.2em] uppercase transition-all duration-300 border"
                      style={{
                        background: active ? `${sub.color}22` : 'rgba(20, 15, 8, 0.4)',
                        color: active ? sub.color : '#8c826e',
                        borderColor: active ? `${sub.color}88` : 'rgba(60, 45, 25, 0.5)',
                        boxShadow: active ? `0 0 12px ${sub.color}33` : 'none',
                      }}>
                      {language === 'en' ? sub.labelEn : sub.labelAr}
                    </button>
                  )
                })}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]">
              {currentBooks.map((book: Book, index: number) => (
                <motion.div key={book.id + index} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }} whileHover={book.isLocked ? {} : { y: -4 }}
                  className="rounded-lg p-6 border transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
                  style={{ background: current.themeBg, borderColor: current.themeBorder }}>
                  <span className="absolute top-2 left-2 w-3 h-3 border-l border-t" style={{ borderColor: `${current.color}55` }} />
                  <span className="absolute top-2 right-2 w-3 h-3 border-r border-t" style={{ borderColor: `${current.color}55` }} />
                  <span className="absolute bottom-2 left-2 w-3 h-3 border-l border-b" style={{ borderColor: `${current.color}55` }} />
                  <span className="absolute bottom-2 right-2 w-3 h-3 border-r border-b" style={{ borderColor: `${current.color}55` }} />

                  <div className="relative">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="shrink-0 opacity-80 pt-1">
                        {book.isLocked ? <LockIcon color={current.color} /> : <BookGlyph color={current.color} />}
                      </div>
                      <div>
                        <h3 className="text-[#f4efe2] font-serif font-medium text-lg tracking-wide">
                          {language === 'en' ? book.nameEn : book.nameAr}
                        </h3>
                        <p className="text-[10px] tracking-[0.2em] uppercase font-serif mt-1" style={{ color: `${current.color}aa` }}>{book.authorEn}</p>
                        <p className="text-[#c7beaa]/70 text-xs mt-2 leading-relaxed font-sans font-light italic">
                          {language === 'en' ? book.descriptionEn : book.descriptionAr}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 relative">
                    {book.isLocked ? (
                      <div className="w-full px-4 py-2.5 rounded text-xs tracking-widest font-serif italic text-center"
                        style={{ color: `${current.color}80`, border: `1px solid ${current.color}22`, background: 'rgba(0, 0, 0, 0.4)' }}>
                        {language === 'en' ? 'Vault Sealed' : 'القبو مغلق ومحمي'}
                      </div>
                    ) : (
                      <button onClick={() => setBookNotice(book)}
                        className="w-full px-4 py-2.5 rounded text-xs tracking-widest font-serif uppercase transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02]"
                        style={{ background: `${current.color}15`, color: current.color, border: `1px solid ${current.color}55` }}>
                        <InfoIcon color={current.color} />
                        {language === 'en' ? 'More Info' : 'مزيد من المعلومات'}
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {bookNotice && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4" onClick={() => setBookNotice(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} onClick={(e) => e.stopPropagation()}
              className="bg-[#0e1017] border max-w-md w-full p-7 rounded-lg shadow-2xl text-center font-serif text-[#f4efe2] relative"
              style={{ borderColor: `${current.color}66` }}>
              <span className="absolute top-2 left-2 w-3 h-3 border-l border-t" style={{ borderColor: `${current.color}88` }} />
              <span className="absolute top-2 right-2 w-3 h-3 border-r border-t" style={{ borderColor: `${current.color}88` }} />
              <span className="absolute bottom-2 left-2 w-3 h-3 border-l border-b" style={{ borderColor: `${current.color}88` }} />
              <span className="absolute bottom-2 right-2 w-3 h-3 border-r border-b" style={{ borderColor: `${current.color}88` }} />

              <button onClick={() => setBookNotice(null)} className="absolute top-4 right-4 opacity-60 hover:opacity-100 transition-opacity" aria-label="close">
                <CloseIcon color={current.color} />
              </button>

              <div className="flex justify-center mb-4"><InfoIcon color={current.color} /></div>
              <h3 className="text-lg tracking-widest uppercase mb-2" style={{ color: current.color, textShadow: `0 0 15px ${current.color}66` }}>
                {language === 'en' ? bookNotice.nameEn : bookNotice.nameAr}
              </h3>
              <p className="text-xs tracking-[0.25em] uppercase mb-5" style={{ color: `${current.color}aa` }}>{bookNotice.authorEn}</p>

              <p className="text-sm text-[#c7beaa] leading-relaxed italic mb-4">
                {language === 'en'
                  ? "We don't host or upload the actual book. This archive provides only titles, authors and reflections — so you can discover, then buy or find them online."
                  : 'نحن لا نستضيف الكتاب الفعلي أو نرفعه. يوفّر هذا الأرشيف العناوين والمؤلفين والتأملات فقط — لتكتشفها، ثم تشتريها أو تجدها عبر الإنترنت.'}
              </p>

              <p className="text-[10px] text-[#8c826e] tracking-[0.25em] uppercase italic mb-6">
                {language === 'en' ? 'Available on: Amazon · Google Books · Anna\'s Archive' : 'متوفر على: أمازون · كتب جوجل · أرشيف آنا'}
              </p>

              <button onClick={() => setBookNotice(null)}
                className="px-6 py-2 bg-[#e6ca95]/10 border text-xs tracking-widest uppercase transition-all rounded"
                style={{ borderColor: `${current.color}66`, color: current.color }}>
                {language === 'en' ? 'Close' : 'إغلاق'}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {showLilithBooks && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0e1017] border border-[#e6ca95]/30 max-w-md w-full p-8 rounded-lg shadow-2xl text-center font-serif text-[#f4efe2] relative">
            <span className="absolute top-2 left-2 w-3 h-3 border-l border-t border-[#e6ca95]/60" />
            <span className="absolute top-2 right-2 w-3 h-3 border-r border-t border-[#e6ca95]/60" />
            <span className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-[#e6ca95]/60" />
            <span className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-[#e6ca95]/60" />
            <div className="flex justify-center mb-5"><BookGlyph color="#e6ca95" /></div>
            <h3 className="text-xl tracking-widest text-[#e6ca95] uppercase mb-5">
              {language === 'en' ? "Lilith's Books" : 'كتب ليليث'}
            </h3>
            <p className="text-sm text-[#c7beaa] leading-relaxed italic mb-6">
              {language === 'en'
                ? 'Lilith will upload her books soon. The manuscripts are unfolding beautifully in due time — patience is a virtue.'
                : 'سترفع ليليث كتبها قريباً. المخطوطات تتكشف بشكل جميل في الوقت المناسب — الصبر فضيلة.'}
            </p>
            <div className="inline-block px-6 py-2 rounded text-[11px] tracking-[0.35em] uppercase mb-6"
              style={{ color: '#e6ca95', border: '1px solid rgba(230, 202, 149, 0.4)', background: 'rgba(230, 202, 149, 0.08)', textShadow: '0 0 12px rgba(230, 202, 149, 0.5)' }}>
              {language === 'en' ? 'Coming Soon' : 'قريباً'}
            </div>
            <div>
              <button onClick={() => setShowLilithBooks(false)} className="px-6 py-2 bg-[#e6ca95]/10 border border-[#e6ca95]/40 text-xs tracking-widest uppercase hover:bg-[#e6ca95]/20 transition-all text-[#e6ca95] rounded">
                {language === 'en' ? 'Close' : 'إغلاق'}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {showArticles && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0a0e1a] border max-w-md w-full p-8 rounded-lg shadow-2xl text-center font-serif text-[#f4efe2] relative"
            style={{ borderColor: 'rgba(124, 174, 255, 0.35)' }}>
            <span className="absolute top-2 left-2 w-3 h-3 border-l border-t border-[#7caeff]/60" />
            <span className="absolute top-2 right-2 w-3 h-3 border-r border-t border-[#7caeff]/60" />
            <span className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-[#7caeff]/60" />
            <span className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-[#7caeff]/60" />
            <div className="flex justify-center mb-5"><ArticleIcon color="#7caeff" /></div>
            <h3 className="text-xl tracking-widest text-[#7caeff] uppercase mb-5">
              {language === 'en' ? 'Articles' : 'المقالات'}
            </h3>
            <p className="text-sm text-[#c7beaa] leading-relaxed italic mb-6">
              {language === 'en'
                ? 'I share my articles and deeper thoughts on LinkedIn. Visit my profile to read them all.'
                : 'أشارك مقالاتي وأفكاري المعمّقة على لينكد إن. تفضل بزيارة ملفي لقراءتها كلها.'}
            </p>
            <a href="https://www.linkedin.com/in/lilithseclipse" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded text-xs tracking-widest uppercase transition-all mb-6"
              style={{ color: '#7caeff', border: '1px solid rgba(124, 174, 255, 0.5)', background: 'rgba(124, 174, 255, 0.1)', textShadow: '0 0 10px rgba(124, 174, 255, 0.5)' }}>
              <LinkedInIcon color="#7caeff" />
              {language === 'en' ? 'Read on LinkedIn' : 'اقرأ على لينكد إن'}
            </a>
            <div>
              <button onClick={() => setShowArticles(false)} className="px-6 py-2 bg-white/5 border border-white/20 text-xs tracking-widest uppercase hover:bg-white/10 transition-all text-[#c7beaa] rounded">
                {language === 'en' ? 'Close' : 'إغلاق'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}