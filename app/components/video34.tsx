"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

type Card = { id: number; value: string; matched: boolean }

export default function Home() {
  const EMOJIS = ["🍎", "🚀", "🎵", "🌟", "🐶", "⚽️"]
  const [mounted, setMounted] = useState(false)
  const [cards, setCards] = useState<Card[]>([])
  const [flipped, setFlipped] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [time, setTime] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      resetGame()
      const timer = setInterval(() => setTime((prev) => prev + 1), 
      1000)
      return () => clearInterval(timer)
    }
  }, [mounted])

  useEffect(() => {
    if (flipped.length === 2) {
      const [i, j] = flipped

      if (cards[i].value === cards[j].value) {
        setCards((prev) =>
          prev.map((c) =>
            c.id === cards[i].id || c.id === cards[j].id
              ? { ...c, matched: true }
              : c
          )
        )
        setFlipped([])
        setMoves((prev) => prev + 1)
      } else {
        const timeout = setTimeout(() => {
          setFlipped([])
          setMoves((prev) => prev + 1)
        }, 800)
        return () => clearTimeout(timeout)
      }
    }
  }, [flipped])

  const handleFlip = (idx: number) => {
    if (flipped.length < 2 && !flipped.includes(idx) && 
    !cards[idx].matched) {
      setFlipped([...flipped, idx])
    }
  }

  const resetGame = () => {
    const shuffled = shuffle(
      [...EMOJIS, ...EMOJIS].map((val, idx) => ({
        id: idx,
        value: val,
        matched: false,
      }))
    )
    setCards(shuffled)
    setFlipped([])
    setMoves(0)
    setTime(0)
  }

  if (!mounted) return null

  return (
    <main className="flex h-screen items-center justify-center 
    bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 
    p-4">
      <div className="w-full max-w-3xl bg-white/20 
      backdrop-blur-lg p-6 rounded-2xl shadow-2xl flex flex-col 
      gap-6">
        {/* Nagłówek */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-white 
          drop-shadow-lg">
            Memory Game
          </h1>
          <p className="text-white/80 text-sm mt-1">
            Find all matching pairs
          </p>
        </div>

        {/* 🔹 Siatka z równymi marginesami */}
        <div className="grid grid-cols-6 gap-3">
          {cards.map((card, idx) => (
            <motion.div
              key={card.id}
              className="relative w-full aspect-square 
              cursor-pointer"
              onClick={() => handleFlip(idx)}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                style={{ transformStyle: "preserve-3d", 
                  perspective: 1000 }}
                animate={{
                  rotateY: flipped.includes(idx) || 
                  card.matched ? 0 : 180,
                }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                {/* Front */}
                <div
                  style={{ backfaceVisibility: "hidden" }}
                  className={`absolute inset-0 rounded-xl flex 
                    items-center justify-center text-2xl 
                    sm:text-3xl font-bold select-none shadow-md 
                    transition ${
                    flipped.includes(idx) || card.matched
                      ? 
          "bg-gradient-to-br from-white to-gray-100 text-gray-800"
                      : "opacity-0"
                  }`}
                >
                  {card.value}
                </div>
                {/* Tył */}
                <div
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                  className="absolute inset-0 rounded-xl flex 
                  items-center justify-center bg-white/30 
                  backdrop-blur-md border border-white/40 
                  hover:bg-white/40 transition"
                >
                  <span className="text-white/90 text-lg 
                  sm:text-xl">?</span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Panel wyników */}
        <div className="flex flex-col sm:flex-row justify-between 
        items-center gap-3 bg-white/10 rounded-xl p-3 text-white 
        text-sm sm:text-base shadow-inner">
          <span className="font-medium">Moves: {moves}</span>
          <span className="font-medium">
            Time:{" "}
            {Math.floor(time / 60)
              .toString()
              .padStart(2, "0")}
            :{(time % 60).toString().padStart(2, "0")}
          </span>
          <button
            onClick={resetGame}
            className="px-4 py-2 bg-red-400 hover:bg-red-500 
            rounded-full font-semibold shadow-md transition 
            hover:scale-105"
          >
            🔄 Reset
          </button>
        </div>
      </div>
    </main>
  )
}

function shuffle<T>(array: T[]): T[] {
  let arr = array.slice()
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}
