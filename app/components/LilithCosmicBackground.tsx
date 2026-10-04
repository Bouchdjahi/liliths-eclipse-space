"use client";

import React, { useEffect, useState } from "react";

export default function LilithCosmicBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-obsidian pointer-events-none">
      
      {/* 1. THE COSMIC ECLIPSE (Central Anchor) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        {/* Outer atmospheric glow */}
        <div className="absolute w-[80vw] h-[80vw] max-w-[1200px] max-h-[1200px] rounded-full bg-gradient-to-r from-siren/10 via-midnight/20 to-obsidian animate-pulse-glow" />
        
        {/* The Eclipse Ring */}
        <div className="relative w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] rounded-full border border-silver/5 flex items-center justify-center">
          {/* Inner shadow / Corona */}
          <div className="absolute inset-0 rounded-full shadow-[inset_0_0_100px_rgba(74,140,255,0.05)]" />
          
          {/* The Dark Moon */}
          <div className="absolute w-[48vw] h-[48vw] max-w-[780px] max-h-[780px] rounded-full bg-obsidian shadow-[0_0_80px_rgba(11,49,84,0.8)]" />
          
          {/* Subtle Silver Crescent Edge */}
          <div className="absolute w-[48vw] h-[48vw] max-w-[780px] max-h-[780px] rounded-full border border-silver/20" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }} />
        </div>
      </div>

      {/* 2. THE SIREN DEPTH (Underwater/Mist Currents) */}
      {/* Deep Ocean Base */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-midnight/40 via-obsidian to-obsidian" />
      
      {/* Flowing Mist / Currents */}
      <div className="absolute inset-[-20%] opacity-30 animate-mist-flow bg-[radial-gradient(ellipse_at_30%_40%,_rgba(11,49,84,0.4)_0%,_transparent_50%)]" />
      <div className="absolute inset-[-20%] opacity-20 animate-mist-flow bg-[radial-gradient(ellipse_at_70%_60%,_rgba(74,140,255,0.15)_0%,_transparent_60%)]" style={{ animationDelay: '-10s', animationDuration: '35s' }} />

      {/* 3. THE VAMPIRE TRACE (Subtle Crimson & Fog) */}
      {/* Dark Atmospheric Fog around edges */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_rgba(5,6,9,0.9)_100%)]" />
      
      {/* Subtle Dried-Blood Crimson Traces (Very rare, very faint) */}
      <div className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] rounded-full bg-blood/5 blur-[120px] animate-slow-drift" />
      <div className="absolute bottom-[10%] right-[15%] w-[25vw] h-[25vw] rounded-full bg-blood/5 blur-[100px] animate-slow-drift" style={{ animationDelay: '-15s' }} />

      {/* 4. PARTICLES (Cosmic Dust & Floating Embers) */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => {
          const isCrimson = i % 7 === 0; // 1 in 7 particles is crimson
          const size = Math.random() * 2 + 1;
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const delay = Math.random() * 15;
          const duration = Math.random() * 20 + 15;

          return (
            <div
              key={i}
              className={`absolute rounded-full animate-float-particle ${
                isCrimson ? "bg-blood/40" : "bg-silver/20"
              }`}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                top: `${top}%`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                boxShadow: isCrimson ? '0 0 4px rgba(92,10,18,0.5)' : '0 0 6px rgba(170,183,200,0.3)'
              }}
            />
          );
        })}
      </div>

      {/* 5. NOISE / GRAIN OVERLAY (For cinematic texture) */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
}