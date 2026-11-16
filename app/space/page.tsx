'use client'

import Link from 'next/link'

export default function WhoIsLilithPage() {
  const interests = [
    'Shadow Work', 'Psychology', 'Forensic Psychology', 'Philosophy',
    'Human Behaviour', 'Neuroscience', 'Emotional Intelligence', 'Body Language',
    'Self-Improvement', 'Storytelling', 'Mythology', 'Ancient Civilisations',
    'Ancient Greek Culture', 'Japanese Culture', 'Cultures & Languages', 'Astronomy',
    'Astrology', 'Birth Charts', 'Tarot', 'Dream Meanings', 'Lucid Dreaming',
    'Meditation', 'Energy Healing', 'Manifestation', 'Symbolism', 'Ancient Symbols',
    'Moon Phases', 'Energy Frequencies', 'Mystery', 'Horror', 'True Crime',
    'Documentaries', 'Technology', 'AI', 'Art', 'Music', 'Gothic Aesthetics',
    'Dark Academia', 'Cosmic Aesthetics', 'Vintage Aesthetics', 'Space', 'Animals',
    'Parallel-Universe Theories', 'Hidden Meanings in Films and Music'
  ]

  const archetypes = [
    {
      name: 'Snake',
      title: 'Transformation',
      description: 'Shedding, rebirth and hidden wisdom. Reflects my relationship with transformation, shadow work, and the continuous process of becoming someone new.',
    },
    {
      name: 'Owl',
      title: 'Insight',
      description: 'Intuition, observation, and the ability to notice what exists beneath the obvious.',
    },
    {
      name: 'Raven',
      title: 'The Shadow',
      description: 'Mystery, the unconscious, and the willingness to explore the darker parts of existence rather than turning away.',
    },
    {
      name: 'Black Jaguar',
      title: 'Protection',
      description: 'Strength, courage, instinct, and the ability to move through darkness without allowing it to consume you.',
    },
    {
      name: 'Eagle',
      title: 'Perspective',
      description: 'Freedom, independence, and the ability to step away from the details and see the larger picture.',
    },
  ]

  const chart = [
    { sign: 'Rising', value: 'Leo' },
    { sign: 'Sun', value: 'Taurus' },
    { sign: 'Moon', value: 'Virgo' },
    { sign: 'Venus', value: 'Gemini' },
    { sign: 'Mercury', value: 'Aries' },
    { sign: 'Mars', value: 'Scorpio' },
    { sign: 'Lilith', value: 'Scorpio' },
  ]

  return (
    <div className="min-h-screen bg-[#020308] text-[#f8f9fa] font-nav">
      
      {/* Back Link */}
      <div className="fixed top-6 left-6 z-50">
        <Link 
          href="/space" 
          className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#8892a0] hover:text-[#4a8cff] transition-colors bg-[#020308]/70 backdrop-blur-sm px-4 py-2 rounded-full border border-[#4a8cff]/20"
        >
          ← Back to Eclipse
        </Link>
      </div>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#060a20]/60 to-transparent pointer-events-none" />
        <h1 className="font-display text-5xl md:text-7xl tracking-[0.15em] mb-6 relative">
          WHO IS LILITH?
        </h1>
        <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#4a8cff] to-transparent mx-auto mb-6" />
        <p className="text-[#8892a0] text-[10px] md:text-xs tracking-[0.4em] uppercase">
          Explore the cosmic being
        </p>
      </section>

      {/* Intro */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <div className="text-center mb-12">
          <p className="font-display text-2xl md:text-3xl tracking-[0.05em] text-[#f8f9fa] italic mb-4">
            &quot;Lilith is not my real name.&quot;
          </p>
          <p className="text-[#8892a0] text-sm leading-relaxed max-w-2xl mx-auto">
            It is the name I chose to share with the world whilst keeping my real name private. 
            For me, privacy is not distance. It is a boundary that allows some parts of me to remain mine.
          </p>
        </div>
      </section>

      {/* About Me */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <h2 className="font-display text-3xl md:text-4xl tracking-[0.1em] mb-8 text-center">
          The Person Behind Lilith&apos;s Eclipse
        </h2>
        
        <div className="space-y-6 text-[#c9c9d1] text-base leading-relaxed">
          <p>
            I am <span className="text-[#4a8cff]">Algerian</span>, currently living in Algeria, with <span className="text-[#4a8cff]">Turkish heritage</span>. 
            I am in my late twenties, and my journey has never belonged to a single field.
          </p>
          <p>
            I began academically with a <span className="text-[#f8f9fa] font-medium">Technical Mathematics Baccalaureate, specialising in Civil Engineering</span>, 
            before taking a completely different direction and completing a <span className="text-[#f8f9fa] font-medium">Master&apos;s degree in English Linguistics</span>.
          </p>
          <p>
            Alongside my formal education, I have developed a strong interest in <span className="text-[#f8f9fa] font-medium">psychology, particularly abnormal psychology and forensic psychology</span>, 
            including the study of criminal behaviour and the psychological factors that may influence it.
          </p>
          <p className="text-center font-display text-xl md:text-2xl text-[#4a8cff] italic py-6">
            &quot;What makes us who we are beneath the surface?&quot;
          </p>
          <p>
            That question eventually led me towards technology as well. I have a background in <span className="text-[#f8f9fa] font-medium">web development</span>, 
            and I am currently developing my knowledge of <span className="text-[#f8f9fa] font-medium">programming and cybersecurity</span>, 
            with the long-term goal of exploring <span className="text-[#f8f9fa] font-medium">robotics engineering</span>.
          </p>
          <p>
            Professionally, I work as an <span className="text-[#f8f9fa] font-medium">English language teacher</span>, 
            teaching in both university and private educational settings, whilst also working as a freelancer. 
            I have almost <span className="text-[#4a8cff]">four years of teaching experience</span> across different educational sectors.
          </p>
          <p>
            But education and work are only one part of who I am. Outside of them, I am someone who is constantly learning. 
            I focus on <span className="text-[#f8f9fa]">fitness and yoga</span>. I enjoy <span className="text-[#f8f9fa]">cooking</span> because I find the process calming. 
            I love <span className="text-[#f8f9fa]">reading and writing</span>, and I have recently started learning 
            <span className="text-[#f8f9fa]"> crochet</span>—still very much a beginner, but enjoying the journey.
          </p>
          <p>
            I also have a particular fascination with <span className="text-[#f8f9fa]">crime documentaries, mysteries, human behaviour, 
            and the things people tend to overlook</span>.
          </p>
        </div>
      </section>

      {/* Aesthetic */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <div className="border border-[#4a8cff]/15 rounded-lg p-8 md:p-12 bg-[#080a14]/40 backdrop-blur-sm">
          <h3 className="font-display text-2xl md:text-3xl tracking-[0.1em] mb-6 text-center">
            My Aesthetic
          </h3>
          <p className="text-[#c9c9d1] text-base leading-relaxed text-center mb-6">
            If I had to describe my aesthetic, I would probably call it <span className="text-[#4a8cff]">alternative and gothic</span>.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['Nu-Goth', 'Traditional Goth', 'Bohemian'].map((style) => (
              <span 
                key={style}
                className="px-4 py-1.5 text-[10px] tracking-[0.25em] uppercase border border-[#4a8cff]/30 text-[#4a8cff] rounded-full"
              >
                {style}
              </span>
            ))}
          </div>
          <p className="text-[#8892a0] text-sm leading-relaxed text-center italic max-w-xl mx-auto">
            &quot;I am drawn to darkness, old things, rainy weather, moonlight, cosmic imagery, ancient symbols, 
            mysterious stories, vintage objects and places that feel as though they have a history.&quot;
          </p>
          <p className="text-center font-display text-lg md:text-xl text-[#f8f9fa] italic mt-6">
            Sometimes darkness is where you notice what the light was hiding.
          </p>
        </div>
      </section>

      {/* Languages */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <h3 className="font-display text-2xl md:text-3xl tracking-[0.1em] mb-8 text-center">
          The Languages I Carry
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { name: 'Arabic', status: 'Fluent' },
            { name: 'English', status: 'Fluent' },
            { name: 'French', status: 'Fluent' },
            { name: 'Japanese', status: 'Learning' },
            { name: 'German', status: 'Learning' },
            { name: 'Italian', status: 'Learning' },
          ].map((lang) => (
            <div 
              key={lang.name}
              className="border border-[#4a8cff]/20 rounded-lg p-4 text-center bg-[#080a14]/40"
            >
              <p className="font-display text-lg text-[#f8f9fa] mb-1">{lang.name}</p>
              <p className="text-[#8892a0] text-[9px] tracking-[0.3em] uppercase">{lang.status}</p>
            </div>
          ))}
        </div>
        <p className="text-[#8892a0] text-sm leading-relaxed text-center mt-8 italic max-w-xl mx-auto">
          Languages fascinate me because learning a language is not simply learning vocabulary. 
          It is discovering another way of organising thought, emotion, culture and reality.
        </p>
      </section>

      {/* Personality */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <div className="border border-[#4a8cff]/15 rounded-lg p-8 md:p-12 bg-[#080a14]/40 backdrop-blur-sm text-center">
          <h3 className="font-display text-2xl md:text-3xl tracking-[0.1em] mb-6">
            My Personality
          </h3>
          <p className="font-display text-5xl md:text-6xl tracking-[0.15em] text-[#4a8cff] mb-6">
            INTJ-T
          </p>
          <p className="text-[#c9c9d1] text-base leading-relaxed max-w-2xl mx-auto mb-6">
            I naturally tend to observe before I speak, analyse before I accept, and question things 
            that many people simply take for granted.
          </p>
          <p className="font-display text-xl text-[#8892a0] italic">
            Perhaps that is why so many of my interests eventually lead back to the same place:
          </p>
          <p className="font-display text-2xl md:text-3xl tracking-[0.1em] text-[#f8f9fa] mt-4">
            the human being.
          </p>
        </div>
      </section>

      {/* Interests */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <h3 className="font-display text-2xl md:text-3xl tracking-[0.1em] mb-4 text-center">
          The Things That Keep My Mind Wandering
        </h3>
        <p className="text-[#8892a0] text-sm text-center mb-10 italic max-w-2xl mx-auto">
          My interests exist somewhere between psychology, philosophy, spirituality, science, technology and art.
        </p>
        <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
          {interests.map((interest) => (
            <span
              key={interest}
              className="px-3 py-1.5 text-[10px] tracking-[0.15em] uppercase text-[#8892a0] border border-[#4a8cff]/15 rounded-full hover:border-[#4a8cff]/50 hover:text-[#4a8cff] transition-all duration-300"
            >
              {interest}
            </span>
          ))}
        </div>
      </section>

      {/* Archetypes */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <h3 className="font-display text-2xl md:text-3xl tracking-[0.1em] mb-4 text-center">
          My Spiritual Archetypes
        </h3>
        <p className="text-[#8892a0] text-sm text-center mb-10 italic max-w-2xl mx-auto">
          I don&apos;t see these animals as literal definitions of who I am. I see them as symbols—different archetypes through which I can describe parts of myself.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {archetypes.map((arch) => (
            <div 
              key={arch.name}
              className="border border-[#4a8cff]/20 rounded-lg p-6 bg-[#080a14]/40 hover:border-[#4a8cff]/50 transition-all duration-300"
            >
              <p className="text-[#4a8cff] text-[10px] tracking-[0.3em] uppercase mb-2">{arch.title}</p>
              <h4 className="font-display text-2xl text-[#f8f9fa] mb-3">{arch.name}</h4>
              <p className="text-[#8892a0] text-sm leading-relaxed">{arch.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cosmic Blueprint */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <h3 className="font-display text-2xl md:text-3xl tracking-[0.1em] mb-4 text-center">
          My Cosmic Blueprint
        </h3>
        <p className="text-[#8892a0] text-sm text-center mb-10 italic">
          For those who enjoy astrology, here is my personal chart.
        </p>
        <div className="border border-[#4a8cff]/20 rounded-lg overflow-hidden bg-[#080a14]/40">
          {chart.map((item, i) => (
            <div 
              key={item.sign}
              className={`flex items-center justify-between px-6 py-4 ${i !== chart.length - 1 ? 'border-b border-[#4a8cff]/10' : ''}`}
            >
              <span className="text-[#8892a0] text-[10px] tracking-[0.3em] uppercase">{item.sign}</span>
              <span className="font-display text-lg text-[#4a8cff]">{item.value}</span>
            </div>
          ))}
        </div>
        <p className="text-[#8892a0] text-sm leading-relaxed text-center mt-8 italic max-w-2xl mx-auto">
          Astrology is one of the symbolic systems I enjoy exploring—not as a replacement for understanding reality, 
          but as another language through which people have explored personality, identity and meaning.
        </p>
      </section>

      {/* Closing */}
      <section className="max-w-3xl mx-auto px-6 pb-24 text-center">
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#4a8cff] to-transparent mx-auto mb-12" />
        
        <h3 className="font-display text-3xl md:text-4xl tracking-[0.1em] mb-8">
          And Finally...
        </h3>
        
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {['Teacher', 'Writer', 'Learner', 'Developer', 'Freelancer', 'Reader', 'Beginner Crocheter', 'Goth', 'Language Learner', 'Observer', 'Questioner'].map((label) => (
            <span 
              key={label}
              className="px-4 py-1.5 text-[10px] tracking-[0.25em] uppercase text-[#d1d5db] border border-[#d1d5db]/20 rounded-full"
            >
              {label}
            </span>
          ))}
        </div>

        <p className="font-display text-xl md:text-2xl text-[#8892a0] italic mb-6">
          But I don&apos;t think a single label can explain a person.
        </p>

        <div className="space-y-3 text-[#c9c9d1] text-base leading-relaxed mb-12">
          <p>I am still learning who I am.</p>
          <p>Still changing.</p>
          <p>Still questioning.</p>
          <p>Still creating.</p>
          <p>Still shedding old versions of myself.</p>
        </div>

        <div className="border-t border-[#4a8cff]/20 pt-12">
          <p className="font-display text-3xl md:text-5xl tracking-[0.15em] text-[#f8f9fa] mb-6">
            WELCOME TO MY WORLD
          </p>
          <Link
            href="/space"
            className="inline-block mt-6 px-8 py-3 text-[10px] tracking-[0.3em] uppercase border border-[#4a8cff]/40 text-[#4a8cff] rounded-full hover:bg-[#4a8cff]/10 transition-all duration-300"
          >
            Enter the Eclipse →
          </Link>
        </div>
      </section>

    </div>
  )
}
