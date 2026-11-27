'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  rotation: number;
  vRot: number;
  type: 'star' | 'circle' | 'sparkle' | 'ring';
}

const COLORS = [
  '#FF2A85', // Neon Pink
  '#EC4899', // Hot Pink
  '#D946EF', // Electric Fuchsia
  '#A855F7', // Bright Violet
  '#7C3AED', // Royal Purple
  '#FFFFFF', // Starlight White
  '#FDE047', // Celestial Gold
];

export default function TouchSparkles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const lastMoveTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Draw 4-point star
    const drawStar = (
      c: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      spikes: number,
      outerRadius: number,
      innerRadius: number
    ) => {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      c.beginPath();
      c.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        c.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        c.lineTo(x, y);
        rot += step;
      }
      c.lineTo(cx, cy - outerRadius);
      c.closePath();
      c.fill();
    };

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05; // Gentle gravity
        p.vx *= 0.95; // Friction
        p.vy *= 0.95;
        p.rotation += p.vRot;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.strokeStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;

        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.type === 'star') {
          drawStar(ctx, 0, 0, 4, p.size * 1.5, p.size * 0.45);
        } else if (p.type === 'sparkle') {
          // Cross sparkle
          const s = p.size;
          ctx.beginPath();
          ctx.moveTo(-s, 0);
          ctx.lineTo(s, 0);
          ctx.moveTo(0, -s);
          ctx.lineTo(0, s);
          ctx.lineWidth = 2;
          ctx.stroke();
        } else if (p.type === 'ring') {
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * (2 - p.alpha), 0, Math.PI * 2);
          ctx.stroke();
        } else {
          // Soft circular glow particle
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      if (particles.length > 0) {
        animFrameRef.current = requestAnimationFrame(render);
      } else {
        animFrameRef.current = null;
      }
    };

    const wakeLoop = () => {
      if (!animFrameRef.current) {
        animFrameRef.current = requestAnimationFrame(render);
      }
    };

    // Add burst of sparkles
    const addSparkleBurst = (x: number, y: number, count = 14) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.5 + Math.random() * 5.5;
        const types: ('star' | 'circle' | 'sparkle' | 'ring')[] = [
          'star',
          'star',
          'sparkle',
          'circle',
          'ring',
        ];
        const type = types[Math.floor(Math.random() * types.length)];
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];

        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.5,
          size: 2.5 + Math.random() * 4.5,
          color,
          alpha: 1,
          decay: 0.015 + Math.random() * 0.02,
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.15,
          type,
        });
      }
      wakeLoop();
    };

    // Add gentle trail
    const addTrailSparkle = (x: number, y: number) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.5 + Math.random() * 1.5;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];

      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 2 + Math.random() * 3,
        color,
        alpha: 0.85,
        decay: 0.035 + Math.random() * 0.02,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.2,
        type: Math.random() > 0.4 ? 'star' : 'sparkle',
      });
      wakeLoop();
    };

    // Event Handlers for pointer (mouse + pen + touch)
    const handlePointerDown = (e: PointerEvent) => {
      addSparkleBurst(e.clientX, e.clientY, 16);
    };

    const handlePointerMove = (e: PointerEvent) => {
      const now = performance.now();
      // Throttle trailing to every 35ms for smooth 60fps performance
      if (now - lastMoveTimeRef.current > 35) {
        addTrailSparkle(e.clientX, e.clientY);
        lastMoveTimeRef.current = now;
      }
    };

    // Touch events for mobile multi-touch taps
    const handleTouchStart = (e: TouchEvent) => {
      for (let i = 0; i < e.touches.length; i++) {
        const touch = e.touches[i];
        addSparkleBurst(touch.clientX, touch.clientY, 14);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const now = performance.now();
      if (now - lastMoveTimeRef.current > 40) {
        for (let i = 0; i < e.touches.length; i++) {
          const touch = e.touches[i];
          addTrailSparkle(touch.clientX, touch.clientY);
        }
        lastMoveTimeRef.current = now;
      }
    };

    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      aria-hidden="true"
    />
  );
}
