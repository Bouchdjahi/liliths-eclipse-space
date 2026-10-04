"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const DISC = 150;   // black moon disc
const CORONA = 340; // soft outer glow diameter

const SPARKS = Array.from({ length: 9 }, (_, i) => ({
  angle: (i / 9) * 360 + (i % 3) * 13,
  dist: 82 + (i % 4) * 14,
  size: 2 + (i % 3),
  duration: 14 + i * 3,
}));

export default function EclipseCore() {
  const { language } = useLanguage();
  const label = language === "en" ? "HOME" : "الرئيسية";

  return (
    <div className="relative flex items-center justify-center" style={{ width: DISC, height: DISC }}>
      {/* Wide soft deep-blue glow, breathing */}
      <motion.div
        animate={{ opacity: [0.5, 0.95, 0.5], scale: [1, 1.08, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: CORONA * 1.4,
          height: CORONA * 1.4,
          background:
            "radial-gradient(circle, rgba(30,70,210,0.45) 0%, rgba(10,40,140,0.22) 35%, rgba(0,5,25,0) 70%)",
        }}
      />

      {/* A bright shine orbiting the rim of the disc (no rays/lines, just a soft moving glint) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        className="absolute pointer-events-none"
        style={{ width: DISC + 14, height: DISC + 14 }}
      >
        <div
          style={{
            position: "absolute",
            top: -6,
            left: "50%",
            width: 34,
            height: 34,
            marginLeft: -17,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(200,225,255,0.95) 0%, rgba(90,150,255,0.55) 45%, transparent 75%)",
            filter: "blur(5px)",
          }}
        />
      </motion.div>

      {/* A second, slower shine orbiting the opposite way for depth */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        className="absolute pointer-events-none"
        style={{ width: DISC + 30, height: DISC + 30 }}
      >
        <div
          style={{
            position: "absolute",
            bottom: -4,
            left: "50%",
            width: 22,
            height: 22,
            marginLeft: -11,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(160,205,255,0.8) 0%, rgba(60,120,255,0.4) 45%, transparent 75%)",
            filter: "blur(5px)",
          }}
        />
      </motion.div>

      {/* Blue sparks drifting around the eclipse */}
      {SPARKS.map((s, i) => (
        <motion.div
          key={i}
          animate={{ rotate: [s.angle, s.angle + 360] }}
          transition={{ duration: s.duration, repeat: Infinity, ease: "linear" }}
          className="absolute pointer-events-none"
          style={{ width: 0, height: 0 }}
        >
          <motion.span
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2 + (i % 4), repeat: Infinity, ease: "easeInOut" }}
            className="absolute rounded-full"
            style={{
              left: s.dist,
              top: 0,
              width: s.size,
              height: s.size,
              background: "#cfe6ff",
              boxShadow: "0 0 8px 2px rgba(74,140,255,0.9)",
            }}
          />
        </motion.div>
      ))}

      {/* The eclipsing body (clickable -> home) */}
      <Link href="/" className="relative group z-10">
        <motion.div
          animate={{
            boxShadow: [
              "0 0 30px 6px rgba(40,90,220,0.65), 0 0 90px 20px rgba(15,50,160,0.4)",
              "0 0 50px 12px rgba(90,150,255,0.9), 0 0 130px 30px rgba(30,90,220,0.55)",
              "0 0 30px 6px rgba(40,90,220,0.65), 0 0 90px 20px rgba(15,50,160,0.4)",
            ],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="rounded-full transition-transform duration-700 group-hover:scale-105 overflow-hidden"
          style={{
            width: DISC,
            height: DISC,
            background: "#00010a",
            border: "1.5px solid rgba(120,175,255,0.9)",
            position: "relative",
          }}
        >
          {/* soft shine sweeping across the disc's surface */}
          <motion.div
            animate={{ x: [-DISC, DISC] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", repeatDelay: 2.5 }}
            style={{
              position: "absolute",
              top: -DISC * 0.5,
              left: 0,
              width: DISC * 0.5,
              height: DISC * 2,
              background: "linear-gradient(75deg, transparent, rgba(130,180,255,0.35), transparent)",
              filter: "blur(12px)",
              pointerEvents: "none",
            }}
          />
        </motion.div>
        {/* bright inner rim */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ boxShadow: "inset 0 0 12px 3px rgba(100,160,255,0.75)" }}
        />
        {/* diamond-ring flare */}
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.25, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute rounded-full pointer-events-none"
          style={{
            top: 8,
            right: 14,
            width: 18,
            height: 18,
            background:
              "radial-gradient(circle, #fff 0%, rgba(160,210,255,0.9) 30%, rgba(74,140,255,0) 70%)",
            filter: "blur(0.5px)",
          }}
        />
      </Link>

      {/* HOME label under the eclipse */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 1 }}
        className="absolute z-10 text-[11px] tracking-[0.45em] pointer-events-none"
        style={{
          top: DISC + 14,
          fontFamily: "'Cinzel', serif",
          color: "#9ab9e6",
          textShadow: "0 0 12px rgba(74,140,255,0.8)",
        }}
      >
        {label}
      </motion.span>
    </div>
  );
}
