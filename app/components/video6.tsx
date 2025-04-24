"use client"

import { useEffect, useRef, useState } from "react"

const texts = ["Why", "is", "this", "so", "satisfying", "to", "watch?"]
const morphTime = 1
const cooldownTime = 0.25

const MorphingText = () => {
  const text1Ref = useRef<HTMLSpanElement>(null)
  const text2Ref = useRef<HTMLSpanElement>(null)

  const [index, setIndex] = useState(0)
  const pendingIndex = useRef(index) // holds the next index while cooling down
  const time = useRef(new Date())
  const morph = useRef(0)
  const cooldown = useRef(cooldownTime)
  const justStartedMorph = useRef(false)

  useEffect(() => {
    if (text1Ref.current) {
      text1Ref.current.textContent = texts[index]
    }
    if (text2Ref.current) {
      // keep showing the same next word during cooldown
      text2Ref.current.textContent = texts[(index + 1) % texts.length]
    }

    const animate = () => {
      requestAnimationFrame(animate)

      const now = new Date()
      const dt = (now.getTime() - time.current.getTime()) / 1000
      time.current = now

      if (cooldown.current > 0) {
        cooldown.current -= dt
        doCooldown()
        return
      }

      // Morph just started
      if (justStartedMorph.current) {
        justStartedMorph.current = false

        // update texts ONLY when morphing begins
        if (text1Ref.current && text2Ref.current) {
          text1Ref.current.textContent =
            texts[pendingIndex.current % texts.length]
          text2Ref.current.textContent =
            texts[(pendingIndex.current + 1) % texts.length]
        }
      }

      morph.current += dt
      let fraction = morph.current / morphTime

      if (fraction >= 1) {
        fraction = 1
        morph.current = 0
        cooldown.current = cooldownTime
        justStartedMorph.current = true

        setIndex((prev) => {
          const next = (prev + 1) % texts.length
          pendingIndex.current = next
          return next
        })
      }

      setMorph(fraction)
    }

    const setMorph = (fraction: number) => {
      if (!text1Ref.current || !text2Ref.current) return

      const safeFraction = Math.max(fraction, 0.0001)
      const safeInverse = Math.max(1 - fraction, 0.0001)

      text1Ref.current.style.filter = `blur(${Math.min(
        8 / safeInverse - 8,
        100
      )}px)`
      text1Ref.current.style.opacity = `${Math.pow(1 - fraction, 0.4)}`

      text2Ref.current.style.filter = `blur(${Math.min(
        8 / safeFraction - 8,
        100
      )}px)`
      text2Ref.current.style.opacity = `${Math.pow(fraction, 0.4)}`
    }

    const doCooldown = () => {
      morph.current = 0
      if (!text1Ref.current || !text2Ref.current) return

      text1Ref.current.style.filter = ""
      text1Ref.current.style.opacity = "0"

      text2Ref.current.style.filter = ""
      text2Ref.current.style.opacity = "1"
    }

    justStartedMorph.current = true
    animate()
  }, [])

  return (
    <main className="relative h-screen bg-black overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="relative h-[80pt] px-8"
          style={{ filter: "url(#threshold) blur(0.6px)" }}
        >
          {/* phantom anchor for consistent width */}
          <div className="invisible text-[80pt] font-black whitespace-nowrap">
            satisfying
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <span
              ref={text1Ref}
              className="absolute font-black text-[80pt] select-none
               whitespace-nowrap bg-gradient-to-r from-pink-500 via-yellow-400 
               to-purple-600 bg-clip-text text-transparent animate-gradient"
              style={{
                fontFamily: "Raleway, sans-serif",
                backgroundSize: "200% 200%",
                lineHeight: "1",
              }}
            />
            <span
              ref={text2Ref}
              className="absolute font-black text-[80pt] select-none 
              whitespace-nowrap bg-gradient-to-r from-pink-500 via-yellow-400 
              to-purple-600 bg-clip-text text-transparent animate-gradient"
              style={{
                fontFamily: "Raleway, sans-serif",
                backgroundSize: "200% 200%",
                lineHeight: "1",
              }}
            />
          </div>

          <svg className="absolute w-0 h-0">
            <defs>
              <filter id="threshold">
                <feColorMatrix
                  in="SourceGraphic"
                  type="matrix"
                  values="1 0 0 0 0
                       0 1 0 0 0
                       0 0 1 0 0
                       0 0 0 255 -140"
                />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </main>
  )
}

export default MorphingText
