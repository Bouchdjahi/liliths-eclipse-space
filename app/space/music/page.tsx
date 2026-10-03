'use client'

import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
/* ============================================================
   ELEGANT SVG ICONS
   ============================================================ */
const SpotifyIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.4" />
    <path d="M7 9.5c3.5-1 7-0.5 9.5 1M7.5 12.5c3-0.8 5.8-0.3 8 1M8 15.5c2.4-0.6 4.6-0.2 6.3 0.8" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

const VideoIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
    <rect x="3" y="6" width="14" height="12" rx="2" stroke={color} strokeWidth="1.4" />
    <path d="m17 10 4-2v8l-4-2v-4Z" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
)

const PenIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
    <path d="M4 20l4-1 12-12-3-3L5 16l-1 4Z" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
    <path d="m14 6 4 4" stroke={color} strokeWidth="1.4" />
  </svg>
)

const PlayIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
    <path d="M8 5v14l11-7L8 5Z" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
)

const LockIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="40" height="40" fill="none">
    <rect x="5" y="11" width="14" height="9" rx="1.5" stroke={color} strokeWidth="1.3" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke={color} strokeWidth="1.3" />
    <circle cx="12" cy="15.5" r="1" fill={color} />
  </svg>
)

const CloseIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
    <path d="M6 6l12 12M18 6 6 18" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

const CrescentIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
    <path d="M16 3a9 9 0 1 0 0 18 7 7 0 1 1 0-18Z" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
)

const StarIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
    <path d="m12 3 2.5 6L21 11l-6 2.5L12 20l-2.5-6.5L3 11l6.5-2L12 3Z" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
)

const HeartIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
    <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
)

/* Skull icon */
const SkullIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
    <path
      d="M12 3c-4.5 0-8 3-8 7v2c0 1.5.7 2.7 2 3.5V18a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-2.5c1.3-.8 2-2 2-3.5V10c0-4-3.5-7-8-7Z"
      stroke={color}
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <circle cx="9" cy="11" r="1.6" fill={color} />
    <circle cx="15" cy="11" r="1.6" fill={color} />
    <path d="M11 15.5v1.5M13 15.5v1.5M10 17h4" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
  </svg>
)

/* ============================================================
   DATA
   ============================================================ */
const spotifyProfile = {
  url: 'https://open.spotify.com/user/31s77xloemte22ihj5yonptlcvii?si=253647c5b1e24a9e',
  username: '@liliths.eclipse',
  descriptionEn: 'My cosmic playlists for every mood — dark ambient, ethereal wave, gothic dream pop, and spiritual vibrations.',
  descriptionAr: 'قوائم التشغيل الكونية الخاصة بي لكل مزاج — أجواء مظلمة، موجات أثيرية، بوب أحلام قوطي، واهتزازات روحية.',
}

const musicVideos = [
  {
    id: 'video1',
    titleEn: 'Prequel',
    titleAr: 'Prequel',
    artist: 'Falling in Reverse',
    vibeEn: 'Disconnection & Ravens',
    vibeAr: 'الانفصال والغربان',
    color: '#a855f7',
    thumbnail: 'https://img.youtube.com/vi/hX0lhueeib8/0.jpg',
    url: 'https://youtu.be/hX0lhueeib8?si=KJS3kMBvr27GOEGx',
    descriptionEn: 'When I met my twin flame, something inside of me awakened in a burning way. I didn\'t know what was happening to me, so I ran further and farther away. I had already been through karmic situations where I suffered, and this intense sexual desire was burning me alive. It wasn\'t just lust; it was something that stripped away my safety and balance, leaving me completely lost. Right before my soul fully awakened, this song came into my life. I listened to it constantly, and even the music video had a profound meaning — if you pay attention, it\'s all about breaking free. I still remember the exact places where I used to sit alone, where a crow would appear and face me every single time. Even the sky looked different, the air felt different, and it felt like the apocalypse. I still remember every single feeling. Back then, that song felt like the universe speaking directly to me.',
    descriptionAr: 'عندما التقيت بتوأم روحي، استيقظ شيء بداخلي بطريقة ملتهبة. لم أكن أعرف ما كان يجري معي، فصرت أهرب أكثر فأكثر. كنت قد مررت بالفعل بمواقف كارمية عانيت فيها، وكانت تلك الرغبة العميقة تحرقني حية. لم تكن لمجرد الشهوة، بل كانت شيئاً يسلبني الأمان والتوازن ويتركني تائهة تماماً. وقبل استيقاظ روحي تماماً، دخلت هذه الأغنية إلى حياتي. كنت أستمع إليها باستمرار، وحتى الفيديو كليب كان يحمل عمقاً كبيراً؛ فإذا انتبهتم، ما زلت أتذكر الأماكن بالضبط التي كنت أجلس فيها بمفردي، حيث كان هناك غراب يواجهني في كل مرة. حتى السماء كانت تبدو مختلفة، والهواء بدا مختلفاً، وشعرت وكأنه اقتراب نهاية العالم. ما زلت أتذكر كل شعور عشته. في ذلك الوقت، كانت تلك الأغنية وكأن الكون يتحدث معي مباشرة.',
  },
  {
    id: 'video2',
    titleEn: 'The Eagle Flies Alone',
    titleAr: 'The Eagle Flies Alone',
    artist: 'Arch Enemy',
    vibeEn: 'Rebellion & Awakening',
    vibeAr: 'التمرد والاستيقاظ',
    color: '#06b6d4',
    thumbnail: 'https://img.youtube.com/vi/mjF1rmSV1dM/0.jpg',
    url: 'https://youtu.be/mjF1rmSV1dM?si=BRO9TbB_5lW_D3tc',
    descriptionEn: 'This song was always my favorite; it captured the very essence of who I am and mirrored the rebel side of me. But as I went through my journey, that feeling grew so much stronger. During my awakening phase, as I was breaking away from old beliefs and mental conditioning, I started feeling an intense sense of rebellion and profound inner independence. The song matched that exact energy, and I felt deeply drawn to it during that time of deep transformation.',
    descriptionAr: 'كانت هذه الأغنية دائماً مفضلة لدي؛ فقد كانت تصف جوهر شخصيتي وتعكس جانبي المتمرد. ولكن مع تقدمي في رحلتي، أصبح ذلك الشعور أقوى بكثير. وخلال مرحلة استيقاظي، وبينما كنت أتحرر من المعتقدات القديمة والبرمجة الذهنية، بدأت أشعر بإحساس قوي جداً بالتمرد والاستقلال الداخلي العميق. لقد كانت الأغنية تتطابق تماماً مع تلك الطاقة، وشعرت بجاذبية عميقة تجاهها خلال تلك الفترة من التحول الجذري.',
  },
  {
    id: 'video3',
    titleEn: 'Dying to Love',
    titleAr: 'Dying to Love',
    artist: 'Bad Omens',
    vibeEn: 'Emotional Evolution',
    vibeAr: 'التطور العاطفي',
    color: '#f43f5e',
    thumbnail: 'https://img.youtube.com/vi/4xq5QzNG-m8/0.jpg',
    url: 'https://youtu.be/4xq5QzNG-m8?si=NMV7igBZgqob3hNz',
    descriptionEn: 'Later, during a more emotional part of my awakening — when my twin flame and I united emotionally — I started facing my feelings more directly and realized that I wasn\'t actually afraid of love; I deeply wanted it. But I was terrified of losing myself when I loved, and I began to feel an ache surrounding that fear. During that time, songs like "Dying to Love" spoke to me on a deeper level, almost as if they were reflecting the exact emotions I couldn\'t fully express myself.',
    descriptionAr: 'لاحقاً، وخلال جزء أكثر عاطفية من استيقاظي — عندما اتحدنا أنا وتوأم روحي عاطفياً — بدأت أواجه مشاعري بشكل مباشر أكثر وأدركت أنني لم أكن خائفة حقاً من الحب، بل كنت أريده بشدة. لكنني كنت مرعوبة من أن أفقد نفسي عندما أحب، وبدأت أُحس بألم يحيط بهذا الخوف. خلال ذلك الوقت، خاطبتني أغنيات مثل "Dying to Love" على مستوى أعمق، وكأنها كانت تعكس بدقة تلك المشاعر التي لم أستطع التعبير عنها بالكامل بنفسي.',
  },
  {
    id: 'video4',
    titleEn: 'Nightmare',
    titleAr: 'Nightmare',
    artist: 'Witto Goom',
    vibeEn: 'Twin Flame Chaos',
    vibeAr: 'فوضى توأم الروح',
    color: '#c084fc',
    thumbnail: 'https://img.youtube.com/vi/RtFFpNuaphw/0.jpg',
    url: 'https://youtu.be/RtFFpNuaphw?si=gL_XsJoCKXCHGKDS',
    descriptionEn: 'During the phase when I had to deal with my karma, face my deep wounds, confront myself, and handle everything all at once, I couldn\'t bear the weight of it. So, I started chasing my twin flame — running away from myself and toward him. This song felt intensely connected to what I was going through; it mirrored the sheer intensity of my emotions and the profound confusion I was experiencing at that time, almost as if it was expressing the inner chaos and longing I couldn\'t fully put into words.',
    descriptionAr: 'خلال تلك المرحلة التي كان عليَّ فيها مواجهة كارمتي وجروحي العميقة، ومواجهة نفسي وتحمل كل شيء دفعة واحدة، لم أستطع تحمل ثقل ذلك. لذا، بدأت أطارد توأم روحي — هاربةً من نفسي نحوه. شعرت أن هذه الأغنية متصلة بشكل كبير بما كنت أمره؛ فقد انعكست فيها حدة مشاعري والارتباك الشديد الذي كنت أعيشه في ذلك الوقت، وكأنها كانت تعبّر تماماً عن الفوضى الداخلية والشوق الذي عجزت عن وصفه بالكلمات.',
  },
  {
    id: 'video5',
    titleEn: 'Alive Again',
    titleAr: 'Alive Again',
    artist: 'Reed Wonder ft. Aurora Olivas',
    vibeEn: 'Healing & Rebirth',
    vibeAr: 'الشفاء والولادة الجديدة',
    color: '#a78bfa',
    thumbnail: 'https://img.youtube.com/vi/m7V1_8qxnHI/0.jpg',
    url: 'https://youtu.be/m7V1_8qxnHI?si=7yurYuetfZZS4noq',
    descriptionEn: 'The first time I experienced what an awakening soul and a Dark Night of the Soul felt like, so many bizarre and unexplainable things happened that night. Facing everything all at once was too much, so I ran from it. The very next day, I officially began my healing journey. I discovered this song that exact same day — even though I used to listen to all of their music and they were already my favorite artists, this particular song seemed to materialize out of nowhere. It truly resonated with me, feeling like an exact reflection of that pivotal moment of inner shift, as if I was slowly starting to rebuild myself and understand what I was going through on a much deeper level.',
    descriptionAr: 'في المرة الأولى التي اختبرت فيها معنى استيقاظ الروح وليلة الروح المظلمة، حدثت لي أشياء غريبة وغير قابلة للتفسير في تلك الليلة. وكان مواجهة كل شيء دفعة واحدة أمراً يفوق السحْم، فهربت منه. وفي اليوم التالي مباشرة، بدأت رسمياً رحلة شفائي. اكتشفت هذه الأغنية في ذلك اليوم بالذات — ورغم أنني كنت معتادة على الاستماع إلى جميع أغانيهم وكانوا فريقي المفضل بالفعل، إلا أن هذه الأغنية بالذات ظهرت وكأنها خرجت من العدم. لقد لامستني حقاً، وشعرت وكأنها انعكاس دقيق لتلك اللحظة الفارقة من التحول الداخلي، وكأنني بدأت ببطء في إعادة بناء نفسي وفهم ما كنت أمره على مستوى أعمق بكثير.',
  },
  {
    id: 'video6',
    titleEn: 'Denial',
    titleAr: 'الإنكار',
    artist: 'Unknown',
    vibeEn: 'Denial of Love',
    vibeAr: 'إنكار الحب',
    color: '#f472b6',
    thumbnail: 'https://img.youtube.com/vi/4d3cOug5Mx0/0.jpg',
    url: 'https://youtu.be/4d3cOug5Mx0?si=1VGMEdkIB9BvjigK',
    descriptionEn: 'Back when I was actively denying the love and intense attraction I felt toward him, this song was my favorite. It felt as though something deep inside of me already knew he was the one and always had been, because I tried to be with others, but I simply couldn\'t. It was the first time I had ever faced a connection like this, and I couldn\'t bring myself to accept the fact. Even while I was fighting it, my soul was singing this song to me.',
    descriptionAr: 'في الأوقات التي كنت أنكر فيها بشدة الحب والجاذبية القوية التي أكنها له، كانت هذه الأغنية مفضلة لدي. كان الأمر كما لو أن شيئاً في أعماقي كان يعرف تماماً أنه هو المنشود وأنه كان كذلك دائماً، لأنني حاولت الارتباط بغيره لكنني لم أستطع أبداً. كانت المرة الأولى التي أواجه فيها ارتباطاً كهذا، ولم أستطع تقبل تلك الحقيقة. ورغم محاولاتي في الهروب ومقاومة ذلك، كانت روحي تغني لي هذه الأغنية من الداخل.',
  },
  {
    id: 'video7',
    titleEn: 'Running & Protecting',
    titleAr: 'الهروب والحماية',
    artist: 'Unknown',
    vibeEn: 'Running from the Twin',
    vibeAr: 'الهروب من التوأم',
    color: '#818cf8',
    thumbnail: 'https://img.youtube.com/vi/GLRFl26Q92s/0.jpg',
    url: 'https://youtu.be/GLRFl26Q92s?si=Ug7EfweoeSWG_Rns',
    descriptionEn: 'Back when I was running away from my twin and trying to protect myself because I couldn\'t handle everything happening around me, this song became my voice. I was wishing so badly that he could understand why I was running, how much I hated acting like I didn\'t care, and how deeply painful it was to pretend he wasn\'t someone I would literally kill for.',
    descriptionAr: 'في الفترة التي كنت أهرب فيها من توأم روحي وأحاول حماية نفسي لأنني لم أستطع تحمل كل ما يحيط بي، أصبحت هذه الأغنية صوتي. كنت أتمنى بشدة لو بإمكانه أن يفهم سبب هربي، ومدى كرهي لتظاهري بأنني لا أبالي، وكم كان مؤلماً حقاً أن أتظاهر بأنه ليس شخصاً أستطيع القتل من أجله.',
  },
  {
    id: 'video8',
    titleEn: 'Karmic Enemies',
    titleAr: 'أعداء كارميون',
    artist: 'Unknown',
    vibeEn: 'Karmic Cycle',
    vibeAr: 'الدائرة الكارمية',
    color: '#ef4444',
    thumbnail: 'https://img.youtube.com/vi/Pj2miRJ6bZs/0.jpg',
    url: 'https://youtu.be/Pj2miRJ6bZs?si=ME2suaWksMbw04Iy',
    descriptionEn: 'Back when my twin and I were stuck in the karmic cycle, it felt like we had turned into enemies. This song perfectly explains the way our dynamic shifted and the bitter way we became toward each other during that time.',
    descriptionAr: 'في الفترة التي كنا فيها أنا وتوأم روحي عالقين في الدائرة الكارمية، بدا الأمر وكأننا تحولنا إلى أعداء. تشرح هذه الأغنية تماماً كيف تغيرت طبيعة علاقتنا وطريقة تحولنا إلى تلك الحالة المرة تجاه بعضنا البعض في ذلك الوقت.',
  },
  {
    id: 'video9',
    titleEn: 'Popular Monster',
    titleAr: 'Popular Monster',
    artist: 'Falling in Reverse',
    vibeEn: 'The Inner Monster',
    vibeAr: 'الوحش الداخلي',
    color: '#f97316',
    thumbnail: 'https://img.youtube.com/vi/jakpo7tj7Qw/0.jpg',
    url: 'https://youtu.be/jakpo7tj7Qw?si=XHUoWD-MuHFKjaha',
    descriptionEn: 'Back before I finally faced myself, I used to see myself as a monster — someone people should be afraid of. My younger self was terrified, and this song captures the exact rage and mental struggles I was going through, as well as the distorted way I saw myself back then.',
    descriptionAr: 'في الفترة التي سبقت مواجهتي لنفسي، كنت أرى ذاتي كوحش — كشخص ينبغي للآخرين الخوف منه. كانت نفسي الصغيرة مرعوبة، وتجسد هذه الأغنية بدقة حالة الغضب والصراعات النفسية التي كنت أعاني منها، إضافة إلى الطريقة المشوهة التي كنت أرى بها نفسي في ذلك الوقت.',
  },
]

/* ============================================================
   PAGE
   ============================================================ */
export default function MusicPage() {
  const router = useRouter()
  const { language, toggleLanguage } = useLanguage()
  const [activeTab, setActiveTab] = useState<'spotify' | 'videos' | 'songs'>('spotify')
  const [selectedVideo, setSelectedVideo] = useState<any>(null)

  // Skull-dominant mix
  const floatingSymbols = [
    SkullIcon, SkullIcon, SkullIcon, SkullIcon,
    SkullIcon, SkullIcon, SkullIcon, SkullIcon,
    CrescentIcon, CrescentIcon,
    StarIcon,
    HeartIcon,
  ]

  return (
    <div className="min-h-screen bg-[#04020d] text-[#e2e8f0] overflow-hidden relative selection:bg-fuchsia-500/30">

      {/* ============ COSMIC BACKGROUND ============ */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#04020d] via-[#080314] to-[#010105]" />
      <div className="absolute top-[15%] left-[-10%] w-[45vw] h-[45vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)' }} />
      <div className="absolute bottom-[10%] right-[-10%] w-[50vw] h-[50vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 70%)' }} />

      {/* Starfield */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {[...Array(120)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-white" style={{
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            width: Math.random() * 1.4 + 0.4 + 'px',
            height: Math.random() * 1.4 + 0.4 + 'px',
            boxShadow: '0 0 4px rgba(255,255,255,0.6)',
            animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
            animationDelay: Math.random() * 4 + 's',
          }} />
        ))}
      </div>

      {/* CRT Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] z-40"
        style={{
          backgroundImage: 'linear-gradient(rgba(236,72,153,0.6) 50%, transparent 50%)',
          backgroundSize: '100% 4px',
        }} />

      {/* Pixel grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(rgba(236,72,153,0.8) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }} />

      {/* ============ SKULL-HEAVY FLOATING BACKGROUND ============ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => {
          const Symbol = floatingSymbols[i % floatingSymbols.length]
          return (
            <div
              key={i}
              className="absolute animate-float-slow"
              style={{
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animationDelay: Math.random() * 4 + 's',
                opacity: 0.28,
                transform: `scale(${0.6 + Math.random() * 0.9})`,
              }}
            >
              <Symbol color="#ec4899" />
            </div>
          )
        })}
      </div>

      {/* ============ NAV ============ */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-6 flex justify-between items-center">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push('/space')}
          className="text-pink-400/70 hover:text-pink-300 transition-all duration-300 flex items-center gap-2 text-xs font-mono tracking-[0.2em] border border-dashed border-pink-500/30 hover:border-pink-500 bg-black/60 px-4 py-2"
        >
          ← {language === 'en' ? 'RETURN TO SPACE' : 'العودة إلى الفضاء'}
        </motion.button>
        <button
          onClick={toggleLanguage}
          className="px-4 py-1.5 rounded-full bg-purple-950/60 border border-pink-500/30 text-pink-300 text-xs font-mono hover:border-pink-400/60 hover:bg-purple-900/60 transition-all duration-300"
        >
          {language === 'en' ? 'العربية' : 'English'}
        </button>
      </div>

      {/* ============ HERO ============ */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center pt-12 pb-6 relative z-10"
      >
        <div className="flex justify-center gap-3 mb-5 opacity-90">
          <CrescentIcon color="#ec4899" />
          <SkullIcon color="#a855f7" />
          <SkullIcon color="#ec4899" />
          <StarIcon color="#a855f7" />
          <SkullIcon color="#ec4899" />
          <HeartIcon color="#a855f7" />
        </div>
        <h1
          className="text-3xl md:text-5xl tracking-[0.25em]"
          style={{
            fontFamily: "'Cinzel Decorative', serif",
            color: '#f0abfc',
            textShadow: '0 0 25px rgba(236,72,153,0.55), 0 0 60px rgba(168,85,247,0.35)',
          }}
        >
          {language === 'en' ? "LILITH'S ARCADE" : 'موسيقى ليليث'}
        </h1>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-pink-400/60 to-transparent mx-auto mt-5" />
        <p className="text-pink-300/50 text-[10px] tracking-[0.4em] uppercase mt-4 font-mono">
          {language === 'en' ? 'PIXEL.KUROMI.COSMIC — STATION 01' : 'محطة: بيكسيز • كورومي • الكونية'}
        </p>
      </motion.div>

      {/* ============ TABS ============ */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-6">
        <div className="flex flex-wrap justify-center gap-3 md:gap-5 mb-10 border-b border-pink-400/10 pb-6 text-xs md:text-sm tracking-widest font-mono">
          {([
            { key: 'spotify', labelEn: 'Spotify',  labelAr: 'سبوتيفاي', Icon: SpotifyIcon, color: '#a855f7' },
            { key: 'videos',  labelEn: 'Clips',    labelAr: 'المقاطع',  Icon: VideoIcon,   color: '#ec4899' },
            { key: 'songs',   labelEn: 'My Songs', labelAr: 'أغانيّ',   Icon: PenIcon,     color: '#f0abfc' },
          ] as const).map((t) => {
            const active = activeTab === t.key
            return (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key as any)}
                className="px-3 py-1.5 transition-all duration-300 flex items-center gap-2"
                style={{
                  color: active ? t.color : '#7c6f80',
                  textShadow: active ? `0 0 12px ${t.color}66` : 'none',
                  borderBottom: active ? `1px solid ${t.color}` : '1px solid transparent',
                }}
              >
                <t.Icon color={active ? t.color : '#7c6f80'} />
                {language === 'en' ? t.labelEn : t.labelAr}
              </button>
            )
          })}
        </div>

        {/* ============ SPOTIFY ============ */}
        {activeTab === 'spotify' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <div
              className="relative rounded-2xl p-8 border overflow-hidden"
              style={{
                background: 'linear-gradient(160deg, rgba(20,10,25,0.85), rgba(8,4,14,0.95))',
                borderColor: 'rgba(168,85,247,0.3)',
                boxShadow: '0 0 50px rgba(168,85,247,0.15)',
              }}
            >
              <span className="absolute top-3 left-3 w-3 h-3 border-l border-t" style={{ borderColor: 'rgba(168,85,247,0.55)' }} />
              <span className="absolute top-3 right-3 w-3 h-3 border-r border-t" style={{ borderColor: 'rgba(168,85,247,0.55)' }} />
              <span className="absolute bottom-3 left-3 w-3 h-3 border-l border-b" style={{ borderColor: 'rgba(168,85,247,0.55)' }} />
              <span className="absolute bottom-3 right-3 w-3 h-3 border-r border-b" style={{ borderColor: 'rgba(168,85,247,0.55)' }} />

              <div className="flex justify-center mb-5">
                <SpotifyIcon color="#a855f7" />
              </div>
              <h2
                className="text-xl text-center tracking-widest uppercase mb-2"
                style={{ color: '#f0abfc', fontFamily: "'Cinzel', serif", textShadow: '0 0 15px rgba(236,72,153,0.5)' }}
              >
                {language === 'en' ? 'KUROMI PLAYLIST HUB' : 'مركز قوائم كورومي'}
              </h2>
              <p className="text-purple-400/60 text-xs text-center font-mono mb-6">{spotifyProfile.username}</p>
              <p className="text-[#c7beaa]/85 text-sm mb-8 text-center leading-relaxed font-light italic bg-purple-950/20 p-4 rounded-lg border border-purple-900/40">
                {language === 'en' ? spotifyProfile.descriptionEn : spotifyProfile.descriptionAr}
              </p>
              <div className="text-center">
                <a
                  href={spotifyProfile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3 text-xs tracking-widest uppercase font-mono transition-all duration-300 rounded-lg"
                  style={{
                    color: '#f0abfc',
                    border: '1px solid rgba(236,72,153,0.5)',
                    background: 'rgba(236,72,153,0.1)',
                    textShadow: '0 0 10px rgba(236,72,153,0.4)',
                  }}
                >
                  <PlayIcon color="#f0abfc" />
                  {language === 'en' ? 'LAUNCH SPOTIFY' : 'تشغيل الحساب'}
                </a>
              </div>
            </div>
          </motion.div>
        )}

        {/* ============ VIDEOS / CLIPS ============ */}
        {activeTab === 'videos' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {musicVideos.map((video, idx) => (
              <motion.button
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -6 }}
                className="group text-left rounded-xl p-4 border relative overflow-hidden transition-all duration-300 cursor-pointer"
                style={{
                  background: 'linear-gradient(160deg, rgba(15,10,20,0.85), rgba(6,4,10,0.95))',
                  borderColor: `${video.color}33`,
                }}
              >
                <span className="absolute top-2 left-2 w-2.5 h-2.5 border-l border-t" style={{ borderColor: `${video.color}66` }} />
                <span className="absolute top-2 right-2 w-2.5 h-2.5 border-r border-t" style={{ borderColor: `${video.color}66` }} />
                <span className="absolute bottom-2 left-2 w-2.5 h-2.5 border-l border-b" style={{ borderColor: `${video.color}66` }} />
                <span className="absolute bottom-2 right-2 w-2.5 h-2.5 border-r border-b" style={{ borderColor: `${video.color}66` }} />

                <div className="relative mb-3 rounded-md overflow-hidden border" style={{ borderColor: `${video.color}33` }}>
                  <img
                    src={video.thumbnail}
                    alt={video.titleEn}
                    className="w-full h-40 object-cover opacity-75 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'rgba(0,0,0,0.4)' }}>
                    <div className="w-12 h-12 rounded-full border flex items-center justify-center" style={{ borderColor: video.color, background: `${video.color}22` }}>
                      <PlayIcon color={video.color} />
                    </div>
                  </div>
                  <div
                    className="absolute bottom-1 left-1 px-2 py-0.5 text-[9px] tracking-widest uppercase font-mono rounded"
                    style={{ color: video.color, background: 'rgba(0,0,0,0.85)', border: `1px solid ${video.color}55` }}
                  >
                    {language === 'en' ? video.vibeEn : video.vibeAr}
                  </div>
                </div>

                <h3 className="text-[#f4efe2] font-serif text-sm tracking-wide mb-1 truncate">
                  {language === 'en' ? video.titleEn : video.titleAr}
                </h3>
                <p className="text-purple-400/70 text-[10px] uppercase tracking-widest font-mono mb-3">{video.artist}</p>
                <p className="text-[#c7beaa]/70 text-[11px] leading-relaxed line-clamp-3 font-light">
                  {language === 'en' ? video.descriptionEn : video.descriptionAr}
                </p>
                <div className="mt-3 text-[9px] tracking-widest text-right font-mono flex items-center justify-end gap-1" style={{ color: video.color }}>
                  <PlayIcon color={video.color} />
                  {language === 'en' ? 'READ & WATCH' : 'اقرأ وشاهد'}
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* ============ MY SONGS ============ */}
        {activeTab === 'songs' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mx-auto text-center"
          >
            <div
              className="rounded-2xl p-8 border relative overflow-hidden"
              style={{
                background: 'linear-gradient(160deg, rgba(20,10,25,0.85), rgba(8,4,14,0.95))',
                borderColor: 'rgba(236,72,153,0.35)',
                borderStyle: 'dashed',
              }}
            >
              <div className="flex justify-center mb-5">
                <LockIcon color="#ec4899" />
              </div>
              <h3
                className="text-base tracking-widest uppercase mb-3 font-serif"
                style={{ color: '#f0abfc', textShadow: '0 0 15px rgba(236,72,153,0.5)' }}
              >
                {language === 'en' ? 'TRANSMISSION LOCKED' : 'الإرسال مُغلق'}
              </h3>
              <p className="text-[#c7beaa]/80 text-sm leading-relaxed bg-purple-950/20 p-4 rounded-lg border border-purple-900/30 italic font-light">
                {language === 'en'
                  ? 'I will publish them sooner. Tracks are currently offline, undergoing calibration within the void.'
                  : 'سأقوم بنشرهم قريباً جداً. الأغاني حالياً غير متصلة بالشبكة وتخضع للمعايرة.'}
              </p>
              <div className="mt-4 text-[9px] text-purple-400 tracking-widest uppercase font-mono">
                [ status: unreleased // writing phase ]
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* ============ MODAL ============ */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border p-7"
              style={{
                background: 'linear-gradient(180deg, #0e0818, #04020d)',
                borderColor: `${selectedVideo.color}88`,
                boxShadow: `0 0 40px ${selectedVideo.color}44`,
              }}
            >
              <span className="absolute top-2 left-2 w-3 h-3 border-l border-t" style={{ borderColor: `${selectedVideo.color}88` }} />
              <span className="absolute top-2 right-2 w-3 h-3 border-r border-t" style={{ borderColor: `${selectedVideo.color}88` }} />
              <span className="absolute bottom-2 left-2 w-3 h-3 border-l border-b" style={{ borderColor: `${selectedVideo.color}88` }} />
              <span className="absolute bottom-2 right-2 w-3 h-3 border-r border-b" style={{ borderColor: `${selectedVideo.color}88` }} />

              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 opacity-60 hover:opacity-100 transition-opacity"
                aria-label="close"
              >
                <CloseIcon color="#f0abfc" />
              </button>

              <div className="mb-5">
                <h2
                  className="text-lg font-serif tracking-widest uppercase mb-1"
                  style={{ color: selectedVideo.color, textShadow: `0 0 15px ${selectedVideo.color}88` }}
                >
                  {language === 'en' ? selectedVideo.titleEn : selectedVideo.titleAr}
                </h2>
                <p className="text-purple-400/70 text-xs font-mono">{selectedVideo.artist}</p>
                <div
                  className="inline-block mt-2 px-2.5 py-0.5 text-[9px] tracking-widest uppercase font-mono rounded"
                  style={{ color: selectedVideo.color, background: `${selectedVideo.color}15`, border: `1px solid ${selectedVideo.color}55` }}
                >
                  {language === 'en' ? selectedVideo.vibeEn : selectedVideo.vibeAr}
                </div>
              </div>

              <div className="rounded-lg p-4 mb-5 border" style={{ background: 'rgba(0,0,0,0.4)', borderColor: `${selectedVideo.color}33` }}>
                <p className="text-[#c7beaa]/90 text-sm leading-relaxed whitespace-pre-line font-light">
                  {language === 'en' ? selectedVideo.descriptionEn : selectedVideo.descriptionAr}
                </p>
              </div>

              <a
                href={selectedVideo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-xs tracking-widest uppercase font-mono transition-all duration-300"
                style={{
                  color: selectedVideo.color,
                  border: `1px solid ${selectedVideo.color}88`,
                  background: `${selectedVideo.color}15`,
                  textShadow: `0 0 10px ${selectedVideo.color}66`,
                }}
              >
                <PlayIcon color={selectedVideo.color} />
                {language === 'en' ? 'WATCH ON YOUTUBE' : 'شاهد على يوتيوب'}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============ FOOTER ============ */}
      <div className="relative z-10 text-center py-12">
        <p className="text-purple-500/30 text-[9px] tracking-widest font-mono inline-block px-4 py-1 border border-purple-950/20">
          [ PIXEL_MATRIX v1.2 — LILITH ]
        </p>
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; transform: scale(0.9); }
          50% { opacity: 0.9; transform: scale(1.15); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(4deg); }
        }
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}
