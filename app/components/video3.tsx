'use client'
import { useEffect, useRef, useState } from "react"

interface SliderProps {
  min: number
  max: number
  value: number
  onChange: (value: number[]) => void
}

function Slider({ min, max, value, onChange }: SliderProps) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange([Number(e.target.value)])}
      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
    />
  )
}

export default function FractalTree() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [branches, setBranches] = useState<number>(10)
  const [angle, setAngle] = useState<number>(25)
  const [time, setTime] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 0.05)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 500
    canvas.height = 500
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    function drawBranch(
      x: number,
      y: number,
      length: number,
      theta: number,
      depth: number
    ) {
      if (depth === 0) return

      const sway = Math.sin(time + depth) * 5
      const newTheta = theta + (sway * Math.PI) / 180

      const xEnd = x + length * Math.cos(newTheta)
      const yEnd = y - length * Math.sin(newTheta)

      if (!ctx) return
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(xEnd, yEnd)
      ctx.strokeStyle = `hsl(${depth * 30}, 80%, 60%)`
      ctx.lineWidth = depth * 0.8
      ctx.lineCap = "round"
      ctx.stroke()

      drawBranch(
        xEnd,
        yEnd,
        length * 0.7,
        newTheta - (angle * Math.PI) / 180,
        depth - 1
      )
      drawBranch(
        xEnd,
        yEnd,
        length * 0.7,
        newTheta + (angle * Math.PI) / 180,
        depth - 1
      )
    }

    drawBranch(canvas.width / 2, canvas.height - 20, 100, Math.PI / 2, branches)
  }, [branches, angle, time])

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-gray-900 text-white rounded-xl shadow-xl h-screen">
      <canvas
        ref={canvasRef}
        className="rounded-lg border border-gray-700 shadow-lg"
      />
      <div className="flex flex-col w-full max-w-xs gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Branches: {branches}
          </label>
          <Slider
            min={5}
            max={12}
            value={branches}
            onChange={(v) => setBranches(v[0])}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Angle: {angle}°
          </label>
          <Slider
            min={10}
            max={45}
            value={angle}
            onChange={(v) => setAngle(v[0])}
          />
        </div>
      </div>
    </div>
  )
}
