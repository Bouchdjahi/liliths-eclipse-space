"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface Moon {
  href: string;
  labelEn: string;
  labelAr: string;
}

const MOONS: Moon[] = [
  { href: "/space/music",                 labelEn: "MUSIC",              labelAr: "الموسيقى" },
  { href: "/space/contact",               labelEn: "CONTACT",            labelAr: "اتصال" },
  { href: "/space/websites",              labelEn: "LILITH'S WEBSITES",  labelAr: "مواقع ليليث" },
  { href: "/library",                     labelEn: "LIBRARY",            labelAr: "المكتبة" },
  { href: "/space/astrology",             labelEn: "ASTROLOGY",          labelAr: "التنجيم" },
  { href: "/space/numerology",            labelEn: "NUMEROLOGY",         labelAr: "علم الأعداد" },
  { href: "/space/reading-energy",        labelEn: "READING ENERGY",     labelAr: "قراءة الطاقة" },
  { href: "/space/who-is-lilith",         labelEn: "WHO IS LILITH?",     labelAr: "من هي ليليث؟" },
  { href: "/tv-corner",                   labelEn: "TV CORNER",          labelAr: "زاوية التلفاز" },
  { href: "/space/symbols",               labelEn: "SYMBOLS",            labelAr: "الرموز" },
  { href: "/space/energy-and-chakras",    labelEn: "ENERGY AND CHAKRAS", labelAr: "الطاقة والشاكرات" },
  { href: "/space/spirit-animals",        labelEn: "SPIRIT ANIMALS",     labelAr: "الحيوانات الروحية" },
  { href: "/space/plant-planet",          labelEn: "PLANT PLANET",       labelAr: "كوكب النبات" },
];

const TITLE_SPACE = 110;

const CRATERS: [number, number, number][] = [
  [34, 38, 11], [62, 62, 14], [67, 28, 7], [37, 72, 8], [52, 48, 5], [78, 50, 5],
];

function PhaseMoon({ p, size, id }: { p: number; size: number; id: number }) {
  const f = (1 - Math.cos(2 * Math.PI * p)) / 2;
  const waxing = p < 0.5;
  const t = 50 * (1 - 2 * f);
  const rx = Math.max(Math.abs(t), 0.01);
  const litPath = `M50 0 A50 50 0 0 1 50 100 A${rx} 50 0 0 ${t > 0 ? 0 : 1} 50 0 Z`;
  const flip = waxing ? undefined : "translate(100 0) scale(-1 1)";

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      style={{
        overflow: "visible",
        filter: `drop-shadow(0 0 ${6 + f * 8}px rgba(90,150,255,${0.18 + f * 0.35}))`,
      }}
    >
      <defs>
        <radialGradient id={`dark-${id}`} cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#0d1a3d" />
          <stop offset="70%" stopColor="#050b1f" />
          <stop offset="100%" stopColor="#00030a" />
        </radialGradient>
        <radialGradient id={`lit-${id}`} cx="42%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#f6f6f4" />
          <stop offset="65%" stopColor="#cfd0d2" />
          <stop offset="100%" stopColor="#9497a0" />
        </radialGradient>
        <clipPath id={`clip-${id}`}>
          <path d={litPath} />
        </clipPath>
        <filter id={`soft-${id}`} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="0.7" />
        </filter>
      </defs>

      <circle cx="50" cy="50" r="50" fill={`url(#dark-${id})`} />
      {CRATERS.map(([x, y, r], i) => (
        <circle key={`d${i}`} cx={x} cy={y} r={r} fill="rgba(120,170,255,0.10)" />
      ))}

      <g transform={flip}>
        <g clipPath={`url(#clip-${id})`} filter={`url(#soft-${id})`}>
          <circle cx="50" cy="50" r="50" fill={`url(#lit-${id})`} />
          {CRATERS.map(([x, y, r], i) => (
            <circle key={`l${i}`} cx={x} cy={y} r={r} fill="rgba(70,75,90,0.30)" />
          ))}
        </g>
      </g>

      <circle cx="50" cy="50" r="49.3" fill="none" stroke="rgba(120,180,255,0.5)" strokeWidth="1.2" />
    </svg>
  );
}

export default function PlanetNavigator() {
  const { language } = useLanguage();
  const [radius, setRadius] = useState(240);

  useEffect(() => {
    const calc = () => {
      const availH = window.innerHeight - TITLE_SPACE;
      const r = Math.min(availH / 2 - 60, window.innerWidth * 0.31);
      setRadius(Math.max(130, Math.min(340, r)));
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const moonSize = Math.max(30, Math.min(50, radius * 0.22));
  const n = MOONS.length;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="relative" style={{ width: 0, height: 0 }}>
        
        <svg
          className="absolute pointer-events-none"
          style={{ left: 0, top: 0, overflow: "visible" }}
          width={1}
          height={1}
        >
          <circle cx={0} cy={0} r={radius} fill="none" stroke="rgba(60,110,255,0.16)" strokeWidth={0.7} strokeDasharray="2 7" />
        </svg>

        {MOONS.map((moon, i) => {
          const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
          const nx = Math.cos(angle);
          const ny = Math.sin(angle);
          const x = nx * radius;
          const y = ny * radius;
          const lx = nx * (radius + moonSize / 2 + 12);
          const ly = ny * (radius + moonSize / 2 + 12);
          const label = language === "en" ? moon.labelEn : moon.labelAr;
          const p = (i + 0.6) / n;

          return (
            <motion.div
              key={moon.href}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.4 + i * 0.06 }}
              className="pointer-events-auto"
            >
              <Link href={moon.href} className="group">
                <div
                  className="absolute transition-transform duration-500 group-hover:scale-125"
                  style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}
                >
                  <motion.div
                    animate={{ y: [0, -3, 0], rotate: [0, 6, 0, -6, 0] }}
                    transition={{ duration: 6 + (i % 4), repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                  >
                    <PhaseMoon p={p} size={moonSize} id={i} />
                  </motion.div>
                </div>

                <span
                  className="absolute whitespace-nowrap text-[8px] md:text-[10px] tracking-[0.28em] transition-all duration-500 group-hover:text-white"
                  style={{
                    left: lx,
                    top: ly,
                    transform: `translate(calc(-50% + ${nx * 50}%), calc(-50% + ${ny * 50}%))`,
                    fontFamily: "'Cinzel', serif",
                    color: "#8fb2e8",
                    textShadow: "0 0 10px rgba(74,140,255,0.55)",
                  }}
                >
                  {label}
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}