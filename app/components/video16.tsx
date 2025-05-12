"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Play, Pause, SkipBack, SkipForward } from "lucide-react"
import Image from "next/image"

const tracks = [
  {
    title: "Pulse Below",
    artist: "MudiG",
    src: "/mp3-1.mp3",
    image: "/image-pulse.png",
    duration: 154,
  },
  {
    title: "Epic Spark",
    artist: "MudiG",
    src: "/mp3-2.mp3",
    image: "/image2-2.png",
    duration: 84,
  },
  {
    title: "Final Lap",
    artist: "Off Beat",
    src: "/mp3-3.mp3",
    image: "/image3-3.png",
    duration: 154,
  },
]

function formatTime(time: number) {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0")
  return `${minutes}:${seconds}`
}

export default function Home() {
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const track = tracks[currentTrack]

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play()
      intervalRef.current = setInterval(() => {
        if (audioRef.current) {
          setProgress(audioRef.current.currentTime)
        }
      }, 500)
    } else {
      audioRef.current?.pause()
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPlaying])

  const skipTrack = (direction: "back" | "forward") => {
    setProgress(0)
    setIsPlaying(false)
    if (direction === "back") {
      setCurrentTrack((prev) => (prev === 0 ? tracks.length - 1 : prev - 1))
    } else {
      setCurrentTrack((prev) => (prev === tracks.length - 1 ? 0 : prev + 1))
    }
  }

  const onProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = value
      setProgress(value)
    }
  }

  useEffect(() => {
    setProgress(0)
    setIsPlaying(false)
    if (audioRef.current) audioRef.current.load()
  }, [currentTrack])

  return (
    <div className="relative w-full h-screen">

      <div className="absolute inset-0">
        <div
          className="w-full h-full bg-cover bg-center blur-md"
          style={{ backgroundImage: `url(${track.image})` }}
        />
        <div className="absolute inset-0 bg-black/20" />{" "}
      </div>

      <div className="relative z-10 flex items-center justify-center w-full 
      h-full">
        <motion.div
          className="bg-white/80 p-6 rounded-3xl shadow-lg w-80"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="relative w-full h-60 rounded-xl overflow-hidden 
          mb-4">
            <Image
              key={track.image}
              src={track.image}
              alt="cover"
              fill
              className="object-cover"
            />
          </div>

          <div className="text-center">
            <h2 className="font-semibold text-lg">{track.title}</h2>
            <p className="text-sm text-gray-600">{track.artist}</p>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <span className="text-xs w-8 text-right">
              {formatTime(progress)}
            </span>
            <input
              type="range"
              min={0}
              max={track.duration}
              step={0.1}
              value={progress}
              onChange={onProgressChange}
              className="w-full h-1 bg-gray-300 rounded-full appearance-none 
              cursor-pointer"
            />
            <span className="text-xs w-8">{formatTime(track.duration)}</span>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <button onClick={() => skipTrack("back")}>{<SkipBack />}</button>
            <button onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <Pause /> : <Play />}
            </button>
            <button onClick={() => skipTrack("forward")}>
              {<SkipForward />}
            </button>
          </div>
          <audio ref={audioRef}>
            <source src={track.src} type="audio/mpeg" />
          </audio>
        </motion.div>
      </div>
    </div>
  )
}
