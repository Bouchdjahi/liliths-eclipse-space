'use client';

import StarField from '../components/StarField';

export default function SpacePage() {
  return (
    <main className="relative min-h-screen w-full bg-black overflow-hidden">
      {/* Reuse the same starfield background so the transition feels seamless */}
      <StarField />

      {/* Temporary content — we'll replace this with the orbiting planets next */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6">
        <h1
          className="text-5xl md:text-7xl tracking-[0.2em] text-[#4A8CFF]"
          style={{
            fontFamily: "'Cinzel Decorative', serif",
            textShadow: '0 0 30px rgba(74, 140, 255, 0.6)',
          }}
        >
          LILITH'S SPACE
        </h1>
        <p
          className="mt-6 text-slate-400 text-sm md:text-base italic"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          The orbit will be built here next...
        </p>
      </div>
    </main>
  );
}
