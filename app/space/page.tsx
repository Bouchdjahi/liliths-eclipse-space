"use client";

import CosmicBackground from "../components/CosmicBackground";
import CosmicUniverse from "../components/sections/CosmicUniverse";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion";

export default function SpacePage() {
  const { language, toggleLanguage } = useLanguage();
  const title = language === "en" ? "LILITH'S SPACE" : "فضاء ليليث";

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <CosmicBackground />

      <motion.button
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.5 }}
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
        {language === "en" ? "العربية" : "English"}
      </motion.button>

      <div className="absolute top-6 inset-x-0 z-30 flex justify-center pointer-events-none">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.2 }}
          className="text-2xl md:text-5xl tracking-[0.3em] text-white text-center select-none"
          style={{
            fontFamily: "'Cinzel Decorative', serif",
            textShadow: `
              0 0 25px rgba(74, 140, 255, 0.55),
              0 0 60px rgba(2, 62, 138, 0.35)
            `,
          }}
        >
          {title}
        </motion.h1>
      </div>

      <div className="absolute inset-x-0 bottom-0 top-[110px] z-20 flex items-center justify-center">
        <CosmicUniverse />
      </div>
    </main>
  );
}