"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

// Lista sprawdzonych, dostępnych planet
const planetImages = [
  "https://www.solarsystemscope.com/textures/download/2k_mercury.jpg",
  "https://www.solarsystemscope.com/textures/download/2k_venus_surface.jpg",
  "https://www.solarsystemscope.com/textures/download/2k_earth_daymap.jpg",
  "https://www.solarsystemscope.com/textures/download/2k_makemake_fictional.jpg",
  "https://www.solarsystemscope.com/textures/download/2k_jupiter.jpg",
  "https://www.solarsystemscope.com/textures/download/2k_saturn.jpg",
  "https://www.solarsystemscope.com/textures/download/2k_uranus.jpg",
  "https://www.solarsystemscope.com/textures/download/2k_neptune.jpg",
  "https://www.solarsystemscope.com/textures/download/2k_moon.jpg",
]

type Planet = {
  id: number
  img: string
  angle: number
  radius: number
  speed: number
  size: number
}

export default function OrbitingPlanets() {
  const [planets, setPlanets] = useState<Planet[]>([])

  useEffect(() => {
    const initial = planetImages.map((img, i) => createPlanet(i, img))
    setPlanets(initial)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setPlanets((prev) =>
        prev.map((p) => ({
          ...p,
          angle: (p.angle + p.speed) % 360,
        }))
      )
    }, 16)
    return () => clearInterval(interval)
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const clickX = e.clientX
    const clickY = e.clientY

    const dx = clickX - centerX
    const dy = clickY - centerY
    const radius = Math.sqrt(dx * dx + dy * dy)
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI
    const img = planetImages[Math.floor(Math.random() * planetImages.length)]

    setPlanets((prev) => [
      ...prev,
      createPlanet(Date.now(), img, radius, angle),
    ])
  }

  return (
    <div
      onClick={handleClick}
      className="relative h-screen w-full bg-black overflow-hidden 
      cursor-crosshair"
    >
      {/* Słońce w centrum */}
      <div className="absolute top-1/2 left-1/2 w-[32px] h-[32px]
       bg-yellow-400 rounded-full shadow-xl shadow-yellow-300 z-10" />

      {/* Planety */}
      {planets.map((p) => {
        const rad = (p.angle * Math.PI) / 180
        const x = Math.cos(rad) * p.radius
        const y = Math.sin(rad) * p.radius
        const offset = (p.size * 1.6) / 2

        return (
          <div key={p.id}>
            {/* Orbit circle */}
            <div
              className="absolute border border-gray-700/40 rounded-full"
              style={{
                width: p.radius * 2,
                height: p.radius * 2,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />

            {/* Planet */}
            <motion.div
              className="absolute rounded-full overflow-hidden shadow-md"
              style={{
                width: p.size * 1.6,
                height: p.size * 1.6,
                top: "50%",
                left: "50%",
                transform: `translate(${x - offset}px, ${y - offset}px)`,
              }}
            >
              <img
                src={p.img}
                alt="planet"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}

function createPlanet(
  id: number,
  img: string,
  radius?: number,
  angle?: number
): Planet {
  return {
    id,
    img,
    angle: angle ?? Math.random() * 360,
    radius: radius ?? Math.random() * 200 + 100,
    speed: Math.random() * 0.5 + 0.05,
    size: Math.random() * 24 + 20,
  }
}
