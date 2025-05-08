"use client"

import React, { useState } from "react"
import { Wheel } from "react-custom-roulette"

const defaultItems = ["Tom", "Adam", "Jerry", "Nick", "Cristiano"]

export default function FortuneWheel() {
  const [mustSpin, setMustSpin] = useState(false)
  const [prizeIndex, setPrizeIndex] = useState(0)
  const [result, setResult] = useState<string | null>(null)
  const [textInput, setTextInput] = useState(defaultItems.join("\n"))

  const data = textInput
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((item) => ({ option: item }))

  const handleSpin = () => {
    const processedItems = textInput
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean)

    if (processedItems.length === 0) return

    const index = Math.floor(Math.random() * processedItems.length)
    setPrizeIndex(index)
    setMustSpin(true)
    setResult(null)
  }

  const handleFinish = () => {
    setMustSpin(false)
    setResult(data[prizeIndex].option)
  }

  return (
    <div
      className="h-screen w-screen flex items-center justify-center bg-gradient-to-br 
    from-indigo-800 via-purple-800 to-pink-800 text-white p-4 sm:p-6 transition-colors 
    duration-500 overflow-hidden"
    >
      <div
        className="h-screen w-screen max-w-5xl bg-white/10 backdrop-blur-lg p-6 sm:p-8 
      rounded-2xl shadow-xl border border-white/20 animate-fade-in"
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-6">
          🎯 Spin the <span className="text-amber-400">Fortune</span> Wheel
        </h1>

        <div
          className="flex flex-row space-x-10 space-y-6 lg:space-y-0 justify-center 
        items-center lg:items-start"
        >
          <div className="w-full lg:w-1/2 flex flex-col space-y-4">
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="w-full h-40 p-4 rounded-lg bg-white/10 text-white 
              placeholder:text-gray-300 border border-white/20 focus:outline-none 
              focus:ring-2 focus:ring-purple-400"
              placeholder="Enter one item per line"
              rows={6}
              wrap="soft"
            />

            <button
              onClick={handleSpin}
              disabled={mustSpin || data.length === 0}
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
              hover:opacity-90 text-white font-bold py-2 px-6 rounded-full shadow-lg 
              disabled:opacity-40 transition-all duration-300 self-center lg:self-start"
            >
              🎲 Spin!
            </button>
          </div>

          <div className="w-full max-w-[350px] sm:max-w-[450px] aspect-square">
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeIndex}
              data={data}
              onStopSpinning={handleFinish}
              backgroundColors={["#6b21a8", "#9333ea"]}
              textColors={["#ffffff"]}
              outerBorderColor="yellow"
              outerBorderWidth={6}
              radiusLineColor="#a855f7"
              radiusLineWidth={2}
              fontSize={26}
            />
          </div>
        </div>

        {result && (
          <div className="text-2xl font-semibold text-center mt-6 animate-bounce">
            Result: <span className="text-yellow-300">{result}</span>
          </div>
        )}
      </div>
    </div>
  )
}
