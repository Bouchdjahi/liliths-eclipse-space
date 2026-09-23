'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

interface GatewayEntranceProps {
  onEnter: () => void;
}

export default function GatewayEntrance({ onEnter }: GatewayEntranceProps) {
  const { language, toggleLanguage } = useLanguage();

  const content = {
    en: {
      titleLine1: 'Lilith',
      titleLine2: 'Eclipse',
      quote1: 'From Corpse. to Ashes. to Shadow.',
      quote2: 'this is my journey',
      button: 'ENTER THE ECLIPSE',
    },
    ar: {
      titleLine1: 'ليليث',
      titleLine2: 'إكليبس',
      quote1: 'من الجسد. إلى الرماد. إلى الظل.',
      quote2: 'هذه رحلتي',
      button: 'ادخل إلى الكسوف',
    },
  };

  const c = content[language];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent overflow-hidden">
      {/* Language Toggle */}
      <motion.button
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 1.5 }}
        onClick={toggleLanguage}
        className="
          absolute top-6 right-6 z-50
          px-4 py-2 rounded-full
          border border-[#4A8CFF]/40
          bg-[#010712]/70 backdrop-blur-md
          text-[#6d94c9] text-xs tracking-widest
          transition-all duration-700
          hover:border-[#4A8CFF]
          hover:text-[#9ab9e6]
          hover:bg-[#4A8CFF]/10
        "
        style={{ fontFamily: "'Cinzel', serif" }}
      >
        {language === 'en' ? 'العربية' : 'English'}
      </motion.button>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-6 w-full max-w-5xl">
        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.0, ease: 'easeOut' }}
          className="flex flex-col items-center"
        >
          {/* LILITH — clearer, engraved look */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, delay: 0.2 }}
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              color: '#7ea3d9', // soft blue-gray — visible & engraved
              textShadow: `
                0 0 6px rgba(140, 190, 255, 0.55),
                0 0 20px rgba(74, 140, 255, 0.25),
                0 2px 10px rgba(0, 0, 0, 0.95)
              `,
            }}
            className="text-6xl md:text-7xl lg:text-8xl tracking-[0.16em] font-medium leading-none select-none"
          >
            {c.titleLine1}
          </motion.h1>

          {/* ECLIPSE — #023e8a with a soft blue glow */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, delay: 0.5 }}
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              color: '#023e8a',
              textShadow: `
                0 0 25px rgba(74, 140, 255, 0.65),
                0 0 60px rgba(2, 62, 138, 0.30)
              `,
            }}
            className="text-6xl md:text-7xl lg:text-8xl tracking-[0.14em] font-medium leading-none mt-2 select-none"
          >
            {c.titleLine2}
          </motion.h1>
        </motion.div>

        {/* QUOTE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 1.0 }}
          className="mt-12 md:mt-14 max-w-2xl"
        >
          {/* Line 1 — subtle light gray, larger for weight */}
          <p
            className="text-[16px] md:text-[22px] text-slate-300/90 italic leading-relaxed tracking-[0.06em]"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            &ldquo;{c.quote1}&rdquo;
          </p>

          {/* Line 2 — restrained blue glow */}
          <p
            className="mt-3 text-[14px] md:text-[18px] italic leading-relaxed tracking-[0.08em]"
            style={{
              fontFamily: "'Cinzel', serif",
              color: '#4A8CFF',
              textShadow: '0 0 14px rgba(74, 140, 255, 0.5)',
            }}
          >
            {c.quote2}
          </p>
        </motion.div>

        {/* ENTER THE ECLIPSE BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 1.5 }}
          className="relative mt-14 md:mt-16"
        >
          <motion.button
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.8 }}
            onClick={onEnter}
            style={{ fontFamily: "'Cinzel Decorative', serif" }}
            className="
              group relative overflow-visible
              min-w-[270px] md:min-w-[340px]
              px-10 py-5
              bg-[#010712]/85
              border border-[#023e8a]/55
              text-[#5c82b4]
              tracking-[0.20em] text-xs md:text-sm
              backdrop-blur-md
              transition-all duration-700
              hover:border-[#4A8CFF]
              hover:text-[#9ab9e6]
              hover:bg-[#4A8CFF]/[0.08]
              hover:shadow-[0_0_35px_rgba(74,140,255,0.3)]
            "
          >
            <span className="absolute -top-[5px] -left-[5px] w-3 h-3 border-l border-t border-[#4A8CFF]/60 transition-colors duration-700 group-hover:border-[#4A8CFF]" />
            <span className="absolute -top-[5px] -right-[5px] w-3 h-3 border-r border-t border-[#4A8CFF]/60 transition-colors duration-700 group-hover:border-[#4A8CFF]" />
            <span className="absolute -bottom-[5px] -left-[5px] w-3 h-3 border-l border-b border-[#4A8CFF]/60 transition-colors duration-700 group-hover:border-[#4A8CFF]" />
            <span className="absolute -bottom-[5px] -right-[5px] w-3 h-3 border-r border-b border-[#4A8CFF]/60 transition-colors duration-700 group-hover:border-[#4A8CFF]" />

            <span className="absolute inset-[5px] border border-[#4A8CFF]/15 pointer-events-none" />

            <span className="relative z-10 flex items-center justify-center gap-4">
              <span className="text-[#4A8CFF]/60 group-hover:text-[#4A8CFF] transition-colors duration-700">
                ◈
              </span>
              <span>{c.button}</span>
              <span className="text-[#4A8CFF]/60 group-hover:text-[#4A8CFF] transition-colors duration-700">
                ◈
              </span>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
