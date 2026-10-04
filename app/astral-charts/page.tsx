'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

export default function AstralChartsPage() {
  const router = useRouter()
  const { language, toggleLanguage } = useLanguage()

  return (
    <div className="min-h-screen bg-[#070913] text-[#f4efe2] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(35,21,60,0.35),transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-md text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1
            className="font-serif text-4xl md:text-5xl tracking-[0.25em] text-[#e6ca95] mb-6"
            style={{ textShadow: '0 0 40px rgba(184,144,71,0.4)' }}
          >
            {language === 'en' ? 'ASTRAL CHARTS' : 'الخرائط الفلكية'}
          </h1>

          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#b89047]/40 to-transparent mx-auto my-8" />

          <p className="text-[#94a3b8] italic mb-12">
            {language === 'en'
              ? 'This space is being prepared.'
              : 'هذه المساحة قيد الإعداد.'}
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => router.push('/space')}
              className="px-6 py-3 text-xs tracking-[0.3em] uppercase border border-[#38bdf8]/40 text-[#38bdf8] rounded-full hover:bg-[#38bdf8]/10 transition-all duration-500"
            >
              {language === 'en' ? '← Return to Space' : '← العودة إلى الفضاء'}
            </button>

            <button
              onClick={toggleLanguage}
              className="px-6 py-3 text-xs tracking-[0.3em] uppercase border border-[#b89047]/30 text-[#c7beaa] rounded-full hover:border-[#b89047]/60 hover:text-[#f4efe2] transition-all duration-500"
            >
              {language === 'en' ? 'العربية' : 'English'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}