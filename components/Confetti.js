'use client';
import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

export default function Confetti({ winner }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const duration = 3000;
    const end = Date.now() + duration;
    const colors = winner === 'A' ? ['#ff0000', '#ff6666'] : ['#ffff00', '#ffd700'];

    const frame = () => {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: winner === 'A' ? 0.8 : 0.2 },
        colors,
        shapes: ['circle', 'square']
      });

      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: winner === 'A' ? 0.8 : 0.2 },
        colors,
        shapes: ['circle', 'square']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, [winner]);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 9999 }}
    />
  );
}
