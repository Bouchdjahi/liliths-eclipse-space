'use client';

import { useEffect, useRef } from 'react';

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    // --- FEWER STARS, EACH TWINKLING ON ITS OWN RHYTHM ---
    interface Star {
      x: number;
      y: number;
      size: number;
      baseAlpha: number;
      twinkleSpeed: number;
      twinklePhase: number;
      driftX: number;
      driftY: number;
    }
    const stars: Star[] = [];
    // Only 90 stars — sparse and calm
    for (let i = 0; i < 90; i++) {
      stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 1.4 + 0.4,
        baseAlpha: Math.random() * 0.5 + 0.35,
        // Wide range = each star shines on its own rhythm
        twinkleSpeed: 0.006 + Math.random() * 0.02,
        twinklePhase: Math.random() * Math.PI * 2,
        driftX: (Math.random() - 0.5) * 0.08,
        driftY: (Math.random() - 0.5) * 0.04,
      });
    }

    // --- REALISTIC ECLIPSE (sun behind moon) ---
    const eclipse = {
      baseX: window.innerWidth * 0.22,
      baseY: window.innerHeight * 0.28,
      radius: Math.min(window.innerWidth, window.innerHeight) * 0.15,
      pulsePhase: 0,
      sparkPhase: 0,
    };

    // --- REALISTIC SINGLE COMET FROM THE RIGHT ---
    class Comet {
      x: number;
      y: number;
      speedX: number;
      speedY: number;
      trail: {
        x: number;
        y: number;
        alpha: number;
        size: number;
        hue: number;
      }[];
      headSize: number;
      active: boolean;
      delay: number;

      constructor() {
        this.reset();
        this.active = false;
        this.delay = 90; // ~4.5 s before first comet
      }

      reset() {
        // Right side, upper half
        this.x = window.innerWidth + 120;
        this.y = Math.random() * window.innerHeight * 0.5;
        const speed = 0.7 + Math.random() * 0.6;
        // Travels down-left
        const angle = Math.PI - 0.6 + (Math.random() - 0.5) * 0.2;
        this.speedX = Math.cos(angle) * speed;
        this.speedY = Math.sin(angle) * speed * 0.85;
        this.trail = [];
        // Larger comet head
        this.headSize = 5 + Math.random() * 2.5;
        this.active = true;
        this.delay = 600 + Math.random() * 400; // 10–20 s wait
      }

      update() {
        if (!this.active) {
          this.delay -= 1;
          if (this.delay <= 0) this.reset();
          return;
        }

        this.x += this.speedX;
        this.y += this.speedY;

        // Thicker trail (more particles per frame)
        for (let k = 0; k < 2; k++) {
          this.trail.push({
            x: this.x + (Math.random() - 0.5) * 2,
            y: this.y + (Math.random() - 0.5) * 2,
            alpha: 1,
            size: Math.random() * 4 + 1.5, // bigger dust
            hue: Math.random(),
          });
        }

        // Slow fade → long, soft dust tail
        for (let i = this.trail.length - 1; i >= 0; i--) {
          this.trail[i].alpha -= 0.0035;
          if (this.trail[i].alpha <= 0) this.trail.splice(i, 1);
        }
        // Cap length
        if (this.trail.length > 260)
          this.trail.splice(0, this.trail.length - 260);

        // Exit
        if (this.x < -350 || this.y > window.innerHeight + 350) {
          this.active = false;
          this.delay = 600 + Math.random() * 500;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (!this.active) return;

        // --- LONG THICK DUST TRAIL ---
        this.trail.forEach((p, i) => {
          const progress = i / Math.max(this.trail.length - 1, 1); // 0 old → 1 new
          const dustSize = p.size * (0.35 + progress * 0.85);
          const alpha = p.alpha * 0.5 * (0.3 + progress * 0.7);
          // Slightly blue-white with pale warm tint (realistic comet dust)
          const r = 200 + p.hue * 30;
          const g = 215 + p.hue * 25;
          const b = 255;
          ctx.beginPath();
          ctx.arc(p.x, p.y, dustSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.fill();
        });

        // --- GLOWING HEAD HALO (bigger, brighter) ---
        const haloR = 70;
        const halo = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          haloR
        );
        halo.addColorStop(0, 'rgba(255, 255, 255, 1)');
        halo.addColorStop(0.1, 'rgba(230, 245, 255, 0.95)');
        halo.addColorStop(0.3, 'rgba(160, 205, 255, 0.55)');
        halo.addColorStop(0.6, 'rgba(74, 140, 255, 0.20)');
        halo.addColorStop(1, 'rgba(2, 62, 138, 0)');
        ctx.beginPath();
        ctx.arc(this.x, this.y, haloR, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();

        // --- BRIGHT SOLID CORE ---
        const coreR = this.headSize * 2.6;
        const core = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          coreR
        );
        core.addColorStop(0, 'rgba(255, 255, 255, 1)');
        core.addColorStop(0.55, 'rgba(255, 255, 255, 0.95)');
        core.addColorStop(1, 'rgba(200, 220, 255, 0)');
        ctx.beginPath();
        ctx.arc(this.x, this.y, coreR, 0, Math.PI * 2);
        ctx.fillStyle = core;
        ctx.fill();
      }
    }

    // ONLY ONE COMET
    const comets: Comet[] = [new Comet()];

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.005;
      const w = window.innerWidth;
      const h = window.innerHeight;

      // --- VERY DARK SKY ---
      const bgGrd = ctx.createRadialGradient(
        w * 0.5,
        h * 0.5,
        0,
        w * 0.5,
        h * 0.5,
        Math.max(w, h)
      );
      bgGrd.addColorStop(0, '#03060d');
      bgGrd.addColorStop(0.5, '#02040a');
      bgGrd.addColorStop(1, '#000103');
      ctx.fillStyle = bgGrd;
      ctx.fillRect(0, 0, w, h);

      // --- ECLIPSE (realistic: blue sun + dark moon) ---
      const e = eclipse;
      const pulse = Math.sin(time * 1.2) * 0.5 + 0.5;
      eclipse.pulsePhase = pulse;
      eclipse.sparkPhase += 0.03;

      // Slow drift
      const driftX = Math.sin(time * 0.3) * 14;
      const driftY = Math.cos(time * 0.24) * 9;
      const ex = e.baseX + driftX;
      const ey = e.baseY + driftY;

      // 1. HUGE soft outer haze (blue sun's atmospheric light)
      const outerHazeR = e.radius * 4.5;
      const outerHaze = ctx.createRadialGradient(
        ex,
        ey,
        e.radius * 0.9,
        ex,
        ey,
        outerHazeR
      );
      outerHaze.addColorStop(0, `rgba(74, 140, 255, ${0.22 + pulse * 0.08})`);
      outerHaze.addColorStop(0.4, `rgba(2, 62, 138, ${0.1 + pulse * 0.05})`);
      outerHaze.addColorStop(1, 'rgba(2, 62, 138, 0)');
      ctx.beginPath();
      ctx.arc(ex, ey, outerHazeR, 0, Math.PI * 2);
      ctx.fillStyle = outerHaze;
      ctx.fill();

      // 2. BLUE SUN CORONA (bright ring of light)
      const coronaR = e.radius * 1.55;
      const corona = ctx.createRadialGradient(
        ex,
        ey,
        e.radius * 0.95,
        ex,
        ey,
        coronaR
      );
      corona.addColorStop(0, `rgba(210, 230, 255, ${0.95 + pulse * 0.05})`);
      corona.addColorStop(0.25, `rgba(140, 190, 255, ${0.75 + pulse * 0.15})`);
      corona.addColorStop(0.55, `rgba(74, 140, 255, ${0.4 + pulse * 0.1})`);
      corona.addColorStop(1, 'rgba(2, 62, 138, 0)');
      ctx.beginPath();
      ctx.arc(ex, ey, coronaR, 0, Math.PI * 2);
      ctx.fillStyle = corona;
      ctx.fill();

      // 3. BLUE SUN SPARKS (flares around the rim)
      for (let i = 0; i < 14; i++) {
        const angle = (i / 14) * Math.PI * 2 + eclipse.sparkPhase * 0.15;
        const sparkLife = Math.sin(time * 2.5 + i * 1.7) * 0.5 + 0.5;
        const sparkDist = e.radius * (1.08 + sparkLife * 0.1);
        const sx = ex + Math.cos(angle) * sparkDist;
        const sy = ey + Math.sin(angle) * sparkDist;
        const sparkR = 2 + sparkLife * 2.5;
        const sAlpha = 0.55 * sparkLife;

        const spark = ctx.createRadialGradient(sx, sy, 0, sx, sy, sparkR * 2.5);
        spark.addColorStop(0, `rgba(220, 240, 255, ${sAlpha})`);
        spark.addColorStop(0.5, `rgba(140, 190, 255, ${sAlpha * 0.5})`);
        spark.addColorStop(1, 'rgba(74, 140, 255, 0)');
        ctx.beginPath();
        ctx.arc(sx, sy, sparkR * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = spark;
        ctx.fill();
      }

      // 4. DARK MOON BODY (real dark surface, subtle blue-lit edge)
      const moonGrd = ctx.createRadialGradient(
        ex - e.radius * 0.4,
        ey - e.radius * 0.4,
        e.radius * 0.1,
        ex,
        ey,
        e.radius
      );
      moonGrd.addColorStop(0, '#0f1c38'); // faint blue sun reflection
      moonGrd.addColorStop(0.4, '#060b18');
      moonGrd.addColorStop(0.85, '#02040a');
      moonGrd.addColorStop(1, '#000103');
      ctx.beginPath();
      ctx.arc(ex, ey, e.radius, 0, Math.PI * 2);
      ctx.fillStyle = moonGrd;
      ctx.fill();

      // 5. BRIGHT BLUE RIM (sun peeking out behind the moon)
      ctx.beginPath();
      ctx.arc(ex, ey, e.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(220, 240, 255, ${0.95 + pulse * 0.05})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      // 6. Soft outer rim (extra glow)
      ctx.beginPath();
      ctx.arc(ex, ey, e.radius + 3, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(140, 190, 255, ${0.45 + pulse * 0.15})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // --- STARS (each shines on its own rhythm, drifting) ---
      stars.forEach((star) => {
        star.x += star.driftX;
        star.y += star.driftY;
        if (star.x < 0) star.x = w;
        if (star.x > w) star.x = 0;
        if (star.y < 0) star.y = h;
        if (star.y > h) star.y = 0;

        // Each star twinkles on its own pace
        const twinkle =
          Math.sin(time * star.twinkleSpeed * 60 + star.twinklePhase) * 0.5 +
          0.5;
        const alpha = star.baseAlpha * (0.15 + twinkle * 0.85);

        // Tiny soft halo for realism
        const halo = ctx.createRadialGradient(
          star.x,
          star.y,
          0,
          star.x,
          star.y,
          star.size * 3
        );
        halo.addColorStop(0, `rgba(220, 235, 255, ${alpha})`);
        halo.addColorStop(0.4, `rgba(180, 210, 255, ${alpha * 0.4})`);
        halo.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();

        // Solid center
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      });

      // --- COMET ---
      comets.forEach((comet) => {
        comet.update();
        comet.draw(ctx);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      setCanvasSize();
      eclipse.baseX = window.innerWidth * 0.22;
      eclipse.baseY = window.innerHeight * 0.28;
      eclipse.radius = Math.min(window.innerWidth, window.innerHeight) * 0.15;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 w-full h-full pointer-events-none"
    />
  );
}
