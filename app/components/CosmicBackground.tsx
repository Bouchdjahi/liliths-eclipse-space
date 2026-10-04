"use client";

import { useEffect, useRef } from 'react';

export default function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const setCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5); // Cap DPR for performance
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    setCanvasSize();

    const W = window.innerWidth;
    const H = window.innerHeight;

    // Reduced stars for performance
    const stars: { x: number; y: number; size: number; alpha: number; speed: number }[] = [];
    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        size: Math.random() * 0.9 + 0.2,
        alpha: Math.random() * 0.6 + 0.2,
        speed: Math.random() * 0.02 + 0.005,
      });
    }

    // Only 4 nebulas
    const nebulas = [
      { x: W * 0.15, y: H * 0.30, radius: 420, color: [10, 40, 110], alpha: 0.20 },
      { x: W * 0.85, y: H * 0.20, radius: 380, color: [8, 55, 130], alpha: 0.16 },
      { x: W * 0.78, y: H * 0.82, radius: 450, color: [6, 30, 95], alpha: 0.18 },
      { x: W * 0.20, y: H * 0.80, radius: 400, color: [5, 35, 100], alpha: 0.15 },
    ];

    class BigComet {
      x = 0; y = 0; speedX = 0; speedY = 0;
      trail: { x: number; y: number; alpha: number; size: number }[] = [];
      headSize = 5; active = false; delay: number;

      constructor() { this.delay = 300 + Math.random() * 300; }

      reset() {
        this.x = window.innerWidth + 150;
        this.y = Math.random() * window.innerHeight * 0.7;
        const speed = 0.8 + Math.random() * 0.4;
        const angle = Math.PI - 0.6 + (Math.random() - 0.5) * 0.3;
        this.speedX = Math.cos(angle) * speed;
        this.speedY = Math.sin(angle) * speed * 0.8;
        this.trail = [];
        this.headSize = 5 + Math.random() * 2;
        this.active = true;
      }

      update() {
        if (!this.active) {
          this.delay -= 1;
          if (this.delay <= 0) this.reset();
          return;
        }
        this.x += this.speedX;
        this.y += this.speedY;
        this.trail.push({ x: this.x, y: this.y, alpha: 1, size: 3 + Math.random() * 2 });
        for (let i = this.trail.length - 1; i >= 0; i--) {
          this.trail[i].alpha -= 0.005;
          if (this.trail[i].alpha <= 0) this.trail.splice(i, 1);
        }
        if (this.trail.length > 180) this.trail.splice(0, this.trail.length - 180);
        if (this.x < -350 || this.y > window.innerHeight + 350) {
          this.active = false;
          this.delay = 600 + Math.random() * 500;
        }
      }

      draw() {
        if (!this.active) return;
        this.trail.forEach((p) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(180, 210, 255, ${p.alpha * 0.4})`;
          ctx.fill();
        });
        const halo = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, 60);
        halo.addColorStop(0, 'rgba(255,255,255,1)');
        halo.addColorStop(0.15, 'rgba(220,240,255,0.9)');
        halo.addColorStop(0.4, 'rgba(160,205,255,0.4)');
        halo.addColorStop(1, 'rgba(2,62,138,0)');
        ctx.beginPath();
        ctx.arc(this.x, this.y, 60, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.headSize * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
      }
    }

    const comets: BigComet[] = [new BigComet(), new BigComet()];

    let animationId: number;
    let time = 0;
    let lastFrameTime = 0;
    const FRAME_INTERVAL = 1000 / 40; // Cap at 40 FPS instead of 60

    const animate = (currentTime: number) => {
      // Throttle to 40 FPS
      if (currentTime - lastFrameTime < FRAME_INTERVAL) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = currentTime;
      time += 0.01;

      const w = window.innerWidth;
      const h = window.innerHeight;

      // Deep space background — solid fill for performance
      ctx.fillStyle = '#02040a';
      ctx.fillRect(0, 0, w, h);

      // Nebulas (static, only drawn once per frame — no drift)
      nebulas.forEach((n) => {
        const nebGrd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius);
        const [r, g, b] = n.color;
        nebGrd.addColorStop(0, `rgba(${r},${g},${b},${n.alpha})`);
        nebGrd.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = nebGrd;
        ctx.fill();
      });

      // Stars (drift up)
      stars.forEach((star) => {
        star.y -= star.speed;
        if (star.y < 0) star.y = h;
        const twinkle = Math.sin(time + star.x * 0.01) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 230, 255, ${star.alpha * twinkle})`;
        ctx.fill();
      });

      // Comets
      comets.forEach((c) => { c.update(); c.draw(); });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    const handleResize = () => setCanvasSize();
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