'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
interface Platform {
  key: string
  titleEn: string
  titleAr: string
  handle: string
  descEn: string
  descAr: string
  buttonEn: string
  buttonAr: string
  href: string
  color: string
  glow: string
  Icon: React.FC<{ color: string }>
}

// ---------- SVG ICONS ----------
const TelegramIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
    <path
      d="M21.5 4.3 2.9 11.4c-1.2.5-1.2 1.2-.2 1.5l4.7 1.5 1.8 5.6c.2.6.4.8 1 .8.5 0 .7-.2 1-.5l2.3-2.2 4.7 3.5c.9.5 1.5.2 1.7-.8l3.1-14.5c.3-1.3-.5-1.9-1.5-1.5Z"
      stroke={color}
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <path d="m8 14.5 9.5-6.5-7.4 7.6" stroke={color} strokeWidth="1.2" fill="none" />
  </svg>
)

const TikTokIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
    <path
      d="M14.5 3v10.5a4 4 0 1 1-4-4M14.5 3c.5 2.5 2.3 4.5 5 5"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
)

const InstagramIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke={color} strokeWidth="1.5" />
    <circle cx="12" cy="12" r="4" stroke={color} strokeWidth="1.5" />
    <circle cx="17.2" cy="6.8" r="1" fill={color} />
  </svg>
)

const YouTubeIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
    <rect x="2.5" y="6" width="19" height="13" rx="3.5" stroke={color} strokeWidth="1.5" />
    <path d="M11 9.5v5l4.5-2.5L11 9.5Z" fill={color} />
  </svg>
)

const XIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
    <path d="M4 4l7 9M20 20l-7-9M4 20 20 4" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
  </svg>
)

const LinkedInIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
    <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" stroke={color} strokeWidth="1.5" />
    <path d="M8 10v7M8 7.2v.1M12 17v-4a2.5 2.5 0 0 1 5 0v4" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
  </svg>
)

const TellonymIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
    <path
      d="M3 12s3-7 9-7 9 7 9 7-3 7-9 7-9-7-9-7Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="2.6" stroke={color} strokeWidth="1.4" />
  </svg>
)

// ---------- DATA ----------
const PLATFORMS: Platform[] = [
  {
    key: 'bot',
    titleEn: 'The Cosmic Hub (Telegram Bot)',
    titleAr: 'المركز الكوني (بوت التليجرام)',
    handle: '@lilithseclipsebot',
    descEn: 'All my services explained in detail, payment methods, and everything you need to know — 24/7.',
    descAr: 'كل خدماتي مشروحة بالتفصيل، طرق الدفع، وكل ما تحتاج معرفته — على مدار الساعة.',
    buttonEn: 'Enter The Hub',
    buttonAr: 'دخول المركز',
    href: 'https://t.me/lilithseclipsebot',
    color: '#22d3ee',
    glow: 'rgba(34, 211, 238, 0.55)',
    Icon: TelegramIcon,
  },
  {
    key: 'booking',
    titleEn: 'Personal Sessions & Consultations',
    titleAr: 'الجلسات الخاصة والاستشارات',
    handle: '@xlilithec',
    descEn: 'Book your paid sessions directly. Contact me to arrange a date and time slot that suits you.',
    descAr: 'احجز جلستك المدفوعة مباشرة. تواصل معي لتحديد اليوم والوقت المناسبين لك.',
    buttonEn: 'Request Session',
    buttonAr: 'طلب حجز جلسة',
    href: 'https://t.me/xlilithec',
    color: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.55)',
    Icon: TelegramIcon,
  },
  {
    key: 'youtube',
    titleEn: 'YouTube',
    titleAr: 'يوتيوب',
    handle: '@lilithseclipse',
    descEn: 'Deep explanations, hypnosis sessions, and free courses — all in one place.',
    descAr: 'شروحات معمّقة، جلسات تنويم، ودورات مجانية — كل ذلك في مكان واحد.',
    buttonEn: 'Subscribe',
    buttonAr: 'اشترك',
    href: 'https://www.youtube.com/@lilithseclipse',
    color: '#ff0033',
    glow: 'rgba(255, 0, 51, 0.6)',
    Icon: YouTubeIcon,
  },
  {
    key: 'instagram',
    titleEn: 'Instagram',
    titleAr: 'انستغرام',
    handle: '@liliths_eclipse',
    descEn: 'Sharing aesthetics, moods, and cosmic vibes from my world.',
    descAr: 'مشاركة جماليات، أجواء، و vibes كونية من عالمي.',
    buttonEn: 'Follow on Instagram',
    buttonAr: 'تابعني على انستغرام',
    href: 'https://www.instagram.com/liliths_eclipse',
    color: '#e1306c',
    glow: 'rgba(225, 48, 108, 0.6)',
    Icon: InstagramIcon,
  },
  {
    key: 'tiktok',
    titleEn: 'TikTok',
    titleAr: 'تيك توك',
    handle: '@liliths.eclipse',
    descEn: 'Short videos of my ideas, guidance, and everything I teach.',
    descAr: 'فيديوهات قصيرة لأفكاري، إرشاداتي، وكل ما أعلّمه.',
    buttonEn: 'Watch on TikTok',
    buttonAr: 'شاهد على تيك توك',
    href: 'https://www.tiktok.com/@liliths.eclipse',
    color: '#ff2d95',
    glow: 'rgba(255, 45, 149, 0.6)',
    Icon: TikTokIcon,
  },
  {
    key: 'x',
    titleEn: 'X (Twitter)',
    titleAr: 'إكس (تويتر)',
    handle: '@lilithseclipse1',
    descEn: 'Sharing some vibes, quick thoughts, and cosmic moments.',
    descAr: 'مشاركة بعض الأجواء، أفكار سريعة، ولحظات كونية.',
    buttonEn: 'Follow on X',
    buttonAr: 'تابعني على إكس',
    href: 'https://x.com/lilithseclipse1',
    color: '#e7e9ea',
    glow: 'rgba(231, 233, 234, 0.45)',
    Icon: XIcon,
  },
  {
    key: 'linkedin',
    titleEn: 'LinkedIn',
    titleAr: 'لينكد إن',
    handle: 'lilithseclipse',
    descEn: 'Sharing articles, professional insights, and deeper thoughts.',
    descAr: 'مشاركة مقالات، رؤى مهنية، وأفكار معمّقة.',
    buttonEn: 'Connect on LinkedIn',
    buttonAr: 'تواصل على لينكد إن',
    href: 'https://www.linkedin.com/in/lilithseclipse',
    color: '#0a66c2',
    glow: 'rgba(10, 102, 194, 0.6)',
    Icon: LinkedInIcon,
  },
  {
    key: 'tellonym',
    titleEn: 'Anonymous Cosmic Questions (Tellonym)',
    titleAr: 'أسئلة كونية مجهولة (تيلونيم)',
    handle: 'tellonym.me/liliths.ecilipse',
    descEn: 'Ask anonymously. Selected questions become detailed explanation posts.',
    descAr: 'اسأل بشكل مجهول. الأسئلة المختارة تتحول إلى منشورات شرح مفصلة.',
    buttonEn: 'Drop a Question',
    buttonAr: 'أرسل سؤالك',
    href: 'https://tellonym.me/liliths.ecilipse',
    color: '#a855f7',
    glow: 'rgba(168, 85, 247, 0.6)',
    Icon: TellonymIcon,
  },
]

export default function ContactPage() {
  const router = useRouter()
  const { language, toggleLanguage } = useLanguage()

  const t = {
    en: {
      title: "LILITH'S ECLIPSE",
      subtitle: 'REACH OUT THROUGH THE COSMIC VOID',
      backButton: 'BACK TO SPACE',
      securityTitle: 'CRITICAL SECURITY WARNING',
      securityWarning:
        'I have NO other accounts on any other social platform. If you find any profile using my name, brand, or pictures anywhere else — it is NOT me. Please report them immediately to protect the community.',
      officialListTitle: 'My Only Official Cosmic Gateways:',
    },
    ar: {
      title: 'خسوف ليليث',
      subtitle: 'تواصل عبر الفراغ الكوني',
      backButton: 'العودة إلى الفضاء',
      securityTitle: 'تحذير أمني هام جداً',
      securityWarning:
        'ليس لدي أي حسابات أخرى على أي منصة تواصل اجتماعي. إذا صادفت أي حساب يستخدم اسمي أو صوري في أي مكان آخر — فهو ليس أنا. يرجى الإبلاغ عنه فوراً لحماية الجميع.',
      officialListTitle: 'بواباتي الرسمية والوحيدة:',
    },
  }
  const c = t[language]

  return (
    <div className="min-h-screen bg-[#02040a] text-gray-100 relative overflow-y-auto pb-16 selection:bg-cyan-500/30">

      {/* ===================== BACKGROUND ===================== */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#01030a] via-[#04081a] to-[#01020a]" />

        {[...Array(140)].map((_, i) => {
          const hue = Math.random() < 0.5 ? '200' : '260'
          return (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                width: Math.random() * 2 + 0.5 + 'px',
                height: Math.random() * 2 + 0.5 + 'px',
                backgroundColor: `hsla(${hue}, 90%, 85%, ${Math.random() * 0.5 + 0.2})`,
                animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
                animationDelay: Math.random() * 4 + 's',
                boxShadow: `0 0 4px hsla(${hue}, 90%, 75%, 0.6)`,
              }}
            />
          )
        })}

        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px] animate-pulse" />
        <div
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-fuchsia-500/5 blur-[120px] animate-pulse"
          style={{ animationDelay: '2s' }}
        />
      </div>

      {/* ===================== NAV ===================== */}
      <div className="relative z-30 max-w-5xl mx-auto px-6 pt-6 flex justify-between items-center">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push('/space')}
          className="text-cyan-300/70 hover:text-cyan-200 transition-all text-xs tracking-widest bg-cyan-950/20 backdrop-blur-md px-4 py-2 rounded-full border border-cyan-500/30 hover:border-cyan-400/60"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          ← {c.backButton}
        </motion.button>

        <button
          onClick={toggleLanguage}
          className="px-4 py-2 bg-cyan-950/40 rounded-full text-cyan-200 text-xs tracking-wider hover:bg-cyan-900/50 transition-all border border-cyan-500/30 backdrop-blur-md"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          {language === 'en' ? 'العربية' : 'English'}
        </button>
      </div>

      {/* ===================== MAIN ===================== */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 mt-10">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1
            className="text-3xl md:text-5xl tracking-[0.25em] text-white"
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              textShadow: `
                0 0 25px rgba(74, 140, 255, 0.55),
                0 0 60px rgba(2, 62, 138, 0.35)
              `,
            }}
          >
            {c.title}
          </h1>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent mx-auto mt-5" />
          <p className="text-cyan-300/50 text-[10px] tracking-[0.4em] uppercase mt-4">
            {c.subtitle}
          </p>
        </motion.div>

        <div className="space-y-6">
          {PLATFORMS.map((p, i) => {
            const title = language === 'en' ? p.titleEn : p.titleAr
            const desc = language === 'en' ? p.descEn : p.descAr
            const button = language === 'en' ? p.buttonEn : p.buttonAr
            const Icon = p.Icon

            return (
              <motion.a
                key={p.key}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.6 }}
                className={`group relative block rounded-2xl p-6 backdrop-blur-md transition-all duration-500 overflow-hidden neon-${p.key}`}
                style={{
                  background: 'rgba(5, 8, 20, 0.6)',
                  border: `1px solid ${p.color}33`,
                }}
              >
                <style>{`
                  .neon-${p.key}:hover {
                    border-color: ${p.color}AA !important;
                    box-shadow:
                      0 0 25px ${p.glow},
                      0 0 60px ${p.color}40,
                      inset 0 0 30px ${p.color}15 !important;
                  }
                  .neon-${p.key}:hover .corner { border-color: ${p.color} !important; }
                  .neon-${p.key}:hover .btn-neon {
                    background: ${p.color}25 !important;
                    border-color: ${p.color} !important;
                    color: ${p.color} !important;
                    text-shadow: 0 0 12px ${p.color};
                    box-shadow: 0 0 20px ${p.glow};
                  }
                  .neon-${p.key}:hover .handle {
                    color: ${p.color} !important;
                    text-shadow: 0 0 10px ${p.color}88;
                  }
                  .neon-${p.key}:hover .icon-wrap {
                    border-color: ${p.color} !important;
                    box-shadow: 0 0 20px ${p.glow}, inset 0 0 12px ${p.color}33;
                  }
                  .neon-${p.key}:hover .title-neon { color: ${p.color} !important; }
                `}</style>

                <span className="corner absolute top-2 left-2 w-3 h-3 border-l border-t transition-colors duration-500" style={{ borderColor: `${p.color}55` }} />
                <span className="corner absolute top-2 right-2 w-3 h-3 border-r border-t transition-colors duration-500" style={{ borderColor: `${p.color}55` }} />
                <span className="corner absolute bottom-2 left-2 w-3 h-3 border-l border-b transition-colors duration-500" style={{ borderColor: `${p.color}55` }} />
                <span className="corner absolute bottom-2 right-2 w-3 h-3 border-r border-b transition-colors duration-500" style={{ borderColor: `${p.color}55` }} />

                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none opacity-40 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at 100% 0%, ${p.color}18 0%, transparent 60%)`,
                  }}
                />

                <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 z-10">
                  <div className="flex items-start gap-4 flex-1">
                    <div
                      className="icon-wrap shrink-0 w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500"
                      style={{
                        borderColor: `${p.color}55`,
                        background: `${p.color}10`,
                        boxShadow: `0 0 12px ${p.color}22`,
                      }}
                    >
                      <Icon color={p.color} />
                    </div>

                    <div className="flex-1">
                      <h3 className="title-neon text-lg font-light transition-colors duration-500" style={{ color: '#d7deec' }}>
                        {title}
                      </h3>
                      <p className="handle font-mono text-xs mt-1 transition-all duration-500" style={{ color: `${p.color}99` }}>
                        {p.handle}
                      </p>
                      <p className="text-gray-400 text-sm mt-2 leading-relaxed font-light">
                        {desc}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-center sm:text-right">
                    <span
                      className="btn-neon inline-block text-xs px-4 py-2 rounded-xl border transition-all duration-500 font-medium"
                      style={{
                        background: `${p.color}10`,
                        borderColor: `${p.color}55`,
                        color: p.color,
                      }}
                    >
                      {button} →
                    </span>
                  </div>
                </div>
              </motion.a>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-12 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, rgba(24, 4, 4, 0.6), rgba(8, 2, 2, 0.7))',
            border: '1px solid rgba(220, 38, 38, 0.35)',
            boxShadow: '0 0 40px rgba(220, 38, 38, 0.15)',
          }}
        >
          <span className="absolute top-2 left-2 w-3 h-3 border-l border-t border-red-500/60" />
          <span className="absolute top-2 right-2 w-3 h-3 border-r border-t border-red-500/60" />
          <span className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-red-500/60" />
          <span className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-red-500/60" />

          <div className="flex items-center gap-3 mb-3 border-b border-red-900/50 pb-3">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
              <path
                d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Z"
                stroke="#ef4444"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path d="M12 8v4M12 16h.01" stroke="#ef4444" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <h4 className="text-red-400 text-xs tracking-[0.25em] font-semibold uppercase">
              {c.securityTitle}
            </h4>
          </div>
          <p className="text-red-200/80 text-sm leading-relaxed font-light mb-4">
            {c.securityWarning}
          </p>

          <div className="text-[11px] font-mono text-zinc-400 space-y-1.5 bg-black/40 p-4 rounded-xl border border-red-900/40">
            <p className="text-zinc-300 mb-2 font-sans">{c.officialListTitle}</p>
            <p className="text-cyan-400/90">Telegram Bot — @lilithseclipsebot</p>
            <p className="text-sky-400/90">Telegram (Bookings) — @xlilithec</p>
            <p className="text-pink-400/90">TikTok — @liliths.eclipse</p>
            <p className="text-rose-400/90">Instagram — @liliths_eclipse</p>
            <p className="text-red-400/90">YouTube — @lilithseclipse</p>
            <p className="text-zinc-200/90">X (Twitter) — @lilithseclipse1</p>
            <p className="text-blue-400/90">LinkedIn — lilithseclipse</p>
            <p className="text-purple-400/90">Tellonym — liliths.ecilipse</p>
          </div>
        </motion.div>

      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(1.25); }
        }
      `}</style>
    </div>
  )
}
