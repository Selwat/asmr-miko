'use client'
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [arms, setArms] = useState(6);
  const [speed, setSpeed] = useState(0.02);
  let angle = 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    canvas.width = 400;
    canvas.height = 400;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      for (let i = 0; i < 360; i += 5) {
        let rad = ((i + angle) * Math.PI) / 180;
        let x = centerX + Math.cos(rad * arms) * i;
        let y = centerY + Math.sin(rad * arms) * i;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "#06b6d4";
      ctx.lineWidth = 2;
      ctx.stroke();
      angle += speed;
      requestAnimationFrame(draw);
    };
    draw();
  }, [arms, speed]);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <canvas ref={canvasRef} className="border border-gray-300 rounded-lg" />
      <div className="flex gap-4">
        <div>
          <label className="block text-sm font-medium">Arms: {arms}</label>
          <input
            type="range"
            min="3"
            max="12"
            value={arms}
            onChange={(e) => setArms(Number(e.target.value))}
            className="w-32"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Speed: {speed.toFixed(2)}</label>
          <input
            type="range"
            min="0.01"
            max="0.1"
            step="0.01"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-32"
          />
        </div>
      </div>
    </div>
  );
}
