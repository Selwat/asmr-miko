"use client"
import { useEffect, useState, useRef } from "react"

const BOARD_SIZE = 10
const INITIAL_SNAKE: [number, number][] = [[5, 5]]
const INITIAL_DIRECTION: [number, number] = [0, 1]
const SPEED = 200

type Position = [number, number]

const getRandomPosition = (): Position => {
  return [
    Math.floor(Math.random() * BOARD_SIZE),
    Math.floor(Math.random() * BOARD_SIZE),
  ]
}

const SnakeGame = () => {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE)
  const [direction, setDirection] = useState<Position>(INITIAL_DIRECTION)
  const [food, setFood] = useState<Position>(getRandomPosition)
  const [isGameOver, setIsGameOver] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isRunning) return
    const keyMap: Record<string, Position> = {
      ArrowUp: [-1, 0],
      ArrowDown: [1, 0],
      ArrowLeft: [0, -1],
      ArrowRight: [0, 1],
    }
    const newDirection = keyMap[e.key]
    if (newDirection) {
      const [dx, dy] = newDirection
      const [currX, currY] = direction
      if (dx !== -currX || dy !== -currY) {
        setDirection(newDirection)
      }
    }
  }

  const startGame = () => {
    setSnake(INITIAL_SNAKE)
    setDirection(INITIAL_DIRECTION)
    setFood(getRandomPosition())
    setIsGameOver(false)
    setIsRunning(true)
  }

  const endGame = () => {
    setIsRunning(false)
    setIsGameOver(true)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [direction, isRunning])

  useEffect(() => {
    if (!isRunning) return

    intervalRef.current = setInterval(() => {
      setSnake((prev) => {
        const newHead: Position = [
          prev[0][0] + direction[0],
          prev[0][1] + direction[1],
        ]

        if (
          newHead[0] < 0 ||
          newHead[0] >= BOARD_SIZE ||
          newHead[1] < 0 ||
          newHead[1] >= BOARD_SIZE ||
          prev.some((pos) => pos[0] === newHead[0] && pos[1] === newHead[1])
        ) {
          endGame()
          return prev
        }

        let newSnake = [newHead, ...prev]

        if (newHead[0] === food[0] && newHead[1] === food[1]) {
          setFood(getRandomPosition())
        } else {
          newSnake.pop()
        }

        return newSnake
      })
    }, SPEED)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [direction, isRunning, food])

  return (
    <div
      className="relative flex flex-col items-center justify-center 
      min-h-screen p-4 text-white overflow-hidden"
      style={{
        backgroundImage: `url('/cyber-bg.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 
      to-gray-900/90 backdrop-blur-[2px] z-0"></div>

      <h1 className="text-5xl font-extrabold mb-6 text-green-400 
      drop-shadow-lg z-10">
        Snake Game
      </h1>

      <div
        className="grid rounded-2xl shadow-2xl border-[3px] 
        border-green-400 bg-gray-900/80 backdrop-blur-md z-10 p-1"
        style={{
          gridTemplateRows: `repeat(${BOARD_SIZE}, 50px)`,
          gridTemplateColumns: `repeat(${BOARD_SIZE}, 50px)`,
        }}
      >
        {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, idx) => 
        {
          const x = Math.floor(idx / BOARD_SIZE)
          const y = idx % BOARD_SIZE
          const isSnake = snake.some(([sx, sy]) => sx === x && sy === y)
          const isFood = food[0] === x && food[1] === y
          return (
            <div
              key={idx}
              className={`w-12 h-12 border border-gray-800 transition-all
                duration-100 ease-in-out rounded-sm ${
                isSnake
                  ? 
                  "bg-green-400 animate-pulse shadow-[0_0_10px_2px_rgba(34,197,94,0.6)]"
                  : isFood
                  ? "bg-red-500 shadow-md"
                  : "bg-gray-950"
              }`}
            ></div>
          )
        })}
      </div>

      <div className="mt-6 z-10">
        {isGameOver && (
          <div className="text-red-500 font-bold text-xl mb-2">
            Game Over
          </div>
        )}
        <button
          onClick={startGame}
          className="mt-2 px-6 py-2 bg-green-500 hover:bg-green-600 
          active:scale-95 transition-all text-white font-semibold rounded-xl shadow-md hover:shadow-xl"
        >
          {isGameOver ? "Restart" : isRunning ? "Running..." : 
          "Start Game"}
        </button>
      </div>
    </div>
  )
}

export default SnakeGame
