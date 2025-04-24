'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

type Particle = {
  id: number;
  xStart: number;
  yStart: number;
  xEnd: number;
  yEnd: number;
  rotateEnd: number;
  color: string;
};

const colors = ['#ffc700', '#ff0000', '#2e3192', '#41e1f6', '#00ff85'];

const ConfettiPage = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  const shoot = () => {
    const newParticles: Particle[] = Array.from({ length: 100 }).map((_, i) => {
      const x = Math.random() * window.innerWidth;
      const yStart = window.innerHeight + 20;
      const yEnd = Math.random() * (window.innerHeight / 2);
      return {
        id: Date.now() + i,
        xStart: x,
        yStart,
        xEnd: x + (Math.random() - 0.5) * 100,
        yEnd,
        rotateEnd: Math.random() * 720,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    });

    setParticles(prev => [...prev, ...newParticles]);

    setTimeout(() => {
      setParticles(prev =>
        prev.filter(p => !newParticles.some(n => n.id === p.id))
      );
    }, 3000);
  };

  return (
    <>
      <div className="relative w-screen h-screen bg-gray-100 overflow-hidden">
        <button
          onClick={shoot}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-2xl shadow-lg 
            z-10"
        >
          Shoot Confetti!
        </button>

        {particles.map(p => (
          <motion.div
            key={p.id}
            initial={{ x: p.xStart, y: p.yStart, rotate: 0, opacity: 1 }}
            animate={{ x: p.xEnd, y: p.yEnd, rotate: p.rotateEnd, opacity: 0 }}
            transition={{ duration: 2 + Math.random(), ease: 'easeOut' }}
            style={{
              position: 'absolute',
              width: 8,
              height: 16,
              backgroundColor: p.color,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default ConfettiPage;
