'use client';

import React, { useRef, useEffect, useCallback } from 'react';

interface IStar {
  x: number;
  y: number;
  z: number;
  size: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  color: string;
}

interface IShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

const STAR_COLORS = [
  '#ffffff',
  '#c8d6ff',
  '#aabbff',
  '#e8e0ff',
  '#ffe4c4',
  '#ffd2a1',
];

const NEBULA_COLORS = [
  { x: 0.2, y: 0.3, r: 300, color: 'rgba(139, 92, 246, 0.06)' },
  { x: 0.75, y: 0.6, r: 350, color: 'rgba(6, 182, 212, 0.04)' },
  { x: 0.5, y: 0.8, r: 250, color: 'rgba(124, 58, 237, 0.05)' },
  { x: 0.85, y: 0.15, r: 200, color: 'rgba(147, 51, 234, 0.04)' },
];

const STAR_LAYERS = [
  { count: 180, minSize: 0.3, maxSize: 1.0, speed: 0.08, opacity: 0.4 },
  { count: 120, minSize: 0.8, maxSize: 1.8, speed: 0.15, opacity: 0.6 },
  { count: 60, minSize: 1.2, maxSize: 2.5, speed: 0.25, opacity: 0.85 },
];

const createStars = (w: number, h: number): IStar[] => {
  const stars: IStar[] = [];
  STAR_LAYERS.forEach((layer, layerIdx) => {
    Array.from({ length: layer.count }).forEach(() => {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        z: layerIdx,
        size: layer.minSize + Math.random() * (layer.maxSize - layer.minSize),
        baseOpacity: layer.opacity * (0.5 + Math.random() * 0.5),
        twinkleSpeed: 0.5 + Math.random() * 2.5,
        twinkleOffset: Math.random() * Math.PI * 2,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      });
    });
  });
  return stars;
};

const StarfieldCanvas = ({ className = '' }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<IStar[]>([]);
  const shootingStarsRef = useRef<IShootingStar[]>([]);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);

  const initStars = useCallback((w: number, h: number) => {
    starsRef.current = createStars(w, h);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      initStars(rect.width, rect.height);
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };
    window.addEventListener('mousemove', handleMouse);

    const draw = (timestamp: number) => {
      const dt = (timestamp - timeRef.current) / 1000;
      timeRef.current = timestamp;
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;
      const mx = (mouseRef.current.x - 0.5) * 2;
      const my = (mouseRef.current.y - 0.5) * 2;

      ctx.clearRect(0, 0, w, h);

      /* ── Nebula glows ── */
      NEBULA_COLORS.forEach((neb) => {
        const grad = ctx.createRadialGradient(
          neb.x * w + mx * 4,
          neb.y * h + my * 4,
          0,
          neb.x * w + mx * 4,
          neb.y * h + my * 4,
          neb.r
        );
        grad.addColorStop(0, neb.color);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      });

      /* ── Stars ── */
      const time = timestamp / 1000;
      starsRef.current.forEach((star) => {
        const layer = STAR_LAYERS[star.z];
        const parallaxX = mx * (star.z + 1) * 2;
        const parallaxY = my * (star.z + 1) * 2;

        star.y -= layer.speed * dt * 60;
        star.x += Math.sin(time * 0.1 + star.twinkleOffset) * 0.03 * dt * 60;

        if (star.y < -5) {
          star.y = h + 5;
          star.x = Math.random() * w;
        }
        if (star.x < -5) star.x = w + 5;
        if (star.x > w + 5) star.x = -5;

        const twinkle =
          0.5 + 0.5 * Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
        const opacity = star.baseOpacity * (0.3 + twinkle * 0.7);

        const drawX = star.x + parallaxX;
        const drawY = star.y + parallaxY;

        if (star.size > 1.5) {
          const glow = ctx.createRadialGradient(
            drawX, drawY, 0,
            drawX, drawY, star.size * 3
          );
          glow.addColorStop(0, star.color.replace(')', `, ${opacity * 0.3})`).replace('rgb', 'rgba'));
          glow.addColorStop(1, 'transparent');
          ctx.fillStyle = glow;
          ctx.fillRect(drawX - star.size * 3, drawY - star.size * 3, star.size * 6, star.size * 6);
        }

        ctx.beginPath();
        ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      /* ── Shooting stars ── */
      if (Math.random() < 0.003) {
        const fromLeft = Math.random() > 0.5;
        shootingStarsRef.current.push({
          x: fromLeft ? Math.random() * w * 0.3 : w * 0.7 + Math.random() * w * 0.3,
          y: Math.random() * h * 0.4,
          vx: fromLeft ? 6 + Math.random() * 4 : -(6 + Math.random() * 4),
          vy: 3 + Math.random() * 3,
          life: 0,
          maxLife: 40 + Math.random() * 30,
          size: 1.5 + Math.random() * 1,
        });
      }

      shootingStarsRef.current = shootingStarsRef.current.filter((ss) => {
        ss.x += ss.vx;
        ss.y += ss.vy;
        ss.life++;
        const progress = ss.life / ss.maxLife;
        const alpha = progress < 0.1 ? progress * 10 : 1 - (progress - 0.1) / 0.9;

        const tailLen = 30;
        const grad = ctx.createLinearGradient(
          ss.x, ss.y,
          ss.x - ss.vx * tailLen * 0.3, ss.y - ss.vy * tailLen * 0.3
        );
        grad.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.9})`);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(
          ss.x - ss.vx * tailLen * 0.3,
          ss.y - ss.vy * tailLen * 0.3
        );
        ctx.strokeStyle = grad;
        ctx.lineWidth = ss.size;
        ctx.lineCap = 'round';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(ss.x, ss.y, ss.size * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();

        return ss.life < ss.maxLife;
      });

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, [initStars]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
};

export { StarfieldCanvas };
