'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

// --- TRANSLATIONS ---
const CONTENT = {
  en: {
    back: '← BACK TO ECLIPSE',
    title: "WELCOME TO MY SERVICES",
    subtitle: 'A space for the work we do together.',
    intro: 'Each space holds a different purpose — one is a gift, the other is my work.',
    visit: 'Enter →',
    websites: [
      {
        id: 'release-sanctuary',
        title: 'THE RELEASE SANCTUARY (MY GIFT TO YOU)',
        subtitle: 'Write it. Feel it. Release it. Return to yourself.',
        description: 'This is my gift to all of you — a completely free, safe space created with love. Inside, you will find a private room where you can write absolutely anything and then burn your letter to release it. You can talk to an AI therapist, explore guided journaling, and listen to my hypnosis recordings. Nothing here costs a thing. It is simply a sanctuary where you don\'t have to explain everything, don\'t have to be okay, and don\'t have to hold everything together alone.',
        url: 'https://lilithseclipse-sanctuary.vercel.app/',
        tags: ['Free Gift', 'Safe Space', 'AI Therapist', 'Burn Letters', 'Hypnosis'],
      },
      {
        id: 'services',
        title: "LILITH'S ECLIPSE SERVICES",
        subtitle: 'Sessions • Personal Consultations • Customised Recordings.',
        description: 'This is where you can work with me directly. I offer one-on-one sessions, personal consultations, and custom hypnosis recordings tailored to your specific needs. Unlike the free sanctuary, these services require my personal time, focus, effort, and direct involvement — and therefore they are paid. I am a person, not a machine. My time and energy have value, and these sessions are designed for those ready to invest in their own inner work with me.',
        url: 'https://lilithseclipse-services.pages.dev/',
        tags: ['Paid Services', '1-on-1 Sessions', 'Consultations', 'Custom Hypnosis'],
      },
    ],
    footer: 'Everything has its time and its place.',
  },
  ar: {
    back: '← العودة إلى الكسوف',
    title: 'مرحباً بكم في خدماتي',
    subtitle: 'مساحة للعمل الذي نقوم به معاً.',
    intro: 'كل مساحة لها غرض مختلف — إحداهما هدية، والأخرى هي عملي.',
    visit: 'ادخل ←',
    websites: [
      {
        id: 'release-sanctuary',
        title: 'ملاذ التحرر (هديتي إليكم)',
        subtitle: 'اكتبيها. اشعري بها. أطلقيها. عودي إلى نفسك.',
        description: 'هذه هديتي لكم جميعاً — مساحة آمنة ومجانية تماماً، صنعتها بحب. ستجدين في الداخل غرفة خاصة يمكنك فيها كتابة أي شيء ثم حرق رسالتك للتخلص منها. يمكنك التحدث مع معالج نفسي بالذكاء الاصطناعي، واستكشاف التدوين الموجه، والاستماع إلى تسجيلات التنويم الإيحائي الخاصة بي. لا شيء هنا يكلف شيئاً. إنه ببساطة ملاذ حيث لا تحتاجين إلى شرح كل شيء، ولا تحتاجين إلى أن تكوني بخير، ولا تحتاجين إلى حمل كل شيء وحدك.',
        url: 'https://lilithseclipse-sanctuary.vercel.app/',
        tags: ['هدية مجانية', 'مساحة آمنة', 'معالج AI', 'حرق الرسائل', 'تنويم إيحائي'],
      },
      {
        id: 'services',
        title: 'خدمات ليليث إكليبس',
        subtitle: 'جلسات • تشخيص شخصي • تسجيلات مخصصة.',
        description: 'هنا يمكنك العمل معي مباشرة. أقدم جلسات فردية، واستشارات شخصية، وتسجيلات تنويم إيحائي مخصصة تُصمم خصيصاً لاحتياجاتك. على عكس الملاذ المجاني، تتطلب هذه الخدمات وقتي الشخصي وتركيزي ومجهودي ومشاركتي المباشرة — وبالتالي فهي مدفوعة. أنا إنسانة، ولست آلة. وقتي وطاقتي لهما قيمة، وهذه الجلسات مصممة لمن هن مستعدات للاستثمار في عمقهن الداخلي معي.',
        url: 'https://lilithseclipse-services.pages.dev/',
        tags: ['خدمات مدفوعة', 'جلسات فردية', 'استشارات', 'تنويم مخصص'],
      },
    ],
    footer: 'كل شيء له وقته ومكانه.',
  },
}

// --- STARRY SKY BACKGROUND ---
function StarrySkyBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#0a1e3f] to-[#020617]" />
      
      <div className="absolute top-[20%] left-[15%] w-[60vw] h-[60vw] rounded-full bg-[#1e3a8a]/20 blur-[120px] animate-[pulse_10s_ease-in-out_infinite]" />
      <div className="absolute bottom-[10%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-[#0ea5e9]/10 blur-[120px] animate-[pulse_12s_ease-in-out_infinite]" style={{ animationDelay: '3s' }} />
      
      {[...Array(80)].map((_, i) => {
        const size = Math.random() * 2 + 0.5
        const left = Math.random() * 100
        const top = Math.random() * 100
        const delay = Math.random() * 5
        const duration = 2 + Math.random() * 4
        return (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-[twinkle_4s_ease-in-out_infinite]"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${left}%`,
              top: `${top}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              boxShadow: `0 0 ${size * 3}px rgba(255,255,255,0.8)`,
            }}
          />
        )
      })}
      
      {[...Array(15)].map((_, i) => {
        const size = Math.random() * 2 + 1.5
        const left = Math.random() * 100
        const top = Math.random() * 100
        const delay = Math.random() * 6
        return (
          <div
            key={`neon-${i}`}
            className="absolute rounded-full bg-[#38bdf8] animate-[twinkle_5s_ease-in-out_infinite]"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${left}%`,
              top: `${top}%`,
              animationDelay: `${delay}s`,
              boxShadow: `0 0 ${size * 6}px #38bdf8, 0 0 ${size * 12}px #0ea5e9`,
            }}
          />
        )
      })}
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_rgba(2,6,23,0.9)_100%)]" />
    </div>
  )
}

export default function ServicesPage() {
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const t = CONTENT[lang]
  const isRTL = lang === 'ar'

  return (
    <div className={`relative min-h-screen text-white overflow-hidden ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      
      <StarrySkyBackground />

      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>

      {/* NAV */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-6 flex justify-between items-center">
        <Link href="/space" className="text-[10px] tracking-[0.3em] uppercase text-[#38bdf8]/70 hover:text-[#38bdf8] transition-colors">
          {t.back}
        </Link>
        <button 
          onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} 
          className="text-[10px] tracking-[0.3em] uppercase text-[#38bdf8]/70 hover:text-[#38bdf8] transition-colors border border-[#38bdf8]/30 hover:border-[#38bdf8] rounded-full px-4 py-2"
        >
          {lang === 'en' ? 'العربية' : 'English'}
        </button>
      </div>

      {/* HERO */}
      <section className="relative z-10 text-center pt-24 pb-12 px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <h1 className="font-serif text-4xl md:text-6xl tracking-[0.2em] text-white mb-4" style={{ textShadow: '0 0 40px rgba(56,189,248,0.5), 0 0 80px rgba(56,189,248,0.3)' }}>
            {t.title}
          </h1>
          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#38bdf8] to-transparent mx-auto my-8" />
          <p className="text-[#bae6fd] italic text-lg mb-2">{t.subtitle}</p>
          <p className="text-[#94a3b8] text-sm">{t.intro}</p>
        </motion.div>
      </section>

      {/* WEBSITE CARDS */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pb-24 space-y-8">
        {t.websites.map((site, i) => (
          <motion.div
            key={site.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            className="group relative border border-[#38bdf8]/20 rounded-2xl p-8 md:p-10 bg-gradient-to-br from-[#0a1e3f]/60 to-[#020617]/80 backdrop-blur-sm hover:border-[#38bdf8]/60 transition-all duration-500 hover:shadow-[0_0_60px_rgba(56,189,248,0.2)]"
          >
            {/* Corner ornaments */}
            <span className="absolute top-3 left-3 w-4 h-4 border-l border-t border-[#38bdf8]/40" />
            <span className="absolute top-3 right-3 w-4 h-4 border-r border-t border-[#38bdf8]/40" />
            <span className="absolute bottom-3 left-3 w-4 h-4 border-l border-b border-[#38bdf8]/40" />
            <span className="absolute bottom-3 right-3 w-4 h-4 border-r border-b border-[#38bdf8]/40" />

            <h2 className="font-serif text-2xl md:text-3xl tracking-[0.15em] text-[#38bdf8] mb-3" style={{ textShadow: '0 0 20px rgba(56,189,248,0.4)' }}>
              {site.title}
            </h2>
            <p className="text-white italic mb-4">{site.subtitle}</p>
            <p className="text-[#94a3b8] leading-relaxed mb-6">{site.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {site.tags.map((tag) => (
                <span key={tag} className="text-[10px] tracking-[0.2em] uppercase text-[#38bdf8]/80 border border-[#38bdf8]/30 rounded-full px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <a
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 text-xs tracking-[0.3em] uppercase border border-[#38bdf8] text-[#38bdf8] rounded-full hover:bg-[#38bdf8]/10 transition-all duration-500"
              style={{ boxShadow: '0 0 20px rgba(56,189,248,0.2)' }}
            >
              {t.visit}
            </a>
          </motion.div>
        ))}
      </section>

      {/* FOOTER */}
      <div className="relative z-10 text-center pb-16">
        <p className="text-[#94a3b8] text-xs tracking-wider italic mb-4">{t.footer}</p>
        <span className="text-[#38bdf8]/40 text-2xl">✦</span>
      </div>
    </div>
  )
}
