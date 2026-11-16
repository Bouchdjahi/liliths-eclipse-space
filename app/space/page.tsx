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
          {/* ALCHEMY */}
          <section className="space-y-6">
            <h2 className="font-display text-2xl md:text-3xl tracking-[0.1em] text-white mb-6 text-center drop-shadow-md">{t.alchemyTitle}</h2>
            <p className="text-silver/80 leading-relaxed">{t.alchemyP1}</p>
            <p className="text-silver/80 leading-relaxed">{t.alchemyP2}</p>
          </section>

          {/* ACADEMIC */}
          <section className="space-y-6">
            <h2 className="font-display text-2xl md:text-3xl tracking-[0.1em] text-white mb-6 drop-shadow-md">{t.academicTitle}</h2>
            <p className="text-silver/80 leading-relaxed">{t.academicP1}</p>
            <p className="text-silver/80 leading-relaxed">{t.academicP2}</p>
            <p className="text-silver/80 leading-relaxed">{t.academicP3}</p>
            <p className="text-silver/80 leading-relaxed">{t.academicP4}</p>
          </section>

          {/* NOW */}
          <section className="space-y-6">
            <h2 className="font-display text-2xl md:text-3xl tracking-[0.1em] text-white mb-6 drop-shadow-md">{t.nowTitle}</h2>
            <p className="text-silver/80 leading-relaxed">{t.nowP1}</p>
            <p className="text-silver/80 leading-relaxed">{t.nowP2}</p>
          </section>

          {/* INTERESTS */}
          <section className="space-y-6">
            <h2 className="font-display text-2xl md:text-3xl tracking-[0.1em] text-white mb-6 text-center drop-shadow-md">{t.interestsTitle}</h2>
            <p className="text-silver/80 leading-relaxed text-center max-w-2xl mx-auto">{t.interestsP1}</p>
            <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto mt-6">
              {['Shadow Work','Psychology','Forensic Psychology','Human Behaviour','Neuroscience','Philosophy','Astrology','Mythology','Astronomy','Spirituality','Tarot','Meditation','Dreams','Ancient Symbols','Cultures & Languages','Technology & AI','Art & Music','Storytelling','Body Language','Horror & True Crime','Gothic Aesthetics','Dark Academia','Cosmic Aesthetics','Moon Phases','Space','Fitness','Self-Development','Animals','Parallel-Universe Theories'].map((interest) => (
                <span key={interest} className="px-3 py-1.5 text-[10px] tracking-[0.15em] uppercase text-silver/80 border border-silver/20 rounded-full hover:border-sovereign/60 hover:text-white hover:bg-obsidian/60 transition-all duration-300">
                  {interest}
                </span>
              ))}
            </div>
          </section>

          {/* AESTHETIC */}
          <section className="space-y-6 border border-silver/20 rounded-lg p-8 bg-obsidian/50 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blood/15 blur-[50px] rounded-full pointer-events-none" />
            <h2 className="font-display text-2xl md:text-3xl tracking-[0.1em] text-white mb-6 text-center drop-shadow-md">{t.aestheticTitle}</h2>
            <p className="text-silver/80 leading-relaxed text-center">{t.aestheticP1}</p>
            <p className="text-silver/80 leading-relaxed text-center">{t.aestheticP2}</p>
            <p className="text-silver/80 leading-relaxed text-center">{t.aestheticP3}</p>
          </section>

          {/* ANIMALS */}
          <section className="space-y-6">
            <h2 className="font-display text-2xl md:text-3xl tracking-[0.1em] text-white mb-6 text-center drop-shadow-md">{t.animalsTitle}</h2>
            <p className="text-silver/80 leading-relaxed text-center max-w-2xl mx-auto">{t.animalsP1}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {[
                { emoji: '🐍', name: 'The Snake', title: 'Transformation', desc: 'The snake represents transformation, rebirth and hidden wisdom.' },
                { emoji: '🦉', name: 'The Owl', title: 'Insight', desc: 'The owl represents intuition, observation and seeing what others overlook.' },
                { emoji: '🐦‍⬛', name: 'The Raven', title: 'Shadow', desc: 'The raven represents mystery, the unconscious and transformation through darkness.' },
                { emoji: '🐆', name: 'The Black Jaguar', title: 'Protection', desc: 'The black jaguar represents strength, courage, protection and mastery of the shadow.' },
                { emoji: '🦅', name: 'The Eagle', title: 'Higher Perspective', desc: 'The eagle represents freedom, independence, vision and the ability to see the larger picture.' },
              ].map((animal, i) => (
                <div key={i} className="border border-silver/20 rounded-lg p-6 bg-obsidian/50 backdrop-blur-sm hover:border-sovereign/60 transition-all duration-500 group">
                  <div className="text-3xl mb-3">{animal.emoji}</div>
                  <p className="text-sovereign/80 text-[10px] tracking-[0.3em] uppercase mb-1 group-hover:text-sovereign transition-colors">{animal.title}</p>
                  <h4 className="font-display text-xl text-white mb-2">{animal.name}</h4>
                  <p className="text-silver/70 text-sm leading-relaxed">{animal.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* COSMIC BLUEPRINT */}
          <section className="space-y-6">
            <h2 className="font-display text-2xl md:text-3xl tracking-[0.1em] text-white mb-6 text-center drop-shadow-md">{t.cosmicTitle}</h2>
            <p className="text-silver/80 leading-relaxed text-center">{t.cosmicP1}</p>
            <div className="border border-silver/20 rounded-lg overflow-hidden bg-obsidian/50 backdrop-blur-sm max-w-md mx-auto mt-6">
              {[
                { sign: 'Rising', value: 'Leo' }, { sign: 'Sun', value: 'Taurus' }, { sign: 'Moon', value: 'Libra' },
                { sign: 'Venus', value: 'Gemini' }, { sign: 'Mercury', value: 'Aries' }, { sign: 'Mars', value: 'Scorpio' },
                { sign: 'Lilith', value: 'Scorpio' }, { sign: 'Personality', value: 'INTJ-T' }
              ].map((item, i, arr) => (
                <div key={item.sign} className={`flex items-center justify-between px-6 py-4 ${i !== arr.length - 1 ? 'border-b border-silver/10' : ''}`}>
                  <span className="text-silver/60 text-[10px] tracking-[0.3em] uppercase">{item.sign}</span>
                  <span className="font-display text-lg text-sovereign drop-shadow-sm">{item.value}</span>
                </div>
              ))}
            </div>
          </section>

          {/* LANGUAGES */}
          <section className="space-y-6">
            <h2 className="font-display text-2xl md:text-3xl tracking-[0.1em] text-white mb-6 text-center drop-shadow-md">{t.languagesTitle}</h2>
            <p className="text-silver/80 leading-relaxed text-center">{t.languagesP1}</p>
            <p className="text-silver/80 leading-relaxed text-center">{t.languagesP2}</p>
          </section>

          {/* CHARACTERS */}
          <section className="space-y-6">
            <h2 className="font-display text-2xl md:text-3xl tracking-[0.1em] text-white mb-6 text-center drop-shadow-md">{t.charactersTitle}</h2>
            <p className="text-silver/80 leading-relaxed">{t.charactersP1}</p>
            <p className="text-silver/80 leading-relaxed">{t.charactersP2}</p>
          </section>

          {/* PERSONAL */}
          <section className="space-y-6 border border-silver/20 rounded-lg p-8 bg-obsidian/50 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-siren/15 blur-[60px] rounded-full pointer-events-none" />
            <h2 className="font-display text-2xl md:text-3xl tracking-[0.1em] text-white mb-6 drop-shadow-md">{t.personalTitle}</h2>
            <p className="text-silver/80 leading-relaxed">{t.personalP1}</p>
            <p className="text-silver/80 leading-relaxed font-medium text-white">{t.personalP2}</p>
          </section>

          {/* BUILD */}
          <section className="space-y-6">
            <h2 className="font-display text-2xl md:text-3xl tracking-[0.1em] text-white mb-6 drop-shadow-md">{t.buildTitle}</h2>
            <p className="text-silver/80 leading-relaxed">{t.buildP1}</p>
            <p className="text-silver/80 leading-relaxed">{t.buildP2}</p>
          </section>

          {/* WHY LILITH */}
          <section className="space-y-6 text-center border-t border-silver/20 pt-16">
            <h2 className="font-display text-3xl md:text-4xl tracking-[0.1em] text-white mb-8 drop-shadow-md">{t.whyTitle}</h2>
            <p className="text-silver/80 leading-relaxed">{t.whyP1}</p>
            <p className="text-silver/80 leading-relaxed">{t.whyP2}</p>
            <p className="text-silver/80 leading-relaxed">{t.whyP3}</p>
            <p className="text-silver/80 leading-relaxed">{t.whyP4}</p>
            <p className="font-display text-xl text-white italic mt-8 drop-shadow-md">{t.whyFinal}</p>
            <p className="text-silver/70 leading-relaxed italic">{t.whyFinalP}</p>
          </section>

      <div className="absolute inset-x-0 bottom-0 top-[110px] z-20 flex items-center justify-center">
        <CosmicUniverse />
        </div>
      </div>
    </main>
  );
}
