"use client"

import { useState, useEffect } from "react"

export default function Home() {
  const [width, setWidth] = useState(16)
  const [height, setHeight] = useState(16)
  const [color, setColor] = useState("#000000")
  const [eraseMode, setEraseMode] = useState(false)
  const [grid, setGrid] = useState<string[][]>([])
  const [isDrawing, setIsDrawing] = useState(false)

  useEffect(() => {
    const newGrid = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => "transparent")
    )
    setGrid(newGrid)
  }, [width, height])
  

  const handleDraw = (rowIdx: number, colIdx: number) => {
    setGrid((prev) => {
      const newGrid = [...prev]
      newGrid[rowIdx][colIdx] = eraseMode ? "transparent" : color
      return newGrid
    })
  }

  return (
    <main
      className="flex items-center justify-center min-h-screen 
    bg-gradient-to-br from-green-600 to-lime-500"
    >
      <div
        className="backdrop-blur-md bg-white/80 p-6 rounded-2xl 
      shadow-xl w-full max-w-md sm:max-w-lg"
      >
        <h1
          className="text-2xl font-semibold text-center mb-6 
        text-gray-800"
        >
          🎨 Pixel Art Designer
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 
        text-sm">
          <div>
            <label className="block text-gray-700 mb-1" 
            htmlFor="width-range">
              Width
            </label>
            <input
              type="range"
              min="1"
              max="22"
              value={width}
              onChange={(e) => setWidth(+e.target.value)}
              className="w-full accent-green-600"
            />
            <div className="text-center">
              {String(width).padStart(2, "0")}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1" 
            htmlFor="height-range">
              Height
            </label>
            <input
              type="range"
              min="1"
              max="20"
              value={height}
              onChange={(e) => setHeight(+e.target.value)}
              className="w-full accent-green-600"
            />
            <div className="text-center">
              {String(height).padStart(2, "0")}
            </div>
          </div>

          <div className="flex flex-col items-center 
          justify-center">
            <label className="block text-gray-700 mb-1">
              Color
            </label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-12 h-12 border-4 border-gray-800 
              rounded-lg shadow"
            />
          </div>

          <div className="flex flex-col gap-2 justify-center 
          items-center mt-2">
            <button
              onClick={() => setEraseMode(false)}
              className={`px-4 py-2 rounded-full text-white 
                transition ${
                eraseMode ? "bg-gray-400" : "bg-green-600"
              }`}
            >
              Paint
            </button>
            <button
              onClick={() => setEraseMode(true)}
              className={`px-4 py-2 rounded-full text-white 
                transition ${
                eraseMode ? "bg-red-500" : "bg-gray-400"
              }`}
            >
              Erase
            </button>
          </div>
        </div>

        <div className="flex justify-between mb-4">
          <button
            onClick={() => {
              setGrid([])
              setWidth(0)
              setHeight(0)
            }}
            className="px-4 py-2 bg-red-600 text-white 
            rounded-full hover:bg-red-700 transition"
          >
            Clear Grid
          </button>

          <span className="text-gray-600 italic">
            {eraseMode ? "Erasing..." : "Painting..."}
          </span>
        </div>

        <div
          className="overflow-auto border rounded-xl 
          bg-white p-2"
          onMouseDown={() => setIsDrawing(true)}
          onMouseUp={() => setIsDrawing(false)}
          onMouseLeave={() => setIsDrawing(false)}
        >
          <div className="inline-block">
            {grid.map((row, rowIdx) => (
              <div key={rowIdx} className="flex">
                {row.map((cellColor, colIdx) => (
                  <div
                    key={colIdx}
                    className="h-5 w-5 border border-gray-300"
                    style={{ backgroundColor: cellColor }}
                    onMouseDown={() => handleDraw(rowIdx, colIdx)}
                    onMouseEnter={() => isDrawing && 
                      handleDraw(rowIdx, colIdx)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
