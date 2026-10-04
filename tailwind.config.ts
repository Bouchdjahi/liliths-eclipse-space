import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#050609",
        charcoal: "#090B10",
        midnight: "#071426",
        siren: "#0B3154",
        sovereign: "#4A8CFF",
        blood: "#5C0A12",
        silver: "#AAB7C8",
      },
      fontFamily: {
        // Assuming you have these loaded via next/font or Google Fonts
        display: ["var(--font-cinzel)", "serif"],
        nav: ["var(--font-inter)", "sans-serif"],
      },
      animation: {
        'slow-drift': 'drift 30s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 8s ease-in-out infinite',
        'float-particle': 'floatParticle 15s linear infinite',
        'mist-flow': 'mistFlow 25s ease-in-out infinite alternate',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(2%, 2%) scale(1.05)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.3', filter: 'blur(40px)' },
          '50%': { opacity: '0.6', filter: 'blur(60px)' },
        },
        floatParticle: {
          '0%': { transform: 'translateY(0) translateX(0)', opacity: '0' },
          '10%': { opacity: '0.6' },
          '90%': { opacity: '0.6' },
          '100%': { transform: 'translateY(-100px) translateX(20px)', opacity: '0' },
        },
        mistFlow: {
          '0%': { transform: 'translateX(-5%) translateY(-5%) rotate(0deg)' },
          '100%': { transform: 'translateX(5%) translateY(5%) rotate(5deg)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;