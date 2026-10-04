"use client";

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

    interface Star {
      x: number; y: number; size: number; baseAlpha: number;
      twinkleSpeed: number; twinklePhase: number; driftX: number; driftY: number;
      flareUntil: number; colorTemp: number;
    }
    const stars: Star[] = [];
    for (let i = 0; i < 130; i++) {
      const magnitude = Math.pow(Math.random(), 2.2);
      stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: 0.35 + magnitude * 1.35,
        baseAlpha: 0.25 + magnitude * 0.6,
        twinkleSpeed: 0.004 + Math.random() * 0.014,
        twinklePhase: Math.random() * Math.PI * 2,
        driftX: (Math.random() - 0.5) * 0.05,
        driftY: (Math.random() - 0.5) * 0.025,
        flareUntil: 0,
        colorTemp: Math.random(),
      });
    }

    const eclipse = {
      baseX: window.innerWidth * 0.22,
      baseY: window.innerHeight * 0.26,
      radius: Math.min(window.innerWidth, window.innerHeight) * 0.135,
      pulsePhase: 0,
      sparkPhase: 0,
      diamondAngle: Math.random() * Math.PI * 2,
    };

    class Comet {
      x = 0; y = 0; speedX = 0; speedY = 0;
      trail: { x: number; y: number; alpha: number; size: number; hue: number }[] = [];
      headSize = 5; active = false; delay = 90;

      reset() {
        this.x = window.innerWidth + 120;
        this.y = Math.random() * window.innerHeight * 0.6;
        const speed = 0.7 + Math.random() * 0.6;
        const angle = Math.PI - 0.6 + (Math.random() - 0.5) * 0.2;
        this.speedX = Math.cos(angle) * speed;
        this.speedY = Math.sin(angle) * speed * 0.85;
        this.trail = [];
        this.headSize = 5 + Math.random() * 2.5;
        this.active = true;
        this.delay = 700 + Math.random() * 500;
      }

      update() {
        if (!this.active) {
          this.delay -= 1;
          if (this.delay <= 0) this.reset();
          return;
        }
        this.x += this.speedX;
        this.y += this.speedY;
        for (let k = 0; k < 2; k++) {
          this.trail.push({
            x: this.x + (Math.random() - 0.5) * 2,
            y: this.y + (Math.random() - 0.5) * 2,
            alpha: 1,
            size: Math.random() * 4 + 1.5,
            hue: Math.random(),
          });
        }
        for (let i = this.trail.length - 1; i >= 0; i--) {
          this.trail[i].alpha -= 0.0035;
          if (this.trail[i].alpha <= 0) this.trail.splice(i, 1);
        }
        if (this.trail.length > 260) this.trail.splice(0, this.trail.length - 260);
        if (this.x < -350 || this.y > window.innerHeight + 350) {
          this.active = false;
          this.delay = 700 + Math.random() * 600;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (!this.active) return;
        this.trail.forEach((p, i) => {
          const progress = i / Math.max(this.trail.length - 1, 1);
          const dustSize = p.size * (0.35 + progress * 0.85);
          const alpha = p.alpha * 0.5 * (0.3 + progress * 0.7);
          const r = 200 + p.hue * 30;
          const g = 215 + p.hue * 25;
          ctx.beginPath();
          ctx.arc(p.x, p.y, dustSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, 255, ${alpha})`;
          ctx.fill();
        });

        const haloR = 70;
        const halo = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, haloR);
        halo.addColorStop(0, 'rgba(255, 255, 255, 1)');
        halo.addColorStop(0.10, 'rgba(230, 245, 255, 0.95)');
        halo.addColorStop(0.30, 'rgba(160, 205, 255, 0.55)');
        halo.addColorStop(0.60, 'rgba(74, 140, 255, 0.20)');
        halo.addColorStop(1, 'rgba(2, 62, 138, 0)');
        ctx.beginPath();
        ctx.arc(this.x, this.y, haloR, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();

        const coreR = this.headSize * 2.6;
        const core = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, coreR);
        core.addColorStop(0, 'rgba(255, 255, 255, 1)');
        core.addColorStop(0.55, 'rgba(255, 255, 255, 0.95)');
        core.addColorStop(1, 'rgba(200, 220, 255, 0)');
        ctx.beginPath();
        ctx.arc(this.x, this.y, coreR, 0, Math.PI * 2);
        ctx.fillStyle = core;
        ctx.fill();
      }
    }

    class TinyMeteor {
      x: number; y: number; speedX: number; speedY: number; length: number; life: number;
      constructor() {
        this.x = window.innerWidth + Math.random() * 200;
        this.y = Math.random() * window.innerHeight * 0.7;
        const speed = 3 + Math.random() * 3;
        const angle = Math.PI - 0.75 + (Math.random() - 0.5) * 0.3;
        this.speedX = Math.cos(angle) * speed;
        this.speedY = Math.sin(angle) * speed * 0.55;
        this.length = 30 + Math.random() * 50;
        this.life = 1;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 0.006;
      }
      draw(ctx: CanvasRenderingContext2D) {
        if (this.life <= 0) return;
        const alpha = Math.max(0, this.life) * 0.55;
        const tailX = this.x - this.speedX * (this.length / 10);
        const tailY = this.y - this.speedY * (this.length / 10);
        const grad = ctx.createLinearGradient(this.x, this.y, tailX, tailY);
        grad.addColorStop(0, `rgba(220, 235, 255, ${alpha})`);
        grad.addColorStop(0.5, `rgba(160, 200, 255, ${alpha * 0.5})`);
        grad.addColorStop(1, 'rgba(74, 140, 255, 0)');
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.1;
        ctx.lineCap = 'round';
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(this.x, this.y, 0.9, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      }
    }

    const comets: Comet[] = [new Comet()];
    const tinyMeteors: TinyMeteor[] = [];

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.005;
      const w = window.innerWidth;
      const h = window.innerHeight;

      // SKY
      const bgGrd = ctx.createRadialGradient(w * 0.5, h * 0.4, 0, w * 0.5, h * 0.4, Math.max(w, h));
      bgGrd.addColorStop(0, '#03060d');
      bgGrd.addColorStop(0.5, '#02040a');
      bgGrd.addColorStop(1, '#000103');
      ctx.fillStyle = bgGrd;
      ctx.fillRect(0, 0, w, h);

      // ECLIPSE
      const e = eclipse;
      const pulse = Math.sin(time * 1.2) * 0.5 + 0.5;
      eclipse.pulsePhase = pulse;
      eclipse.sparkPhase += 0.03;

      const driftX = Math.sin(time * 0.3) * 14;
      const driftY = Math.cos(time * 0.24) * 9;
      const ex = e.baseX + driftX;
      const ey = e.baseY + driftY;

      // Outer haze
      const outerHazeR = e.radius * 4.5;
      const outerHaze = ctx.createRadialGradient(ex, ey, e.radius * 0.9, ex, ey, outerHazeR);
      outerHaze.addColorStop(0, `rgba(74, 140, 255, ${0.22 + pulse * 0.08})`);
      outerHaze.addColorStop(0.4, `rgba(2, 62, 138, ${0.10 + pulse * 0.05})`);
      outerHaze.addColorStop(1, 'rgba(2, 62, 138, 0)');
      ctx.beginPath();
      ctx.arc(ex, ey, outerHazeR, 0, Math.PI * 2);
      ctx.fillStyle = outerHaze;
      ctx.fill();

      // Mid glow
      const midGlowR = e.radius * 2.4;
      const midGlow = ctx.createRadialGradient(ex, ey, e.radius * 0.9, ex, ey, midGlowR);
      midGlow.addColorStop(0, `rgba(180, 210, 255, ${0.16 + pulse * 0.06})`);
      midGlow.addColorStop(0.5, `rgba(100, 160, 255, ${0.08 + pulse * 0.03})`);
      midGlow.addColorStop(1, 'rgba(74, 140, 255, 0)');
      ctx.beginPath();
      ctx.arc(ex, ey, midGlowR, 0, Math.PI * 2);
      ctx.fillStyle = midGlow;
      ctx.fill();

      // Corona
      const coronaR = e.radius * 1.5;
      const corona = ctx.createRadialGradient(ex, ey, e.radius * 0.97, ex, ey, coronaR);
      corona.addColorStop(0, `rgba(215, 233, 255, ${0.95 + pulse * 0.05})`);
      corona.addColorStop(0.25, `rgba(140, 190, 255, ${0.75 + pulse * 0.15})`);
      corona.addColorStop(0.55, `rgba(74, 140, 255, ${0.40 + pulse * 0.10})`);
      corona.addColorStop(1, 'rgba(2, 62, 138, 0)');
      ctx.beginPath();
      ctx.arc(ex, ey, coronaR, 0, Math.PI * 2);
      ctx.fillStyle = corona;
      ctx.fill();

      // Prominences
      for (let i = 0; i < 3; i++) {
        const a = i * 2.1 + time * 0.15;
        const px = ex + Math.cos(a) * e.radius * 0.98;
        const py = ey + Math.sin(a) * e.radius * 0.98;
        const flick = Math.sin(time * 3 + i * 4) * 0.5 + 0.5;
        const pr = e.radius * (0.12 + flick * 0.06);
        const pg = ctx.createRadialGradient(px, py, 0, px, py, pr);
        pg.addColorStop(0, `rgba(200, 225, 255, ${0.6 * flick})`);
        pg.addColorStop(1, 'rgba(74, 140, 255, 0)');
        ctx.beginPath();
        ctx.arc(px, py, pr, 0, Math.PI * 2);
        ctx.fillStyle = pg;
        ctx.fill();
      }

      // Moon body
      const moonGrd = ctx.createRadialGradient(
        ex - e.radius * 0.4, ey - e.radius * 0.4, e.radius * 0.1,
        ex, ey, e.radius
      );
      moonGrd.addColorStop(0, '#10203f');
      moonGrd.addColorStop(0.4, '#060b18');
      moonGrd.addColorStop(0.85, '#02040a');
      moonGrd.addColorStop(1, '#000103');
      ctx.beginPath();
      ctx.arc(ex, ey, e.radius, 0, Math.PI * 2);
      ctx.fillStyle = moonGrd;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(ex, ey, e.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(220, 240, 255, ${0.95 + pulse * 0.05})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(ex, ey, e.radius + 3, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(140, 190, 255, ${0.45 + pulse * 0.15})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Diamond flare
      eclipse.diamondAngle += 0.0016;
      const dFlare = Math.sin(time * 1.6) * 0.5 + 0.5;
      const dx = ex + Math.cos(eclipse.diamondAngle) * e.radius;
      const dy = ey + Math.sin(eclipse.diamondAngle) * e.radius;
      const dr = 3 + dFlare * 4;
      const diamond = ctx.createRadialGradient(dx, dy, 0, dx, dy, dr * 6);
      diamond.addColorStop(0, `rgba(255, 255, 255, ${0.9 * dFlare + 0.1})`);
      diamond.addColorStop(0.3, `rgba(200, 225, 255, ${0.5 * dFlare})`);
      diamond.addColorStop(1, 'rgba(74, 140, 255, 0)');
      ctx.beginPath();
      ctx.arc(dx, dy, dr * 6, 0, Math.PI * 2);
      ctx.fillStyle = diamond;
      ctx.fill();

      // STARS
      stars.forEach((star) => {
        star.x += star.driftX;
        star.y += star.driftY;
        if (star.x < 0) star.x = w;
        if (star.x > w) star.x = 0;
        if (star.y < 0) star.y = h;
        if (star.y > h) star.y = 0;

        if (star.flareUntil < time && Math.random() < 0.0006) {
          star.flareUntil = time + 0.4 + Math.random() * 0.6;
        }
        const flaring = star.flareUntil > time;

        const raw = Math.sin(time * star.twinkleSpeed * 60 + star.twinklePhase);
        const twinkle = Math.pow(raw * 0.5 + 0.5, 1.8);
        const alpha = star.baseAlpha * (0.35 + twinkle * 0.65) * (flaring ? 1.5 : 1);
        const size = star.size * (flaring ? 1.8 : 1);

        const r = 235 + star.colorTemp * 20;
        const g = 238 + star.colorTemp * 10;
        const b = 255 - star.colorTemp * 35;

        if (star.size > 0.9 || flaring) {
          const haloR = size * (flaring ? 4 : 2.2);
          const halo = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, haloR);
          halo.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${Math.min(alpha * 0.5, 0.6)})`);
          halo.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.beginPath();
          ctx.arc(star.x, star.y, haloR, 0, Math.PI * 2);
          ctx.fillStyle = halo;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, size * 0.55, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${Math.min(alpha, 1)})`;
        ctx.fill();
      });

      // Meteors
      if (Math.random() < 0.035) tinyMeteors.push(new TinyMeteor());
      for (let i = tinyMeteors.length - 1; i >= 0; i--) {
        const m = tinyMeteors[i];
        m.update();
        m.draw(ctx);
        if (m.life <= 0 || m.x < -200 || m.y > h + 200) tinyMeteors.splice(i, 1);
      }

      // Comets
      comets.forEach((comet) => { comet.update(); comet.draw(ctx); });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      setCanvasSize();
      eclipse.baseX = window.innerWidth * 0.22;
      eclipse.baseY = window.innerHeight * 0.26;
      eclipse.radius = Math.min(window.innerWidth, window.innerHeight) * 0.135;
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