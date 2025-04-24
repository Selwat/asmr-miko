"use client"
import { useEffect, useRef, useState } from "react"

interface SliderProps {
  min: number
  max: number
  value: number
  step?: number
  onChange: (value: number) => void
}

function Slider({ min, max, value, step = 0.01, onChange }: SliderProps) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-2 bg-purple-700 rounded-lg appearance-none cursor-pointer"
    />
  )
}

export default function PulsingCircles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [circleCount, setCircleCount] = useState<number>(5)
  const [speed, setSpeed] = useState<number>(0.05)
  const [time, setTime] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + speed)
    }, 50)
    return () => clearInterval(interval)
  }, [speed])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 500
    canvas.height = 500
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < circleCount; i++) {
      const radius = 20 + i * 15 + Math.sin(time + i) * 10
      ctx.beginPath()
      ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2)
      ctx.strokeStyle = `hsl(${70 + i * 10}, 80%, 60%)`
      ctx.lineWidth = 2
      ctx.stroke()
    }
  }, [circleCount, time])

  return (
    <div
      className="h-screen flex flex-col items-center gap-6 p-6 bg-gray-900 
   text-white rounded-xl shadow-xl"
    >
      <canvas
        ref={canvasRef}
        className="rounded-lg border border-purple-500 
     shadow-lg"
      />
      <div className="flex flex-col w-full max-w-xs gap-4">
        <div>
          <label className="block text-sm font-medium text-purple-200 mb-2">
            Circle Count: {circleCount}
          </label>
          <Slider
            min={3}
            max={10}
            value={circleCount}
            onChange={setCircleCount}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-purple-200 mb-2">
            Speed: {speed.toFixed(2)}
          </label>
          <Slider
            min={0.01}
            max={0.2}
            step={0.01}
            value={speed}
            onChange={setSpeed}
          />
        </div>
      </div>
    </div>
  )
}
